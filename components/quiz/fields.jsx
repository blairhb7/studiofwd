'use client';

// Shared field primitives + step body renderer.

import {
  PROJECT_TYPES, GOAL_OPTIONS, PAGE_OPTIONS, FEATURE_OPTIONS,
  COPYWRITING, TIMELINES, VIBES,
} from './data';

// --- Primitives ----------------------------------------------------

function TextField({ label, value, onChange, placeholder, type = 'text', autoFocus, mono }) {
  return (
    <label className="q-field">
      <span className="q-field-label">{label}</span>
      <input
        className={'q-input' + (mono ? ' q-input-mono' : '')}
        type={type}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <label className="q-field">
      <span className="q-field-label">{label}</span>
      <textarea
        className="q-input q-textarea"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={'q-chip' + (active ? ' is-active' : '')}
    >
      <span className="q-chip-dot" aria-hidden="true">
        <span className="q-chip-dot-inner" />
      </span>
      <span className="q-chip-text">{children}</span>
    </button>
  );
}

function ChipGrid({ items, value, onToggle, columns = 2 }) {
  return (
    <div className="q-chipgrid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>
      {items.map((item) => {
        const id = typeof item === 'string' ? item : item.id;
        const label = typeof item === 'string' ? item : item.label;
        const hint = typeof item === 'string' ? null : item.hint;
        const active = value.includes(id);
        return (
          <Chip key={id} active={active} onClick={() => onToggle(id)}>
            <span className="q-chip-main">{label}</span>
            {hint && <span className="q-chip-hint">{hint}</span>}
          </Chip>
        );
      })}
    </div>
  );
}

function RadioCards({ items, value, onChange, columns = 2 }) {
  return (
    <div className="q-chipgrid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={'q-radiocard' + (active ? ' is-active' : '')}
          >
            <span className="q-radio-dot" aria-hidden="true">
              <span className="q-radio-dot-inner" />
            </span>
            <span className="q-radio-body">
              <span className="q-radio-label">{item.label}</span>
              {item.hint && <span className="q-radio-hint">{item.hint}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Dual-thumb budget range slider.
function BudgetRange({ value, onChange, min = 1000, max = 40000, step = 500 }) {
  const [lo, hi] = value;
  const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;
  const pct = (n) => ((n - min) / (max - min)) * 100;

  const setLo = (v) => onChange([Math.min(v, hi - step), hi]);
  const setHi = (v) => onChange([lo, Math.max(v, lo + step)]);

  return (
    <div className="q-budget">
      <div className="q-budget-readout">
        <div className="q-budget-readout-col">
          <span className="q-budget-tag">MIN</span>
          <span className="q-budget-value">{fmt(lo)}</span>
        </div>
        <div className="q-budget-divider" />
        <div className="q-budget-readout-col">
          <span className="q-budget-tag">MAX</span>
          <span className="q-budget-value">{fmt(hi)}{hi === max ? '+' : ''}</span>
        </div>
      </div>
      <div className="q-budget-track">
        <div className="q-budget-rail" />
        <div className="q-budget-fill" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
        <input type="range" min={min} max={max} step={step} value={lo}
          onChange={(e) => setLo(Number(e.target.value))}
          className="q-budget-thumb q-budget-thumb-lo" />
        <input type="range" min={min} max={max} step={step} value={hi}
          onChange={(e) => setHi(Number(e.target.value))}
          className="q-budget-thumb q-budget-thumb-hi" />
      </div>
      <div className="q-budget-ticks">
        <span>$1k</span><span>$10k</span><span>$20k</span><span>$30k</span><span>$40k+</span>
      </div>
    </div>
  );
}

// Single-value page count slider.
function CountSlider({ value, onChange, min = 1, max = 20 }) {
  return (
    <div className="q-countslider">
      <div className="q-countslider-readout">
        <span className="q-countslider-value">{value}{value === max ? '+' : ''}</span>
        <span className="q-countslider-unit">pages, roughly</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="q-range"
      />
      <div className="q-countslider-ticks">
        <span>1</span><span>5</span><span>10</span><span>15</span><span>20+</span>
      </div>
    </div>
  );
}

// Vibe picker tile.
function VibeTile({ vibe, active, onClick }) {
  return (
    <button type="button" onClick={onClick} className={'q-vibe' + (active ? ' is-active' : '')}>
      <div className={`q-vibe-art q-vibe-art-${vibe.abstract}`} />
      <div className="q-vibe-body">
        <div className="q-vibe-label">
          <span>{vibe.label}</span>
          <span className={'q-vibe-check' + (active ? ' is-on' : '')}>{active ? '✓' : '+'}</span>
        </div>
        <div className="q-vibe-desc">{vibe.desc}</div>
      </div>
    </button>
  );
}

// --- Step body --------------------------------------------------------

export function StepBody({ step, state, set }) {
  const toggle = (key, id) => {
    const arr = state[key];
    const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
    set({ [key]: next });
  };

  switch (step.id) {
    case 'about':
      return (
        <div className="q-stack">
          <TextField label="Your name"     value={state.name}     onChange={(v) => set({ name: v })}     placeholder="Jane Doe" autoFocus />
          <TextField label="Email"         value={state.email}    onChange={(v) => set({ email: v })}    placeholder="you@business.com" type="email" />
          <TextField label="Business or project name" value={state.business} onChange={(v) => set({ business: v })} placeholder="Atelier Doe" />
        </div>
      );

    case 'type':
      return (
        <div className="q-stack">
          <RadioCards items={PROJECT_TYPES} value={state.projectType} onChange={(v) => set({ projectType: v })} columns={1} />
          {state.projectType === 'redesign' && (
            <TextField
              label="Your current site (optional)"
              value={state.existingUrl}
              onChange={(v) => set({ existingUrl: v })}
              placeholder="https://…"
              mono
            />
          )}
        </div>
      );

    case 'goals':
      return (
        <ChipGrid items={GOAL_OPTIONS} value={state.goals} onToggle={(id) => toggle('goals', id)} columns={2} />
      );

    case 'pages':
      return (
        <div className="q-stack">
          <ChipGrid items={PAGE_OPTIONS} value={state.pages} onToggle={(id) => toggle('pages', id)} columns={4} />
          <TextField
            label="Other pages (optional)"
            value={state.pagesOther}
            onChange={(v) => set({ pagesOther: v })}
            placeholder="e.g. FAQ, case studies"
          />
          <div>
            <div className="q-field-label">Roughly how many pages?</div>
            <CountSlider value={state.pageCount} onChange={(v) => set({ pageCount: v })} />
          </div>
        </div>
      );

    case 'features':
      return (
        <ChipGrid items={FEATURE_OPTIONS} value={state.features} onToggle={(id) => toggle('features', id)} columns={2} />
      );

    case 'content':
      return (
        <RadioCards items={COPYWRITING} value={state.copywriting} onChange={(v) => set({ copywriting: v })} columns={1} />
      );

    case 'money':
      return (
        <div className="q-stack">
          <div>
            <div className="q-field-label">Ideal timeline</div>
            <RadioCards items={TIMELINES} value={state.timeline} onChange={(v) => set({ timeline: v })} columns={2} />
          </div>
          <div>
            <div className="q-field-label">Budget range (USD)</div>
            <BudgetRange value={state.budget} onChange={(v) => set({ budget: v })} />
          </div>
        </div>
      );

    case 'vibe':
      return (
        <div className="q-vibegrid">
          {VIBES.map((v) => (
            <VibeTile
              key={v.id}
              vibe={v}
              active={state.vibes.includes(v.id)}
              onClick={() => toggle('vibes', v.id)}
            />
          ))}
        </div>
      );

    case 'refs':
      return (
        <div className="q-stack">
          <div>
            <div className="q-field-label">Any sites you love? (optional)</div>
            <div className="q-stack q-stack-tight">
              {[0, 1].map((i) => (
                <TextField
                  key={i}
                  label=""
                  value={state.inspiration[i]}
                  onChange={(v) => {
                    const next = [...state.inspiration];
                    next[i] = v;
                    set({ inspiration: next });
                  }}
                  placeholder={i === 0 ? 'https:// — and what you like about it' : 'Another one (optional)'}
                  mono
                />
              ))}
            </div>
          </div>
          <TextArea
            label="Anything I should know?"
            value={state.notes}
            onChange={(v) => set({ notes: v })}
            placeholder="Constraints, must-haves, things to avoid…"
            rows={5}
          />
        </div>
      );

    default:
      return null;
  }
}

// --- Summary view -----------------------------------------------------

export function fmtMoney(n) {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `$${n}`;
}

export function SummaryView({ state }) {
  const rows = [
    ['Name',         state.name || '—'],
    ['Email',        state.email || '—'],
    ['Business',     state.business || '—'],
    ['Project',      PROJECT_TYPES.find((t) => t.id === state.projectType)?.label || '—'],
    ['Current URL',  state.existingUrl || '—'],
    ['Goals',        state.goals.length ? state.goals.join(', ') : '—'],
    ['Pages',        [...state.pages, state.pagesOther].filter(Boolean).join(', ') || '—'],
    ['Page count',   `~${state.pageCount}${state.pageCount >= 20 ? '+' : ''} pages`],
    ['Features',     state.features.length ? state.features.map((id) => FEATURE_OPTIONS.find((f) => f.id === id)?.label).join(', ') : '—'],
    ['Copy',         COPYWRITING.find((c) => c.id === state.copywriting)?.label || '—'],
    ['Timeline',     TIMELINES.find((t) => t.id === state.timeline)?.label || '—'],
    ['Budget',       `${fmtMoney(state.budget[0])} — ${fmtMoney(state.budget[1])}${state.budget[1] >= 40000 ? '+' : ''}`],
    ['Direction',    state.vibes.length ? state.vibes.map((v) => VIBES.find((x) => x.id === v)?.label).join(', ') : '—'],
    ['References',   state.inspiration.filter(Boolean).join('  ·  ') || '—'],
    ['Notes',        state.notes || '—'],
  ];

  return (
    <div className="q-summary">
      <div className="q-summary-banner">
        <div className="q-summary-banner-mark">✓</div>
        <div>
          <div className="q-summary-banner-title">Got it — thank you.</div>
          <div className="q-summary-banner-sub">I read every response. You'll hear back within 1–2 business days with next steps.</div>
        </div>
      </div>
      <div className="q-summary-table">
        {rows.map(([k, v], i) => (
          <div className="q-summary-row" key={i}>
            <div className="q-summary-key">{k}</div>
            <div className="q-summary-val">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
