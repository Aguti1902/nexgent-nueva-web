/* NexGent 3D · kit de render: escenario con posproceso, materiales y piezas */
import * as THREE from '../vendor/three.module.min.js';
import { EffectComposer, RenderPass, UnrealBloomPass, ShaderPass, OutputPass, RoundedBoxGeometry, Reflector, mergeGeometries } from '../vendor/three-addons-160.min.js';

export { THREE };
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const small = matchMedia('(max-width: 900px)').matches;
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const P = {
  wall: 0x3a4b60, wallDark: 0x1e2937, wallLight: 0xbfc9d4, roof: 0x171f2a, metal: 0x8d99a6, asphalt: 0x0a0e13, lot: 0x121922,
  teal: 0x6fcad8, blue: 0x3b82f6, warm: 0xffb45e, cool: 0xa8e8f0, green: 0x3ddc97, amber: 0xffb020, red: 0xff4d55, grey: 0x7a8794,
  wood: 0xb98a5c, yellow: 0xf2b632, leaf: 0x1f7359, trunk: 0x3a2c22, fog: 0x031018
};

/* ---------- materiales (en caché, para poder fusionar geometrías) ---------- */
const _m = new Map();
const cached = (k, f) => { if (!_m.has(k)) _m.set(k, f()); return _m.get(k); };
export const std = (color, rough = .75, metal = 0, o) => cached('s' + color + '|' + rough + '|' + metal + (o ? JSON.stringify(o) : ''), () => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: .9, ...o }));
const NEON = { [0x6fcad8]: 0x30c2e0, [0x3ddc97]: 0x22d68a, [0xffb020]: 0xffa010 }, neon = c => NEON[c] ?? c;
export const lit = (color, k = 1) => cached('l' + color + '|' + k, () => new THREE.MeshBasicMaterial({ color: new THREE.Color(neon(color)).multiplyScalar(k) }));
export const glowAdd = (color, k = 1, opacity = 1) => cached('a' + color + '|' + k + '|' + opacity, () => new THREE.MeshBasicMaterial({ color: new THREE.Color(neon(color)).multiplyScalar(k), transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));

export const softTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.35, 'rgba(255,255,255,.45)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const poolMat = (color, k) => cached('p' + color + '|' + k, () => new THREE.MeshBasicMaterial({ map: softTex, color: new THREE.Color(color).multiplyScalar(k), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));

/* ---------- primitivas ---------- */
export function mk(g, geo, m, x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(geo, m); o.position.set(x, y, z);
  const s = !!m.isMeshStandardMaterial; o.castShadow = s && !m.transparent; o.receiveShadow = s; g.add(o); return o;
}
export const rb = (g, w, h, d, m, x = 0, y = 0, z = 0, r = .12) => mk(g, new RoundedBoxGeometry(w, h, d, 2, Math.max(.01, Math.min(r, w * .49, h * .49, d * .49))), m, x, y + h / 2, z);
export const bx = (g, w, h, d, m, x = 0, y = 0, z = 0) => mk(g, new THREE.BoxGeometry(w, h, d), m, x, y + h / 2, z);
export const cyl = (g, r1, r2, h, m, x = 0, y = 0, z = 0, seg = 18) => mk(g, new THREE.CylinderGeometry(r1, r2, h, seg), m, x, y + h / 2, z);
export const cone = (g, r, h, m, x = 0, y = 0, z = 0, seg = 18) => mk(g, new THREE.ConeGeometry(r, h, seg), m, x, y + h / 2, z);
export const ico = (g, r, m, x = 0, y = 0, z = 0, det = 1) => mk(g, new THREE.IcosahedronGeometry(r, det), m, x, y, z);
export const sph = (g, r, m, x = 0, y = 0, z = 0) => mk(g, new THREE.SphereGeometry(r, 18, 12), m, x, y, z);
export function dyn(g, x = 0, y = 0, z = 0) { const d = new THREE.Group(); d.userData.dyn = true; d.position.set(x, y, z); g.add(d); return d; }
export function gable(g, w, h, d, m, x, y, z) { // tejado a dos aguas, cumbrera a lo largo de X
  const s = new THREE.Shape(); s.moveTo(-d / 2, 0); s.lineTo(d / 2, 0); s.lineTo(0, h); s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false }); geo.translate(0, 0, -w / 2); geo.rotateY(Math.PI / 2); return mk(g, geo, m, x, y, z);
}
export function saw(g, w, h, d, m, x, y, z) { // diente de sierra, cara vertical hacia +X
  const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false }); geo.translate(0, 0, -d / 2); return mk(g, geo, m, x, y, z);
}
export function pool(g, x, z, r, color = P.warm, k = .5, y = .03) { const m = mk(g, new THREE.PlaneGeometry(r * 2, r * 2), poolMat(color, k), x, y, z); m.rotation.x = -Math.PI / 2; return m; }
export function ring(r1, r2, color, k = 1.5) { const m = new THREE.Mesh(new THREE.RingGeometry(r1, r2, 56), glowAdd(color, k)); m.rotation.x = -Math.PI / 2; return m; }
export function line(g, pts, color, opacity = .8) { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p))), new THREE.LineBasicMaterial({ color, transparent: true, opacity })); g.add(l); return l; }

/* ---------- ventanas iluminadas (instanciadas) ---------- */
const WINMAT = new THREE.MeshBasicMaterial({ color: 0xffffff });
const WARM = new THREE.Color(P.warm), COOL = new THREE.Color(P.cool), OFF = new THREE.Color(0x0a1520), _c = new THREE.Color(), _m4 = new THREE.Matrix4();
export function setWin(mesh, i, on) {
  const w = mesh.userData.win;
  if (!on) _c.copy(OFF); else if (w.pal) _c.set(neon(w.pal[Math.floor(Math.random() * w.pal.length)])).multiplyScalar(w.k); else _c.copy(Math.random() < w.warm ? WARM : COOL).multiplyScalar(w.k * (.7 + Math.random() * .5));
  mesh.setColorAt(i, _c);
}
export function wins(g, o) {
  const { cols, rows, w = .6, h = .75, gx = .3, gy = .45, x = 0, y = 0, z = 0, ry = 0, warm = .7, on = .65, k = 1.6, pal } = o;
  const m = new THREE.InstancedMesh(new THREE.PlaneGeometry(w, h), WINMAT, cols * rows);
  const tw = cols * w + (cols - 1) * gx; m.userData.win = { warm, on, k, pal, fixed: o.fixed };
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const n = i * rows + j; _m4.makeTranslation(-tw / 2 + w / 2 + i * (w + gx), h / 2 + j * (h + gy), 0); m.setMatrixAt(n, _m4); setWin(m, n, Math.random() < on); }
  m.position.set(x, y, z); m.rotation.y = ry; m.instanceColor.needsUpdate = true; g.add(m); return m;
}
export function winsBox(g, o) { // ventanas en las caras de un bloque
  const { x, z, w, d, sides = 'fblr', cw = .6, gx = .3 } = o, n = s => Math.max(1, Math.floor((s - .7 + gx) / (cw + gx)));
  if (sides.includes('f')) wins(g, { ...o, w: cw, h: o.ch, cols: n(w), x, z: z + d / 2 + .02, ry: 0 });
  if (sides.includes('b')) wins(g, { ...o, w: cw, h: o.ch, cols: n(w), x, z: z - d / 2 - .02, ry: Math.PI });
  if (sides.includes('r')) wins(g, { ...o, w: cw, h: o.ch, cols: n(d), x: x + w / 2 + .02, z, ry: Math.PI / 2 });
  if (sides.includes('l')) wins(g, { ...o, w: cw, h: o.ch, cols: n(d), x: x - w / 2 - .02, z, ry: -Math.PI / 2 });
}
/* panel holográfico de casillas (agenda, ocupación…) */
export function tiles(g, o) {
  const { cols, rows, s = .8, gap = .18, x = 0, y = 0, z = 0, tilt = -.9 } = o, grp = dyn(g, x, y, z); grp.rotation.x = tilt;
  const m = new THREE.InstancedMesh(new THREE.PlaneGeometry(s, s), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .92, side: THREE.DoubleSide }), cols * rows);
  const tw = cols * s + (cols - 1) * gap, th = rows * s + (rows - 1) * gap;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { _m4.makeTranslation(-tw / 2 + s / 2 + i * (s + gap), -th / 2 + s / 2 + j * (s + gap), 0); m.setMatrixAt(i * rows + j, _m4); }
  grp.add(m);
  const fr = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(tw + .5, th + .5)), new THREE.LineBasicMaterial({ color: P.teal, transparent: true, opacity: .7 })); grp.add(fr);
  const set = (pal, k = 1.5) => { for (let i = 0; i < cols * rows; i++) { const [c, w] = pal[Math.floor(Math.random() * pal.length)]; _c.set(neon(c)).multiplyScalar(k * w); m.setColorAt(i, _c); } m.instanceColor.needsUpdate = true; };
  return { grp, set };
}

/* ---------- mobiliario ---------- */
export function lamp(g, x, z, ry = 0, h = 3.4) {
  const dx = Math.cos(ry) * .8, dz = -Math.sin(ry) * .8;
  cyl(g, .05, .08, h, std(P.metal, .35, .8), x, 0, z, 8);
  const arm = bx(g, .9, .06, .06, std(P.metal, .35, .8), x + dx / 2, h - .03, z + dz / 2); arm.rotation.y = ry;
  const head = bx(g, .5, .07, .22, lit(P.warm, 4), x + dx, h - .1, z + dz); head.rotation.y = ry;
  pool(g, x + dx, z + dz, 3.4, P.warm, .5);
}
export function tree(g, x, z, s = 1) {
  cyl(g, .1 * s, .15 * s, 1.1 * s, std(P.trunk, .9), x, 0, z, 6);
  const m = std(P.leaf, .85, 0, { flatShading: true });
  ico(g, .95 * s, m, x, 1.75 * s, z); ico(g, .68 * s, m, x + .18 * s, 2.55 * s, z - .1 * s);
}
export function palm(g, x, z, s = 1) {
  const t = cyl(g, .1 * s, .16 * s, 4.2 * s, std(0x6b5a3e, .9), x, 0, z, 7); t.rotation.z = .06;
  const m = std(0x237a55, .8, 0, { flatShading: true });
  for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2, l = mk(g, new THREE.ConeGeometry(.34 * s, 2.3 * s, 4), m, x + Math.cos(a) * .95 * s, 4.15 * s, z + Math.sin(a) * .95 * s); l.rotation.set(0, -a, -Math.PI / 2 - .45, 'YXZ'); l.scale.z = .35; }
}
export function stack(g, x, z, n = 2) {
  for (let k = 0; k < n; k++) { bx(g, 1.25, .12, 1.25, std(0x8a6a48, .9), x, k * .95, z); rb(g, 1.15, .78, 1.15, std(k % 2 ? 0xc79a68 : P.wood, .85), x, k * .95 + .12, z, .05); }
}
export function pin(color, k = 2.4) { const g = new THREE.Group(); sph(g, .36, lit(color, k), 0, .55, 0); const c = cone(g, .2, .55, lit(color, k), 0, -.27, 0, 10); c.rotation.x = Math.PI; return g; }
export function bars(g, x, y, z, n = 4, color = P.teal) {
  const grp = dyn(g, x, y, z), list = [];
  for (let k = 0; k < n; k++) list.push(bx(grp, .32, 1, .32, lit(color, 1.25), (k - (n - 1) / 2) * .5, 0, 0));
  return { tick: (t, seed = 0) => list.forEach((b, k) => { const h = .35 + Math.abs(Math.sin(t * .8 + k * 1.3 + seed * 2)) * 1.5; b.scale.y = h; b.position.y = h / 2; }) };
}
export function smoke(g, x, y, z, n = 5) {
  const grp = dyn(g, x, y, z), list = [];
  for (let k = 0; k < n; k++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex, color: 0x9aa7b5, transparent: true, opacity: .2, depthWrite: false })); grp.add(s); list.push(s); }
  return t => list.forEach((s, k) => { const p = (t * .16 + k / n) % 1; s.position.set(Math.sin(p * 3 + k) * .5 + p * 1.2, p * 5, 0); s.scale.setScalar(1 + p * 3.2); s.material.opacity = .26 * (1 - p) * Math.min(1, p * 6); });
}

/* ---------- vehículos (avanzan hacia +X) ---------- */
function wheel(g, r, x, z) { const w = mk(g, new THREE.CylinderGeometry(r, r, .2, 14), std(0x05070a, .9), x, r, z); w.rotation.x = Math.PI / 2; }
export function car(color = 0xb7c2ce) {
  const g = new THREE.Group();
  rb(g, 2, .5, .95, std(color, .3, .4), 0, .2, 0, .18); rb(g, 1.05, .42, .86, std(0x0b1220, .08, .7), -.1, .66, 0, .16);
  [[.62, .48], [-.62, .48], [.62, -.48], [-.62, -.48]].forEach(([x, z]) => wheel(g, .22, x, z));
  [.3, -.3].forEach(z => { bx(g, .06, .12, .22, lit(0xfff1d0, 4), 1, .36, z); bx(g, .06, .1, .22, lit(0xff2a2a, 3), -1, .38, z); });
  return g;
}
export function van(color = 0xc9d2dc, accent = P.teal) {
  const g = new THREE.Group();
  rb(g, 3.3, 1.5, 1.5, std(color, .4, .2), -.2, .35, 0, .2); rb(g, .9, .95, 1.46, std(color, .4, .2), 1.75, .35, 0, .2);
  rb(g, .12, .55, 1.3, std(0x0b1220, .08, .7), 1.5, 1.15, 0, .05); bx(g, 3.32, .16, 1.52, std(accent, .5), -.2, .95, 0);
  [[1.5, .72], [-1.1, .72], [1.5, -.72], [-1.1, -.72]].forEach(([x, z]) => wheel(g, .3, x, z));
  [.5, -.5].forEach(z => { bx(g, .06, .14, .26, lit(0xfff1d0, 4), 2.2, .62, z); bx(g, .06, .14, .22, lit(0xff2a2a, 3), -1.86, .75, z); });
  return g;
}
export function truck(color = 0xc9d2dc, accent = P.teal) {
  const g = new THREE.Group();
  rb(g, 1.5, 1.5, 1.9, std(color, .35, .3), 2, .45, 0, .2); rb(g, .1, .62, 1.6, std(0x0b1220, .08, .7), 2.74, 1.2, 0, .04);
  rb(g, 4.5, 2.3, 2.05, std(0xbcc7d2, .55, .1), -1.15, .45, 0, .12); bx(g, 4.52, .2, 2.07, std(accent, .5), -1.15, 1.05, 0);
  [[2, .95], [-.3, .95], [-2.5, .95], [2, -.95], [-.3, -.95], [-2.5, -.95]].forEach(([x, z]) => wheel(g, .42, x, z));
  [.62, -.62].forEach(z => { bx(g, .06, .16, .3, lit(0xfff1d0, 4), 2.77, .78, z); bx(g, .06, .16, .26, lit(0xff2a2a, 3), -3.41, .9, z); });
  return g;
}
export function forklift() {
  const g = new THREE.Group();
  rb(g, 1.5, .7, 1, std(P.yellow, .45, .2), 0, .2, 0, .14); rb(g, .5, .5, .9, std(0x1b232d, .5), -.5, .9, 0, .1);
  [[-.3, .42], [.5, .42], [-.3, -.42], [.5, -.42]].forEach(([x, z]) => bx(g, .06, 1.2, .06, std(0x1b232d, .5), x, .9, z)); bx(g, .95, .06, .95, std(0x1b232d, .5), .1, 2.1, 0);
  [.3, -.3].forEach(z => { bx(g, .08, 2.3, .08, std(0x2c3742, .4, .6), .85, .1, z); bx(g, .9, .05, .12, std(0x4a5560, .4, .7), 1.3, .25, z); });
  [[.45, .5], [-.5, .5], [.45, -.5], [-.5, -.5]].forEach(([x, z]) => wheel(g, .24, x, z));
  bx(g, .05, .1, .5, lit(0xfff1d0, 3), .78, .75, 0);
  return g;
}
/* recorrido cerrado por puntos [x,z] */
export function pathAt(pts, d) {
  let tot = 0; const len = pts.map((p, i) => { const q = pts[(i + 1) % pts.length], l = Math.hypot(q[0] - p[0], q[1] - p[1]); tot += l; return l; });
  d = ((d % tot) + tot) % tot; let i = 0; while (d > len[i]) { d -= len[i]; i++; }
  const p = pts[i], q = pts[(i + 1) % pts.length], f = d / len[i];
  return { x: p[0] + (q[0] - p[0]) * f, z: p[1] + (q[1] - p[1]) * f, ry: Math.atan2(-(q[1] - p[1]), q[0] - p[0]) };
}

/* ---------- fusión de geometrías estáticas (pocas llamadas de dibujo) ---------- */
export function bake(root) {
  root.updateWorldMatrix(true, true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), by = new Map(), rm = [], m = new THREE.Matrix4();
  const isDyn = o => { for (let p = o; p && p !== root; p = p.parent) if (p.userData.dyn) return true; return false; };
  root.traverse(o => {
    if (!o.isMesh || o.isInstancedMesh || isDyn(o)) return;
    const k = o.material.uuid + (o.castShadow ? 's' : 'n'); let geo = o.geometry.clone().applyMatrix4(m.multiplyMatrices(inv, o.matrixWorld));
    if (geo.index) geo = geo.toNonIndexed();
    Object.keys(geo.attributes).forEach(a => { if (!['position', 'normal', 'uv'].includes(a)) geo.deleteAttribute(a); });
    if (!by.has(k)) by.set(k, { geos: [], mat: o.material, cast: o.castShadow, rec: o.receiveShadow }); by.get(k).geos.push(geo); rm.push(o);
  });
  rm.forEach(o => { o.parent.remove(o); o.geometry.dispose(); });
  by.forEach(v => { const mesh = new THREE.Mesh(mergeGeometries(v.geos, false), v.mat); v.geos.forEach(x => x.dispose()); mesh.castShadow = v.cast; mesh.receiveShadow = v.rec; root.add(mesh); });
  return root;
}
export function dispose(root) { root.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.isSprite && o.material) o.material.dispose(); }); }

/* ---------- parcela: losa con bordillo luminoso ---------- */
export const LOT = 20;
export function slab(g, glow = 1) {
  rb(g, LOT, .5, LOT, std(P.lot, .5, .25), 0, -.5, 0, .45);
  const e = lit(P.teal, 1.1 * glow), s = LOT / 2 - .35, l = LOT - 1.6;
  bx(g, l, .03, .07, e, 0, 0, s); bx(g, l, .03, .07, e, 0, 0, -s); bx(g, .07, .03, l, e, s, 0, 0); bx(g, .07, .03, l, e, -s, 0, 0);
}

/* ---------- escenario: render HDR + bloom + desenfoque de maqueta ---------- */
const FINAL = {
  uniforms: { tDiffuse: { value: null }, res: { value: new THREE.Vector2(1, 1) }, time: { value: 0 }, focus: { value: .5 }, blur: { value: 6 }, vig: { value: .55 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 res; uniform float time, focus, blur, vig; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    void main(){
      float amt = smoothstep(.1, .52, abs(vUv.y - focus)) * blur;
      vec3 c = vec3(0.); float tw = 0.;
      for (int i = 0; i < 13; i++) { float fi = float(i); float r = sqrt(fi / 12.) * amt; float a = fi * 2.39996;
        vec3 s = texture2D(tDiffuse, vUv + vec2(cos(a), sin(a)) * r / res).rgb; float w = 1. + dot(s, vec3(.333)) * .8; c += s * w; tw += w; }
      c /= tw;
      vec2 q = vUv - .5; float e = dot(q, q);
      c.r = mix(c.r, texture2D(tDiffuse, vUv + q * e * .014).r, .5); c.b = mix(c.b, texture2D(tDiffuse, vUv - q * e * .014).b, .5);
      c *= 1. - vig * smoothstep(.12, .7, e * 1.5);
      c += (h(vUv * res + fract(time) * 91.) - .5) * (.0025 + dot(c, vec3(.333)) * .03);
      gl_FragColor = vec4(max(c, 0.), 1.);
    }`
};
function envScene() {
  const s = new THREE.Scene(), box = new THREE.BoxGeometry(1, 1, 1);
  const room = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: 0x03070b, side: THREE.BackSide })); room.scale.setScalar(40); s.add(room);
  const pan = (c, k, x, y, z, sx, sy, sz) => { const m = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k) })); m.position.set(x, y, z); m.scale.set(sx, sy, sz); s.add(m); };
  pan(0x8fdcea, 5, 0, 19, 0, 18, .5, 18); pan(0x3b82f6, 6, -19, 3, 0, .5, 9, 16); pan(0xffb070, 5, 19, 1, 6, .5, 5, 9); pan(0xcfe8ff, 3, 0, 5, -19, 16, 4, .5);
  return s;
}
export class Stage {
  constructor(canvas, o = {}) {
    this.canvas = canvas; this.o = o;
    const r = this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    let dpr = this.dpr = Math.min(devicePixelRatio || 1, o.dpr || 1.5); r.setPixelRatio(dpr);
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = o.exposure ?? 1.15;
    r.shadowMap.enabled = !!o.shadows; r.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = this.scene = new THREE.Scene(); this.camera = new THREE.PerspectiveCamera(o.fov || 30, 1, 1, 1200);
    const pm = new THREE.PMREMGenerator(r); scene.environment = pm.fromScene(envScene(), .05).texture; pm.dispose();
    scene.add(new THREE.HemisphereLight(0x6f97bf, 0x06090d, o.hemi ?? .55));
    const key = this.key = new THREE.DirectionalLight(0xc4dcff, o.keyI ?? 2.4); key.position.set(-38, 62, 34); scene.add(key); scene.add(key.target);
    if (o.shadows) { key.castShadow = true; const c = key.shadow.camera, S = o.shadowSize || 60; c.left = -S; c.right = S; c.top = S; c.bottom = -S; c.near = 10; c.far = 220; key.shadow.mapSize.set(o.shadowMap || 2048, o.shadowMap || 2048); key.shadow.bias = -.0004; key.shadow.normalBias = .06; key.shadow.radius = 3; }
    const rim = new THREE.DirectionalLight(0x38c6e0, o.rimI ?? 1.6); rim.position.set(46, 22, -52); scene.add(rim);
    const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: o.msaa ?? 4 });
    const cp = this.composer = new EffectComposer(r, rt); cp.setPixelRatio(dpr);
    cp.addPass(new RenderPass(scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), o.bloom ?? .75, o.bloomR ?? .75, o.bloomT ?? .9); cp.addPass(this.bloom);
    this.fin = new ShaderPass(FINAL); this.fin.uniforms.focus.value = o.focus ?? .5; this.fin.uniforms.blur.value = (o.blur ?? 5) * dpr; cp.addPass(this.fin);
    cp.addPass(new OutputPass());
    this.wins = []; this._ft = 0; this._lt = 0; this._acc = 0; this._n = 0; this.adaptive = !/[?&]q=hi/.test(location.search);
    const fit = this.fit = () => { const el = canvas.parentElement, w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; dpr = this.dpr; r.setPixelRatio(dpr); r.setSize(w, h, false); cp.setPixelRatio(dpr); cp.setSize(w, h); this.fin.uniforms.res.value.set(w * dpr, h * dpr); this.fin.uniforms.blur.value = (o.blur ?? 5) * dpr; this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.w = w; this.h = h; };
    new ResizeObserver(fit).observe(canvas.parentElement); fit();
  }
  collect() { this.wins = []; this.scene.traverse(o => { if (o.userData.win && !o.userData.win.fixed) this.wins.push(o); }); }
  render(t) {
    if (this.adaptive && this._lt) { this._acc += t - this._lt; if (++this._n === 70) { if (this._acc / 70 > .034 && this.dpr > .8) { this.dpr = Math.max(.8, this.dpr * .78); this.fit(); } this._acc = 0; this._n = 0; } } this._lt = t;
    if (this.wins.length && t - this._ft > .09) { this._ft = t; const m = this.wins[Math.floor(Math.random() * this.wins.length)]; setWin(m, Math.floor(Math.random() * m.count), Math.random() < m.userData.win.on); m.instanceColor.needsUpdate = true; }
    this.fin.uniforms.time.value = t; this.composer.render();
  }
  /* suelo: espejo oscuro con rejilla (o mate en móvil) */
  floor(radius = 420, o = {}) {
    const fog = new THREE.Color(o.fog ?? P.fog), geo = new THREE.CircleGeometry(radius, 72);
    if (!this.o.reflect) { const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x05090d, roughness: .32, metalness: .7, envMapIntensity: .5 })); m.rotation.x = -Math.PI / 2; m.receiveShadow = true; this.scene.add(m); return m; }
    const shader = {
      uniforms: { color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null }, fogC: { value: fog }, maxR: { value: radius }, cell: { value: o.cell || 27 }, str: { value: o.strength ?? .55 }, gridK: { value: o.grid ?? .05 } },
      vertexShader: 'uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW; void main(){ vUv = textureMatrix * vec4(position,1.); vW = (modelMatrix * vec4(position,1.)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
      fragmentShader: `uniform vec3 color, fogC; uniform sampler2D tDiffuse; uniform float maxR, cell, str, gridK; varying vec4 vUv; varying vec3 vW;
        void main(){
          vec2 uv = vUv.xy / vUv.w; float b = .0035; vec3 r = texture2D(tDiffuse, uv).rgb * .32;
          r += texture2D(tDiffuse, uv + vec2(b, 0.)).rgb * .17 + texture2D(tDiffuse, uv - vec2(b, 0.)).rgb * .17 + texture2D(tDiffuse, uv + vec2(0., b * 1.6)).rgb * .17 + texture2D(tDiffuse, uv - vec2(0., b * 1.6)).rgb * .17;
          float d = length(vW.xz); vec2 gp = vW.xz / cell - .5; vec2 gl = abs(fract(gp) - .5) / fwidth(gp); float ln = 1. - min(min(gl.x, gl.y), 1.);
          vec3 c = color + r * str + vec3(.25, .8, .95) * ln * gridK * smoothstep(maxR * .5, maxR * .1, d);
          gl_FragColor = vec4(mix(c, fogC, smoothstep(maxR * .32, maxR * .92, d)), 1.);
        }`
    };
    const m = new Reflector(geo, { color: new THREE.Color(o.color ?? 0x020508), textureWidth: 1024, textureHeight: 1024, clipBias: .003, shader, multisample: 0 });
    m.rotation.x = -Math.PI / 2; this.scene.add(m); return m;
  }
  sky(top = 0x000204, hor = 0x06222e) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 16), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false, uniforms: { top: { value: new THREE.Color(top) }, hor: { value: new THREE.Color(hor) } },
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
      fragmentShader: 'uniform vec3 top, hor; varying vec3 vP; void main(){ float h = normalize(vP).y; float g = pow(1. - clamp(h, 0., 1.), 6.); gl_FragColor = vec4(mix(top, hor, g), 1.); }' }));
    this.scene.add(m); return m;
  }
}
/* bucle que solo corre con el lienzo a la vista */
export function loop(el, frame) {
  let vis = false, raf = 0, last = performance.now();
  const tick = now => { const dt = Math.min(.05, (now - last) / 1000); last = now; frame(now / 1000, dt); raf = vis && !document.hidden ? requestAnimationFrame(tick) : 0; };
  const start = () => { if (!raf && vis && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; start(); }, { rootMargin: '100px' }).observe(el);
  document.addEventListener('visibilitychange', start);
}
