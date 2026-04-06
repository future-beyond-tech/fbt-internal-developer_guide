'use client';

import { useState } from 'react';
import { Card } from '../ui/Card';
import { CodeBlock } from '../ui/CodeBlock';
import { Table } from '../ui/Table';
import { PatternRow } from '../ui/PatternRow';
import { FlowSteps } from '../ui/FlowSteps';
import { Callout } from '../ui/Callout';

interface SectionRendererProps {
  section: any;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const [langFilter, setLangFilter] = useState('all');
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const sectionIcon = section.icon || '📋';
  const sectionIconBg = section.iconBg || 'rgba(var(--fbt-hi-rgb),0.15)';

  // Detect cards array — either section.cards or section.data when type is 'cards'
  const cards = section.cards || (section.type === 'cards' && Array.isArray(section.data) ? section.data : null);
  // Table data
  const tableData = (section.type === 'table' && section.data && section.data.headers) ? section.data : null;

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
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '21px',
          flexShrink: 0,
          border: '1px solid var(--border)',
          background: sectionIconBg,
          boxShadow: 'var(--shadow-sm)',
        }}>
          {sectionIcon}
        </div>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '30px',
            letterSpacing: '0.06em',
            color: 'var(--t1)',
          }}>
            {section.title}
          </h2>
          {section.module && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fbt-hi)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {section.module} {section.subtitle && `· ${section.subtitle}`}
            </span>
          )}
        </div>
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
        <div style={{
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          width: '60px',
          height: '1px',
          background: 'var(--fbt-hi)',
          boxShadow: '0 0 8px var(--fbt-hi)',
        }} />
      </div>

      {/* Description */}
      {section.description && (
        <p style={{
          fontSize: '14px',
          color: 'var(--t2)',
          marginBottom: '28px',
          maxWidth: '780px',
          lineHeight: 1.75,
        }}>
          {section.description}
        </p>
      )}

      {/* Language Filter */}
      {section.hasFilter && section.filterOptions && (
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {(section.filterOptions.some((o: string) => o.toLowerCase() === 'all') ? section.filterOptions : ['All', ...section.filterOptions]).map((opt: string, idx: number) => {
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
                  background: langFilter === val ? 'var(--fbt)' : 'var(--raised)',
                  borderColor: langFilter === val ? 'var(--fbt)' : 'var(--border)',
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

      {/* ═══════════ PRINCIPLES (backend/frontend style) ═══════════ */}
      {section.principles && section.principles.length > 0 && section.type === 'table' && (
        <Table
          headers={['Acronym', 'Full Name', 'What', 'Why', 'When']}
          rows={section.principles.map((p: any) => [p.acronym || '', p.fullName || '', p.what || '', p.why || '', p.when || ''])}
        />
      )}
      {section.principles && section.principles.length > 0 && section.type !== 'table' && (
        <Table
          headers={['Principle', 'Description', 'Example', 'Benefits']}
          rows={section.principles.map((p: any) => [
            p.name || p.acronym || p.fullName || '',
            p.description || p.what || '',
            p.example || p.when || '',
            p.benefits ? p.benefits.join(', ') : (p.why || ''),
          ])}
        />
      )}

      {/* ═══════════ CARDS GRID ═══════════ */}
      {cards && cards.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '14px',
        }}>
          {cards
            .filter((card: any) => {
              if (langFilter === 'all') return true;
              if (!card.lang) return true;
              return card.lang.toLowerCase().includes(langFilter);
            })
            .map((card: any, i: number) => (
              <Card
                key={i}
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle || card.category}
                description={card.description}
                accent={card.accent}
                pills={card.pills}
                meta={card.meta}
                lang={card.lang}
              >
                {card.fbtApplication && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px 12px',
                    background: 'rgba(var(--fbt-hi-rgb),0.06)',
                    border: '1px solid rgba(var(--fbt-hi-rgb),0.15)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'var(--t2)',
                    lineHeight: 1.6,
                  }}>
                    <span style={{ color: 'var(--fbt-hi)', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em' }}>FBT APPLICATION</span>
                    <br />
                    {card.fbtApplication}
                  </div>
                )}
                {card.code && <CodeBlock code={card.code} language={card.lang} />}
              </Card>
            ))}
        </div>
      )}

      {/* ═══════════ TABLE DATA (system-design style) ═══════════ */}
      {tableData && (
        <Table
          headers={tableData.headers}
          rows={tableData.rows.map((row: any) => tableData.headers.map((h: string) => row[h] || ''))}
        />
      )}

      {/* ═══════════ ACCORDION (system-design distributed systems) ═══════════ */}
      {section.type === 'accordion' && Array.isArray(section.data) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {section.data.map((item: any, i: number) => (
            <div key={i} style={{
              background: 'var(--card)',
              border: `1px solid ${expandedAccordion === i ? 'rgba(var(--fbt-hi-rgb),0.3)' : 'var(--border)'}`,
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}>
              <button
                onClick={() => setExpandedAccordion(expandedAccordion === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fbt-hi)', minWidth: '28px' }}>
                  {item.number}
                </span>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--t1)', flex: 1 }}>
                  {item.title}
                </span>
                {item.priority && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    background: item.priority === 'Critical' ? 'rgba(var(--red-rgb),0.15)' : 'rgba(var(--fbt-hi-rgb),0.1)',
                    color: item.priority === 'Critical' ? 'var(--red)' : 'var(--fbt-hi)',
                    border: `1px solid ${item.priority === 'Critical' ? 'rgba(var(--red-rgb),0.3)' : 'rgba(var(--fbt-hi-rgb),0.2)'}`,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {item.priority}
                  </span>
                )}
                <span style={{ color: 'var(--t3)', fontSize: '14px', transform: expandedAccordion === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
              </button>
              {expandedAccordion === i && (
                <div style={{ padding: '0 18px 18px' }}>
                  <p style={{ fontSize: '12.5px', color: 'var(--t2)', lineHeight: 1.7, marginBottom: '14px' }}>
                    {item.brief}
                  </p>
                  {item.projects && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      {item.projects.map((proj: any, pi: number) => (
                        <div key={pi} style={{
                          padding: '10px 12px',
                          borderRadius: '4px',
                          background: 'var(--panel)',
                          border: '1px solid var(--border)',
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: proj.color === 'cyan' ? 'var(--cyan)' : proj.color === 'purple' ? 'var(--fbt-hi)' : proj.color === 'pink' ? 'var(--pink)' : 'var(--amber)',
                            letterSpacing: '0.05em',
                          }}>
                            {proj.name}
                          </span>
                          <p style={{ fontSize: '11.5px', color: 'var(--t2)', marginTop: '4px', lineHeight: 1.5 }}>{proj.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.codeExample && <CodeBlock code={item.codeExample} language="csharp" />}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ FLOW / ROADMAP (system-design) ═══════════ */}
      {section.type === 'flow' && Array.isArray(section.data) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {section.data.map((item: any, i: number) => (
            <div key={i} style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '20px 22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                {item.quarter && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '3px 10px',
                    background: 'rgba(var(--fbt-hi-rgb),0.15)',
                    border: '1px solid rgba(var(--fbt-hi-rgb),0.3)',
                    borderRadius: '4px',
                    color: 'var(--fbt-hi)',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                  }}>
                    {item.quarter}
                  </span>
                )}
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--t1)', letterSpacing: '0.04em' }}>
                  {item.title || item.phase}
                </span>
                {item.phase && item.title && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--t3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {item.phase}
                  </span>
                )}
              </div>
              {item.description && (
                <p style={{ fontSize: '12.5px', color: 'var(--t2)', lineHeight: 1.7, marginBottom: '14px' }}>{item.description}</p>
              )}
              {/* Flow items (numbered sub-items) */}
              {item.items && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.items.map((sub: any, si: number) => (
                    <div key={si} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '8px 12px',
                      background: 'var(--panel)',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                    }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fbt-hi)', minWidth: '22px', fontWeight: 600 }}>
                        {sub.num || `0${si + 1}`}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5, flex: 1 }}>
                        {typeof sub === 'string' ? sub : (sub.text || sub.description || sub.name || '')}
                      </span>
                      {sub.tag && (
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          padding: '2px 6px',
                          background: 'rgba(var(--cyan-rgb),0.1)',
                          border: '1px solid rgba(var(--cyan-rgb),0.2)',
                          borderRadius: '3px',
                          color: 'var(--cyan)',
                          whiteSpace: 'nowrap',
                        }}>
                          {sub.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Subsections (for FBT mapping sections with nested content) */}
              {item.subsections && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {item.subsections.map((ss: any, si: number) => (
                    <div key={si} style={{
                      padding: '10px 12px',
                      background: 'var(--panel)',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                    }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--t1)' }}>{ss.title || ss.name}</span>
                      {ss.description && <p style={{ fontSize: '11.5px', color: 'var(--t2)', marginTop: '4px', lineHeight: 1.5 }}>{ss.description}</p>}
                      {ss.items && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                          {ss.items.map((it: any, ii: number) => (
                            <span key={ii} style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '9px',
                              padding: '2px 6px',
                              borderRadius: '2px',
                              border: '1px solid var(--border)',
                              color: 'var(--t3)',
                            }}>
                              {typeof it === 'string' ? it : (it.text || it.name || '')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Tags */}
              {item.tags && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {item.tags.map((tag: string, ti: number) => (
                    <span key={ti} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      padding: '2px 7px',
                      borderRadius: '3px',
                      border: '1px solid var(--border)',
                      color: 'var(--t3)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ PATTERN GROUPS (backend/frontend) ═══════════ */}
      {section.patternGroups && section.patternGroups.map((group: any, gi: number) => (
        <div key={gi} style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '22px',
          marginBottom: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '18px' }}>{group.icon}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', fontWeight: 700, color: group.color || 'var(--t1)' }}>
              {group.title}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--t3)', marginLeft: 'auto', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {group.subtitle}
            </span>
          </div>
          {group.patterns.map((p: any, pi: number) => (
            <PatternRow key={pi} {...p} />
          ))}
        </div>
      ))}

      {/* ═══════════ FLOW STEPS (backend/frontend) ═══════════ */}
      {section.flowSteps && <FlowSteps steps={section.flowSteps} />}

      {/* ═══════════ CODE EXAMPLE (standalone) ═══════════ */}
      {section.codeExample && (
        <div style={{ marginTop: '20px' }}>
          <CodeBlock code={section.codeExample.code} language={section.codeExample.lang} />
        </div>
      )}

      {/* ═══════════ PLUGIN ARCH: CONCEPTS TABLE ═══════════ */}
      {section.type === 'concepts' && section.concepts && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {section.concepts.map((c: any, i: number) => (
            <div key={i} style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '18px 20px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ARTICLE CONCEPT</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--t1)', marginTop: '4px', letterSpacing: '0.04em' }}>
                  {c.concept}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--t2)', marginTop: '6px', lineHeight: 1.6 }}>
                  {c.articleSays || c.description}
                </p>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fbt-hi)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>FBT TRANSLATION</span>
                <p style={{ fontSize: '12px', color: 'var(--t2)', marginTop: '8px', lineHeight: 1.6 }}>
                  {c.fbtTranslation || c.fbtMapping}
                </p>
                {c.projects && (
                  <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {c.projects.map((p: string, pi: number) => (
                      <span key={pi} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        background: 'rgba(var(--fbt-hi-rgb),0.1)',
                        border: '1px solid rgba(var(--fbt-hi-rgb),0.2)',
                        color: 'var(--fbt-hi)',
                      }}>
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ PLUGIN ARCH: PROJECTS ═══════════ */}
      {section.type === 'projects' && section.projects && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {section.projects.map((proj: any, i: number) => (
            <div key={i} style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>{proj.icon || '🔧'}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--t1)', letterSpacing: '0.04em' }}>
                  {proj.name}
                </h3>
                {proj.priority && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    background: proj.priority === 'critical' ? 'rgba(var(--red-rgb),0.12)' : 'rgba(var(--fbt-hi-rgb),0.1)',
                    color: proj.priority === 'critical' ? 'var(--red)' : 'var(--fbt-hi)',
                    border: `1px solid ${proj.priority === 'critical' ? 'rgba(var(--red-rgb),0.3)' : 'rgba(var(--fbt-hi-rgb),0.2)'}`,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {proj.priority}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--t2)', lineHeight: 1.7, marginBottom: '14px' }}>
                {proj.description || proj.strategy}
              </p>
              {proj.hostApi && (
                <div style={{ padding: '10px 12px', borderRadius: '4px', background: 'rgba(var(--cyan-rgb),0.06)', border: '1px solid rgba(var(--cyan-rgb),0.15)', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--cyan)', letterSpacing: '0.1em' }}>HOST API EXPOSES</span>
                  <p style={{ fontSize: '11.5px', color: 'var(--t2)', marginTop: '4px', lineHeight: 1.5 }}>{proj.hostApi}</p>
                </div>
              )}
              {proj.plugins && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {proj.plugins.map((plugin: any, pi: number) => (
                    <div key={pi} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      background: 'var(--panel)',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                    }}>
                      <span style={{ fontSize: '13px' }}>{plugin.icon || '🔌'}</span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--t1)' }}>{plugin.name}</span>
                        {plugin.description && <p style={{ fontSize: '11px', color: 'var(--t3)', marginTop: '2px' }}>{plugin.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {proj.appliesConcepts && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {proj.appliesConcepts.map((c: string, ci: number) => (
                    <span key={ci} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      padding: '2px 7px',
                      borderRadius: '3px',
                      background: 'rgba(var(--fbt-hi-rgb),0.08)',
                      border: '1px solid rgba(var(--fbt-hi-rgb),0.2)',
                      color: 'var(--fbt-hi)',
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ PLUGIN ARCH: CODE TABS ═══════════ */}
      {section.type === 'code-tabs' && section.codeExamples && (
        <div>
          <div style={{ display: 'flex', gap: '2px', marginBottom: '0', borderBottom: '1px solid var(--border)' }}>
            {section.codeExamples.map((ex: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  padding: '8px 16px',
                  background: activeTab === i ? 'var(--card)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === i ? '2px solid var(--fbt-hi)' : '2px solid transparent',
                  color: activeTab === i ? 'var(--fbt-hi)' : 'var(--t3)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {ex.title}
              </button>
            ))}
          </div>
          <CodeBlock code={section.codeExamples[activeTab]?.code || ''} language={section.codeExamples[activeTab]?.lang || 'typescript'} />
        </div>
      )}

      {/* ═══════════ PLUGIN ARCH: BEFORE / AFTER ═══════════ */}
      {section.type === 'before-after' && section.beforeAfter && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{
            background: 'rgba(var(--red-rgb),0.04)',
            border: '1px solid rgba(var(--red-rgb),0.2)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--red)', letterSpacing: '0.15em', marginBottom: '14px', textTransform: 'uppercase' }}>
              ✗ BEFORE (Monolith)
            </div>
            {section.beforeAfter.before.map((item: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--red)', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✗</span>
                <span style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{
            background: 'rgba(var(--cyan-rgb),0.04)',
            border: '1px solid rgba(var(--cyan-rgb),0.2)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyan)', letterSpacing: '0.15em', marginBottom: '14px', textTransform: 'uppercase' }}>
              ✓ AFTER (Plugin Architecture)
            </div>
            {section.beforeAfter.after.map((item: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--cyan)', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                <span style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════ PLUGIN ARCH: ROADMAP ═══════════ */}
      {section.type === 'roadmap' && section.roadmapSteps && (
        <div style={{ position: 'relative', paddingLeft: '24px' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '2px', background: 'rgba(var(--fbt-hi-rgb),0.2)' }} />
          {section.roadmapSteps.map((step: any, i: number) => (
            <div key={i} style={{ position: 'relative', marginBottom: '20px' }}>
              <div style={{
                position: 'absolute',
                left: '-20px',
                top: '6px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--fbt-hi)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                color: '#fff',
                fontWeight: 700,
                boxShadow: '0 0 8px rgba(var(--fbt-hi-rgb),0.4)',
              }}>
                {step.step}
              </div>
              <div style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '16px 18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--t1)', letterSpacing: '0.04em' }}>{step.title}</span>
                  {step.timeline && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--cyan)', padding: '2px 6px', background: 'rgba(var(--cyan-rgb),0.1)', borderRadius: '3px', border: '1px solid rgba(var(--cyan-rgb),0.2)' }}>
                      {step.timeline}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6 }}>{step.description}</p>
                {step.tasks && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                    {step.tasks.map((t: string, ti: number) => (
                      <span key={ti} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        border: '1px solid var(--border)',
                        color: 'var(--t3)',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ PLUGIN ARCH: EDGE CASES ═══════════ */}
      {section.type === 'edge-cases' && section.edgeCases && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {section.edgeCases.map((ec: any, i: number) => (
            <div key={i} style={{
              background: 'var(--card)',
              border: '1px solid rgba(var(--amber-rgb),0.2)',
              borderRadius: '8px',
              padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px' }}>⚠️</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--amber)', letterSpacing: '0.04em' }}>
                  {ec.warning}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '8px' }}>{ec.applies}</p>
              <div style={{
                padding: '8px 12px',
                background: 'rgba(var(--fbt-hi-rgb),0.06)',
                borderRadius: '4px',
                border: '1px solid rgba(var(--fbt-hi-rgb),0.15)',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fbt-hi)', letterSpacing: '0.1em' }}>FBT VERDICT</span>
                <p style={{ fontSize: '11.5px', color: 'var(--t2)', marginTop: '4px', lineHeight: 1.5 }}>{ec.verdict}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════ CALLOUT ═══════════ */}
      {section.callout && (
        <Callout type={section.callout.type} icon={section.callout.icon}>
          <span dangerouslySetInnerHTML={{ __html: section.callout.text }} />
        </Callout>
      )}

      {/* ═══════════ TAGS (section-level) ═══════════ */}
      {section.tags && Array.isArray(section.tags) && section.tags.length > 0 && !section.type?.includes('edge') && (
        <div style={{ display: 'flex', gap: '4px', marginTop: '16px', flexWrap: 'wrap' }}>
          {section.tags.map((tag: string, i: number) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              padding: '2px 7px',
              borderRadius: '3px',
              border: '1px solid var(--border)',
              color: 'var(--t3)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
