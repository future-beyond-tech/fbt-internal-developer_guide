// FBT Plugin Architecture Analysis - Complete Typed Data Export

export interface NavSection {
  label: string;
  items: { id?: string; title?: string; label?: string; href?: string }[];
}

export interface Card {
  icon?: string;
  title: string;
  subtitle?: string;
  description: string;
  accent?: 'purple' | 'cyan' | 'amber' | 'green' | 'red' | 'sky' | 'pink';
  pills?: { label: string; variant: string }[];
  meta?: { label: string; value: string }[];
  code?: string;
  lang?: string;
  details?: string;
  variant?: string;
  items?: string[];
  projectTag?: string;
  projectTagVariant?: string;
  [key: string]: unknown;
}

export interface ConceptRow {
  concept: string;
  description: string;
  application: string;
  location: string;
  priority: 'Critical' | 'High' | 'Medium';
}

export interface ProjectPlugin {
  name: string;
  icon: string;
  tagline: string;
  badge: string;
  badgeVariant: 'high' | 'med' | 'low';
  problem: string[];
  hostAPI: { title: string; code: string };
  concepts: { title: string; items: { label: string; description: string }[] };
  insights?: string;
}

export interface RoadmapStep {
  step: number;
  project: string;
  timeframe: string;
  title: string;
  description: string;
  tags: string[];
}

export interface BeforeAfter {
  before: string[];
  after: string[];
}

export interface EdgeCase {
  warning: string;
  applies: string;
  verdict: string;
}

export interface Section {
  id: string;
  icon?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  description?: string;
  type?: 'cards' | 'table' | 'concepts' | 'projects' | 'code-tabs' | 'before-after' | 'roadmap' | 'edge-cases';
  cards?: Card[];
  concepts?: ConceptRow[];
  projects?: ProjectPlugin[];
  codeExamples?: { title: string; code: string; lang: string }[];
  beforeAfter?: BeforeAfter;
  roadmapSteps?: RoadmapStep[];
  edgeCases?: EdgeCase[];
  callout?: { type: 'purple' | 'cyan' | 'amber' | 'red' | 'green'; icon: string; text: string };
  tags?: string[];
  [key: string]: unknown;
}

export interface HeroData {
  title: string;
  subtitle?: string;
  description: string;
  stats: { value: string; label: string }[];
  tags?: string[];
}

export const pluginArchNav: NavSection[] = [
  {
    label: 'This Document',
    items: [
      { id: 'overview', title: 'Why It Matters for FBT' },
      { id: 'concepts', title: 'Concept → FBT Mapping' },
      { id: 'projects', title: 'Project-by-Project' },
      { id: 'code', title: 'FBT Code Adaptations' },
      { id: 'before-after', title: 'Before vs After' },
      { id: 'roadmap', title: 'Implementation Roadmap' },
      { id: 'when-not', title: 'When NOT to Use' },
      { id: 'verdict', title: 'FBT Verdict' },
    ],
  },
  {
    label: 'Concepts Covered',
    items: [
      { id: 'concepts', title: 'Host API Design' },
      { id: 'concepts', title: 'Plugin Lifecycle' },
      { id: 'concepts', title: 'Lazy Loading' },
      { id: 'concepts', title: 'Security Model' },
      { id: 'concepts', title: 'Hot-loading / CI' },
    ],
  },
];

export const pluginArchHero: HeroData = {
  title: 'How This Changes Everything for FBT',
  subtitle: 'Article Analysis — Jessica Patel · Type-Safe Plugin Architecture in React',
  description: 'This article isn\'t just theory — it\'s a direct blueprint for solving FBT\'s #1 engineering challenge: how do RentFlow, Zentra, CatchMoment, and FIROSE Group grow independently without becoming a tangled monolith? Plugin architecture is the answer.',
  stats: [
    { value: '4', label: 'FBT Projects Impacted' },
    { value: '7', label: 'Concepts to Apply' },
    { value: 'HIGH', label: 'Strategic Relevance' },
    { value: 'Now', label: 'Best Time to Start' },
  ],
  tags: ['Next.js 15', 'React 19', 'TypeScript', 'Plugin Architecture', 'Module Federation'],
};

export const pluginArchSections: Section[] = [
  {
    id: 'overview',
    icon: '📋',
    iconBg: 'bg-purple-50',
    title: 'Why This Article Matters for FBT',
    subtitle: 'the core problem it solves',
    description: 'FBT is not a single-product company. You are building a platform ecosystem — RentFlow as the SaaS product, Zentra as the identity layer, CatchMoment as an AI video product, and FIROSE Group\'s digital suite. All of these need to evolve independently, share infrastructure, and integrate with each other without becoming entangled. This is precisely the problem the article addresses.',
    type: 'cards',
    cards: [
      {
        icon: '🏠',
        title: 'Multi-Tenant Feature Isolation',
        projectTag: 'RentFlow',
        projectTagVariant: 'gold',
        description: 'RentFlow has Owner, Manager, Resident, and Super-Admin roles — each with radically different UI needs. A plugin architecture means each role\'s dashboard can be a separate plugin, loaded only for that user. No more monolithic role-switch logic.',
        accent: 'amber',
        meta: [
          { label: 'Article Concept', value: 'Lazy Loading + Host API' },
          { label: 'FBT Gain', value: 'Smaller bundles per role' },
        ],
      },
      {
        icon: '🔐',
        title: 'OAuth Provider as Plugin Host',
        projectTag: 'Zentra',
        projectTagVariant: 'fbt',
        description: 'Zentra is FBT\'s identity provider. It needs to serve multiple clients (RentFlow, CatchMoment, FIROSE apps). The Plugin API model maps perfectly — Zentra exposes a HostAPI that each client registers with, getting only the auth capabilities they\'re permitted to use.',
        accent: 'purple',
        meta: [
          { label: 'Article Concept', value: 'Security + Permission Model' },
          { label: 'FBT Gain', value: 'Scoped auth per client app' },
        ],
      },
      {
        icon: '🎬',
        title: 'AI Pipeline as Plugin Extensions',
        projectTag: 'CatchMoment',
        projectTagVariant: 'green',
        description: 'CatchMoment\'s 8-repo polyrepo is a natural fit for plugin architecture. Video capture, highlight generation, social sharing, and storage are independent pipelines. Each can be a plugin with its own bundle, loaded on demand — perfectly matching the article\'s bundling strategy.',
        accent: 'green',
        meta: [
          { label: 'Article Concept', value: 'Independent Bundling + Lifecycle' },
          { label: 'FBT Gain', value: 'Deploy pipelines independently' },
        ],
      },
      {
        icon: '🏢',
        title: 'Multi-Division Digital Extensions',
        projectTag: 'FIROSE Group',
        projectTagVariant: 'multi',
        description: 'Neat & Fresh, The Femison, and AR Perfumes are separate divisions that share the FIROSE website infrastructure. Plugin architecture lets each division\'s product catalog, promotional modules, and campaign pages be independently deployable without redeploying the whole platform.',
        accent: 'sky',
        meta: [
          { label: 'Article Concept', value: 'Hot-loading + CI/CD' },
          { label: 'FBT Gain', value: 'Division-level autonomy' },
        ],
      },
    ],
  },

  {
    id: 'concepts',
    icon: '🗺️',
    iconBg: 'bg-blue-50',
    title: 'Article Concept → FBT Application',
    subtitle: 'direct translation',
    description: 'Every concept in the article maps 1:1 to something FBT is already building or planning. Here\'s the complete translation table — what the article teaches vs. what FBT should implement, and where.',
    type: 'concepts',
    concepts: [
      {
        concept: 'Host API',
        description: 'Controlled interface between core app and plugins',
        application: 'RentFlow exposes a HostAPI that role-specific modules (Owner, Manager, Resident) register with. Zentra exposes an AuthHostAPI to client apps.',
        location: 'RentFlow Core, Zentra',
        priority: 'Critical',
      },
      {
        concept: 'Plugin Lifecycle',
        description: 'init → mount → update → unmount lifecycle hooks',
        application: 'Each RentFlow dashboard section (PropertyCard, ResidentProfile, PaymentHistory) gets a lifecycle. CatchMoment video pipeline stages use lifecycle hooks for setup/teardown.',
        location: 'RentFlow, CatchMoment',
        priority: 'High',
      },
      {
        concept: 'Independent Bundling',
        description: 'Each plugin compiled as its own Vite/esbuild bundle',
        application: 'CatchMoment\'s 8 polyrepos already are independent. RentFlow\'s role dashboards should each build to separate chunks. Neat & Fresh store modules can be standalone.',
        location: 'CatchMoment, RentFlow, Neat & Fresh',
        priority: 'High',
      },
      {
        concept: 'Lazy Loading',
        description: 'Dynamic import() — load plugin only when user needs it',
        application: 'Load Owner Dashboard only when owner logs in. Load video processing plugin only when CatchMoment event is active. Load Femison catalog only on that division page.',
        location: 'All FBT projects',
        priority: 'Critical',
      },
      {
        concept: 'Security Model',
        description: 'Restricted API surface, permission boundaries',
        application: 'Zentra scopes tokens to specific capabilities (read:users, manage:roles). RentFlow\'s resident plugin cannot access owner financial data. RBAC enforced at plugin API level.',
        location: 'Zentra, RentFlow',
        priority: 'Critical',
      },
      {
        concept: 'Hot-loading',
        description: 'Vite HMR for plugin live-reload during development',
        application: 'FBT\'s Cowork workflow accelerates dramatically — Cowork edits a plugin module, changes appear without full app restart. Essential for Claude Code workflow.',
        location: 'All FBT development',
        priority: 'Medium',
      },
      {
        concept: 'CI/CD for Plugins',
        description: 'GitHub Actions per plugin — lint, test, bundle, deploy',
        application: 'Each of CatchMoment\'s 8 repos gets its own pipeline. RentFlow role modules lint and test independently. FIROSE divisions deploy their content plugins without coordinating releases.',
        location: 'CatchMoment, RentFlow, FIROSE',
        priority: 'High',
      },
    ],
    callout: {
      type: 'purple',
      icon: '💡',
      text: 'Key Insight: The article\'s HostAPI + Plugin pattern is architecturally identical to how Zentra already works — it\'s an OAuth provider that gives clients only what they\'re permitted. You\'ve already implemented this principle. Now formalise it across the frontend with TypeScript interfaces.',
    },
  },

  {
    id: 'projects',
    icon: '🏗️',
    iconBg: 'bg-green-50',
    title: 'Project-by-Project Plugin Plan',
    subtitle: 'click to expand each project',
    description: 'Each FBT project has a specific plugin architecture story. The following details show exactly what to build, what the plugin host exposes, and which article concepts apply directly.',
    type: 'projects',
    projects: [
      {
        name: 'RentFlow',
        icon: '🏠',
        tagline: 'India\'s First Usage-Based Rental Operating System',
        badge: 'Highest Fit',
        badgeVariant: 'high',
        problem: [
          'Owner, Manager, Resident, and Super-Admin dashboards share one codebase — every role loads every other role\'s code',
          'Adding a new Manager feature risks breaking Resident views and causes full app redeployment',
          'The two onboarding paths (manual add vs. QR self-registration) are diverging — plugin arch formalises this as two separate plugins with shared lifecycle contracts',
          'Mobile app (Expo/RN) and web app share no code — plugins bridge this via shared HostAPI contracts over the same backend',
        ],
        hostAPI: {
          title: 'What the RentFlow HostAPI Exposes',
          code: `// rentflow-core/src/plugins/host.ts
export interface RentFlowHostAPI {
  // Auth context (Zentra-sourced, scope-limited)
  auth: {
    user: AuthUser;
    hasPermission: (perm: Permission) => boolean;
    tenantId: string;
  };
  // UI registration (plugins contribute panels)
  registerPanel: (key: string, config: PanelConfig) => void;
  registerRoute: (path: string, component: React.ComponentType) => void;
  // Events — plugins can subscribe/emit
  events: EventBus;
  // Logging only — no raw console access
  log: (msg: string, level?: 'info'|'warn'|'error') => void;
}

// Plugin contract every role module implements
export interface RentFlowPlugin {
  name: 'OwnerPlugin' | 'ManagerPlugin' | 'ResidentPlugin' | 'SuperAdminPlugin';
  requiredPermissions: Permission[];
  init: (host: RentFlowHostAPI) => Promise<void>;
  unmount?: () => void;
}`,
        },
        concepts: {
          title: 'Concepts Applied',
          items: [
            { label: 'Host API', description: 'auth, registerPanel, events — role plugins get only what their permissions allow' },
            { label: 'Lazy Loading', description: 'Load OwnerPlugin only when JWT role = owner. Never ship Resident code to Owner' },
            { label: 'Security Model', description: 'requiredPermissions checked before plugin init — fails safely if Zentra token lacks scope' },
          ],
        },
      },
      {
        name: 'Zentra',
        icon: '🔐',
        tagline: 'Custom OAuth 2.0 / OIDC Identity Provider',
        badge: 'Infrastructure Plugin Host',
        badgeVariant: 'high',
        problem: [
          'Zentra serves multiple clients: RentFlow, CatchMoment, FIROSE apps — each is effectively a "plugin" registering with the identity provider',
          'The article\'s SecureHostAPI pattern is exactly what Zentra\'s client registration does — each client gets scoped capabilities',
          'Zentra\'s 6 Admin UI modules (Client Management, Roles/Claims, Token Revocation, Audit Logs) are perfect plugin candidates — each can be lazy-loaded',
          'The RemoveRoleClaimsHandler concurrency issue you fixed is a lifecycle management problem — plugin unmount semantics would have prevented it',
        ],
        hostAPI: {
          title: 'Zentra Admin UI as Plugin-Based Dashboard',
          code: `// Each Zentra admin module = lazy-loaded plugin
const modules = {
  'client-management': () => import('@zentra/plugin-clients'),
  'roles-claims':       () => import('@zentra/plugin-roles'),
  'token-revocation':   () => import('@zentra/plugin-tokens'),
  'audit-logs':         () => import('@zentra/plugin-audit'),
  'user-admin':         () => import('@zentra/plugin-users'),
  'api-resources':      () => import('@zentra/plugin-api'),
};

// Load only the module the admin navigates to
async function loadZentraModule(key: keyof typeof modules) {
  const { default: plugin } = await modules[key]();
  plugin.init(zentraHostAPI); // passes scoped admin API
}`,
        },
        concepts: {
          title: 'Concepts Applied',
          items: [
            { label: 'Independent Bundling', description: 'Each Zentra module is its own package under @zentra/plugin-*' },
            { label: 'Lazy Loading', description: 'Admin modules load on navigation — initial bundle stays minimal' },
            { label: 'Lifecycle', description: 'unmount() cancels in-flight claims mutations — solves the concurrency bug structurally' },
          ],
        },
      },
      {
        name: 'CatchMoment',
        icon: '🎬',
        tagline: 'AI-powered event video capture & highlight generation',
        badge: 'Polyrepo Synergy',
        badgeVariant: 'med',
        problem: [
          'cm-api-gateway → HostAPI layer — the article\'s host, all other services register with it',
          'cm-video-processor (Modal GPU) → Plugin with its own lifecycle: init GPU session → process → release',
          'cm-highlight-engine → AI plugin loaded only when highlight generation is triggered (perfect lazy load)',
          'cm-storage-service (S3 + BunnyCDN) → Plugin that registers storage capability into HostAPI',
          'cm-event-service → Orchestrates which plugins are active for a given event type',
          'cm-web-app → Consumes plugins, lazy-loads feature sections (upload UI, gallery, sharing)',
        ],
        hostAPI: {
          title: 'GPU Plugin Lifecycle Example',
          code: `// cm-highlight-engine/src/plugin.ts
const HighlightPlugin: CatchMomentPlugin = {
  name: 'HighlightEngine',
  version: '2.0.0',
  requiredCapabilities: ['gpu-inference', 'storage-write'],

  async init(host: CatchMomentHostAPI) {
    // Register what this plugin provides
    host.registerCapability('generate-highlights', this.generateHighlights);
    host.registerComponent('HighlightProgress', HighlightProgressUI);
    host.log('HighlightEngine: GPU session ready');
  },

  // Lifecycle: release GPU resources when done
  async unmount() {
    await releaseGPUSession();
    host.log('HighlightEngine: GPU session released');
  },

  generateHighlights: async (eventId: string) => { /* Modal inference call */ }
};`,
        },
        concepts: {
          title: 'Concepts Applied',
          items: [
            { label: '8 Repos', description: 'Each repo = natural plugin candidate with clear lifecycle boundaries' },
            { label: 'GPU Lifecycle', description: 'init GPU session → process → unmount releases resources cleanly' },
            { label: 'Event Orchestration', description: 'event-service loads only plugins needed for a specific event type' },
          ],
        },
        insights: 'The article\'s section on Web Workers for isolation is directly applicable here. GPU inference plugins can run in a Worker, keeping the main thread free. The postMessage pattern becomes CatchMoment\'s inter-plugin communication bus.',
      },
      {
        name: 'FIROSE Group',
        icon: '🏢',
        tagline: 'Neat & Fresh · The Femison · AR Perfumes',
        badge: 'Content Modularity',
        badgeVariant: 'low',
        problem: [
          'Each division (Neat & Fresh, Femison, AR Perfumes) owns its product catalog, promotional banners, and campaign pages as independent plugins',
          'The FIROSE Group website is the host — divisions register their sections without touching the core website codebase',
          'Multilingual content (5 languages via next-intl) can be lazy-loaded per locale — massive bundle reduction for non-EN visitors',
          'Neat & Fresh e-commerce platform (already built on .NET 8 + Next.js 14) can expose a product plugin that the main FIROSE site lazy-loads',
          'Marketing campaign pages (like Black Phynoline launches) become short-lived plugins — deploy, promote, retire — without touching the core',
        ],
        hostAPI: {
          title: 'Division Plugin Registration',
          code: `// firose-web/src/plugins/host.ts
interface FIROSEHostAPI {
  registerDivision: (division: Division, config: DivisionConfig) => void;
  registerProductCatalog: (divisionId: string, catalog: CatalogPlugin) => void;
  registerCampaignPage: (slug: string, component: React.ComponentType) => void;
  i18n: { t: (key: string, locale: Locale) => string };
}

// Neat & Fresh registers with FIROSE host
const NeatFreshPlugin: FIROSEPlugin = {
  name: 'NeatFresh',
  async init(host: FIROSEHostAPI) {
    host.registerDivision('neat-fresh', { locale: 'en', theme: 'green' });
    host.registerProductCatalog('neat-fresh', await fetchCatalog());
  }
};`,
        },
        concepts: {
          title: 'Concepts Applied',
          items: [
            { label: 'Division Plugins', description: 'Each division is a plugin — can deploy independently' },
            { label: 'Content Isolation', description: 'Product catalogs, campaigns, and promotions are self-contained' },
            { label: 'Locale Bundling', description: '5 languages lazy-loaded per locale for massive bundle reduction' },
          ],
        },
      },
    ],
  },

  {
    id: 'code',
    icon: '💻',
    iconBg: 'bg-cyan-50',
    title: 'FBT Code Adaptations',
    subtitle: 'article code → fbt stack',
    description: 'Here\'s how to translate the article\'s code examples into FBT\'s actual Next.js 15 and React 19 stack, with Zentra security integration.',
    type: 'code-tabs',
    codeExamples: [
      {
        title: 'Plugin Loader',
        code: `// fbt-shared/plugin-loader.ts — FBT Production Plugin Loader
import { use, cache } from 'react'; // React 19

// Strict allowlist — no arbitrary URLs
const PLUGIN_REGISTRY: Record<string, () => Promise<any>> = {
  'owner-dashboard':    () => import('@rentflow/plugin-owner'),
  'manager-dashboard':  () => import('@rentflow/plugin-manager'),
  'resident-dashboard': () => import('@rentflow/plugin-resident'),
  'superadmin-panel':   () => import('@rentflow/plugin-superadmin'),
};

// Cache plugin promises — deduplicate concurrent loads
const loadPlugin = cache(async (key: string, hostAPI: RentFlowHostAPI) => {
  const loader = PLUGIN_REGISTRY[key];
  if (!loader) throw new Error(\`Unknown plugin: \${key}\`);
  const { default: plugin } = await loader();
  await plugin.init(hostAPI);
  return plugin;
});

// React 19 — Suspense-native plugin component
export function PluginBoundary({ pluginKey }: { pluginKey: string }) {
  const plugin = use(loadPlugin(pluginKey, hostAPI)); // Throws promise → Suspense
  const Component = plugin.getComponent('Dashboard');
  return <Component />;
}`,
        lang: 'typescript',
      },
      {
        title: 'Security Layer',
        code: `// fbt-shared/secure-host.ts — Zentra-powered security
export function createSecureHostAPI(
  zentraToken: ZentraToken,
  tenantId: string
): RentFlowHostAPI {
  // Derive capabilities from Zentra claims
  const hasScope = (scope: string) =>
    zentraToken.scopes.includes(scope);

  return {
    auth: {
      user: zentraToken.user,
      tenantId,
      // Permission check uses live token scopes
      hasPermission: (perm) => hasScope(\`rentflow:\${perm}\`),
    },
    registerPanel: (key, config) => {
      // Guard: panel registration requires manage:ui scope
      if (!hasScope('rentflow:manage:ui'))
        throw new Error('Plugin lacks manage:ui scope');
      panelRegistry.set(key, config);
    },
    // Network access explicitly absent — plugins call APIs directly
    // through their own service layer, not through hostAPI
    log: (msg, lvl) => logger.emit({ msg, level: lvl ?? 'info', tenantId }),
    events: createScopedEventBus(tenantId),
  };
}`,
        lang: 'typescript',
      },
      {
        title: 'Hot-Loading',
        code: `// In development — hot-reload plugin without losing host state
if (import.meta.hot) {
  import.meta.hot.accept(
    [
      '@rentflow/plugin-owner',
      '@rentflow/plugin-manager',
      '@rentflow/plugin-resident',
    ],
    async (newModules) => {
      for (const newModule of newModules ?? []) {
        if (!newModule) continue;
        const updatedPlugin = newModule.default;

        // Graceful unmount before hot-swap
        const existing = pluginRegistry.get(updatedPlugin.name);
        await existing?.unmount?.();

        // Re-init with fresh host API snapshot
        await updatedPlugin.init(createSecureHostAPI(currentToken, tenantId));
        pluginRegistry.set(updatedPlugin.name, updatedPlugin);

        console.log(\`[HMR] Plugin hot-swapped: \${updatedPlugin.name}\`);
      }
    }
  );
}`,
        lang: 'typescript',
      },
      {
        title: 'CI Pipeline',
        code: `# .github/workflows/plugin-owner.yml
name: RentFlow Owner Plugin CI
on:
  push:
    paths: ['packages/plugin-owner/**']

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: pnpm install --frozen-lockfile

      # Type-check plugin against HostAPI contract
      - run: pnpm -F @rentflow/plugin-owner typecheck
      - run: pnpm -F @rentflow/plugin-owner lint
      - run: pnpm -F @rentflow/plugin-owner test
      - run: pnpm -F @rentflow/plugin-owner build

      # Verify plugin implements required HostAPI contract
      - run: pnpm -F @rentflow/plugin-owner verify-contract

      # Upload bundle to Railway CDN — host app lazy-loads from here
      - name: Deploy plugin bundle
        run: |
          railway deploy --service rentflow-plugin-owner \\
            --env production \\
            --file dist/plugin-owner.es.js`,
        lang: 'yaml',
      },
    ],
  },

  {
    id: 'before-after',
    icon: '⚖️',
    iconBg: 'bg-red-50',
    title: 'Before vs After for FBT',
    subtitle: 'monolith → modular platform',
    type: 'before-after',
    beforeAfter: {
      before: [
        'All RentFlow roles load all role code — every user downloads Owner + Manager + Resident + SuperAdmin bundles',
        'Adding a new Manager feature requires touching the same files Resident uses → merge conflicts',
        'Zentra Admin UI modules share the same chunk — audit-logs loads even when only managing clients',
        'CatchMoment\'s video processing logic is bundled with the landing page',
        'FIROSE division campaigns require redeploying the entire Group website',
        'A bug in the Owner dashboard forces a full RentFlow release cycle',
        'Cowork-generated code for one feature can break another in the same bundle',
      ],
      after: [
        'Zentra token determines which plugin bundle loads — Resident never downloads Owner code',
        'Manager plugin lives in @rentflow/plugin-manager — Resident team never touches it',
        'Zentra admin loads audit-logs plugin on demand — initial load drops from 400kb to 80kb',
        'CatchMoment video plugin loads only when an active event exists',
        'Black Phynoline campaign deploys as a FIROSE plugin without touching homepage',
        'Owner plugin hotfix deploys and hot-loads without Resident downtime',
        'Cowork generates a complete self-contained plugin — zero risk to other modules',
      ],
    },
    callout: {
      type: 'purple',
      icon: '🎯',
      text: 'The single biggest FBT win: Cowork\'s Claude Code workflow becomes dramatically safer. Each session targets one plugin. The generated code is type-checked against the HostAPI contract. You can hot-load Cowork\'s output in the host app without rebuilding anything else. Iteration speed multiplies.',
    },
  },

  {
    id: 'roadmap',
    icon: '🛣️',
    iconBg: 'bg-yellow-50',
    title: 'FBT Implementation Roadmap',
    subtitle: 'phased rollout plan',
    description: 'The article gives all the technical pieces. Here\'s the FBT-specific sequence — ordered to deliver value fast without a big-bang rewrite.',
    type: 'roadmap',
    roadmapSteps: [
      {
        step: 1,
        project: 'Zentra',
        timeframe: 'Week 1–2',
        title: 'Define the FBT HostAPI Interface Contracts',
        description: 'Start with Zentra. Write ZentraHostAPI and RentFlowHostAPI TypeScript interfaces. These are the foundation everything else builds on. No runtime code yet — just contracts. This is the article\'s "How to Define the Host API" applied to FBT\'s actual domain.',
        tags: ['TypeScript interfaces', 'HostAPI contract', 'Zentra scopes'],
      },
      {
        step: 2,
        project: 'RentFlow',
        timeframe: 'Week 2–3',
        title: 'Extract Role Dashboards as Lazy-Loaded Plugins',
        description: 'Move OwnerDashboard, ManagerDashboard, and ResidentDashboard into separate packages under packages/. Each gets a plugin.ts with init/unmount. The main app/ dynamically imports based on Zentra JWT role claim. Immediate bundle size win.',
        tags: ['Dynamic import()', 'Role-based loading', 'Turborepo'],
      },
      {
        step: 3,
        project: 'Zentra + RentFlow',
        timeframe: 'Week 3–4',
        title: 'Implement SecureHostAPI with Zentra Token Scopes',
        description: 'Create createSecureHostAPI(zentraToken) that derives plugin capabilities from live JWT claims. A Resident plugin that tries to register an Owner-only panel throws a typed error at init time. The security layer is Zentra-native, not custom-built.',
        tags: ['JWT scopes', 'Permission gates', 'SecureHostAPI'],
      },
      {
        step: 4,
        project: 'CatchMoment',
        timeframe: 'Week 4–6',
        title: 'Formalise Polyrepo Interfaces as Plugin Contracts',
        description: 'CatchMoment\'s 8 repos already have natural boundaries. Formalise each as a CatchMomentPlugin with typed capabilities (gpu-inference, storage-write, highlight-generate). The event-service becomes the HostAPI orchestrator — loading the right pipeline plugins for each event type.',
        tags: ['Polyrepo contracts', 'GPU lifecycle', 'Capability model'],
      },
      {
        step: 5,
        project: 'All Projects',
        timeframe: 'Week 6–7',
        title: 'Per-Plugin CI Pipelines on GitHub Actions',
        description: 'Add the GitHub Actions workflow the article describes — one per plugin package. Each runs type-check, lint, test, build, and a verify-contract script that confirms the plugin satisfies its HostAPI interface. Railway auto-deploys changed plugin bundles. Cowork sessions can target specific plugin packages with confidence.',
        tags: ['GitHub Actions', 'Railway deploy', 'Contract verification'],
      },
      {
        step: 6,
        project: 'FIROSE',
        timeframe: 'Week 7–8',
        title: 'Division Content as Independently Deployable Plugins',
        description: 'Neat & Fresh, Femison, and AR Perfumes each get a content plugin. The FIROSE Group website becomes a plugin host. Division teams deploy their product catalog updates without a website release. Hot-loading in development lets marketing see live changes in the host context instantly.',
        tags: ['Content plugins', 'Division autonomy', 'Hot-load'],
      },
    ],
  },

  {
    id: 'when-not',
    icon: '⚠️',
    iconBg: 'bg-orange-50',
    title: 'When FBT Should NOT Use This',
    subtitle: 'the article is honest about this — so are we',
    description: 'The article explicitly lists when plugin architecture is wrong. Let\'s map this honestly to FBT\'s situation.',
    type: 'edge-cases',
    edgeCases: [
      {
        warning: 'Small / Single-Team Apps',
        applies: 'Partly — early-stage features',
        verdict: 'New EduConnect or early-stage features should not start as plugins. Build monolithic first, extract when boundaries are clear.',
      },
      {
        warning: 'Tightly Coupled Features',
        applies: 'Yes — some RentFlow flows',
        verdict: 'The resident onboarding QR flow is tightly coupled to the property assignment logic. Don\'t plugin-ise this — the coupling is load-bearing. Keep it in core.',
      },
      {
        warning: 'Performance-Critical Systems',
        applies: 'Partly — CatchMoment GPU pipeline',
        verdict: 'The GPU inference hot path itself should not use plugin dynamic import — too slow. Load it eagerly at event start. Only the UI components are plugin-lazy-loaded.',
      },
      {
        warning: 'Limited Security Controls',
        applies: 'Not applicable — Zentra handles it',
        verdict: 'FBT is in the clear. Zentra\'s OIDC token scopes provide exactly the security layer the article recommends. You already have the infrastructure.',
      },
      {
        warning: 'Early-Stage Products',
        applies: 'Yes — new project kickoffs',
        verdict: 'When starting a new FBT project with Cowork, build monolithic first for 4–6 weeks. Once domains are clear, extract plugins. The Kickoff Prompt should scaffold conventional structure.',
      },
    ],
  },

  {
    id: 'verdict',
    icon: '✅',
    iconBg: 'bg-green-50',
    title: 'FBT Verdict',
    subtitle: 'what to do with this knowledge',
    type: 'cards',
    cards: [
      {
        title: 'Start Immediately',
        description: 'Define HostAPI contracts for RentFlow and Zentra. These are TypeScript interfaces — zero runtime cost to start.',
        accent: 'green',
      },
      {
        title: 'Biggest Quick Win',
        description: 'Lazy-load RentFlow role dashboards by Zentra JWT role claim. Instant bundle reduction, zero UX change.',
        accent: 'amber',
      },
      {
        title: 'Cowork Multiplier',
        description: 'Each Cowork session targets one plugin package. Safer generation, faster iteration, zero cross-module risk.',
        accent: 'purple',
      },
    ],
    tags: [
      'Host API Design',
      'Plugin Lifecycle',
      'Independent Bundling',
      'Dynamic import()',
      'Lazy Loading',
      'Vite Library Mode',
      'SecureHostAPI',
      'Permission Model',
      'iframe Sandboxing',
      'Web Workers',
      'postMessage IPC',
      'HMR Hot-Reload',
      'import.meta.hot',
      'GitHub Actions per plugin',
      'TypeScript Contracts',
      'Zentra Token Scopes',
      'Role-Based Plugin Load',
      'Turborepo Packages',
      'RentFlow Role Modules',
      'CatchMoment GPU Lifecycle',
      'FIROSE Division Plugins',
      'Plugin Registry Allowlist',
      'React 19 use()',
      'Suspense Plugin Boundary',
      'Plugin EventBus',
      'Plugin Versioning',
      'Cowork Session Isolation',
      'Railway Plugin Deploy',
      'Contract Verification CI',
    ],
  },
];
