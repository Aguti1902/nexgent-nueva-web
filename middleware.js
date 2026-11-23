// Protege toda la propuesta con contraseña (Vercel Routing Middleware, Edge).
// Variables de entorno: PROPOSAL_PASSWORD y AUTH_SECRET.
export const config = { matcher: '/:path*' };

const COOKIE = 'nx_fa';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 días
const PUBLIC = new Set(['/login.html', '/img/nexgent-logo.png', '/favicon.ico']);

async function sign(secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('frutas-antonio:v1'));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function eq(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function getCookie(req, name) {
  const c = req.headers.get('cookie') || '';
  const m = c.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : '';
}

const redirect = (url, headers = {}) => new Response(null, { status: 303, headers: { Location: url, 'Cache-Control': 'no-store', ...headers } });

export default async function middleware(req) {
  const url = new URL(req.url);
  const path = url.pathname;
  const secret = process.env.AUTH_SECRET;
  const password = process.env.PROPOSAL_PASSWORD;
  if (!secret || !password) return new Response('Configuración incompleta', { status: 500 });

  if (path === '/login' && req.method === 'POST') {
    const form = await req.formData().catch(() => null);
    const pw = form ? String(form.get('password') || '') : '';
    if (eq(pw.trim(), password)) {
      const token = await sign(secret);
      return redirect('/', { 'Set-Cookie': `${COOKIE}=${token}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax` });
    }
    return redirect('/login.html?e=1');
  }

  if (path === '/logout') {
    return redirect('/login.html', { 'Set-Cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
  }

  if (PUBLIC.has(path)) return;

  const token = getCookie(req, COOKIE);
  if (token && eq(token, await sign(secret))) return; // continúa al contenido estático

  if (path === '/' || path.endsWith('.html')) return redirect('/login.html');
  return new Response('No autorizado', { status: 401, headers: { 'Cache-Control': 'no-store' } });
}
