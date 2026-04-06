'use client';

import Link from 'next/link';

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
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '22px',
          letterSpacing: '0.12em',
          color: '#00E5CC',
          textShadow: '0 0 20px rgba(0,229,204,0.5)',
        }}>
          FBT<em style={{ color: '#7C4DFF', fontStyle: 'normal' }}> PARTNER</em>
        </span>
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10.5px',
          color: 'var(--t3)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}>
          Developer Reference
        </span>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', width: '100%' }}>
          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '64px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(circle, rgba(81,43,212,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#00E5CC',
              textTransform: 'uppercase',
              marginBottom: '20px',
              position: 'relative',
            }}>
              ▸ Complete Development Knowledge Base
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '80px',
              lineHeight: 0.92,
              letterSpacing: '0.04em',
              marginBottom: '24px',
              position: 'relative',
            }}>
              <span style={{ display: 'block', color: 'var(--t1)' }}>FBT PARTNER</span>
              <span style={{ display: 'block', WebkitTextStroke: '1.5px #7C4DFF', color: 'transparent' }}>DEVELOPER</span>
              <span style={{ display: 'block', color: '#00E5CC', textShadow: '0 0 30px rgba(0,229,204,0.4)' }}>REFERENCE</span>
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'var(--t2)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
              position: 'relative',
            }}>
              Every principle, pattern, standard, and technique for building production-grade systems — structured, searchable, and FBT-grade.
            </p>
          </div>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
            {/* Backend Card */}
            <Link href="/backend" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,77,255,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #512BD4, #7C4DFF, #512BD4)' }} />
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(81,43,212,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  color: '#7C4DFF',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>
                  Backend Reference
                </div>

                <h2 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '36px',
                  letterSpacing: '0.04em',
                  color: 'var(--t1)',
                  marginBottom: '12px',
                }}>
                  BACKEND DEVELOPMENT
                </h2>

                <p style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.7, marginBottom: '24px' }}>
                  .NET, Python, Rust — patterns, architecture, CQRS, security, testing, deployment, and 80+ documented approaches.
                </p>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  {[
                    { v: '21', l: 'Sections' },
                    { v: '80+', l: 'Patterns' },
                    { v: '3', l: 'Languages' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#7C4DFF', lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(81,43,212,0.3)', color: '#9B72FF', border: '1px solid rgba(81,43,212,0.5)' }}>.NET</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(255,176,32,0.12)', color: '#FFB020', border: '1px solid rgba(255,176,32,0.3)' }}>PYTHON</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(255,64,96,0.12)', color: '#FF6080', border: '1px solid rgba(255,64,96,0.3)' }}>RUST</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)', color: 'var(--t3)', border: '1px solid var(--border)' }}>CLEAN ARCH</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)', color: 'var(--t3)', border: '1px solid var(--border)' }}>CQRS</span>
                </div>
              </div>
            </Link>

            {/* Frontend Card */}
            <Link href="/frontend" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,204,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #00A896, #00E5CC, #00A896)' }} />
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(0,229,204,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  color: '#00E5CC',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>
                  Frontend Reference
                </div>

                <h2 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '36px',
                  letterSpacing: '0.04em',
                  color: 'var(--t1)',
                  marginBottom: '12px',
                }}>
                  FRONTEND DEVELOPMENT
                </h2>

                <p style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.7, marginBottom: '24px' }}>
                  React 19, Next.js 15, TypeScript 5, Tailwind v4 — components, state, routing, testing, performance, and 120+ techniques.
                </p>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  {[
                    { v: '25', l: 'Sections' },
                    { v: '120+', l: 'Techniques' },
                    { v: '60+', l: 'Standards' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#00E5CC', lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(56,189,248,0.12)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.3)' }}>REACT 19</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', color: 'var(--t2)', border: '1px solid var(--border)' }}>NEXT.JS 15</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(81,43,212,0.25)', color: '#7C4DFF', border: '1px solid rgba(124,77,255,0.5)' }}>TYPESCRIPT 5</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', padding: '3px 8px', borderRadius: '2px', background: 'rgba(0,229,204,0.12)', color: '#00E5CC', border: '1px solid rgba(0,229,204,0.25)' }}>TAILWIND V4</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {[
                { icon: '⌘K', label: 'Quick Search' },
                { icon: '📋', label: 'Copy Code' },
                { icon: '🔖', label: 'Bookmarkable' },
                { icon: '📱', label: 'Responsive' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px' }}>{f.icon}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--t3)', letterSpacing: '0.06em' }}>{f.label}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--t4)', letterSpacing: '0.1em' }}>
              Built with Next.js 15 · TypeScript · Tailwind CSS · FBT Standards
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
