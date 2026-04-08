/**
 * FBT PROJECT LENS — codebase reconnaissance prompt generator.
 *
 * The other four tools in this hub (Kickoff / UX-Prompt / Cowork / Forge)
 * all generate prompts that BUILD something new. Lens is the opposite:
 * it generates a prompt that dissects an EXISTING codebase through one or
 * more analytical "lenses" (architecture, security, performance, a11y,
 * tech-debt, etc.), at a chosen depth (scan / standard / forensic), with
 * a configurable deliverable set (mermaid diagrams, risk register, file
 * tree map, metrics dashboard, …).
 *
 * This module is 100% pure — no I/O, no React, no globals. The page owns
 * all side effects (persist / share / clipboard).
 */

// ─── Types ─────────────────────────────────────────────────────

export type LensId =
  | 'architecture'
  | 'tech-stack'
  | 'features'
  | 'api-surface'
  | 'data-flow'
  | 'security'
  | 'performance'
  | 'a11y'
  | 'testing'
  | 'tech-debt'
  | 'dx'
  | 'deployment'
  | 'docs'
  | 'dependencies'
  | 'dead-code'
  | 'naming'
  | 'git-history';

export type LensKind = 'structural' | 'quality' | 'operational';
export type LensDepth = 'scan' | 'standard' | 'forensic';
export type LensTone = 'terse' | 'standard' | 'verbose';
export type LensOutputFormat = 'markdown' | 'json' | 'hybrid';

export interface LensDef {
  readonly id: LensId;
  readonly label: string;
  readonly title: string;
  readonly kind: LensKind;
  readonly focus: string;
  readonly instructions: readonly string[];
  readonly signals: readonly string[];
  readonly deliverables: readonly string[];
}

export interface LensDeliverableDef {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

export interface LensInput {
  projectName: string;
  rootPath: string;
  stackHint: string;
  primaryBranch: string;
  projectGoal: string;
  lenses: readonly LensId[];
  depth: LensDepth;
  tone: LensTone;
  includeTests: boolean;
  includeDocs: boolean;
  includeNodeModules: boolean;
  excludeGlobs: string;
  deliverables: readonly string[];
  outputFormat: LensOutputFormat;
}

// ─── Lens catalog ──────────────────────────────────────────────

export const LENSES: readonly LensDef[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    title: 'Architecture Map',
    kind: 'structural',
    focus: 'Map the system into layers, bounded contexts, and component relationships.',
    instructions: [
      'Identify the top-level layers (presentation / application / domain / infrastructure) or the closest equivalent.',
      'List every major module/package and the responsibility of each.',
      'Describe cross-layer dependencies and flag any cycles or layering violations.',
      'Identify the entry points (pages, jobs, CLIs, consumers) and trace the main request paths.',
    ],
    signals: [
      'folder structure at depth 1-3',
      'index/barrel files',
      'framework conventions (app/, src/, lib/, modules/, apps/, packages/)',
      'build config (tsconfig paths, nx/turbo workspaces, cargo workspaces, gradle modules)',
    ],
    deliverables: ['mermaid-architecture', 'layer-table', 'entry-point-list'],
  },
  {
    id: 'tech-stack',
    label: 'Tech Stack',
    title: 'Tech Stack Inventory',
    kind: 'structural',
    focus: 'Enumerate every language, framework, library, tool, and runtime in use — with versions.',
    instructions: [
      'List every runtime, language, and framework.',
      'Read every manifest (package.json, pyproject.toml, Cargo.toml, go.mod, *.csproj, Gemfile, composer.json) and capture versions.',
      'Group dependencies by role (runtime / build / test / lint / infra).',
      'Flag any duplicated or conflicting versions across workspace packages.',
    ],
    signals: [
      'package.json + lockfile',
      'pyproject.toml / requirements*.txt',
      'Cargo.toml / Cargo.lock',
      'Dockerfile / compose.yaml base images',
      '.nvmrc / .tool-versions / .python-version',
    ],
    deliverables: ['tech-stack-table', 'version-drift-report'],
  },
  {
    id: 'features',
    label: 'Features',
    title: 'Feature Inventory',
    kind: 'structural',
    focus: 'Enumerate user-facing features, their entry points, and the modules that implement them.',
    instructions: [
      'For each route / page / command, describe the feature it delivers in one sentence.',
      'Link each feature to the primary files that implement it (UI + API + domain).',
      'Tag each feature: shipped / behind-flag / WIP / deprecated (derive from code, flags, TODOs).',
    ],
    signals: [
      'route files (app/**/page.tsx, pages/**/*, router config)',
      'controller / handler files',
      'feature flag strings',
      'i18n keys grouped by feature',
    ],
    deliverables: ['feature-inventory-table', 'feature-to-file-map'],
  },
  {
    id: 'api-surface',
    label: 'API Surface',
    title: 'API Surface Map',
    kind: 'structural',
    focus: 'Document every HTTP / RPC / GraphQL / event endpoint with inputs, outputs, auth, and owners.',
    instructions: [
      'List every endpoint (method + path + handler file).',
      'Capture request/response shapes (from types, zod schemas, OpenAPI, or inferred).',
      'Note auth posture: public / session / bearer / service-to-service / none.',
      'Flag endpoints with no input validation, no auth, or missing error handling.',
    ],
    signals: [
      'route handlers / controllers',
      'OpenAPI / Swagger files',
      'zod / yup / io-ts / class-validator schemas',
      'tRPC / GraphQL schemas',
      'protobuf files',
    ],
    deliverables: ['api-endpoint-table', 'auth-posture-matrix'],
  },
  {
    id: 'data-flow',
    label: 'Data Flow',
    title: 'Data Flow Trace',
    kind: 'structural',
    focus: 'Trace how data enters the system, transforms, persists, and exits.',
    instructions: [
      'Identify every data source (HTTP, queue, cron, file, webhook, DB replication).',
      'Trace the transformation pipeline(s) per source.',
      'List every sink (DB table, cache, queue, external API, file, log).',
      'Draw a mermaid flow diagram from sources to sinks with intermediate transforms.',
    ],
    signals: [
      'ORM models / migrations',
      'queue producers/consumers',
      'background job definitions',
      'outbound HTTP clients',
      'storage SDK calls (S3, GCS, Blob)',
    ],
    deliverables: ['mermaid-data-flow', 'source-sink-table'],
  },
  {
    id: 'security',
    label: 'Security',
    title: 'Security Posture',
    kind: 'quality',
    focus: 'Assess authN/Z, secret handling, input validation, and OWASP top-10 exposure.',
    instructions: [
      'Map the auth model: identity source, session mechanism, token format, expiry, rotation.',
      'Check every endpoint against the auth posture matrix and flag IDOR risk.',
      'Grep for hard-coded secrets, .env leakage into client bundles, and secrets in git history.',
      'Review input validation coverage: which endpoints validate, which trust the client.',
      'Check cookie flags (httpOnly, Secure, SameSite), CORS config, CSP headers, CSRF protection.',
      'Flag direct SQL concatenation, unsanitized HTML rendering, open redirects, and SSRF surface.',
    ],
    signals: [
      'middleware / guards',
      'env access patterns',
      'cookie config',
      'fetch/axios/httpx call sites',
      'template rendering (dangerouslySetInnerHTML, v-html, Markup.escape)',
    ],
    deliverables: ['risk-register', 'security-findings-table'],
  },
  {
    id: 'performance',
    label: 'Performance',
    title: 'Performance Hotspots',
    kind: 'quality',
    focus: 'Identify bundle bloat, slow queries, N+1s, unbounded loops, and cold-start issues.',
    instructions: [
      'Estimate client bundle size drivers (large deps, barrel imports, duplicated deps).',
      'Scan for N+1 query patterns (loop over entities + .find/.query inside).',
      'Flag unbounded .map/.filter on potentially large lists rendered without virtualization.',
      'Identify missing caching layers (HTTP, in-memory, CDN, DB query cache).',
      'Note any Server Components / RSC / streaming opportunities if the stack supports it.',
    ],
    signals: [
      'import statements (wide vs. deep)',
      'loops around async calls',
      'database query sites',
      'React render lists without keys or virtualization',
      'cache-related config or absence thereof',
    ],
    deliverables: ['performance-findings-table', 'quick-wins-list'],
  },
  {
    id: 'a11y',
    label: 'Accessibility',
    title: 'Accessibility Audit',
    kind: 'quality',
    focus: 'Audit against WCAG 2.2 AA: keyboard, ARIA, focus, contrast, motion, forms.',
    instructions: [
      'Grep for outline:none / outline:0 without a replacement focus ring (hard fail).',
      'Check that every interactive element has a keyboard handler and visible focus state.',
      'Validate form labeling (every input has a <label> or aria-labelledby).',
      'Check color contrast of theme tokens used for text (>= 4.5:1 normal, 3:1 large).',
      'Flag missing alt text on images, missing landmarks, heading-level jumps.',
      'Flag any onClick on non-button/non-link without role/tabIndex/keyboard handler.',
    ],
    signals: [
      'outline: none',
      'onClick on div/span',
      '<img> without alt',
      '<label> usage vs. input count',
      'theme color tokens',
    ],
    deliverables: ['a11y-findings-table', 'wcag-checklist'],
  },
  {
    id: 'testing',
    label: 'Testing',
    title: 'Test Coverage & Strategy',
    kind: 'quality',
    focus: 'Assess test pyramid, coverage gaps, mock usage, and flakiness signals.',
    instructions: [
      'Count tests by type (unit / integration / e2e / contract).',
      'Identify modules with zero test coverage.',
      'Flag tests that mock the database or the unit under test (smell).',
      'Flag skipped / xit / .only tests and any disabled suites.',
      'Note the CI test command and whether it runs all tiers.',
    ],
    signals: [
      '*.test.* / *.spec.* files',
      'vitest / jest / pytest / go test / cargo test config',
      'mock / stub / fake helpers',
      'it.skip, xit, .only, test.todo',
    ],
    deliverables: ['test-coverage-table', 'risk-register'],
  },
  {
    id: 'tech-debt',
    label: 'Tech Debt',
    title: 'Tech Debt & Complexity',
    kind: 'quality',
    focus: 'Surface TODO/FIXME/HACK, deprecated APIs, duplication, and high-complexity hotspots.',
    instructions: [
      'Count TODO / FIXME / HACK / XXX / @deprecated occurrences with file refs.',
      'Identify files > 500 lines and functions > 80 lines.',
      'Flag repeated code blocks that could be extracted.',
      'Flag uses of deprecated framework APIs (check framework CHANGELOG patterns).',
      'Note type-strictness holes (any, unknown-as-any, @ts-ignore, type: ignore).',
    ],
    signals: [
      'TODO / FIXME / HACK grep',
      '@deprecated JSDoc',
      '@ts-ignore / eslint-disable',
      'file size outliers',
    ],
    deliverables: ['debt-register', 'complexity-hotspots'],
  },
  {
    id: 'dx',
    label: 'DX',
    title: 'Developer Experience',
    kind: 'operational',
    focus: 'Rate onboarding, local dev, scripts, and iteration speed.',
    instructions: [
      'Read README / CONTRIBUTING / AGENTS.md and score onboarding clarity.',
      'List every npm/make/just script and classify (dev / build / test / lint / release / util).',
      'Check whether a fresh clone can reach a running dev server using only documented commands.',
      'Flag missing lint/format on save, missing pre-commit hooks, missing typecheck in CI.',
      'Estimate cold build time and hot reload latency if discoverable from config.',
    ],
    signals: [
      'README.md / CONTRIBUTING.md / AGENTS.md',
      'package.json scripts',
      '.husky / lefthook / pre-commit',
      'editorconfig / .vscode / devcontainer',
    ],
    deliverables: ['dx-scorecard', 'script-inventory'],
  },
  {
    id: 'deployment',
    label: 'Deployment',
    title: 'Deployment & Ops',
    kind: 'operational',
    focus: 'Map CI/CD, environments, secrets management, observability, and runbooks.',
    instructions: [
      'List every CI workflow (triggers + jobs + deploy targets).',
      'Enumerate environments (dev / staging / prod / preview) and their config sources.',
      'Identify secrets storage (vault / env / parameter store) and exposure surface.',
      'List observability tools (logs / metrics / traces / error tracking / uptime).',
      'Check for runbooks, on-call docs, rollback procedures.',
    ],
    signals: [
      '.github/workflows / .gitlab-ci.yml / buildkite',
      'Dockerfile / helm / terraform / pulumi',
      'environment variable references',
      'OpenTelemetry / Sentry / Datadog SDK usage',
    ],
    deliverables: ['ci-cd-table', 'env-matrix', 'observability-checklist'],
  },
  {
    id: 'docs',
    label: 'Docs',
    title: 'Documentation Coverage',
    kind: 'operational',
    focus: 'Assess README, API docs, ADRs, inline documentation, and changelog hygiene.',
    instructions: [
      'List every top-level doc and classify (onboarding / architecture / API / runbook / ADR).',
      'Score README against a standard checklist (what/why/install/dev/test/deploy/contrib/license).',
      'Check API docs freshness against the actual API surface.',
      'Count inline JSDoc / docstring coverage on exported symbols.',
    ],
    signals: [
      'README.md / docs/ / wiki/',
      'ADR folders',
      'OpenAPI / Storybook / typedoc output',
      'CHANGELOG.md',
    ],
    deliverables: ['docs-scorecard', 'doc-gap-list'],
  },
  {
    id: 'dependencies',
    label: 'Dependencies',
    title: 'Dependency Health',
    kind: 'operational',
    focus: 'Flag vulnerable, abandoned, oversized, or license-risky dependencies.',
    instructions: [
      'List direct dependencies with latest-vs-installed delta.',
      'Flag any package not updated in > 2 years (check repo, not registry).',
      'Check licenses for copyleft risk (GPL/AGPL) and unknown licenses.',
      'Identify oversized deps that could be replaced or tree-shaken.',
      'Look for duplicated transitive deps that could be deduped.',
    ],
    signals: [
      'package.json + lockfile',
      'audit signal files',
      'license field in manifest',
    ],
    deliverables: ['dependency-health-table', 'license-risk-list'],
  },
  {
    id: 'dead-code',
    label: 'Dead Code',
    title: 'Dead Code & Unused Exports',
    kind: 'quality',
    focus: 'Find unreferenced files, unused exports, and dead branches.',
    instructions: [
      'List exports with zero references in the project.',
      'List files not imported anywhere (except entry points, configs, tests).',
      'Flag commented-out code blocks and legacy files/folders (prefixed old-, _backup, .bak).',
    ],
    signals: [
      'export * / export const / export function',
      'import graph (static analysis)',
      'files with suspicious names',
    ],
    deliverables: ['dead-code-list', 'unused-exports-list'],
  },
  {
    id: 'naming',
    label: 'Naming',
    title: 'Naming & Conventions',
    kind: 'quality',
    focus: 'Assess consistency of file naming, symbol casing, and folder layout.',
    instructions: [
      'Check file name casing consistency (kebab / snake / Pascal / camel).',
      'Check symbol naming consistency within the chosen convention.',
      'Flag folders that deviate from the project convention.',
      'Flag inconsistent plural/singular folder naming.',
    ],
    signals: [
      'folder listing at depth 1-3',
      'file names per folder',
      'export symbol names',
    ],
    deliverables: ['naming-report'],
  },
  {
    id: 'git-history',
    label: 'Git History',
    title: 'Git Hotspots & Churn',
    kind: 'operational',
    focus: 'Identify high-churn files, bus-factor risks, and commit hygiene.',
    instructions: [
      'Top 20 files by change frequency in the last 180 days.',
      'Top contributors per area (bus factor).',
      'Commit-message hygiene: share of commits that follow a convention.',
      'Recently orphaned areas (last touched > 1 year).',
    ],
    signals: [
      'git log --format',
      'git blame summaries',
      'CODEOWNERS',
    ],
    deliverables: ['churn-hotspots', 'ownership-map'],
  },
] as const;

export const LENSES_BY_ID: Record<LensId, LensDef> = Object.fromEntries(
  LENSES.map((l) => [l.id, l])
) as Record<LensId, LensDef>;

// ─── Deliverable catalog ───────────────────────────────────────

export const LENS_DELIVERABLES: readonly LensDeliverableDef[] = [
  { id: 'executive-summary', label: 'Executive summary', description: '5-bullet summary for non-technical stakeholders.' },
  { id: 'file-tree-map', label: 'Annotated file tree', description: 'Tree view (depth 3) with a 1-line role annotation per folder/file.' },
  { id: 'mermaid-architecture', label: 'Mermaid architecture diagram', description: 'Component-level architecture as a mermaid graph TD.' },
  { id: 'mermaid-data-flow', label: 'Mermaid data-flow diagram', description: 'Source → transform → sink pipeline as mermaid flowchart LR.' },
  { id: 'tech-stack-table', label: 'Tech stack table', description: 'Markdown table: layer / tool / version / role / notes.' },
  { id: 'feature-inventory-table', label: 'Feature inventory table', description: 'Markdown table of features with entry points and owners.' },
  { id: 'api-endpoint-table', label: 'API endpoint table', description: 'Method / path / handler / auth / input / output.' },
  { id: 'risk-register', label: 'Risk register', description: 'Ordered list of risks with severity (S/M/L), likelihood, and fix cost.' },
  { id: 'top-findings', label: 'Top 10 findings', description: 'The ten most important observations across every selected lens.' },
  { id: 'quick-wins-list', label: 'Quick wins list', description: 'Fixes that take < 1 hour each, ranked by impact.' },
  { id: 'metrics-dashboard', label: 'Metrics dashboard', description: 'Raw counts: files / LoC / tests / deps / TODOs / endpoints / routes.' },
  { id: 'action-plan', label: 'Prioritized action plan', description: 'Sequenced plan: now / next / later, with owners and effort.' },
  { id: 'per-file-index', label: 'Per-file index (forensic only)', description: 'One-line summary for every source file. Expensive; forensic depth.' },
] as const;

export const LENS_DELIVERABLES_BY_ID: Record<string, LensDeliverableDef> =
  Object.fromEntries(LENS_DELIVERABLES.map((d) => [d.id, d]));

// ─── Validation ────────────────────────────────────────────────

export const lensRequiredFields: ReadonlyArray<keyof LensInput> = [
  'projectName',
  'rootPath',
] as const;

export function getMissingLensFields(
  input: LensInput
): Array<keyof LensInput> {
  const missing: Array<keyof LensInput> = [];
  if (!input.projectName.trim()) missing.push('projectName');
  if (!input.rootPath.trim()) missing.push('rootPath');
  if (input.lenses.length === 0) {
    // treat "no lenses" as a missing-required state via a synthetic key
    missing.push('lenses' as keyof LensInput);
  }
  return missing;
}

// ─── Factory ───────────────────────────────────────────────────

export function makeInitialLensInput(): LensInput {
  return {
    projectName: '',
    rootPath: '',
    stackHint: '',
    primaryBranch: 'main',
    projectGoal: '',
    lenses: ['architecture', 'tech-stack', 'features', 'security', 'performance', 'a11y'],
    depth: 'standard',
    tone: 'standard',
    includeTests: true,
    includeDocs: true,
    includeNodeModules: false,
    excludeGlobs: 'node_modules,.next,.turbo,dist,build,coverage,.git',
    deliverables: [
      'executive-summary',
      'file-tree-map',
      'mermaid-architecture',
      'tech-stack-table',
      'risk-register',
      'top-findings',
      'action-plan',
    ],
    outputFormat: 'markdown',
  };
}

// ─── Compilation ───────────────────────────────────────────────

const DEPTH_SETTINGS: Record<
  LensDepth,
  { label: string; rigor: string; timebox: string; fileBudget: string }
> = {
  scan: {
    label: 'SCAN',
    rigor: 'Read only top-level config, manifests, and 1-2 files per module. Skim, do not descend.',
    timebox: 'Target: ≤ 15 minutes of tool time. Bias toward coverage over depth.',
    fileBudget: 'Read at most ~40 files. Prefer `ls`, `tree`, and `grep` over reading.',
  },
  standard: {
    label: 'STANDARD',
    rigor: 'Read every entry point and every module index. Follow imports one hop deep when needed.',
    timebox: 'Target: 30-60 minutes of tool time. Balance coverage and depth.',
    fileBudget: 'Read ~100-200 files. Use `grep` to locate, `read` to confirm.',
  },
  forensic: {
    label: 'FORENSIC',
    rigor: 'Read every source file. Follow imports transitively. Cross-check claims against git history.',
    timebox: 'Target: unbounded. Thoroughness > speed.',
    fileBudget: 'Read every source file matched by the include globs.',
  },
};

const TONE_PREAMBLE: Record<LensTone, string> = {
  terse:
    'Respond with terse, information-dense output. No pleasantries. No filler. Every sentence must earn its place.',
  standard:
    'Respond with clear, professional output. Brief context is welcome; padding is not.',
  verbose:
    'Respond with thorough explanations. Include reasoning for every finding, and cite the files that support each claim.',
};

const OUTPUT_FORMAT_CONTRACT: Record<LensOutputFormat, string> = {
  markdown:
    'Output format: a single Markdown document, one top-level `# PROJECT LENS REPORT — <project>` heading, one `## <Deliverable>` heading per deliverable, in the order listed below.',
  json:
    'Output format: a single JSON document. Top-level keys: `project`, `depth`, `generatedAt`, `deliverables` (object keyed by deliverable id). Every deliverable is either a structured array/object or a pre-rendered Markdown string under the `markdown` field.',
  hybrid:
    'Output format: a single Markdown document that embeds fenced ```json blocks for any tabular deliverable (tech-stack-table, api-endpoint-table, risk-register, metrics-dashboard). Prose and diagrams stay as Markdown.',
};

function bullets(items: readonly string[]): string {
  return items.map((i) => `- ${i}`).join('\n');
}

function joinExcludeGlobs(raw: string): string[] {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface GeneratedLensPrompt {
  readonly prompt: string;
  readonly selectedLenses: readonly LensDef[];
  readonly selectedDeliverables: readonly LensDeliverableDef[];
}

export function generateLensPrompt(input: LensInput): GeneratedLensPrompt {
  const selectedLenses = input.lenses
    .map((id) => LENSES_BY_ID[id])
    .filter((x): x is LensDef => Boolean(x));
  const selectedDeliverables = input.deliverables
    .map((id) => LENS_DELIVERABLES_BY_ID[id])
    .filter((x): x is LensDeliverableDef => Boolean(x));

  const depth = DEPTH_SETTINGS[input.depth];
  const tonePreamble = TONE_PREAMBLE[input.tone];
  const outputContract = OUTPUT_FORMAT_CONTRACT[input.outputFormat];
  const excludes = joinExcludeGlobs(input.excludeGlobs);

  const scopeLines: string[] = [];
  scopeLines.push(`Root: \`${input.rootPath.trim() || '.'}\``);
  scopeLines.push(`Primary branch: \`${input.primaryBranch.trim() || 'main'}\``);
  if (input.stackHint.trim()) scopeLines.push(`Stack hint: ${input.stackHint.trim()}`);
  if (input.projectGoal.trim()) scopeLines.push(`Project goal: ${input.projectGoal.trim()}`);
  scopeLines.push(`Include tests: ${input.includeTests ? 'yes' : 'no'}`);
  scopeLines.push(`Include docs: ${input.includeDocs ? 'yes' : 'no'}`);
  scopeLines.push(`Include node_modules/vendor: ${input.includeNodeModules ? 'yes' : 'no'}`);
  if (excludes.length) scopeLines.push(`Exclude globs: ${excludes.map((g) => `\`${g}\``).join(', ')}`);

  const lensSections = selectedLenses
    .map((lens, idx) => {
      const header = `### ${idx + 1}. ${lens.title} — ${lens.kind.toUpperCase()}`;
      const focusLine = `**Focus:** ${lens.focus}`;
      const instructions = `**Instructions:**\n${bullets(lens.instructions)}`;
      const signals = `**Signals to look for:**\n${bullets(lens.signals)}`;
      const deliverables = `**Default deliverables:** ${lens.deliverables.join(', ')}`;
      return [header, focusLine, instructions, signals, deliverables].join('\n\n');
    })
    .join('\n\n');

  const deliverableSection = selectedDeliverables
    .map((d, idx) => `${idx + 1}. **${d.label}** — ${d.description}`)
    .join('\n');

  const standardsBlock = [
    'Operating standards while executing this analysis:',
    '- NO-INVENT: do not fabricate file paths, symbols, or versions. If uncertain, say so.',
    '- CITE-FILES: every claim that references project state must cite the file(s) and, when possible, line ranges.',
    '- DECLARE-ASSUMPTIONS: list every assumption at the top of the report before presenting findings.',
    '- READ-FIRST: complete reading before writing the report. Do not interleave exploration and conclusions.',
    '- NO SIDE-EFFECTS: do not modify any file, do not run migrations, do not push branches.',
  ].join('\n');

  const prompt = `# PROJECT LENS — ${input.projectName.trim() || '<project>'}

${tonePreamble}

## 0 · Mission
Perform a **${depth.label}** codebase reconnaissance of \`${input.projectName.trim() || '<project>'}\` across ${selectedLenses.length} lens${selectedLenses.length === 1 ? '' : 'es'} and produce the deliverables listed in §3.

## 1 · Scope
${bullets(scopeLines)}

## 2 · Depth & budget
- **Rigor:** ${depth.rigor}
- **Timebox:** ${depth.timebox}
- **File budget:** ${depth.fileBudget}

## 3 · Deliverables (in this exact order)
${deliverableSection || '- (none selected — add at least one deliverable)'}

## 4 · Lenses
${lensSections || '(no lenses selected — add at least one lens to the request)'}

## 5 · Output contract
${outputContract}

## 6 · Standards
${standardsBlock}

## 7 · Exit criteria
Consider the analysis complete when:
- Every deliverable in §3 is present in the report.
- Every lens in §4 has at least one finding or an explicit "no findings" note.
- Every assumption made during analysis is listed under §0 of the final report.
- No deliverable contains placeholder text like TODO, TBD, or <fill in>.

Begin by listing the files you intend to read in the first pass, then proceed.`;

  return {
    prompt,
    selectedLenses,
    selectedDeliverables,
  };
}

// ─── Quality scoring (for live preview) ────────────────────────

export interface LensScore {
  readonly total: number;
  readonly axes: ReadonlyArray<{ label: string; score: number; max: number }>;
}

export function scoreLens(input: LensInput): LensScore {
  // 5 axes × 20 pts = 100
  const identity = Math.min(
    20,
    (input.projectName.trim() ? 8 : 0) +
      (input.rootPath.trim() ? 8 : 0) +
      (input.stackHint.trim() ? 2 : 0) +
      (input.projectGoal.trim() ? 2 : 0)
  );

  // Coverage: number of lenses, weighted toward diversity of kind
  const kinds = new Set(input.lenses.map((id) => LENSES_BY_ID[id]?.kind).filter(Boolean));
  const coverage = Math.min(
    20,
    Math.min(12, input.lenses.length * 2) + kinds.size * 3 // max 12 + 9 = 21 → capped at 20
  );

  // Depth: scan 8, standard 14, forensic 20
  const depth = input.depth === 'forensic' ? 20 : input.depth === 'standard' ? 14 : 8;

  // Deliverables: count + presence of at least one diagram and one register/table
  const hasDiagram = input.deliverables.some((d) => d.startsWith('mermaid-'));
  const hasStructuredReport = input.deliverables.some((d) =>
    ['risk-register', 'tech-stack-table', 'api-endpoint-table', 'metrics-dashboard'].includes(d)
  );
  const deliverables = Math.min(
    20,
    Math.min(12, input.deliverables.length * 2) + (hasDiagram ? 4 : 0) + (hasStructuredReport ? 4 : 0)
  );

  // Hygiene: tests + docs + exclude globs set
  const hygiene = Math.min(
    20,
    (input.includeTests ? 5 : 0) +
      (input.includeDocs ? 5 : 0) +
      (joinExcludeGlobs(input.excludeGlobs).length > 0 ? 5 : 0) +
      (input.primaryBranch.trim() ? 5 : 0)
  );

  const total = identity + coverage + depth + deliverables + hygiene;

  return {
    total,
    axes: [
      { label: 'Identity', score: identity, max: 20 },
      { label: 'Coverage', score: coverage, max: 20 },
      { label: 'Depth', score: depth, max: 20 },
      { label: 'Deliverables', score: deliverables, max: 20 },
      { label: 'Hygiene', score: hygiene, max: 20 },
    ],
  };
}
