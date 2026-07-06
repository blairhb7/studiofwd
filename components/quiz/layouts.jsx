'use client';

// Single streamlined sidebar layout for the client intake quiz.

import { useState, useEffect, useCallback } from 'react';
import { QUIZ_INITIAL, QUIZ_STEPS, validateStep } from './data';
import { StepBody, SummaryView } from './fields';
import Link from 'next/link';

function useQuiz() {
  const [state, setState] = useState(QUIZ_INITIAL);
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState([]);

  const step = QUIZ_STEPS[stepIdx];
  const totalQ = QUIZ_STEPS.filter((s) => s.kind === 'form').length;
  const currentQIdx = QUIZ_STEPS.slice(0, stepIdx + 1).filter((s) => s.kind === 'form').length;
  const progress = step.kind === 'welcome' ? 0 : step.kind === 'summary' ? 1 : currentQIdx / totalQ;

  const set = useCallback((patch) => {
    setState((s) => ({ ...s, ...patch }));
    setErrors([]);
  }, []);

  const next = useCallback(() => {
    const errs = validateStep(state, step.id);
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setStepIdx((i) => Math.min(i + 1, QUIZ_STEPS.length - 1));
  }, [state, step.id]);

  const back = useCallback(() => {
    setErrors([]);
    setStepIdx((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback((i) => {
    // Only allow jumping to steps that have been reached.
    const maxIdx = QUIZ_STEPS.findIndex((s) => s.id === step.id);
    if (i <= maxIdx) {
      setErrors([]);
      setStepIdx(i);
    }
  }, [step.id]);

  const reset = useCallback(() => {
    setState(QUIZ_INITIAL);
    setStepIdx(0);
    setErrors([]);
  }, []);

  return { state, set, step, stepIdx, progress, currentQIdx, totalQ, errors, next, back, goTo, reset };
}

function ErrorBar({ errors }) {
  if (!errors.length) return null;
  return (
    <div className="q-errors" role="alert">
      <span className="q-errors-prefix">Required →</span>
      {errors.map((e, i) => <span key={i} className="q-errors-pill">{e}</span>)}
    </div>
  );
}

function NavButtons({ stepIdx, step, onBack, onNext, onReset, align = 'right' }) {
  const isWelcome = step.kind === 'welcome';
  const isSummary = step.kind === 'summary';
  const isLast = stepIdx === QUIZ_STEPS.length - 2; // last form step before summary

  if (isSummary) {
    return (
      <div className={`q-nav q-nav-${align}`}>
        <button type="button" className="q-btn q-btn-ghost" onClick={onReset}>Start over</button>
      </div>
    );
  }
  return (
    <div className={`q-nav q-nav-${align}`}>
      {!isWelcome && (
        <button type="button" className="q-btn q-btn-ghost" onClick={onBack}>
          <span className="q-btn-arrow">←</span> Back
        </button>
      )}
      <button type="button" className="q-btn q-btn-primary" onClick={onNext}>
        {isWelcome ? 'Begin' : isLast ? 'Submit' : 'Continue'}
        <span className="q-btn-arrow">→</span>
      </button>
    </div>
  );
}

export function ClientQuiz() {
  const q = useQuiz();
  const { step, stepIdx, progress, currentQIdx, totalQ, errors, state, set, goTo } = q;
  const isWelcome = step.kind === 'welcome';
  const isSummary = step.kind === 'summary';
  const formSteps = QUIZ_STEPS.filter((s) => s.kind === 'form');

  // Enter-to-continue (skip if focus is in textarea).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Enter') return;
      const t = e.target;
      if (t && (t.tagName === 'TEXTAREA' || t.tagName === 'BUTTON')) return;
      if (isSummary) return;
      e.preventDefault();
      q.next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q.next, isSummary]);

  return (
    <div className="vC q-root">
      <aside className="vC-side">
        <div className="vC-side-head">
          <div className="vC-mark">
            
            <span className="vC-mark-name"><Link href="/">HOMEPAGE</Link></span>
          </div>
          <div className="vC-side-tag">Your Project</div>
        </div>

        <nav className="vC-nav">
          {formSteps.map((s, i) => {
            const stepIndex = QUIZ_STEPS.findIndex((x) => x.id === s.id);
            const reached = stepIndex <= stepIdx;
            const active  = stepIndex === stepIdx;
            const done    = stepIndex < stepIdx && !isWelcome;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(stepIndex)}
                disabled={!reached}
                className={'vC-nav-item'
                  + (active ? ' is-active' : '')
                  + (done ? ' is-done' : '')
                  + (reached ? ' is-reached' : '')}
              >
                <span className="vC-nav-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="vC-nav-label">{s.eyebrow}</span>
                <span className="vC-nav-state">{done ? '✓' : active ? '●' : ''}</span>
              </button>
            );
          })}
        </nav>

        <div className="vC-side-foot">
          <div className="vC-progress">
            <div className="vC-progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="vC-progress-meta">
            <span>{Math.round(progress * 100)}% complete</span>
            <span>auto-saved</span>
          </div>
        </div>
      </aside>

      <main className="vC-main">
        {isWelcome ? (
          <div className="vC-welcome">
            <div className="vC-eyebrow">Intro</div>
            <h1 className="vC-title">Tell me about your project.</h1>
            <p className="vC-sub">
              Nine quick questions to understand your goals, scope, and budget so we can
              skip the back-and-forth and arrive at our first call already aligned.
            </p>
            <div className="vC-welcome-meta">
              <div><div className="vC-meta-k">Questions</div><div className="vC-meta-v">9</div></div>
              <div><div className="vC-meta-k">Time</div><div className="vC-meta-v">~5 min</div></div>
              <div><div className="vC-meta-k">Reply</div><div className="vC-meta-v">1–2 days</div></div>
            </div>
            <NavButtons {...q} onBack={q.back} onNext={q.next} onReset={q.reset} align="left" />
          </div>
        ) : isSummary ? (
          <div className="vC-step">
            <div className="vC-step-head">
              <div className="vC-eyebrow">{step.eyebrow}</div>
              <h2 className="vC-title">{step.title}</h2>
            </div>
            <div className="vC-step-body">
              <SummaryView state={state} />
              <NavButtons {...q} onBack={q.back} onNext={q.next} onReset={q.reset} align="right" />
            </div>
          </div>
        ) : (
          <div className="vC-step">
            <div className="vC-step-head">
              <div className="vC-step-counter">
                <span className="vC-step-counter-num">{String(currentQIdx).padStart(2, '0')}</span>
                <span className="vC-step-counter-divider">/</span>
                <span className="vC-step-counter-total">{String(totalQ).padStart(2, '0')}</span>
                <span className="vC-step-counter-label">{step.eyebrow}</span>
              </div>
              <h2 className="vC-title">{step.title}</h2>
              {step.sub && <p className="vC-sub">{step.sub}</p>}
            </div>
            <div className="vC-step-body">
              <StepBody step={step} state={state} set={set} />
              <ErrorBar errors={errors} />
              <NavButtons {...q} onBack={q.back} onNext={q.next} onReset={q.reset} align="right" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
