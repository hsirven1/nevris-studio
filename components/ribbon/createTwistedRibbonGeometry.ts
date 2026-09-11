import * as THREE from "three";

export type RibbonGeometryOptions = {
  length?: number;
  width?: number;
  thickness?: number;
  pathSegments?: number;
  /** Total torsion in radians — Math.PI = one half-turn */
  twist?: number;
};

/**
 * Broad candy-ribbon strip: continuous flowing form —
 * thin entry → gradual widen through torsion → broad right-hand body.
 * Material groups: 0 = front, 1 = back, 2 = edges.
 */
export function createTwistedRibbonGeometry({
  length = 9.6,
  width = 1.7,
  thickness = 0.135,
  pathSegments = 112,
  twist = Math.PI,
}: RibbonGeometryOptions = {}) {
  const halfT = thickness / 2;
  const corner = Math.min(halfT * 0.9, width * 0.05);

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
    const origin = sampleCenterline(t, length);
    const tangent = sampleTangent(t, length);
    const angle = twistAngle(t) * (twist / Math.PI);
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

  // Build each ring with its own width; profile topology stays constant
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
  return geometry;
}

/** Thin flowing entry → gradual widen → broad right body */
function widthScale(t: number) {
  if (t < 0.22) {
    const u = t / 0.22;
    const s = u * u * (3 - 2 * u);
    return THREE.MathUtils.lerp(0.32, 0.5, s);
  }
  if (t < 0.52) {
    const u = (t - 0.22) / 0.3;
    const s = u * u * (3 - 2 * u);
    return THREE.MathUtils.lerp(0.5, 0.88, s);
  }
  if (t < 0.8) {
    const u = (t - 0.52) / 0.28;
    const s = u * u * (3 - 2 * u);
    return THREE.MathUtils.lerp(0.88, 1.24, s);
  }
  const u = (t - 0.8) / 0.2;
  const s = u * u * (3 - 2 * u);
  return THREE.MathUtils.lerp(1.24, 1.12, s);
}

/** One smooth half-turn across the lengthening mid-body */
function twistAngle(t: number) {
  const a = 0.24;
  const b = 0.74;
  if (t <= a) return 0;
  if (t >= b) return Math.PI;
  const u = (t - a) / (b - a);
  const s = u * u * (3 - 2 * u);
  return s * Math.PI;
}

function sampleCenterline(t: number, length: number) {
  // Mild +X bias so the broad body sits in the right third
  const x = (t - 0.42) * length;
  const y = Math.sin(t * Math.PI) * 0.1;
  const z = Math.sin((t - 0.5) * Math.PI * 0.42) * 0.22;
  return new THREE.Vector3(x, y, z);
}

function sampleTangent(t: number, length: number) {
  const eps = 0.002;
  const t0 = Math.max(0, t - eps);
  const t1 = Math.min(1, t + eps);
  return sampleCenterline(t1, length)
    .sub(sampleCenterline(t0, length))
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
    const t = i / flat;
    const x = THREE.MathUtils.lerp(halfW - r, -halfW + r, t);
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
    const t = i / flat;
    const y = THREE.MathUtils.lerp(halfT - r, -halfT + r, t);
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
    const t = i / flat;
    const x = THREE.MathUtils.lerp(-halfW + r, halfW - r, t);
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
    const t = i / flat;
    const y = THREE.MathUtils.lerp(-halfT + r, halfT - r, t);
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
