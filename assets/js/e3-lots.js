/* NexGent 3D · los negocios en miniatura. Cada función construye una parcela de 20×20 y devuelve su animación. */
import { THREE, P, std, lit, glowAdd, mk, rb, bx, cyl, cone, ico, sph, dyn, gable, saw, pool, ring, line, wins, winsBox, tiles, lamp, tree, palm, stack, pin, bars, smoke, car, van, truck, forklift, pathAt } from './e3-kit.js';

const PI = Math.PI;
const place = (g, o, x, z, ry = 0, s = 1) => { o.position.set(x, 0, z); o.rotation.y = ry; o.scale.setScalar(s); g.add(o); return o; };
const blink = (o, t, period = 1.4, phase = 0) => { o.visible = ((t + phase) % period) < period * .5; };

export const LOTS = {
  /* ---------- red de tiendas ---------- */
  tiendas(g) {
    const cols = [P.teal, 0xff8a5c, 0x9b7bff], holo = [];
    [-6.3, 0, 6.3].forEach((x, k) => {
      const h = k === 1 ? 4.6 : 3.7, z = -5.4;
      rb(g, 5.7, h, 6, std(k === 1 ? P.wallLight : P.wall, .6, .1), x, 0, z, .22);
      rb(g, 6, .28, 6.3, std(P.roof, .45, .4), x, h, z, .1);
      bx(g, 4.7, 2, .08, lit(P.warm, 1.7), x, .3, z + 3.02);
      [-1.6, 0, 1.6].forEach(dx => bx(g, .09, 2, .12, std(P.wallDark, .5, .4), x + dx, .3, z + 3.05));
      const aw = rb(g, 5.3, .16, 1.5, std(cols[k], .55), x, 2.62, z + 3.6, .06); aw.rotation.x = .22;
      bx(g, 3.2, .52, .1, lit(cols[k], 2.4), x, h - .95, z + 3.04);
      pool(g, x, z + 4.8, 3.8, P.warm, .55);
      rb(g, 1.3, .55, 1.3, std(P.metal, .4, .7), x + 1.3, h + .28, z - 1, .08); rb(g, .8, .4, .8, std(P.metal, .4, .7), x - 1.4, h + .28, z + .4, .08);
      holo.push(bars(g, x, h + 1.5, z, 4, k === 2 ? P.red : P.teal));
    });
    for (let i = 0; i < 8; i++) bx(g, .07, .02, 2.6, lit(0xffffff, .5), -8.4 + i * 2.4, 0, 4.3);
    [[-7.2, 0xb7c2ce], [-2.4, 0x2c3a4b], [2.4, 0xb23a48], [7.2, 0xc4ced8]].forEach(([x, c]) => place(g, car(c), x, 4.3, PI / 2));
    lamp(g, -9.2, 7.6); lamp(g, 9.2, 7.6, PI); tree(g, -5, 8.5, .9); tree(g, 0, 8.7); tree(g, 5, 8.5, 1.1);
    const p = dyn(g, 6.3, 7.4, -5.4); p.add(pin(P.red));
    return t => { holo.forEach((b, i) => b.tick(t, i)); p.position.y = 7.6 + Math.sin(t * 2.2) * .22; p.rotation.y = t; };
  },

  /* ---------- oficina y servicios ---------- */
  oficina(g) {
    rb(g, 8, 15, 8, std(0x131c27, .14, .8, { envMapIntensity: 1.5 }), -2.6, 0, -3, .4);
    winsBox(g, { x: -2.6, z: -3, w: 8, d: 8, y: 2.2, rows: 11, cw: .62, ch: .7, gx: .3, gy: .42, warm: .5, on: .62, k: 2.1 });
    bx(g, 6.2, 1.5, .06, lit(P.warm, 1.6), -2.6, .2, 1.04); pool(g, -2.6, 2.8, 4.6, P.warm, .55);
    rb(g, 8.3, .3, 8.3, std(P.roof, .4, .6), -2.6, 15, -3, .1); rb(g, 1.8, .8, 1.8, std(P.metal, .4, .7), -1.2, 15.3, -1.6, .1); rb(g, 1.2, .6, 2.2, std(P.metal, .4, .7), -4.4, 15.3, -4.2, .1);
    cyl(g, .05, .09, 3.6, std(P.metal, .3, .9), -4.6, 15.3, -1.2, 6);
    const beacon = sph(dyn(g), .15, lit(P.red, 5), -4.6, 19, -1.2);
    rb(g, 7.2, 5, 6.5, std(P.wallLight, .65), 5.6, 0, -3.8, .28);
    winsBox(g, { x: 5.6, z: -3.8, w: 7.2, d: 6.5, y: 1.1, rows: 3, cw: .85, ch: .8, gx: .42, gy: .5, warm: .35, on: .75, sides: 'fr', k: 1.9 });
    rb(g, 7.5, .22, 6.8, std(P.roof, .5, .4), 5.6, 5, -3.8, .08);
    [[4, -5], [7.2, -2.6]].forEach(([x, z]) => { rb(g, 1.2, .5, 1.2, std(0x3a4654, .7), x, 5.2, z, .1); ico(g, .62, std(P.leaf, .85, 0, { flatShading: true }), x, 6.25, z); });
    tree(g, -8.2, 6.6, 1.15); tree(g, -5.2, 8.3, .9); tree(g, 3.2, 7.4); tree(g, 8.2, 6.4, 1.2); lamp(g, 0, 5.8); lamp(g, 6.4, 2.6, PI / 2);
    rb(g, 3, .34, .9, std(P.wallLight, .8), 1.4, 0, 3.6, .1); rb(g, 3, .34, .9, std(P.wallLight, .8), -6.4, 0, 3.6, .1);
    const h = dyn(g), tor = (r, y, k) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, .045, 8, 96), lit(P.teal, k)); m.rotation.x = PI / 2; m.position.set(-2.6, y, -3); h.add(m); return m; };
    const r1 = tor(6.6, 11, 2.4), r2 = tor(5.4, 17.2, 1.6);
    return t => { r1.position.y = 8.5 + Math.sin(t * .5) * 5; r1.rotation.z = t * .3; r2.rotation.z = -t * .5; blink(beacon, t); };
  },

  /* ---------- fábrica ---------- */
  fabrica(g) {
    const wall = std(0x2b3846, .6, .25);
    rb(g, 13, 4.4, 8, wall, -2.3, 0, -4.6, .15);
    for (let k = 0; k < 4; k++) { const x = -7.175 + k * 3.25; saw(g, 3.25, 1.7, 8, std(P.roof, .45, .5), x, 4.4, -4.6); bx(g, .05, 1.2, 7.2, lit(P.cool, 1.5), x + 1.66, 4.6, -4.6); }
    bx(g, 2.8, 2.8, .08, lit(P.warm, 1.5), -6, 0, -.56); pool(g, -6, 1.2, 3.6, P.warm, .6);
    wins(g, { cols: 5, rows: 1, w: 1.1, h: .75, gx: .5, x: .4, y: 2.5, z: -.57, warm: .85, on: .85 });
    const beacons = [];
    [[6.2, -7.4, 8.4], [8, -7.4, 9.6]].forEach(([x, z, h]) => { cyl(g, .42, .62, h, std(0x98a4b0, .7, .1), x, 0, z, 16); cyl(g, .47, .47, .55, std(P.red, .6), x, h - 1.6, z, 16); beacons.push(sph(dyn(g), .13, lit(P.red, 5), x + .5, h - .2, z)); });
    const sm1 = smoke(g, 6.2, 8.5, -7.4), sm2 = smoke(g, 8, 9.7, -7.4);
    [[6.3, -3], [8.3, -3]].forEach(([x, z]) => { cyl(g, .95, .95, 4.2, std(0xc0cad4, .3, .8), x, 0, z, 20); const d = sph(g, .95, std(0xc0cad4, .3, .8), x, 4.2, z); d.scale.y = .5; cyl(g, 1, 1, .1, std(P.teal, .5), x, 2.6, z, 20); });
    rb(g, 13.5, .22, 1.25, std(0x1a222c, .45, .6), -1.6, .92, 2.8, .05); for (let x = -7.6; x <= 4.6; x += 2) bx(g, .12, .92, 1, std(P.metal, .4, .7), x, 0, 2.8);
    bx(g, 13.3, .03, .05, lit(P.teal, 1.2), -1.6, 1.15, 3.44);
    const belt = dyn(g), crates = Array.from({ length: 7 }, (_, k) => rb(belt, .75, .6, .75, std(k % 3 ? P.wood : 0xb7c2ce, .8), 0, 1.14, 2.8, .06));
    const arm = dyn(g, 6.5, 0, 2.8); rb(arm, 1.1, .55, 1.1, std(0x2c3742, .5, .5), 0, 0, 0, .12);
    const a1 = new THREE.Group(); a1.position.y = .55; arm.add(a1); rb(a1, .34, 2.3, .34, std(P.yellow, .45, .2), 0, 0, 0, .1);
    const a2 = new THREE.Group(); a2.position.y = 2.2; a1.add(a2); rb(a2, 2, .28, .28, std(P.yellow, .45, .2), -.85, 0, 0, .1); bx(a2, .12, .5, .4, lit(P.teal, 2.5), -1.8, -.45, 0);
    [-6, -2.3, 1.4].forEach((x, k) => sph(g, .17, lit([P.green, P.green, P.amber][k], 4), x, 3.7, -.5));
    place(g, forklift(), -7, 6.6, .5); stack(g, -3.4, 6.6, 2); stack(g, -1.6, 7.6, 1); stack(g, .4, 6.4, 3);
    lamp(g, -9.2, 4.4); lamp(g, 9.2, 7.6, PI); tree(g, 8.4, 5.2);
    return t => { crates.forEach((c, k) => { const x = ((t * 1.3 + k * 13 / 7) % 13) - 8.1; c.position.x = x; }); a1.rotation.y = Math.sin(t * .8) * 1.1; a2.rotation.z = Math.sin(t * 1.3) * .25; sm1(t); sm2(t + 2); beacons.forEach((b, k) => blink(b, t, 1.6, k * .8)); };
  },

  /* ---------- almacén ---------- */
  almacen(g) {
    rb(g, 15.4, 6, 9.4, std(0x222d3a, .55, .25), -1.2, 0, -4.8, .2);
    gable(g, 15.8, 1.4, 9.8, std(P.roof, .35, .6), -1.2, 6, -4.8);
    bx(g, 15.42, .22, 9.42, std(P.teal, .5), -1.2, 4.9, -4.8);
    [-6, -1.2, 3.6].forEach((x, k) => {
      bx(g, 3.1, 3.3, .08, k === 1 ? lit(P.warm, 1.5) : std(0x93a2b3, .45, .7), x, 0, -.06); bx(g, 3.3, .14, .12, lit(k === 2 ? P.amber : P.green, 3), x, 3.5, -.04);
      if (k === 1) pool(g, x, 1.8, 4, P.warm, .6);
    });
    place(g, truck(), -6, 3.4, -PI / 2, .9);
    const mv = dyn(g); const t2 = truck(0xc9d2dc, P.blue); t2.scale.setScalar(.9); mv.add(t2);
    const fk = dyn(g); fk.add(forklift());
    stack(g, 8, 1.6, 3); stack(g, 8.2, 3.8, 2); stack(g, 6.4, 2.4, 2); stack(g, 8, 6.4, 1);
    lamp(g, -9.3, 2, 0, 4.4); lamp(g, 9.3, 8.6, PI, 4.4);
    const heat = tiles(g, { cols: 7, rows: 3, s: .85, gap: .16, x: -1.2, y: 9.6, z: -4.8, tilt: -.75 }); let last = -1;
    return t => {
      const p = (t * .12) % 1, z = p < .5 ? 3.4 + (1 - Math.min(1, p * 4)) * 0 : 3.4; mv.position.set(3.6, 0, 3.4 + (p < .35 ? 0 : p < .6 ? (p - .35) * 24 : p < .75 ? 6 : (1 - p) * 24)); mv.rotation.y = -PI / 2; void z;
      const q = pathAt([[-8.5, 7.6], [5, 7.6], [5, 8.9], [-8.5, 8.9]], t * 1.6); fk.position.set(q.x, 0, q.z); fk.rotation.y = q.ry;
      const s = Math.floor(t / 1.6); if (s !== last) { last = s; heat.set([[P.teal, .25], [P.teal, .6], [P.teal, 1], [P.amber, 1], [P.teal, .45]]); }
    };
  },

  /* ---------- flota y logística ---------- */
  flotas(g) {
    rb(g, 7.2, 3.7, 5, std(P.wallLight, .65), -5.6, 0, -6.6, .22); rb(g, 7.5, .25, 5.3, std(P.roof, .5, .4), -5.6, 3.7, -6.6, .1);
    wins(g, { cols: 4, rows: 1, w: 1.05, h: .95, gx: .42, x: -5.6, y: 1.5, z: -4.08, warm: .3, on: .9 });
    bx(g, 2.4, .46, .1, lit(P.teal, 2.4), -5.6, 2.9, -4.07); pool(g, -5.6, -2.6, 3.6, P.cool, .35);
    rb(g, 8.6, .2, 3.4, std(P.roof, .4, .6), 4.6, 3.2, -7.4, .06); [[.8, -6], [8.4, -6], [.8, -8.8], [8.4, -8.8]].forEach(([x, z]) => cyl(g, .07, .07, 3.2, std(P.metal, .4, .8), x, 0, z, 8));
    bx(g, 8.2, .05, .1, lit(P.cool, 2.2), 4.6, 3.12, -5.8);
    [2, 4.6, 7.2].forEach((x, k) => { rb(g, .5, 1.5, .42, std(0xc4ced8, .4), x, 0, -8.6, .08); bx(g, .3, .5, .05, lit(k === 1 ? P.amber : P.green, 3), x, .8, -8.37); });
    const st = [P.green, P.green, P.amber, P.red];
    [1.4, 3.8, 6.2, 8.6].forEach((x, k) => { place(g, k % 2 ? van() : truck(), x, -4.6 + (k % 2 ? .4 : 0), -PI / 2, k % 2 ? .82 : .62); const r = ring(1.25, 1.5, st[k], 1.8); r.position.set(x, .04, -3.4); g.add(r); });
    const route = [[-7.6, 2], [7.6, 2], [7.6, 8], [-7.6, 8]];
    route.forEach((p, i) => { const q = route[(i + 1) % 4], dx = q[0] - p[0], dz = q[1] - p[1], n = Math.round(Math.hypot(dx, dz) / 1.2); for (let k = 0; k < n; k += 2) bx(g, Math.abs(dx) ? .6 : .1, .02, Math.abs(dz) ? .6 : .1, lit(P.teal, 1.1), p[0] + dx * (k + .5) / n, 0, p[1] + dz * (k + .5) / n); });
    const mv = dyn(g); const tr = truck(0xc9d2dc, P.teal); tr.scale.setScalar(.62); mv.add(tr); const rr = ring(1.3, 1.55, P.green, 1.8); rr.position.y = .05; mv.add(rr);
    const mv2 = dyn(g); const vn = van(0x2c3a4b, P.amber); vn.scale.setScalar(.8); mv2.add(vn);
    const hp = [[-7, 6.2, -1], [-2, 8.4, 2.6], [3, 7, .6], [7.4, 9, 4.4]]; line(g, hp, P.teal, .9);
    const pins = hp.map(([x, y, z], k) => { const d = dyn(g, x, y, z); const p = pin(k === 3 ? P.amber : P.teal, 2.2); p.scale.setScalar(.75); d.add(p); return d; });
    const dot = sph(dyn(g), .2, lit(0xffffff, 4), 0, 0, 0);
    lamp(g, -9.2, 5, 0); tree(g, -8.6, -1.2); tree(g, 9, 5.2, .9);
    return t => {
      const a = pathAt(route, t * 2.2); mv.position.set(a.x, 0, a.z); mv.rotation.y = a.ry;
      const b = pathAt(route, t * 2.2 + 21); mv2.position.set(b.x, 0, b.z); mv2.rotation.y = b.ry;
      pins.forEach((p, k) => { p.position.y = hp[k][1] + .3 + Math.sin(t * 2 + k) * .15; });
      const f = (t * .25) % 1, s = Math.min(2, Math.floor(f * 3)), u = f * 3 - s; dot.position.set(hp[s][0] + (hp[s + 1][0] - hp[s][0]) * u, hp[s][1] + (hp[s + 1][1] - hp[s][1]) * u, hp[s][2] + (hp[s + 1][2] - hp[s][2]) * u);
    };
  },

  /* ---------- clínicas ---------- */
  clinicas(g) {
    const white = std(0xc6d0da, .5, .05);
    rb(g, 11.4, 4.8, 7.4, white, -1.6, 0, -4.8, .7); rb(g, 11.7, .26, 7.7, std(0xc9d3dc, .5), -1.6, 4.8, -4.8, .12);
    wins(g, { cols: 5, rows: 2, w: 1.35, h: 1.1, gx: .5, gy: .75, x: -1.6, y: .95, z: -1.07, warm: .12, on: .88, k: 1.7 });
    wins(g, { cols: 3, rows: 2, w: 1.35, h: 1.1, gx: .6, gy: .75, x: 4.12, y: .95, z: -4.8, ry: PI / 2, warm: .12, on: .8, k: 1.7 });
    rb(g, 3.6, .2, 2.2, std(P.teal, .4, .2), -1.6, 2.7, .1, .08); [[-3.1, 1], [-.1, 1]].forEach(([x, z]) => cyl(g, .07, .07, 2.7, std(P.metal, .3, .8), x, 0, z, 8));
    bx(g, 2.2, 2.1, .06, lit(P.cool, 1.8), -1.6, .1, -1.05); pool(g, -1.6, 1.4, 4, P.cool, .5);
    rb(g, 1.9, 1.9, 1.9, white, 2.4, 5.05, -6.2, .25);
    [[1.15, .34], [.34, 1.15]].forEach(([w, h]) => bx(g, w, h, .07, lit(P.teal, 3.4), 2.4, 6 - h / 2, -5.22));
    const amb = place(g, van(0xcfd7df, P.red), 6.4, 3.4, PI / 2, .85); void amb;
    const bl = sph(dyn(g), .16, lit(0x4aa3ff, 6), 6.4, 1.75, 3.2);
    rb(g, 7, .55, .6, std(P.leaf, .9), -3.4, 0, 3.2, .2); rb(g, 2.6, .34, .8, std(0xbcc7d2, .8), -6.4, 0, 5.6, .1); rb(g, 2.6, .34, .8, std(0xbcc7d2, .8), 1.2, 0, 5.6, .1);
    tree(g, -8.4, 1.4, 1.1); tree(g, -8.2, 7.6, .95); tree(g, 8.4, -2, 1.2); tree(g, 3.6, 8, .9); lamp(g, -2.6, 7.4); lamp(g, 9, 7.6, PI);
    const ag = tiles(g, { cols: 6, rows: 3, s: .85, gap: .18, x: -1.6, y: 7.9, z: -4.8, tilt: -.7 }); let last = -1;
    return t => { blink(bl, t, .7); const s = Math.floor(t / 1.4); if (s !== last) { last = s; ag.set([[P.green, 1], [P.green, 1], [P.green, .9], [P.amber, 1], [0x2a3a48, 1]]); } };
  },

  /* ---------- hostelería ---------- */
  hosteleria(g) {
    rb(g, 9.4, 4.3, 6, std(0x4a3029, .75), -3.8, 0, -6, .22); rb(g, 9.7, .3, 6.3, std(P.roof, .5, .3), -3.8, 4.3, -6, .1);
    wins(g, { cols: 3, rows: 1, w: 2.3, h: 1.9, gx: .5, x: -3.8, y: .45, z: -2.97, warm: 1, on: 1, k: 2, fixed: true });
    const aw = rb(g, 9, .16, 1.7, std(0xc0483f, .6), -3.8, 2.8, -2.3, .06); aw.rotation.x = .22;
    bx(g, 3.8, .56, .1, lit(0xffa24a, 3), -3.8, 3.5, -2.96); pool(g, -3.8, -.8, 5.4, P.warm, .65);
    rb(g, .9, 1.7, .9, std(0x4a3029, .75), -6.4, 4.4, -7.4, .08); const sm = smoke(g, -6.4, 6.2, -7.4, 4);
    rb(g, 3.6, 3, 3.4, std(P.wallLight, .65), 6, 0, -6.6, .2); bx(g, 2.4, 1.2, .06, lit(P.warm, 1.9), 6, 1.1, -4.88); rb(g, 3.9, .22, 3.7, std(P.teal, .5), 6, 3, -6.6, .08);
    const dots = [];
    [-7, -3.2, .6, 4.4].forEach((x, i) => [1.6, 5.4].forEach((z, j) => {
      cyl(g, .07, .09, .78, std(P.metal, .4, .7), x, 0, z, 8); cyl(g, .78, .78, .08, std(0xd9c3a3, .6), x, .78, z, 22);
      [[.95, 0], [-.95, 0], [0, .95], [0, -.95]].forEach(([dx, dz]) => cyl(g, .22, .2, .46, std(0x2c3742, .6), x + dx, 0, z + dz, 10));
      cyl(g, .035, .035, 2.5, std(P.metal, .4, .7), x, .82, z, 6); cone(g, 1.45, .55, std((i + j) % 2 ? 0xefe6d6 : 0xd8553f, .8), x, 2.75, z, 10);
      sph(g, .09, lit(P.warm, 4), x, 1, z); pool(g, x, z, 1.9, P.warm, .4);
      dots.push(sph(dyn(g), .17, lit(P.green, 3.5), x, 3.6, z));
    }));
    [[-9, .4], [7.6, .4], [-9, 7.4], [7.6, 7.4]].forEach(([x, z]) => cyl(g, .05, .05, 3.6, std(P.metal, .4, .7), x, 0, z, 6));
    [.4, 7.4].forEach(z => { for (let k = 0; k <= 16; k++) { const u = k / 16; sph(g, .085, lit(P.warm, 5), -9 + u * 16.6, 3.55 - Math.sin(u * PI) * .55, z); } });
    tree(g, 8.4, 3.6, 1.1); tree(g, 8.6, -2.4, .9); lamp(g, -9.2, -2.2);
    const sc = new THREE.Group(); rb(sc, 1.3, .45, .4, std(P.red, .4, .3), 0, .3, 0, .12); rb(sc, .5, .5, .5, std(0x1b232d, .5), -.45, .7, 0, .08); [[.5, 0], [-.5, 0]].forEach(([x]) => { const w = mk(sc, new THREE.CylinderGeometry(.2, .2, .12, 12), std(0x05070a, .9), x, .2, 0); w.rotation.x = PI / 2; }); place(g, sc, 3.4, 8.4, .3);
    let last = -1;
    return t => { sm(t); const s = Math.floor(t / 1.7); if (s !== last) { last = s; dots.forEach(d => { const r = Math.random(); d.material = lit(r < .5 ? P.amber : r < .82 ? P.green : P.teal, 3.5); }); } };
  },

  /* ---------- hoteles ---------- */
  hoteles(g) {
    rb(g, 13.4, 11.2, 5, std(0xc2ccd6, .55), -1.2, 0, -6.4, .3);
    wins(g, { cols: 8, rows: 6, w: .98, h: .95, gx: .52, gy: .68, x: -1.2, y: 1.75, z: -3.87, warm: .8, on: .68, k: 2.1, pal: [P.warm, P.warm, P.warm, 0xffd9a8, P.cool] });
    for (let j = 0; j < 6; j++) { bx(g, 12.8, .09, .62, std(0xbcc7d2, .5), -1.2, 1.62 + j * 1.63, -3.6); bx(g, 12.8, .4, .04, std(0x9fb0c0, .2, .8, { transparent: true, opacity: .35 }), -1.2, 1.7 + j * 1.63, -3.3); }
    wins(g, { cols: 2, rows: 6, w: .98, h: .95, gx: .9, gy: .68, x: 5.52, y: 1.75, z: -6.4, ry: PI / 2, warm: .8, on: .6, k: 2.1 });
    rb(g, 13.7, .36, 5.3, std(P.roof, .45, .4), -1.2, 11.2, -6.4, .1); [-2.4, 0].forEach(x => bx(g, .1, .9, .1, std(P.metal, .4, .7), x, 11.5, -4.2)); bx(g, 5, 1, .14, lit(P.teal, 2.8), -1.2, 12.2, -4.2);
    rb(g, 4.8, .26, 2.8, std(0x1a232e, .35, .6), -1.2, 2.5, -2.4, .08); [[-3.2, -1.3], [.8, -1.3]].forEach(([x, z]) => cyl(g, .08, .08, 2.5, std(P.metal, .3, .8), x, 0, z, 8));
    bx(g, 3.4, 2, .06, lit(P.warm, 1.8), -1.2, .1, -3.84); pool(g, -1.2, -1.2, 4.8, P.warm, .65);
    rb(g, 8, .32, 4.8, std(0xc6d0da, .55), 3.8, 0, 5, .25); bx(g, 7, .06, 3.8, lit(0x2fd6ea, 1.6), 3.8, .3, 5); pool(g, 3.8, 5, 7, 0x2fd6ea, .4, .34);
    [1, 2.6, 4.2, 5.8].forEach(x => { const l = rb(g, .7, .16, 1.7, std(0xcfd7df, .6), x, .3, 8.4, .06); l.rotation.x = -.08; });
    palm(g, -8.2, 2.6); palm(g, -6.4, 7.2, .9); palm(g, 8.8, 1.2, 1.05); palm(g, -3, 8.6, .85);
    place(g, car(0x1b2430), -5.6, -.6, 0); lamp(g, 9.2, -2.4, PI); lamp(g, -9, -2.4);
    return () => {};
  },

  /* ---------- empresa de software ---------- */
  software(g) {
    rb(g, 17.4, .3, 13.4, std(0x0c1118, .3, .7), 0, 0, -1.2, .25);
    const alert = [], pulses = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
      const x = -6 + i * 4, z = -5.2 + j * 4, bad = i === 2 && j === 1, pal = bad ? [P.red] : [P.green, P.green, P.green, P.teal, P.teal, P.amber];
      rb(g, 1.7, 5.2, 1.7, std(0x090d13, .12, .9, { envMapIntensity: 1.6 }), x, .3, z, .14);
      const a = wins(g, { cols: 2, rows: 11, w: .5, h: .13, gx: .22, gy: .29, x, y: .85, z: z + .87, warm: 0, on: .8, k: 1.7, pal });
      const b = wins(g, { cols: 2, rows: 11, w: .5, h: .13, gx: .22, gy: .29, x: x + .87, y: .85, z, ry: PI / 2, warm: 0, on: .8, k: 1.7, pal });
      if (bad) alert.push(a, b);
      bx(g, 1.3, .04, 1.3, lit(bad ? P.red : P.teal, bad ? 1.6 : .8), x, 5.5, z);
      bx(g, .08, .03, Math.abs(z + 1.2) + .01, lit(P.teal, 1.3), x, .31, (z - 1.2) / 2); pulses.push({ m: sph(dyn(g), .13, lit(0xffffff, 4)), x, z, o: Math.random() });
    }
    bx(g, 12.1, .03, .08, lit(P.teal, 1.3), 0, .31, -1.2);
    cyl(g, 1.3, 1.5, .7, std(0x121a24, .25, .8), 0, .3, -1.2, 28); cyl(g, 1.05, 1.05, .08, lit(P.teal, 1.8), 0, 1, -1.2, 28);
    const fans = [];
    [-6, 0, 6].forEach(x => { rb(g, 2.4, 1.5, 2.2, std(0x2a3644, .5, .4), x, 0, 7.4, .12); cyl(g, .95, .95, .12, std(0x10161e, .4, .6), x, 1.5, 7.4, 24); const f = dyn(g, x, 1.66, 7.4); bx(f, 1.7, .04, .22, std(P.metal, .3, .9), 0, 0, 0); bx(f, .22, .04, 1.7, std(P.metal, .3, .9), 0, 0, 0); fans.push(f); });
    const h = dyn(g, 0, 9, -1.2), globe = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2, 1)), new THREE.LineBasicMaterial({ color: 0x9fe6f0, transparent: true, opacity: .85 })); h.add(globe);
    sph(h, .7, lit(P.teal, 2.2)); const tr = new THREE.Mesh(new THREE.TorusGeometry(2.9, .04, 8, 80), lit(P.teal, 2)); h.add(tr);
    const p = dyn(g, 2, 7.4, -1.2); p.add(pin(P.red));
    return t => {
      globe.rotation.y = t * .4; globe.rotation.x = t * .2; tr.rotation.x = PI / 2 + Math.sin(t * .6) * .5; tr.rotation.y = t * .5; fans.forEach((f, k) => f.rotation.y = t * (5 + k)); p.position.y = 7.6 + Math.sin(t * 2.4) * .2;
      alert.forEach(a => a.visible = Math.sin(t * 7) > -.2);
      pulses.forEach(q => { const u = (t * .35 + q.o) % 1; if (u < .5) q.m.position.set(q.x, .45, q.z + (-1.2 - q.z) * u * 2); else q.m.position.set(q.x * (1 - (u - .5) * 2), .45, -1.2); });
    };
  },

  /* ---------- obras ---------- */
  obras(g) {
    bx(g, 19, .02, 19, std(0x2a241c, .95), 0, 0, 0);
    const conc = std(0xa3aeb9, .9);
    for (let f = 0; f < 5; f++) {
      rb(g, 8.2, .3, 6.6, conc, -3.4, f * 2.1, -3.6, .04);
      if (f < 4) [[-7.2, -6.6], [-3.4, -6.6], [.4, -6.6], [-7.2, -.6], [-3.4, -.6], [.4, -.6]].forEach(([x, z]) => bx(g, .34, 1.8, .34, conc, x, f * 2.1 + .3, z));
    }
    bx(g, 7.8, 1.8, .1, std(0x2b3846, .6), -3.4, .3, -.5); wins(g, { cols: 4, rows: 1, w: 1.1, h: .9, gx: .6, x: -3.4, y: .75, z: -.43, warm: .9, on: .6 });
    bx(g, 7.8, 1.8, .1, std(0x2b3846, .6), -3.4, 2.4, -.5);
    const sc = []; for (let y = 0; y <= 8.4; y += 2.1) { sc.push([.9, y + .3, -6.8], [.9, y + .3, -.4]); } for (let z = -6.8; z <= -.3; z += 1.6) sc.push([.9, .3, z], [.9, 8.7, z]);
    g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(sc.map(p => new THREE.Vector3(...p))), new THREE.LineBasicMaterial({ color: 0xa9b6c4, transparent: true, opacity: .7 })));
    const ye = std(P.yellow, .45, .25), cx = 5.6, cz = -6.4, H = 15.5;
    [[-.32, -.32], [.32, -.32], [-.32, .32], [.32, .32]].forEach(([dx, dz]) => bx(g, .11, H, .11, ye, cx + dx, 0, cz + dz));
    const lat = []; for (let y = 0; y < H; y += .8) { lat.push([cx - .32, y, cz + .32], [cx + .32, y + .8, cz + .32], [cx + .32, y, cz - .32], [cx + .32, y + .8, cz + .32], [cx - .32, y, cz - .32], [cx - .32, y + .8, cz + .32]); }
    g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lat.map(p => new THREE.Vector3(...p))), new THREE.LineBasicMaterial({ color: P.yellow, transparent: true, opacity: .85 })));
    rb(g, 2.2, .5, 2.2, std(0x6f7a86, .8), cx, 0, cz, .08);
    const jib = dyn(g, cx, H, cz); bx(jib, 11.5, .34, .42, ye, -4.6, 0, 0); bx(jib, 4, .34, .42, ye, 3.2, 0, 0); rb(jib, 1.5, 1.1, 1.1, std(0x6f7a86, .8), 4.4, -1, 0, .1); rb(jib, .95, .95, .95, std(0xc4ced8, .5), -.2, -.95, .7, .12); bx(jib, .16, 2.4, .16, ye, 0, .3, 0);
    line(jib, [[0, 2.7, 0], [-10, .34, 0]], P.yellow, .8); line(jib, [[0, 2.7, 0], [5, .34, 0]], P.yellow, .8);
    const cab = bx(jib, .04, 4, .04, std(0x0b0f14, .5), -7.5, -4, 0), load = rb(jib, 1.1, .7, 1.1, std(P.wood, .8), -7.5, -4.7, 0, .06), tro = bx(jib, .6, .2, .5, std(0x2c3742, .5), -7.5, -.2, 0);
    const bc = sph(dyn(g), .14, lit(P.red, 5), cx, H + 2.9, cz);
    const ex = new THREE.Group(); rb(ex, 2.4, .5, 1.7, std(0x1b232d, .7), 0, 0, 0, .15); rb(ex, 1.9, .9, 1.5, ye, -.1, .5, 0, .14); rb(ex, .9, .9, .8, std(0x0b1220, .1, .6), .3, 1.4, .3, .12);
    const bm = rb(ex, 2.6, .28, .28, ye, 1.5, 1.7, -.3, .08); bm.rotation.z = .6; const st2 = rb(ex, 1.9, .24, .24, ye, 2.9, 1.5, -.3, .08); st2.rotation.z = -1; rb(ex, .6, .5, .6, std(0x4a5560, .5, .5), 3.4, .5, -.3, .1); place(g, ex, 3.6, 5, .7);
    cone(g, 1.7, 1.4, std(0xcdb78e, .95, 0, { flatShading: true }), -7, 0, 5.4, 9); cone(g, 1.2, 1, std(0x8d99a6, .95, 0, { flatShading: true }), -4.6, 0, 7.2, 8);
    stack(g, -1.4, 5.6, 2); for (let k = 0; k < 5; k++) { const p = cyl(g, .06, .06, 4, std(0x8a4b3c, .6, .5), -1 + k * .16, .12 + (k % 2) * .12, 8, 6); p.rotation.x = PI / 2; }
    rb(g, 4.2, 2.3, 2.1, std(0x2f6fd0, .55, .2), -6.6, 0, 2, .08); bx(g, 1.2, .8, .05, lit(P.warm, 1.9), -6.6, 1, 3.07);
    const warn = [];
    for (let x = -9.2; x <= 9.2; x += 2.3) { bx(g, .08, 1.2, .08, std(P.metal, .5, .6), x, 0, 9.3); warn.push(sph(dyn(g), .11, lit(P.amber, 5), x, 1.3, 9.3)); }
    bx(g, 18.6, .5, .04, std(0xe07a2f, .7), 0, .5, 9.3);
    const hp = dyn(g, -3.4, 12.6, -3.6); bx(hp, 6.2, .34, .06, glowAdd(P.teal, .5, .6), 0, 0, 0); bx(hp, 3.84, .34, .08, lit(P.teal, 2.6), -1.18, 0, .02);
    lamp(g, 9.2, 2, PI, 4.6);
    return t => { jib.rotation.y = .5 + Math.sin(t * .3) * 1.1; const x = -6 + Math.sin(t * .5) * 2.6, y = -3.2 + Math.sin(t * .8) * 1.4; tro.position.x = x; cab.position.set(x, y / 2 + .1, 0); cab.scale.y = Math.abs(y) / 4; load.position.set(x, y - .4, 0); blink(bc, t); warn.forEach((w, k) => blink(w, t, 1.2, k * .15)); hp.position.y = 12.6 + Math.sin(t) * .15; };
  },

  /* ---------- inmobiliaria ---------- */
  inmobiliaria(g) {
    const spec = [[-6.6, -6.4, 0xc6d0da, 0x8a4b3c, P.green], [0, -6.8, 0xdccdb7, 0x2b3846, P.amber], [6.6, -6.4, 0xcfd8e0, 0x3d4f5e, P.green], [-6.6, 1, 0xc6d0da, 0x7a3f35, P.grey], [0, .7, 0xcfc7b8, 0x33485c, P.green], [6.6, 1, 0xc2ccd6, 0x8a4b3c, P.amber]];
    const pins = [];
    spec.forEach(([x, z, w, r, st], k) => {
      const W = 4.3 + (k % 2) * .5, H = 2.7 + (k % 3) * .45, D = 4;
      rb(g, W, H, D, std(w, .7), x, 0, z, .12); gable(g, W + .55, 1.75, D + .55, std(r, .65), x, H, z);
      rb(g, .5, 1.3, .5, std(r, .65), x + W * .28, H + .5, z - .7, .05);
      bx(g, .85, 1.55, .06, std(P.trunk, .7), x - W * .22, 0, z + D / 2 + .02); sph(g, .08, lit(P.warm, 5), x - W * .22, 1.95, z + D / 2 + .15);
      wins(g, { cols: 2, rows: 1, w: .85, h: .9, gx: .4, x: x + W * .2, y: 1, z: z + D / 2 + .03, warm: .95, on: .8, k: 2.2 });
      bx(g, .7, .7, .05, lit(P.warm, k % 2 ? 2.2 : .25), x, H + .45, z + D / 2 + .3);
      rb(g, W + 1.2, .5, .4, std(P.leaf, .9), x, 0, z + D / 2 + 1.7, .16); pool(g, x, z + D / 2 + 1, 2.8, P.warm, .45);
      const p = dyn(g, x, H + 3.6, z); p.add(pin(st)); p.userData.y = H + 3.6; pins.push(p);
    });
    bx(g, 19, .02, 2.8, std(P.asphalt, .4, .3), 0, .005, 6.6); for (let x = -8.6; x <= 8.6; x += 2.2) bx(g, 1, .02, .08, lit(0xffffff, .5), x, .01, 6.6);
    const mv = dyn(g); mv.add(car(0xb7c2ce));
    lamp(g, -9.2, 8.6); lamp(g, 0, 8.6); lamp(g, 9.2, 8.6, PI); tree(g, -3.3, -3.4, .9); tree(g, 3.3, -3, 1.05); tree(g, -9, -2.4, .85); tree(g, 9, 4.2, .9); tree(g, -3.3, 4, .8);
    cyl(g, .05, .05, 1.6, std(P.metal, .4, .7), -8.6, 0, 4.4, 6); bx(g, 1, .6, .06, lit(P.red, 2.2), -8.6, 1.2, 4.4);
    return t => { pins.forEach((p, k) => { p.position.y = p.userData.y + Math.sin(t * 2 + k) * .2; p.rotation.y = t * .8; }); const x = ((t * 2.4) % 26) - 13; mv.position.set(x, 0, 7.2); mv.visible = Math.abs(x) < 9; };
  },

  /* ---------- energía ---------- */
  energia(g) {
    const pm = std(0x10306e, .1, .9, { envMapIntensity: 2 }), fr = std(0xb7c2cd, .4, .7);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      const x = -7.6 + c * 2.5, z = 2.4 + r * 2.5;
      const p = bx(g, 2.2, .07, 1.4, pm, x, 1, z); p.rotation.x = -.5; const f = bx(g, 2.3, .04, 1.5, fr, x, .96, z); f.rotation.x = -.5;
      cyl(g, .05, .05, 1, fr, x, 0, z, 6);
    }
    const rot = [], bc = [];
    [[-6.2, -6.4, 9.5], [.4, -7.6, 11.5], [6.8, -5.6, 10]].forEach(([x, z, h]) => {
      cyl(g, .15, .36, h, std(0xc9d2dc, .45, .1), x, 0, z, 16); rb(g, .65, .6, 1.5, std(0xc9d2dc, .45, .1), x, h - .15, z + .15, .24);
      const r = dyn(g, x, h + .15, z + 1); sph(r, .3, std(0xc9d2dc, .45, .1));
      for (let b = 0; b < 3; b++) { const a = new THREE.Group(); a.rotation.z = b * PI * 2 / 3; const L = h * .44, bl = mk(a, new THREE.CylinderGeometry(.04, .22, L, 8), std(0xcfd7df, .45), 0, L / 2 + .2, 0); bl.scale.z = .28; r.add(a); }
      rot.push(r); bc.push(sph(dyn(g), .1, lit(P.red, 5), x, h + .55, z - .4));
    });
    [[6.2, 2.6], [6.2, 5.4]].forEach(([x, z], k) => {
      rb(g, 4.4, 1.9, 2, std(0xc6d0da, .5), x, 0, z, .12); bx(g, 4.42, .2, 2.02, std(P.teal, .5), x, 1.35, z);
      wins(g, { cols: 8, rows: 1, w: .34, h: .5, gx: .13, x, y: .55, z: z + 1.02, warm: 0, on: k ? .55 : .9, k: 3, pal: [P.green] });
    });
    rb(g, 1.8, 1.6, 1.4, std(0x4a5560, .5, .5), 8.4, 0, -1.2, .1); for (let k = 0; k < 4; k++) bx(g, .08, 1.3, 1.5, std(0x39434e, .5, .5), 7.7 + k * .45, .15, -1.2);
    [[8.4, -1.2, 2.2], [9.2, 8.6, 6]].forEach(([x, z, h]) => { cyl(g, .07, .1, h + 1.6, std(P.metal, .4, .7), x, 0, z, 8); bx(g, 1.6, .08, .08, std(P.metal, .4, .7), x, h + 1.3, z); });
    const cable = [[-8, .06, 9.2], [4, .06, 9.2], [4, .06, 4], [6.2, .06, 4]]; line(g, cable, P.teal, .9); line(g, [[8.4, 3.6, -1.2], [8.9, 5.4, 3.8], [9.2, 7.3, 8.6]], 0xb7c2cd, .6);
    const dots = [0, .33, .66].map(o => ({ m: sph(dyn(g), .14, lit(0xffffff, 4)), o }));
    const b = bars(g, 6.2, 3.4, 4, 5, P.green);
    tree(g, -9, -1.4, .9); lamp(g, 9.2, 0, PI);
    return t => {
      rot.forEach((r, k) => r.rotation.z = t * (1.3 + k * .25)); bc.forEach((x, k) => blink(x, t, 1.5, k * .5)); b.tick(t, 2);
      dots.forEach(d => { const u = (t * .2 + d.o) % 1, L = [12, 5.2, 2.2], tot = 19.4; let s = u * tot, i = 0; while (s > L[i] && i < 2) { s -= L[i]; i++; } const p = cable[i], q = cable[i + 1], f = Math.min(1, s / L[i]); d.m.position.set(p[0] + (q[0] - p[0]) * f, .25, p[2] + (q[2] - p[2]) * f); });
    };
  }
};
