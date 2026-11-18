/* NexGent 3D · /empresa-3d · escenas Three.js e interacciones */
import * as THREE from '../vendor/three.module.min.js';

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = matchMedia('(max-width: 900px)').matches;
const DPR = Math.min(devicePixelRatio || 1, small ? 1.5 : 2);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const C = { base: 0x0e141b, dark: 0x1b2631, light: 0xdfe7ee, cyan: 0x6fcad8, blue: 0x3b82f6, g: 0x3ddc97, a: 0xffb020, r: 0xff5a5f };

/* Ejecuta el bucle solo cuando el lienzo está a la vista y la pestaña activa */
function loop(el, frame) {
  let vis = false, raf = 0, last = performance.now();
  const tick = now => { const dt = Math.min(.05, (now - last) / 1000); last = now; frame(now / 1000, dt); raf = vis && !document.hidden ? requestAnimationFrame(tick) : 0; };
  const start = () => { if (!raf && vis && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; start(); }, { rootMargin: '100px' }).observe(el);
  document.addEventListener('visibilitychange', start);
}
function sizer(renderer, camera, el) {
  const fit = () => { const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  new ResizeObserver(fit).observe(el); fit();
}
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .8, metalness: .1, flatShading: true, ...o });
const glow = (color, opacity = 1) => new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
function box(g, w, h, d, m, x = 0, y = 0, z = 0) { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); g.add(b); return b; }
function edges(mesh, color = C.cyan, opacity = .8) { const l = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ color, transparent: true, opacity })); mesh.add(l); return l; }
function ring(r1, r2, color, opacity = .9) { const m = new THREE.Mesh(new THREE.RingGeometry(r1, r2, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); m.rotation.x = -Math.PI / 2; return m; }
function lights(scene, k = 1) {
  scene.add(new THREE.HemisphereLight(0x9fdbe4, 0x020304, .9 * k));
  const d = new THREE.DirectionalLight(0xcfe8ff, 2.2 * k); d.position.set(18, 30, 12); scene.add(d);
  const r = new THREE.DirectionalLight(0x3b82f6, 1.2 * k); r.position.set(-20, 10, -16); scene.add(r);
}
function truck(statusColor) {
  const g = new THREE.Group();
  box(g, .95, .85, .9, mat(C.light, { roughness: .5 }), 0, .2, 1.05);
  box(g, 1, 1.05, 2.3, mat(0xaebccb, { roughness: .6 }), 0, .2, -.6);
  box(g, .2, .12, .05, glow(0xfff1c4), -.3, .45, 1.52); box(g, .2, .12, .05, glow(0xfff1c4), .3, .45, 1.52);
  box(g, .9, .08, .05, glow(0xff4040, .8), 0, .4, -1.78);
  const st = ring(1.35, 1.6, statusColor, .85); st.position.y = .03; g.add(st); g.userData.ring = st;
  return g;
}

/* =============== sectores: dioramas 3D =============== */
const BUILD = {
  flotas(g) {
    const road = mat(0x0b1016, { roughness: 1 });
    [[0, -5], [0, 5]].forEach(([x, z]) => box(g, 12, .02, 1.3, road, x, .01, z)); [[-5, 0], [5, 0]].forEach(([x, z]) => box(g, 1.3, .021, 12, road, x, .01, z));
    const d = box(g, 4, 1.4, 3, mat(0x16212b), 0, 0, 0); edges(d);
    const r = ring(2.6, 2.75, C.cyan, .6); r.position.y = .03; g.add(r);
    const path = [[-5, -5], [5, -5], [5, 5], [-5, 5], [-5, -5]].map(([x, z]) => new THREE.Vector3(x, 0, z));
    const ts = [C.g, C.a, C.g].map((c, k) => { const t = truck(c); t.scale.setScalar(.55); g.add(t); return { t, o: k * 13 }; });
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; box(g, .5, 1.2 + Math.random(), .5, mat(0x1d4a3a), Math.cos(a) * 8, 0, Math.sin(a) * 8); }
    return t => { r.scale.setScalar(1 + (t % 1.5) / 3); ts.forEach(({ t: tr, o }) => { const d = (t * 3 + o) % 40, s = Math.floor(d / 10), f = (d % 10) / 10, A = path[s], B = path[s + 1]; tr.position.lerpVectors(A, B, f); const dir = B.clone().sub(A).normalize(); tr.position.x += dir.z * .45; tr.position.z -= dir.x * .45; tr.rotation.y = Math.atan2(dir.x, dir.z); }); };
  },
  almacen(g) {
    box(g, 15, .05, 11, mat(0x10171e), 0, 0, 0);
    const frame = mat(0x2a3a48), cargo = [mat(0xc49a6c), mat(0xa77d52), mat(C.cyan, { emissive: 0x1a4a55 })];
    [-4, 0, 4].forEach(z => { for (let x = -5.5; x <= 5.5; x += 2.2) { box(g, .08, 3.2, 1.2, frame, x - 1.05, 0, z); [0, 1.05, 2.1].forEach(y => { box(g, 2.2, .06, 1.2, frame, x, y + .5, z); if (Math.random() < .78) box(g, 1.6 + Math.random() * .3, .5, .9, cargo[Math.random() < .12 ? 2 : Math.floor(Math.random() * 2)], x, y + .56, z); }); } });
    [-4.5, 0, 4.5].forEach((x, k) => { box(g, 2, 2.2, .1, mat(0x1b2631), x, 0, -5.4); box(g, .4, .4, .05, glow([C.g, C.a, C.g][k]), x, 2.4, -5.35); });
    const fl = new THREE.Group(); box(fl, .9, .6, 1.3, mat(0xf2b632, { roughness: .5 }), 0, .1, 0); box(fl, .08, 1.8, .08, mat(0x333333), -.3, .1, .7); box(fl, .08, 1.8, .08, mat(0x333333), .3, .1, .7);
    const fork = box(fl, .8, .06, .7, mat(0x555555), 0, .2, 1); g.add(fl);
    return t => { const x = Math.sin(t * .4) * 5.5; fl.position.set(x, 0, -2); fl.rotation.y = Math.cos(t * .4) > 0 ? Math.PI / 2 : -Math.PI / 2; fork.position.y = .2 + (Math.sin(t * 1.3) * .5 + .5) * 1.2; };
  },
  tiendas(g) {
    const hub = new THREE.Mesh(new THREE.SphereGeometry(.6, 20, 14), glow(0xb8eef2)); hub.position.y = 1.2; g.add(hub);
    const bars = [], cols = [C.cyan, 0xff7a59, 0x8b5cf6, C.g, C.cyan, 0xff7a59, C.a];
    for (let k = 0; k < 7; k++) {
      const a = k / 7 * Math.PI * 2, x = Math.cos(a) * 6.3, z = Math.sin(a) * 6.3;
      box(g, 1.8, 1.3, 1.8, mat(0x1b2631), x, 0, z); box(g, 2, .18, .5, mat(cols[k]), x, 1.1, z + .95);
      const b = new THREE.Mesh(new THREE.CylinderGeometry(.18, .18, 1, 12), glow(k === 3 ? C.r : C.cyan, .85)); b.position.set(x, 1.3, z); g.add(b); bars.push(b);
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 1.2, 0), new THREE.Vector3(x, .7, z)]);
      g.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: C.cyan, transparent: true, opacity: .25 })));
    }
    return t => bars.forEach((b, k) => { const h = k === 3 ? .4 + Math.sin(t * 2) * .1 : 1.4 + Math.sin(t * .9 + k * 1.7) * .8; b.scale.y = h; b.position.y = 1.3 + h / 2; });
  },
  software(g) {
    const leds = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
      const x = -4.5 + i * 3, z = -3 + j * 3, bad = i === 2 && j === 1;
      box(g, 1.2, 3.4, 1.2, mat(0x243241, { roughness: .45, metalness: .3 }), x, 0, z);
      for (let y = .5; y < 3.2; y += .45) [.62, -.62].forEach(dz => { const l = box(g, .8, .1, .04, glow(bad ? C.r : (Math.random() < .2 ? C.a : C.g), .9), x, y, z + dz); leds.push([l, bad]); });
    }
    const tor = new THREE.Mesh(new THREE.TorusGeometry(2.2, .06, 8, 64), glow(C.cyan, .8)); tor.position.set(0, 5.2, 0); tor.rotation.x = Math.PI / 2; g.add(tor);
    return t => { leds.forEach(([l, bad], k) => { l.material.opacity = bad ? (Math.sin(t * 6) > 0 ? 1 : .2) : (Math.sin(t * 3 + k * 1.3) > -.6 ? .9 : .15); }); tor.rotation.z = t * .6; tor.scale.setScalar(1 + Math.sin(t * 1.5) * .06); };
  },
  fabrica(g) {
    box(g, 15, .05, 9, mat(0x10171e), 0, 0, 0);
    box(g, 13, .25, 1.3, mat(0x26323d), 0, .7, 1); for (let x = -6; x <= 6; x += 2) box(g, .15, .7, 1.1, mat(0x1b2631), x, 0, 1);
    const items = Array.from({ length: 7 }, () => box(g, .6, .5, .6, mat(0xc49a6c), 0, .95, 1));
    const st = [C.g, C.g, C.a];
    [-4, 0, 4].forEach((x, k) => { const m = box(g, 2.2, 2, 2, mat(0x2b3a47, { roughness: .4, metalness: .4 }), x, 0, -2.2); edges(m, C.cyan, .35); const c = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .8, 16), mat(0x3d4f5e)); c.position.set(x + .5, 2.4, -2.2); g.add(c); box(g, .35, .35, .35, glow(st[k]), x - .6, 2, -1.15); });
    const arm = new THREE.Group(); arm.position.set(5.5, 0, 3); g.add(arm);
    box(arm, .8, .4, .8, mat(0xf2b632), 0, 0, 0); const up = new THREE.Group(); up.position.y = .4; arm.add(up); box(up, .25, 1.8, .25, mat(0xf2b632), 0, 0, 0); box(up, 1.6, .22, .22, mat(0xf2b632), -.7, 1.7, 0);
    return t => { items.forEach((it, k) => { const x = ((t * 1.4 + k * 13 / 7) % 13) - 6.5; it.position.x = x; it.visible = Math.abs(x) < 6.4; }); up.rotation.y = Math.sin(t * .8) * 1.2; };
  },
  clinicas(g) {
    const tiles = [];
    [[-5, -2], [0, 3], [5, -2]].forEach(([x, z]) => {
      box(g, 3.4, 2, 3, mat(0xdfe7ee, { roughness: .6 }), x, 0, z);
      box(g, 1, .25, .25, glow(C.cyan), x, 2.5, z + 1.6); box(g, .25, 1, .25, glow(C.cyan), x, 2.12, z + 1.6);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const tl = box(g, .9, .06, .8, glow(C.g, .9), x - 1.05 + i * 1.05, 2.01, z - .95 + j * .95); tiles.push(tl); }
    });
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + .3; box(g, .4, .9 + Math.random() * .8, .4, mat(0x1d4a3a), Math.cos(a) * 8, 0, Math.sin(a) * 8); }
    let last = -1;
    return t => { const s = Math.floor(t / 1.2); if (s !== last) { last = s; tiles.forEach(tl => { const r = Math.random(); tl.material = glow(r < .55 ? C.g : r < .85 ? C.a : 0x2a3a48, .9); }); } };
  },
  obras(g) {
    box(g, 14, .05, 10, mat(0x1a1712), 0, 0, 0);
    const conc = mat(0x8a96a0, { roughness: .95 });
    for (let f = 0; f < 5; f++) { box(g, 6, .2, 4, conc, -2, f * 1.2, 0); if (f < 4) [[-4.8, -1.8], [.8, -1.8], [-4.8, 1.8], [.8, 1.8]].forEach(([x, z]) => box(g, .25, 1, .25, conc, x, f * 1.2 + .2, z)); }
    box(g, 6.1, 1.2, 4.1, glow(C.cyan, .12), -2, 4.9, 0);
    const tower = box(g, .45, 7.2, .45, mat(0xf2b632), 4.5, 0, -2.5);
    const jib = new THREE.Group(); jib.position.set(4.5, 7.2, -2.5); g.add(jib); box(jib, 9, .3, .35, mat(0xf2b632), -2.5, 0, 0); box(jib, 1.3, .8, .9, mat(0x3d4f5e), 2.3, -.8, 0);
    const line = box(jib, .04, 2.2, .04, mat(0x222222), -5, -2.2, 0); const load = box(jib, .9, .5, .9, mat(0xc49a6c), -5, -2.7, 0); void tower; void line;
    const tr = truck(C.g); tr.scale.setScalar(.55); tr.position.set(4, 0, 3.5); tr.rotation.y = -Math.PI / 2; g.add(tr);
    return t => { jib.rotation.y = Math.sin(t * .35) * 1.1; load.position.y = -2.45 + Math.sin(t * .9) * .5; };
  },
  inmobiliaria(g) {
    const pins = [], st = [C.g, C.a, C.g, 0x6e6e73, C.g, C.a, C.g, 0x6e6e73];
    [[-6, -3], [-3, 4], [0, -5], [2, 1], [5, -3], [6, 4], [-5, 2.5], [-.5, 5.5]].forEach(([x, z], k) => {
      const w = 1.6 + Math.random() * .8, h = 1.1 + Math.random() * .8;
      box(g, w, h, w, mat(0xdfe7ee, { roughness: .7 }), x, 0, z);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(w * .78, .9, 4), mat(0x3d4f5e)); roof.position.set(x, h + .45, z); roof.rotation.y = Math.PI / 4; g.add(roof);
      const pin = new THREE.Group(); const s = new THREE.Mesh(new THREE.SphereGeometry(.35, 16, 12), glow(st[k])); s.position.y = .5; const c = new THREE.Mesh(new THREE.ConeGeometry(.2, .55, 12), glow(st[k])); c.rotation.x = Math.PI; pin.add(s, c);
      pin.position.set(x, h + 1.6, z); pin.userData.y = h + 1.6; g.add(pin); pins.push(pin);
    });
    return t => pins.forEach((p, k) => { p.position.y = p.userData.y + Math.sin(t * 2 + k) * .18; p.rotation.y = t; });
  },
  energia(g) {
    const pm = mat(0x1d3b6e, { roughness: .3, metalness: .6, emissive: 0x0a1a33 });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { const p = box(g, 1.3, .06, .9, pm, -6 + c * 1.45, .6, -1 + r * 1.3); p.rotation.x = -.5; box(g, .06, .6, .06, mat(0x3d4f5e), -6 + c * 1.45, 0, -1 + r * 1.3); }
    const rotors = [];
    [[3, -4], [6, -1], [4.5, 3.5]].forEach(([x, z]) => {
      const tw = new THREE.Mesh(new THREE.CylinderGeometry(.12, .22, 5, 12), mat(0xdfe7ee)); tw.position.set(x, 2.5, z); g.add(tw);
      box(g, .5, .4, .9, mat(0xdfe7ee), x, 4.9, z);
      const rot = new THREE.Group(); rot.position.set(x, 5.1, z + .5); g.add(rot);
      for (let b = 0; b < 3; b++) { const bl = new THREE.Group(); bl.rotation.z = b * Math.PI * 2 / 3; box(bl, .2, 2.3, .06, mat(0xf5f5f7), 0, 0, 0); rot.add(bl); }
      rotors.push(rot);
    });
    const bat = box(g, 2.2, 1.2, 1.2, mat(0x26323d), -4, 0, -4.5); edges(bat, C.g, .7); const lvl = box(g, 1.8, .14, .04, glow(C.g), -4, .5, -3.88);
    return t => { rotors.forEach((r, k) => r.rotation.z = t * (1.4 + k * .2)); lvl.scale.x = .6 + (Math.sin(t * .5) * .5 + .5) * .4; };
  },
  oficina(g) {
    const glass = mat(0x1d2b38, { roughness: .2, metalness: .6 }), zones = [];
    const tower = box(g, 4.2, 7, 4.2, glass, -1.5, 0, -1); edges(tower, C.cyan, .35);
    for (let f = 0; f < 7; f++) { const w = box(g, 4.25, .08, 4.25, glow(C.cyan, .2), -1.5, f + .9, -1); zones.push(w); }
    const side = box(g, 3.6, 4, 3, glass, 3.4, 0, 1.4); edges(side, C.cyan, .3);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) zones.push(box(g, .9, .06, .7, glow(C.g, .9), 2.3 + i * 1.1, 4.02, .5 + j * .9));
    for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2 + .4; box(g, .45, .9 + Math.random() * .7, .45, mat(0x1d4a3a), Math.cos(a) * 8, 0, Math.sin(a) * 8); }
    const sat = new THREE.Mesh(new THREE.TorusGeometry(1.4, .05, 8, 48), glow(C.cyan, .8)); sat.position.set(-1.5, 8.2, -1); sat.rotation.x = Math.PI / 2; g.add(sat);
    let last = -1;
    return t => { sat.rotation.z = t * .8; const s = Math.floor(t / 1.5); if (s !== last) { last = s; zones.forEach((z, k) => { if (k < 7) z.material.opacity = Math.random() < .7 ? .45 : .12; else z.material = glow(Math.random() < .75 ? C.g : C.a, .9); }); } };
  },
  hosteleria(g) {
    box(g, 13, .05, 9, mat(0x17130f), 0, 0, 0);
    const kitchen = box(g, 4, 2.2, 3, mat(0x26323d), -4, 0, -2.5); edges(kitchen, C.cyan, .35);
    const tickets = [0, 1, 2, 3].map(k => box(g, .5, .6, .04, glow(0xffffff, .9), -5.3 + k * .8, 2.4, -1));
    const tops = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
      const x = -.5 + i * 2.1, z = -2.4 + j * 2.4;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, .8, 8), mat(0x3d4f5e)); leg.position.set(x, .4, z); g.add(leg);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(.75, .75, .08, 24), glow(C.g, .95)); top.position.set(x, .84, z); g.add(top); tops.push(top);
    }
    [[-5, 3.2], [-3, 3.6]].forEach(([x, z]) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, 2, 6), mat(0x3d4f5e)); p.position.set(x, 1, z); g.add(p); const u = new THREE.Mesh(new THREE.ConeGeometry(1.3, .6, 8), mat(0xe8dcc8)); u.position.set(x, 2.1, z); g.add(u); });
    let last = -1;
    return t => { tickets.forEach((tk, k) => { tk.position.y = 2.4 + Math.sin(t * 2 + k) * .06; tk.material.opacity = (Math.floor(t * .8) + k) % 5 === 0 ? .25 : .9; }); const s = Math.floor(t / 1.4); if (s !== last) { last = s; tops.forEach(tp => { const r = Math.random(); tp.material = glow(r < .5 ? C.a : r < .8 ? C.g : C.cyan, .95); }); } };
  },
  hoteles(g) {
    const body = box(g, 7, 6, 3.2, mat(0xdfe7ee, { roughness: .6 }), -1, 0, -1.5);
    const rooms = [];
    for (let f = 0; f < 5; f++) for (let r = 0; r < 6; r++) rooms.push(box(g, .8, .7, .05, glow(C.g, .95), -3.6 + r * 1.05, .7 + f * 1.05, .13));
    box(g, 7.4, .3, 3.6, mat(0x3d4f5e), -1, 6, -1.5); void body;
    const pool = box(g, 4.5, .12, 2.6, new THREE.MeshStandardMaterial({ color: 0x2a9fd6, emissive: 0x0b4a6e, roughness: .1, metalness: .2 }), 2.6, 0, 3); void pool;
    [[5, 1], [5, 5], [-5, 4]].forEach(([x, z]) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(.08, .12, 2.4, 6), mat(0x6b5a3e)); p.position.set(x, 1.2, z); g.add(p); const c = new THREE.Mesh(new THREE.ConeGeometry(1, .7, 6), mat(0x1d6a4a)); c.position.set(x, 2.6, z); g.add(c); });
    let last = -1;
    return t => { const s = Math.floor(t / 1.3); if (s !== last) { last = s; rooms.forEach(rm => { const r = Math.random(); rm.material = glow(r < .62 ? C.g : r < .82 ? C.a : 0x6e6e73, .95); }); } };
  },
};

/* =============== sectores: datos =============== */
const SECTORS = [
  { id: 'tiendas', tab: 'Tiendas', title: 'Red de tiendas', intro: 'Todas tus tiendas en un mapa, con cómo va cada una hoy comparada con lo normal.',
    ve: ['Ventas del día de cada tienda frente a lo habitual', 'Roturas de stock y reposiciones pendientes', 'Incidencias abiertas por tienda', 'Tiendas y zonas que se salen de lo normal'],
    agentes: ['Ventas', 'Compras y stock', 'Atención al cliente'], datos: ['TPV', 'Stripe', 'ERP', 'WhatsApp', 'Google Sheets'] },
  { id: 'oficina', tab: 'Oficina y servicios', title: 'Oficina y empresa de servicios', intro: 'Asesorías, agencias, despachos o consultoras: tus proyectos, clientes y plazos como un edificio vivo.',
    ve: ['Proyectos y encargos por estado y por cliente', 'Plazos que vencen esta semana', 'Facturas emitidas, cobradas y vencidas', 'Carga de trabajo por departamento, sin vigilar a nadie'],
    agentes: ['Atención al cliente', 'Finanzas', 'Documentación'], datos: ['Gmail', 'Outlook', 'Google Calendar', 'HubSpot', 'Holded', 'Slack'] },
  { id: 'fabrica', tab: 'Fábrica', title: 'Fábrica', intro: 'Cada línea de producción y cada máquina en 3D, con su ritmo, su estado y lo que necesita atención.',
    ve: ['Producción por línea frente al objetivo del turno', 'Máquinas en marcha, paradas o en aviso', 'Paradas, cuellos de botella y mermas', 'Mantenimientos previstos y recambios'],
    agentes: ['Operaciones', 'Mantenimiento', 'Calidad'], datos: ['Sensores de las máquinas', 'ERP', 'Odoo', 'Google Sheets', 'Outlook'] },
  { id: 'almacen', tab: 'Almacén', title: 'Almacén', intro: 'La nave en 3D, estantería por estantería: qué hay, qué falta y qué está a punto de salir.',
    ve: ['Ocupación de cada estantería y cada hueco', 'Pedidos en preparación y muelles de carga', 'Productos por debajo del stock mínimo', 'Mapas de calor de las zonas con más movimiento'],
    agentes: ['Compras y stock', 'Logística', 'Operaciones'], datos: ['Odoo', 'Holded', 'Tu ERP o SGA', 'Google Sheets', 'Correo de proveedores'] },
  { id: 'flotas', tab: 'Flotas', title: 'Flota y logística', intro: 'Vehículos, rutas y entregas sobre el mapa, en directo, con lo que llega tarde marcado en color.',
    ve: ['Cada vehículo en su ruta, con carga y hora prevista', 'Paradas largas, desvíos y retrasos', 'Almacenes y muelles con su ocupación', 'Revisiones, seguros e ITV que vencen'],
    agentes: ['Logística', 'Mantenimiento', 'Atención al cliente'], datos: ['Samsara', 'Webfleet', 'GPS de la flota', 'ERP', 'WhatsApp'] },
  { id: 'clinicas', tab: 'Clínicas', title: 'Clínicas y salud', intro: 'Todas las clínicas de un vistazo: agenda, salas ocupadas y huecos libres, sede por sede.',
    ve: ['Ocupación de la agenda y de cada sala', 'Huecos libres que se pueden llenar hoy', 'Cancelaciones y citas sin confirmar', 'Facturación del día por clínica'],
    agentes: ['Atención al cliente', 'Finanzas', 'Marketing'], datos: ['Programa de citas', 'Google Calendar', 'WhatsApp', 'Holded', 'Stripe'] },
  { id: 'hosteleria', tab: 'Hostelería', title: 'Restaurantes y hostelería', intro: 'Cada local con sus mesas, sus reservas y su cocina, en directo y comparado con un día normal.',
    ve: ['Mesas libres, ocupadas y reservadas', 'Comandas en cocina y tiempos de salida', 'Ventas por local y por franja horaria', 'Stock de cocina y pedidos a proveedores'],
    agentes: ['Atención al cliente', 'Compras y stock', 'Dirección'], datos: ['TPV', 'Plataforma de reservas', 'WhatsApp', 'Google Sheets', 'Holded'] },
  { id: 'hoteles', tab: 'Hoteles', title: 'Hoteles y alojamientos', intro: 'El hotel en 3D, habitación por habitación: ocupadas, por limpiar y libres para vender hoy.',
    ve: ['Estado de cada habitación', 'Llegadas, salidas y peticiones de huéspedes', 'Ocupación y precio medio por noche', 'Averías y mantenimiento por planta'],
    agentes: ['Atención al cliente', 'Mantenimiento', 'Ventas'], datos: ['Programa de gestión hotelera', 'Booking y otros canales', 'WhatsApp', 'Stripe', 'Outlook'] },
  { id: 'software', tab: 'Software', title: 'Empresa de software', intro: 'Tus servicios como un pequeño barrio: cada edificio es un sistema, con su salud, sus despliegues y sus incidencias.',
    ve: ['Estado de cada servicio y de cada servidor', 'Despliegues del día y lo que cambió', 'Incidencias abiertas y tiques de clientes', 'Ingresos y bajas de clientes en directo'],
    agentes: ['Soporte técnico', 'Atención al cliente', 'Ventas'], datos: ['Jira', 'Slack', 'Stripe', 'HubSpot', 'Gmail', 'Tu monitorización'] },
  { id: 'obras', tab: 'Obras', title: 'Obras y construcción', intro: 'Cada obra en 3D con su avance por fases, las entregas de material y lo que va con retraso.',
    ve: ['Avance de cada obra por fases frente al plan', 'Entregas de material y alquiler de maquinaria', 'Retrasos y tareas bloqueadas', 'Documentación y permisos pendientes'],
    agentes: ['Operaciones', 'Compras y stock', 'Documentación'], datos: ['Excel de planificación', 'ERP', 'Google Calendar', 'Gmail', 'WhatsApp'] },
  { id: 'inmobiliaria', tab: 'Inmobiliaria', title: 'Inmobiliaria', intro: 'La cartera entera sobre el mapa: cada inmueble con su estado, sus visitas y sus interesados.',
    ve: ['Inmuebles disponibles, reservados y vendidos', 'Visitas del día y de la semana', 'Interesados nuevos y a quién falta responder', 'Precio y tiempo en el mercado por zona'],
    agentes: ['Ventas', 'Atención al cliente', 'Marketing'], datos: ['HubSpot', 'Portales inmobiliarios', 'WhatsApp', 'Google Calendar', 'Gmail'] },
  { id: 'energia', tab: 'Energía', title: 'Instalaciones de energía', intro: 'Plantas solares, eólicas y baterías en 3D, con lo que producen ahora mismo y cualquier alarma.',
    ve: ['Producción en directo frente a la prevista', 'Alarmas y equipos con bajo rendimiento', 'Estado de carga de las baterías', 'Mantenimientos y visitas técnicas'],
    agentes: ['Operaciones', 'Mantenimiento', 'Dirección'], datos: ['SCADA o monitorización', 'Previsión meteorológica', 'ERP', 'Google Sheets', 'Outlook'] }
];

/* =============== agentes por área =============== */
const AGENTS = [
  { k: 'A', h: 200, name: 'Atención al cliente', what: 'Contesta a tus clientes por WhatsApp, correo y teléfono, agenda citas y resuelve dudas al momento, a cualquier hora.',
    ex: [['Clínica', 'Llena los huecos de mañana con pacientes en lista de espera'], ['Tienda', 'Dice si un producto está en stock y lo reserva'], ['Hotel', 'Atiende peticiones de huéspedes a las 2 de la mañana']],
    ok: 'Devoluciones, descuentos o cualquier excepción a tus normas.', aviso: 'Te resume el día a las 9:00. Si un cliente se queja, al momento.' },
  { k: 'V', h: 150, name: 'Ventas', what: 'Sigue cada oportunidad, prepara presupuestos y te avisa de los clientes que se están enfriando antes de perderlos.',
    ex: [['Inmobiliaria', 'Responde a interesados y propone visitas'], ['Servicios', 'Prepara el presupuesto con tus tarifas'], ['Software', 'Detecta clientes con riesgo de baja']],
    ok: 'Enviar un presupuesto o aplicar un descuento.', aviso: 'Te avisa cuando una oportunidad grande se mueve.' },
  { k: 'O', h: 30, name: 'Operaciones', what: 'Vigila que todo funcione como debe: pedidos, producción, servicios y plazos. Si algo se atasca, propone cómo reorganizarlo.',
    ex: [['Fábrica', 'Reparte la carga entre líneas cuando una se para'], ['Obras', 'Avisa de qué tareas bloquean el avance'], ['Energía', 'Compara producción real con la prevista']],
    ok: 'Cambiar la planificación del día.', aviso: 'Lo urgente, al momento. El resto, en tu resumen.' },
  { k: 'C', h: 265, name: 'Compras y stock', what: 'Controla las existencias, prevé cuándo se acaba cada producto y prepara los pedidos a proveedores.',
    ex: [['Tienda', 'Repone lo que más se vende antes de que falte'], ['Restaurante', 'Ajusta el pedido de cocina al fin de semana'], ['Almacén', 'Detecta productos parados que ocupan sitio']],
    ok: 'Lanzar un pedido a un proveedor.', aviso: 'Te pide el OK dentro de tu horario.' },
  { k: 'F', h: 120, name: 'Finanzas', what: 'Concilia cobros y pagos, persigue facturas vencidas y te da una previsión de caja siempre al día.',
    ex: [['Servicios', 'Recuerda con amabilidad las facturas vencidas'], ['Clínica', 'Cuadra la caja de cada sede al cierre'], ['Cualquiera', 'Avisa si la caja va a quedarse corta']],
    ok: 'Reclamar a un cliente o programar un pago.', aviso: 'Informe semanal los lunes. Si la caja se tuerce, antes.' },
  { k: 'M', h: 10, name: 'Mantenimiento', what: 'Detecta lo que está a punto de fallar, programa revisiones y lleva el control de garantías y recambios.',
    ex: [['Fábrica', 'Ve que una máquina vibra más de lo normal'], ['Flota', 'Programa la revisión antes de la ITV'], ['Hotel', 'Agrupa las averías por planta']],
    ok: 'Parar una máquina o pedir un recambio.', aviso: 'Si algo va a romperse ya, te llama.' },
  { k: 'L', h: 185, name: 'Logística', what: 'Organiza rutas, entregas y muelles, y avisa al cliente si algo va a llegar tarde.',
    ex: [['Flota', 'Reordena entregas por un atasco'], ['Almacén', 'Asigna muelles a los camiones que llegan'], ['Tienda', 'Agrupa los pedidos online por zona']],
    ok: 'Cambiar una ruta o una fecha de entrega.', aviso: 'Al momento si un cliente importante se ve afectado.' },
  { k: 'Q', h: 330, name: 'Calidad', what: 'Revisa mermas, devoluciones y reclamaciones, y encuentra el patrón que hay detrás.',
    ex: [['Fábrica', 'Relaciona un defecto con un lote de material'], ['Restaurante', 'Detecta un plato con más quejas'], ['Tienda', 'Ve qué producto se devuelve más']],
    ok: 'Retirar un lote o cambiar un proceso.', aviso: 'En tu resumen diario.' },
  { k: 'K', h: 300, name: 'Marketing', what: 'Mide campañas y reseñas, compara sedes y te propone acciones concretas para llenar los huecos.',
    ex: [['Clínica', 'Propone una campaña para las horas flojas'], ['Hotel', 'Responde reseñas con tu tono'], ['Inmobiliaria', 'Ve qué portal trae más interesados']],
    ok: 'Publicar o lanzar una campaña.', aviso: 'Informe de campañas cada semana.' },
  { k: 'T', h: 225, name: 'Soporte técnico', what: 'Vigila tus sistemas, resuelve incidencias de primer nivel y te avisa si algo deja de funcionar.',
    ex: [['Software', 'Detecta un servicio caído y abre la incidencia'], ['Tiendas', 'Ve qué TPV no está enviando ventas'], ['Oficina', 'Gestiona accesos y altas de herramientas']],
    ok: 'Reiniciar un sistema o cambiar un acceso.', aviso: 'Una caída es urgente: te avisa a cualquier hora.' },
  { k: 'D', h: 45, name: 'Documentación', what: 'Lleva contratos, permisos, licencias, seguros y certificados, y te avisa antes de que caduquen.',
    ex: [['Obras', 'Controla permisos y documentación de cada obra'], ['Flota', 'Avisa de seguros e ITV que vencen'], ['Clínica', 'Revisa autorizaciones y contratos']],
    ok: 'Firmar o enviar un documento.', aviso: 'Con 30, 15 y 5 días de margen.' },
  { k: 'R', h: 170, name: 'Dirección', what: 'Junta lo que hacen los demás agentes y te lo cuenta: reunión diaria por voz, comparativa de sedes e informe del mes.',
    ex: [['Cualquiera', 'Reunión diaria de 4 minutos por voz a las 8:45'], ['Red de sedes', 'Te dice qué sede va peor y por qué'], ['Cualquiera', 'Prepara el informe del mes para el consejo']],
    ok: 'Nada: te informa para que decidas tú.', aviso: 'Cada mañana, a la hora que elijas.' }
];

/* =============== preguntas de ejemplo =============== */
const ASKS = [
  { q: 'Resúmeme el día', a: 'Dirección', h: 170, r: 'Hoy todo va bien. Ventas un 8 % por encima de un martes normal, 2 incidencias resueltas y 1 cosa pendiente de tu OK: un pedido de reposición de 240 unidades.', acts: ['Ver el pedido', 'Mañana'] },
  { q: '¿Qué tienda va peor esta semana?', a: 'Ventas', h: 150, r: 'La tienda 14 (centro): un 18 % por debajo de su media. Coincide con una rotura de stock en 6 de sus productos más vendidos. Tengo la reposición preparada.', acts: ['Lánzala', 'Ver en 3D'] },
  { q: '¿Qué máquina me puede fallar?', a: 'Mantenimiento', h: 10, r: 'La prensa 3 de la línea 2: vibra un 22 % más que hace cinco días. Te propongo revisarla el jueves en el cambio de turno, para no parar la producción.', acts: ['Prográmalo', 'Ver la máquina'] },
  { q: '¿Cuántos huecos libres hay mañana?', a: 'Atención al cliente', h: 200, r: '23 huecos entre las 4 clínicas, 11 en la del norte. He escrito a 9 pacientes en lista de espera y 4 ya han reservado.', acts: ['Ver agenda', 'Sigue así'] },
  { q: '¿Quién me debe dinero?', a: 'Finanzas', h: 120, r: '12 facturas vencidas. Las 3 más antiguas suman 9.100 €. ¿Mando un recordatorio amable a todos o prefieres revisarlas antes?', acts: ['Envíalo', 'Revisar'] },
  { q: '¿Cómo van las obras?', a: 'Operaciones', h: 30, r: 'La obra de la avenida va al 62 %, cuatro días por delante. La del puerto, al 38 % y una semana tarde por una entrega de material. Ya he pedido fecha nueva al proveedor.', acts: ['Ver las obras', 'Gracias'] },
  { q: '¿Qué habitaciones quedan para esta noche?', a: 'Ventas', h: 150, r: 'Quedan 7 libres: 5 dobles y 2 suites. Las 3 que se están limpiando estarán listas a las 14:00.', acts: ['Ver el hotel', 'Ok'] }
];
/* =============== HERO: un mundo de negocios con un equipo de agentes =============== */
(function hero() {
  const canvas = $('#e3Hero'); if (!canvas) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, powerPreference: 'high-performance' }); } catch (e) { return; }
  renderer.setPixelRatio(DPR); renderer.setClearColor(0x000000, 1);
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x000000, 70, 175);
  const camera = new THREE.PerspectiveCamera(small ? 48 : 34, 1, .1, 500);
  sizer(renderer, camera, canvas.parentElement); lights(scene);
  const world = new THREE.Group(); scene.add(world);

  const ground = new THREE.Mesh(new THREE.CircleGeometry(160, 64), mat(0x030405, { roughness: 1 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -.62; world.add(ground);
  const pg = new THREE.PolarGridHelper(60, 24, 8, 96, 0x0f2630, 0x0a161c); pg.position.y = -.6; world.add(pg);

  // núcleo de IA
  const core = new THREE.Group(); world.add(core);
  const cplat = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 7, .8, 64), mat(0x0a1016, { roughness: .6 })); cplat.position.y = -.4; core.add(cplat);
  const cedge = new THREE.Mesh(new THREE.TorusGeometry(6.6, .07, 8, 96), glow(C.cyan, .9)); cedge.rotation.x = Math.PI / 2; core.add(cedge);
  const ico = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3, 1)), new THREE.LineBasicMaterial({ color: 0x9fe6f0, transparent: true, opacity: .9 })); ico.position.y = 5; core.add(ico);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 20), new THREE.MeshBasicMaterial({ color: 0x6fcad8 })); orb.position.y = 5; core.add(orb);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(2.3, 32, 20), new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: .18, blending: THREE.AdditiveBlending, depthWrite: false })); halo.position.y = 5; core.add(halo);
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(4.4, .05, 8, 96), glow(C.cyan, .7)); r1.position.y = 5; core.add(r1);
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(5.2, .04, 8, 96), glow(C.blue, .6)); r2.position.y = 5; core.add(r2);
  const beam = ring(6.8, 7.2, C.cyan, .5); beam.position.y = .02; core.add(beam);

  // islas de negocio
  const IDS = small ? ['tiendas', 'oficina', 'fabrica', 'clinicas', 'hosteleria', 'flotas'] : ['tiendas', 'oficina', 'fabrica', 'almacen', 'clinicas', 'hosteleria', 'flotas', 'hoteles'];
  const RAD = small ? 24 : 27, islands = [];
  IDS.forEach((id, k) => {
    const a = k / IDS.length * Math.PI * 2 + .3, x = Math.cos(a) * RAD, z = Math.sin(a) * RAD;
    const holder = new THREE.Group(); holder.position.set(x, 0, z); holder.scale.setScalar(.62); world.add(holder);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, .6, 64), mat(0x0a1016, { roughness: .9 })); plat.position.y = -.3; holder.add(plat);
    const e = new THREE.Mesh(new THREE.TorusGeometry(10, .08, 8, 96), glow(C.cyan, .55)); e.rotation.x = Math.PI / 2; holder.add(e);
    const g = new THREE.Group(); holder.add(g); g.rotation.y = -a + Math.PI / 2;
    const tick = BUILD[id](g);
    // enlace con el núcleo
    const from = new THREE.Vector3(0, 5, 0), to = new THREE.Vector3(x, 1.5, z), mid = new THREE.Vector3(x * .5, 10, z * .5);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)), new THREE.LineBasicMaterial({ color: C.cyan, transparent: true, opacity: .22 })); world.add(line);
    const agents = [0, 1].map(j => { const m = new THREE.Mesh(new THREE.SphereGeometry(.42, 14, 10), new THREE.MeshBasicMaterial({ color: j ? 0xb8eef2 : 0x7fb4ff })); world.add(m); return { m, o: Math.random(), sp: .12 + Math.random() * .08, dir: j ? 1 : -1 }; });
    islands.push({ id, holder, tick, curve, agents, x, z });
  });

  // etiquetas HTML
  const labelsBox = $('#e3Labels');
  const LBL = { tiendas: '<b>Tienda 14</b><i class="a"></i>Ventas −18 % · agente revisando stock', oficina: '<b>Atención al cliente</b><i></i>38 consultas resueltas hoy', fabrica: '<b>Línea 2</b><i class="r"></i>Vibración anormal · aviso enviado', clinicas: '<b>Clínica norte</b><i></i>3 huecos libres · llenando agenda', hosteleria: '<b>Restaurante centro</b><i></i>Mesas al 86 % · cocina al día', flotas: '<b>Furgoneta 07</b><i></i>En ruta · llega 12:40' };
  const labels = small ? [] : islands.filter(is => LBL[is.id] && ['tiendas', 'fabrica', 'clinicas', 'oficina'].includes(is.id)).map(is => { const el = document.createElement('div'); el.className = 'e3-lbl'; el.innerHTML = LBL[is.id]; labelsBox.appendChild(el); return { pos: new THREE.Vector3(is.x, 7, is.z), el }; });
  const v3 = new THREE.Vector3();
  const drawLabels = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    labels.forEach(l => {
      v3.copy(l.pos); world.localToWorld(v3); v3.project(camera);
      const x = (v3.x * .5 + .5) * w, y = (-v3.y * .5 + .5) * h;
      const cx = Math.abs(x - w / 2) < w * .34 && y > h * .15 && y < h * .8;
      const feed = x > w - 360 && y > h - 260;
      l.el.style.opacity = v3.z < 1 && x > 60 && x < w - 60 && y > 90 && y < h - 40 && !cx && !feed ? 1 : 0;
      l.el.style.transform = `translate(${x}px,${y}px) translate(-50%,-130%)`;
    });
  };

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  const R = small ? 86 : 80, H = small ? 62 : 44;
  const frame = (t, dt) => {
    mouse.x += (mouse.tx - mouse.x) * .04; mouse.y += (mouse.ty - mouse.y) * .04;
    const sc = clamp(scrollY / innerHeight);
    const ang = .6 + t * .03 + mouse.x * .25;
    camera.position.set(Math.sin(ang) * (R - sc * 16), H + mouse.y * 8 - sc * 10, Math.cos(ang) * (R - sc * 16));
    camera.lookAt(0, 2, 0);
    ico.rotation.y = t * .3; ico.rotation.x = t * .17; r1.rotation.x = Math.PI / 2 + Math.sin(t * .5) * .4; r1.rotation.y = t * .4; r2.rotation.x = Math.PI / 2 + Math.cos(t * .4) * .5; r2.rotation.z = t * .3;
    const pulse = 1 + Math.sin(t * 2) * .06; orb.scale.setScalar(pulse); halo.scale.setScalar(1 + Math.sin(t * 2) * .12);
    beam.scale.setScalar(1 + (t * .4 % 1) * .6); beam.material.opacity = .5 * (1 - (t * .4 % 1));
    islands.forEach(is => {
      is.tick && is.tick(t);
      is.agents.forEach(a => { let u = (a.o + t * a.sp) % 1; if (a.dir < 0) u = 1 - u; a.m.position.copy(is.curve.getPoint(u)); a.m.scale.setScalar(.8 + Math.sin(u * Math.PI) * .5); });
    });
    renderer.render(scene, camera); drawLabels();
  };
  if (reduce) { frame(0, 0); return; }
  loop(canvas, frame);
})();

/* =============== palabra que cambia en la etiqueta del hero =============== */
(function rotator() {
  const el = $('#e3Rot'); if (!el || reduce) return;
  const words = ['tiendas', 'oficinas', 'fábricas', 'clínicas', 'restaurantes', 'hoteles', 'almacenes', 'flotas', 'obras', 'inmobiliarias', 'tu empresa'];
  let k = 0;
  setInterval(() => { if (document.hidden) return; el.classList.add('out'); setTimeout(() => { k = (k + 1) % words.length; el.textContent = words[k]; el.classList.remove('out'); }, 350); }, 2200);
})();

/* =============== feed de agentes del hero =============== */
(function feed() {
  const ul = $('#e3Feed'); if (!ul || reduce) return;
  const msgs = [
    ['Atención al cliente', 'Responde 6 WhatsApp y agenda 2 citas'], ['Finanzas', 'Concilia 128 cobros de ayer'], ['Mantenimiento', 'Línea 2: vibración fuera de lo normal'],
    ['Compras y stock', 'Prepara la reposición de la tienda 14. Espera tu OK'], ['Ventas', 'Envía 3 presupuestos aprobados'], ['Dirección', 'Tu resumen del día, listo para las 9:00'],
    ['Logística', 'Reordena 4 entregas por un atasco'], ['Documentación', 'El seguro de la nave 2 vence en 15 días'], ['Atención al cliente', 'Llena 3 huecos libres de la clínica norte'],
    ['Calidad', 'Detecta un lote con más devoluciones de lo normal'], ['Soporte técnico', 'El TPV de la tienda 6 vuelve a enviar ventas'], ['Marketing', 'Responde 4 reseñas nuevas']];
  let k = 3;
  setInterval(() => {
    if (document.hidden) return;
    const [a, b] = msgs[k++ % msgs.length], li = document.createElement('li');
    li.innerHTML = '<b></b>'; li.firstChild.textContent = a; li.append(' ' + b);
    ul.prepend(li); while (ul.children.length > 3) ul.lastElementChild.remove();
  }, 3400);
})();

/* =============== el problema: diez herramientas → una vista =============== */
(function problem() {
  const sec = $('.e3-problem'); if (!sec) return;
  const items = $$('.e3-tool, .e3-core', sec);
  const upd = () => {
    const r = sec.getBoundingClientRect(), tot = r.height - innerHeight;
    const p = reduce ? 1 : clamp((-r.top / Math.max(1, tot) - .12) / .6);
    const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    items.forEach(el => el.style.setProperty('--p', e.toFixed(3)));
  };
  addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
})();

const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

/* =============== equipo de agentes en órbita =============== */
(function team() {
  const orbit = $('#e3Orbit'), panel = $('#e3Agent'); if (!orbit || !panel) return;
  const btns = AGENTS.map((a, k) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'e3-ag'; b.role = 'tab'; b.id = 'ag-' + k;
    b.style.setProperty('--h', a.h); b.setAttribute('aria-controls', 'e3Agent'); b.setAttribute('aria-selected', 'false');
    b.innerHTML = `<i>${a.k}</i><span>${esc(a.name)}</span>`;
    b.addEventListener('click', () => { user = true; show(k); }); orbit.appendChild(b); return b;
  });
  let cur = -1, user = false, rot = 0;
  const place = () => btns.forEach((b, k) => { const a = k / btns.length * Math.PI * 2 - Math.PI / 2 + rot; b.style.left = (50 + Math.cos(a) * 43) + '%'; b.style.top = (50 + Math.sin(a) * 43) + '%'; });
  function show(k) {
    if (k === cur) return; cur = k; const a = AGENTS[k];
    btns.forEach((b, i) => b.setAttribute('aria-selected', i === k));
    panel.setAttribute('aria-labelledby', 'ag-' + k); panel.style.setProperty('--h', a.h);
    panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap');
    panel.innerHTML = `<div class="e3-agent__h"><i>${a.k}</i><div><h3>Agente de ${esc(a.name.charAt(0).toLowerCase() + a.name.slice(1))}</h3><small>Trabajando ahora</small></div></div>
      <p>${esc(a.what)}</p>
      <div><h4>Por ejemplo</h4><ul class="e3-ex">${a.ex.map(([s, t]) => `<li><b>${esc(s)}</b><span>${esc(t)}</span></li>`).join('')}</ul></div>
      <div class="e3-agent__row"><div><h4>Te pide permiso para</h4><p>${esc(a.ok)}</p></div><div><h4>Cómo te avisa</h4><p>${esc(a.aviso)}</p></div></div>`;
  }
  place(); show(0);
  if (reduce) return;
  let vis = false; new IntersectionObserver(([e]) => vis = e.isIntersecting).observe(orbit);
  setInterval(() => { if (vis && !user && !document.hidden) show((cur + 1) % AGENTS.length); }, 4200);
  let last = performance.now();
  const spin = now => { const dt = (now - last) / 1000; last = now; if (vis) { rot += dt * .03; place(); } requestAnimationFrame(spin); };
  requestAnimationFrame(spin);
})();

/* =============== habla con tu empresa =============== */
(function talk() {
  const box = $('#e3Asks'), body = $('#e3ChatBody'); if (!box || !body) return;
  let busy = false, timer = 0, user = false, idx = 0;
  const chips = ASKS.map((a, k) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'e3-ask'; b.textContent = a.q; b.addEventListener('click', () => { user = true; ask(k); }); box.appendChild(b); return b; });
  const add = html => { const d = document.createElement('div'); d.innerHTML = html; const el = d.firstElementChild; body.appendChild(el); while (body.children.length > 6) body.firstElementChild.remove(); return el; };
  function ask(k) {
    if (busy) return; busy = true; idx = k;
    chips.forEach((c, i) => c.classList.toggle('is-on', i === k));
    const a = ASKS[k];
    add(`<div class="e3-bub e3-bub--me">${esc(a.q)}</div>`);
    const typing = add(`<div class="e3-bub e3-bub--ai" style="--h:${a.h}"><b><i>${esc(a.a.charAt(0))}</i>Agente de ${esc(a.a.toLowerCase())}</b><span class="e3-dots"><i></i><i></i><i></i></span></div>`);
    setTimeout(() => {
      typing.innerHTML = `<b><i>${esc(a.a.charAt(0))}</i>Agente de ${esc(a.a.toLowerCase())}</b>${esc(a.r)}<div class="e3-bub__acts">${a.acts.map(x => `<span>${esc(x)}</span>`).join('')}</div>`;
      busy = false;
    }, reduce ? 0 : 1100);
  }
  ask(0);
  if (reduce) return;
  let vis = false; new IntersectionObserver(([e]) => vis = e.isIntersecting, { threshold: .3 }).observe(body);
  timer = setInterval(() => { if (vis && !user && !document.hidden) ask((idx + 1) % ASKS.length); }, 5200);
  const mic = $('#e3Mic'); mic && mic.addEventListener('click', () => { mic.classList.toggle('is-on'); if (mic.classList.contains('is-on')) setTimeout(() => { mic.classList.remove('is-on'); user = true; ask(0); }, 1800); });
})();

/* =============== funcionalidades: pequeñas animaciones =============== */
(function features() {
  const crumbs = $('#e3Crumbs');
  if (crumbs && !reduce) {
    const sets = [['Empresa', 'Zona Sur', 'Tienda 14'], ['Empresa', 'Planta', 'Línea 2'], ['Empresa', 'Clínica norte', 'Sala 3'], ['Empresa', 'Nave 2', 'Estantería B4'], ['Empresa', 'Hotel centro', 'Planta 4']];
    let s = 0, k = 0;
    setInterval(() => {
      const sp = $$('span', crumbs);
      if (k === 0) { s = (s + 1) % sets.length; sp.forEach((x, i) => x.textContent = sets[s][i]); }
      sp.forEach((x, i) => x.classList.toggle('on', i === k)); k = (k + 1) % 3;
    }, 1800);
  }
  const clock = $('[data-clock]');
  if (clock && !reduce) { const t0 = performance.now(); setInterval(() => { const f = Math.min(1, (((performance.now() - t0) / 8000) % 1) / .8); const m = 360 + Math.round(f * 720); clock.textContent = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }, 120); }
  const heat = $('#e3Heat');
  if (heat) {
    const cells = Array.from({ length: 96 }, () => heat.appendChild(document.createElement('i')));
    const paint = t => cells.forEach((c, i) => { const x = i % 16, y = Math.floor(i / 16); const v = Math.max(0, Math.sin(x * .55 + t) * Math.cos(y * .9 - t * .7)) ** 2; c.style.setProperty('--o', (.06 + v * .85).toFixed(2)); });
    let t = 0; paint(t); if (!reduce) setInterval(() => { if (!document.hidden) paint(t += .35); }, 1400);
  }
  // simulador con escenarios de varios sectores
  const tabs = $('#e3SimTabs'), sim = $('#e3Sim'), q = $('#e3SimQ'), out = $('#e3SimOut'), res = $('#e3SimRes');
  if (tabs && sim) {
    const SC = [
      { t: 'Tiendas', q: '¿Y si abro los sábados por la tarde?', unit: n => n ? `${n} tienda${n > 1 ? 's' : ''}` : 'Ninguna', max: 4, r: [['Ventas de la semana', n => `+${[0, 2, 4, 5, 7][n]} %`], ['Horas de equipo', n => `+${n * 4} h`], ['Margen', n => `+${[0, 1.4, 2.6, 3.1, 3.9][n].toLocaleString('es-ES')} %`]] },
      { t: 'Fábrica', q: '¿Y si añado un turno de noche?', unit: n => n ? `${n} línea${n > 1 ? 's' : ''}` : 'Ninguna', max: 3, r: [['Producción', n => `+${[0, 18, 34, 47][n]} %`], ['Pedidos a tiempo', n => `${[86, 92, 96, 97][n]} %`], ['Coste por unidad', n => `${['0', '−3', '−5', '−4'][n]} %`]] },
      { t: 'Clínicas', q: '¿Y si alargo el horario de tarde?', unit: n => n ? `+${n} h al día` : 'Igual', max: 3, r: [['Citas a la semana', n => `+${[0, 42, 80, 104][n]}`], ['Lista de espera', n => `${['0', '−35', '−60', '−70'][n]} %`], ['Ocupación', n => `${[94, 91, 88, 82][n]} %`]] },
      { t: 'Flota', q: '¿Y si añado vehículos?', unit: n => n ? `+${n} vehículo${n > 1 ? 's' : ''}` : 'Igual', max: 4, r: [['Entregas a tiempo', n => `${[88, 91, 94, 96, 97][n]} %`], ['Horas extra', n => `${['0', '−11', '−22', '−31', '−38'][n]} %`], ['Uso de la flota', n => `${[92, 88, 84, 80, 77][n]} %`]] }
    ];
    let cur = 0;
    const draw = () => { const s = SC[cur], n = +sim.value; out.textContent = s.unit(n); res.innerHTML = s.r.map(([l, f]) => `<div><small>${l}</small><b>${f(n)}</b></div>`).join(''); };
    SC.forEach((s, k) => { const b = document.createElement('button'); b.type = 'button'; b.role = 'tab'; b.textContent = s.t; b.setAttribute('aria-selected', k === 0); b.addEventListener('click', () => { cur = k; $$('button', tabs).forEach((x, i) => x.setAttribute('aria-selected', i === k)); q.textContent = s.q; sim.max = s.max; sim.value = Math.min(2, s.max); draw(); }); tabs.appendChild(b); });
    sim.addEventListener('input', draw); q.textContent = SC[0].q; sim.max = SC[0].max; draw();
  }
})();

/* =============== sectores: pestañas y diorama =============== */
(function sectors() {
  const tabs = $('#e3Tabs'), panel = $('#e3Panel'), canvas = $('#e3Diorama'); if (!tabs || !panel) return;
  SECTORS.forEach((s, k) => {
    const b = document.createElement('button'); b.className = 'e3-tab'; b.type = 'button'; b.role = 'tab'; b.id = 'tab-' + s.id;
    b.setAttribute('aria-selected', k === 0); b.setAttribute('aria-controls', 'e3Panel'); b.innerHTML = `<small>${String(k + 1).padStart(2, '0')}</small>${esc(s.tab)}`;
    b.addEventListener('click', () => select(k, true)); tabs.appendChild(b);
  });
  tabs.addEventListener('keydown', e => { const cur = SECTORS.findIndex((_, k) => tabs.children[k].getAttribute('aria-selected') === 'true'); if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + SECTORS.length) % SECTORS.length; select(n, true); tabs.children[n].focus(); } });

  // escena
  let scene, camera, renderer, holder, cur = null, next = null, swapT = 1, tick = () => {}, drag = 0, dragV = 0;
  if (canvas) {
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { renderer = null; }
    if (renderer) {
      renderer.setPixelRatio(DPR); renderer.setClearColor(0x000000, 0);
      scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(34, 1, .1, 200);
      sizer(renderer, camera, canvas.parentElement); lights(scene);
      holder = new THREE.Group(); scene.add(holder);
      const plat = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, .6, 72), mat(0x0a1016, { roughness: .9 })); plat.position.y = -.3; holder.add(plat);
      const edge = new THREE.Mesh(new THREE.TorusGeometry(10, .05, 8, 128), glow(C.cyan, .7)); edge.rotation.x = Math.PI / 2; holder.add(edge);
      const pg = new THREE.PolarGridHelper(9.6, 12, 6, 64, 0x123744, 0x0c222b); pg.position.y = .002; holder.add(pg);
      let down = false, lx = 0;
      canvas.parentElement.addEventListener('pointerdown', e => { down = true; lx = e.clientX; });
      addEventListener('pointerup', () => down = false);
      addEventListener('pointermove', e => { if (!down) return; dragV = (e.clientX - lx) * .006; drag += dragV; lx = e.clientX; });
    }
  }
  const make = k => { const g = new THREE.Group(); const fn = BUILD[SECTORS[k].id](g); g.userData.tick = fn; return g; };
  function select(k, user) {
    [...tabs.children].forEach((b, i) => b.setAttribute('aria-selected', i === k));
    const s = SECTORS[k];
    panel.classList.remove('is-swap'); void panel.offsetWidth; panel.classList.add('is-swap');
    panel.setAttribute('aria-labelledby', 'tab-' + s.id);
    panel.innerHTML = `<h3>${esc(s.title)}</h3><p>${esc(s.intro)}</p>
      <div><h4>Qué ves en 3D</h4><ul>${s.ve.map(v => `<li>${esc(v)}</li>`).join('')}</ul></div>
      <div><h4>Agentes que trabajan</h4><div class="e3-agentchips">${s.agentes.map(a => `<span>Agente de ${esc(a.charAt(0).toLowerCase() + a.slice(1))}</span>`).join('')}</div></div>
      <div><h4>De dónde salen los datos</h4><div class="e3-datachips">${s.datos.map(d => `<span>${esc(d)}</span>`).join('')}</div></div>
      ${s.demo ? `<a class="btn btn--grad btn--sm" href="${esc(s.demo)}">Ver la demo de ${esc(s.tab.toLowerCase())}</a>` : `<a class="btn btn--ghost btn--sm" href="#contacto">Pide la demo de ${esc(s.tab.toLowerCase())}</a>`}`;
    if (!renderer) return;
    next = make(k); next.scale.setScalar(.001); holder.add(next); swapT = 0;
    if (!user && !cur) { cur = next; next = null; cur.scale.setScalar(1); swapT = 1; }
  }
  select(0, false);
  if (!renderer) return;
  const ease = x => 1 - Math.pow(1 - x, 3);
  const frame = (t, dt) => {
    if (next) {
      swapT = Math.min(1, swapT + dt / .7);
      if (cur) cur.scale.setScalar(Math.max(.001, 1 - ease(Math.min(1, swapT * 2))));
      next.scale.setScalar(Math.max(.001, ease(clamp(swapT * 1.6 - .5))));
      if (swapT >= 1) { if (cur) holder.remove(cur); cur = next; next = null; cur.scale.setScalar(1); }
    }
    dragV *= .92; drag += dragV * .2;
    holder.rotation.y = (reduce ? .6 : t * .12) + drag;
    const w = canvas.clientWidth, far = w < 500 ? 30 : 25.5;
    camera.position.set(0, far * .58, far); camera.lookAt(0, 1.4, 0);
    [cur, next].forEach(g => g && g.userData.tick && g.userData.tick(t));
    renderer.render(scene, camera);
  };
  if (reduce) { frame(0, 1); return; }
  loop(canvas, frame);
})();

/* =============== conectores =============== */
(function connectors() {
  const L = [['Gmail', 'Correo', 4], ['Google Calendar', 'Agenda', 215], ['Google Sheets', 'Hojas de cálculo', 140], ['Outlook', 'Correo y agenda', 205], ['Slack', 'Mensajería', 300], ['WhatsApp', 'Mensajería', 142], ['Odoo', 'ERP', 290],
    ['Holded', 'ERP y facturación', 350], ['HubSpot', 'CRM', 16], ['Stripe', 'Cobros', 250], ['Jira', 'Proyectos e incidencias', 218], ['Samsara', 'Gestión de flotas', 196], ['Webfleet', 'Gestión de flotas', 0], ['Tu ERP', 'Con API o exportación de datos', 186]];
  const pill = ([n, s, h]) => `<span class="e3-pill"><i style="--h:${h}">${n.replace('Tu ', '').charAt(0)}</i><span>${n}<br><small>${s}</small></span></span>`;
  const half = Math.ceil(L.length / 2), a = L.slice(0, half), b = L.slice(half);
  const m1 = $('#e3M1'), m2 = $('#e3M2');
  if (m1) m1.innerHTML = [...a, ...a, ...a, ...a].map(pill).join('');
  if (m2) m2.innerHTML = [...b, ...b, ...b, ...b].map(pill).join('');
  [m1, m2].forEach(m => m && m.querySelectorAll('.e3-pill').forEach((p, i) => { if (i >= (m === m1 ? a : b).length) p.setAttribute('aria-hidden', 'true'); }));
})();

/* =============== pasos: línea que se dibuja =============== */
(function steps() {
  const list = $('.e3-steps__list'); if (!list) return;
  const upd = () => { const r = list.getBoundingClientRect(); list.style.setProperty('--line', reduce ? 1 : clamp((innerHeight * .85 - r.top) / (r.height + innerHeight * .3)).toFixed(3)); };
  addEventListener('scroll', upd, { passive: true }); upd();
})();
