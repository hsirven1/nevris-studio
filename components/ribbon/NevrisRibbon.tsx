"use client";

import { createTwistedRibbonGeometry } from "@/components/ribbon/createTwistedRibbonGeometry";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Set true to freeze motion + opaque MeshBasicMaterial accent (debug).
 * Keep false for production.
 */
export const DEBUG_BASELINE = false;

/** California beaches lacquer — peach body, sky reverse, cyan edge flash. */
const DEEP = "#4d6574";
const SLATE = "#7d99aa";
const PEACH = "#ffc067";
const SKY = "#66c4ff";
const CYAN = "#66f4ff";
const PEACH_SOFT = "#ffd699";

type NevrisRibbonProps = {
  scale?: number;
};

/**
 * Coastal glass loop — peach-forward with cool sky/cyan transmission.
 * Reads the California beaches palette clearly in motion and at rest.
 */
export function NevrisRibbon({ scale = 1 }: NevrisRibbonProps) {
  const geometry = useMemo(() => createTwistedRibbonGeometry(), []);

  const materials = useMemo(() => {
    if (DEBUG_BASELINE) {
      const solid = new THREE.MeshBasicMaterial({
        color: new THREE.Color(PEACH),
        side: THREE.DoubleSide,
        transparent: false,
        opacity: 1,
        depthWrite: true,
        depthTest: true,
      });
      return [solid, solid.clone(), solid.clone()];
    }

    // Front — warm peach glass with slate depth
    const frontMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(SLATE),
      metalness: 0,
      roughness: 0.07,
      transmission: 0.48,
      thickness: 1.4,
      ior: 1.46,
      attenuationColor: new THREE.Color(PEACH),
      attenuationDistance: 0.38,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      envMapIntensity: 1.25,
      specularIntensity: 1,
      side: THREE.DoubleSide,
    });

    // Reverse — sky blue pass-through
    const backMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(SKY),
      metalness: 0,
      roughness: 0.05,
      transmission: 0.74,
      thickness: 0.9,
      ior: 1.4,
      attenuationColor: new THREE.Color(PEACH_SOFT),
      attenuationDistance: 0.45,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      envMapIntensity: 1.35,
      side: THREE.DoubleSide,
    });

    // Edges — deep rim with bright cyan flash
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(DEEP),
      metalness: 0,
      roughness: 0.09,
      transmission: 0.62,
      thickness: 0.32,
      ior: 1.38,
      attenuationColor: new THREE.Color(CYAN),
      attenuationDistance: 0.28,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.2,
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
