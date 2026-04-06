'use client';

import { useState } from 'react';
import { Card } from '../ui/Card';
import { CodeBlock } from '../ui/CodeBlock';
import { Table } from '../ui/Table';
import { PatternRow } from '../ui/PatternRow';
import { FlowSteps } from '../ui/FlowSteps';
import { Callout } from '../ui/Callout';
import type { Section } from '@/data/backend';

interface SectionRendererProps {
  section: Section;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const [langFilter, setLangFilter] = useState('all');

  const sectionIcon = section.icon || '📋';
  const sectionIconBg = section.iconBg || 'rgba(124,77,255,0.15)';

  return (
    <section
      id={section.id}
      style={{
        marginBottom: '72px',
        scrollMarginTop: '64px',
        animation: 'fadeUp 0.35s ease both',
      }}
    >
      {/* Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '28px',
        paddingBottom: '14px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '19px',
          flexShrink: 0,
          border: '1px solid var(--border)',
          background: sectionIconBg,
        }}>
          {sectionIcon}
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px',
          letterSpacing: '0.06em',
          color: 'var(--t1)',
        }}>
          {section.title}
        </h2>
        {section.count && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--t3)',
            textTransform: 'uppercase',
            marginLeft: 'auto',
          }}>
            {section.count} items
          </span>
        )}
        {/* Accent line under header */}
        <div style={{
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          width: '60px',
          height: '1px',
          background: '#7C4DFF',
          boxShadow: '0 0 8px #7C4DFF',
        }} />
      </div>

      {/* Description */}
      {section.description && (
        <p style={{
          fontSize: '13px',
          color: 'var(--t2)',
          marginBottom: '24px',
          maxWidth: '750px',
          lineHeight: 1.7,
        }}>
          {section.description}
        </p>
      )}

      {/* Language Filter (for coding standards) */}
      {section.hasFilter && section.filterOptions && (
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {(section.filterOptions.some(o => o.toLowerCase() === 'all') ? section.filterOptions : ['All', ...section.filterOptions]).map((opt, idx) => {
            const val = opt.toLowerCase().replace(/[^a-z]/g, '') || 'all';
            return (
              <button
                key={`${opt}-${idx}`}
                onClick={() => setLangFilter(val === 'all' ? 'all' : val)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid',
                  background: langFilter === val ? '#512BD4' : 'var(--raised)',
                  borderColor: langFilter === val ? '#512BD4' : 'var(--border)',
                  color: langFilter === val ? '#fff' : 'var(--t2)',
                  transition: 'all 0.15s',
                  userSelect: 'none',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Principles Table (backend style) */}
      {section.principles && section.principles.length > 0 && section.type === 'table' && (
        <Table
          headers={['Acronym', 'Full Name', 'What', 'Why', 'When']}
          rows={section.principles.map(p => [p.acronym || '', p.fullName || '', p.what || '', p.why || '', p.when || ''])}
        />
      )}

      {/* Principles as table (frontend style) */}
      {section.principles && section.principles.length > 0 && section.type !== 'table' && (
        <Table
          headers={['Principle', 'Description', 'Example', 'Benefits']}
          rows={section.principles.map(p => [
            p.name || p.acronym || p.fullName || '',
            p.description || p.what || '',
            p.example || p.when || '',
            p.benefits ? p.benefits.join(', ') : (p.why || ''),
          ])}
        />
      )}

      {/* Cards Grid */}
      {section.cards && section.cards.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '14px',
        }}>
          {section.cards
            .filter(card => {
              if (langFilter === 'all') return true;
              if (!card.lang) return true;
              return card.lang.toLowerCase().includes(langFilter);
            })
            .map((card, i) => (
              <Card
                key={i}
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                accent={card.accent}
                pills={card.pills}
                meta={card.meta}
                lang={card.lang}
              >
                {card.code && <CodeBlock code={card.code} language={card.lang} />}
              </Card>
            ))}
        </div>
      )}

      {/* Pattern Groups */}
      {section.patternGroups && section.patternGroups.map((group, gi) => (
        <div key={gi} style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '22px',
          marginBottom: '14px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '18px' }}>{group.icon}</span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14.5px',
              fontWeight: 700,
              color: group.color || 'var(--t1)',
            }}>
              {group.title}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              color: 'var(--t3)',
              marginLeft: 'auto',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}>
              {group.subtitle}
            </span>
          </div>
          {group.patterns.map((p, pi) => (
            <PatternRow key={pi} {...p} />
          ))}
        </div>
      ))}

      {/* Flow Steps */}
      {section.flowSteps && (
        <FlowSteps steps={section.flowSteps} />
      )}

      {/* Code Example */}
      {section.codeExample && (
        <div style={{ marginTop: '20px' }}>
          <CodeBlock code={section.codeExample.code} language={section.codeExample.lang} />
        </div>
      )}

      {/* Callout */}
      {section.callout && (
        <Callout type={section.callout.type} icon={section.callout.icon}>
          <span dangerouslySetInnerHTML={{ __html: section.callout.text }} />
        </Callout>
      )}
    </section>
  );
}
