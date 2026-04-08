'use client';

/**
 * FBT PROJECT LENS — codebase reconnaissance prompt generator.
 *
 * Two-column layout: configuration on the left, live-compiled prompt on
 * the right. Every edit flows through the pure generator in
 * `src/data/lens.ts` and updates the token meter and 5-axis score
 * (Identity / Coverage / Depth / Deliverables / Hygiene) in real time.
 *
 * Side effects owned by this page:
 *   - localStorage autosave + rehydrate
 *   - URL hash share encode/decode
 *   - clipboard + file download
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  LENSES,
  LENS_DELIVERABLES,
  generateLensPrompt,
  getMissingLensFields,
  makeInitialLensInput,
  scoreLens,
  type LensDepth,
  type LensId,
  type LensInput,
  type LensKind,
  type LensOutputFormat,
  type LensTone,
} from '@/data/lens';
import {
  safeCopy,
  downloadText,
  estimateTokens,
  formatTokens,
  slugify,
} from '@/lib/prompt-io';
import {
  loadState,
  saveState,
  clearState,
  encodeShareHash,
  decodeShareHash,
} from '@/lib/persist';

const LENS_SLOT = 'lens';

const C = {
  void: 'var(--void)',
  panel: 'var(--panel)',
  card: 'var(--card)',
  raised: 'var(--raised)',
  border: 'var(--border)',
  t1: 'var(--t1)',
  t2: 'var(--t2)',
  t3: 'var(--t3)',
  t4: 'var(--t4)',
  amber: 'var(--amber)',
  cyan: 'var(--cyan)',
  fbt: 'var(--fbt-hi)',
  green: 'var(--green)',
  red: 'var(--red, #FF6080)',
} as const;

const display = "'Bebas Neue', sans-serif";
const mono = "'JetBrains Mono', monospace";

const DEPTHS: LensDepth[] = ['scan', 'standard', 'forensic'];
const TONES: LensTone[] = ['terse', 'standard', 'verbose'];
const FORMATS: LensOutputFormat[] = ['markdown', 'json', 'hybrid'];

const KIND_COLOR: Record<LensKind, string> = {
  structural: C.cyan,
  quality: C.amber,
  operational: C.fbt,
};

// Budget to measure token pressure against — an analysis prompt is large
// by nature, so the ceiling is set higher than Forge.
const TOKEN_BUDGET = 4500;

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function LensPage() {
  const [input, setInput] = useState<LensInput>(makeInitialLensInput);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Hydrate: URL hash > localStorage > defaults
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
    if (hash) {
      const decoded = decodeShareHash<LensInput | null>(hash, null);
      if (decoded && Array.isArray(decoded.lenses)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration boundary
        setInput(decoded);
        setHydrated(true);
        return;
      }
    }
    setInput(loadState<LensInput>(LENS_SLOT, makeInitialLensInput()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(LENS_SLOT, input);
  }, [hydrated, input]);

  // Reset copied flag whenever the compiled prompt changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- transient UI flag reset
    setCopied(false);
  }, [input]);

  // ─── Derived ────────────────────────────────────────────────
  const compiled = useMemo(() => generateLensPrompt(input), [input]);
  const tokens = useMemo(() => estimateTokens(compiled.prompt), [compiled]);
  const score = useMemo(() => scoreLens(input), [input]);
  const missing = useMemo(() => getMissingLensFields(input), [input]);
  const canGenerate = missing.length === 0;

  // ─── Patch helper ───────────────────────────────────────────
  const patch = useCallback((p: Partial<LensInput>) => {
    setInput((prev) => ({ ...prev, ...p }));
  }, []);

  const toggleLens = useCallback((id: LensId) => {
    setInput((prev) => {
      const has = prev.lenses.includes(id);
      return {
        ...prev,
        lenses: has ? prev.lenses.filter((l) => l !== id) : [...prev.lenses, id],
      };
    });
  }, []);

  const toggleDeliverable = useCallback((id: string) => {
    setInput((prev) => {
      const has = prev.deliverables.includes(id);
      return {
        ...prev,
        deliverables: has ? prev.deliverables.filter((d) => d !== id) : [...prev.deliverables, id],
      };
    });
  }, []);

  const resetLens = useCallback(() => {
    const fresh = makeInitialLensInput();
    setInput(fresh);
    clearState(LENS_SLOT);
  }, []);

  // ─── Actions ────────────────────────────────────────────────
  const handleCopy = async () => {
    if (!canGenerate) return;
    const ok = await safeCopy(compiled.prompt);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!canGenerate) return;
    const slug = slugify(input.projectName, 'lens');
    const date = new Date().toISOString().slice(0, 10);
    downloadText(compiled.prompt, `lens-${slug}-${input.depth}-${date}.md`);
  };

  const handleShare = async () => {
    const hash = encodeShareHash(input);
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}#${hash}`;
      window.history.replaceState(null, '', `#${hash}`);
      const ok = await safeCopy(url);
      if (ok) {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    }
  };

  const budgetPct = Math.min(100, Math.round((tokens / TOKEN_BUDGET) * 100));
  const overBudget = tokens > TOKEN_BUDGET;

  // ─── Render ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.t1 }}>
      {/* Sticky header */}
      <header
        style={{
          height: 52,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 14,
          borderBottom: `1px solid ${C.border}`,
          background: 'rgba(var(--void-rgb), 0.9)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: mono,
            fontSize: 11,
            color: C.t3,
            textDecoration: 'none',
            letterSpacing: '0.1em',
          }}
        >
          ← HOME
        </Link>
        <span
          style={{
            fontFamily: display,
            fontSize: 22,
            letterSpacing: '0.08em',
            color: C.green,
            textShadow: `0 0 20px rgba(var(--green-rgb), 0.35)`,
          }}
        >
          FBT PROJECT LENS
        </span>
        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            color: C.t3,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {'// codebase reconnaissance'}
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <TokenMeter tokens={tokens} pct={budgetPct} over={overBudget} />
          <HeaderBtn onClick={handleShare} label={shareCopied ? 'COPIED ✓' : 'SHARE'} />
          <HeaderBtn onClick={handleDownload} label="DOWNLOAD" disabled={!canGenerate} />
          <HeaderBtn
            onClick={handleCopy}
            label={copied ? 'COPIED ✓' : 'COPY'}
            disabled={!canGenerate}
            primary
          />
          <HeaderBtn onClick={resetLens} label="RESET" />
        </div>
      </header>

      {/* Body */}
      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(380px, 460px) minmax(0, 1fr)',
          gap: 20,
          padding: 20,
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        {/* ── LEFT: configuration ── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel title="IDENTITY">
            <Field
              label="Project name"
              value={input.projectName}
              onChange={(v) => patch({ projectName: v })}
              placeholder="e.g. RentFlow"
              required
              missing={missing.includes('projectName')}
            />
            <Field
              label="Root path"
              value={input.rootPath}
              onChange={(v) => patch({ rootPath: v })}
              placeholder="e.g. . or ./apps/web"
              required
              missing={missing.includes('rootPath')}
              monoFont
            />
            <Field
              label="Primary branch"
              value={input.primaryBranch}
              onChange={(v) => patch({ primaryBranch: v })}
              placeholder="main"
              monoFont
            />
            <Field
              label="Stack hint (optional)"
              value={input.stackHint}
              onChange={(v) => patch({ stackHint: v })}
              placeholder="e.g. Next.js 16 + PostgreSQL + Redis"
            />
            <Field
              label="Project goal (optional)"
              value={input.projectGoal}
              onChange={(v) => patch({ projectGoal: v })}
              placeholder="What is this project for?"
              multiline
            />
          </Panel>

          <Panel title="DEPTH & TONE">
            <ChipRow
              label="Depth"
              options={DEPTHS}
              selected={input.depth}
              onSelect={(d) => patch({ depth: d })}
            />
            <ChipRow
              label="Tone"
              options={TONES}
              selected={input.tone}
              onSelect={(t) => patch({ tone: t })}
            />
            <ChipRow
              label="Output format"
              options={FORMATS}
              selected={input.outputFormat}
              onSelect={(f) => patch({ outputFormat: f })}
            />
          </Panel>

          <Panel title={`LENSES (${input.lenses.length}/${LENSES.length})`}>
            {missing.includes('lenses' as keyof LensInput) && (
              <div
                role="status"
                aria-live="polite"
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  color: C.red,
                  padding: '6px 10px',
                  background: `rgba(255,96,128,0.08)`,
                  border: `1px solid rgba(255,96,128,0.3)`,
                  borderRadius: 4,
                  marginBottom: 10,
                }}
              >
                Select at least one lens to generate the prompt.
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {LENSES.map((l) => {
                const on = input.lenses.includes(l.id);
                const accent = KIND_COLOR[l.kind];
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => toggleLens(l.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 10px',
                      background: on ? `${accent}14` : C.card,
                      borderTop: `1px solid ${on ? accent : C.border}`,
                      borderRight: `1px solid ${on ? accent : C.border}`,
                      borderBottom: `1px solid ${on ? accent : C.border}`,
                      borderLeft: `3px solid ${accent}`,
                      borderRadius: 4,
                      cursor: 'pointer',
                      textAlign: 'left',
                      outlineOffset: '2px',
                    }}
                  >
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 2,
                        border: `1px solid ${accent}`,
                        background: on ? accent : 'transparent',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: mono,
                          fontSize: 11,
                          color: C.t1,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {l.label}
                      </div>
                      <div
                        style={{
                          fontFamily: mono,
                          fontSize: 9,
                          color: C.t3,
                          lineHeight: 1.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {l.focus}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel title={`DELIVERABLES (${input.deliverables.length}/${LENS_DELIVERABLES.length})`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {LENS_DELIVERABLES.map((d) => {
                const on = input.deliverables.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDeliverable(d.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      padding: '6px 8px',
                      background: on ? `${C.green}14` : 'transparent',
                      border: `1px solid ${on ? C.green : C.border}`,
                      borderRadius: 4,
                      cursor: 'pointer',
                      textAlign: 'left',
                      outlineOffset: '2px',
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        marginTop: 2,
                        borderRadius: 2,
                        border: `1px solid ${on ? C.green : C.t3}`,
                        background: on ? C.green : 'transparent',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: mono, fontSize: 10, color: C.t1 }}>{d.label}</div>
                      <div
                        style={{
                          fontFamily: mono,
                          fontSize: 9,
                          color: C.t4,
                          lineHeight: 1.45,
                        }}
                      >
                        {d.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel title="SCOPE">
            <Toggle
              label="Include tests"
              on={input.includeTests}
              onChange={(v) => patch({ includeTests: v })}
            />
            <Toggle
              label="Include docs"
              on={input.includeDocs}
              onChange={(v) => patch({ includeDocs: v })}
            />
            <Toggle
              label="Include node_modules / vendor"
              on={input.includeNodeModules}
              onChange={(v) => patch({ includeNodeModules: v })}
            />
            <Field
              label="Exclude globs (comma-separated)"
              value={input.excludeGlobs}
              onChange={(v) => patch({ excludeGlobs: v })}
              placeholder="node_modules,.next,dist,coverage"
              monoFont
            />
          </Panel>

          <Panel title="QUALITY SCORE">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: display, fontSize: 42, color: C.green, lineHeight: 1 }}>
                {score.total}
              </span>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.t3 }}>/ 100</span>
            </div>
            {score.axes.map((axis) => (
              <div key={axis.label} style={{ marginBottom: 6 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: mono,
                    fontSize: 9,
                    color: C.t3,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  <span>{axis.label}</span>
                  <span>
                    {axis.score}/{axis.max}
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(axis.score / axis.max) * 100}%`,
                      height: '100%',
                      background: C.green,
                      transition: 'width 300ms ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </Panel>
        </section>

        {/* ── RIGHT: live preview ── */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: 9,
                color: C.t3,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Live preview
            </span>
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: mono,
                fontSize: 9,
                color: C.t4,
                letterSpacing: '0.08em',
              }}
            >
              {compiled.selectedLenses.length} lens
              {compiled.selectedLenses.length === 1 ? '' : 'es'} ·{' '}
              {compiled.selectedDeliverables.length} deliverable
              {compiled.selectedDeliverables.length === 1 ? '' : 's'} · {formatTokens(tokens)}{' '}
              tokens
            </span>
          </div>
          <pre
            style={{
              flex: 1,
              minHeight: 600,
              margin: 0,
              padding: 18,
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              fontFamily: mono,
              fontSize: 11.5,
              lineHeight: 1.65,
              color: C.t2,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflow: 'auto',
            }}
          >
            {compiled.prompt}
          </pre>
        </section>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Presentational helpers
// ─────────────────────────────────────────────────────────────

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: C.panel,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: 14,
      }}
    >
      <div
        style={{
          fontFamily: mono,
          fontSize: 9,
          color: C.t3,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  missing?: boolean;
  monoFont?: boolean;
  multiline?: boolean;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  missing,
  monoFont,
  multiline,
}: FieldProps) {
  const borderColor = missing ? C.red : C.border;
  const commonStyle = {
    width: '100%',
    padding: '8px 10px',
    background: C.card,
    border: `1px solid ${borderColor}`,
    borderRadius: 4,
    color: C.t1,
    fontFamily: monoFont ? mono : 'inherit',
    fontSize: 12,
    outlineOffset: '2px',
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span
        style={{
          fontFamily: mono,
          fontSize: 9,
          color: missing ? C.red : C.t3,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
        {required && <span style={{ color: C.red, marginLeft: 4 }}>*</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          style={{ ...commonStyle, resize: 'vertical', minHeight: 48 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={commonStyle}
        />
      )}
    </label>
  );
}

function ChipRow<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (v: T) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span
        style={{
          fontFamily: mono,
          fontSize: 9,
          color: C.t3,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {options.map((o) => {
          const on = o === selected;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onSelect(o)}
              style={{
                flex: 1,
                padding: '6px 8px',
                background: on ? C.green : 'transparent',
                border: `1px solid ${on ? C.green : C.border}`,
                borderRadius: 3,
                color: on ? C.void : C.t2,
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                outlineOffset: '2px',
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 8px',
        background: on ? `${C.green}14` : 'transparent',
        border: `1px solid ${on ? C.green : C.border}`,
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        outlineOffset: '2px',
      }}
    >
      <span
        style={{
          width: 26,
          height: 14,
          background: on ? C.green : C.card,
          border: `1px solid ${on ? C.green : C.border}`,
          borderRadius: 7,
          position: 'relative',
          transition: 'background 150ms ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 1,
            left: on ? 13 : 1,
            width: 10,
            height: 10,
            background: on ? C.void : C.t3,
            borderRadius: '50%',
            transition: 'left 150ms ease',
          }}
        />
      </span>
      <span style={{ fontFamily: mono, fontSize: 10, color: C.t2, letterSpacing: '0.04em' }}>
        {label}
      </span>
    </button>
  );
}

function TokenMeter({ tokens, pct, over }: { tokens: number; pct: number; over: boolean }) {
  const color = over ? C.red : pct > 80 ? C.amber : C.green;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 4,
      }}
    >
      <span style={{ fontFamily: mono, fontSize: 9, color: C.t4, letterSpacing: '0.1em' }}>
        TOKENS
      </span>
      <span style={{ fontFamily: mono, fontSize: 11, color }}>{formatTokens(tokens)}</span>
      <div
        style={{
          width: 60,
          height: 4,
          background: C.raised,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: color,
            transition: 'width 200ms ease',
          }}
        />
      </div>
    </div>
  );
}

function HeaderBtn({
  onClick,
  label,
  primary,
  disabled,
}: {
  onClick: () => void;
  label: string;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 14px',
        background: primary ? C.green : 'transparent',
        border: `1px solid ${primary ? C.green : C.border}`,
        borderRadius: 4,
        color: disabled ? C.t4 : primary ? C.void : C.t2,
        fontFamily: mono,
        fontSize: 10,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        outlineOffset: '2px',
      }}
    >
      {label}
    </button>
  );
}
