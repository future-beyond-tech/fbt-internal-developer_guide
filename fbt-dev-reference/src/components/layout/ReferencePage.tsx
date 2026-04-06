'use client';

import { useState, useMemo } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SectionRenderer } from './SectionRenderer';
import { SearchModal } from '../ui/SearchModal';
import { ProgressBar } from '../ui/ProgressBar';
import type { Section } from '@/data/backend';

interface NavItem {
  id?: string;
  title?: string;
  label?: string;
  href?: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface HeroStat {
  value: string;
  label: string;
}

interface HeroData {
  title: string;
  subtitle?: string;
  description: string;
  stats: HeroStat[];
  tags?: string[];
}

interface ReferencePageProps {
  nav: NavSection[];
  sections: Section[];
  hero: HeroData;
  variant: 'backend' | 'frontend';
}

export function ReferencePage({ nav, sections, hero, variant }: ReferencePageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchItems = useMemo(() => {
    const items: { title: string; section: string; href: string; description?: string }[] = [];
    sections.forEach((s) => {
      items.push({
        title: s.title,
        section: variant === 'backend' ? 'Backend' : 'Frontend',
        href: `/${variant}#${s.id}`,
        description: s.description,
      });
      if (s.cards) {
        s.cards.forEach((c) => {
          items.push({
            title: c.title,
            section: s.title,
            href: `/${variant}#${s.id}`,
            description: c.description,
          });
        });
      }
      if (s.patternGroups) {
        s.patternGroups.forEach((g) => {
          g.patterns.forEach((p) => {
            items.push({
              title: p.name,
              section: g.title,
              href: `/${variant}#${s.id}`,
              description: p.description,
            });
          });
        });
      }
    });
    return items;
  }, [sections, variant]);

  const isFrontend = variant === 'frontend';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)' }}>
      <ProgressBar />
      <SearchModal items={searchItems} />
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
        <Sidebar nav={nav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="ref-main">
          {/* Hero */}
          <div style={{
            position: 'relative',
            background: 'var(--deep)',
            borderBottom: '1px solid var(--border)',
            padding: '48px 52px 44px',
            overflow: 'hidden',
          }}>
            {/* Grid bg */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
            }} />
            {/* Glow */}
            <div style={{
              position: 'absolute',
              top: '-80px',
              left: '-80px',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(81,43,212,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              right: '80px',
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, ${isFrontend ? 'rgba(0,229,204,0.12)' : 'rgba(81,43,212,0.15)'} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Eyebrow */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#00E5CC',
              textTransform: 'uppercase',
              marginBottom: '14px',
              position: 'relative',
            }}>
              ▸ {variant === 'backend' ? 'Backend Master Reference' : 'Frontend Master Reference'}
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '56px',
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              position: 'relative',
              marginBottom: '20px',
            }}>
              <span style={{ display: 'block', color: 'var(--t1)' }}>{hero.title}</span>
              {hero.subtitle && (
                <span style={{
                  display: 'block',
                  WebkitTextStroke: '1px #7C4DFF',
                  color: 'transparent',
                }}>
                  {hero.subtitle}
                </span>
              )}
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              color: 'var(--t2)',
              maxWidth: '560px',
              lineHeight: 1.7,
              position: 'relative',
              marginBottom: '32px',
            }}>
              {hero.description}
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 0, position: 'relative' }}>
              {hero.stats.map((stat, i) => (
                <div key={i} style={{
                  padding: '16px 28px',
                  border: '1px solid var(--border)',
                  borderRight: i < hero.stats.length - 1 ? 'none' : '1px solid var(--border)',
                  borderRadius: i === 0 ? '6px 0 0 6px' : i === hero.stats.length - 1 ? '0 6px 6px 0' : '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '36px',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                    color: '#7C4DFF',
                  }}>
                    {stat.value}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--t3)',
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {hero.tags && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '24px',
                position: 'relative',
              }}>
                {hero.tags.map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    padding: '3px 9px',
                    borderRadius: '2px',
                    border: i < 3 ? '1px solid rgba(124,77,255,0.4)' : '1px solid var(--border)',
                    color: i < 3 ? '#7C4DFF' : 'var(--t3)',
                    background: i < 3 ? 'rgba(124,77,255,0.08)' : 'transparent',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '44px 52px 80px' }}>
            {sections.map((section) => (
              <SectionRenderer key={section.id} section={section} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
