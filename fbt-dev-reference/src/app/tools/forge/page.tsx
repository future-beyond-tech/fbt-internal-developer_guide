'use client';

/**
 * FBT PROMPT FORGE — a composable, block-based prompt lab.
 *
 * This is the novel tool that the other three don't give you: instead of
 * filling a fixed template, you forge a prompt by stacking, reordering,
 * and seasoning blocks with reusable FBT-standard "ingredients". Every
 * edit flows through a live compiler that renders the final Markdown
 * and updates the token meter + quality score in real time.
 *
 * Side effects owned by this page (data module is pure):
 *   - localStorage autosave (per-slot)
 *   - URL hash share encode/decode
 *   - clipboard + file download
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  compileForgePrompt,
  forgeIngredients,
  makeInitialForgeState,
  scoreForge,
  FORGE_AXIS_LABELS,
  type ForgeBlock,
  type ForgeBlockKind,
  type ForgeIngredient,
  type ForgeState,
  type ForgeTone,
} from '@/data/forge';
import { safeCopy, downloadText, estimateTokens, formatTokens, slugify } from '@/lib/prompt-io';
import {
  loadState,
  saveState,
  clearState,
  encodeShareHash,
  decodeShareHash,
} from '@/lib/persist';

const FORGE_SLOT = 'forge';

// Theme tokens — kept in one place so the file is easy to skim.
const C = {
  void: 'var(--void)',
  panel: 'var(--panel)',
  card: 'var(--card)',
  raised: 'var(--raised)',
  border: 'var(--border)',
  t1: 'var(--t1)',
  t2: 'var(--t2)',
  t3: 'var(--t3)',
  amber: 'var(--amber)',
  cyan: 'var(--cyan)',
  fbt: 'var(--fbt-hi)',
  green: 'var(--green)',
  red: 'var(--red, #FF6080)',
} as const;

const display = "'Bebas Neue', sans-serif";
const mono = "'JetBrains Mono', monospace";

const TONES: ForgeTone[] = ['terse', 'standard', 'verbose'];
const BUDGETS: ForgeState['budget'][] = [500, 1500, 4000, 8000];

const KIND_ACCENT: Record<ForgeBlockKind, string> = {
  identity: C.cyan,
  mission: C.amber,
  context: C.fbt,
  stack: C.cyan,
  constraints: C.amber,
  standards: C.fbt,
  directives: C.cyan,
  output: C.green,
  'anti-hallucination': C.amber,
  acceptance: C.green,
  custom: C.t2,
};

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function ForgePage() {
  const [state, setState] = useState<ForgeState>(makeInitialForgeState);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState<string>(state.blocks[0]?.id ?? '');

  // Hydrate from URL hash first, then localStorage, then default.
  // setState-in-effect is the canonical SSR hydration boundary: the server
  // must render the default state to avoid hydration mismatch, then the
  // client swaps in persisted state on mount.
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
    if (hash) {
      const decoded = decodeShareHash<ForgeState | null>(hash, null);
      if (decoded && Array.isArray(decoded.blocks)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration boundary
        setState(decoded);
        setHydrated(true);
        return;
      }
    }
    setState(loadState<ForgeState>(FORGE_SLOT, makeInitialForgeState()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(FORGE_SLOT, state);
  }, [hydrated, state]);

  // Reset "copied" badge whenever the compiled prompt changes so the user
  // sees a fresh affordance. External-signal sync, not cascading render.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resets transient UI flag on prompt regeneration
    setCopied(false);
  }, [state]);

  // ─── Derived values (live) ──────────────────────────────────
  const compiled = useMemo(() => compileForgePrompt(state), [state]);
  const tokens = useMemo(() => estimateTokens(compiled), [compiled]);
  const score = useMemo(() => scoreForge(state), [state]);

  const activeBlock = useMemo(
    () => state.blocks.find((b) => b.id === activeBlockId) ?? state.blocks[0],
    [state.blocks, activeBlockId]
  );

  // ─── Block operations ───────────────────────────────────────
  const updateBlock = useCallback(
    (id: string, patch: Partial<ForgeBlock>) => {
      setState((s) => ({
        ...s,
        blocks: s.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      }));
    },
    []
  );

  const moveBlock = useCallback((id: string, dir: -1 | 1) => {
    setState((s) => {
      const idx = s.blocks.findIndex((b) => b.id === id);
      if (idx < 0) return s;
      const next = idx + dir;
      if (next < 0 || next >= s.blocks.length) return s;
      const blocks = [...s.blocks];
      [blocks[idx], blocks[next]] = [blocks[next], blocks[idx]];
      return { ...s, blocks };
    });
  }, []);

  const toggleBlock = useCallback(
    (id: string) => {
      const b = state.blocks.find((x) => x.id === id);
      if (b) updateBlock(id, { enabled: !b.enabled });
    },
    [state.blocks, updateBlock]
  );

  const toggleIngredient = useCallback(
    (blockId: string, ingredientId: string) => {
      setState((s) => ({
        ...s,
        blocks: s.blocks.map((b) => {
          if (b.id !== blockId) return b;
          const has = b.ingredients.includes(ingredientId);
          return {
            ...b,
            ingredients: has
              ? b.ingredients.filter((i) => i !== ingredientId)
              : [...b.ingredients, ingredientId],
          };
        }),
      }));
    },
    []
  );

  const addCustomBlock = useCallback(() => {
    setState((s) => ({
      ...s,
      blocks: [
        ...s.blocks,
        {
          id: `blk-custom-${Date.now()}`,
          kind: 'custom',
          title: 'Custom Section',
          body: '',
          enabled: true,
          ingredients: [],
        },
      ],
    }));
  }, []);

  const removeBlock = useCallback((id: string) => {
    setState((s) => ({ ...s, blocks: s.blocks.filter((b) => b.id !== id) }));
  }, []);

  const resetForge = useCallback(() => {
    const fresh = makeInitialForgeState();
    setState(fresh);
    clearState(FORGE_SLOT);
    setActiveBlockId(fresh.blocks[0]?.id ?? '');
  }, []);

  // ─── Clipboard / Download / Share ───────────────────────────
  const handleCopy = async () => {
    const ok = await safeCopy(compiled);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = slugify(state.name, 'forge');
    const date = new Date().toISOString().slice(0, 10);
    downloadText(compiled, `forge-${slug}-${date}.md`);
  };

  const handleShare = async () => {
    const hash = encodeShareHash(state);
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

  // ─── Budget meter ───────────────────────────────────────────
  const budgetPct = Math.min(100, Math.round((tokens / state.budget) * 100));
  const overBudget = tokens > state.budget;

  // ─── Render ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.t1 }}>
      {/* Nav */}
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
        <div style={{ width: 1, height: 20, background: C.border }} />
        <span
          style={{
            fontFamily: display,
            fontSize: 22,
            letterSpacing: '0.12em',
            color: C.amber,
            textShadow: `0 0 20px rgba(var(--amber-rgb), 0.4)`,
          }}
        >
          FBT PROMPT FORGE
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
          {'// composable prompt lab'}
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <TokenMeter
            tokens={tokens}
            budget={state.budget}
            pct={budgetPct}
            overBudget={overBudget}
          />
          <button
            onClick={handleShare}
            style={iconButton(C.fbt)}
            title="Copy shareable URL"
          >
            {shareCopied ? '✓ SHARED' : 'SHARE'}
          </button>
          <button onClick={handleCopy} style={iconButton(C.amber)} title="Copy full prompt">
            {copied ? '✓ COPIED' : 'COPY'}
          </button>
          <button onClick={handleDownload} style={iconButton(C.cyan)} title="Download .md">
            ↓ .MD
          </button>
          <button onClick={resetForge} style={iconButton(C.t3)} title="Reset to defaults">
            RESET
          </button>
        </div>
      </header>

      {/* Control bar: name, tone, budget */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${C.border}`,
          background: C.panel,
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          placeholder="Prompt name"
          aria-label="Prompt name"
          style={{
            padding: '10px 14px',
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            color: C.t1,
            fontFamily: display,
            fontSize: 18,
            letterSpacing: '0.04em',
            outlineOffset: 2,
          }}
        />
        <ToneSwitcher tone={state.tone} onChange={(tone) => setState((s) => ({ ...s, tone }))} />
        <BudgetSwitcher
          budget={state.budget}
          onChange={(budget) => setState((s) => ({ ...s, budget }))}
        />
      </div>

      {/* Quality score bar */}
      <QualityBar score={score} />

      {/* Main 3-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 520px',
          gap: 0,
          minHeight: 'calc(100vh - 240px)',
        }}
      >
        {/* LEFT: Block list */}
        <aside
          style={{
            borderRight: `1px solid ${C.border}`,
            background: C.panel,
            overflowY: 'auto',
            padding: 12,
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 9,
              color: C.t3,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 10,
              paddingLeft: 4,
            }}
          >
            Block Stack
          </div>
          {state.blocks.map((b, i) => (
            <BlockCard
              key={b.id}
              block={b}
              active={b.id === activeBlockId}
              first={i === 0}
              last={i === state.blocks.length - 1}
              onSelect={() => setActiveBlockId(b.id)}
              onToggle={() => toggleBlock(b.id)}
              onMoveUp={() => moveBlock(b.id, -1)}
              onMoveDown={() => moveBlock(b.id, 1)}
              onRemove={b.kind === 'custom' ? () => removeBlock(b.id) : undefined}
            />
          ))}
          <button
            onClick={addCustomBlock}
            style={{
              width: '100%',
              marginTop: 8,
              padding: '10px 12px',
              background: 'transparent',
              border: `1px dashed ${C.border}`,
              borderRadius: 6,
              color: C.t3,
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            + Add Custom Block
          </button>
        </aside>

        {/* CENTER: Block editor */}
        <main style={{ padding: 24, overflowY: 'auto' }}>
          {activeBlock ? (
            <BlockEditor
              block={activeBlock}
              onChange={(patch) => updateBlock(activeBlock.id, patch)}
              onToggleIngredient={(ingredientId) =>
                toggleIngredient(activeBlock.id, ingredientId)
              }
            />
          ) : (
            <div style={{ color: C.t3, fontFamily: mono }}>Select a block to edit.</div>
          )}
        </main>

        {/* RIGHT: Live compiled preview */}
        <aside
          style={{
            borderLeft: `1px solid ${C.border}`,
            background: C.void,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: mono,
                fontSize: 9,
                color: C.t3,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Live Compiled Preview
            </span>
            <span
              style={{
                fontFamily: mono,
                fontSize: 10,
                color: overBudget ? C.amber : C.t2,
              }}
            >
              ~{formatTokens(tokens)} tok · {score.total}/100
            </span>
          </div>
          <pre
            style={{
              flex: 1,
              margin: 0,
              padding: 16,
              overflow: 'auto',
              fontFamily: mono,
              fontSize: 11,
              lineHeight: 1.65,
              color: C.t2,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {compiled}
          </pre>
        </aside>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUBCOMPONENTS
// ─────────────────────────────────────────────────────────────

function iconButton(color: string): React.CSSProperties {
  return {
    padding: '6px 12px',
    background: 'transparent',
    border: `1px solid ${color}`,
    borderRadius: 4,
    color,
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 200ms ease',
  };
}

function TokenMeter({
  tokens,
  budget,
  pct,
  overBudget,
}: {
  tokens: number;
  budget: number;
  pct: number;
  overBudget: boolean;
}) {
  const barColor = overBudget ? C.amber : pct > 80 ? C.amber : C.cyan;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 10px',
        background: C.card,
        borderRadius: 4,
        border: `1px solid ${C.border}`,
      }}
      title={`${tokens} tokens / ${budget} budget`}
    >
      <span style={{ fontFamily: mono, fontSize: 10, color: C.t3 }}>TOK</span>
      <div
        style={{
          width: 100,
          height: 6,
          background: C.raised,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min(100, pct)}%`,
            height: '100%',
            background: barColor,
            transition: 'width 200ms ease',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: mono,
          fontSize: 10,
          color: overBudget ? C.amber : C.t1,
          minWidth: 56,
          textAlign: 'right',
        }}
      >
        {formatTokens(tokens)} / {formatTokens(budget)}
      </span>
    </div>
  );
}

function ToneSwitcher({
  tone,
  onChange,
}: {
  tone: ForgeTone;
  onChange: (t: ForgeTone) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Tone"
      style={{ display: 'flex', gap: 4, background: C.card, padding: 4, borderRadius: 6 }}
    >
      {TONES.map((t) => {
        const active = t === tone;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            style={{
              padding: '6px 12px',
              background: active ? C.amber : 'transparent',
              color: active ? C.void : C.t2,
              border: 'none',
              borderRadius: 4,
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: active ? 700 : 500,
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function BudgetSwitcher({
  budget,
  onChange,
}: {
  budget: ForgeState['budget'];
  onChange: (b: ForgeState['budget']) => void;
}) {
  return (
    <select
      value={budget}
      onChange={(e) => onChange(Number(e.target.value) as ForgeState['budget'])}
      aria-label="Token budget"
      style={{
        padding: '8px 12px',
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        color: C.t1,
        fontFamily: mono,
        fontSize: 11,
        cursor: 'pointer',
        outlineOffset: 2,
      }}
    >
      {BUDGETS.map((b) => (
        <option key={b} value={b}>
          Budget: {formatTokens(b)} tok
        </option>
      ))}
    </select>
  );
}

function QualityBar({ score }: { score: ReturnType<typeof scoreForge> }) {
  const axes = Object.keys(score.axes) as Array<keyof typeof score.axes>;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `120px repeat(${axes.length}, 1fr)`,
        gap: 16,
        padding: '14px 20px',
        borderBottom: `1px solid ${C.border}`,
        background: C.void,
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: display,
            fontSize: 32,
            color: score.total >= 80 ? C.green : score.total >= 50 ? C.amber : C.t3,
            lineHeight: 1,
            letterSpacing: '0.04em',
          }}
        >
          {score.total}
          <span style={{ fontSize: 14, color: C.t3 }}>/100</span>
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 9,
            color: C.t3,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          Forge Score
        </div>
      </div>
      {axes.map((a) => {
        const value = score.axes[a];
        const pct = (value / 20) * 100;
        return (
          <div key={a}>
            <div
              style={{
                fontFamily: mono,
                fontSize: 9,
                color: C.t3,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 4,
              }}
            >
              {FORGE_AXIS_LABELS[a]}{' '}
              <span style={{ color: C.t2 }}>({value}/20)</span>
            </div>
            <div
              style={{
                width: '100%',
                height: 6,
                background: C.raised,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background:
                    pct >= 80 ? C.green : pct >= 50 ? C.amber : C.fbt,
                  transition: 'width 200ms ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BlockCard({
  block,
  active,
  first,
  last,
  onSelect,
  onToggle,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  block: ForgeBlock;
  active: boolean;
  first: boolean;
  last: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove?: () => void;
}) {
  const accent = KIND_ACCENT[block.kind];
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        padding: '10px 12px',
        marginBottom: 6,
        background: active ? C.raised : C.card,
        borderTop: `1px solid ${active ? accent : C.border}`,
        borderRight: `1px solid ${active ? accent : C.border}`,
        borderBottom: `1px solid ${active ? accent : C.border}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 6,
        cursor: 'pointer',
        opacity: block.enabled ? 1 : 0.5,
        transition: 'all 200ms ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            fontFamily: mono,
            fontSize: 8,
            letterSpacing: '0.12em',
            color: accent,
            textTransform: 'uppercase',
          }}
        >
          {block.kind}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
          <StepperBtn
            disabled={first}
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            label="↑"
          />
          <StepperBtn
            disabled={last}
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            label="↓"
          />
          <StepperBtn
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            label={block.enabled ? '◉' : '○'}
            title={block.enabled ? 'Disable block' : 'Enable block'}
          />
          {onRemove && (
            <StepperBtn
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              label="×"
              title="Remove block"
            />
          )}
        </div>
      </div>
      <div
        style={{
          fontFamily: display,
          fontSize: 15,
          color: C.t1,
          marginTop: 4,
          letterSpacing: '0.03em',
        }}
      >
        {block.title}
      </div>
      {block.ingredients.length > 0 && (
        <div style={{ fontFamily: mono, fontSize: 8, color: C.t3, marginTop: 2 }}>
          {block.ingredients.length} ingredient{block.ingredients.length === 1 ? '' : 's'}
        </div>
      )}
    </div>
  );
}

function StepperBtn({
  disabled,
  onClick,
  label,
  title,
}: {
  disabled?: boolean;
  onClick: (e: React.MouseEvent) => void;
  label: string;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        width: 18,
        height: 18,
        padding: 0,
        background: 'transparent',
        border: `1px solid ${C.border}`,
        borderRadius: 3,
        color: disabled ? C.t3 : C.t2,
        fontSize: 10,
        lineHeight: 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        fontFamily: mono,
      }}
    >
      {label}
    </button>
  );
}

function BlockEditor({
  block,
  onChange,
  onToggleIngredient,
}: {
  block: ForgeBlock;
  onChange: (patch: Partial<ForgeBlock>) => void;
  onToggleIngredient: (id: string) => void;
}) {
  const relevant: ForgeIngredient[] = useMemo(
    () => forgeIngredients.filter((i) => i.kinds.includes(block.kind)),
    [block.kind]
  );
  const selected = new Set(block.ingredients);
  const accent = KIND_ACCENT[block.kind];

  return (
    <div style={{ maxWidth: 800 }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: 9,
          color: accent,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Editing · {block.kind}
      </div>
      <input
        type="text"
        value={block.title}
        onChange={(e) => onChange({ title: e.target.value })}
        aria-label="Block title"
        style={{
          width: '100%',
          padding: '12px 16px',
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          color: C.t1,
          fontFamily: display,
          fontSize: 24,
          letterSpacing: '0.04em',
          marginBottom: 16,
          outlineOffset: 2,
        }}
      />

      <label
        style={{
          display: 'block',
          fontFamily: mono,
          fontSize: 9,
          color: C.t3,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 6,
        }}
      >
        Body
      </label>
      <textarea
        value={block.body}
        onChange={(e) => onChange({ body: e.target.value })}
        rows={10}
        aria-label="Block body"
        placeholder="Write the body for this section in plain Markdown. Ingredients below will be appended as bullets."
        style={{
          width: '100%',
          padding: 16,
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          color: C.t1,
          fontFamily: mono,
          fontSize: 12,
          lineHeight: 1.7,
          resize: 'vertical',
          outlineOffset: 2,
        }}
      />

      <div
        style={{
          marginTop: 24,
          fontFamily: mono,
          fontSize: 9,
          color: C.t3,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 10,
        }}
      >
        Ingredients · {selected.size} selected · {relevant.length} available for {block.kind}
      </div>
      {relevant.length === 0 ? (
        <div style={{ color: C.t3, fontFamily: mono, fontSize: 11 }}>
          No ingredients defined for <em>{block.kind}</em> blocks. Use the body field above.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
          {relevant.map((ing) => {
            const on = selected.has(ing.id);
            return (
              <button
                key={ing.id}
                onClick={() => onToggleIngredient(ing.id)}
                aria-pressed={on}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  background: on ? `rgba(var(--amber-rgb), 0.08)` : C.card,
                  border: `1px solid ${on ? C.amber : C.border}`,
                  borderRadius: 6,
                  color: C.t1,
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  fontFamily: mono,
                }}
              >
                <div style={{ fontSize: 10, color: on ? C.amber : C.t2, letterSpacing: '0.1em' }}>
                  {on ? '▣' : '▢'} {ing.label}
                </div>
                <div style={{ fontSize: 10.5, color: C.t3, marginTop: 4, lineHeight: 1.5 }}>
                  {ing.line}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
