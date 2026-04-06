import type {
  NavSection,
  Card,
  Section,
  PatternRow,
  PatternGroup,
  Principle,
  HeroData,
} from './backend';

export const frontendNav: NavSection[] = [
  {
    label: 'Foundation',
    items: [
      { label: 'Core Principles', href: '#core-principles' },
      { label: 'TypeScript Standards', href: '#typescript-standards' },
      { label: 'Paradigms', href: '#paradigms' },
    ],
  },
  {
    label: 'Architecture',
    items: [
      { label: 'Component Architecture', href: '#component-architecture' },
      { label: 'Design Patterns', href: '#design-patterns' },
      { label: 'State Management', href: '#state-management' },
    ],
  },
  {
    label: 'Next.js 15',
    items: [
      { label: 'App Router', href: '#nextjs-app-router' },
      { label: 'RSC & Server Actions', href: '#rsc-server-actions' },
      { label: 'Routing Patterns', href: '#routing-patterns' },
      { label: 'Data Fetching', href: '#data-fetching' },
    ],
  },
  {
    label: 'Styling',
    items: [
      { label: 'Styling Approaches', href: '#styling-approaches' },
      { label: 'Design System', href: '#design-system' },
      { label: 'Responsive Design', href: '#responsive-design' },
      { label: 'Animation & Motion', href: '#animation-motion' },
    ],
  },
  {
    label: 'Quality',
    items: [
      { label: 'Forms & Validation', href: '#forms-validation' },
      { label: 'Testing Strategies', href: '#testing-strategies' },
      { label: 'Accessibility', href: '#accessibility' },
      { label: 'Frontend Security', href: '#frontend-security' },
    ],
  },
  {
    label: 'Performance',
    items: [
      { label: 'Core Web Vitals', href: '#core-web-vitals' },
      { label: 'Optimization', href: '#optimization' },
      { label: 'API Integration', href: '#api-integration' },
    ],
  },
  {
    label: 'Ecosystem',
    items: [
      { label: 'SEO & Metadata', href: '#seo-metadata' },
      { label: 'Build Tooling', href: '#build-tooling' },
      { label: 'Deployment', href: '#deployment' },
      { label: 'FBT Standards', href: '#fbt-standards' },
    ],
  },
];

const corePrinciples: Principle[] = [
  {
    name: 'Single Responsibility Principle',
    description: 'Each component should have a single reason to change. Components should do one thing well.',
    example: 'Separate `UserCard` (display) from `useUserData` (logic)',
    benefits: ['Easy to test', 'Reusable logic', 'Clear purpose'],
  },
  {
    name: 'Open/Closed Principle',
    description: 'Components should be open for extension but closed for modification. Use composition and props.',
    example: 'Button with variant prop instead of ButtonPrimary, ButtonSecondary',
    benefits: ['Extensible', 'Prevents breaking changes', 'Flexible'],
  },
  {
    name: 'Liskov Substitution Principle',
    description: 'Derived components should be substitutable for their parents without breaking the UI.',
    example: 'Custom button can replace native button seamlessly',
    benefits: ['Type-safe swaps', 'Polymorphism', 'Predictable behavior'],
  },
  {
    name: 'Interface Segregation Principle',
    description: 'Clients should not depend on interfaces they do not use. Pass only needed props.',
    example: 'Headless component API with minimal required props',
    benefits: ['Flexibility', 'Fewer breaking changes', 'Clear contracts'],
  },
  {
    name: 'Dependency Inversion Principle',
    description: 'Depend on abstractions, not concrete implementations. Inject dependencies.',
    example: 'useApi(client) instead of hardcoding fetch()',
    benefits: ['Testable', 'Pluggable', 'Decoupled'],
  },
  {
    name: 'DRY (Don\'t Repeat Yourself)',
    description: 'Extract common logic into reusable hooks, components, utilities to avoid duplication.',
    example: 'Custom hook for form validation used across multiple forms',
    benefits: ['Single source of truth', 'Easy updates', 'Less code'],
  },
  {
    name: 'KISS (Keep It Simple, Stupid)',
    description: 'Simplicity should be a primary design goal. Choose clarity over cleverness.',
    example: 'Explicit conditional rendering instead of complex ternary chains',
    benefits: ['Readability', 'Maintenance', 'Fewer bugs'],
  },
  {
    name: 'YAGNI (You Aren\'t Gonna Need It)',
    description: 'Don\'t add functionality until it\'s actually needed. Avoid over-engineering.',
    example: 'Build pagination when users request it, not speculatively',
    benefits: ['Less code', 'Faster delivery', 'Easier pivots'],
  },
  {
    name: 'Separation of Concerns',
    description: 'Keep display, logic, and data separate. UI concerns separate from business logic.',
    example: 'Data in custom hooks, rendering in presentational components',
    benefits: ['Testable', 'Maintainable', 'Reusable'],
  },
  {
    name: 'Law of Demeter',
    description: 'Components should only communicate with their direct dependencies. Avoid deep prop drilling.',
    example: 'Use context for cross-cutting data instead of passing through 5 levels',
    benefits: ['Loose coupling', 'Flexibility', 'Fewer prop changes'],
  },
  {
    name: 'Command Query Separation',
    description: 'Separate commands (mutations) from queries (reads). Use Server Actions for mutations.',
    example: 'useQuery() for reads, useServerAction() for writes',
    benefits: ['Clear intent', 'Caching friendly', 'Type-safe'],
  },
  {
    name: 'Convention over Configuration',
    description: 'Establish patterns so developers don\'t configure basic behavior. Let conventions guide.',
    example: 'File-based routing, standard component folder structure',
    benefits: ['Consistency', 'Less boilerplate', 'Clear patterns'],
  },
  {
    name: 'Composition over Inheritance',
    description: 'Use component composition instead of class inheritance. React favors this naturally.',
    example: 'Wrap Button with context provider instead of extending Button class',
    benefits: ['Flexible', 'No inheritance chains', 'Easier reasoning'],
  },
  {
    name: 'Colocation',
    description: 'Place code as close as possible to where it\'s used. Keep related code together.',
    example: 'Store component CSS/utils in same folder as component',
    benefits: ['Easy discovery', 'Easy deletion', 'Self-contained'],
  },
  {
    name: 'Single Source of Truth',
    description: 'Store data in one canonical place. Derived state should be computed, not stored.',
    example: 'Store list, compute filtered/sorted views with useMemo',
    benefits: ['No sync bugs', 'Easier updates', 'Consistent data'],
  },
  {
    name: 'Progressive Enhancement',
    description: 'Build core functionality that works without JavaScript, enhance with JS.',
    example: 'Forms that submit to Server Actions even without JS',
    benefits: ['Resilience', 'Better perception', 'Works everywhere'],
  },
];

const typescriptCards: Card[] = [
  {
    title: 'Strict Mode',
    description: 'Enable all strict type checks in tsconfig.json for maximum safety.',
    code: `{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}`,
    details: 'Enables noImplicitAny, noImplicitThis, strictBindCallApply, and strictNullChecks. Catches errors at compile-time.',
  },
  {
    title: 'No Any',
    description: 'Avoid implicit any. When any is needed, use explicit types with justification.',
    code: `// Bad
const data: any = fetchData();

// Good
const data: Promise<User[]> = fetchData();

// Justified any
const data: any = JSON.parse(unknownString); // TODO: validate with Zod`,
    details: 'any defeats type checking. Use unknown for truly unknown values, then narrow with type guards.',
  },
  {
    title: 'Discriminated Unions',
    description: 'Use literal types in discriminator field to create exhaustive type checking.',
    code: `type Success = { status: 'success'; data: User };
type Error = { status: 'error'; message: string };
type Result = Success | Error;

const handle = (result: Result) => {
  if (result.status === 'success') {
    console.log(result.data); // data is available
  }
};`,
    details: 'TypeScript narrows the union based on discriminator. Ensures all cases handled.',
  },
  {
    title: 'Generics',
    description: 'Write generic functions and components that work with any type while preserving type safety.',
    code: `function useApi<T>(endpoint: string): Promise<T> {
  return fetch(endpoint).then(r => r.json() as T);
}

const users = await useApi<User[]>('/api/users');`,
    details: 'Generics enable reusable, type-safe abstractions. Use constraints to limit valid types.',
  },
  {
    title: 'Utility Types',
    description: 'Use TypeScript built-in utility types: Partial, Pick, Omit, Record, Readonly, Extract, Exclude.',
    code: `type UserPreview = Pick<User, 'id' | 'name'>;
type UserUpdate = Partial<User>;
type Status = 'pending' | 'success' | 'error';
type StatusRecord = Record<Status, string>;`,
    details: 'Reduces boilerplate and keeps DRY. Compose types from existing ones.',
  },
  {
    title: 'Type Inference',
    description: 'Let TypeScript infer types when possible. Explicit types where inference cannot work.',
    code: `// Inferred
const items = [1, 2, 3]; // number[]
const config = { debug: true, maxRetries: 3 }; // inferred

// Explicit when needed
const items: (string | number)[] = [];
function parse(input: string): User { }`,
    details: 'Inference reduces noise. Explicit types clarify intent at critical points.',
  },
];

const paradigmCards: Card[] = [
  {
    title: 'Functional Programming',
    description: 'Prefer pure functions, immutability, and function composition. Avoid side effects in rendering.',
    code: `// Pure function
const filterUsers = (users: User[], role: string): User[] =>
  users.filter(u => u.role === role);

// In components
const visible = useMemo(
  () => filterUsers(users, selectedRole),
  [users, selectedRole]
);`,
  },
  {
    title: 'Reactive Programming',
    description: 'Model UIs as streams of data changes. React to state changes automatically.',
    code: `const query = useQuery(['users'], fetchUsers);

useEffect(() => {
  if (query.data) {
    console.log('Data updated:', query.data);
  }
}, [query.data]);`,
  },
  {
    title: 'Component-Driven Development',
    description: 'Build UIs as isolated, composable components. Design in Storybook first.',
    code: `export function Button(props: ButtonProps) {
  return <button {...props} />;
}

// Storybook story
export const Primary: StoryObj = {
  args: { variant: 'primary', children: 'Click me' }
};`,
  },
  {
    title: 'Declarative UI',
    description: 'Describe what the UI should be, not how to build it. Let React handle updates.',
    code: `// Declarative - describe state
{loading && <Spinner />}
{error && <Error message={error} />}
{data && <List items={data} />}

// Not imperative DOM manipulation`,
  },
  {
    title: 'Event-Driven Architecture',
    description: 'Components communicate through events and callbacks. Decouple with event emitters or pubsub.',
    code: `const emit = useEventBus();

const handleClick = () => {
  emit('item:selected', item);
};`,
  },
  {
    title: 'Atomic Design',
    description: 'Organize components in hierarchy: atoms → molecules → organisms → templates → pages.',
    code: `atoms/Button.tsx
molecules/FormField.tsx
organisms/UserForm.tsx
templates/AuthLayout.tsx
pages/LoginPage.tsx`,
  },
];

const componentArchCards: Card[] = [
  {
    title: 'Atomic Design',
    description:
      'Hierarchical component organization from atoms (Button) to pages. Establishes clear naming and composition patterns.',
  },
  {
    title: 'Islands Architecture',
    description:
      'Ship isolated, interactive components on otherwise static HTML. Reduces JS payload and enables progressive enhancement.',
  },
  {
    title: 'Compound Components',
    description:
      'Components that work together with shared state. Example: Tabs with Tab, TabList, TabPanel. Flexible API.',
  },
  {
    title: 'Composition Patterns',
    description:
      'Build complex UIs by composing simple components. Props, children, slots, and context for flexible APIs.',
  },
  {
    title: 'Container/Presentational',
    description:
      'Separate data fetching (Container) from rendering (Presentational). Easier testing and reuse.',
  },
  {
    title: 'Render Props',
    description: 'Component accepts function as child to customize rendering. Flexible but verbose alternative to hooks.',
  },
];

const designPatternCards: Card[] = [
  {
    title: 'Compound Components',
    description: 'Components that work together with implicit shared state via context.',
    code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>Title</DialogHeader>
    <DialogBody>Content</DialogBody>
  </DialogContent>
</Dialog>`,
  },
  {
    title: 'Custom Hooks',
    description: 'Extract component logic into reusable hooks. Share state and side effects.',
    code: `function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  return user;
}`,
  },
  {
    title: 'Render Props',
    description: 'Pass function as prop to customize child rendering. More flexible than children.',
    code: `<Query query={GET_USER}>
  {({ data, loading, error }) => (
    <>
      {loading && <Spinner />}
      {data && <User user={data} />}
    </>
  )}
</Query>`,
  },
  {
    title: 'Higher-Order Components',
    description: 'Function that takes component and returns enhanced component. Use sparingly, hooks preferred.',
    code: `const withAuth = (Component) => (props) => {
  const { user } = useAuth();
  if (!user) return <LoginPage />;
  return <Component user={user} {...props} />;
};`,
  },
  {
    title: 'Headless Components',
    description: 'Unstyled, composable components that are logic-only. Style with your CSS solution.',
    code: `import { Command } from 'cmdk';

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandItem>Item 1</CommandItem>
  </CommandList>
</Command>`,
  },
  {
    title: 'Provider Pattern',
    description: 'Use context providers to share state globally without prop drilling.',
    code: `<ThemeProvider>
  <App />
</ThemeProvider>

// In any component
const theme = useTheme();`,
  },
];

const stateManagementCards: Card[] = [
  {
    title: 'Zustand',
    description: 'Lightweight state management. Simple API, good DevTools, minimal boilerplate.',
    code: `const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// In components
const count = useStore((state) => state.count);`,
  },
  {
    title: 'React Query v5',
    description: 'Server state management. Handles caching, refetching, background updates, pagination.',
    code: `const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
  staleTime: 5 * 60 * 1000, // 5 minutes
});`,
  },
  {
    title: 'Jotai',
    description: 'Atomic state management. Atoms as minimal units, great for complex state dependencies.',
    code: `const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
  },
  {
    title: 'useReducer + Context',
    description: 'Built-in React API for complex state logic. No external dependency, good for medium complexity.',
    code: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
  }
}`,
  },
];

const nextjsRouterCards: Card[] = [
  {
    title: 'page.tsx',
    description: 'File convention for route segments. Exported React component renders the page UI.',
    code: `// app/posts/page.tsx
export default function PostsPage() {
  return <h1>Posts</h1>;
}
// Accessible at /posts`,
  },
  {
    title: 'layout.tsx',
    description: 'Shared UI wrapping child routes. Persists across navigation, maintains state.',
    code: `// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}`,
  },
  {
    title: 'loading.tsx',
    description: 'Instant loading fallback. Suspense boundary replacement for route segments.',
    code: `// app/posts/loading.tsx
export default function Loading() {
  return <Skeleton count={5} />;
}`,
  },
  {
    title: 'error.tsx',
    description: 'Error boundary for route segment. Catches errors and displays fallback.',
    code: `'use client';
export default function Error({ error, reset }) {
  return (
    <>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </>
  );
}`,
  },
  {
    title: 'not-found.tsx',
    description: 'Renders when notFound() is called or route doesn\'t exist. Segment-specific 404.',
    code: `// app/posts/[id]/not-found.tsx
export default function NotFound() {
  return <h2>Post not found</h2>;
}`,
  },
  {
    title: 'route.ts',
    description: 'API route handler. Exports GET, POST, PUT, DELETE functions.',
    code: `// app/api/posts/route.ts
export async function GET(request: Request) {
  return Response.json({ posts: [] });
}`,
  },
];

const rscServerActions: Section = {
  id: 'rsc-server-actions',
  title: 'RSC & Server Actions',
  description:
    'React Server Components render on server, streams to client. Server Actions for safe mutations with zero client code.',
  cards: [
    {
      title: 'Server Components Rules',
      description: 'By default in app/, components run on server. Can access databases, secrets, large dependencies.',
      code: `// app/posts/page.tsx - Server Component by default
import { db } from '@/lib/db';

export default async function Posts() {
  const posts = await db.posts.findMany();
  return <PostList posts={posts} />;
}`,
    },
    {
      title: 'Client Components',
      description: 'Use "use client" directive for interactivity. State, hooks, browser APIs.',
      code: `'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    },
    {
      title: 'Composition Patterns',
      description: 'Interleave server and client. Server fetches, client handles interaction.',
      code: `// Server Component
export default async function Page() {
  const posts = await db.posts.findMany();
  return (
    <>
      <ServerSidebar />
      <ClientPostsViewer initialPosts={posts} />
    </>
  );
}`,
    },
    {
      title: 'Server Actions',
      description: 'Async functions marked "use server". Called from Client Components securely.',
      code: `'use server';
export async function createPost(data: FormData) {
  const post = await db.posts.create({
    title: data.get('title'),
  });
  revalidatePath('/posts');
  return post;
}

// In Client Component
'use client';
export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}`,
    },
  ],
};

const routingPatterns: Section = {
  id: 'routing-patterns',
  title: 'Routing Patterns',
  description: 'Dynamic segments, navigation, middleware, parallel and intercepting routes for advanced routing.',
  cards: [
    {
      title: 'Dynamic Segments',
      description: '[param] and [...slug] for dynamic routes.',
      code: `// app/posts/[id]/page.tsx
export default function Post({ params }: { params: { id: string } }) {
  return <h1>Post {params.id}</h1>;
}

// app/docs/[...slug]/page.tsx catches /docs/a/b/c
export default function Docs({ params }: { params: { slug: string[] } }) {
  return <h1>{params.slug.join('/')}</h1>;
}`,
    },
    {
      title: 'Navigation Methods',
      description: '<Link>, useRouter, redirect, notFound.',
      code: `import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <Link href="/about">Static Link</Link>
      <button onClick={() => router.push('/posts')}>Dynamic</button>
    </>
  );
}`,
    },
    {
      title: 'Middleware Auth',
      description: 'middleware.ts for authentication and authorization checks.',
      code: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth')?.value;
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};`,
    },
    {
      title: 'Parallel Routes',
      description: '@folder convention for independent route segments.',
      code: `// app/dashboard/@sidebar/page.tsx
// app/dashboard/@main/page.tsx
// Both render in parallel in dashboard layout`,
    },
    {
      title: 'Intercepting Routes',
      description: '(..)folder pattern to intercept child routes without navigation.',
      code: `// app/photos/[id]/page.tsx intercepted by
// app/photos/(.)\_[id]/modal.tsx`,
    },
  ],
};

const dataFetchingCards: Card[] = [
  {
    title: 'Server-Side Rendering (SSR)',
    description: 'Render page on each request. Dynamic, always fresh, good for personalization.',
    code: `// app/posts/page.tsx
export const dynamic = 'force-dynamic';

export default async function Posts() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // Don't cache
  });
  return <PostList posts={posts} />;
}`,
  },
  {
    title: 'Static Generation (SSG)',
    description: 'Pre-render at build time. Fastest, best for SEO, reusable across requests.',
    code: `export const revalidate = 3600; // ISR: revalidate every hour

export default async function Post() {
  const post = await fetch('https://api.example.com/posts/1', {
    next: { revalidate: 3600 },
  });
  return <ArticleView post={post} />;
}`,
  },
  {
    title: 'Incremental Static Regeneration (ISR)',
    description: 'Regenerate static pages on-demand or on schedule. Best of SSR and SSG.',
    code: `// Revalidate every 60 seconds
export const revalidate = 60;

// Or revalidate on-demand
import { revalidatePath } from 'next/cache';

export async function POST() {
  revalidatePath('/posts');
  return Response.json({ revalidated: true });
}`,
  },
  {
    title: 'Client-Side Rendering (CSR)',
    description: 'Fetch in browser with useQuery. For interactive, user-specific content.',
    code: `'use client';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then(r => r.json()),
  });
  return <div>{user?.name}</div>;
}`,
  },
  {
    title: 'Streaming',
    description: 'Stream HTML incrementally as Suspense boundaries resolve.',
    code: `import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </>
  );
}`,
  },
  {
    title: 'On-Demand Revalidation',
    description: 'Manually trigger cache revalidation from Server Actions or API routes.',
    code: `'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function publishPost(id: string) {
  await db.posts.update(id, { published: true });
  revalidatePath('/posts');
  revalidateTag('posts');
}`,
  },
];

const stylingCards: Card[] = [
  {
    title: 'Tailwind v4',
    description: 'Utility-first CSS framework. Composable, performant, built-in dark mode and container queries.',
    code: `<div className="flex gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-slate-950">
  <img className="size-12 rounded-full object-cover" src="avatar.jpg" />
  <div>
    <h3 className="font-semibold text-slate-900 dark:text-white">Name</h3>
    <p className="text-sm text-slate-600 dark:text-slate-400">Description</p>
  </div>
</div>`,
  },
  {
    title: 'CSS Modules',
    description: 'Scoped CSS. Prevents naming collisions, explicit dependencies.',
    code: `// Button.module.css
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.primary {
  background: blue;
}

// Button.tsx
import styles from './Button.module.css';
export function Button() {
  return <button className={styles.button} />;
}`,
  },
  {
    title: 'vanilla-extract',
    description: 'Type-safe CSS-in-JS. Zero-runtime, generates CSS at build time.',
    code: `import { style } from '@vanilla-extract/css';

export const button = style({
  padding: '0.5rem 1rem',
  borderRadius: '0.25rem',
  ':hover': { opacity: 0.8 },
});`,
  },
  {
    title: 'CVA (Class Variants Authority)',
    description: 'Type-safe component API with variant composition.',
    code: `import { cva } from 'class-variance-authority';

const button = cva('px-4 py-2 rounded', {
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
  },
});

<button className={button({ variant: 'primary' })} />`,
  },
  {
    title: 'Custom Properties',
    description: 'CSS variables for dynamic theming. Scoped, cascading, runtime-changeable.',
    code: `/* tokens.css */
:root {
  --color-primary: #0066cc;
  --spacing-unit: 0.25rem;
}

[data-theme="dark"] {
  --color-primary: #0088ff;
}

/* Usage */
<div style={{ color: 'var(--color-primary)' }} />`,
  },
  {
    title: 'Dark Mode',
    description: 'Tailwind dark mode with class or system preference strategy.',
    code: `// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {},
  },
};

// Usage
<div className="bg-white dark:bg-slate-950">Content</div>`,
  },
];

const designSystem: Section = {
  id: 'design-system',
  title: 'Design System',
  description: 'Design tokens, Storybook for component documentation, shadcn/ui for accessible components.',
  cards: [
    {
      title: 'Design Tokens',
      description: 'Centralized, semantic color, spacing, typography values. Single source of truth.',
      code: `// tokens.ts
export const colors = {
  primary: '#0066cc',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
} as const;

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
} as const;`,
    },
    {
      title: 'Storybook 8',
      description: 'Interactive component documentation and testing. Define stories as use cases.',
      code: `// Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = {
  args: { variant: 'primary', children: 'Click me' },
};

export const Disabled = {
  args: { disabled: true, children: 'Disabled' },
};`,
    },
    {
      title: 'shadcn/ui',
      description: 'Accessible, unstyled component library. Copy-paste components, customize freely.',
      code: `import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>Content</DialogContent>
    </Dialog>
  );
}`,
    },
    {
      title: 'Typography Scale',
      description: 'Semantic size progression. H1-H6 and body text scales for hierarchy.',
      code: `/* Typography scale */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */`,
    },
    {
      title: 'Spacing (4px Grid)',
      description: '4px base unit for consistency. Multiply for larger scales.',
      code: `/* 4px grid */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */`,
    },
    {
      title: 'Icon System',
      description: 'Lucide React for consistent, scalable SVG icons.',
      code: `import { Search, ChevronDown, AlertCircle } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-2">
      <Search size={20} />
      <button className="flex items-center gap-1">
        Menu <ChevronDown size={16} />
      </button>
    </div>
  );
}`,
    },
  ],
};

const responsiveDesign: Section = {
  id: 'responsive-design',
  title: 'Responsive Design',
  description: 'Mobile-first approach with Tailwind breakpoints, container queries, fluid typography.',
  cards: [
    {
      title: 'Tailwind Breakpoints',
      description: 'Mobile-first breakpoints. Use sm:, md:, lg: prefixes.',
      code: `/* Default (mobile): 320px+
   sm: 640px
   md: 768px
   lg: 1024px
   xl: 1280px
   2xl: 1536px
*/

<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  Responsive grid
</div>`,
    },
    {
      title: 'Container Queries',
      description: 'Query parent container size instead of viewport. Better component encapsulation.',
      code: `@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

// In Tailwind
<div className="@container">
  <div className="@lg:grid @lg:grid-cols-2">
    Component adapts to container, not viewport
  </div>
</div>`,
    },
    {
      title: 'Fluid Typography',
      description: 'Scales text smoothly between viewport sizes using clamp().',
      code: `/* Font size scales from 18px at 320px to 32px at 1280px */
font-size: clamp(1.125rem, 2.5vw, 2rem);

/* Line height scales similarly */
line-height: clamp(1.5, 5vw, 1.8);

// Tailwind with clamp
className="text-[clamp(1.125rem,2.5vw,2rem)]"`,
    },
    {
      title: 'Next/Image',
      description: 'Optimized images with automatic format, size, and lazy loading.',
      code: `import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  responsive={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false}
  placeholder="blur"
/>`,
    },
    {
      title: 'Aspect Ratio',
      description: 'Maintain ratio across responsive sizes. Prevent layout shift.',
      code: `// Tailwind
<div className="aspect-video">
  <Image src="video-thumbnail.jpg" fill />
</div>

// CSS
.video-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}`,
    },
  ],
};

const animationMotion: Section = {
  id: 'animation-motion',
  title: 'Animation & Motion',
  description: 'Framer Motion for complex animations, View Transitions API, CSS animations, reduced motion.',
  cards: [
    {
      title: 'Framer Motion',
      description: 'Production animation library. Declarative API, springs, layouts, gestures.',
      code: `import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  Content fades in and slides up
</motion.div>

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive button
</motion.button>`,
    },
    {
      title: 'View Transitions API',
      description: 'Smooth transitions between DOM updates without JS animation code.',
      code: `'use client';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const router = useRouter();

const handleClick = () => {
  startTransition(() => {
    document.startViewTransition(() => {
      router.push('/new-page');
    });
  });
};`,
    },
    {
      title: 'CSS Animations',
      description: 'Native CSS for simple, performant animations. Use when no library needed.',
      code: `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* With Tailwind */
@layer utilities {
  @keyframes fadeIn { /* ... */ }
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
}`,
    },
    {
      title: 'prefers-reduced-motion',
      description: 'Respect user preference for reduced motion. Disable animations for accessibility.',
      code: `@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// In Framer Motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
/>`,
    },
  ],
};

const formsValidation: Section = {
  id: 'forms-validation',
  title: 'Forms & Validation',
  description: '4-layer validation: browser, client, server, database. React Hook Form + Zod.',
  cards: [
    {
      title: 'React Hook Form + Zod',
      description: 'Type-safe form handling with client-side validation schema.',
      code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
}`,
    },
    {
      title: 'Server Actions Forms',
      description: 'Form submission to Server Actions. Server validation, revalidation.',
      code: `'use server';
import { redirect } from 'next/navigation';

export async function createUser(formData: FormData) {
  const email = formData.get('email');
  const schema = z.object({ email: z.string().email() });

  try {
    const validated = schema.parse({ email });
    await db.users.create(validated);
    redirect('/users');
  } catch (error) {
    return { error: 'Invalid email' };
  }
}

// In Client Component
'use client';
import { createUser } from './actions';

export function NewUserForm() {
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    const result = await createUser(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={handleSubmit}>
      <input name="email" />
      {error && <p>{error}</p>}
      <button type="submit">Create</button>
    </form>
  );
}`,
    },
    {
      title: '4-Layer Validation',
      description: 'Browser (HTML), client (JS), server (Action), database (constraints).',
      code: `/* Layer 1: HTML */
<input type="email" required maxLength={100} />

/* Layer 2: Client Zod */
const schema = z.object({
  email: z.string().email().max(100),
});

/* Layer 3: Server Action */
export async function createUser(formData: FormData) {
  const validated = schema.parse(Object.fromEntries(formData));
  // Server action layer
}

/* Layer 4: Database */
CREATE TABLE users (
  email VARCHAR(100) NOT NULL UNIQUE,
  CHECK (email ~ '^[^@]+@[^@]+$')
);`,
    },
  ],
};

const testingStrategies: Section = {
  id: 'testing-strategies',
  title: 'Testing Strategies',
  description: 'Testing Trophy: 50% integration, 20% unit, 20% E2E, 8% visual, 2% perf. Vitest, Playwright, MSW.',
  cards: [
    {
      title: 'Testing Trophy Distribution',
      description: 'Invest most in integration tests. Balance unit and E2E. Small visual and perf budgets.',
      code: `50% Integration: Test components with dependencies
20% Unit: Test pure functions and custom hooks
20% E2E: Critical user journeys
8% Visual: Component appearance across browsers
2% Performance: Core Web Vitals targets`,
    },
    {
      title: 'Vitest',
      description: 'Fast unit and integration testing. Vite-native, great DX, React testing library integration.',
      code: `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});`,
    },
    {
      title: 'Playwright',
      description: 'E2E testing for critical user flows. Cross-browser testing, visual regression.',
      code: `import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});`,
    },
    {
      title: 'MSW (Mock Service Worker)',
      description: 'Intercept network requests in tests. Consistent mocking across unit and E2E tests.',
      code: `import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([{ id: 1, name: 'Alice' }]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`,
    },
  ],
};

const accessibility: Section = {
  id: 'accessibility',
  title: 'Accessibility (A11y)',
  description: 'WCAG 2.2 AA compliance. Keyboard navigation, color contrast, ARIA, screen reader testing.',
  cards: [
    {
      title: 'WCAG 2.2 AA',
      description: 'Industry standard. Minimum contrast 4.5:1 (text), all functionality keyboard accessible.',
      code: `/* Contrast Checker Target */
Foreground: #000 (black)
Background: #fff (white)
Ratio: 21:1 ✓ (AAA)

Foreground: #0066cc (blue)
Background: #fff (white)
Ratio: 8.6:1 ✓ (AAA)`,
    },
    {
      title: 'Keyboard Navigation',
      description: 'All interactive elements accessible via Tab key. Visible focus indicators.',
      code: `/* Focus indicator */
:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Tab order */
<div>
  <button>First (Tab 1)</button>
  <button>Second (Tab 2)</button>
  <a href="#">Third (Tab 3)</a>
</div>

/* Skip links for keyboard users */
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>`,
    },
    {
      title: 'ARIA Attributes',
      description: 'Semantic HTML first, ARIA when needed. aria-label, aria-live, roles.',
      code: `<!-- Dialog with proper ARIA -->
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  <h2 id="dialog-title">Confirm Action</h2>
  <p>Are you sure?</p>
  <button>Cancel</button>
  <button>Confirm</button>
</div>

<!-- Live region for updates -->
<div aria-live="polite" aria-atomic="true">
  {message}
</div>`,
    },
    {
      title: 'Screen Reader Testing',
      description: 'Test with NVDA, JAWS, VoiceOver. Verify heading structure, alt text, labels.',
      code: `<!-- Semantic HTML helps -->
<header>Header</header>
<main>
  <article>
    <h1>Article Title</h1>
    <img src="photo.jpg" alt="Descriptive alt text" />
  </article>
</main>
<footer>Footer</footer>

<!-- Form labels -->
<label htmlFor="email">Email:</label>
<input id="email" type="email" />`,
    },
    {
      title: 'Focus Management',
      description: 'Trap focus in modals, restore focus on close, announce dynamic changes.',
      code: `'use client';
import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const firstButton = modalRef.current?.querySelector('button');
      firstButton?.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null;
}`,
    },
  ],
};

const frontendSecurity: Section = {
  id: 'frontend-security',
  title: 'Frontend Security',
  description: 'XSS prevention, CSRF protection, clickjacking defense, CSP, env validation, HttpOnly cookies.',
  cards: [
    {
      title: 'XSS Prevention',
      description: 'Never use dangerouslySetInnerHTML. Sanitize user input with DOMPurify.',
      code: `import DOMPurify from 'dompurify';

// Bad - XSS vector
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Good - sanitize
<div>{DOMPurify.sanitize(userInput)}</div>

// Or better - don't use HTML
<div>{userInput}</div>`,
    },
    {
      title: 'CSRF Protection',
      description: 'Next.js handles CSRF tokens in Server Actions automatically.',
      code: `// Server Action automatically protected
'use server';
export async function updateProfile(formData: FormData) {
  // CSRF token validated by Next.js
  await db.users.update(userId, formData);
}`,
    },
    {
      title: 'Clickjacking Defense',
      description: 'Set X-Frame-Options header. Prevents embedding in iframes.',
      code: `// next.config.ts
export default {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ],
    },
  ],
};`,
    },
    {
      title: 'Content Security Policy',
      description: 'CSP header restricts resource loading. Prevents inline scripts.',
      code: `// next.config.ts
headers: [
  {
    source: '/:path*',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'nonce-{random}'; style-src 'self'",
      },
    ],
  },
],`,
    },
    {
      title: 'Environment Validation',
      description: 'Validate env vars at startup. Use next.js .env.local for secrets.',
      code: `import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  API_SECRET: z.string().min(1),
});

const env = envSchema.parse(process.env);`,
    },
    {
      title: 'HttpOnly Cookies',
      description: 'Auth tokens in HttpOnly cookies, inaccessible to JS. Prevents token theft.',
      code: `// Server Action setting auth
'use server';
import { cookies } from 'next/headers';

export async function login(email: string, password: string) {
  const token = await authenticate(email, password);

  (await cookies()).set('auth', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}`,
    },
  ],
};

const coreWebVitals: Section = {
  id: 'core-web-vitals',
  title: 'Core Web Vitals',
  description: 'FCP <1.5s, LCP <2.5s, INP <200ms, CLS <0.1, TTFB <600ms. FBT-specific targets.',
  cards: [
    {
      title: 'Largest Contentful Paint (LCP)',
      description: 'Time when largest content element renders. Target: <2.5s.',
      code: `// Strategies for LCP
1. Prioritize LCP element (image/heading)
2. Optimize image: use Next/Image, modern formats
3. Defer non-critical CSS/fonts
4. Use CDN for assets
5. Preload critical resources

<link rel="preload" as="image" href="/hero.jpg" />
<Image priority src="/hero.jpg" />`,
    },
    {
      title: 'Interaction to Next Paint (INP)',
      description: 'Responsiveness to user input. Target: <200ms.',
      code: `// Reduce long tasks with useTransition
'use client';
import { useTransition } from 'react';

export function SearchResults() {
  const [isPending, startTransition] = useTransition();

  const handleSearch = (query: string) => {
    startTransition(async () => {
      await searchResults(query);
    });
  };
}`,
    },
    {
      title: 'Cumulative Layout Shift (CLS)',
      description: 'Visual stability. Target: <0.1. Reserve space for lazy-loaded content.',
      code: `<!-- Use aspect-ratio to reserve space -->
<div className="aspect-video w-full bg-gray-100">
  <Image src="image.jpg" fill />
</div>

<!-- Or height attribute -->
<img src="image.jpg" height="400" width="600" />

<!-- Avoid inserting content that shifts layout -->
<Suspense fallback={<div className="h-20" />}>
  <SlowComponent />
</Suspense>`,
    },
    {
      title: 'First Contentful Paint (FCP)',
      description: 'First pixel painted. Target: <1.5s.',
      code: `// Improve FCP
1. Inline critical CSS
2. Avoid parser-blocking resources
3. Optimize fonts (system fonts preferred)
4. Minimize JS in <head>

/* Critical styles inline */
<style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

/* Async non-critical scripts */
<script async src="analytics.js" />`,
    },
    {
      title: 'Time to First Byte (TTFB)',
      description: 'Server response time. Target: <600ms. Depends on hosting, caching.',
      code: `// Improve TTFB
1. Use Edge runtime for low latency
2. Cache at CDN edge
3. Database optimization
4. Reduce payload

export const runtime = 'edge'; // Use Edge Runtime

export const revalidate = 3600; // Long cache TTL`,
    },
  ],
};

const optimization: Section = {
  id: 'optimization',
  title: 'Optimization',
  description: 'Code splitting, memoization, useTransition, virtual scrolling, image optimization.',
  cards: [
    {
      title: 'Code Splitting',
      description: 'Split bundles by route. Dynamic imports for heavy components.',
      code: `import dynamic from 'next/dynamic';

// Split by route automatically
export default function Dashboard() {
  return <DynamicChart />;
}

// Dynamic import for heavy component
const HeavyEditor = dynamic(() => import('./Editor'), {
  loading: () => <Spinner />,
  ssr: false, // If interactive-only
});`,
    },
    {
      title: 'Memoization',
      description: 'useMemo for expensive computations, React.memo for component renders.',
      code: `const expensiveValue = useMemo(
  () => complexCalculation(data),
  [data]
);

const MemoizedComponent = React.memo(function Item({ data }) {
  return <div>{data}</div>;
}, (prev, next) => prev.data === next.data);`,
    },
    {
      title: 'useTransition',
      description: 'Defer heavy state updates. Keep UI responsive.',
      code: `'use client';
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  startTransition(async () => {
    await fetchLargeList(e.target.value);
  });
};

return <>
  <input onChange={handleChange} />
  {isPending && <Spinner />}
</>;`,
    },
    {
      title: 'Virtual Scrolling',
      description: 'Render only visible list items. Scale to 100k+ items.',
      code: `import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={35}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>`,
    },
    {
      title: 'Image Optimization',
      description: 'Next/Image with modern formats, responsive sizes, lazy loading.',
      code: `<Image
  src="/photo.jpg"
  alt="Description"
  width={1200}
  height={800}
  responsive
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={75}
  placeholder="blur"
  blurDataURL="data:image/..."
/>`,
    },
    {
      title: 'Bundle Analysis',
      description: 'Analyze bundle size. Remove large dependencies.',
      code: `// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Run: ANALYZE=true npm run build`,
    },
  ],
};

const apiIntegration: Section = {
  id: 'api-integration',
  title: 'API Integration',
  description: 'API client layer, loading/error/empty states, infinite scroll, tRPC, MSW mocking.',
  cards: [
    {
      title: 'API Client Layer',
      description: 'Centralized client for all API calls. Type-safe, reusable.',
      code: `// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) throw new Error('API error');
  return response.json();
}

// Usage
const users = await apiCall<User[]>('/users');`,
    },
    {
      title: 'Loading/Error/Empty States',
      description: 'Handle all three states in component. Clear feedback to user.',
      code: `{isLoading && <Skeleton />}
{error && <ErrorBanner message={error.message} />}
{data?.length === 0 && <EmptyState />}
{data && <List items={data} />}`,
    },
    {
      title: 'Infinite Scroll',
      description: 'Load more items on scroll. useQuery with cursor-based pagination.',
      code: `const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) =>
      apiCall(\`/posts?cursor=\${pageParam}\`),
    getNextPageParam: (last) => last.nextCursor,
  });

// Use intersection observer for infinite scroll
<Sentinel
  onVisible={() => hasNextPage && fetchNextPage()}
/>`,
    },
    {
      title: 'tRPC',
      description: 'End-to-end type safety for API. Automatic type inference.',
      code: `// server/trpc.ts
export const router = t.router({
  posts: {
    list: t.procedure
      .query(async () => db.posts.findMany()),
    create: t.procedure
      .input(z.object({ title: z.string() }))
      .mutation(async ({ input }) => db.posts.create(input)),
  },
});

// Client
const posts = await trpc.posts.list.query();`,
    },
    {
      title: 'MSW for Mocking',
      description: 'Mock API responses in dev/test. Consistent across environments.',
      code: `// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users', () =>
    HttpResponse.json([{ id: 1, name: 'Alice' }])
  ),
];`,
    },
  ],
};

const seoMetadata: Section = {
  id: 'seo-metadata',
  title: 'SEO & Metadata',
  description: 'Next.js Metadata API, dynamic OG images, sitemap, structured data JSON-LD.',
  cards: [
    {
      title: 'Metadata API',
      description: 'Declare meta tags, OG images in page.tsx or layout.tsx.',
      code: `// app/posts/[id]/page.tsx
export async function generateMetadata({ params }) {
  const post = await db.posts.findUnique(params.id);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.ogImage }],
    },
  };
}`,
    },
    {
      title: 'Dynamic OG Images',
      description: 'Generate OG images at request time with Satori/Sharp.',
      code: `// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  return new ImageResponse(
    <div className="flex h-full w-full items-center justify-center bg-white">
      <h1>{title}</h1>
    </div>,
    { width: 1200, height: 630 }
  );
}`,
    },
    {
      title: 'Sitemap',
      description: 'Generate XML sitemap for search engines.',
      code: `// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await db.posts.findMany();

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...posts.map(post => ({
      url: \`https://example.com/posts/\${post.slug}\`,
      lastModified: post.updatedAt,
    })),
  ];
}`,
    },
    {
      title: 'Structured Data (JSON-LD)',
      description: 'Add JSON-LD for rich snippets in search results.',
      code: `// In page.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.ogImage,
      author: { '@type': 'Person', name: post.author },
      datePublished: post.publishedAt,
    }),
  }}
/>`,
    },
  ],
};

const buildTooling: Section = {
  id: 'build-tooling',
  title: 'Build Tooling',
  description: 'Turbopack, ESLint, Prettier, Husky, lint-staged, Turborepo for monorepos.',
  cards: [
    {
      title: 'Turbopack',
      description: 'Rust-based bundler. 10x faster than Webpack in next.config.ts.',
      code: `// next.config.ts
export default {
  experimental: {
    turbopack: {
      resolveAlias: {
        '@': './src',
      },
    },
  },
};`,
    },
    {
      title: 'ESLint',
      description: 'Next.js ESLint config catches common issues. Extend with plugins.',
      code: `// .eslintrc.json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-html-link-for-pages": "off"
  }
}`,
    },
    {
      title: 'Prettier',
      description: 'Code formatter. Integrated with ESLint for consistency.',
      code: `// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}`,
    },
    {
      title: 'Husky + lint-staged',
      description: 'Run linters on staged files before commit. Prevent bad code in repo.',
      code: `// .husky/pre-commit
npx lint-staged

// .lintstagedrc
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.css": ["prettier --write"]
}`,
    },
    {
      title: 'Turborepo',
      description: 'Monorepo orchestration. Cache builds/tests across packages.',
      code: `// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    }
  }
}`,
    },
  ],
};

const deployment: Section = {
  id: 'deployment',
  title: 'Deployment',
  description: 'Vercel, Edge Runtime, environment variables, atomic deployments, caching strategies.',
  cards: [
    {
      title: 'Vercel Deployment',
      description: 'Push to Git, auto-deploy preview and production. Zero-config.',
      code: `// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXT_PUBLIC_API_URL": "@api_url"
  }
}`,
    },
    {
      title: 'Edge Runtime',
      description: 'Run functions at edge. Low latency globally.',
      code: `// app/api/hello/route.ts
export const runtime = 'edge';

export async function GET() {
  return Response.json({ region: 'edge' });
}`,
    },
    {
      title: 'Environment Variables',
      description: 'Separate dev, preview, production configs.',
      code: `// .env.local (dev, never commit)
DATABASE_URL=postgres://localhost

// .env.production (commit, production secrets in Vercel UI)
NEXT_PUBLIC_API_URL=https://api.example.com`,
    },
    {
      title: 'Atomic Deployments',
      description: 'Deploy entire version at once. No mixed versions during deploy.',
      code: `// Vercel handles atomicity automatically
- Old deployment runs until new fully ready
- Switch happens instantly
- Zero downtime`,
    },
    {
      title: 'Caching Strategies',
      description: 'Cache at CDN, browser, server. Maximize hit rates.',
      code: `// next.config.ts
headers: [
  {
    source: '/static/(.*)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000' }, // 1 year
    ],
  },
  {
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
    ],
  },
],`,
    },
  ],
};

const fbtStandards: Section = {
  id: 'fbt-standards',
  title: 'FBT Standards',
  description: 'Non-negotiable checklist, project structure, tech stack mandates for all FBT projects.',
  cards: [
    {
      title: 'Non-Negotiable Checklist',
      description: 'All FBT projects must include these.',
      code: `✓ TypeScript strict mode
✓ ESLint + Prettier configured
✓ React Query v5 for server state
✓ Zustand for client state
✓ Tailwind CSS v4 + shadcn/ui
✓ Next.js 15 App Router
✓ Vitest + Playwright setup
✓ Accessible components (WCAG 2.2 AA)
✓ 4-layer form validation
✓ SEO metadata configuration
✓ Error boundaries and error pages
✓ Environment variable validation`,
    },
    {
      title: 'Project Structure',
      description: 'Standard folder layout for consistency.',
      code: `app/
├── page.tsx
├── layout.tsx
├── error.tsx
└── (auth)/
    └── login/
        └── page.tsx

src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── hooks/
├── lib/
│   ├── api.ts
│   └── db.ts
├── types/
└── utils/

tests/
├── unit/
└── e2e/`,
    },
    {
      title: 'Tech Stack Mandates',
      description: 'Approved technologies. No alternatives without approval.',
      code: `Runtime: Node.js 18+
Framework: Next.js 15 (App Router)
React: React 19
Language: TypeScript 5+ (strict mode)
Styling: Tailwind CSS v4
Components: shadcn/ui
State: Zustand + React Query v5
Forms: React Hook Form + Zod
Database: PostgreSQL (Prisma/Drizzle)
Auth: NextAuth.js or Clerk
Testing: Vitest + Playwright + MSW
Deployment: Vercel
Monitoring: Sentry + PostHog`,
    },
    {
      title: 'Performance Budgets',
      description: 'FBT-specific Core Web Vitals targets.',
      code: `LCP: < 2.5s (yellow: 2.5-4s, red: >4s)
INP: < 200ms (yellow: 200-500ms, red: >500ms)
CLS: < 0.1 (yellow: 0.1-0.25, red: >0.25)
FCP: < 1.5s
TTFB: < 600ms
JS Bundle: < 200KB (gzipped)
Total Page Size: < 1.5MB (images included)`,
    },
  ],
};

export const frontendSections: Section[] = [
  {
    id: 'core-principles',
    title: 'Core Principles',
    description:
      'SOLID applied to frontend development. DRY, KISS, YAGNI, SoC, LoD minimize complexity. Composition over inheritance, colocation improve maintainability.',
    principles: corePrinciples,
  },
  {
    id: 'typescript-standards',
    title: 'TypeScript Standards',
    description:
      'Strict mode enabled. No implicit any. Use discriminated unions for exhaustive checking. Leverage generics and utility types for reusable, type-safe abstractions.',
    cards: typescriptCards,
  },
  {
    id: 'paradigms',
    title: 'Programming Paradigms',
    description:
      'Functional programming with pure functions and immutability. Reactive patterns for automatic state updates. Component-driven development with declarative UI.',
    cards: paradigmCards,
  },
  {
    id: 'component-architecture',
    title: 'Component Architecture',
    description:
      'Atomic Design for hierarchy. Islands Architecture for progressive enhancement. Compound Components for flexible APIs. Composition patterns maximize reusability.',
    cards: componentArchCards,
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    description:
      'Proven patterns for React development. Compound Components, Custom Hooks, Render Props, HOCs, Headless Components, Provider Pattern. Hooks generally preferred over HOCs.',
    cards: designPatternCards,
  },
  {
    id: 'state-management',
    title: 'State Management',
    description:
      'Zustand for client state. React Query v5 for server state. Jotai for atomic state. useReducer+Context for medium complexity. Clear separation of concerns.',
    cards: stateManagementCards,
  },
  {
    id: 'nextjs-app-router',
    title: 'Next.js 15 App Router',
    description:
      'File-based routing with page.tsx, layout.tsx, loading.tsx, error.tsx. Special files for conventions. Automatic code splitting and optimizations.',
    cards: nextjsRouterCards,
  },
  rscServerActions,
  routingPatterns,
  {
    id: 'data-fetching',
    title: 'Data Fetching Strategies',
    description:
      'SSR for dynamic content, SSG for static pages, ISR for hybrid approach. CSR for client-specific data. Streaming with Suspense. On-demand revalidation for cache control.',
    cards: dataFetchingCards,
  },
  {
    id: 'styling-approaches',
    title: 'Styling Approaches',
    description:
      'Tailwind v4 as default. CSS Modules for scoped styles. vanilla-extract for type-safe CSS. CVA for component variants. Custom properties for theming.',
    cards: stylingCards,
  },
  designSystem,
  responsiveDesign,
  animationMotion,
  formsValidation,
  testingStrategies,
  accessibility,
  frontendSecurity,
  coreWebVitals,
  optimization,
  apiIntegration,
  seoMetadata,
  buildTooling,
  deployment,
  fbtStandards,
];

export const frontendHero: HeroData = {
  title: 'FRONTEND DEVELOPMENT',
  subtitle: 'MASTER REFERENCE',
  description:
    'Comprehensive reference for modern frontend development. Next.js 15, React 19, TypeScript, Tailwind, and best practices for scalable, performant, accessible applications.',
  stats: [
    { value: '25', label: 'SECTIONS' },
    { value: '120+', label: 'TECHNIQUES' },
    { value: '60+', label: 'STANDARDS' },
    { value: 'React 19', label: 'FRAMEWORK' },
  ],
  tags: [
    'Next.js 15',
    'React 19',
    'TypeScript 5',
    'Tailwind v4',
    'shadcn/ui',
    'Zustand',
    'Vitest',
    'Playwright',
  ],
};
