'use client';

import Link from 'next/link';

const mono = "'JetBrains Mono', monospace";
const display = "'Bebas Neue', sans-serif";

interface HubCard {
  href: string;
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  description: string;
  stats: { v: string; l: string }[];
  statColor: string;
  gradient: string;
  glow: string;
  hoverBorder: string;
  tags: { label: string; bg: string; color: string; border: string }[];
}

const referenceCards: HubCard[] = [
  {
    href: '/backend',
    eyebrow: 'Backend Reference',
    eyebrowColor: '#7C4DFF',
    title: 'BACKEND DEVELOPMENT',
    description: '.NET, Python, Rust — patterns, architecture, CQRS, security, testing, deployment, and 80+ documented approaches.',
    stats: [{ v: '21', l: 'Sections' }, { v: '80+', l: 'Patterns' }, { v: '3', l: 'Languages' }],
    statColor: '#7C4DFF',
    gradient: 'linear-gradient(90deg, #512BD4, #7C4DFF, #512BD4)',
    glow: 'radial-gradient(circle, rgba(81,43,212,0.1) 0%, transparent 70%)',
    hoverBorder: 'rgba(124,77,255,0.4)',
    tags: [
      { label: '.NET', bg: 'rgba(81,43,212,0.3)', color: '#9B72FF', border: 'rgba(81,43,212,0.5)' },
      { label: 'PYTHON', bg: 'rgba(255,176,32,0.12)', color: '#FFB020', border: 'rgba(255,176,32,0.3)' },
      { label: 'RUST', bg: 'rgba(255,64,96,0.12)', color: '#FF6080', border: 'rgba(255,64,96,0.3)' },
    ],
  },
  {
    href: '/frontend',
    eyebrow: 'Frontend Reference',
    eyebrowColor: '#00E5CC',
    title: 'FRONTEND DEVELOPMENT',
    description: 'React 19, Next.js 15, TypeScript 5, Tailwind v4 — components, state, routing, testing, and 120+ techniques.',
    stats: [{ v: '25', l: 'Sections' }, { v: '120+', l: 'Techniques' }, { v: '60+', l: 'Standards' }],
    statColor: '#00E5CC',
    gradient: 'linear-gradient(90deg, #00A896, #00E5CC, #00A896)',
    glow: 'radial-gradient(circle, rgba(0,229,204,0.08) 0%, transparent 70%)',
    hoverBorder: 'rgba(0,229,204,0.3)',
    tags: [
      { label: 'REACT 19', bg: 'rgba(56,189,248,0.12)', color: '#38BDF8', border: 'rgba(56,189,248,0.3)' },
      { label: 'NEXT.JS 15', bg: 'rgba(255,255,255,0.06)', color: '#BBBBDD', border: 'rgba(255,255,255,0.1)' },
      { label: 'TYPESCRIPT 5', bg: 'rgba(81,43,212,0.25)', color: '#7C4DFF', border: 'rgba(124,77,255,0.5)' },
    ],
  },
  {
    href: '/system-design',
    eyebrow: 'System Design Intelligence',
    eyebrowColor: '#39FF14',
    title: 'SYSTEM DESIGN',
    description: 'Distributed systems, scalability, reliability, data storage, communication patterns — 95+ concepts mapped to FBT products.',
    stats: [{ v: '11', l: 'Modules' }, { v: '95+', l: 'Concepts' }, { v: '18', l: 'Designs' }],
    statColor: '#39FF14',
    gradient: 'linear-gradient(90deg, #1A5E0A, #39FF14, #1A5E0A)',
    glow: 'radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)',
    hoverBorder: 'rgba(57,255,20,0.3)',
    tags: [
      { label: 'CAP THEOREM', bg: 'rgba(57,255,20,0.1)', color: '#39FF14', border: 'rgba(57,255,20,0.25)' },
      { label: 'SCALABILITY', bg: 'rgba(0,245,255,0.08)', color: '#00F5FF', border: 'rgba(0,245,255,0.2)' },
      { label: 'RESILIENCE', bg: 'rgba(255,176,32,0.1)', color: '#FFB020', border: 'rgba(255,176,32,0.25)' },
    ],
  },
  {
    href: '/plugin-architecture',
    eyebrow: 'Plugin Architecture Analysis',
    eyebrowColor: '#C9872A',
    title: 'PLUGIN ARCHITECTURE',
    description: 'Deep-dive analysis of plugin patterns applied to RentFlow, Zentra, CatchMoment, and FIROSE — with code examples and roadmaps.',
    stats: [{ v: '8', l: 'Sections' }, { v: '7', l: 'Concepts' }, { v: '4', l: 'Projects' }],
    statColor: '#C9872A',
    gradient: 'linear-gradient(90deg, #8B5E1A, #C9872A, #8B5E1A)',
    glow: 'radial-gradient(circle, rgba(201,135,42,0.08) 0%, transparent 70%)',
    hoverBorder: 'rgba(201,135,42,0.35)',
    tags: [
      { label: 'HOST API', bg: 'rgba(201,135,42,0.12)', color: '#C9872A', border: 'rgba(201,135,42,0.3)' },
      { label: 'LIFECYCLE', bg: 'rgba(81,43,212,0.1)', color: '#7C52FF', border: 'rgba(81,43,212,0.25)' },
      { label: 'LAZY LOAD', bg: 'rgba(255,255,255,0.05)', color: '#888', border: 'rgba(255,255,255,0.1)' },
    ],
  },
];

interface ToolCard {
  href: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
  accentDim: string;
  hoverBorder: string;
}

const toolCards: ToolCard[] = [
  {
    href: '/tools/cowork',
    icon: '⚡',
    title: 'COWORK COMMAND CENTER',
    description: 'Universal Claude Code orchestration — select product, mode, inject context, and generate production-ready prompts.',
    accent: '#7C4DFF',
    accentDim: 'rgba(124,77,255,0.1)',
    hoverBorder: 'rgba(124,77,255,0.4)',
  },
  {
    href: '/tools/ux-prompt',
    icon: '🎨',
    title: 'UX PROMPT BUILDER',
    description: 'Next.js UX-first prompt generator with 20 psychology laws, 9 product goals, and real-time quality scoring.',
    accent: '#FFB020',
    accentDim: 'rgba(255,176,32,0.1)',
    hoverBorder: 'rgba(255,176,32,0.35)',
  },
  {
    href: '/tools/kickoff',
    icon: '🚀',
    title: 'PROJECT KICKOFF',
    description: 'Bootstrap any new FBT project with one prompt — scaffolds stack, architecture, CI/CD, and engineering standards.',
    accent: '#00E5CC',
    accentDim: 'rgba(0,229,204,0.1)',
    hoverBorder: 'rgba(0,229,204,0.35)',
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        height: '52px',
        background: 'rgba(5,5,15,0.95)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '14px',
      }}>
        <span style={{ fontFamily: display, fontSize: '22px', letterSpacing: '0.12em', color: '#00E5CC', textShadow: '0 0 20px rgba(0,229,204,0.5)' }}>
          FBT<em style={{ color: '#7C4DFF', fontStyle: 'normal' }}> PARTNER</em>
        </span>
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
        <span style={{ fontFamily: mono, fontSize: '10.5px', color: 'var(--t3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Developer Hub
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          {[
            { label: '4 REFERENCES', color: '#7C4DFF' },
            { label: '3 TOOLS', color: '#00E5CC' },
          ].map((b, i) => (
            <span key={i} style={{ fontFamily: mono, fontSize: '8px', padding: '2px 8px', borderRadius: '2px', background: `${b.color}15`, color: b.color, border: `1px solid ${b.color}40`, letterSpacing: '0.08em' }}>{b.label}</span>
          ))}
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: '40px 20px 80px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '56px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(circle, rgba(81,43,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.3em', color: '#00E5CC', textTransform: 'uppercase', marginBottom: '20px', position: 'relative' }}>
            ▸ Complete Development Knowledge Base
          </div>
          <h1 style={{ fontFamily: display, fontSize: '72px', lineHeight: 0.92, letterSpacing: '0.04em', marginBottom: '24px', position: 'relative' }}>
            <span style={{ display: 'block', color: 'var(--t1)' }}>FBT PARTNER</span>
            <span style={{ display: 'block', WebkitTextStroke: '1.5px #7C4DFF', color: 'transparent' }}>DEVELOPER</span>
            <span style={{ display: 'block', color: '#00E5CC', textShadow: '0 0 30px rgba(0,229,204,0.4)' }}>HUB</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--t2)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
            Every principle, pattern, architecture, and tool for building production-grade systems — 4 reference guides, 3 interactive tools, all FBT-grade.
          </p>
        </div>

        {/* Section: References */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
            Reference Guides
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {referenceCards.map((card, idx) => (
              <Link key={idx} href={card.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'pointer',
                  height: '100%',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = card.hoverBorder; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: card.gradient }} />
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: card.glow, pointerEvents: 'none' }} />
                  <div style={{ fontFamily: mono, fontSize: '8.5px', letterSpacing: '0.18em', color: card.eyebrowColor, textTransform: 'uppercase', marginBottom: '10px' }}>
                    {card.eyebrow}
                  </div>
                  <h2 style={{ fontFamily: display, fontSize: '28px', letterSpacing: '0.04em', color: 'var(--t1)', marginBottom: '8px', lineHeight: 1 }}>
                    {card.title}
                  </h2>
                  <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {card.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                    {card.stats.map((s, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: display, fontSize: '22px', color: card.statColor, lineHeight: 1 }}>{s.v}</div>
                        <div style={{ fontFamily: mono, fontSize: '7.5px', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {card.tags.map((t, i) => (
                      <span key={i} style={{ fontFamily: mono, fontSize: '8px', padding: '2px 7px', borderRadius: '2px', background: t.bg, color: t.color, border: `1px solid ${t.border}` }}>{t.label}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Interactive Tools */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
            Interactive Tools
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {toolCards.map((tool, idx) => (
              <Link key={idx} href={tool.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'pointer',
                  height: '100%',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = tool.hoverBorder; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: tool.accent }} />
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{tool.icon}</div>
                  <div style={{ fontFamily: mono, fontSize: '8.5px', letterSpacing: '0.18em', color: tool.accent, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Interactive Tool
                  </div>
                  <h3 style={{ fontFamily: display, fontSize: '24px', letterSpacing: '0.04em', color: 'var(--t1)', marginBottom: '8px', lineHeight: 1 }}>
                    {tool.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6 }}>
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {[
              { icon: '⌘K', label: 'Quick Search' },
              { icon: '📋', label: 'Copy Code' },
              { icon: '🔖', label: 'Bookmarkable' },
              { icon: '📱', label: 'Responsive' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px' }}>{f.icon}</span>
                <span style={{ fontFamily: mono, fontSize: '9px', color: 'var(--t3)', letterSpacing: '0.06em' }}>{f.label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: mono, fontSize: '9px', color: 'var(--t4)', letterSpacing: '0.1em' }}>
            Built with Next.js 15 · TypeScript · Tailwind CSS · FBT Standards
          </p>
        </div>
      </main>
    </div>
  );
}
