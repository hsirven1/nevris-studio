import * as THREE from "three";

export type RibbonGeometryOptions = {
  /** Ellipse major radius (X) */
  radiusMajor?: number;
  /** Ellipse minor radius (Z) */
  radiusMinor?: number;
  width?: number;
  thickness?: number;
  pathSegments?: number;
  /**
   * Total torsion around the closed path.
   * 2π = seamless twisted loop (sculptural Möbius-inspired band).
   */
  twist?: number;
};

/**
 * Compact sculptural loop — a continuous twisted band that closes on itself.
 * Finite in space (not a cross-page ribbon). Material groups:
 * 0 = front, 1 = back, 2 = edges.
 */
export function createTwistedRibbonGeometry({
  radiusMajor = 1.92,
  radiusMinor = 1.38,
  width = 0.78,
  thickness = 0.145,
  pathSegments = 140,
  twist = Math.PI * 2,
}: RibbonGeometryOptions = {}) {
  const halfT = thickness / 2;
  const corner = Math.min(halfT * 0.85, width * 0.06);

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  const frontIndices: number[] = [];
  const backIndices: number[] = [];
  const edgeIndices: number[] = [];

  const rings: {
    origin: THREE.Vector3;
    frame: THREE.Matrix4;
    halfW: number;
  }[] = [];

  for (let i = 0; i <= pathSegments; i++) {
    const t = i / pathSegments;
    const origin = sampleCenterline(t, radiusMajor, radiusMinor);
    const tangent = sampleTangent(t, radiusMajor, radiusMinor);
    const angle = t * twist;
    const halfW = (width * widthScale(t)) / 2;

    const up = new THREE.Vector3(0, 1, 0);
    let binormal = new THREE.Vector3().crossVectors(tangent, up);
    if (binormal.lengthSq() < 1e-6) {
      binormal = new THREE.Vector3().crossVectors(
        tangent,
        new THREE.Vector3(0, 0, 1),
      );
    }
    binormal.normalize();
    const normal = new THREE.Vector3()
      .crossVectors(binormal, tangent)
      .normalize();

    const q = new THREE.Quaternion().setFromAxisAngle(tangent, angle);
    binormal.applyQuaternion(q);
    normal.applyQuaternion(q);

    const frame = new THREE.Matrix4().makeBasis(binormal, normal, tangent);
    rings.push({ origin, frame, halfW });
  }

  const baseHalfW = width / 2;
  const baseProfile = roundedRectProfile(baseHalfW, halfT, corner, 3);
  const profileCount = baseProfile.length;

  for (let i = 0; i <= pathSegments; i++) {
    const { origin, frame, halfW } = rings[i];
    const t = i / pathSegments;
    const sx = halfW / baseHalfW;

    for (let p = 0; p < profileCount; p++) {
      const local = new THREE.Vector3(
        baseProfile[p].x * sx,
        baseProfile[p].y,
        0,
      );
      local.applyMatrix4(frame);
      local.add(origin);

      positions.push(local.x, local.y, local.z);

      const nLocal = new THREE.Vector3(baseProfile[p].nx, baseProfile[p].ny, 0)
        .applyMatrix4(frame)
        .normalize();
      normals.push(nLocal.x, nLocal.y, nLocal.z);

      uvs.push(t, baseProfile[p].v);
    }
  }

  for (let i = 0; i < pathSegments; i++) {
    for (let p = 0; p < profileCount; p++) {
      const pNext = (p + 1) % profileCount;
      const a = i * profileCount + p;
      const b = i * profileCount + pNext;
      const c = (i + 1) * profileCount + pNext;
      const d = (i + 1) * profileCount + p;

      const kind = baseProfile[p].kind;
      const target =
        kind === "front"
          ? frontIndices
          : kind === "back"
            ? backIndices
            : edgeIndices;

      target.push(a, b, c, a, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  const frontCount = frontIndices.length;
  const backCount = backIndices.length;
  const edgeCount = edgeIndices.length;

  geometry.setIndex([...frontIndices, ...backIndices, ...edgeIndices]);
  geometry.clearGroups();
  geometry.addGroup(0, frontCount, 0);
  geometry.addGroup(frontCount, backCount, 1);
  geometry.addGroup(frontCount + backCount, edgeCount, 2);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  geometry.center();
  return geometry;
}

/** Soft width breathing — organic, not noisy. */
function widthScale(t: number) {
  return 0.88 + 0.14 * Math.sin(t * Math.PI * 2) + 0.06 * Math.sin(t * Math.PI * 4);
}

/**
 * Closed elliptical path with a gentle vertical fold —
 * reads as a twisted loop / folded band, not a donut or infinity mark.
 */
function sampleCenterline(
  t: number,
  radiusMajor: number,
  radiusMinor: number,
) {
  const theta = t * Math.PI * 2;
  const x = radiusMajor * Math.cos(theta);
  const y =
    0.28 * Math.sin(theta * 2) + 0.1 * Math.sin(theta + 0.6);
  const z = radiusMinor * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function sampleTangent(
  t: number,
  radiusMajor: number,
  radiusMinor: number,
) {
  const eps = 0.0015;
  const t0 = t - eps < 0 ? t - eps + 1 : t - eps;
  const t1 = t + eps > 1 ? t + eps - 1 : t + eps;
  return sampleCenterline(t1, radiusMajor, radiusMinor)
    .sub(sampleCenterline(t0, radiusMajor, radiusMinor))
    .normalize();
}

type FaceKind = "front" | "back" | "edge";

type ProfilePoint = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  v: number;
  kind: FaceKind;
};

function roundedRectProfile(
  halfW: number,
  halfT: number,
  radius: number,
  cornerSegs: number,
): ProfilePoint[] {
  const pts: ProfilePoint[] = [];
  const r = Math.min(radius, halfW - 0.02, halfT - 0.02);
  const flat = 4;

  const push = (
    x: number,
    y: number,
    nx: number,
    ny: number,
    kind: FaceKind,
  ) => {
    pts.push({
      x,
      y,
      nx,
      ny,
      v: (Math.atan2(ny, nx) + Math.PI) / (Math.PI * 2),
      kind,
    });
  };

  for (let i = 0; i <= flat; i++) {
    const u = i / flat;
    const x = THREE.MathUtils.lerp(halfW - r, -halfW + r, u);
    push(x, halfT, 0, 1, "front");
  }
  for (let i = 1; i <= cornerSegs; i++) {
    const a = Math.PI / 2 + ((Math.PI / 2) * i) / cornerSegs;
    push(
      -halfW + r + Math.cos(a) * r,
      halfT - r + Math.sin(a) * r,
      Math.cos(a),
      Math.sin(a),
      "edge",
    );
  }
  for (let i = 1; i <= flat; i++) {
    const u = i / flat;
    const y = THREE.MathUtils.lerp(halfT - r, -halfT + r, u);
    push(-halfW, y, -1, 0, "edge");
  }
  for (let i = 1; i <= cornerSegs; i++) {
    const a = Math.PI + ((Math.PI / 2) * i) / cornerSegs;
    push(
      -halfW + r + Math.cos(a) * r,
      -halfT + r + Math.sin(a) * r,
      Math.cos(a),
      Math.sin(a),
      "edge",
    );
  }
  for (let i = 1; i <= flat; i++) {
    const u = i / flat;
    const x = THREE.MathUtils.lerp(-halfW + r, halfW - r, u);
    push(x, -halfT, 0, -1, "back");
  }
  for (let i = 1; i <= cornerSegs; i++) {
    const a = (3 * Math.PI) / 2 + ((Math.PI / 2) * i) / cornerSegs;
    push(
      halfW - r + Math.cos(a) * r,
      -halfT + r + Math.sin(a) * r,
      Math.cos(a),
      Math.sin(a),
      "edge",
    );
  }
  for (let i = 1; i <= flat; i++) {
    const u = i / flat;
    const y = THREE.MathUtils.lerp(-halfT + r, halfT - r, u);
    push(halfW, y, 1, 0, "edge");
  }
  for (let i = 1; i < cornerSegs; i++) {
    const a = 0 + ((Math.PI / 2) * i) / cornerSegs;
    push(
      halfW - r + Math.cos(a) * r,
      halfT - r + Math.sin(a) * r,
      Math.cos(a),
      Math.sin(a),
      "edge",
    );
  }

  return pts;
}
