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

function RibbonRig({
  scrollProgressRef,
  animate,
  pointerReactive,
}: {
  scrollProgressRef?: React.MutableRefObject<number>;
  animate: boolean;
  pointerReactive: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pointer = useWindowPointer(pointerReactive);
  const time = useRef(0);
  const target = useMemo(() => new THREE.Vector2(0, 0), []);
  const current = useMemo(() => new THREE.Vector2(0, 0), []);

  const rest = useMemo(
    // Right-anchored; further left so more sculptural body stays in frame
    () => ({ x: 1.05, y: -0.04, z: 0, rx: -0.16, ry: 0.2, rz: 0.22 }),
    [],
  );

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
    const scrollLift = (scroll - 0.35) * -0.15;

    if (animate) time.current += delta;

    if (pointerReactive) {
      target.set(pointer.current.x * 0.24, pointer.current.y * 0.16);
    } else {
      target.set(0, 0);
    }
    // Snappier follow — still damped, not jittery
    current.lerp(target, 1 - Math.exp(-Math.min(delta, 0.1) * 4.2));

    const idleY = animate ? Math.sin(time.current * 0.22) * 0.12 : 0;
    const idleX = animate ? Math.sin(time.current * 0.18 + 0.6) * 0.04 : 0;
    const idleZ = animate ? Math.sin(time.current * 0.15) * 0.025 : 0;
    const idleLift = animate ? Math.sin(time.current * 0.2) * 0.04 : 0;

    const rx = rest.rx + idleX + current.y * 0.52 + scrollTilt * 0.3;
    const ry = rest.ry + idleY + current.x * 1.45 + scrollTilt * 0.2;
    const rz = rest.rz + idleZ + current.x * 0.18;
    const x = rest.x + scroll * 0.05 + current.x * 0.22;
    const y = rest.y + scrollLift + idleLift + current.y * 0.14;
    const z = rest.z + current.x * -0.12;

    if (![rx, ry, rz, x, y, z].every(Number.isFinite)) {
      group.current.position.set(rest.x, rest.y, rest.z);
      group.current.rotation.set(rest.rx, rest.ry, rest.rz);
      group.current.scale.setScalar(1);
      group.current.visible = true;
      return;
    }

    group.current.rotation.x = rx;
    group.current.rotation.y = ry;
    group.current.rotation.z = rz;
    group.current.position.x = x;
    group.current.position.y = y;
    group.current.position.z = z;
    group.current.scale.setScalar(1);
    group.current.visible = true;
  });

  return (
    <group
      ref={group}
      position={DEBUG_BASELINE ? [0, 0, 0] : [rest.x, rest.y, rest.z]}
      rotation={DEBUG_BASELINE ? [0, 0, 0] : [rest.rx, rest.ry, rest.rz]}
      scale={1}
      visible
    >
      <NevrisRibbon scale={DEBUG_BASELINE ? 1 : 1.2} />
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
  const [contextKey, setContextKey] = useState(0);

  const animate = Boolean(!DEBUG_BASELINE && !reduce && isDesktop);
  const pointerReactive = Boolean(!DEBUG_BASELINE && !reduce && isDesktop);
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
          // Mild left bias — keeps right-side mass while showing more body
          position: DEBUG_BASELINE ? [0, 0, 8] : [-0.18, 0.05, 7.45],
          fov: 36,
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
          position={DEBUG_BASELINE ? [0, 0, 8] : [-0.18, 0.05, 7.45]}
          fov={36}
          near={0.1}
          far={100}
        />
        {!DEBUG_BASELINE && <SoftRoomEnv />}
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 3]} intensity={1.5} color="#fff8f0" />
        <directionalLight position={[-2, 3, -2]} intensity={0.75} color="#c9b6f7" />
        <directionalLight position={[2, -1, 5]} intensity={0.55} color="#e4d8ff" />
        <spotLight
          position={[4, 5, 4]}
          intensity={1.55}
          angle={0.4}
          penumbra={0.75}
          color="#ffffff"
        />
        <RibbonRig
          scrollProgressRef={scrollProgressRef}
          animate={animate}
          pointerReactive={pointerReactive}
        />
      </Canvas>
    </div>
  );
}
