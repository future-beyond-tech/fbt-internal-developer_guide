'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import {
  techniqueDomains,
  TECHNIQUE_TAGS,
  getMapStats,
  type TagFilter,
  type TechniqueDomain,
  type TechniqueItem,
} from '@/data/backend-techniques-map';

const mono = "'JetBrains Mono', monospace";
const display = "'Bebas Neue', sans-serif";
const sans = "'Instrument Sans', sans-serif";

export default function TechniquesMapPage() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<TagFilter>('All');
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());

  const stats = useMemo(() => getMapStats(), []);

  const filteredDomains = useMemo(() => {
    const q = search.toLowerCase();
    return techniqueDomains
      .map(domain => {
        const tagMatch = activeTag === 'All' || domain.tag === activeTag;
        if (!tagMatch) return null;
        const matchedItems = domain.items.filter(
          item =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            domain.label.toLowerCase().includes(q)
        );
        if (matchedItems.length === 0) return null;
        return { ...domain, items: matchedItems };
      })
      .filter(Boolean) as TechniqueDomain[];
  }, [search, activeTag]);

  const visibleCount = filteredDomains.reduce((sum, d) => sum + d.items.length, 0);

  function toggleDomain(id: string) {
    setExpandedDomains(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandAll() {
    setExpandedDomains(new Set(filteredDomains.map(d => d.id)));
  }

  function collapseAll() {
    setExpandedDomains(new Set());
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)', color: 'var(--t1)' }}>
      {/* ── Header bar ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 200,
          height: '56px',
          background: 'var(--header-bg)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--header-border)',
          boxShadow: 'var(--header-shadow)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontFamily: display, fontSize: '24px', letterSpacing: '0.12em', color: 'var(--cyan)' }}>
            FBT<em style={{ color: 'var(--fbt-hi)', fontStyle: 'normal' }}> P</em>
          </span>
        </Link>
        <div style={{ width: '1px', height: '24px', background: 'var(--border)', flexShrink: 0 }} />
        <Link
          href="/backend"
          style={{
            fontFamily: mono,
            fontSize: '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: 'var(--t3)',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
        >
          ← Back to Deep Reference
        </Link>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: mono, fontSize: '10px', color: 'var(--fbt-hi)', letterSpacing: '0.1em' }}>
          TECHNIQUE MAP
        </span>
      </header>

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              fontFamily: display,
              fontSize: '48px',
              letterSpacing: '0.08em',
              color: 'var(--t1)',
              lineHeight: 1.1,
            }}
          >
            BACKEND TECHNIQUES
          </h1>
          <p
            style={{
              fontFamily: mono,
              fontSize: '11px',
              color: 'var(--fbt-hi)',
              letterSpacing: '0.14em',
              marginTop: '6px',
              textTransform: 'uppercase' as const,
            }}
          >
            COMPLETE MASTER MAP
          </p>
          <p style={{ fontFamily: sans, fontSize: '14px', color: 'var(--t3)', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
            {stats.domains} domains · {stats.totalTechniques} techniques · {stats.coveragePercent}% linked to deep reference
          </p>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { value: stats.domains, label: 'DOMAINS', color: 'var(--fbt-hi)' },
            { value: stats.totalTechniques, label: 'TECHNIQUES', color: 'var(--cyan)' },
            { value: stats.coveredTechniques, label: 'DEEP REF', color: 'var(--green)' },
            { value: stats.gapTechniques, label: 'TO EXPAND', color: 'var(--amber)' },
          ].map(s => (
            <div
              key={s.label}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '12px 20px',
                textAlign: 'center',
                minWidth: '100px',
                flex: '1 1 100px',
              }}
            >
              <div style={{ fontFamily: display, fontSize: '28px', color: s.color, letterSpacing: '0.04em' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: mono, fontSize: '9px', color: 'var(--t4)', letterSpacing: '0.12em', marginTop: '2px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Search ── */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search any technique..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid var(--input-border)',
              background: 'var(--input-bg)',
              color: 'var(--t1)',
              fontFamily: sans,
              fontSize: '13px',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--input-focus-border)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--input-border)')}
          />
        </div>

        {/* ── Tag filters ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {TECHNIQUE_TAGS.map(tag => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontFamily: mono,
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--border-hi)' : '1px solid var(--border)',
                  background: isActive ? 'rgba(var(--fbt-hi-rgb),0.15)' : 'var(--card)',
                  color: isActive ? 'var(--fbt-hi)' : 'var(--t3)',
                  transition: 'all 0.15s',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* ── Expand/Collapse + count ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontFamily: mono, fontSize: '10px', color: 'var(--t4)', letterSpacing: '0.08em' }}>
            {visibleCount} TECHNIQUES · {filteredDomains.length} DOMAINS
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={expandAll}
              style={{
                fontFamily: mono,
                fontSize: '9px',
                letterSpacing: '0.08em',
                color: 'var(--t3)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase' as const,
              }}
            >
              Expand all
            </button>
            <span style={{ color: 'var(--t4)' }}>·</span>
            <button
              onClick={collapseAll}
              style={{
                fontFamily: mono,
                fontSize: '9px',
                letterSpacing: '0.08em',
                color: 'var(--t3)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase' as const,
              }}
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* ── Domain grid ── */}
        {filteredDomains.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--t4)', fontFamily: sans, fontSize: '14px' }}>
            No techniques match. Try a different search or filter.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '12px' }}>
            {filteredDomains.map(domain => {
              const isExpanded = expandedDomains.has(domain.id);
              return (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  isExpanded={isExpanded}
                  onToggle={() => toggleDomain(domain.id)}
                />
              );
            })}
          </div>
        )}

        {/* ── Coverage legend ── */}
        <div
          style={{
            marginTop: '40px',
            padding: '16px 20px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontFamily: mono, fontSize: '10px', color: 'var(--t3)', letterSpacing: '0.1em', marginBottom: '10px', textTransform: 'uppercase' as const }}>
            COVERAGE LEGEND
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              <span style={{ fontFamily: sans, fontSize: '12px', color: 'var(--t2)' }}>
                Linked to deep reference — click to jump
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontFamily: sans, fontSize: '12px', color: 'var(--t2)' }}>
                Gap — not yet in deep reference (expansion opportunity)
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Domain card component ──
function DomainCard({
  domain,
  isExpanded,
  onToggle,
}: {
  domain: TechniqueDomain;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const coveredCount = domain.items.filter(i => i.deepRefId !== null).length;
  const coveragePct = Math.round((coveredCount / domain.items.length) * 100);

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'border-color 0.15s',
        background: 'var(--panel)',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--hover-border)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Card header */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 14px',
          cursor: 'pointer',
          userSelect: 'none',
          background: 'var(--card)',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0,
            background: domain.bg,
            border: `1px solid ${domain.color}22`,
          }}
        >
          {domain.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--t1)' }}>
            {domain.label}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--t4)', letterSpacing: '0.08em', marginTop: '1px' }}>
            {coveragePct}% COVERED
          </div>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'var(--t3)',
            background: 'var(--raised)',
            padding: '2px 8px',
            borderRadius: '10px',
          }}
        >
          {domain.items.length}
        </span>
        <span
          style={{
            color: 'var(--t4)',
            fontSize: '11px',
            transition: 'transform 0.2s',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </div>

      {/* Coverage bar */}
      <div style={{ height: '2px', background: 'var(--border)' }}>
        <div
          style={{
            height: '2px',
            width: `${coveragePct}%`,
            background: `linear-gradient(90deg, ${domain.color}, ${domain.color}88)`,
            transition: 'width 0.3s',
          }}
        />
      </div>

      {/* Items list */}
      {isExpanded && (
        <div style={{ padding: '6px 14px 12px' }}>
          {domain.items.map((item, i) => (
            <TechniqueRow key={i} item={item} color={domain.color} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Individual technique row ──
function TechniqueRow({ item, color }: { item: TechniqueItem; color: string }) {
  const hasDeepRef = item.deepRefId !== null;
  const dotColor = hasDeepRef ? 'var(--green)' : 'var(--amber)';

  const content = (
    <div
      style={{
        fontSize: '12px',
        color: 'var(--t2)',
        padding: '5px 0',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        cursor: hasDeepRef ? 'pointer' : 'default',
        transition: 'color 0.1s',
      }}
      onMouseEnter={e => { if (hasDeepRef) e.currentTarget.style.color = 'var(--t1)'; }}
      onMouseLeave={e => { if (hasDeepRef) e.currentTarget.style.color = 'var(--t2)'; }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          flexShrink: 0,
          marginTop: '5px',
          background: dotColor,
          boxShadow: hasDeepRef ? `0 0 6px ${dotColor}` : 'none',
        }}
      />
      <span style={{ flex: 1 }}>
        <strong style={{ fontWeight: 500, color: 'var(--t1)', fontFamily: "'Instrument Sans', sans-serif" }}>
          {item.name}
        </strong>
        <span style={{ color: 'var(--t3)' }}> — {item.description}</span>
      </span>
      {hasDeepRef && (
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px',
            padding: '1px 6px',
            borderRadius: '4px',
            background: 'rgba(var(--green-rgb),0.12)',
            color: 'var(--green)',
            border: '1px solid rgba(var(--green-rgb),0.2)',
            whiteSpace: 'nowrap',
          }}
        >
          DEEP REF ↗
        </span>
      )}
    </div>
  );

  if (hasDeepRef) {
    return (
      <Link href={`/backend#${item.deepRefId}`} style={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </Link>
    );
  }

  return content;
}
