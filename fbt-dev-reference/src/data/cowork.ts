/**
 * FBT Cowork Command Center v2 Data
 * Complete product, mode, and engineering standards configuration
 * Extracted from fbt-cowork-v2.html interactive tool
 */

/* ─────────────────────────────────────────────────────────────
   PRODUCTS: ALL 5 + NEW PRODUCT SCAFFOLD
   ───────────────────────────────────────────────────────────── */

export interface CoworkProduct {
  id: string;
  name: string;
  type: string;
  stack: string;
  stackFull: string;
  services: string;
  arch: string;
  auth: string;
  db: string;
  design: string;
  rules: string[];
  isNew?: boolean;
}

export const coworkProducts: CoworkProduct[] = [
  {
    id: 'rentflow',
    name: 'RentFlow',
    type: 'SaaS · Property Management',
    stack: 'Next.js 15 | .NET 8 | PostgreSQL | Railway | Expo',
    stackFull:
      'Next.js 15 (Control Plane + Public Site) | .NET 8 (RentFlow API) | PostgreSQL (Railway) | Pino (logging) | Zentra OAuth | Expo / React Native (Mobile)',
    services:
      'Control Plane (Next.js 15) | RentFlow API (.NET 8) | Mobile (Expo/React Native) | Public Site (Next.js 15)',
    arch: 'Vertical Slice Architecture (API) | Multi-tenant property isolation | BFF pattern (Next.js → .NET API)',
    auth: 'Zentra (OAuth 2.0/OIDC) + HttpOnly cookies + BFF proxy pattern + single-flight refresh mutex',
    db: 'PostgreSQL (Railway managed) · EF Core · Npgsql · Additive migrations only · Never drop/rename',
    design: 'Tailwind CSS + Radix UI + Framer Motion | canvas:#0A0F1E | accent:#FF6B2B | text:#F5F0E8',
    rules: [
      'output:standalone in next.config → start: node server.js — NEVER next start (Railway crash)',
      'pino-pretty transport block MUST NOT exist in any Next.js logger.ts — causes thread-stream crash',
      'Railway PostgreSQL URI → ADO.NET: postgresql://u:p@h:port/db → Host=h;Port=port;Database=db;Username=u;Password=p;SSL Mode=Require',
      'DataProtection → PersistKeysToDbContext<AppDbContext>() — never in-memory (Railway pod restarts kill sessions)',
      'Refresh token race → single-flight mutex: Map<sessionId, Promise<TokenSet>> in BFF refresh handler',
      'IDOR: CanAccessPropertyAsync + CanAccessResidentAsync REQUIRED on every property/resident resource',
      'Multi-tenant isolation: every SQL query MUST filter by property_id AND tenant_id — no exceptions',
      'API contracts: extend-only — NEVER rename or remove existing DTO fields (all consumers break)',
      'DB migrations: additive only — nullable column first, NOT NULL constraint in a separate later deploy',
      'OIDC discovery: cache with 5-min TTL — never fetch per-request (6 concurrent tabs = 6 discovery calls)',
      'Standalone monorepo path: add postbuild script: find . -name server.js -path "*standalone*" — read actual path from Railway build log before hardcoding start command',
    ],
  },
  {
    id: 'zentra',
    name: 'Zentra',
    type: 'Identity Provider · OAuth 2.0/OIDC',
    stack: '.NET 8 | PostgreSQL | Railway',
    stackFull: '.NET 8 | PostgreSQL (Railway) | Clean Architecture | CQRS + MediatR | Domain-Driven Design | Railway',
    services: 'Zentra API (.NET 8) | Zentra Admin (Next.js)',
    arch: 'Clean Architecture | CQRS + MediatR | Domain-Driven Design (DDD)',
    auth: 'Self-contained OIDC provider — issues access + refresh + id tokens for ALL FBT products',
    db: 'PostgreSQL (Railway managed) · EF Core · Npgsql',
    design: 'Tailwind CSS + Framer Motion | Futuristic dark UI | iframe embedding in Zentra Admin via CSP frame-ancestors',
    rules: [
      'Extend-only: NEVER remove or rename claims, scopes, or token fields — all FBT consumers depend on them',
      'PKCE enforced on ALL OAuth 2.0 flows — code_challenge + code_verifier required',
      'State parameter validated on every authorization response — CSRF prevention, non-negotiable',
      'CSP frame-ancestors: configured for Zentra Admin iframe embedding in Control Plane',
      'DataProtection → PersistKeysToDbContext — never in-memory on Railway (pod restarts destroy keys)',
      'NuGet restore on Railway: may need --no-cache flag if packages fail (network transient errors)',
      'NullReferenceException in auth pipeline: always trace the nullable chain before the failing token handler call',
      'Every token endpoint: validate client_id + redirect_uri before processing — never issue tokens to unknown clients',
      'Client secrets: stored hashed (BCrypt) — never in plaintext in DB',
    ],
  },
  {
    id: 'neatfresh',
    name: 'Neat & Fresh',
    type: 'E-commerce · FMCG',
    stack: 'Next.js 14 | .NET 8 | PostgreSQL | Razorpay',
    stackFull: 'Next.js 14 (Storefront) | .NET 8 (Commerce API) | PostgreSQL | Razorpay (payments) | Railway | next-intl (5 languages)',
    services: 'Storefront (Next.js 14) | Commerce API (.NET 8)',
    arch: 'Vertical Slice Architecture (API) | Next.js App Router | ISR for product catalogue pages',
    auth: 'Zentra (OAuth 2.0/OIDC) for admin/owner | Public storefront = no auth',
    db: 'PostgreSQL · EF Core · Npgsql',
    design: 'Tailwind CSS | Brand: fresh/clean palette | next/image for all product images (CLS = 0)',
    rules: [
      'Razorpay: verify X-Razorpay-Signature webhook header BEFORE processing any order state change',
      'Idempotency keys on ALL Razorpay payment mutations — no duplicate charges under any condition',
      'Order state machine: PENDING → CONFIRMED → SHIPPED → DELIVERED — never skip or reverse states',
      'All product images: next/image with explicit width + height — CLS = 0 is mandatory',
      'Multilingual: next-intl · all user-facing strings in translation files — no hardcoded strings in components',
      'Price: always display INR with ₹ symbol — never ambiguous currency',
      'Stock: check available quantity BEFORE confirming order — never allow negative inventory',
      'Product catalogue: 55+ products — virtualise long lists, lazy-load images below fold',
    ],
  },
  {
    id: 'firose',
    name: 'FIROSE Enterprises',
    type: 'Corporate · FMCG Conglomerate',
    stack: 'Next.js | Tailwind | Railway',
    stackFull: 'Next.js (App Router) | Tailwind CSS | Railway | next-intl (5 languages) | Static generation + ISR',
    services: 'Corporate Site | Femison brand site | AR Perfumes brand site | Neat & Fresh brand site',
    arch: 'Next.js App Router | Static generation preferred | ISR for product catalogue | No BFF needed (public sites)',
    auth: 'N/A — public marketing sites, no authentication layer',
    db: 'N/A or headless CMS (no relational DB)',
    design: 'Per-brand design system | Femison: premium feminine | Neat & Fresh: fresh/clean | AR Perfumes: luxury/dark',
    rules: [
      'Multilingual: next-intl — 5 languages (EN, Tamil, Hindi + locale variants) — no hardcoded UI strings',
      'Brand isolation: each brand has its own colour token system — NEVER mix brand colours',
      'All images: WebP format with <picture> / srcset fallbacks',
      'SEO: structured data (Organization, Product, LocalBusiness schemas) on all key pages — JSON-LD',
      'Performance: FCP < 1.5s mandatory for ALL marketing pages — static preferred over SSR',
      'Google Ads: UTM parameters must be preserved through all navigation and form submissions',
      'Product catalogue: 55+ products — lazy load below-fold images, paginate long lists',
      'Digital brochure: all 55 products (Femison + Neat & Fresh) — accurate data, no placeholder content',
    ],
  },
  {
    id: 'vyxnos',
    name: 'Vyxnos Shield',
    type: 'Zero-Trust API Gateway',
    stack: '.NET 8 | PostgreSQL | Railway',
    stackFull: '.NET 8 | PostgreSQL (Railway) | Clean Architecture | CQRS | Zero-Trust policy engine',
    services: 'Vyxnos Shield (.NET 8 API)',
    arch: 'Clean Architecture | CQRS + MediatR | Zero-Trust policy evaluation | Audit-first design',
    auth: 'Zero-trust: every request authenticated + authorised — no implicit trust for any caller',
    db: 'PostgreSQL · EF Core · Npgsql',
    design: 'N/A — API-only service, no UI',
    rules: [
      'Zero-trust: no request is trusted implicitly — authenticate AND authorise every single call',
      'ALL secrets via environment variables — NEVER hardcoded, NEVER in source, NEVER in logs',
      'Audit log EVERY policy decision (allow / deny / challenge) — with timestamp, principal, resource, and outcome',
      'Rate limiting: enforced at gateway level — per-client-id, per-endpoint, per time window',
      'mTLS: enforce where client-to-gateway communication requires it',
      'Policy mutations: require explicit two-step confirmation — no single-operator policy changes',
      'Never return detailed error messages to callers — generic 401/403 only, detailed reason in internal audit log',
    ],
  },
  {
    id: 'newproduct',
    name: 'New Product',
    type: 'Define · Scaffold · Launch',
    stack: 'You Define · Any Stack',
    stackFull: '[Defined by engineer in New Product form]',
    services: '[Defined by engineer]',
    arch: '[Defined by engineer]',
    auth: '[Defined by engineer]',
    db: '[Defined by engineer]',
    design: '[Defined by engineer]',
    rules: ['[Defined by engineer in New Product form]'],
    isNew: true,
  },
];

/* ─────────────────────────────────────────────────────────────
   OPERATIONAL MODES: ALL 15 (00-14)
   ───────────────────────────────────────────────────────────── */

export interface CoworkMode {
  num: string;
  name: string;
  desc: string;
  hint: string;
  tags: string[];
  body: string;
  bridge?: boolean;
  genesis?: boolean;
}

export const coworkModes: CoworkMode[] = [
  {
    num: '00',
    name: 'Session Init',
    desc: 'Prime Cowork — run this first',
    hint: 'Always run this at the start of a new Cowork session. Primes anti-hallucination, declares scope, and forces directory scan before any task.',
    tags: ['first-run', 'priming', 'scope'],
    body: `# MODE: SESSION-INIT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PURPOSE: Prime this session before any task. RUN FIRST in every new Cowork session.
# After confirmation, select Mode 01–12 for your actual work.

## SESSION SCOPE (fill before running)
WORKING ON   : [what you are building or fixing today — one sentence]
CODEBASES    : [which projects will be touched]
BRANCH       : [git branch name]
ENVIRONMENT  : [local / Railway staging / Railway production]
KNOWN ISSUES : [any broken state or known constraints going in]
START FILE   : [path of first file to read, or "begin with directory scan"]

## PRIMING INSTRUCTIONS
Acknowledge and confirm each of the following before I give you the first task:

  1. You are the SOLE engineering team for this session.
  2. You have read ZERO files. You know NOTHING about this codebase from prior sessions.
  3. Every claim about file content requires that file to have been read in THIS session.
  4. You will follow the phase order: READ → ANALYSE → ACT. Never merge or skip phases.
  5. You will produce a file list BEFORE opening any file.
  6. You will NEVER write code until READ and ANALYSE phases are explicitly confirmed complete.
  7. If any file is not found: state "FILE NOT FOUND — searched: [terms]". Never invent content.

RESPOND ONLY WITH:
┌─────────────────────────────────────────────────────┐
│ SESSION READY                                       │
│ Product  : [product name]                           │
│ Scope    : [scope summary]                          │
│ Branch   : [branch]                                 │
│ Files read so far: 0                               │
│ Current phase: PRE-FLIGHT                          │
│ Awaiting first task.                               │
└─────────────────────────────────────────────────────┘

## DIRECTORY SCAN (perform this before any task — no file reads yet)
Scan the directory tree of each project in scope.
For each, produce:
  - Root structure (2 levels deep)
  - Key directories and their apparent purpose
  - Anything missing, unexpected, or worth flagging

DO NOT read any file during this phase — directory structure listing only.`,
  },
  {
    num: '01',
    name: 'Bug Fix',
    desc: 'Crash · error · wrong behaviour',
    hint: 'Paste all logs. Diagnose root cause, confirm hypothesis, implement the correct production-grade fix.',
    tags: ['stack trace', 'root cause', 'logs'],
    body: `# MODE: BUG-FIX
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## BUG REPORT (fill all fields before running)
ERROR MESSAGE  : [exact error — verbatim, never paraphrased]
FILE + LINE    : [file:line if known from stack trace]
LOGS           : [paste ALL logs — BFF, API, Zentra, Railway, browser console]
CORRELATION ID : [paste from log if available]
REPRODUCTION   : [exact numbered steps to reproduce]
FREQUENCY      : [always | intermittent | specific condition: ___]
ENVIRONMENT    : [local | Railway staging | Railway production | both]
REGRESSION     : [did this ever work? when did it break? last known good state?]

## PHASE 1 — PRE-FLIGHT READ (complete entirely before Phase 2)
⛔ NO code changes in this phase.

[ ] List every file mentioned in the error and stack trace
[ ] List every file in the call chain from entry point to crash site
[ ] READ each file completely — top to bottom
[ ] Confirm the exact crashing line by reading it — never guess
[ ] If a file is not found: "FILE NOT FOUND — searched: [terms]"

Answer these questions FROM reading code — never from assumptions:
  Q1. What is the exact expression that crashes at that line?
  Q2. What value does it hold at crash time, and why is it wrong?
  Q3. What is the correct value it should hold?
  Q4. What code path produces the incorrect state?
  Q5. Why does this NOT occur in the other environment?

## PHASE 2 — HYPOTHESES (produce before writing any fix)
⛔ STOP. Do not write a fix until one hypothesis is CONFIRMED by reading code.

  [ ] HYPOTHESIS A: [description] — evidence: [file:line read in Phase 1]
  [ ] HYPOTHESIS B: [description] — evidence: [file:line read in Phase 1]
  [ ] HYPOTHESIS C: [description] — evidence: [file:line read in Phase 1]

Eliminate each by re-reading code. Mark ELIMINATED with reason or CONFIRMED.
Do not proceed to Phase 3 until exactly one hypothesis is marked CONFIRMED.

## PHASE 3 — FIX (only after Phase 2 confirms one hypothesis)
Rules:
  → Fix the ROOT CAUSE — never mask with a catch block or null guard
  → Zero behaviour change outside the confirmed bug scope
  → If fix requires a migration: additive only, nullable column first
  → If fix touches API contract: extend-only, no field removals or renames

## OUTPUT CONTRACT
\`\`\`
ROOT CAUSE     : [confirmed hypothesis — one sentence — cite file:line evidence]
CRASH LOCATION : [file:line — read from file, not inferred]

BEFORE (verbatim from file — not paraphrased):
[exact broken code]

AFTER (complete — no stubs, no TODOs):
[full corrected code]

BEHAVIOUR CHANGE  : [what changes and what does NOT]
REGRESSION RISK   : [adjacent code that must be reviewed]
VERIFICATION      : [exact command(s) to confirm the fix]
TS ANY            : [zero — confirmed]
\`\`\``,
  },
  {
    num: '02',
    name: 'New Feature',
    desc: 'Build from scratch — complete implementation',
    hint: 'Describe the feature. Analyse existing code first, plan every file in dependency order, then implement completely.',
    tags: ['vertical slice', 'CQRS', 'multi-tenant'],
    body: `# MODE: NEW-FEATURE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## FEATURE BRIEF (fill before running)
FEATURE NAME     : [name]
USER STORY       : As a [Owner | Manager | Resident | Admin], I want [action] so that [outcome]
SCOPE            : [Control Plane | RentFlow API | Zentra | Mobile | Public Site — be specific]
OUT OF SCOPE     : [what is EXPLICITLY excluded from this feature]
SUCCESS CRITERIA : [observable behaviour that confirms feature is complete]
PERSONA DEVICE   : [Owner/mobile | Manager/desktop | etc. — affects UX decisions]

## PHASE 1 — ANALYSIS (read-only — produce before any implementation)
⛔ NO code changes in this phase.

[ ] Scan directory — list every file that will need to change (before reading any)
[ ] Read each relevant file completely
[ ] Answer from code — never from assumptions:
    → What currently exists related to this feature? (extend vs build new)
    → What is the minimum change surface to implement this correctly?
    → What DB schema changes are needed? (additive only — what columns are missing?)
    → What API contract changes? (extend-only — what fields need to be added?)
    → What are the tenant / IDOR implications of this feature?
    → What UX laws govern the UI surface for this persona?
    → What validation is needed, client-side AND server-side?
    → What Zentra claims or scopes are required?

## PHASE 2 — IMPLEMENTATION PLAN (produce before writing code)
List every file in strict dependency order:
  01. DB migration (if needed) — nullable column first, justification included
  02. Domain entity / value object update
  03. Command/Query + Validator + Handler (.NET API)
  04. API endpoint registration
  05. OpenAPI spec update
  06. TypeScript client regeneration: pnpm openapi:generate
  07. BFF proxy route (if applicable)
  08. UI component(s) — with UX laws mapped per component
  09. Mobile screen (if applicable)
  10. Tests

⛔ STOP. Present this plan and wait for confirmation before Phase 3.

## PHASE 3 — IMPLEMENTATION (one file at a time, in plan order)
For each file:
  → READ the file completely before writing a single line
  → Implement completely — no stubs, no TODOs, no placeholder comments
  → Confirm SOLID, KISS, DRY, YAGNI for every function/class
  → Apply all applicable UX laws to every UI component
  → WCAG 2.2 AA on every interactive element

## OUTPUT CONTRACT (per file)
\`\`\`
FILE        : [exact path — confirmed by reading]
CHANGE TYPE : new | modify
REASON      : [one sentence]
BEFORE      : [current code verbatim — if modifying]
AFTER       : [complete implementation]
SOLID       : [each principle — confirm or note trade-off]
KISS/DRY    : [confirm]
UX LAWS     : [which laws, how each is met — if UI]
A11Y        : [aria attributes + keyboard behaviour — if UI]
\`\`\``,
  },
  {
    num: '03',
    name: 'Investigation',
    desc: 'Diagnose from logs — zero code changes',
    hint: 'Paste all logs. Produce architecture map, event sequence, and root cause statement. No fixes.',
    tags: ['correlationId', 'logs', 'read-only'],
    body: `# MODE: BUG-INVESTIGATION (READ-ONLY)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ⛔ ZERO code changes. Output: diagnosis report only.

## LOGS (paste everything available)
BFF LOGS       : [paste]
API LOGS       : [paste]
ZENTRA LOGS    : [paste]
RAILWAY LOGS   : [paste]
BROWSER LOGS   : [paste]
NETWORK TAB    : [paste relevant request/response headers]
CORRELATION ID : [paste]

## PHASE 1 — PRE-FLIGHT READ
[ ] List every file in the stack trace or referenced in logs
[ ] List every file in the call chain from entry point to failure
[ ] READ each file completely — ⛔ NO changes

## PHASE 2 — INVESTIGATION (answer from logs + code)
  1. Event sequence: map each log line → what it means in the system
  2. Last known good state: what succeeded before the failure?
  3. First bad signal: which log line first indicates something is wrong?
  4. Layer ownership: DB / API / BFF / UI / Auth / Network / Infra
  5. Determinism: always-fail? race condition? timing? load-dependent?
  6. Environment delta: why does this NOT occur in the other environment?
  7. Root cause in one sentence: ___

## PHASE 3 — DELIVERABLES (produce all)

### ARCHITECTURE MAP
Full request trace from trigger to failure:
  [User action]
    → [BFF route: file:line]
    → [API endpoint: file:line]
    → [Handler: file:line]
    → [DB query: file:line]
    → [FAILURE POINT: file:line — exact reason]

### GAP REPORT
\`\`\`
[P0] [LAYER] [FILE:LINE] [DESCRIPTION]
     RISK: [consequence if not fixed]

[P1] [LAYER] [FILE:LINE] [DESCRIPTION]
     IMPACT: [what degrades]

[P2] [LAYER] [FILE:LINE] [DESCRIPTION]
     NOTE: [improvement]
\`\`\`

### ROOT CAUSE STATEMENT
[What is broken] | [Why] | [Which layer owns it] | [Evidence: file:line]

### FIX READINESS
  Files to read before implementing  : [list]
  DB state to verify                 : [list]
  Environment config to check        : [list]
  Estimated change scope             : small | medium | large`,
  },
  {
    num: '04',
    name: 'Refactor',
    desc: 'Improve structure — zero behaviour change',
    hint: 'Read, audit tech debt, plan refactor. Observable behaviour must be provably identical before and after.',
    tags: ['SOLID', 'DRY', 'zero behaviour change'],
    body: `# MODE: REFACTOR
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ⛔ HARD CONSTRAINT: Zero observable behaviour change.
# Every call site must work identically before and after.

## REFACTOR SCOPE
TARGET              : [file(s) or feature area]
REASON              : [specific measurable problem — not "feels messy"]
BEHAVIOUR GUARANTEE : [the exact observable behaviour that must be preserved]

## PHASE 1 — READ + AUDIT (⛔ no changes yet)
[ ] Read every in-scope file completely
[ ] List all call sites of every function/class being changed
[ ] List all tests covering this code

TECH DEBT AUDIT — per file:
  SOLID violations   : [principle | function/class | file:line]
  DRY violations     : [duplicated logic | file:line ↔ file:line]
  KISS violations    : [needlessly complex | description]
  Dead code          : [unreachable / unused | file:line]
  TS any usages      : [file:line]
  N+1 / perf issues  : [description]
  Type gaps          : [missing or incorrect types]

## PHASE 2 — REFACTOR PLAN (produce before writing)
List changes in safe execution order (lowest risk first):
  01. [change] | reason | risk: low/medium/high
  02. ...

RULES:
  → Never change public API signatures without updating ALL call sites in the same commit
  → Never rename exported symbols without updating ALL import sites
  → Extend-only on any public contract — no removals, no renames

⛔ STOP. Confirm plan before Phase 3.

## PHASE 3 — IMPLEMENTATION (one logical change at a time)
  → Re-read the file immediately before each change
  → Make only the planned change — nothing extra
  → Confirm behaviour is preserved after EACH change before moving to the next

## OUTPUT CONTRACT (per change)
\`\`\`
FILE               : [path]
CHANGE             : [what was refactored — one sentence]
BEFORE             : [verbatim original]
AFTER              : [refactored code]
BEHAVIOUR PRESERVED: [how confirmed]
CALL SITES UPDATED : [all affected files]
TESTS TO RUN       : [commands]
\`\`\``,
  },
  {
    num: '05',
    name: 'Gap Analysis',
    desc: 'Find missing + broken — read only',
    hint: 'Read-only deep scan. Produce a P0/P1/P2 gap report + decision surface before planning any fixes.',
    tags: ['P0/P1/P2', 'isolation', 'architecture'],
    body: `# MODE: GAP-ANALYSIS (READ-ONLY)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ⛔ ZERO code changes. Output: architecture map + gap report + decisions.

## SCAN SCOPE
FEATURE AREA : [what to analyse]
PROJECTS     : [which services to include]
FOCUS        : [security | isolation | UX | performance | completeness | all]

## PHASE 1 — DIRECTORY SCAN
[ ] Scan full directory tree of each project in scope
[ ] List every relevant file before reading any
[ ] State "NOT IMPLEMENTED" for absent features — never invent behaviour

## PHASE 2 — DEEP READ
Read every relevant file completely. No partial reads.

## PHASE 3 — AUDIT CHECKLIST

DB LAYER:
  [ ] Missing columns logic depends on
  [ ] Missing indexes on filtered, ordered, or joined columns
  [ ] Nullable columns that should be NOT NULL
  [ ] Orphan state possible from multi-step writes without transactions
  [ ] Missing foreign key constraints with explicit ON DELETE behaviour

API LAYER:
  [ ] Missing IDOR checks on property / resident resources
  [ ] Unvalidated caller-controlled parameters
  [ ] Public endpoints leaking entity names, IDs, or metadata
  [ ] Missing transaction boundaries (two HTTP calls that should be atomic)
  [ ] Compensation / rollback gaps on partial write failures

BFF LAYER:
  [ ] No single-flight mutex on concurrent token refresh
  [ ] OIDC discovery fetched per-request (uncached)
  [ ] Token or cookie values appearing in logs
  [ ] Invite / verification token logic missing or misplaced

UI LAYER:
  [ ] Missing optimistic updates (Doherty Threshold violated)
  [ ] Interactive elements not accessible (WCAG 2.2 AA)
  [ ] Missing error boundaries around heavy or async components
  [ ] TypeScript any usages
  [ ] Touch targets below 44px

## OUTPUT CONTRACT
\`\`\`
ARCHITECTURE MAP:
  [data flow per feature: entry → BFF → API → DB]

GAP REPORT:
  [P0] [LAYER] [FILE:LINE] [DESCRIPTION] | RISK: [consequence]
  [P1] [LAYER] [FILE:LINE] [DESCRIPTION] | IMPACT: [degradation]
  [P2] [LAYER] [FILE:LINE] [DESCRIPTION] | NOTE: [improvement]

DECISIONS NEEDED:
  [D1] [question] | Options: [A] vs [B] | Recommendation: [which + why]

SUMMARY: P0:[n]  P1:[n]  P2:[n]  Decisions:[n]
\`\`\``,
  },
  {
    num: '06',
    name: 'Security Audit',
    desc: 'CRITICAL to LOW — vulnerabilities + risks',
    hint: 'Read-only security review. Produce CRITICAL/HIGH/MEDIUM/LOW findings with file:line evidence and attack vectors.',
    tags: ['IDOR', 'auth', 'isolation', 'PII'],
    body: `# MODE: SECURITY-AUDIT (READ-ONLY)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ⛔ ZERO code changes. Output: security findings report.

## AUDIT SCOPE
PROJECTS : [which services]
FOCUS    : [auth | isolation | input validation | logging | rate limiting | all]

## PHASE 1 — PRE-FLIGHT READ LIST
[ ] Every auth-related file (middleware, token handlers, validators)
[ ] Every public / anonymous endpoint
[ ] Every request pipeline entry point
[ ] Every place tokens or cookies are stored, forwarded, or logged
[ ] Every SQL query construction

## PHASE 2 — SECURITY CHECKLIST

AUTH & TOKENS:
  [ ] Tokens in HttpOnly cookies — not localStorage or sessionStorage?
  [ ] Refresh token rotation on every use?
  [ ] Single-flight mutex on concurrent refresh requests?
  [ ] Token values NEVER in logs? (audit pino redact list)
  [ ] PKCE enforced on all OAuth flows?
  [ ] State parameter validated on every auth response (CSRF)?
  [ ] Token expiry enforced server-side (not only UI redirect)?

MULTI-TENANT ISOLATION:
  [ ] Every SQL query filtered by tenant_id AND property_id?
  [ ] IDOR check on every property/resident resource?
  [ ] Manager of Property A cannot access Property B by mutating URL?
  [ ] Resident cannot read another resident's data?
  [ ] Isolation enforced at DB layer — not only UI visibility?

INPUT VALIDATION:
  [ ] All user input validated server-side (not client-only)?
  [ ] Emails: trim + lowercase before storage and lookups?
  [ ] Only parameterised queries — zero string interpolation in SQL?
  [ ] Duplicate email checks are case-insensitive?
  [ ] File uploads: type, size, and content validated?

INFORMATION LEAKAGE:
  [ ] Public endpoints return boolean validity only (no entity names/IDs)?
  [ ] Stack traces suppressed in production HTTP responses?
  [ ] PII absent from all log output?
  [ ] Error messages reveal nothing about system internals?

RATE LIMITING:
  [ ] All public endpoints rate-limited?
  [ ] Auth endpoints protected against credential stuffing?
  [ ] Join/invite links protected against brute force?
  [ ] Payment endpoints protected against replay attacks?

## OUTPUT CONTRACT
\`\`\`
SECURITY AUDIT REPORT — [product] — [scope]
═════════════════════════════════════════════

[CRITICAL] [LAYER] [FILE:LINE]
  VULNERABILITY: [description]
  ATTACK VECTOR: [how it can be exploited]
  IMPACT       : [consequence if exploited]

[HIGH] [LAYER] [FILE:LINE]
  FINDING: [description]
  IMPACT : [consequence]

[MEDIUM] [LAYER] [FILE:LINE]
  FINDING: [description]

[LOW] [LAYER] [FILE:LINE]
  FINDING: [description]

SUMMARY: CRITICAL:[n]  HIGH:[n]  MEDIUM:[n]  LOW:[n]
\`\`\``,
  },
  {
    num: '07',
    name: 'Performance',
    desc: 'Optimise against FCP/LCP/CLS/INP budgets',
    hint: 'Audit against performance budgets first. Measure current metrics. Implement targeted, verifiable optimisations.',
    tags: ['LCP', 'FCP', 'N+1', 'bundle', 'CLS'],
    body: `# MODE: PERFORMANCE-OPTIMISATION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PERFORMANCE BUDGETS (non-negotiable)
FCP < 1.5s  |  LCP < 2.5s  |  CLS = 0  |  INP < 200ms
Server P95 < 200ms  |  DB query P95 < 50ms

## SCOPE
TARGET          : [page | endpoint | component | query]
CURRENT METRICS : [paste Lighthouse scores / server timing / Railway logs / DB explain output]
TARGET METRICS  : [specific values to achieve — must meet budgets above]

## PHASE 1 — PRE-FLIGHT READ
[ ] Read the target component or endpoint completely
[ ] Read every DB query it executes (with EXPLAIN ANALYSE if available)
[ ] Read next.config.ts or equivalent build config
[ ] For frontend: NEXT_ANALYZE=true pnpm build → identify bundle contributors

## PHASE 2 — AUDIT CHECKLIST

FRONTEND:
  [ ] All images: next/image with explicit width + height? (CLS = 0)
  [ ] Hero / above-fold images: priority={true}? (LCP improvement)
  [ ] Three.js / WebGL / heavy viz: next/dynamic with ssr:false?
  [ ] pino-pretty transport block absent from logger.ts?
  [ ] Framer Motion: spring physics only (no ease-in-out)?
  [ ] OIDC discovery: cached with 5-min TTL?
  [ ] Single-flight mutex on concurrent token refresh?
  [ ] Optimistic updates on all user interactions?
  [ ] Skeleton screens replacing spinners on data loads?
  [ ] Fonts: next/font with preload — no @import in CSS?
  [ ] Below-fold components lazy loaded?

BACKEND:
  [ ] N+1 queries eliminated? (check every repository method)
  [ ] Composite indexes on all filtered + ordered + joined columns?
  [ ] All list endpoints paginated — no unbounded SELECT *?
  [ ] Response payloads include only needed fields?
  [ ] Repeated computation memoised or cached?
  [ ] Connection pool sized correctly for Railway?

## OUTPUT CONTRACT (per optimisation)
\`\`\`
OPTIMISATION   : [name]
FILE           : [path — confirmed by reading]
CURRENT METRIC : [measured value]
TARGET METRIC  : [budget value]
CHANGE         : [complete implementation]
EXPECTED GAIN  : [estimated improvement]
VERIFY BY      : [exact command or tool]
REGRESSION RISK: [adjacent code to check]
\`\`\``,
  },
  {
    num: '08',
    name: 'DB / Migration',
    desc: 'Schema changes — additive only, never drop',
    hint: 'Read schema, entity, and all repositories first. Write safe additive SQL. Never drop, never rename.',
    tags: ['PostgreSQL', 'additive', 'EF Core', 'Npgsql'],
    body: `# MODE: DB-MIGRATION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## MIGRATION BRIEF
CHANGE NEEDED    : [describe the schema change and the business reason]
TABLES AFFECTED  : [list all affected tables]
HAS EXISTING DATA: [yes | no — critical for NOT NULL strategy]

## PHASE 1 — PRE-FLIGHT READ
[ ] Read ALL existing migration files for each affected table (in order)
[ ] Read C# entity class and EF Core configuration
[ ] Read every repository method querying these tables
[ ] CONFIRM: does the column or index already exist? (check all migration files)
[ ] If found: state "ALREADY EXISTS at [migration file:line]" — do not duplicate

## MIGRATION RULES (NON-NEGOTIABLE)
  01. ADDITIVE ONLY — never drop, rename, or change the type of existing columns
  02. NOT NULL on existing table → mandatory 3-deploy sequence:
        Deploy A : Add column as nullable (no data loss, no lock)
        Deploy B : Backfill existing rows in a data migration
        Deploy C : Add NOT NULL constraint (only after backfill verified complete)
  03. All new indexes: CREATE INDEX CONCURRENTLY (zero table locks)
  04. All constraints: IF NOT EXISTS (idempotent — safe to re-run on failure)
  05. Foreign keys: explicit ON DELETE behaviour — CASCADE | SET NULL | RESTRICT
  06. Railway PostgreSQL URI → ADO.NET (for .NET/Npgsql):
        FROM: postgresql://user:pass@host:port/db
        TO  : Host=host;Port=port;Database=db;Username=user;Password=pass;SSL Mode=Require

## PHASE 2 — CURRENT SCHEMA (read from files — not from memory)
\`\`\`
TABLE   : [name]
COLUMNS : [list with types and constraints — verbatim from migration]
INDEXES : [existing indexes]
GAPS    : [what the feature needs that does not exist]
\`\`\`

## PHASE 3 — MIGRATION SQL
\`\`\`sql
-- Migration : [descriptive-kebab-case-name]
-- Tables    : [affected tables]
-- Reason    : [business reason]
-- Additive  : YES — no drops, no renames, no type changes
-- Idempotent: YES — IF NOT EXISTS on all statements

ALTER TABLE [table]
  ADD COLUMN IF NOT EXISTS [column] [type] [NULL | DEFAULT value];

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_[table]_[column]
  ON [table]([column]);
\`\`\`

## PHASE 4 — ENTITY + REPOSITORY UPDATE
For each affected file — READ completely before modifying:
  → Add property to C# entity
  → Update EF Core config (HasColumnName, IsRequired, HasDefaultValue)
  → Update every repository method that needs the new column
  → Confirm: no breaking changes to existing repository public signatures`,
  },
  {
    num: '09',
    name: 'API Contract',
    desc: 'Extend endpoints — never break consumers',
    hint: 'Update spec first, then code. Add fields only — never rename, remove, or change types.',
    tags: ['OpenAPI', 'extend-only', 'DTO', 'FluentValidation'],
    body: `# MODE: API-CONTRACT
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## CONTRACT BRIEF
ENDPOINT  : [METHOD /path]
CHANGE    : [what needs to be added — describe as "add X field to response"]
CONSUMERS : [Control Plane BFF | Mobile | External — all must continue working]

## PHASE 1 — PRE-FLIGHT READ
[ ] Read OpenAPI spec entry for this endpoint
[ ] Read request DTO + FluentValidation validator
[ ] Read response DTO
[ ] Read every consumer (BFF proxy, mobile API client, generated TS client)
[ ] Confirm: does a generated TypeScript client exist? (needs regeneration)

## EXTEND-ONLY LAWS (NON-NEGOTIABLE)
  01. NEVER remove a field from any response — all consumers depend on it
  02. NEVER rename a field — all consumers break silently
  03. NEVER change a field's type — all consumers break
  04. ALWAYS add new fields as optional with explicit, sensible default values
  05. Only version the endpoint (v2) if a breaking change is truly unavoidable
  06. Update OpenAPI spec FIRST — then implement the code change
  07. Regenerate TypeScript client after EVERY spec change: pnpm openapi:generate

## PHASE 2 — CURRENT CONTRACT (read from files — not from memory)
\`\`\`
REQUEST FIELDS   : [every field | type | required/optional]
RESPONSE FIELDS  : [every field | type | nullable]
VALIDATION RULES : [every FluentValidation rule — verbatim]
\`\`\`

## PHASE 3 — PROPOSED EXTENSION
\`\`\`
NEW REQUEST FIELDS  : [field | type | optional | validation rule]
NEW RESPONSE FIELDS : [field | type | nullable | default value]
BACKWARDS COMPAT    : [confirm each existing field is unchanged — list each]
\`\`\`

## PHASE 4 — IMPLEMENTATION ORDER (never reorder)
  01. Update OpenAPI spec — never replace, only extend
  02. pnpm openapi:generate — regenerate TypeScript client
  03. Update request DTO — add fields, never remove
  04. Update FluentValidation validator — add rules for new fields
  05. Update command/query handler to use new fields
  06. Update response DTO — add fields, never remove
  07. Update BFF proxy route if it touches this endpoint
  08. Update UI components if they consume the new fields`,
  },
  {
    num: '10',
    name: 'UX / Design',
    desc: 'UI components · design system · a11y',
    hint: 'Apply all UX laws, WCAG 2.2 AA, and spring physics to every component. No ease-in-out. No spinner-only loading.',
    tags: ["Jakob's", "Fitts's", 'WCAG 2.2 AA', 'spring', 'skeleton'],
    body: `# MODE: UX-DESIGN-SYSTEM
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## DESIGN BRIEF
COMPONENT / PAGE : [what to build or fix]
USER PERSONA     : [Owner | Manager | Resident | Public visitor | Admin]
DEVICE TARGET    : [mobile-first | desktop | both]
DESIGN SYSTEM    : [Tailwind CSS + Radix UI + Framer Motion]
PRIMARY ACTION   : [the one thing the user must do most easily]

## PHASE 1 — PRE-FLIGHT READ
[ ] Read the existing component completely if modifying
[ ] Read 2–3 adjacent components for design consistency reference
[ ] Read Tailwind config for custom tokens
[ ] Read design token file if it exists

## PHASE 2 — UX LAW AUDIT (every law, every component, every time)

Jakob's Law:
  [ ] Uses familiar patterns before inventing new ones?
  [ ] Mental model matches what this persona already knows?

Fitts's Law:
  [ ] Primary CTA in bottom 33% of screen on mobile?
  [ ] Full card / row is the tap target — not just a button inside?
  [ ] ALL interactive targets ≥ 44px × 44px?
  [ ] Highest-frequency action closest to thumb zone?

Hick's Law:
  [ ] Choices reduced to the minimum needed for the task?
  [ ] Progressive disclosure for complex or multi-step flows?

Miller's Law:
  [ ] Lists and nav items ≤ 7 (target ≤ 5)?
  [ ] Pagination, filtering, or grouping for larger sets?

Doherty Threshold:
  [ ] Every user action → visible feedback within 400ms?
  [ ] Optimistic updates on save / like / toggle / submit?
  [ ] Skeleton screens instead of spinners on data loads?
  [ ] Immediate error states — not after a timeout?

Aesthetic-Usability:
  [ ] Component is visually polished and matches design language?

Consistency:
  [ ] Identical component types look and behave identically everywhere?

## PHASE 3 — ACCESSIBILITY (WCAG 2.2 AA — non-negotiable)
  [ ] Visible <label> for every input — placeholder text alone is NOT sufficient
  [ ] aria-describedby linking error messages to their inputs
  [ ] aria-invalid="true" on every input in error state
  [ ] aria-live="polite" regions for all dynamic content updates
  [ ] Focus ring always visible — never outline:none without a visible replacement
  [ ] Tab + Enter/Space navigates all interactive elements
  [ ] Colour contrast ≥ 4.5:1 for text | ≥ 3:1 for UI component boundaries
  [ ] No information conveyed by colour alone

## MOTION SYSTEM (Framer Motion — spring physics ONLY)
  Standard : { type:"spring", stiffness:400, damping:30, mass:1 }
  Fast     : { type:"spring", stiffness:600, damping:35, mass:0.8 }
  Bounce   : { type:"spring", stiffness:300, damping:20, mass:1 }
  RULE     : Check prefers-reduced-motion in EVERY animation → fallback: duration:0

## OUTPUT CONTRACT
\`\`\`
COMPONENT  : [name]
FILE       : [path — confirmed by reading]
TYPE       : server | client
UX LAWS    : [each law — how it is concretely met]
A11Y       : [aria attributes | keyboard behaviour | contrast ratios]
MOTION     : [spring config | trigger | reduced-motion fallback]
CODE       : [complete implementation — no stubs, no TODOs]
\`\`\``,
  },
  {
    num: '11',
    name: 'DevOps / Deploy',
    desc: 'Railway · Docker · CI/CD · build failures',
    hint: 'Read config files and logs. Diagnose Railway build/runtime failures. Fix with verified commands.',
    tags: ['Railway', 'railpack', 'standalone', 'PORT', 'pnpm'],
    body: `# MODE: DEVOPS-DEPLOY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PLATFORM CONTEXT
Platform : Railway (railpack v0.22+)
Monorepo : pnpm workspaces — filter: @fbt/[service]
Services : [list the relevant Railway services for this task]
DB       : PostgreSQL (Railway managed)

## ISSUE BRIEF
SYMPTOM     : [exact error message or failure behaviour]
ENVIRONMENT : [build | runtime | both]
LOGS        : [paste complete Railway build or runtime logs — never trimmed]

## PHASE 1 — PRE-FLIGHT READ
[ ] Read railway.json or Dockerfile for the affected service
[ ] Read package.json (build, start, postbuild, prebuild scripts)
[ ] Read next.config.ts if a Next.js service is involved
[ ] Read .env.example for all required environment variables
[ ] Confirm: what PORT does this service bind to?

## RAILWAY RULES (non-negotiable)
  01. output:standalone → start: node server.js | NEVER next start (Railway crash)
  02. Monorepo standalone path is NOT predictable — add to postbuild:
        find . -name server.js -path "*standalone*"
      Read actual path from Railway build log before setting start command
  03. PORT: Railway injects process.env.PORT automatically
      Server MUST read process.env.PORT — never hardcode 3000
  04. PostgreSQL URI conversion (Railway → .NET/Npgsql):
        FROM: postgresql://user:pass@host:port/db
        TO  : Host=host;Port=port;Database=db;Username=user;Password=pass;SSL Mode=Require
  05. DataProtection: .PersistKeysToDbContext<AppDbContext>()
      Never in-memory on Railway (pod restarts lose keys → all sessions invalidated)
  06. pino transport block: MUST NOT exist in Next.js logger.ts
      (thread-stream worker crashes on Railway — remove the transport block entirely)
  07. Monorepo build: pnpm --filter @fbt/[service] build
  08. Railway inter-service: use internal DNS http://[service].railway.internal — not public URL

## KNOWN PATTERNS → FIXES
\`\`\`
SYMPTOM : "next start" crashes with output:standalone
FIX     : node .next/standalone/server.js
          OR in monorepo: node /app/.next/standalone/apps/[service]/server.js
          Run postbuild find command to get the actual path

SYMPTOM : Cannot find module '*standalone/server.js'
FIX     : Add postbuild: find . -name server.js -path "*standalone*"
          Read Railway build log output — hardcode exact path in start command

SYMPTOM : Refresh token reuse detected / sessions die on concurrent tabs
FIX     : Map<sessionId, Promise<TokenSet>> mutex in BFF refresh handler

SYMPTOM : thread-stream worker exited / MODULE_NOT_FOUND lib/worker.js
FIX     : Remove entire transport: { target: "pino-pretty", ... } block from logger.ts

SYMPTOM : DataProtection key error after Railway pod restart
FIX     : PersistKeysToDbContext<AppDbContext>() — remove in-memory storage

SYMPTOM : e_sqlite3 DllNotFoundException on macOS
FIX     : xattr -dr com.apple.quarantine ~/.nuget/packages/sqlitepclraw.lib.e_sqlite3/

SYMPTOM : ECONNREFUSED between Railway services
FIX     : Use internal Railway DNS — not public URLs — for inter-service calls
\`\`\`

## OUTPUT CONTRACT
\`\`\`
CONFIRMED ISSUE  : [one sentence — from reading logs + config]
FILE             : [config file path — confirmed by reading]
BEFORE           : [current broken configuration — verbatim]
AFTER            : [correct configuration]
ENV VARS NEEDED  : [name | purpose | example format]
VERIFY BY        : [exact command to confirm fix]
REGRESSION RISK  : [other services or configs to check]
\`\`\``,
  },
  {
    num: '12',
    name: 'Full Project Scan',
    desc: 'End-to-end architecture analysis',
    hint: 'Deepest mode. Maps architecture end-to-end across all layers, isolation audit, integration map, gap report, and decision surface.',
    tags: ['architecture', 'all layers', 'decision surface', 'isolation audit'],
    body: `# MODE: FULL-PROJECT-SCAN (READ-ONLY)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ⛔ ZERO code changes. Deepest read mode.
# Output: 6 deliverables — all required.

## SCAN SCOPE
PROJECTS : [every service to include in this scan]
FOCUS    : [auth | onboarding | isolation | payments | performance | all]
QUESTION : [the core question you need answered before implementation begins]

## PHASE 1 — DIRECTORY SCAN (before reading any file)
[ ] Scan full directory tree of each project
[ ] List every relevant file and directory
[ ] State "NOT IMPLEMENTED" for absent features — NEVER invent behaviour
[ ] State "FILE NOT FOUND — searched: [terms]" for missing files

## PHASE 2 — COMPLETE READ
Read every file relevant to the focus area.
Completely. Top to bottom. No partial reads.
No summarising while reading — produce deliverables in Phase 3 only.

## PHASE 3 — DELIVERABLES (produce all 6)

### DELIVERABLE 1: ARCHITECTURE MAP
For each feature in scope:
  - Entry point: route | component | endpoint | trigger | cron
  - Full data flow: User → UI → BFF → API → DB (every hop, file, and line that matters)
  - Auth enforcement at each layer
  - Tenant/property isolation at each layer
  - DB schema: relevant tables, columns, constraints, indexes
  - Zentra integration: claims, endpoints, scopes used

### DELIVERABLE 2: ISOLATION AUDIT
  DB layer  : tenant_id on every query? List any that are missing or partial
  API layer : IDOR check on every resource? List any gaps
  UI layer  : property filter enforced on all surfaces?
  JWT layer : which claims drive isolation decisions?
  Role matrix: what each role (Owner / Manager / Resident / Admin) can see and do — confirmed from code

### DELIVERABLE 3: INTEGRATION MAP
  - Which services call which, and with what auth method
  - Required environment variables per service (complete list)
  - Which Railway services share a DB
  - Token / claim flow: Zentra → API → BFF → UI (every step)
  - Any circular dependencies or problematic tight coupling

### DELIVERABLE 4: GAP REPORT
\`\`\`
[P0] [LAYER] [FILE:LINE] [DESCRIPTION]
     RISK: [consequence — security | data loss | crash | auth bypass]

[P1] [LAYER] [FILE:LINE] [DESCRIPTION]
     IMPACT: [what degrades]

[P2] [LAYER] [FILE:LINE] [DESCRIPTION]
     NOTE: [improvement opportunity]

SUMMARY: P0:[n]  P1:[n]  P2:[n]
\`\`\`

### DELIVERABLE 5: DECISION SURFACE
Every decision that must be resolved BEFORE implementation begins:
\`\`\`
[D1] [question that must be answered]
  Options        : [A] description | [B] description
  Recommendation : [which option and exactly why — cite code evidence]
  Impact if wrong: [consequence of wrong choice]
\`\`\`

### DELIVERABLE 6: IMPLEMENTATION READINESS
For each P0 gap:
  - Files to read before fixing: [list]
  - Change surface: small | medium | large
  - Dependencies: [what must be done first]
  - Estimated Cowork sessions: [n]`,
  },
  {
    num: '13',
    name: 'Full-Stack Bridge',
    desc: 'Frontend + Backend · any product · any task',
    hint: 'The universal mode. Maps all layer boundaries FIRST. Defines three explicit contracts before writing a single line. Builds inside-out: DB → API → BFF → UI → Mobile. Enforces type sync at every boundary. Works for any task on any FBT product.',
    tags: ['contract-first', 'all layers', 'type sync', 'inside-out', 'universal'],
    bridge: true,
    body: `# MODE: FULL-STACK-BRIDGE (see source for 1800+ lines of contract-driven full-stack workflow)`,
  },
  {
    num: '14',
    name: 'Product Genesis',
    desc: 'Bootstrap any new product from zero',
    hint: 'The only prompt that exists to build something that does not exist yet. Defines architecture, makes irreversible decisions consciously, scaffolds all foundation layers, and produces a sprint-zero execution plan.',
    tags: ['zero-to-one', 'architecture decisions', 'scaffold', 'sprint zero', 'foundation'],
    genesis: true,
    body: `# MODE: PRODUCT-GENESIS (see source for 400+ lines of product bootstrap workflow)`,
  },
];

/* ─────────────────────────────────────────────────────────────
   NEW PRODUCT FORM FIELDS
   ───────────────────────────────────────────────────────────── */

export interface NewProductField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  full?: boolean;
  tip?: string;
}

export const coworkNewProductFields: NewProductField[] = [
  {
    id: 'np_name',
    label: 'Product Name',
    type: 'text',
    required: true,
    placeholder: 'e.g. FlowTrack, PulseDesk, VaultPay',
  },
  {
    id: 'np_category',
    label: 'Product Category',
    type: 'select',
    required: true,
    options: [
      'SaaS · B2B',
      'SaaS · B2C',
      'E-commerce',
      'API / Platform',
      'Mobile App',
      'Internal Tool',
      'Marketing Site',
      'Identity / Auth Provider',
      'Data / Analytics',
      'IoT / Hardware Interface',
      'Other',
    ],
  },
  {
    id: 'np_frontend',
    label: 'Frontend Stack',
    type: 'select',
    required: true,
    options: [
      'Next.js 15 (App Router)',
      'Next.js 14 (App Router)',
      'React + Vite',
      'Expo / React Native',
      'Next.js + Expo (both)',
      'None (API only)',
      'Other',
    ],
  },
  {
    id: 'np_backend',
    label: 'Backend Stack',
    type: 'select',
    required: true,
    options: [
      '.NET 8 (Minimal API)',
      '.NET 8 (MVC)',
      'Node.js + Express',
      'Node.js + Fastify',
      'Python + FastAPI',
      'Go (Chi / Gin)',
      'None (frontend only)',
      'Other',
    ],
  },
  {
    id: 'np_db',
    label: 'Database',
    type: 'select',
    options: [
      'PostgreSQL (Railway)',
      'PostgreSQL (Supabase)',
      'MySQL',
      'MongoDB',
      'SQLite (dev only)',
      'None / External API',
      'Other',
    ],
  },
  {
    id: 'np_arch',
    label: 'Architecture Pattern',
    type: 'select',
    options: [
      'Vertical Slice Architecture',
      'Clean Architecture + CQRS + DDD',
      'Layered / N-Tier',
      'Serverless / Edge Functions',
      'Monolith (start simple)',
      'Microservices',
      'Event-Driven',
      'Next.js only (full-stack)',
    ],
  },
  {
    id: 'np_auth',
    label: 'Auth Strategy',
    type: 'select',
    options: [
      'Zentra (FBT OAuth 2.0/OIDC)',
      'NextAuth.js v5',
      'Clerk',
      'Auth0',
      'Custom JWT',
      'Magic Link / Passwordless',
      'None (public product)',
      'Other',
    ],
  },
  {
    id: 'np_hosting',
    label: 'Hosting / Infra',
    type: 'select',
    options: [
      'Railway (full)',
      'Vercel + Railway (DB)',
      'Vercel + Supabase',
      'AWS (ECS + RDS)',
      'Self-hosted VPS',
      'Cloudflare Workers + D1',
      'Undecided',
    ],
  },
  {
    id: 'np_design',
    label: 'Design System',
    type: 'select',
    options: [
      'Tailwind CSS + Radix UI + Framer Motion',
      'Tailwind CSS + shadcn/ui',
      'Tailwind CSS only',
      'MUI (Material UI)',
      'Chakra UI',
      'Custom CSS',
      'None (API only)',
    ],
  },
  {
    id: 'np_tenant',
    label: 'Multi-Tenant?',
    type: 'select',
    tip: 'affects isolation rules injected',
    options: [
      'Yes — tenant_id on every table',
      'Yes — subdomain-based isolation',
      'No — single tenant / personal',
      'Undecided',
    ],
  },
  {
    id: 'np_money',
    label: 'Monetisation Model',
    type: 'select',
    options: [
      'SaaS subscription (Razorpay)',
      'SaaS subscription (Stripe)',
      'One-time purchase',
      'E-commerce / marketplace',
      'Free / Internal tool',
      'Freemium',
      'Usage-based billing',
      'None / TBD',
    ],
  },
  {
    id: 'np_phase',
    label: 'Current Phase',
    type: 'select',
    options: [
      'Idea — nothing exists yet',
      'Scaffold — empty repo exists',
      'MVP in progress',
      'Pre-launch (feature complete)',
      'Post-launch (live users)',
    ],
  },
  {
    id: 'np_personas',
    label: 'Primary Users & Key Personas',
    type: 'text',
    full: true,
    placeholder: 'e.g. Admin (manages platform), Client (self-serves), Employee (daily ops) — mobile-first',
    tip: 'who uses this product and how',
  },
  {
    id: 'np_problem',
    label: 'Core Problem Solved',
    type: 'text',
    required: true,
    full: true,
    placeholder:
      'e.g. Service businesses lose 30% of revenue to manual scheduling and no-shows — this eliminates both',
    tip: 'one sentence — what pain does this product eliminate?',
  },
  {
    id: 'np_rules',
    label: 'Special Rules / Constraints',
    type: 'textarea',
    full: true,
    placeholder:
      'e.g. HIPAA compliance required — no PHI in logs\nWhatsApp Business API for all user notifications\nPayments: Razorpay only — no Stripe (India regulations)\nOffline-first mobile — must sync when connectivity resumes',
    tip: 'industry compliance, integrations, hard limits',
  },
];

/* ─────────────────────────────────────────────────────────────
   ENGINEERING STANDARDS & LAWS
   ───────────────────────────────────────────────────────────── */

export interface EngineeringStandard {
  code: string;
  title: string;
  principles: string[];
}

export const coworkEngineeringStandards: Record<string, EngineeringStandard> = {
  SOLID: {
    code: 'SOLID',
    title: 'SOLID Design Principles',
    principles: [
      'Single responsibility — each class/function has one reason to change',
      'Open/closed — open for extension, closed for modification',
      'Liskov substitution — subtypes must be substitutable for base types',
      'Interface segregation — many specific interfaces > one general interface',
      'Dependency inversion — depend on abstractions, not implementations',
    ],
  },
  KISS: {
    code: 'KISS',
    title: 'Keep It Simple, Stupid',
    principles: [
      'Simplest correct implementation wins',
      'If a comment is needed to explain it, simplify the code',
      'Avoid unnecessary complexity and abstraction',
    ],
  },
  DRY: {
    code: 'DRY',
    title: 'Do Not Repeat Yourself',
    principles: [
      'One source of truth per piece of logic',
      'Zero duplication of intent',
      'Extract common patterns into reusable functions/components',
    ],
  },
  YAGNI: {
    code: 'YAGNI',
    title: 'You Are Not Gonna Need It',
    principles: [
      'Build only what is needed now',
      'No speculative features',
      'No "we might need this later" code',
    ],
  },
  'SEC-FIRST': {
    code: 'SEC-FIRST',
    title: 'Security-First',
    principles: [
      'Validate all inputs server-side',
      'Never log tokens, cookies, PII, or secrets',
      'Enforce auth + authz before data access',
      'IDOR checks on every resource endpoint',
      'HttpOnly, Secure, SameSite cookies for tokens',
    ],
  },
  'TS-STRICT': {
    code: 'TS-STRICT',
    title: 'TypeScript Strict Mode',
    principles: [
      'Zero TypeScript any',
      'Every variable, prop, parameter, and return type explicit',
      'Strict null checks enforced',
      'No implicit any',
    ],
  },
  'API-LOCK': {
    code: 'API-LOCK',
    title: 'API Contracts: Extend-Only',
    principles: [
      'Add fields, NEVER rename or remove existing fields',
      'Breaking changes require new endpoint version (/v2)',
      'All new fields optional with sensible defaults',
      'Backwards compatibility maintained for all consumers',
    ],
  },
  'NO-DEAD': {
    code: 'NO-DEAD',
    title: 'No Dead Code',
    principles: [
      'Remove all unreachable branches',
      'Remove all unused imports',
      'Remove all commented-out code',
      'Clean slate before shipping',
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   UX LAWS & IMPLEMENTATION
   ───────────────────────────────────────────────────────────── */

export interface UxLaw {
  name: string;
  shortName: string;
  description: string;
  implementation: string[];
}

export const coworkUxLaws: UxLaw[] = [
  {
    name: "Jakob's Law",
    shortName: 'Jakob',
    description: 'Match existing mental models. New patterns only when strictly necessary.',
    implementation: [
      'Use familiar UI patterns before inventing new ones',
      'Mental model must match what this persona already knows',
      'Validate new patterns against user expectations',
    ],
  },
  {
    name: "Fitts's Law",
    shortName: 'Fitts',
    description: 'Minimize distance and size of target areas.',
    implementation: [
      'Primary CTAs in bottom 33% of screen on mobile',
      'Full card or row = tap target (not just button inside)',
      'ALL interactive targets ≥ 44px × 44px minimum',
      'Highest-frequency action closest to thumb zone',
    ],
  },
  {
    name: "Hick's Law",
    shortName: 'Hick',
    description: 'Minimize choices to reduce decision time.',
    implementation: [
      'Reduce choices to minimum needed for task',
      'Use progressive disclosure for complex or multi-step flows',
      'Hide advanced options until needed',
    ],
  },
  {
    name: "Miller's Law",
    shortName: 'Miller',
    description: 'Limit information chunks to 7±2 items.',
    implementation: [
      'Lists and nav items ≤ 7 (target ≤ 5)',
      'Pagination or filtering for larger sets',
      'Group related items into categories',
    ],
  },
  {
    name: 'Doherty Threshold',
    shortName: 'Doherty',
    description: 'Users stay engaged when feedback appears within 400ms.',
    implementation: [
      'Every user action → visible feedback within 400ms',
      'Optimistic updates on save, like, toggle, submit',
      'Skeleton screens instead of spinners on data loads',
      'Immediate error states (not after timeout)',
    ],
  },
  {
    name: 'Aesthetic-Usability Effect',
    shortName: 'Aesthetic',
    description: 'Polished UI is perceived as more trustworthy and functional.',
    implementation: [
      'Component is visually polished',
      'Matches design language consistently',
      'Attention to spacing, typography, and color',
    ],
  },
  {
    name: 'Consistency',
    shortName: 'Consistency',
    description: 'Identical element types look and behave identically everywhere.',
    implementation: [
      'Buttons look the same across all surfaces',
      'Forms behave identically in all contexts',
      'Error messages follow same pattern everywhere',
      'Loading states consistent across pages',
    ],
  },
  {
    name: 'Accessibility (WCAG 2.2 AA)',
    shortName: 'A11Y',
    description: 'Mandatory accessibility standards — non-negotiable.',
    implementation: [
      'Visible <label> for every input (placeholder ≠ label)',
      'aria-describedby linking errors to inputs',
      'aria-invalid="true" on inputs in error state',
      'aria-live="polite" regions for dynamic content',
      'Focus ring always visible (never outline:none)',
      'Tab + Enter/Space navigate all interactive elements',
      'Color contrast ≥ 4.5:1 text | ≥ 3:1 UI boundaries',
      'No information conveyed by color alone',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   PERFORMANCE BUDGETS
   ───────────────────────────────────────────────────────────── */

export interface PerformanceBudget {
  metric: string;
  abbreviation: string;
  budget: string;
  description: string;
  layer: 'frontend' | 'backend' | 'database';
}

export const coworkPerformanceBudgets: PerformanceBudget[] = [
  {
    metric: 'First Contentful Paint',
    abbreviation: 'FCP',
    budget: '< 1.5s',
    description: 'Time until first meaningful content paints',
    layer: 'frontend',
  },
  {
    metric: 'Largest Contentful Paint',
    abbreviation: 'LCP',
    budget: '< 2.5s',
    description: 'Time until largest content element renders',
    layer: 'frontend',
  },
  {
    metric: 'Cumulative Layout Shift',
    abbreviation: 'CLS',
    budget: '= 0',
    description: 'Zero unexpected layout shifts (must be perfect)',
    layer: 'frontend',
  },
  {
    metric: 'Interaction to Next Paint',
    abbreviation: 'INP',
    budget: '< 200ms',
    description: 'Delay from interaction to next visual feedback',
    layer: 'frontend',
  },
  {
    metric: 'Server Response Time (P95)',
    abbreviation: 'Server P95',
    budget: '< 200ms',
    description: '95th percentile of server response times',
    layer: 'backend',
  },
  {
    metric: 'Database Query (P95)',
    abbreviation: 'DB Query P95',
    budget: '< 50ms',
    description: '95th percentile of database query execution time',
    layer: 'database',
  },
];

/* ─────────────────────────────────────────────────────────────
   MOTION SYSTEM: FRAMER MOTION PHYSICS
   ───────────────────────────────────────────────────────────── */

export interface SpringConfig {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass: number;
}

export interface MotionPreset {
  name: string;
  config: SpringConfig;
  useCase: string;
}

export const coworkMotionSystem = {
  rule: 'Framer Motion — spring physics ONLY — never ease-in-out. Every animation must check prefers-reduced-motion.',
  presets: [
    {
      name: 'Standard',
      config: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 1,
      } as SpringConfig,
      useCase: 'Default for most animations (buttons, modals, transitions)',
    },
    {
      name: 'Fast',
      config: {
        type: 'spring',
        stiffness: 600,
        damping: 35,
        mass: 0.8,
      } as SpringConfig,
      useCase: 'Quick feedback animations (toggles, hover states)',
    },
    {
      name: 'Bounce',
      config: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 1,
      } as SpringConfig,
      useCase: 'Playful entrance animations (list items, celebrations)',
    },
  ],
  reducedMotionFallback: {
    duration: 0,
    description: 'Users with prefers-reduced-motion: all animations instant',
  },
};

/* ─────────────────────────────────────────────────────────────
   PROMPT GENERATOR
   ───────────────────────────────────────────────────────────── */

export interface GeneratedCoworkPrompt {
  product: string;
  mode: string;
  modeBody: string;
  context: string;
  standards: string;
  uxLaws: string;
  performanceBudgets: string;
  fullPrompt: string;
}

export interface CoworkGenerateInput {
  productId: string;
  modeNum: string;
  context: string;
}

/** Returns the resolved product + mode if both exist. */
export function resolveCoworkSelection(input: CoworkGenerateInput): {
  product: CoworkProduct | null;
  mode: CoworkMode | null;
} {
  return {
    product: coworkProducts.find((p) => p.id === input.productId) ?? null,
    mode: coworkModes.find((m) => m.num === input.modeNum) ?? null,
  };
}

/**
 * Pure prompt builder for the Cowork Command Center. Returns null if the
 * product or mode cannot be resolved — caller should gate the UI on that.
 */
export function generateCoworkPrompt(
  input: CoworkGenerateInput
): GeneratedCoworkPrompt | null {
  const { product, mode } = resolveCoworkSelection(input);
  if (!product || !mode) return null;

  const standards = Object.values(coworkEngineeringStandards)
    .map(
      (s) =>
        `${s.code}: ${s.title}\n${s.principles.map((p) => `  • ${p}`).join('\n')}`
    )
    .join('\n\n');

  const uxLaws = coworkUxLaws
    .map(
      (law) =>
        `${law.shortName}: ${law.description}\n${law.implementation
          .map((impl) => `  • ${impl}`)
          .join('\n')}`
    )
    .join('\n\n');

  const performanceBudgets = coworkPerformanceBudgets
    .map((b) => `${b.abbreviation} (${b.layer}): ${b.budget} — ${b.description}`)
    .join('\n');

  const fullPrompt = `# FBT COWORK COMMAND CENTER

## SELECTED PRODUCT
${product.name}
Type: ${product.type}
Stack: ${product.stack}

## SELECTED MODE
Mode ${mode.num}: ${mode.name}
Description: ${mode.desc}

## TASK CONTEXT
${input.context || '[No additional context provided]'}

---

## MODE INSTRUCTIONS
${mode.body}

---

## ENGINEERING STANDARDS
${standards}

---

## UX LAWS & IMPLEMENTATION
${uxLaws}

---

## PERFORMANCE BUDGETS (Non-Negotiable)
${performanceBudgets}

---

## PRODUCT ARCHITECTURE REFERENCE
Architecture: ${product.arch}
Auth: ${product.auth}
Database: ${product.db}
Design System: ${product.design}

### Critical Rules for ${product.name}:
${product.rules.map((rule) => `• ${rule}`).join('\n')}

---

END OF PROMPT`;

  return {
    product: product.name,
    mode: `${mode.num}: ${mode.name}`,
    modeBody: mode.body,
    context: input.context,
    standards,
    uxLaws,
    performanceBudgets,
    fullPrompt,
  };
}

/* ─────────────────────────────────────────────────────────────
   EXPORT SUMMARY
   ───────────────────────────────────────────────────────────── */

export const coworkConfig = {
  version: 'v2.2',
  products: coworkProducts,
  modes: coworkModes,
  productFields: coworkNewProductFields,
  standards: coworkEngineeringStandards,
  uxLaws: coworkUxLaws,
  performanceBudgets: coworkPerformanceBudgets,
  motionSystem: coworkMotionSystem,
};
