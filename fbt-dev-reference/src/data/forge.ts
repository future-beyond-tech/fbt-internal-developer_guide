/**
 * FBT PROMPT FORGE — data module
 *
 * The Forge is a composable, block-based prompt lab. Unlike the three
 * template-driven tools (kickoff, ux-prompt, cowork), the Forge treats a
 * prompt as a stack of reorderable, toggleable blocks. Each block has:
 *
 *   - a deterministic id (used for persistence + URL share)
 *   - a default heading the compiler will render as a section title
 *   - a content field the user freely edits (prose, bullets, anything)
 *   - a bag of optional "ingredients" — reusable FBT standard snippets
 *     (TS-STRICT, SEC-FIRST, API-LOCK, etc.) that get appended as bullets
 *
 * The compiler renders the block stack into a Markdown string while
 * honoring the chosen tone (terse / standard / verbose), which controls
 * how much preamble is printed around each section.
 *
 * This module is pure: no DOM, no clipboard, no localStorage. The page
 * owns side effects; this file owns the shape of the prompt.
 */

export type ForgeTone = 'terse' | 'standard' | 'verbose';

export interface ForgeIngredient {
  id: string;
  label: string;
  line: string;
  /** Which block kinds this ingredient is meaningful for. */
  kinds: ForgeBlockKind[];
}

export type ForgeBlockKind =
  | 'identity'
  | 'mission'
  | 'context'
  | 'stack'
  | 'constraints'
  | 'standards'
  | 'directives'
  | 'output'
  | 'anti-hallucination'
  | 'acceptance'
  | 'custom';

export interface ForgeBlock {
  id: string;
  kind: ForgeBlockKind;
  title: string;
  body: string;
  enabled: boolean;
  /** Ingredient ids selected for this block. */
  ingredients: string[];
}

export interface ForgeState {
  /** Human-readable name for the generated prompt (used in filename). */
  name: string;
  tone: ForgeTone;
  blocks: ForgeBlock[];
  /** Target token budget — informational only, shown on the meter. */
  budget: 500 | 1500 | 4000 | 8000;
}

/* ───────────────────────────────────────────────────────────── */
/*  INGREDIENT LIBRARY                                           */
/* ───────────────────────────────────────────────────────────── */

export const forgeIngredients: ForgeIngredient[] = [
  // Engineering
  {
    id: 'ts-strict',
    label: 'TS-STRICT',
    line: 'TypeScript strict mode: zero `any`, explicit return types, strict null checks.',
    kinds: ['standards', 'directives'],
  },
  {
    id: 'no-dead',
    label: 'NO-DEAD',
    line: 'Remove all unreachable branches, unused imports, and commented-out code before shipping.',
    kinds: ['standards', 'directives'],
  },
  {
    id: 'solid',
    label: 'SOLID',
    line: 'Apply SOLID principles: single responsibility, open/closed, Liskov, interface segregation, dependency inversion.',
    kinds: ['standards'],
  },
  {
    id: 'kiss',
    label: 'KISS',
    line: 'Simplest correct implementation wins. If a comment is needed to explain it, simplify the code.',
    kinds: ['standards'],
  },
  {
    id: 'dry',
    label: 'DRY',
    line: 'One source of truth per piece of logic. Extract common patterns into reusable functions/components.',
    kinds: ['standards'],
  },
  {
    id: 'yagni',
    label: 'YAGNI',
    line: 'Build only what is needed now. No speculative features or "we might need this later" code.',
    kinds: ['standards'],
  },
  // Security
  {
    id: 'sec-first',
    label: 'SEC-FIRST',
    line: 'Validate all inputs server-side. Never log tokens, cookies, PII, or secrets. Enforce auth + authz before data access.',
    kinds: ['standards', 'constraints'],
  },
  {
    id: 'idor',
    label: 'IDOR-GUARD',
    line: 'Every resource endpoint must run an IDOR check against the authenticated principal before returning data.',
    kinds: ['directives', 'constraints'],
  },
  {
    id: 'cookies',
    label: 'COOKIES',
    line: 'Auth cookies must be HttpOnly, Secure, SameSite=Lax (or Strict where possible).',
    kinds: ['directives', 'constraints'],
  },
  // API
  {
    id: 'api-lock',
    label: 'API-LOCK',
    line: 'API contracts are extend-only: add fields, NEVER rename or remove. Breaking changes require a new /v2 endpoint.',
    kinds: ['standards', 'constraints'],
  },
  {
    id: 'additive-migrations',
    label: 'ADDITIVE-MIGRATIONS',
    line: 'DB migrations are additive only: nullable column first, NOT NULL constraint in a later, separate deploy.',
    kinds: ['constraints', 'directives'],
  },
  // UX
  {
    id: 'wcag',
    label: 'WCAG 2.2 AA',
    line: 'WCAG 2.2 AA is mandatory. Every input has a visible label, focus ring, and aria-describedby for errors.',
    kinds: ['standards', 'directives'],
  },
  {
    id: 'fitts',
    label: "FITTS'S LAW",
    line: 'All interactive targets ≥ 44×44px. Primary CTAs in the bottom third on mobile, within thumb reach.',
    kinds: ['directives'],
  },
  {
    id: 'doherty',
    label: 'DOHERTY < 400ms',
    line: 'Every user action must show feedback within 400ms. Use optimistic UI and skeletons rather than spinners.',
    kinds: ['directives', 'constraints'],
  },
  // Performance
  {
    id: 'fcp',
    label: 'FCP < 1.5s',
    line: 'First Contentful Paint must land under 1.5s on the 75th percentile of target devices.',
    kinds: ['constraints', 'directives'],
  },
  {
    id: 'lcp',
    label: 'LCP < 2.5s',
    line: 'Largest Contentful Paint must land under 2.5s on the 75th percentile of target devices.',
    kinds: ['constraints', 'directives'],
  },
  {
    id: 'server-p95',
    label: 'SERVER P95 < 200ms',
    line: 'Server responses must stay under 200ms at the 95th percentile across all primary endpoints.',
    kinds: ['constraints', 'directives'],
  },
  // Anti-hallucination
  {
    id: 'no-invent',
    label: 'NO-INVENT',
    line: 'Do NOT invent third-party APIs, package names, or CLI flags. Use only well-known, currently-released packages.',
    kinds: ['anti-hallucination', 'directives'],
  },
  {
    id: 'assume-declare',
    label: 'DECLARE-ASSUMPTIONS',
    line: 'If a choice is ambiguous, state the assumption in a single line then proceed — never silently decide.',
    kinds: ['anti-hallucination'],
  },
  {
    id: 'cite-files',
    label: 'CITE-FILES',
    line: 'Every claim about existing code must reference the file and line number. Do not assert from memory.',
    kinds: ['anti-hallucination', 'directives'],
  },
  // Output format
  {
    id: 'output-tree',
    label: 'OUTPUT: FILE TREE',
    line: 'Output must begin with a full file tree of everything created or changed.',
    kinds: ['output'],
  },
  {
    id: 'output-diff',
    label: 'OUTPUT: DIFF',
    line: 'Render file changes as unified diffs (``` diff) rather than full-file dumps where possible.',
    kinds: ['output'],
  },
  {
    id: 'output-tests',
    label: 'OUTPUT: TESTS',
    line: 'Every new module must ship with at least one test covering the happy path + one edge case.',
    kinds: ['output', 'acceptance'],
  },
  {
    id: 'output-runbook',
    label: 'OUTPUT: RUN COMMANDS',
    line: 'End with the exact shell commands to install, build, and verify the change locally.',
    kinds: ['output'],
  },
];

export const forgeIngredientsById: Record<string, ForgeIngredient> =
  Object.fromEntries(forgeIngredients.map((i) => [i.id, i]));

/* ───────────────────────────────────────────────────────────── */
/*  BLOCK LIBRARY                                                */
/* ───────────────────────────────────────────────────────────── */

/** Built-in block templates — the "starter" stack a new Forge prompt loads. */
export const forgeDefaultBlocks: ForgeBlock[] = [
  {
    id: 'blk-identity',
    kind: 'identity',
    title: 'Identity',
    body:
      'You are a senior engineer on the FBT platform team. You write production code, not tutorials. You read files before you change them.',
    enabled: true,
    ingredients: [],
  },
  {
    id: 'blk-mission',
    kind: 'mission',
    title: 'Mission',
    body:
      'State the single, concrete outcome you want Claude to produce. Replace this with your specific task — e.g. "Add a rate-limiter middleware to the public /api/v1 routes."',
    enabled: true,
    ingredients: [],
  },
  {
    id: 'blk-context',
    kind: 'context',
    title: 'Context',
    body:
      'Which files and systems matter. Paste filenames, endpoints, or prior decisions the model should not guess.',
    enabled: true,
    ingredients: [],
  },
  {
    id: 'blk-stack',
    kind: 'stack',
    title: 'Stack',
    body: 'Next.js 16 · React 19 · TypeScript strict · Tailwind v4',
    enabled: true,
    ingredients: [],
  },
  {
    id: 'blk-constraints',
    kind: 'constraints',
    title: 'Constraints',
    body: 'Hard limits and non-negotiables. Use ingredients to lock security, API, and migration rules.',
    enabled: true,
    ingredients: ['sec-first', 'api-lock'],
  },
  {
    id: 'blk-standards',
    kind: 'standards',
    title: 'Engineering Standards',
    body: '',
    enabled: true,
    ingredients: ['ts-strict', 'solid', 'kiss', 'dry', 'yagni', 'no-dead'],
  },
  {
    id: 'blk-directives',
    kind: 'directives',
    title: 'Directives',
    body: '',
    enabled: true,
    ingredients: ['wcag', 'doherty', 'fcp'],
  },
  {
    id: 'blk-anti',
    kind: 'anti-hallucination',
    title: 'Anti-Hallucination',
    body: '',
    enabled: true,
    ingredients: ['no-invent', 'assume-declare', 'cite-files'],
  },
  {
    id: 'blk-output',
    kind: 'output',
    title: 'Output Contract',
    body: '',
    enabled: true,
    ingredients: ['output-diff', 'output-tests', 'output-runbook'],
  },
  {
    id: 'blk-acceptance',
    kind: 'acceptance',
    title: 'Acceptance Criteria',
    body:
      '- [ ] Typecheck passes with zero errors.\n- [ ] No new eslint warnings.\n- [ ] All tests pass locally.',
    enabled: true,
    ingredients: [],
  },
];

/* ───────────────────────────────────────────────────────────── */
/*  COMPILER                                                     */
/* ───────────────────────────────────────────────────────────── */

const TONE_PREAMBLE: Record<ForgeTone, string> = {
  terse: '',
  standard:
    'You are working within the FBT Prompt Forge contract. Honor every block below in order. Treat ingredients as load-bearing rules, not suggestions.\n\n',
  verbose:
    'You are working within the FBT Prompt Forge contract. The sections below are ordered intentionally — read them all before you touch any code.\n\nTreat every bullet inside an ingredient list as a load-bearing rule. If a rule conflicts with a file you are about to write, STOP and declare the conflict in your response before making any edits. Silently ignoring a constraint is the worst possible outcome.\n\n',
};

const TONE_SEPARATOR: Record<ForgeTone, string> = {
  terse: '\n\n',
  standard: '\n\n---\n\n',
  verbose: '\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n',
};

function renderBlock(block: ForgeBlock, tone: ForgeTone): string {
  const lines: string[] = [];
  const heading = tone === 'terse' ? `## ${block.title}` : `## ${block.title.toUpperCase()}`;
  lines.push(heading);

  if (block.body.trim()) {
    lines.push(block.body.trim());
  }

  const ingredientLines = block.ingredients
    .map((id) => forgeIngredientsById[id])
    .filter((i): i is ForgeIngredient => Boolean(i))
    .map((i) => `- **${i.label}** — ${i.line}`);

  if (ingredientLines.length > 0) {
    if (block.body.trim()) lines.push('');
    lines.push(ingredientLines.join('\n'));
  }

  return lines.join('\n');
}

/** Compile the Forge state into a finished Markdown prompt. */
export function compileForgePrompt(state: ForgeState): string {
  const preamble = TONE_PREAMBLE[state.tone];
  const separator = TONE_SEPARATOR[state.tone];

  const header = `# ${state.name.trim() || 'FBT FORGE PROMPT'}`;

  const body = state.blocks
    .filter((b) => b.enabled)
    .filter((b) => b.body.trim() || b.ingredients.length > 0)
    .map((b) => renderBlock(b, state.tone))
    .join(separator);

  return `${header}\n\n${preamble}${body}\n`;
}

/* ───────────────────────────────────────────────────────────── */
/*  QUALITY SCORE                                                */
/* ───────────────────────────────────────────────────────────── */

export interface ForgeScore {
  total: number;
  axes: {
    clarity: number;
    context: number;
    constraints: number;
    outputSpec: number;
    antiHallucination: number;
  };
}

const AXIS_MAX = 20;

/**
 * Quality score across 5 axes (each 0–20). Total is 0–100.
 * The axes are deliberately lossy — this is a prompt-craft compass, not
 * a grading system. Each axis rewards presence of a specific block/signal.
 */
export function scoreForge(state: ForgeState): ForgeScore {
  const enabled = state.blocks.filter((b) => b.enabled);
  const byKind = (k: ForgeBlockKind) => enabled.find((b) => b.kind === k);
  const hasBody = (b?: ForgeBlock) => Boolean(b && b.body.trim().length > 20);
  const hasIngredients = (b?: ForgeBlock) => Boolean(b && b.ingredients.length > 0);

  // Clarity: identity + mission with real text
  let clarity = 0;
  if (hasBody(byKind('identity'))) clarity += 8;
  if (hasBody(byKind('mission'))) clarity += 12;

  // Context: context block with real text, stack block present
  let context = 0;
  if (hasBody(byKind('context'))) context += 14;
  if (hasBody(byKind('stack'))) context += 6;

  // Constraints: constraints block with ingredients OR body
  const cBlock = byKind('constraints');
  const sBlock = byKind('standards');
  let constraints = 0;
  if (hasIngredients(cBlock) || hasBody(cBlock)) constraints += 10;
  if (hasIngredients(sBlock) || hasBody(sBlock)) constraints += 10;

  // Output spec: output block with ingredients OR body
  const oBlock = byKind('output');
  const aBlock = byKind('acceptance');
  let outputSpec = 0;
  if (hasIngredients(oBlock) || hasBody(oBlock)) outputSpec += 12;
  if (hasBody(aBlock)) outputSpec += 8;

  // Anti-hallucination: presence alone is half; ingredients push to full
  const ahBlock = byKind('anti-hallucination');
  let antiHallucination = 0;
  if (ahBlock && ahBlock.enabled) antiHallucination += 8;
  if (hasIngredients(ahBlock)) antiHallucination += 12;

  const cap = (n: number) => Math.min(AXIS_MAX, Math.max(0, n));
  const axes = {
    clarity: cap(clarity),
    context: cap(context),
    constraints: cap(constraints),
    outputSpec: cap(outputSpec),
    antiHallucination: cap(antiHallucination),
  };

  const total = axes.clarity + axes.context + axes.constraints + axes.outputSpec + axes.antiHallucination;
  return { total, axes };
}

export const FORGE_AXIS_LABELS: Record<keyof ForgeScore['axes'], string> = {
  clarity: 'Clarity',
  context: 'Context',
  constraints: 'Constraints',
  outputSpec: 'Output Spec',
  antiHallucination: 'Anti-Hallucination',
};

/* ───────────────────────────────────────────────────────────── */
/*  INITIAL STATE                                                */
/* ───────────────────────────────────────────────────────────── */

export function makeInitialForgeState(): ForgeState {
  return {
    name: 'Untitled Forge Prompt',
    tone: 'standard',
    budget: 1500,
    blocks: forgeDefaultBlocks.map((b) => ({ ...b, ingredients: [...b.ingredients] })),
  };
}
