// Recibe el formulario "Solicitar diagnóstico", lo envía por email a info@nexgent.io
// y lo guarda en Supabase (tabla demo_requests) como copia de seguridad.
//
// Email: si existe la variable RESEND_API_KEY se envía con Resend (desde RESEND_FROM).
// Si no, se envía con FormSubmit (https://formsubmit.co), que no necesita clave:
// la primera vez FormSubmit manda un correo de activación a info@nexgent.io que hay que confirmar.

const TO = process.env.LEADS_EMAIL || 'info@nexgent.io';

const clean = (v, max = 300) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);

async function sendResend(lead) {
  const html = `<h2>Nueva solicitud de diagnóstico</h2><table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${
    Object.entries(lead).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v || '-'}</td></tr>`).join('')}</table>`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'NexGent Web <web@nexgent.io>',
      to: [TO], reply_to: lead.Email, subject: `Nueva solicitud de diagnóstico · ${lead.Empresa}`, html
    })
  });
  if (!r.ok) throw new Error('Resend ' + r.status + ' ' + (await r.text()).slice(0, 200));
}

async function sendFormSubmit(lead) {
  const r = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: 'https://nexgent.io', Referer: 'https://nexgent.io/' },
    body: JSON.stringify({
      ...lead,
      _subject: `Nueva solicitud de diagnóstico · ${lead.Empresa}`,
      _replyto: lead.Email,
      _template: 'table',
      _captcha: 'false'
    })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || String(data.success) === 'false') throw new Error('FormSubmit ' + r.status + ' ' + JSON.stringify(data).slice(0, 200));
  return data;
}

async function saveSupabase(lead) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return 'skipped';
  const r = await fetch(`${url}/rest/v1/demo_requests`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({
      name: lead.Nombre, email: lead.Email, phone: lead['Teléfono'] || '-', company: lead.Empresa,
      industry: lead.Sector || '-', employees: lead['Nº de sedes'] || '-', agent_types: ['diagnostico-web'],
      objectives: `Cargo: ${lead.Cargo || '-'} · Origen: nexgent.io`
    })
  });
  if (!r.ok) throw new Error('Supabase ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return 'ok';
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }

  // anti-spam: campo oculto que las personas no rellenan
  if (b.web) return res.status(200).json({ ok: true });

  const lead = {
    Nombre: clean(b.nombre, 120), Empresa: clean(b.empresa, 160), Cargo: clean(b.cargo, 120),
    'Nº de sedes': clean(b.sedes, 10), Sector: clean(b.sector, 60), Email: clean(b.email, 160), 'Teléfono': clean(b.telefono, 40)
  };
  if (!lead.Nombre || !lead.Empresa || !/^\S+@\S+\.\S+$/.test(lead.Email)) {
    return res.status(400).json({ ok: false, error: 'Faltan el nombre, la empresa o un email válido.' });
  }

  const [mail, db] = await Promise.allSettled([
    process.env.RESEND_API_KEY ? sendResend(lead) : sendFormSubmit(lead),
    saveSupabase(lead)
  ]);
  if (mail.status === 'rejected') console.error('email', mail.reason);
  if (db.status === 'rejected') console.error('supabase', db.reason);

  if (mail.status === 'rejected' && db.status === 'rejected') {
    return res.status(502).json({ ok: false, error: 'No se ha podido enviar. Escríbenos por WhatsApp al +34 684 486 647.' });
  }
  return res.status(200).json({ ok: true, email: mail.status === 'fulfilled', saved: db.status === 'fulfilled' });
};
