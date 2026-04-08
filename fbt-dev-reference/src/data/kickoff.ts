/**
 * FBT New Project Kickoff Prompt Generator
 * Extracted from: fbt_new_project_kickoff_prompt.html
 *
 * This module exports all form sections, scaffold flags, and the prompt generation
 * template used by the New Project Kickoff tool for Claude Code projects.
 */

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea';
  fullWidth?: boolean;
}

export interface FormSection {
  number: number;
  title: string;
  fields: FormField[];
}

export interface ScaffoldFlag {
  id: string;
  label: string;
  detail: string;
  defaultOn: boolean;
}

export interface KickoffFormData {
  name: string;
  slug: string;
  desc: string;
  user: string;
  problem: string;
  fe: string;
  be: string;
  db: string;
  auth: string;
  infra: string;
  repo: string;
  modules: string;
  integrations: string;
  timeline: string;
  team: string;
  avoid: string;
  activeFlags: string[];
}

/**
 * Form sections for the New Project Kickoff form
 * Organized by section number (01-05)
 */
export const kickoffFormSections: FormSection[] = [
  {
    number: 1,
    title: 'Identity',
    fields: [
      {
        id: 'name',
        label: 'Project Name',
        placeholder: 'e.g. CatchMoment',
        type: 'text',
      },
      {
        id: 'slug',
        label: 'Codename / Slug',
        placeholder: 'e.g. catchmoment',
        type: 'text',
      },
      {
        id: 'desc',
        label: 'One-line Product Description',
        placeholder: 'e.g. AI-powered event video capture and highlight generation platform',
        type: 'text',
        fullWidth: true,
      },
      {
        id: 'user',
        label: 'Primary User',
        placeholder: 'e.g. Event organisers, wedding photographers',
        type: 'text',
      },
      {
        id: 'problem',
        label: 'Core Problem Solved',
        placeholder: 'e.g. Manual video highlight creation takes hours',
        type: 'text',
      },
    ],
  },
  {
    number: 2,
    title: 'Tech Stack',
    fields: [
      {
        id: 'fe',
        label: 'Frontend',
        placeholder: 'e.g. Next.js 15, TypeScript, Tailwind',
        type: 'text',
      },
      {
        id: 'be',
        label: 'Backend',
        placeholder: 'e.g. .NET 8 Clean Architecture, EF Core',
        type: 'text',
      },
      {
        id: 'db',
        label: 'Database',
        placeholder: 'e.g. PostgreSQL + Redis',
        type: 'text',
      },
      {
        id: 'auth',
        label: 'Auth / Identity',
        placeholder: 'e.g. Zentra OAuth 2.0 / NextAuth / Clerk',
        type: 'text',
      },
      {
        id: 'infra',
        label: 'Infra / Deployment',
        placeholder: 'e.g. Railway, Vercel, AWS S3 Mumbai',
        type: 'text',
      },
      {
        id: 'repo',
        label: 'Repo Structure',
        placeholder: 'e.g. Monorepo / Polyrepo (list repos)',
        type: 'text',
      },
    ],
  },
  {
    number: 3,
    title: 'Architecture',
    fields: [
      {
        id: 'modules',
        label: 'Core Modules / Domains',
        placeholder: 'e.g.\n- UserManagement\n- EventCapture\n- VideoProcessing\n- NotificationService',
        type: 'textarea',
        fullWidth: true,
      },
      {
        id: 'integrations',
        label: 'Key Integrations / Third-party Services',
        placeholder: 'e.g. Razorpay, AWS S3, BunnyCDN, Modal GPU, Temporal Cloud, SendGrid',
        type: 'textarea',
        fullWidth: true,
      },
    ],
  },
  {
    number: 4,
    title: 'Scaffold Flags',
    fields: [], // Flags handled separately as toggle UI
  },
  {
    number: 5,
    title: 'Constraints & Goals',
    fields: [
      {
        id: 'timeline',
        label: 'MVP Deadline / Timeline',
        placeholder: 'e.g. 14 weeks, Phase 1 in 3 weeks',
        type: 'text',
      },
      {
        id: 'team',
        label: 'Team Size',
        placeholder: 'e.g. Solo (Claude Code) / 2 devs',
        type: 'text',
      },
      {
        id: 'avoid',
        label: 'Anything to Avoid / Special Constraints',
        placeholder: 'e.g. No serverless functions, avoid vendor lock-in, must run on Railway',
        type: 'textarea',
        fullWidth: true,
      },
    ],
  },
];

/**
 * All 10 scaffold flags with their descriptions and default states
 */
export const kickoffScaffoldFlags: ScaffoldFlag[] = [
  {
    id: 'docker',
    label: 'Docker / Compose',
    detail: 'Docker Compose dev environment with hot reload for all services',
    defaultOn: true,
  },
  {
    id: 'ci',
    label: 'GitHub Actions CI',
    detail: 'GitHub Actions: lint + test + build on PR, deploy on merge to main',
    defaultOn: true,
  },
  {
    id: 'lint',
    label: 'ESLint / .editorconfig',
    detail: 'ESLint (strict), Prettier, .editorconfig — zero warnings policy',
    defaultOn: true,
  },
  {
    id: 'env',
    label: 'env.example',
    detail: '.env.example with all required keys documented and typed',
    defaultOn: true,
  },
  {
    id: 'makefile',
    label: 'Makefile / scripts',
    detail: 'Makefile with: make dev, make build, make test, make migrate, make deploy',
    defaultOn: true,
  },
  {
    id: 'readme',
    label: 'README skeleton',
    detail: 'README.md with: project overview, setup guide, architecture diagram placeholder, env vars table',
    defaultOn: true,
  },
  {
    id: 'storybook',
    label: 'Storybook',
    detail: 'Storybook 8 for all shared UI components',
    defaultOn: false,
  },
  {
    id: 'openapi',
    label: 'OpenAPI spec',
    detail: 'openapi.json spec scaffolded and kept in sync with controllers',
    defaultOn: false,
  },
  {
    id: 'healthcheck',
    label: 'Health endpoints',
    detail: '/health and /ready endpoints on all services (no auth required)',
    defaultOn: true,
  },
  {
    id: 'sentry',
    label: 'Sentry / Observability',
    detail: 'Sentry SDK initialised for error tracking + performance monitoring',
    defaultOn: false,
  },
];

/**
 * Non-negotiable engineering standards that must be enforced
 */
export const kickoffStandards: string[] = [
  'SOLID · KISS · DRY · YAGNI',
  'Zero `any`. Strict mode. Explicit return types on all functions.',
  'WCAG 2.2 AA minimum across all UI',
  'FCP < 1.5s. Code-split by route. Lazy load non-critical paths.',
  'Extend-only from day one. OpenAPI spec is source of truth.',
  'No secrets in code. Server-side input validation everywhere.',
  'Domain language in all names — no abbreviations, no generic names.',
];

/**
 * Anti-hallucination directives
 */
export const kickoffAntiHallucinationDirectives: string[] = [
  'This is a NEW project — there are no existing files to read.',
  'Do NOT invent third-party APIs or package names. Use only well-known, stable packages.',
  'If a stack choice is ambiguous, state the assumption and proceed.',
  'Every generated package.json / .csproj dependency must be real and current.',
];

/**
 * Output format specification
 */
export const kickoffOutputFormat: string[] = [
  'Architecture decision summary (3–5 sentences)',
  'Full folder/repo structure as a tree',
  'All scaffold files, complete and runnable',
  'Setup instructions (how to run locally in < 5 commands)',
  'What is NOT included and why (scope boundaries)',
];

/**
 * Single source of truth for scaffold flag detail lines.
 * Derived from `kickoffScaffoldFlags` to guarantee zero drift between the
 * toggle UI labels and the lines that get pasted into the generated prompt.
 */
export const kickoffScaffoldFlagDetailMap: Record<string, string> =
  Object.fromEntries(kickoffScaffoldFlags.map((f) => [f.id, `→ ${f.detail}`]));

/** Labels paired 1:1 with `kickoffStandards` entries. */
const KICKOFF_STANDARD_LABELS = [
  'Architecture ',
  'TypeScript   ',
  'Accessibility',
  'Performance  ',
  'API contracts',
  'Security     ',
  'Naming       ',
];

/** Fixed column width for the header ASCII box. */
const HEADER_COL_WIDTH = 46;

function fitBoxCol(text: string): string {
  const max = HEADER_COL_WIDTH;
  const trimmed = text.length > max ? text.slice(0, max - 1) + '…' : text;
  return trimmed.padEnd(max);
}

/** Which kickoff fields are required before a prompt can be generated. */
export const kickoffRequiredFields: Array<keyof KickoffFormData> = [
  'name',
  'desc',
  'user',
  'problem',
  'fe',
  'be',
];

/** Returns the list of missing required field ids for a form state. */
export function getMissingKickoffFields(data: KickoffFormData): Array<keyof KickoffFormData> {
  return kickoffRequiredFields.filter((k) => {
    const v = data[k];
    return typeof v !== 'string' || !v.trim();
  });
}

/**
 * Generates the complete kickoff prompt based on form data.
 * Callers should run `getMissingKickoffFields` first and block generation if
 * any are missing — this function still produces output with placeholders if
 * called unchecked, to keep it pure and side-effect free.
 */
export function generateKickoffPrompt(data: KickoffFormData): string {
  const name = data.name || '[PROJECT]';
  const slug = data.slug || name.toLowerCase().replace(/\s+/g, '-');
  const desc = data.desc || '[DESCRIPTION]';
  const user = data.user || '[PRIMARY USER]';
  const problem = data.problem || '[PROBLEM]';
  const fe = data.fe || '[FRONTEND]';
  const be = data.be || '[BACKEND]';
  const db = data.db || '[DATABASE]';
  const auth = data.auth || '[AUTH]';
  const infra = data.infra || '[INFRA]';
  const repo = data.repo || '[REPO STRUCTURE]';
  const modules = data.modules || '[MODULES]';
  const integrations = data.integrations || '(none)';
  const timeline = data.timeline || '[TIMELINE]';
  const team = data.team || 'Solo (Claude Code)';
  const avoid = data.avoid || '(none)';

  const now = new Date().toISOString().slice(0, 10);

  const flagLines =
    data.activeFlags.length > 0
      ? data.activeFlags
          .map((f) => kickoffScaffoldFlagDetailMap[f] || `→ ${f}`)
          .join('\n  ')
      : '(no flags selected)';

  const standardsBlock = kickoffStandards
    .map((line, i) => `${KICKOFF_STANDARD_LABELS[i] ?? 'Standard     '} : ${line}`)
    .join('\n');

  const antiHallucinationBlock = kickoffAntiHallucinationDirectives
    .map((line) => `→ ${line}`)
    .join('\n');

  const outputFormatBlock = kickoffOutputFormat
    .map((line, i) => `${i + 1}. ${line}`)
    .join('\n');

  return `╔══════════════════════════════════════════════════════════╗
║  FBT NEW PROJECT KICKOFF                                 ║
║  Project : ${fitBoxCol(name)}║
║  Slug    : ${fitBoxCol(slug)}║
║  Date    : ${fitBoxCol(now)}║
╚══════════════════════════════════════════════════════════╝

━━ PRODUCT IDENTITY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name        : ${name}
Description : ${desc}
Primary User: ${user}
Problem     : ${problem}

━━ TECH STACK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend    : ${fe}
Backend     : ${be}
Database    : ${db}
Auth        : ${auth}
Infra       : ${infra}
Repos       : ${repo}

━━ ARCHITECTURE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Core Modules:
${modules
  .split('\n')
  .map((l) => '  ' + l)
  .join('\n')}

Integrations:
${integrations
  .split('\n')
  .map((l) => '  ' + l)
  .join('\n')}

━━ SCAFFOLD DIRECTIVE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scaffold the complete project foundation for ${name}.
Produce a production-ready starting point — not a tutorial boilerplate.
Every file must be real and runnable, not a placeholder comment.

SCAFFOLD INCLUDES:
  ${flagLines}

FOLDER STRUCTURE RULES:
  → Backend : Clean Architecture (Domain → Application → Infrastructure → API)
  → Frontend: feature-based folders (/features/[domain]/components|hooks|api)
  → Shared  : /packages/shared-types for DTOs shared across frontend and backend
  → Config  : all environment config centralised, never scattered

━━ CONSTRAINTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Timeline : ${timeline}
Team     : ${team}
Avoid    : ${avoid}

━━ NON-NEGOTIABLE ENGINEERING STANDARDS ━━━━━━━━━━━━━━━━━━
${standardsBlock}

━━ ANTI-HALLUCINATION DIRECTIVE ━━━━━━━━━━━━━━━━━━━━━━━━━━
${antiHallucinationBlock}

━━ OUTPUT FORMAT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${outputFormatBlock}

BEGIN SCAFFOLD FOR: ${name.toUpperCase()}`;
}
