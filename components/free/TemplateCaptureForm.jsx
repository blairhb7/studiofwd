'use client';

import { useState } from 'react';

export default function TemplateCaptureForm({ slug }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [error, setError] = useState('');
  const [remixUrl, setRemixUrl] = useState('');

  async function handleSubmit() {
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, slug, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong — try again?');
        setStatus('error');
        return;
      }
      setRemixUrl(data.remixUrl ?? '');
      setStatus('done');
    } catch {
      setError("Couldn't reach the server — try again in a moment.");
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="ft-success">
        <p className="ft-success-title">Check your inbox.</p>
        <p className="ft-success-body">
          Your remix link is on its way — usually within a minute. If it hides in spam, add me to your contacts so the next ones land.
        </p>
        {remixUrl && (
          <a className="ft-btn ft-btn-ghost" href={remixUrl} target="_blank" rel="noopener noreferrer">
            Or remix it right now ↗
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="ft-form">
      <label className="ft-label" htmlFor="ft-email">
        Enter your email and I&rsquo;ll send you the remix link.
      </label>

      <input
        type="text"
        className="ft-honeypot"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        placeholder="Company"
      />

      <div className="ft-row">
        <input
          id="ft-email"
          className="ft-input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="you@yourbusiness.com"
        />
        <button type="button" className="ft-btn" onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : 'Send me the template'}
        </button>
      </div>

      {status === 'error' && <p className="ft-error">{error}</p>}
      <p className="ft-fineprint">One email. No spam. Unsubscribe anytime.</p>
    </div>
  );
}
