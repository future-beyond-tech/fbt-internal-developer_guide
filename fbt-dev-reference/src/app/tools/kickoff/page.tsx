'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  kickoffScaffoldFlags,
  generateKickoffPrompt,
  getMissingKickoffFields,
  kickoffRequiredFields,
  KickoffFormData,
} from '@/data/kickoff';
import { safeCopy, downloadText, slugify } from '@/lib/prompt-io';
import { loadState, saveState, clearState } from '@/lib/persist';

const KICKOFF_SLOT = 'kickoff';

const REQUIRED_LABELS: Record<string, string> = {
  name: 'Project Name',
  desc: 'Description',
  user: 'Primary User',
  problem: 'Core Problem',
  fe: 'Frontend',
  be: 'Backend',
};

// Using CSS variables for theming support
const CYAN = 'var(--cyan)';
const CYAN_DIM = 'rgba(var(--cyan-rgb), 0.15)';
const VOID = 'var(--void)';
const PANEL = 'var(--panel)';
const CARD = 'var(--card)';
const RAISED = 'var(--raised)';
const BORDER = 'rgba(var(--white-rgb), 0.06)';
const BORDER_HI = 'rgba(var(--fbt-hi-rgb), 0.5)';
const T1 = 'var(--t1)';
const T2 = 'var(--t2)';
const T3 = 'var(--t3)';

const EMPTY_FORM = (): KickoffFormData => ({
  name: '',
  slug: '',
  desc: '',
  user: '',
  problem: '',
  fe: '',
  be: '',
  db: '',
  auth: '',
  infra: '',
  repo: '',
  modules: '',
  integrations: '',
  timeline: '',
  team: '',
  avoid: '',
  activeFlags: kickoffScaffoldFlags.filter((f) => f.defaultOn).map((f) => f.id),
});

export default function KickoffPage() {
  // Form state — hydrated from localStorage on mount (SSR-safe)
  const [formData, setFormData] = useState<KickoffFormData>(EMPTY_FORM);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration boundary
    setFormData(loadState<KickoffFormData>(KICKOFF_SLOT, EMPTY_FORM()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(KICKOFF_SLOT, formData);
  }, [formData, hydrated]);

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const missing = useMemo(() => getMissingKickoffFields(formData), [formData]);
  const canGenerate = missing.length === 0;

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle scaffold flag
  const toggleFlag = (flagId: string) => {
    setFormData((prev) => ({
      ...prev,
      activeFlags: prev.activeFlags.includes(flagId)
        ? prev.activeFlags.filter((f) => f !== flagId)
        : [...prev.activeFlags, flagId],
    }));
  };

  // Generate kickoff prompt
  const handleGenerate = () => {
    if (!canGenerate) return;
    const prompt = generateKickoffPrompt(formData);
    setGeneratedPrompt(prompt);
    setCopied(false);
  };

  // Clear form
  const handleClear = () => {
    setFormData(EMPTY_FORM());
    setGeneratedPrompt('');
    setCopied(false);
    clearState(KICKOFF_SLOT);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    const ok = await safeCopy(generatedPrompt);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download generated prompt as a Markdown file
  const handleDownload = () => {
    if (!generatedPrompt) return;
    const slug = slugify(formData.slug || formData.name, 'project');
    const date = new Date().toISOString().slice(0, 10);
    downloadText(generatedPrompt, `kickoff-${slug}-${date}.md`);
  };

  return (
    <div style={{ backgroundColor: VOID, color: T1, minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <div
        style={{
          borderBottom: `1px solid ${BORDER}`,
          backgroundColor: PANEL,
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.5rem',
            letterSpacing: '0.15em',
            color: CYAN,
            margin: 0,
          }}
        >
          FBT NEW PROJECT KICKOFF
        </h1>
        <Link
          href="/"
          style={{
            color: T2,
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T2)}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Section 01: Identity */}
        <Section
          number={1}
          title="Identity"
          description="Define the project's core identity"
        >
          <FormGrid>
            <FormField
              label="Project Name"
              name="name"
              placeholder="e.g. CatchMoment"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth={false}
            />
            <FormField
              label="Codename / Slug"
              name="slug"
              placeholder="e.g. catchmoment"
              value={formData.slug}
              onChange={handleInputChange}
              fullWidth={false}
            />
          </FormGrid>

          <FormGrid fullRow>
            <FormField
              label="One-line Product Description"
              name="desc"
              placeholder="e.g. AI-powered event video capture and highlight generation platform"
              value={formData.desc}
              onChange={handleInputChange}
              fullWidth={true}
            />
          </FormGrid>

          <FormGrid>
            <FormField
              label="Primary User"
              name="user"
              placeholder="e.g. Event organisers, wedding photographers"
              value={formData.user}
              onChange={handleInputChange}
              fullWidth={false}
            />
            <FormField
              label="Core Problem Solved"
              name="problem"
              placeholder="e.g. Manual video highlight creation takes hours"
              value={formData.problem}
              onChange={handleInputChange}
              fullWidth={false}
            />
          </FormGrid>
        </Section>

        {/* Section 02: Tech Stack */}
        <Section
          number={2}
          title="Tech Stack"
          description="Specify the technology choices"
        >
          <FormGrid>
            <FormField
              label="Frontend"
              name="fe"
              placeholder="e.g. Next.js 15, TypeScript, Tailwind"
              value={formData.fe}
              onChange={handleInputChange}
              fullWidth={false}
            />
            <FormField
              label="Backend"
              name="be"
              placeholder="e.g. .NET 8 Clean Architecture, EF Core"
              value={formData.be}
              onChange={handleInputChange}
              fullWidth={false}
            />
          </FormGrid>

          <FormGrid>
            <FormField
              label="Database"
              name="db"
              placeholder="e.g. PostgreSQL + Redis"
              value={formData.db}
              onChange={handleInputChange}
              fullWidth={false}
            />
            <FormField
              label="Auth / Identity"
              name="auth"
              placeholder="e.g. Zentra OAuth 2.0 / NextAuth / Clerk"
              value={formData.auth}
              onChange={handleInputChange}
              fullWidth={false}
            />
          </FormGrid>

          <FormGrid>
            <FormField
              label="Infra / Deployment"
              name="infra"
              placeholder="e.g. Railway, Vercel, AWS S3 Mumbai"
              value={formData.infra}
              onChange={handleInputChange}
              fullWidth={false}
            />
            <FormField
              label="Repo Structure"
              name="repo"
              placeholder="e.g. Monorepo / Polyrepo (list repos)"
              value={formData.repo}
              onChange={handleInputChange}
              fullWidth={false}
            />
          </FormGrid>
        </Section>

        {/* Section 03: Architecture */}
        <Section
          number={3}
          title="Architecture"
          description="Outline core modules and integrations"
        >
          <FormGrid fullRow>
            <FormField
              label="Core Modules / Domains"
              name="modules"
              placeholder={`e.g.\n- UserManagement\n- EventCapture\n- VideoProcessing\n- NotificationService`}
              value={formData.modules}
              onChange={handleInputChange}
              fullWidth={true}
              isTextarea={true}
            />
          </FormGrid>

          <FormGrid fullRow>
            <FormField
              label="Key Integrations / Third-party Services"
              name="integrations"
              placeholder="e.g. Razorpay, AWS S3, BunnyCDN, Modal GPU, Temporal Cloud, SendGrid"
              value={formData.integrations}
              onChange={handleInputChange}
              fullWidth={true}
              isTextarea={true}
            />
          </FormGrid>
        </Section>

        {/* Section 04: Scaffold Flags */}
        <Section
          number={4}
          title="Scaffold Flags"
          description="Select scaffold components to include"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {kickoffScaffoldFlags.map((flag) => (
              <FlagPill
                key={flag.id}
                flag={flag}
                isActive={formData.activeFlags.includes(flag.id)}
                onToggle={() => toggleFlag(flag.id)}
              />
            ))}
          </div>
        </Section>

        {/* Section 05: Constraints & Goals */}
        <Section
          number={5}
          title="Constraints & Goals"
          description="Set timeline, team size, and constraints"
        >
          <FormGrid>
            <FormField
              label="MVP Deadline / Timeline"
              name="timeline"
              placeholder="e.g. 14 weeks, Phase 1 in 3 weeks"
              value={formData.timeline}
              onChange={handleInputChange}
              fullWidth={false}
            />
            <FormField
              label="Team Size"
              name="team"
              placeholder="e.g. Solo (Claude Code) / 2 devs"
              value={formData.team}
              onChange={handleInputChange}
              fullWidth={false}
            />
          </FormGrid>

          <FormGrid fullRow>
            <FormField
              label="Anything to Avoid / Special Constraints"
              name="avoid"
              placeholder="e.g. No serverless functions, avoid vendor lock-in, must run on Railway"
              value={formData.avoid}
              onChange={handleInputChange}
              fullWidth={true}
              isTextarea={true}
            />
          </FormGrid>
        </Section>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            margin: '3rem 0',
          }}
        >
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            aria-disabled={!canGenerate}
            title={
              canGenerate
                ? 'Generate the kickoff prompt'
                : `Fill in required fields first: ${missing
                    .map((k) => REQUIRED_LABELS[k] ?? String(k))
                    .join(', ')}`
            }
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: canGenerate ? CYAN : 'transparent',
              color: canGenerate ? VOID : T3,
              border: canGenerate ? 'none' : `1px solid ${BORDER_HI}`,
              borderRadius: '0.5rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: canGenerate ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              fontFamily: "'Instrument Sans', sans-serif",
              boxShadow: canGenerate ? `0 0 20px ${CYAN}33` : 'none',
            }}
            onMouseEnter={(e) => {
              if (!canGenerate) return;
              e.currentTarget.style.boxShadow = `0 0 30px ${CYAN}66`;
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              if (!canGenerate) return;
              e.currentTarget.style.boxShadow = `0 0 20px ${CYAN}33`;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Generate Kickoff Prompt
          </button>

          <button
            onClick={handleClear}
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: 'transparent',
              color: T2,
              border: `1px solid ${BORDER_HI}`,
              borderRadius: '0.5rem',
              fontWeight: '500',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: "'Instrument Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = CYAN;
              e.currentTarget.style.borderColor = CYAN;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = T2;
              e.currentTarget.style.borderColor = BORDER_HI;
            }}
          >
            Clear Form
          </button>
        </div>

        {/* Required-field feedback (Doherty: give live validation signal) */}
        {!canGenerate && (
          <div
            role="status"
            aria-live="polite"
            style={{
              marginTop: '-1.5rem',
              marginBottom: '2rem',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: T3,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.04em',
            }}
          >
            Missing required:{' '}
            <span style={{ color: 'var(--amber)' }}>
              {missing.map((k) => REQUIRED_LABELS[k] ?? String(k)).join(' · ')}
            </span>{' '}
            <span style={{ color: T3 }}>
              ({kickoffRequiredFields.length - missing.length}/{kickoffRequiredFields.length})
            </span>
          </div>
        )}

        {/* Output Section */}
        {generatedPrompt && (
          <Section
            number={0}
            title="Generated Kickoff Prompt"
            description="Copy this prompt and send it to Claude"
          >
            <div
              style={{
                position: 'relative',
                marginBottom: '1rem',
              }}
            >
              <textarea
                readOnly
                value={generatedPrompt}
                style={{
                  width: '100%',
                  minHeight: '400px',
                  padding: '1.5rem',
                  backgroundColor: RAISED,
                  color: T1,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '0.5rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                <button
                  onClick={handleDownload}
                  title="Download as Markdown"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    color: CYAN,
                    border: `1px solid ${CYAN}`,
                    borderRadius: '0.375rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 15px ${CYAN}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ↓ .md
                </button>
                <button
                  onClick={handleCopy}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: copied ? 'var(--green)' : CYAN,
                    color: VOID,
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!copied) {
                      e.currentTarget.style.boxShadow = `0 0 15px ${CYAN}66`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!copied) {
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Sub-Components
// ============================================================================

interface SectionProps {
  number: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function Section({ number, title, description, children }: SectionProps) {
  return (
    <div
      style={{
        marginBottom: '3rem',
        padding: '2rem',
        backgroundColor: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: '0.75rem',
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          {number > 0 && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                color: CYAN,
                fontFamily: "'Instrument Sans', sans-serif",
              }}
            >
              SECTION {String(number).padStart(2, '0')}
            </span>
          )}
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: T1,
              margin: 0,
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            {title}
          </h2>
        </div>
        {description && (
          <p
            style={{
              fontSize: '0.9rem',
              color: T3,
              margin: 0,
              marginTop: '0.5rem',
            }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

interface FormGridProps {
  fullRow?: boolean;
  children: React.ReactNode;
}

function FormGrid({ fullRow, children }: FormGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: fullRow ? '1fr' : 'repeat(2, 1fr)',
        gap: '1.5rem',
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fullWidth?: boolean;
  isTextarea?: boolean;
}

function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  isTextarea,
}: FormFieldProps) {
  const Element = isTextarea ? 'textarea' : 'input';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label
        style={{
          fontSize: '0.85rem',
          fontWeight: '600',
          color: T2,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontFamily: "'Instrument Sans', sans-serif",
        }}
      >
        {label}
      </label>
      {Element === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            padding: '0.875rem',
            backgroundColor: RAISED,
            color: T1,
            border: `1px solid ${BORDER}`,
            borderRadius: '0.5rem',
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: '0.9rem',
            minHeight: '120px',
            resize: 'vertical',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = CYAN;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${CYAN_DIM}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = BORDER;
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      ) : (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            padding: '0.875rem',
            backgroundColor: RAISED,
            color: T1,
            border: `1px solid ${BORDER}`,
            borderRadius: '0.5rem',
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: '0.9rem',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = CYAN;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${CYAN_DIM}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = BORDER;
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      )}
    </div>
  );
}

interface FlagPillProps {
  flag: {
    id: string;
    label: string;
    detail: string;
  };
  isActive: boolean;
  onToggle: () => void;
}

function FlagPill({ flag, isActive, onToggle }: FlagPillProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '1rem',
        backgroundColor: isActive ? CYAN_DIM : RAISED,
        border: `1px solid ${isActive ? CYAN : BORDER}`,
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = CYAN;
          e.currentTarget.style.backgroundColor = `${CYAN_DIM}`;
        } else {
          e.currentTarget.style.boxShadow = `0 0 15px ${CYAN}33`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = BORDER;
          e.currentTarget.style.backgroundColor = RAISED;
        } else {
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '3px',
            border: `2px solid ${isActive ? CYAN : T3}`,
            backgroundColor: isActive ? CYAN : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            color: VOID,
          }}
        >
          {isActive && '✓'}
        </div>
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: isActive ? CYAN : T1,
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          {flag.label}
        </span>
      </div>
      <span
        style={{
          fontSize: '0.8rem',
          color: isActive ? T2 : T3,
          lineHeight: '1.4',
          marginLeft: '2.25rem',
        }}
      >
        {flag.detail}
      </span>
    </button>
  );
}
