"use client";

import { createTwistedRibbonGeometry } from "@/components/ribbon/createTwistedRibbonGeometry";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Set true to freeze motion + opaque MeshBasicMaterial lavender (debug).
 * Keep false for production.
 */
export const DEBUG_BASELINE = false;

const SMOKE = "#3a3348";
const LAVENDER = "#c9b6f7";
const EDGE = "#5a4d78";

type NevrisRibbonProps = {
  scale?: number;
};

/**
 * Smoked black glass with lavender tint — glossy, partially transmitting.
 * Uses scene.environment (procedural RoomEnvironment) for reflections;
 * avoids CDN HDR which previously lost the WebGL context.
 */
export function NevrisRibbon({ scale = 1 }: NevrisRibbonProps) {
  const geometry = useMemo(() => createTwistedRibbonGeometry(), []);

  const materials = useMemo(() => {
    if (DEBUG_BASELINE) {
      const solid = new THREE.MeshBasicMaterial({
        color: new THREE.Color(LAVENDER),
        side: THREE.DoubleSide,
        transparent: false,
        opacity: 1,
        depthWrite: true,
        depthTest: true,
      });
      return [solid, solid.clone(), solid.clone()];
    }

    // Front — smoked charcoal glass with lavender body
    const frontMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(SMOKE),
      metalness: 0,
      roughness: 0.08,
      transmission: 0.58,
      thickness: 1.35,
      ior: 1.45,
      attenuationColor: new THREE.Color(LAVENDER),
      attenuationDistance: 0.55,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.2,
      specularIntensity: 1,
      side: THREE.DoubleSide,
    });

    // Reverse — lighter lavender pass-through
    const backMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#4a4060"),
      metalness: 0,
      roughness: 0.06,
      transmission: 0.78,
      thickness: 0.95,
      ior: 1.4,
      attenuationColor: new THREE.Color("#d4c4ff"),
      attenuationDistance: 0.4,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      envMapIntensity: 1.3,
      side: THREE.DoubleSide,
    });

    // Edges — lilac rim where light thins
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(EDGE),
      metalness: 0,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.35,
      ior: 1.38,
      attenuationColor: new THREE.Color("#c9b6f7"),
      attenuationDistance: 0.3,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.15,
      side: THREE.DoubleSide,
    });

    return [frontMat, backMat, edgeMat];
  }, []);

  return (
    <mesh
      geometry={geometry}
      material={materials}
      scale={scale}
      visible
      frustumCulled={false}
      castShadow={false}
      receiveShadow={false}
    />
  );
}
