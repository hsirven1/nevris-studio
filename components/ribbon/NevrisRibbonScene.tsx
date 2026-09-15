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
  mobileFraming,
}: {
  scrollProgressRef?: React.MutableRefObject<number>;
  animate: boolean;
  pointerReactive: boolean;
  mobileFraming: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useWindowPointer(pointerReactive);
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
    const scrollTilt = (scroll - 0.35) * 0.1;
    const scrollLift = (scroll - 0.35) * -0.1;

    if (animate) time.current += delta;

    if (pointerReactive) {
      const px = pointer.current.x;
      const py = pointer.current.y;
      // Stronger pull as the cursor nears the centerpiece.
      const nearObject =
        1 - Math.min(1, Math.hypot(px - 0.04, py - 0.08) / 1.2);
      const proximity = THREE.MathUtils.lerp(
        0.78,
        1.55,
        nearObject * nearObject,
      );
      target.set(px * 0.85 * proximity, py * 0.62 * proximity);
    } else {
      target.set(0, 0);
    }
    // Snappy follow — controlled, not jelly
    current.lerp(target, 1 - Math.exp(-Math.min(delta, 0.08) * 12.5));

    // Continuous idle — readable even when the pointer is still
    const idleY = animate ? Math.sin(time.current * 0.42) * 0.14 * amp : 0;
    const idleX = animate
      ? Math.cos(time.current * 0.34) * 0.08 * amp
      : 0;
    const idleZ = animate ? Math.sin(time.current * 0.28) * 0.07 * amp : 0;
    const idleLift = animate
      ? Math.sin(time.current * 0.48) * 0.07 * amp
      : 0;
    const idleDriftX = animate
      ? Math.sin(time.current * 0.26 + 0.5) * 0.05 * amp
      : 0;

    const rx = rest.rx + idleX + current.y * 1.35 + scrollTilt * 0.2;
    const ry = rest.ry + idleY + current.x * 2.85 + scrollTilt * 0.12;
    const rz = rest.rz + idleZ + current.x * 0.55;
    const x = rest.x + scroll * 0.03 + current.x * 0.28 + idleDriftX;
    const y = rest.y + scrollLift + idleLift + current.y * 0.32;
    const z = rest.z + current.x * -0.18;

    if (![rx, ry, rz, x, y, z].every(Number.isFinite)) {
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
    group.current.scale.setScalar(baseScale);
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

  // Desktop: idle + pointer. Mobile: quieter autonomous drift only.
  const animate = Boolean(!DEBUG_BASELINE && !reduce && (isDesktop || isNarrow));
  const pointerReactive = Boolean(!DEBUG_BASELINE && !reduce && isDesktop);
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
          // Centered on the compact loop mass
          position: DEBUG_BASELINE
            ? [0, 0, 8]
            : mobileFraming
              ? [0, 0.06, 6.4]
              : [0, 0.08, 6.1],
          fov: mobileFraming ? 38 : 36,
          near: 0.1,
          far: 100,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        frameloop={animate || pointerReactive || DEBUG_BASELINE ? "always" : "demand"}
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
          mobileFraming={mobileFraming}
        />
      </Canvas>
    </div>
  );
}
