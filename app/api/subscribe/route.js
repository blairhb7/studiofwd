// app/api/subscribe/route.js
// POST { email, slug, company? } → add subscriber to MailerLite, return remix URL.
// Env vars (.env.local AND Vercel → Settings → Environment Variables):
//   MAILERLITE_API_KEY   MAILERLITE_GROUP_ID
import { NextResponse } from 'next/server';
import { getFreeTemplate } from '@/lib/free-templates';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req) {
  let body;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Bad request.' }, { status: 400 }); }

  // Honeypot: humans never fill "company" (visually hidden). Bots do.
  if (body.company) return NextResponse.json({ ok: true });

  const email = (body.email ?? '').trim().toLowerCase();
  const template = getFreeTemplate(body.slug ?? '');

  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "That email doesn't look right — mind checking it?" }, { status: 400 });
  if (!template)
    return NextResponse.json({ error: 'Unknown template.' }, { status: 400 });

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) {
    console.error('Missing MailerLite env vars');
    return NextResponse.json({ error: 'Signup is temporarily down — email me directly instead.' }, { status: 500 });
  }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, groups: [groupId], fields: { template: template.name } }),
    });
    if (!res.ok) {
      console.error('MailerLite error:', res.status, await res.text());
      return NextResponse.json({ error: 'Something hiccuped on my end — try once more?' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, remixUrl: template.remixUrl });
  } catch (err) {
    console.error('Subscribe failed:', err);
    return NextResponse.json({ error: 'Something hiccuped on my end — try once more?' }, { status: 502 });
  }
}
