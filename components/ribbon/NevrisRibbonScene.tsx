"use client";

import { DEBUG_BASELINE, NevrisRibbon } from "@/components/ribbon/NevrisRibbon";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

type NevrisRibbonSceneProps = {
  scrollProgressRef?: React.MutableRefObject<number>;
  className?: string;
};

function subscribeDesktop(onStoreChange: () => void) {
  const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return !window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
}

function subscribeNarrow(onStoreChange: () => void) {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getNarrowSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Window-level pointer (normalized -1..1).
 * Avoid R3F `useThree().pointer` — hero host is `pointer-events-none`.
 */
function useWindowPointer(enabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) {
      pointer.current.x = 0;
      pointer.current.y = 0;
      return;
    }
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.x = Number.isFinite(x)
        ? THREE.MathUtils.clamp(x, -1, 1)
        : 0;
      pointer.current.y = Number.isFinite(y)
        ? THREE.MathUtils.clamp(y, -1, 1)
        : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);
  return pointer;
}

type TouchDragState = {
  /** Finger down on the object (may still yield to scroll). */
  armed: boolean;
  /** Confirmed object drag — page scroll is blocked. */
  locked: boolean;
  pointerId: number | null;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  /** Drag offsets from rest (radians contribution space). */
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
};

function createTouchDragState(): TouchDragState {
  return {
    armed: false,
    locked: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    velocityX: 0,
    velocityY: 0,
  };
}

/**
 * Mobile / coarse: drag on the sculpture.
 * - Starts only when pointerdown hits the object (raycast + soft pad)
 * - Yields to vertical page scroll until a clear drag lock
 * - Springs back to rest on release
 */
function useTouchObjectDrag(enabled: boolean, groupRef: React.RefObject<THREE.Group | null>) {
  const drag = useRef<TouchDragState>(createTouchDragState());
  const { gl, camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const projected = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const el = gl.domElement;
    if (!enabled) {
      el.style.pointerEvents = "none";
      el.style.touchAction = "auto";
      Object.assign(drag.current, createTouchDragState());
      return;
    }

    el.style.pointerEvents = "auto";
    el.style.touchAction = "pan-y";

    const hitsObject = (clientX: number, clientY: number) => {
      const group = groupRef.current;
      if (!group) return false;

      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return false;

      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(ndc, camera);
      const intersects = raycaster.intersectObject(group, true);
      if (intersects.length > 0) return true;

      // Soft hit pad — ribbon is thin; allow a modest grab radius around center.
      group.getWorldPosition(projected);
      projected.project(camera);
      const sx = (projected.x * 0.5 + 0.5) * rect.width + rect.left;
      const sy = (-projected.y * 0.5 + 0.5) * rect.height + rect.top;
      const dist = Math.hypot(clientX - sx, clientY - sy);
      const pad = Math.min(rect.width, rect.height) * 0.22;
      return dist <= pad;
    };

    const resetTouchAction = () => {
      el.style.touchAction = "pan-y";
    };

    const endDrag = (e: PointerEvent) => {
      const state = drag.current;
      if (state.pointerId !== null && e.pointerId !== state.pointerId) return;
      if (state.locked) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          // already released
        }
      }
      state.armed = false;
      state.locked = false;
      state.pointerId = null;
      // Leave target at current pose; spring toward 0 in useFrame.
      state.targetX = 0;
      state.targetY = 0;
      resetTouchAction();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (!hitsObject(e.clientX, e.clientY)) return;

      const state = drag.current;
      state.armed = true;
      state.locked = false;
      state.pointerId = e.pointerId;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      // Keep existing spring offsets as the drag base (no jump).
    };

    const onPointerMove = (e: PointerEvent) => {
      const state = drag.current;
      if (!state.armed || state.pointerId !== e.pointerId) return;

      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      const dist = Math.hypot(dx, dy);

      if (!state.locked) {
        // Wait for clear intent before stealing the gesture from scroll.
        if (dist < 10) return;

        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        // Vertical-dominant → abandon; let the page scroll.
        if (absY > absX * 1.2) {
          state.armed = false;
          state.pointerId = null;
          resetTouchAction();
          return;
        }

        state.locked = true;
        el.style.touchAction = "none";
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }

      if (e.cancelable) e.preventDefault();

      const frameDx = e.clientX - state.lastX;
      const frameDy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;

      // Normalized, restrained sensitivity — premium, not game-like.
      const scale = Math.max(window.innerWidth, 320);
      const sensY = 2.1; // horizontal → rotate Y
      const sensX = 1.55; // vertical → tilt X
      state.targetX = THREE.MathUtils.clamp(
        state.targetX + (frameDy / scale) * sensX,
        -0.55,
        0.55,
      );
      state.targetY = THREE.MathUtils.clamp(
        state.targetY + (frameDx / scale) * sensY,
        -0.85,
        0.85,
      );
      state.velocityX = (frameDy / scale) * sensX * 18;
      state.velocityY = (frameDx / scale) * sensY * 18;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("lostpointercapture", endDrag);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("lostpointercapture", endDrag);
      el.style.pointerEvents = "none";
      resetTouchAction();
      Object.assign(drag.current, createTouchDragState());
    };
  }, [enabled, gl, camera, groupRef, raycaster, ndc, projected]);

  return drag;
}

/** Lightweight procedural env — no CDN HDR (that was losing the GL context). */
function SoftRoomEnv() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const texture = pmrem.fromScene(room, 0.04).texture;
    scene.environment = texture;

    return () => {
      if (scene.environment === texture) scene.environment = null;
      texture.dispose();
      pmrem.dispose();
      room.dispose();
    };
  }, [gl, scene]);

  return null;
}

/** Compact loop — centered above the headline, close enough to overlap. */
const DESKTOP_REST = {
  x: 0.06,
  y: 0.1,
  z: -0.06,
  rx: -0.38,
  ry: 0.42,
  rz: 0.14,
} as const;

/** Mobile — slightly above the headline with light overlap. */
const MOBILE_REST = {
  x: 0.04,
  y: 0.08,
  z: -0.04,
  rx: -0.34,
  ry: 0.34,
  rz: 0.1,
} as const;

function RibbonRig({
  scrollProgressRef,
  animate,
  pointerReactive,
  touchDragEnabled,
  mobileFraming,
}: {
  scrollProgressRef?: React.MutableRefObject<number>;
  animate: boolean;
  pointerReactive: boolean;
  touchDragEnabled: boolean;
  mobileFraming: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useWindowPointer(pointerReactive);
  const touchDrag = useTouchObjectDrag(touchDragEnabled, group);
  const time = useRef(0);
  const target = useMemo(() => new THREE.Vector2(0, 0), []);
  const current = useMemo(() => new THREE.Vector2(0, 0), []);

  const rest = mobileFraming ? MOBILE_REST : DESKTOP_REST;
  const amp = mobileFraming ? 0.65 : 0.95;
  const baseScale = mobileFraming ? 0.88 : 1.08;

  useFrame((_, delta) => {
    if (!group.current) return;

    if (DEBUG_BASELINE) {
      group.current.position.set(0, 0, 0);
      group.current.rotation.set(0, 0, 0);
      group.current.scale.setScalar(1);
      group.current.visible = true;
      return;
    }

    const scroll = THREE.MathUtils.clamp(scrollProgressRef?.current ?? 0, 0, 1);
    // Mobile needs stronger scroll response — desktop pointer already adds life.
    const scrollGain = mobileFraming ? 1.85 : 1;
    const scrollTilt = (scroll - 0.35) * 0.1 * scrollGain;
    const scrollLift = (scroll - 0.35) * -0.1 * scrollGain;
    const scrollYaw = (scroll - 0.35) * (mobileFraming ? 0.22 : 0.05);
    const scrollScale = mobileFraming
      ? 1 + (scroll - 0.4) * -0.04
      : 1;
    const dt = Math.min(delta, 0.08);

    if (animate) time.current += delta;

    const drag = touchDrag.current;
    const dragging = touchDragEnabled && drag.locked;

    if (pointerReactive) {
      const px = pointer.current.x;
      const py = pointer.current.y;
      const nearObject =
        1 - Math.min(1, Math.hypot(px - 0.04, py - 0.08) / 1.2);
      const proximity = THREE.MathUtils.lerp(
        0.78,
        1.55,
        nearObject * nearObject,
      );
      target.set(px * 0.85 * proximity, py * 0.62 * proximity);
      current.lerp(target, 1 - Math.exp(-dt * 12.5));
    } else if (touchDragEnabled) {
      if (dragging) {
        // Snappy follow while dragging
        drag.currentX += (drag.targetX - drag.currentX) * (1 - Math.exp(-dt * 16));
        drag.currentY += (drag.targetY - drag.currentY) * (1 - Math.exp(-dt * 16));
      } else {
        // Spring return toward rest with light momentum bleed
        drag.velocityX *= Math.exp(-dt * 6.5);
        drag.velocityY *= Math.exp(-dt * 6.5);
        drag.targetX = 0;
        drag.targetY = 0;
        const settle = 1 - Math.exp(-dt * 5.2);
        drag.currentX +=
          (drag.targetX - drag.currentX) * settle + drag.velocityX * dt;
        drag.currentY +=
          (drag.targetY - drag.currentY) * settle + drag.velocityY * dt;
        if (Math.abs(drag.currentX) < 0.001) drag.currentX = 0;
        if (Math.abs(drag.currentY) < 0.001) drag.currentY = 0;
      }
      // Map into same contribution space as desktop pointer (x→ry, y→rx)
      current.set(drag.currentY, drag.currentX);
    } else {
      target.set(0, 0);
      current.lerp(target, 1 - Math.exp(-dt * 12.5));
    }

    // Idle softens while the user is actively dragging
    const idleAmp = dragging ? amp * 0.28 : amp;
    const idleY = animate ? Math.sin(time.current * 0.42) * 0.14 * idleAmp : 0;
    const idleX = animate
      ? Math.cos(time.current * 0.34) * 0.08 * idleAmp
      : 0;
    const idleZ = animate ? Math.sin(time.current * 0.28) * 0.07 * idleAmp : 0;
    const idleLift = animate
      ? Math.sin(time.current * 0.48) * 0.07 * idleAmp
      : 0;
    const idleDriftX = animate
      ? Math.sin(time.current * 0.26 + 0.5) * 0.05 * idleAmp
      : 0;

    const rx =
      rest.rx +
      idleX +
      current.y * 1.35 +
      scrollTilt * (mobileFraming ? 0.85 : 0.2);
    const ry =
      rest.ry +
      idleY +
      current.x * 2.85 +
      scrollTilt * (mobileFraming ? 0.55 : 0.12) +
      scrollYaw;
    const rz = rest.rz + idleZ + current.x * 0.55 + scrollTilt * (mobileFraming ? 0.18 : 0);
    const x =
      rest.x +
      scroll * (mobileFraming ? 0.08 : 0.03) +
      current.x * 0.28 +
      idleDriftX;
    const y =
      rest.y +
      scrollLift * (mobileFraming ? 1.6 : 1) +
      idleLift +
      current.y * 0.32;
    const z = rest.z + current.x * -0.18;
    const scale = baseScale * scrollScale;

    if (![rx, ry, rz, x, y, z, scale].every(Number.isFinite)) {
      group.current.position.set(rest.x, rest.y, rest.z);
      group.current.rotation.set(rest.rx, rest.ry, rest.rz);
      group.current.scale.setScalar(baseScale);
      group.current.visible = true;
      return;
    }

    group.current.rotation.x = rx;
    group.current.rotation.y = ry;
    group.current.rotation.z = rz;
    group.current.position.x = x;
    group.current.position.y = y;
    group.current.position.z = z;
    group.current.scale.setScalar(scale);
    group.current.visible = true;
  });

  return (
    <group
      ref={group}
      position={DEBUG_BASELINE ? [0, 0, 0] : [rest.x, rest.y, rest.z]}
      rotation={DEBUG_BASELINE ? [0, 0, 0] : [rest.rx, rest.ry, rest.rz]}
      scale={baseScale}
      visible
    >
      <NevrisRibbon scale={DEBUG_BASELINE ? 1 : 0.92} />
    </group>
  );
}

export function NevrisRibbonScene({
  scrollProgressRef,
  className,
}: NevrisRibbonSceneProps) {
  const reduce = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    () => false,
  );
  const isNarrow = useSyncExternalStore(
    subscribeNarrow,
    getNarrowSnapshot,
    () => false,
  );
  const [contextKey, setContextKey] = useState(0);

  // Desktop: idle + pointer follow. Touch devices: idle + object drag.
  const animate = Boolean(!DEBUG_BASELINE && !reduce && (isDesktop || isNarrow));
  const pointerReactive = Boolean(!DEBUG_BASELINE && !reduce && isDesktop);
  const touchDragEnabled = Boolean(!DEBUG_BASELINE && !reduce && !isDesktop);
  const mobileFraming = Boolean(!DEBUG_BASELINE && isNarrow);
  const dpr: [number, number] = [1, 1.5];

  useEffect(() => {
    const onLost = (e: Event) => {
      e.preventDefault();
      console.warn("[NevrisRibbon] WebGL context lost — remounting canvas");
      setContextKey((k) => k + 1);
    };
    window.addEventListener("webglcontextlost", onLost as EventListener, true);
    return () =>
      window.removeEventListener(
        "webglcontextlost",
        onLost as EventListener,
        true,
      );
  }, []);

  return (
    <div className={className}>
      <Canvas
        key={contextKey}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
          stencil: false,
          depth: true,
        }}
        camera={{
          position: DEBUG_BASELINE
            ? [0, 0, 8]
            : mobileFraming
              ? [0, 0.06, 6.4]
              : [0, 0.08, 6.1],
          fov: mobileFraming ? 38 : 36,
          near: 0.1,
          far: 100,
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          pointerEvents: touchDragEnabled ? "auto" : "none",
          touchAction: touchDragEnabled ? "pan-y" : "auto",
        }}
        frameloop={
          animate || pointerReactive || touchDragEnabled || DEBUG_BASELINE
            ? "always"
            : "demand"
        }
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          const el = gl.domElement;
          el.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setContextKey((k) => k + 1);
            },
            false,
          );
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={
            DEBUG_BASELINE
              ? [0, 0, 8]
              : mobileFraming
                ? [0, 0.06, 6.4]
                : [0, 0.08, 6.1]
          }
          fov={mobileFraming ? 38 : 36}
          near={0.1}
          far={100}
        />
        {!DEBUG_BASELINE && <SoftRoomEnv />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 3]} intensity={1.55} color="#fffaf2" />
        <directionalLight position={[-2, 3, -2]} intensity={0.95} color="#ffc067" />
        <directionalLight position={[2, -1, 5]} intensity={0.55} color="#66f4ff" />
        <spotLight
          position={[4, 5, 4]}
          intensity={1.4}
          angle={0.4}
          penumbra={0.75}
          color="#66c4ff"
        />
        <RibbonRig
          scrollProgressRef={scrollProgressRef}
          animate={animate}
          pointerReactive={pointerReactive}
          touchDragEnabled={touchDragEnabled}
          mobileFraming={mobileFraming}
        />
      </Canvas>
    </div>
  );
}
