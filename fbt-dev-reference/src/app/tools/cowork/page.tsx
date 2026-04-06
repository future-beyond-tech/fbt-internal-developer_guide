'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  coworkProducts,
  coworkModes,
  coworkEngineeringStandards,
  coworkUxLaws,
  coworkPerformanceBudgets,
} from '@/data/cowork';

interface GeneratedPrompt {
  product: string;
  mode: string;
  modeBody: string;
  context: string;
  standards: string;
  uxLaws: string;
  performanceBudgets: string;
  fullPrompt: string;
}

export default function CoworkCommandCenter() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [context, setContext] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);
  const [copied, setCopied] = useState(false);

  const product = selectedProduct ? coworkProducts.find((p) => p.id === selectedProduct) : null;
  const mode = selectedMode ? coworkModes.find((m) => m.num === selectedMode) : null;

  const generatePrompt = () => {
    if (!product || !mode) return;

    const standardsList = Object.values(coworkEngineeringStandards)
      .map((s) => `${s.code}: ${s.title}\n${s.principles.map((p) => `  • ${p}`).join('\n')}`)
      .join('\n\n');

    const uxLawsList = coworkUxLaws
      .map(
        (law) =>
          `${law.shortName}: ${law.description}\n${law.implementation.map((impl) => `  • ${impl}`).join('\n')}`
      )
      .join('\n\n');

    const budgetsList = coworkPerformanceBudgets
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
${context || '[No additional context provided]'}

---

## MODE INSTRUCTIONS
${mode.body}

---

## ENGINEERING STANDARDS
${standardsList}

---

## UX LAWS & IMPLEMENTATION
${uxLawsList}

---

## PERFORMANCE BUDGETS (Non-Negotiable)
${budgetsList}

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

    setGeneratedPrompt({
      product: product.name,
      mode: `${mode.num}: ${mode.name}`,
      modeBody: mode.body,
      context,
      standards: standardsList,
      uxLaws: uxLawsList,
      performanceBudgets: budgetsList,
      fullPrompt,
    });
  };

  const handleCopy = async () => {
    if (generatedPrompt) {
      try {
        await navigator.clipboard.writeText(generatedPrompt.fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const canGenerate = selectedProduct && selectedMode && context.trim();

  return (
    <div style={{ backgroundColor: 'var(--void)', color: 'var(--t1)', minHeight: '100vh', padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: 'var(--fbt-hi)',
            marginBottom: '0.5rem',
            textShadow: `0 0 20px rgba(124, 77, 255, 0.4)`,
          }}
        >
          FBT COWORK COMMAND CENTER
        </h1>
        <p style={{ color: 'var(--t2)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
          Interactive prompt builder with engineering standards, UX laws, and performance budgets
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          maxWidth: '1400px',
          marginBottom: '3rem',
        }}
      >
        {/* Left Column: Inputs */}
        <div>
          {/* Step 1: Select Product */}
          <div
            style={{
              backgroundColor: 'var(--panel)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h2
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyan)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Step 1: Select Product
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {coworkProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  style={{
                    padding: '0.875rem',
                    backgroundColor: selectedProduct === p.id ? 'var(--fbt-lo)' : 'var(--card)',
                    border: selectedProduct === p.id ? `2px solid var(--fbt-hi)` : '1px solid var(--border)',
                    borderRadius: '0.375rem',
                    color: selectedProduct === p.id ? 'var(--fbt-hi)' : 'var(--t1)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: selectedProduct === p.id ? 600 : 400,
                    cursor: 'pointer',
                    boxShadow:
                      selectedProduct === p.id
                        ? `0 0 12px rgba(124, 77, 255, 0.4), inset 0 0 8px rgba(124, 77, 255, 0.2)`
                        : 'none',
                    transition: 'all 200ms ease',
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {product && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.875rem',
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--border-hi)',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                }}
              >
                <p style={{ color: 'var(--cyan)', marginBottom: '0.5rem' }}>
                  <strong>{product.name}</strong> • {product.type}
                </p>
                <p style={{ color: 'var(--t3)', lineHeight: '1.4' }}>{product.stack}</p>
              </div>
            )}
          </div>

          {/* Step 2: Select Mode */}
          <div
            style={{
              backgroundColor: 'var(--panel)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h2
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyan)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Step 2: Select Mode (15 Modes)
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                maxHeight: '300px',
                overflowY: 'auto',
                paddingRight: '0.5rem',
              }}
            >
              {coworkModes.map((m) => (
                <button
                  key={m.num}
                  onClick={() => setSelectedMode(m.num)}
                  title={m.hint}
                  style={{
                    padding: '0.75rem 0.5rem',
                    backgroundColor: selectedMode === m.num ? 'var(--fbt-lo)' : 'var(--card)',
                    border: selectedMode === m.num ? `2px solid var(--fbt-hi)` : '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    color: selectedMode === m.num ? 'var(--fbt-hi)' : 'var(--t1)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: selectedMode === m.num ? 600 : 400,
                    cursor: 'pointer',
                    boxShadow:
                      selectedMode === m.num
                        ? `0 0 12px rgba(124, 77, 255, 0.4), inset 0 0 8px rgba(124, 77, 255, 0.2)`
                        : 'none',
                    transition: 'all 150ms ease',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{m.num}</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{m.name.substring(0, 10)}</div>
                </button>
              ))}
            </div>

            {mode && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.875rem',
                  backgroundColor: 'var(--raised)',
                  border: '1px solid var(--border-hi)',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                }}
              >
                <p style={{ color: 'var(--cyan)', marginBottom: '0.5rem' }}>
                  <strong>Mode {mode.num}: {mode.name}</strong>
                </p>
                <p style={{ color: 'var(--t2)', marginBottom: '0.5rem' }}>{mode.desc}</p>
                <p style={{ color: 'var(--t3)', lineHeight: '1.4' }}>{mode.hint}</p>
              </div>
            )}
          </div>

          {/* Step 3: Context */}
          <div
            style={{
              backgroundColor: 'var(--panel)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyan)',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Step 3: Task Context
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe your task, requirements, or specific instructions for this mode..."
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '0.875rem',
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem',
                color: 'var(--t1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                resize: 'vertical',
              }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--t3)', marginTop: '0.5rem' }}>
              Include all relevant details, constraints, and acceptance criteria.
            </p>
          </div>
        </div>

        {/* Right Column: Output */}
        <div>
          <div
            style={{
              backgroundColor: 'var(--panel)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyan)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Generated Prompt
            </h2>

            {!generatedPrompt ? (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--card)',
                  borderRadius: '0.25rem',
                  border: '1px dashed var(--border-hi)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: 'var(--t3)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {selectedProduct && selectedMode && context
                      ? 'Ready to generate. Click "Generate Prompt" below.'
                      : 'Complete all three steps above to generate a prompt.'}
                  </p>
                  <p style={{ color: 'var(--t4)', fontSize: '0.75rem' }}>
                    • Select Product<br />• Select Mode<br />• Enter Context
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    padding: '1rem',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                    color: 'var(--t2)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {generatedPrompt.fullPrompt}
                </div>

                <button
                  onClick={handleCopy}
                  style={{
                    padding: '0.875rem 1rem',
                    backgroundColor: copied ? 'var(--green)' : 'var(--fbt-hi)',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: copied ? 'var(--deep)' : 'var(--void)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    boxShadow: copied
                      ? `0 0 12px rgba(0, 214, 143, 0.4)`
                      : `0 0 12px rgba(124, 77, 255, 0.3)`,
                  }}
                >
                  {copied ? '✓ Copied to Clipboard' : 'Copy Full Prompt'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={generatePrompt}
          disabled={!canGenerate}
          style={{
            padding: '0.875rem 1.5rem',
            backgroundColor: canGenerate ? 'var(--fbt-hi)' : 'var(--t4)',
            border: 'none',
            borderRadius: '0.5rem',
            color: canGenerate ? 'var(--void)' : 'var(--t3)',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: canGenerate ? 'pointer' : 'not-allowed',
            transition: 'all 200ms ease',
            boxShadow: canGenerate
              ? `0 0 20px rgba(124, 77, 255, 0.4)`
              : 'inset 0 0 8px rgba(0, 0, 0, 0.3)',
            opacity: canGenerate ? 1 : 0.5,
          }}
        >
          {generatedPrompt ? 'Regenerate Prompt' : 'Generate Prompt'}
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Engineering Standards Summary */}
        <div>
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: 'var(--amber)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Engineering Standards
          </h3>
          <div style={{ fontSize: '0.75rem', color: 'var(--t3)', lineHeight: '1.6' }}>
            {Object.values(coworkEngineeringStandards).map((s) => (
              <div key={s.code} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--t2)' }}>{s.code}</strong>: {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* UX Laws Summary */}
        <div>
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: 'var(--green)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            UX Laws
          </h3>
          <div style={{ fontSize: '0.75rem', color: 'var(--t3)', lineHeight: '1.6' }}>
            {coworkUxLaws.map((law) => (
              <div key={law.shortName} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--t2)' }}>{law.shortName}</strong>: {law.name}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Budgets Summary */}
        <div>
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: 'var(--cyan)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Performance Budgets
          </h3>
          <div style={{ fontSize: '0.75rem', color: 'var(--t3)', lineHeight: '1.6' }}>
            {coworkPerformanceBudgets.map((b) => (
              <div key={b.abbreviation} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--t2)' }}>{b.abbreviation}</strong>: {b.budget}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link
          href="/"
          style={{
            color: 'var(--fbt-hi)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-mono)',
            transition: 'opacity 200ms ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.opacity = '1';
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
