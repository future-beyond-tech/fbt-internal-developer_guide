/**
 * FBT Next.js UX-First Prompt Generator
 * Complete data extraction of the interactive tool
 * Generated from: fbt-nextjs-ux-prompt-generator.html
 */

// ═══ FORM SECTIONS ═══
export type FormSection = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description?: string;
};

export const uxPromptFormSections: FormSection[] = [
  {
    id: 'project',
    number: 1,
    title: 'Project Identity',
    subtitle: 'what & who',
    description: 'Define your project name, slug, description, target users, and core problem solved'
  },
  {
    id: 'stack',
    number: 2,
    title: 'Tech Stack',
    subtitle: 'front · back · infra',
    description: 'Specify frontend, backend, database, auth, infrastructure, and testing stack'
  },
  {
    id: 'goals',
    number: 3,
    title: 'Project Goals',
    subtitle: 'outcomes · success metrics',
    description: 'Select goals that apply and define success metrics'
  },
  {
    id: 'ux-laws',
    number: 4,
    title: 'UX Laws & Principles',
    subtitle: 'select all that apply',
    description: 'Each selected law gets encoded into the generated prompt as an explicit implementation directive'
  },
  {
    id: 'ux-features',
    number: 5,
    title: 'UX Features & Interaction Patterns',
    subtitle: 'engagement · delight · usability',
    description: 'Configure navigation patterns, feedback states, engagement features, forms, and accessibility'
  },
  {
    id: 'prompt-gen',
    number: 6,
    title: 'Prompt Generation Config',
    subtitle: 'how cowork should respond',
    description: 'Configure how Cowork should structure output and approach the work'
  },
  {
    id: 'constraints',
    number: 7,
    title: 'Constraints & Anti-Patterns',
    subtitle: 'boundaries · avoid list',
    description: 'Define team size, budget constraints, and what to avoid'
  }
];

// ═══ UX LAWS (20 total) ═══
export type UxLaw = {
  id: string;
  name: string;
  category: string;
  categoryGroup: 'perception' | 'attention' | 'design' | 'accessibility';
  description: string;
  implementation: string;
  selected?: boolean;
};

export const uxPromptUxLaws: UxLaw[] = [
  // PERCEPTION & COGNITION
  {
    id: 'fitts',
    name: "Fitts's Law",
    category: 'Interaction · Targeting',
    categoryGroup: 'perception',
    description: "Time to reach a target is a function of its size and distance. Larger, closer targets are faster to click.",
    implementation: "Primary CTAs min 44×44px. Sticky actions at thumb reach on mobile. Destructive actions small and distant.",
    selected: true
  },
  {
    id: 'hick',
    name: "Hick's Law",
    category: 'Decision Making',
    categoryGroup: 'perception',
    description: 'Decision time increases logarithmically with the number of choices. Fewer options = faster decisions.',
    implementation: 'Max 5–7 nav items. Progressive disclosure for advanced options. Wizard patterns for complex flows.',
    selected: true
  },
  {
    id: 'miller',
    name: "Miller's Law",
    category: 'Working Memory',
    categoryGroup: 'perception',
    description: 'The average person can hold 7 ± 2 items in working memory at once.',
    implementation: 'Chunk related items into groups of 5–9. Break long forms into steps. Group settings into categories.',
    selected: true
  },
  {
    id: 'jakob',
    name: "Jakob's Law",
    category: 'Familiarity',
    categoryGroup: 'perception',
    description: 'Users spend most of their time on other sites. They prefer your site to work like sites they already know.',
    implementation: 'Use familiar UI patterns (header nav, modal overlays, breadcrumbs). Innovate on content, not convention.',
    selected: false
  },
  {
    id: 'gestalt',
    name: 'Gestalt Principles',
    category: 'Visual Perception',
    categoryGroup: 'perception',
    description: 'Proximity, similarity, continuity, closure, and figure-ground. The brain groups visual elements into wholes.',
    implementation: 'Use spacing to group related items (proximity). Consistent size/colour for similar elements. White space as structure.',
    selected: true
  },
  {
    id: 'serial',
    name: 'Serial Position Effect',
    category: 'Memory · Attention',
    categoryGroup: 'perception',
    description: 'Users best remember first and last items in a list. Middle items are recalled least (primacy + recency effects).',
    implementation: 'Place most important nav items first and last. Key CTAs at bottom of sections. Summary at end of forms.',
    selected: false
  },
  // ATTENTION & ENGAGEMENT
  {
    id: 'zeigarnik',
    name: 'Zeigarnik Effect',
    category: 'Incomplete Tasks',
    categoryGroup: 'attention',
    description: 'People remember uncompleted tasks better than completed ones. Partial progress creates cognitive tension that drives action.',
    implementation: "Progress bars, onboarding checklists, profile completion %. Show \"85% complete\" to pull users back.",
    selected: true
  },
  {
    id: 'vonRestorff',
    name: 'Von Restorff Effect',
    category: 'Isolation Effect',
    categoryGroup: 'attention',
    description: 'An item that stands out from its peers is more likely to be remembered. Distinctiveness creates attention.',
    implementation: 'Highlight recommended plan with accent border. Primary CTA uses brand colour. Badge new features distinctly.',
    selected: true
  },
  {
    id: 'peak-end',
    name: 'Peak-End Rule',
    category: 'Experience Memory',
    categoryGroup: 'attention',
    description: 'People judge an experience by its most intense moment (peak) and how it ends — not the average.',
    implementation: 'Design delightful success states. Celebrate form completions. Make onboarding\'s last step feel like an achievement.',
    selected: false
  },
  {
    id: 'doherty',
    name: 'Doherty Threshold',
    category: 'Response Time',
    categoryGroup: 'attention',
    description: 'Productivity soars when a computer and user interact at a pace ≤400ms per interaction. Delays destroy engagement.',
    implementation: 'Optimistic UI updates. Skeleton loading states. Target <100ms perceived response for all interactions.',
    selected: true
  },
  {
    id: 'fogg',
    name: 'Fogg Behaviour Model',
    category: 'Motivation + Ability',
    categoryGroup: 'attention',
    description: 'Behaviour = Motivation × Ability × Prompt. All three must align for a behaviour to occur.',
    implementation: 'Reduce ability barriers (1-click signup, autocomplete). Time prompts correctly. Surface them when motivation is highest.',
    selected: false
  },
  {
    id: 'cialdini',
    name: "Cialdini's Principles",
    category: 'Persuasion',
    categoryGroup: 'attention',
    description: 'Social proof, scarcity, authority, reciprocity, commitment, and liking — the 6 principles of influence.',
    implementation: 'Show user counts, testimonials, activity feeds. Countdown for limited offers. Authority badges and certs.',
    selected: false
  },
  // DESIGN PRINCIPLES
  {
    id: 'progressive',
    name: 'Progressive Disclosure',
    category: 'Complexity Management',
    categoryGroup: 'design',
    description: 'Show only the information and controls needed at each step. Reveal complexity progressively as the user advances.',
    implementation: 'Wizard flows for complex tasks. "Advanced settings" accordions. Show more / expand patterns.',
    selected: true
  },
  {
    id: 'recognition',
    name: 'Recognition over Recall',
    category: 'Cognitive Load',
    categoryGroup: 'design',
    description: 'Minimise memory load by making objects, actions, and options visible. Recognition is far easier than recall.',
    implementation: 'Auto-complete, recently used items, visible shortcuts, descriptive labels. Never require memorised commands.',
    selected: true
  },
  {
    id: 'tesler',
    name: "Tesler's Law",
    category: 'Complexity Conservation',
    categoryGroup: 'design',
    description: 'Every system has a certain amount of irreducible complexity. The only question is who handles it — user or designer.',
    implementation: 'Smart defaults. Auto-save. Backend handles complexity so UI stays simple. "Just works" philosophy.',
    selected: false
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic-Usability Effect',
    category: 'Perceived Quality',
    categoryGroup: 'design',
    description: 'Users perceive aesthetically pleasing designs as more usable. Beautiful UI is perceived as better-functioning UI.',
    implementation: 'Invest in typography, spacing, and motion. Polish empty states. Consistent visual language throughout.',
    selected: false
  },
  {
    id: 'error-prevention',
    name: 'Error Prevention',
    category: 'Nielsen Heuristic',
    categoryGroup: 'design',
    description: 'Prevent problems from occurring in the first place. Confirmations, constraints, and good defaults eliminate errors.',
    implementation: 'Inline validation before submit. Confirm destructive actions. Disable invalid states. Undo over delete.',
    selected: false
  },
  {
    id: 'consistency',
    name: 'Consistency & Standards',
    category: 'Nielsen Heuristic',
    categoryGroup: 'design',
    description: "Users shouldn't have to wonder whether different words, situations, or actions mean the same thing.",
    implementation: 'Design tokens for all visual values. Shared component library. Consistent terminology across all copy.',
    selected: true
  },
  // ACCESSIBILITY
  {
    id: 'wcag',
    name: 'WCAG 2.2 AA',
    category: 'Accessibility Standard',
    categoryGroup: 'accessibility',
    description: 'Web Content Accessibility Guidelines — the legal and ethical baseline for inclusive digital experiences.',
    implementation: '4.5:1 contrast ratio, keyboard navigable, ARIA labels, focus visible, no seizure-trigger content.',
    selected: true
  },
  {
    id: 'inclusive',
    name: 'Inclusive Design',
    category: 'Microsoft Principles',
    categoryGroup: 'accessibility',
    description: 'Design for the extremes and it will work for the mainstream. Solve for one, extend to many.',
    implementation: 'Captions for video, large-text mode, high-contrast theme, touch targets 44px+, reduced-motion support.',
    selected: true
  }
];

// ═══ PRODUCT GOALS (9 total) ═══
export type ProductGoal = {
  id: string;
  key: string;
  emoji: string;
  name: string;
  description: string;
  directive: string;
  selected?: boolean;
};

export const uxPromptProductGoals: ProductGoal[] = [
  {
    id: 'goal-conversion',
    key: 'conversion',
    emoji: '📈',
    name: 'Maximise Conversion',
    description: 'Funnel-optimised UI, CTA hierarchy, A/B test hooks',
    directive: 'CONVERSION: Implement single primary CTA per screen. Funnel drop-off tracking hooks (events). Reduce form fields to minimum viable. Button hierarchy: primary → secondary → tertiary.',
    selected: true
  },
  {
    id: 'goal-retention',
    key: 'retention',
    emoji: '🔄',
    name: 'Drive Retention',
    description: 'Engagement loops, progress indicators, streak patterns',
    directive: 'RETENTION: Zeigarnik-based progress indicators. Streak / activity tracking schema. Re-engagement empty states with next action CTA. Email notification infrastructure.',
    selected: true
  },
  {
    id: 'goal-speed',
    key: 'speed',
    emoji: '⚡',
    name: 'Delivery Speed',
    description: 'Ship fast — MVP-first, feature-flag everything',
    directive: 'DELIVERY SPEED: Feature-flag all new features from day one. Trunk-based development. No over-engineering — YAGNI enforced. Ship incrementally per milestone.',
    selected: true
  },
  {
    id: 'goal-scale',
    key: 'scale',
    emoji: '🏗️',
    name: 'Scale Ready',
    description: 'Architecture for 100k+ users from day one',
    directive: 'SCALE READY: Stateless services from day one. Horizontal scaling in mind (no server-side session, no local file storage). Read replicas considered in DB schema design.',
    selected: false
  },
  {
    id: 'goal-accessibility',
    key: 'accessibility',
    emoji: '♿',
    name: 'Inclusive Access',
    description: 'WCAG 2.2 AA, keyboard nav, screen reader support',
    directive: 'ACCESSIBILITY: WCAG 2.2 AA minimum. axe-core in Storybook a11y addon + Playwright tests. Keyboard navigation on all interactive elements. aria-live for dynamic content.',
    selected: true
  },
  {
    id: 'goal-mobile',
    key: 'mobile',
    emoji: '📱',
    name: 'Mobile-First',
    description: 'Progressive enhancement, touch-optimised patterns',
    directive: 'MOBILE-FIRST: All breakpoints from 320px up. Touch targets min 44×44px. Bottom navigation for mobile. Viewport meta correct. Test on real device viewport profiles.',
    selected: false
  },
  {
    id: 'goal-i18n',
    key: 'i18n',
    emoji: '🌐',
    name: 'Internationalisation',
    description: 'Multi-language support, RTL-ready, next-intl',
    directive: 'I18N: next-intl for all text strings from day one. No hardcoded copy in JSX. Messages in /messages/{locale}.json. RTL layout supported via CSS logical properties.',
    selected: false
  },
  {
    id: 'goal-analytics',
    key: 'analytics',
    emoji: '📊',
    name: 'Analytics-Driven',
    description: 'Event tracking from day one, Mixpanel/PostHog hooks',
    directive: 'ANALYTICS: PostHog or Mixpanel events on all key interactions. Event naming convention: [noun]_[verb] (e.g. user_signed_up). Dashboard events from day one.',
    selected: false
  },
  {
    id: 'goal-delight',
    key: 'delight',
    emoji: '✨',
    name: 'Delight & Polish',
    description: 'Micro-animations, transitions, premium feel',
    directive: 'DELIGHT: Framer Motion for page/list transitions. Micro-animations on hover/active states. Success states are celebrated. Empty states are illustrated, not just text.',
    selected: true
  }
];

// ═══ FORM FIELDS ═══
export type FormField = {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'toggle' | 'slider';
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
  section: string;
};

export const uxPromptFormFields: FormField[] = [
  // Section 1: Project Identity
  {
    id: 'f-name',
    label: 'Project Name',
    type: 'text',
    placeholder: 'e.g. RentFlow, CatchMoment, NeatStore',
    section: 'project'
  },
  {
    id: 'f-slug',
    label: 'Codename / Slug',
    type: 'text',
    placeholder: 'e.g. rentflow',
    section: 'project'
  },
  {
    id: 'f-desc',
    label: 'Product Description — One Sentence',
    type: 'text',
    placeholder: 'e.g. AI-powered event video capture and highlight generation platform for event organisers',
    section: 'project'
  },
  {
    id: 'f-user',
    label: 'Primary Users / Persona',
    type: 'text',
    placeholder: 'e.g. Property managers, Residents, Admins',
    section: 'project'
  },
  {
    id: 'f-problem',
    label: 'Core Problem Solved',
    type: 'text',
    placeholder: 'e.g. Manual video editing takes hours post-event',
    section: 'project'
  },
  {
    id: 'f-model',
    label: 'Business Model',
    type: 'select',
    options: [
      'SaaS — Subscription',
      'SaaS — Usage-Based',
      'E-Commerce',
      'Marketplace',
      'Internal Tool',
      'B2B Platform',
      'Consumer App',
      'Enterprise + Custom'
    ],
    section: 'project'
  },
  {
    id: 'f-market',
    label: 'Target Market',
    type: 'select',
    options: [
      'India — Tier 1 Cities',
      'India — Nationwide',
      'Global (EN)',
      'South-East Asia',
      'Enterprise Global',
      'Local / Regional'
    ],
    section: 'project'
  },
  // Section 2: Tech Stack
  {
    id: 'f-fe',
    label: 'Frontend Framework',
    type: 'text',
    placeholder: 'e.g. Next.js 15 App Router, TypeScript, Tailwind v4',
    defaultValue: 'Next.js 15, TypeScript strict, Tailwind v4, shadcn/ui',
    section: 'stack'
  },
  {
    id: 'f-be',
    label: 'Backend',
    type: 'text',
    placeholder: 'e.g. .NET 8 Clean Architecture, EF Core, PostgreSQL',
    section: 'stack'
  },
  {
    id: 'f-db',
    label: 'Database',
    type: 'text',
    placeholder: 'e.g. PostgreSQL + Redis',
    section: 'stack'
  },
  {
    id: 'f-auth',
    label: 'Auth / Identity',
    type: 'text',
    placeholder: 'e.g. Zentra OAuth 2.0, Auth.js v5, Clerk',
    section: 'stack'
  },
  {
    id: 'f-infra',
    label: 'Infrastructure / Deployment',
    type: 'text',
    placeholder: 'e.g. Railway, Vercel, AWS S3 Mumbai, BunnyCDN',
    section: 'stack'
  },
  {
    id: 'f-state',
    label: 'State Management',
    type: 'text',
    placeholder: 'e.g. Zustand, React Query v5, Context API',
    defaultValue: 'Zustand + React Query v5',
    section: 'stack'
  },
  {
    id: 'f-test',
    label: 'Testing Stack',
    type: 'text',
    placeholder: 'e.g. Vitest, Playwright, Storybook',
    defaultValue: 'Vitest + Playwright + Storybook 8',
    section: 'stack'
  },
  {
    id: 'f-integrations',
    label: 'Key Integrations',
    type: 'text',
    placeholder: 'e.g. Razorpay, SendGrid, Temporal Cloud, Modal',
    section: 'stack'
  },
  // Section 3: Project Goals
  {
    id: 'f-metric',
    label: 'Primary Success Metric',
    type: 'text',
    placeholder: 'e.g. User activation rate > 60% within 7 days',
    section: 'goals'
  },
  {
    id: 'f-timeline',
    label: 'MVP Timeline',
    type: 'text',
    placeholder: 'e.g. Phase 1: 6 weeks, MVP: 12 weeks',
    section: 'goals'
  },
  // Section 6: Prompt Generation
  {
    id: 'f-phase',
    label: 'Phase / Sprint Number',
    type: 'select',
    options: [
      'kickoff',
      'phase-1',
      'phase-2',
      'phase-3',
      'feature',
      'bugfix',
      'refactor'
    ],
    defaultValue: 'kickoff',
    section: 'prompt-gen'
  },
  {
    id: 'f-autonomy',
    label: 'Cowork Autonomy Level',
    type: 'select',
    options: [
      'full',
      'guided',
      'stepwise',
      'review'
    ],
    defaultValue: 'full',
    section: 'prompt-gen'
  },
  {
    id: 'f-feature',
    label: 'Specific Feature to Build (optional)',
    type: 'textarea',
    placeholder: 'e.g. Build the complete tenant onboarding flow: property selection → room booking → document upload → payment → confirmation email. Include server actions, validation, and optimistic UI.',
    section: 'prompt-gen'
  },
  {
    id: 'f-context',
    label: 'Existing Code Context (for continuation prompts)',
    type: 'textarea',
    placeholder: 'e.g. Auth is implemented via Zentra. User model has: id, email, tenantId, role. /app/(dashboard) is the main app shell. Currently on Phase 2...',
    section: 'prompt-gen'
  },
  // Section 7: Constraints
  {
    id: 'f-team',
    label: 'Team Size',
    type: 'select',
    options: [
      'Solo (Cowork as full team)',
      '2 devs + Cowork',
      'Small team (3–5) + Cowork',
      'Dedicated frontend + Cowork backend',
      'Enterprise team'
    ],
    section: 'constraints'
  },
  {
    id: 'f-budget',
    label: 'Budget / Resource Constraint',
    type: 'select',
    options: [
      'Bootstrap — minimise paid services',
      'Early stage — Railway + Vercel free tier',
      'Growth — moderate cloud spend OK',
      'Scale — cost not primary constraint'
    ],
    section: 'constraints'
  },
  {
    id: 'f-avoid',
    label: 'What to Avoid / Anti-Patterns',
    type: 'textarea',
    placeholder: 'e.g.\n- No serverless functions (use containers on Railway)\n- No vendor lock-in on payment provider\n- No complex micro-frontend setup\n- Must not require paid Vercel tier',
    section: 'constraints'
  },
  {
    id: 'f-extra',
    label: 'Additional Context / Special Instructions',
    type: 'textarea',
    placeholder: 'e.g. This project is part of the FBT / FIROSE Group ecosystem. It must use Zentra for auth. All colour tokens must follow the FBT design system (#512BD4 primary).',
    section: 'constraints'
  }
];

// ═══ UX FEATURES - TOGGLES ═══
export type ToggleGroup = {
  id: string;
  label: string;
  section: string;
  items: ToggleItem[];
};

export type ToggleItem = {
  dataKey: string;
  label: string;
  defaultOn: boolean;
};

export const uxPromptNavigationPatterns: ToggleItem[] = [
  { dataKey: 'breadcrumbs', label: 'Breadcrumbs', defaultOn: true },
  { dataKey: 'sticky-nav', label: 'Sticky Header', defaultOn: true },
  { dataKey: 'sidebar-nav', label: 'Sidebar Navigation', defaultOn: false },
  { dataKey: 'bottom-nav', label: 'Mobile Bottom Nav', defaultOn: true },
  { dataKey: 'command-palette', label: 'Command Palette (⌘K)', defaultOn: false },
  { dataKey: 'search', label: 'Global Search', defaultOn: true },
  { dataKey: 'tabs', label: 'Tab Navigation', defaultOn: false }
];

export const uxPromptFeedbackPatterns: ToggleItem[] = [
  { dataKey: 'skeleton', label: 'Skeleton Loaders', defaultOn: true },
  { dataKey: 'optimistic', label: 'Optimistic Updates', defaultOn: true },
  { dataKey: 'toasts', label: 'Toast Notifications', defaultOn: true },
  { dataKey: 'progress', label: 'Progress Indicators', defaultOn: true },
  { dataKey: 'inline-error', label: 'Inline Validation', defaultOn: false },
  { dataKey: 'empty-states', label: 'Empty States (illustrated)', defaultOn: true },
  { dataKey: 'error-boundary', label: 'Error Boundaries + Retry', defaultOn: true }
];

export const uxPromptEngagementPatterns: ToggleItem[] = [
  { dataKey: 'confetti', label: 'Confetti on success', defaultOn: false },
  { dataKey: 'animations', label: 'Micro-animations (Framer)', defaultOn: true },
  { dataKey: 'onboarding', label: 'Onboarding Checklist', defaultOn: true },
  { dataKey: 'gamification', label: 'Progress / Streak badges', defaultOn: false },
  { dataKey: 'dark-mode', label: 'Dark / Light Mode Toggle', defaultOn: true },
  { dataKey: 'kbd-shortcuts', label: 'Keyboard Shortcuts', defaultOn: true },
  { dataKey: 'personalisation', label: 'Personalised Dashboard', defaultOn: false },
  { dataKey: 'first-use', label: 'First-Use Tours (Shepherd.js)', defaultOn: false }
];

export const uxPromptFormPatterns: ToggleItem[] = [
  { dataKey: 'rhf-zod', label: 'RHF + Zod Validation', defaultOn: true },
  { dataKey: 'autosave', label: 'Auto-save Drafts', defaultOn: true },
  { dataKey: 'multi-step', label: 'Multi-Step Wizards', defaultOn: true },
  { dataKey: 'file-upload', label: 'Drag-and-Drop File Upload', defaultOn: false },
  { dataKey: 'rich-text', label: 'Rich Text Editor', defaultOn: false },
  { dataKey: 'search-filter', label: 'Advanced Filter / Sort', defaultOn: true }
];

export const uxPromptA11yPatterns: ToggleItem[] = [
  { dataKey: 'skip-links', label: 'Skip Navigation Links', defaultOn: true },
  { dataKey: 'focus-rings', label: 'Visible Focus Rings', defaultOn: true },
  { dataKey: 'aria-live', label: 'Aria-live Announcements', defaultOn: true },
  { dataKey: 'reduced-motion', label: 'prefers-reduced-motion', defaultOn: true },
  { dataKey: 'high-contrast', label: 'High Contrast Mode', defaultOn: false },
  { dataKey: 'font-scale', label: 'Relative Font Scaling', defaultOn: true }
];

export const uxPromptScaffoldItems: ToggleItem[] = [
  { dataKey: 'docker', label: 'Docker Compose', defaultOn: true },
  { dataKey: 'ci', label: 'GitHub Actions CI', defaultOn: true },
  { dataKey: 'eslint', label: 'ESLint + Prettier', defaultOn: true },
  { dataKey: 'env', label: '.env.example', defaultOn: true },
  { dataKey: 'makefile', label: 'Makefile', defaultOn: true },
  { dataKey: 'readme', label: 'README skeleton', defaultOn: true },
  { dataKey: 'storybook', label: 'Storybook', defaultOn: false },
  { dataKey: 'health', label: 'Health endpoints', defaultOn: true },
  { dataKey: 'openapi', label: 'OpenAPI spec', defaultOn: false },
  { dataKey: 'sentry', label: 'Sentry', defaultOn: false },
  { dataKey: 'husky', label: 'Husky + lint-staged', defaultOn: true },
  { dataKey: 'chromatic', label: 'Chromatic', defaultOn: false }
];

// ═══ SCAFFOLD DETAILS ═══
export type ScaffoldDetail = {
  key: string;
  directive: string;
};

export const uxPromptScaffoldMap: Record<string, string> = {
  docker:
    'Docker Compose: hot-reload for all services, separate dev/test networks',
  ci:
    'GitHub Actions: lint+type-check+test on PR, deploy-preview on PR, production deploy on main merge',
  eslint:
    'ESLint (flat config, @typescript-eslint, next/core-web-vitals, jsx-a11y) + Prettier 3 + tailwindcss sort',
  env:
    '.env.example: all required vars documented with type hints and required/optional markers',
  makefile:
    'Makefile: make dev, make build, make test, make lint, make migrate, make seed, make clean',
  readme:
    'README.md: overview, architecture diagram placeholder, local setup in ≤5 commands, env vars table',
  storybook: 'Storybook 8: stories for all /components/ui/* components, a11y addon enabled',
  health:
    '/health (liveness) and /ready (dependency check) endpoints on all services, no auth required',
  openapi:
    'openapi.json v3.1 scaffolded and kept in sync with all route handlers',
  sentry:
    'Sentry SDK: error + performance monitoring, source maps in CI, alert thresholds configured',
  husky: 'Husky pre-commit: lint-staged (ESLint + Prettier on staged files), type-check on pre-push',
  chromatic:
    'Chromatic visual regression in CI: screenshot diff on every PR affecting components'
};

// ═══ OUTPUT FLAGS ═══
export type OutputFlag = {
  dataKey: string;
  label: string;
  defaultOn: boolean;
};

export const uxPromptOutputFlags: OutputFlag[] = [
  { dataKey: 'tree', label: 'Folder tree', defaultOn: true },
  { dataKey: 'files', label: 'All files complete', defaultOn: true },
  { dataKey: 'decisions', label: 'Decision rationale', defaultOn: true },
  { dataKey: 'setup', label: 'Setup commands', defaultOn: true },
  { dataKey: 'diagrams', label: 'ASCII diagrams', defaultOn: false },
  { dataKey: 'tests', label: 'Test stubs', defaultOn: false },
  { dataKey: 'scope', label: 'Scope boundary note', defaultOn: true },
  { dataKey: 'storybook-stories', label: 'Storybook stories', defaultOn: false }
];

// ═══ QUALITY / PRIORITY FILTERS ═══
export type PriorityFilter = {
  key: string;
  label: string;
  color: string;
  defaultOn: boolean;
};

export const uxPromptPriorityFilters: PriorityFilter[] = [
  { key: 'perf', label: 'Performance', color: '#FFB020', defaultOn: true },
  { key: 'a11y', label: 'Accessibility', color: '#22C55E', defaultOn: true },
  { key: 'security', label: 'Security', color: '#F43F5E', defaultOn: true },
  { key: 'delightful', label: 'Delight', color: '#A78BFA', defaultOn: false }
];

// ═══ PHASE & AUTONOMY MAPS ═══
export const uxPromptPhaseMap: Record<string, string> = {
  kickoff: 'KICKOFF — Full project scaffold from zero',
  'phase-1': 'PHASE 1 — Core foundation build',
  'phase-2': 'PHASE 2 — Feature implementation sprint',
  'phase-3': 'PHASE 3 — Polish, QA, and hardening',
  feature: 'FEATURE SPRINT — Single feature deep-build',
  bugfix: 'BUG FIX + HARDENING sprint',
  refactor: 'REFACTOR / UPGRADE sprint'
};

export const uxPromptAutonomyMap: Record<string, string> = {
  full: 'Full Autonomy → Make all architectural decisions. Proceed without asking. State all assumptions inline.',
  guided: 'Guided → Propose approach in 2–3 sentences. Wait for confirmation. Then execute fully.',
  stepwise: 'Stepwise → Execute one phase at a time. Stop after each and summarise before proceeding.',
  review: 'Review Mode → Present 2–3 architectural options with trade-offs. Do not implement until directed.'
};

// ═══ PERFORMANCE SLIDERS ═══
export type PerformanceSlider = {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
};

export const uxPromptPerformanceSliders: PerformanceSlider[] = [
  {
    id: 'fcp',
    name: 'FCP Target',
    label: 'First Contentful Paint',
    min: 1,
    max: 4,
    step: 0.1,
    defaultValue: 1.5,
    unit: 's'
  },
  {
    id: 'lcp',
    name: 'LCP Target',
    label: 'Largest Contentful Paint',
    min: 1,
    max: 6,
    step: 0.1,
    defaultValue: 2.5,
    unit: 's'
  },
  {
    id: 'inp',
    name: 'INP Target',
    label: 'Interaction to Next Paint',
    min: 50,
    max: 600,
    step: 50,
    defaultValue: 200,
    unit: 'ms'
  },
  {
    id: 'bundle',
    name: 'Max Initial JS Bundle',
    label: 'Max Initial JS Bundle',
    min: 80,
    max: 500,
    step: 20,
    defaultValue: 180,
    unit: 'kb'
  }
];

// ═══ SCORING SYSTEM ═══
export type ScoringConfig = {
  baseFieldIds: string[];
  pointsPerField: number;
  lawMaxPoints: number;
  goalMaxPoints: number;
  additionalPointFields: Record<string, number>;
  maxScore: number;
};

export const uxPromptScoringConfig: ScoringConfig = {
  baseFieldIds: [
    'f-name',
    'f-desc',
    'f-user',
    'f-problem',
    'f-fe',
    'f-be',
    'f-metric'
  ],
  pointsPerField: 6,
  lawMaxPoints: 16, // Math.min(laws * 2, 16)
  goalMaxPoints: 12, // Math.min(goals * 2, 12)
  additionalPointFields: {
    'f-db': 3,
    'f-auth': 3,
    'f-timeline': 4
  },
  maxScore: 100
};

export const uxPromptScoreDescriptions = [
  'Fill in sections to build quality',
  'Good start — add more details',
  'Building up nicely!',
  'Solid prompt foundation',
  'Excellent — ready to generate!'
];

// ═══ PROMPT TEMPLATE STRUCTURE ═══
export type PromptTemplate = {
  header: string;
  sections: PromptSection[];
  footer: string;
};

export type PromptSection = {
  title: string;
  content: string;
  includeWhen?: string; // condition for inclusion
};

/**
 * Gets the score description based on total score
 */
export function getScoreDescription(score: number): string {
  const idx = Math.floor(score / 25);
  return uxPromptScoreDescriptions[Math.min(idx, 4)];
}

/**
 * Calculates prompt quality score
 */
export function calculatePromptScore(
  filledFieldIds: string[],
  selectedLawCount: number,
  selectedGoalCount: number
): number {
  let score = 0;

  // Base fields
  filledFieldIds.forEach((id) => {
    if (uxPromptScoringConfig.baseFieldIds.includes(id)) {
      score += uxPromptScoringConfig.pointsPerField;
    }
  });

  // Laws: +2 per law, max 16
  score += Math.min(selectedLawCount * 2, uxPromptScoringConfig.lawMaxPoints);

  // Goals: +2 per goal, max 12
  score += Math.min(selectedGoalCount * 2, uxPromptScoringConfig.goalMaxPoints);

  // Additional field points
  filledFieldIds.forEach((id) => {
    if (uxPromptScoringConfig.additionalPointFields[id]) {
      score += uxPromptScoringConfig.additionalPointFields[id];
    }
  });

  return Math.min(score, uxPromptScoringConfig.maxScore);
}

// ═══ PROMPT GENERATOR ═══

export interface UxPromptInput {
  projectName: string;
  projectSlug: string;
  projectDesc: string;
  targetUsers: string;
  coreProblem: string;
  businessModel: string;
  targetMarket: string;
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
  selectedLaws: string[];
  selectedGoals: string[];
  score: number;
}

/** Fields a user must fill in before the UX prompt can be generated. */
export const uxPromptRequiredFields: Array<keyof UxPromptInput> = [
  'projectName',
  'projectDesc',
  'targetUsers',
  'coreProblem',
  'frontend',
];

export function getMissingUxPromptFields(
  input: UxPromptInput
): Array<keyof UxPromptInput> {
  return uxPromptRequiredFields.filter((k) => {
    const v = input[k];
    return typeof v !== 'string' || !v.trim();
  });
}

/**
 * Build the UX-first Next.js prompt from the user's form state.
 * Pure function: no DOM, no clipboard, no side effects.
 */
export function generateUxPrompt(input: UxPromptInput): string {
  const selectedLawsSet = new Set(input.selectedLaws);
  const selectedGoalsSet = new Set(input.selectedGoals);

  const selectedLawsData = uxPromptUxLaws.filter((law) => selectedLawsSet.has(law.id));
  const selectedGoalsData = uxPromptProductGoals.filter((goal) =>
    selectedGoalsSet.has(goal.id)
  );

  const goalsBlock = selectedGoalsData.length
    ? selectedGoalsData
        .map((goal) => `### ${goal.emoji} ${goal.name}\n${goal.directive}`)
        .join('\n\n')
    : '_(no goals selected)_';

  const lawsBlock = selectedLawsData.length
    ? selectedLawsData
        .map(
          (law) =>
            `### ${law.name}\n**Category:** ${law.category}\n**Description:** ${law.description}\n**Implementation:** ${law.implementation}`
        )
        .join('\n\n')
    : '_(no laws selected)_';

  const val = (s: string) => s || '(not specified)';
  const wcagLine = selectedLawsSet.has('wcag')
    ? 'WCAG 2.2 AA is mandatory.'
    : 'Accessibility standards should be considered.';
  const perfLine = selectedLawsSet.has('doherty')
    ? 'Target <100ms perceived response for all interactions.'
    : 'Optimize for fast perceived performance.';
  const mobileLine = selectedGoalsSet.has('goal-mobile')
    ? 'Mobile-first design from 320px up.'
    : 'Responsive design across all breakpoints.';
  const analyticsLine = selectedGoalsSet.has('goal-analytics') ? ' (PostHog/Mixpanel)' : '';

  return `# UX-FIRST NEXT.JS PROMPT BUILDER

## PROJECT DEFINITION
**Project Name:** ${val(input.projectName)}
**Codename/Slug:** ${val(input.projectSlug)}
**Description:** ${val(input.projectDesc)}
**Primary Users:** ${val(input.targetUsers)}
**Core Problem:** ${val(input.coreProblem)}
**Business Model:** ${val(input.businessModel)}
**Target Market:** ${val(input.targetMarket)}

## TECH STACK
**Frontend:** ${input.frontend}
**Backend:** ${val(input.backend)}
**Database:** ${val(input.database)}
**Deployment:** ${val(input.deployment)}

## PRODUCT GOALS DIRECTIVES
${goalsBlock}

## UX LAWS & PRINCIPLES
The following UX laws must be implemented as explicit directives in all component design:

${lawsBlock}

## GENERATION DIRECTIVES
1. **Cyberpunk Dark Theme:** Use the FBT design system with --fbt (#512BD4), --cyan (#00E5CC), --amber (#FFB020) for accent.
2. **Component-First:** Build reusable, modular components. Every interactive element is tested in isolation.
3. **Accessibility-First:** ${wcagLine} All interactive elements are keyboard navigable.
4. **Performance:** ${perfLine}
5. **Mobile-Responsive:** ${mobileLine}
6. **Type-Safe:** Use TypeScript strict mode. No \`any\` types.

## IMPLEMENTATION CHECKLIST
- [ ] Project structure set up
- [ ] Design tokens defined
- [ ] Component library scaffolded
- [ ] Form validation patterns
- [ ] Error handling & recovery flows
- [ ] Loading and empty states
- [ ] Analytics instrumentation${analyticsLine}
- [ ] Accessibility testing (axe-core)
- [ ] Mobile testing on real devices
- [ ] Launch checklist

---
**Generated by:** UX-First Prompt Builder
**Quality Score:** ${input.score}/100
`;
}

// ═══ EXPORT ALL FEATURES GROUPED ═══
export const uxPromptFeatureGroups = {
  navigation: uxPromptNavigationPatterns,
  feedback: uxPromptFeedbackPatterns,
  engagement: uxPromptEngagementPatterns,
  forms: uxPromptFormPatterns,
  a11y: uxPromptA11yPatterns,
  scaffold: uxPromptScaffoldItems,
  output: uxPromptOutputFlags
};
