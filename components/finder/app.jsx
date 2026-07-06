'use client';

// =====================================================================
// Template Finder — quiz flow component (Next.js port)
// welcome → 6 single-select questions → ranked result
// =====================================================================

import { useState, useEffect, useCallback } from 'react';
import { FINDER_QUESTIONS, FINDER_TEMPLATES, scoreFinder } from './data';

// --- Live clock (matches the rest of the site) ----------------------
function useFinderClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return '--:--:--';
  const p = (n) => String(n).padStart(2, '0');
  return `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`;
}

// --- Option card ----------------------------------------------------
function OptionCard({ option, active, onPick }) {
  return (
    <button
      type="button"
      className={'tf-opt' + (active ? ' is-on' : '')}
      onClick={onPick}
    >
      <span className="tf-opt-dot" aria-hidden="true">
        <span className="tf-opt-dot-inner" />
      </span>
      <span className="tf-opt-body">
        <span className="tf-opt-label">{option.label}</span>
        <span className="tf-opt-hint">{option.hint}</span>
      </span>
    </button>
  );
}

// --- Small template thumbnail (reused art treatments) ---------------
function TemplateThumb({ tpl, size = 'lg' }) {
  return (
    <div className={`tf-thumb tf-thumb-${size} ${tpl.art}`}>
      <span
        className="tf-thumb-label"
        style={tpl.labelDark ? { color: 'rgba(0,0,0,0.55)' } : undefined}
      >{tpl.category.toUpperCase()}</span>
      <span className="tf-thumb-glyph">{tpl.glyph}</span>
    </div>
  );
}

// --- Result screen --------------------------------------------------
function FinderResult({ ranked, onRestart }) {
  const [top, ...rest] = ranked;
  const runnersUp = rest.slice(0, 2);
  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const sendResult = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSent(true);
  };

  return (
    <div className="tf-result">
      <div className="tf-result-head">
        <span className="tf-eyebrow">Your match</span>
        <h2 className="tf-result-title">
          You&rsquo;re a fit for <span className="tf-ital">{top.name}</span>.
        </h2>
        <p className="tf-result-sub">
          Based on your answers, here&rsquo;s the template I&rsquo;d put in front of you first &mdash;
          plus two strong runner-ups worth a look.
        </p>
      </div>

      {/* Top pick */}
      <div className="tf-pick">
        <TemplateThumb tpl={top} size="lg" />
        <div className="tf-pick-body">
          <div className="tf-pick-top">
            <span className="tf-pick-badge">Best match · {top.fit}% fit</span>
            <span className="tf-pick-cat">{top.category}</span>
          </div>
          <h3 className="tf-pick-name">{top.name}</h3>
          <p className="tf-pick-tagline">{top.tagline}</p>
          <p className="tf-pick-blurb">{top.blurb}</p>
          <div className="tf-pick-foot">
            <div className="tf-pick-price">${top.price}<small>USD</small></div>
            <div className="tf-pick-ctas">
              <a className="tf-btn tf-btn-ghost" href="/templates">Live preview <span>↗</span></a>
              <a className="tf-btn tf-btn-primary" href="/templates">Get {top.name} <span>→</span></a>
            </div>
          </div>
        </div>
      </div>

      {/* Runner-ups */}
      <div className="tf-runners">
        <div className="tf-runners-head">
          <span className="tf-eyebrow">Also worth a look</span>
        </div>
        <div className="tf-runners-grid">
          {runnersUp.map((tpl) => (
            <a className="tf-runner" key={tpl.id} href="/templates">
              <TemplateThumb tpl={tpl} size="sm" />
              <div className="tf-runner-body">
                <div className="tf-runner-row">
                  <h4>{tpl.name}</h4>
                  <span className="tf-runner-price">${tpl.price}</span>
                </div>
                <p className="tf-runner-tagline">{tpl.tagline}</p>
                <div className="tf-runner-fit">{tpl.fit}% fit · {tpl.category}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Conversion footer */}
      <div className="tf-result-foot">
        <div className="tf-foot-email">
          {!emailOpen ? (
            <button type="button" className="tf-textlink" onClick={() => setEmailOpen(true)}>
              ✉ Email me this result
            </button>
          ) : sent ? (
            <span className="tf-foot-sent">✓ Sent to {email}</span>
          ) : (
            <form className="tf-email-form" onSubmit={sendResult}>
              <input
                className="tf-email-input"
                type="email"
                placeholder="you@email.com"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="tf-btn tf-btn-ghost">Send <span>→</span></button>
            </form>
          )}
        </div>

        <div className="tf-foot-fallback">
          <span>Not quite right?</span>
          <a className="tf-textlink tf-textlink-accent" href="/quiz">
            Book a custom call →
          </a>
        </div>

        <button type="button" className="tf-textlink tf-foot-restart" onClick={onRestart}>
          ↺ Start over
        </button>
      </div>
    </div>
  );
}

// --- Main flow ------------------------------------------------------
export function TemplateFinder() {
  const [stage, setStage] = useState('welcome'); // 'welcome' | number | 'result'
  const [answers, setAnswers] = useState({});
  const clock = useFinderClock();
  const total = FINDER_QUESTIONS.length;

  const idx = typeof stage === 'number' ? stage : null;
  const question = idx != null ? FINDER_QUESTIONS[idx] : null;
  const progress =
    stage === 'welcome' ? 0 :
    stage === 'result' ? 1 :
    (idx) / total;

  const pick = useCallback((qid, oid) => {
    setAnswers((a) => ({ ...a, [qid]: oid }));
    // Auto-advance after a short beat so the selection registers visually.
    setTimeout(() => {
      setStage((s) => (typeof s === 'number' ? (s + 1 >= total ? 'result' : s + 1) : s));
    }, 240);
  }, [total]);

  const back = useCallback(() => {
    setStage((s) => {
      if (s === 'result') return total - 1;
      if (typeof s === 'number') return s === 0 ? 'welcome' : s - 1;
      return s;
    });
  }, [total]);

  const restart = useCallback(() => {
    setAnswers({});
    setStage('welcome');
  }, []);

  const ranked = stage === 'result' ? scoreFinder(answers) : null;

  return (
    <div className="tf-root">
      <div className="tf-shell">
        {/* Header bar */}
        <header className="tf-bar">
          <a className="tf-brand" href="/templates">
            <span className="tf-brand-mark">S</span>
            <span>Studio<span style={{ color: 'var(--tf-muted)' }}>/</span>fwd</span>
          </a>
          <span className="tf-bar-title">Template Finder</span>
          <span className="tf-bar-clock">{clock}</span>
        </header>

        {/* Progress */}
        <div className="tf-progress">
          <div className="tf-progress-rail">
            <div className="tf-progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="tf-progress-meta">
            {stage === 'welcome' && <span>6 quick taps · ~60 seconds</span>}
            {typeof stage === 'number' && <span>Question {idx + 1} of {total}</span>}
            {stage === 'result' && <span>Matched · {Object.keys(answers).length} answers</span>}
            {typeof stage === 'number' && (
              <button type="button" className="tf-back" onClick={back}>← Back</button>
            )}
            {stage === 'result' && (
              <button type="button" className="tf-back" onClick={back}>← Change answers</button>
            )}
          </div>
        </div>

        {/* Body */}
        <main className="tf-main">
          {stage === 'welcome' && (
            <div className="tf-welcome gap-2">
              <span className="tf-eyebrow">Find your template</span>
              <h1 className="tf-welcome-title">
                Six taps to the<br /><span className="tf-ital">right template.</span>
              </h1>
              <p className="tf-welcome-sub">
                Answer six quick questions about what you&rsquo;re building, your vibe, and your
                budget. I&rsquo;ll match you to the best-fit template in the shop &mdash; and show you
                two more worth a look.
              </p>
              <div className="tf-welcome-meta">
                <div><strong>{Object.keys(FINDER_TEMPLATES).length}</strong><span>Templates</span></div>
                <div><strong>6</strong><span>Questions</span></div>
                <div><strong>~60s</strong><span>To a match</span></div>
              </div>
              <button type="button" className="tf-btn tf-btn-primary tf-btn-lg" onClick={() => setStage(0)}>
                Start finding <span>→</span>
              </button>
              <a className="tf-textlink tf-welcome-alt mx-6" href="/quiz">
                Need something custom instead? Take the full intake →
              </a>
            </div>
          )}

          {question && (
            <div className="tf-question" key={question.id}>
              <div className="tf-q-head">
                <div className="tf-q-counter">
                  <span className="tf-q-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="tf-q-divider">/</span>
                  <span className="tf-q-total">{String(total).padStart(2, '0')}</span>
                  <span className="tf-q-eyebrow">{question.eyebrow}</span>
                </div>
                <h2 className="tf-q-title">{question.title}</h2>
                {question.sub && <p className="tf-q-sub">{question.sub}</p>}
              </div>
              <div className="tf-opts">
                {question.options.map((o) => (
                  <OptionCard
                    key={o.id}
                    option={o}
                    active={answers[question.id] === o.id}
                    onPick={() => pick(question.id, o.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {stage === 'result' && ranked && (
            <FinderResult ranked={ranked} onRestart={restart} />
          )}
        </main>
      </div>
    </div>
  );
}
