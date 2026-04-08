'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  uxPromptUxLaws,
  uxPromptProductGoals,
  generateUxPrompt,
  getMissingUxPromptFields,
  uxPromptRequiredFields,
  type UxPromptInput,
} from '@/data/ux-prompt';
import { safeCopy, downloadText, slugify } from '@/lib/prompt-io';
import { loadState, saveState } from '@/lib/persist';

const UX_SLOT = 'ux-prompt';

interface UxPromptPersisted {
  projectName: string;
  projectSlug: string;
  projectDesc: string;
  targetUsers: string;
  coreProblem: string;
  businessModel: string;
  targetMarket: string;
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
  selectedLaws: string[];
  selectedGoals: string[];
}

const REQUIRED_LABELS_UX: Record<keyof UxPromptInput, string> = {
  projectName: 'Project Name',
  projectSlug: 'Slug',
  projectDesc: 'Description',
  targetUsers: 'Primary Users',
  coreProblem: 'Core Problem',
  businessModel: 'Business Model',
  targetMarket: 'Target Market',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  deployment: 'Deployment',
  selectedLaws: 'UX Laws',
  selectedGoals: 'Product Goals',
  score: 'Score',
};

export default function UxPromptGeneratorPage() {
  // ═══ FORM STATE ═══
  const [projectName, setProjectName] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [targetUsers, setTargetUsers] = useState('');
  const [coreProblem, setCoreProblem] = useState('');
  const [businessModel, setBusinessModel] = useState('');
  const [targetMarket, setTargetMarket] = useState('');

  const [frontend, setFrontend] = useState('Next.js 15, TypeScript strict, Tailwind v4, shadcn/ui');
  const [backend, setBackend] = useState('');
  const [database, setDatabase] = useState('');
  const [deployment, setDeployment] = useState('');

  // ═══ SELECTED LAWS & GOALS ═══
  const [selectedLaws, setSelectedLaws] = useState<Set<string>>(
    new Set(uxPromptUxLaws.filter((l) => l.selected).map((l) => l.id))
  );

  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(
    new Set(uxPromptProductGoals.filter((g) => g.selected).map((g) => g.id))
  );

  // ═══ OUTPUT & UI STATE ═══
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on mount (SSR-safe).
  // setState-in-effect is the canonical SSR hydration boundary: the server
  // renders defaults to avoid hydration mismatch, then the client swaps in
  // persisted state on mount.
  /* eslint-disable react-hooks/set-state-in-effect -- SSR hydration boundary */
  useEffect(() => {
    const p = loadState<UxPromptPersisted | null>(UX_SLOT, null);
    if (p) {
      setProjectName(p.projectName);
      setProjectSlug(p.projectSlug);
      setProjectDesc(p.projectDesc);
      setTargetUsers(p.targetUsers);
      setCoreProblem(p.coreProblem);
      setBusinessModel(p.businessModel);
      setTargetMarket(p.targetMarket);
      setFrontend(p.frontend);
      setBackend(p.backend);
      setDatabase(p.database);
      setDeployment(p.deployment);
      setSelectedLaws(new Set(p.selectedLaws));
      setSelectedGoals(new Set(p.selectedGoals));
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    const snapshot: UxPromptPersisted = {
      projectName,
      projectSlug,
      projectDesc,
      targetUsers,
      coreProblem,
      businessModel,
      targetMarket,
      frontend,
      backend,
      database,
      deployment,
      selectedLaws: [...selectedLaws],
      selectedGoals: [...selectedGoals],
    };
    saveState(UX_SLOT, snapshot);
  }, [
    hydrated,
    projectName,
    projectSlug,
    projectDesc,
    targetUsers,
    coreProblem,
    businessModel,
    targetMarket,
    frontend,
    backend,
    database,
    deployment,
    selectedLaws,
    selectedGoals,
  ]);

  // ═══ TOGGLE HANDLERS ═══
  const toggleLaw = (lawId: string) => {
    setSelectedLaws((prev) => {
      const next = new Set(prev);
      if (next.has(lawId)) {
        next.delete(lawId);
      } else {
        next.add(lawId);
      }
      return next;
    });
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => {
      const next = new Set(prev);
      if (next.has(goalId)) {
        next.delete(goalId);
      } else {
        next.add(goalId);
      }
      return next;
    });
  };

  // ═══ SCORE CALCULATION ═══
  const score = useMemo(() => {
    let points = 0;

    // Form completion: 40 points
    const formFields = [
      projectName,
      projectSlug,
      projectDesc,
      targetUsers,
      coreProblem,
      businessModel,
      targetMarket,
      frontend,
      backend,
      database,
      deployment,
    ];
    const filledFields = formFields.filter((f) => f && f.trim()).length;
    points += Math.floor((filledFields / formFields.length) * 40);

    // Selected laws: 30 points
    points += Math.floor((selectedLaws.size / uxPromptUxLaws.length) * 30);

    // Selected goals: 30 points
    points += Math.floor((selectedGoals.size / uxPromptProductGoals.length) * 30);

    return Math.min(100, points);
  }, [
    projectName,
    projectSlug,
    projectDesc,
    targetUsers,
    coreProblem,
    businessModel,
    targetMarket,
    frontend,
    backend,
    database,
    deployment,
    selectedLaws,
    selectedGoals,
  ]);

  // ═══ VALIDATION ═══
  const promptInput: UxPromptInput = useMemo(
    () => ({
      projectName,
      projectSlug,
      projectDesc,
      targetUsers,
      coreProblem,
      businessModel,
      targetMarket,
      frontend,
      backend,
      database,
      deployment,
      selectedLaws: [...selectedLaws],
      selectedGoals: [...selectedGoals],
      score,
    }),
    [
      projectName,
      projectSlug,
      projectDesc,
      targetUsers,
      coreProblem,
      businessModel,
      targetMarket,
      frontend,
      backend,
      database,
      deployment,
      selectedLaws,
      selectedGoals,
      score,
    ]
  );

  const missingFields = useMemo(
    () => getMissingUxPromptFields(promptInput),
    [promptInput]
  );
  const canGenerate = missingFields.length === 0;

  // ═══ PROMPT GENERATION ═══
  const generatePrompt = () => {
    if (!canGenerate) return;
    setOutput(generateUxPrompt(promptInput));
    setCopied(false);
  };

  const copyToClipboard = async () => {
    const ok = await safeCopy(output);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPrompt = () => {
    if (!output) return;
    const slug = slugify(projectSlug || projectName, 'project');
    const date = new Date().toISOString().slice(0, 10);
    downloadText(output, `ux-prompt-${slug}-${date}.md`);
  };

  // ═══ STYLES ═══
  const styles = {
    root: {
      minHeight: '100vh',
      backgroundColor: 'var(--void)',
      color: 'var(--t1)',
      fontFamily: 'var(--font-sans)',
    },
    container: {
      maxWidth: '1400px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      paddingTop: '2rem',
      paddingBottom: '4rem',
    },
    header: {
      marginBottom: '3rem',
      borderBottom: '1px solid var(--border)',
      paddingBottom: '2rem',
    },
    backLink: {
      display: 'inline-block',
      marginBottom: '1rem',
      color: 'var(--amber)',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'color 0.2s',
      cursor: 'pointer',
    },
    backLinkHover: {
      color: 'var(--amber-dim)',
    },
    title: {
      fontSize: '2.5rem',
      fontFamily: 'var(--font-display)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--amber)',
      marginBottom: '0.5rem',
      fontWeight: '700',
    },
    subtitle: {
      fontSize: '0.875rem',
      color: 'var(--t2)',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.1em',
    },
    section: {
      marginBottom: '3rem',
      padding: '2rem',
      backgroundColor: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: '0.5rem',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontFamily: 'var(--font-display)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--amber)',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid var(--border)',
    },
    sectionDesc: {
      fontSize: '0.875rem',
      color: 'var(--t2)',
      marginBottom: '1.5rem',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
    },
    formField: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'var(--t1)',
      marginBottom: '0.5rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    input: {
      padding: '0.75rem',
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '0.375rem',
      color: 'var(--t1)',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
      // A11Y: focus ring MUST remain visible. We use an amber boxShadow as
      // the focus indicator on :focus-within/:focus (applied via inputFocus).
      outlineOffset: '2px',
    },
    inputFocus: {
      borderColor: 'var(--amber)',
      boxShadow: '0 0 0 2px rgba(var(--amber-rgb), 0.1)',
    },
    textarea: {
      padding: '0.75rem',
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '0.375rem',
      color: 'var(--t1)',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.875rem',
      minHeight: '100px',
      transition: 'all 0.2s',
      // A11Y: focus ring MUST remain visible. We use an amber boxShadow as
      // the focus indicator on :focus-within/:focus (applied via inputFocus).
      outlineOffset: '2px',
      resize: 'vertical' as const,
    },
    select: {
      padding: '0.75rem',
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '0.375rem',
      color: 'var(--t1)',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
      // A11Y: focus ring MUST remain visible. We use an amber boxShadow as
      // the focus indicator on :focus-within/:focus (applied via inputFocus).
      outlineOffset: '2px',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1rem',
    },
    card: (selected: boolean) => ({
      padding: '1rem',
      backgroundColor: selected ? 'rgba(var(--amber-rgb), 0.1)' : 'var(--card)',
      border: selected ? '2px solid var(--amber)' : '1px solid var(--border)',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      userSelect: 'none' as const,
    }),
    cardTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: 'var(--t1)',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    cardDesc: {
      fontSize: '0.8rem',
      color: 'var(--t2)',
      lineHeight: '1.4',
    },
    scoreSection: {
      padding: '2rem',
      backgroundColor: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: '0.5rem',
      marginBottom: '2rem',
    },
    scoreLabelContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
    },
    scoreLabel: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'var(--t1)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    scoreValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'var(--amber)',
      fontFamily: 'var(--font-mono)',
    },
    scoreBar: {
      width: '100%',
      height: '8px',
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '0.25rem',
      overflow: 'hidden' as const,
    },
    scoreBarFill: (percent: number) => ({
      width: `${percent}%`,
      height: '100%',
      backgroundColor: 'var(--amber)',
      transition: 'width 0.4s ease',
      boxShadow: '0 0 8px rgba(var(--amber-rgb), 0.6)',
    }),
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      flexWrap: 'wrap' as const,
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'var(--amber)',
      border: 'none',
      borderRadius: '0.375rem',
      color: 'var(--void)',
      fontWeight: '600',
      fontSize: '0.875rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'var(--font-sans)',
    },
    buttonHover: {
      backgroundColor: 'var(--amber)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(var(--amber-rgb), 0.3)',
    },
    outputSection: {
      padding: '2rem',
      backgroundColor: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: '0.5rem',
    },
    outputHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid var(--border)',
    },
    outputTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: 'var(--t1)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    copyButton: {
      padding: '0.5rem 1rem',
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '0.375rem',
      color: 'var(--amber)',
      fontWeight: '600',
      fontSize: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'var(--font-mono)',
    },
    copyButtonHover: {
      borderColor: 'var(--amber)',
      boxShadow: '0 0 8px rgba(var(--amber-rgb), 0.2)',
    },
    outputText: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      lineHeight: '1.6',
      color: 'var(--t2)',
      whiteSpace: 'pre-wrap' as const,
      wordBreak: 'break-word' as const,
      backgroundColor: 'var(--card)',
      padding: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid var(--border)',
      maxHeight: '400px',
      overflowY: 'auto' as const,
    },
  };

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <Link href="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          <div style={styles.title}>NEXT.JS UX-FIRST PROMPT BUILDER</div>
          <div style={styles.subtitle}>{'// Generate structured prompts for AI-assisted development'}</div>
        </div>

        {/* QUALITY SCORE */}
        <div style={styles.scoreSection}>
          <div style={styles.scoreLabelContainer}>
            <div style={styles.scoreLabel}>Prompt Quality Score</div>
            <div style={styles.scoreValue}>{score}/100</div>
          </div>
          <div style={styles.scoreBar}>
            <div style={styles.scoreBarFill(score)}></div>
          </div>
        </div>

        {/* PROJECT DEFINITION */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>1. Project Definition</div>
          <div style={styles.sectionDesc}>Define your product: name, target users, core problem, and business model</div>
          <div style={styles.formGrid}>
            <div style={styles.formField}>
              <label style={styles.label}>Project Name</label>
              <input
                type="text"
                placeholder="e.g. RentFlow, CatchMoment"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Codename / Slug</label>
              <input
                type="text"
                placeholder="e.g. rentflow"
                value={projectSlug}
                onChange={(e) => setProjectSlug(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Product Description</label>
              <input
                type="text"
                placeholder="One-sentence pitch"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Primary Users / Persona</label>
              <input
                type="text"
                placeholder="e.g. Property managers, Residents"
                value={targetUsers}
                onChange={(e) => setTargetUsers(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Core Problem Solved</label>
              <input
                type="text"
                placeholder="What pain point does this solve?"
                value={coreProblem}
                onChange={(e) => setCoreProblem(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Business Model</label>
              <select
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                style={styles.select}
              >
                <option value="">Select business model</option>
                <option value="SaaS — Subscription">SaaS — Subscription</option>
                <option value="SaaS — Usage-Based">SaaS — Usage-Based</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Internal Tool">Internal Tool</option>
                <option value="B2B Platform">B2B Platform</option>
                <option value="Consumer App">Consumer App</option>
                <option value="Enterprise + Custom">Enterprise + Custom</option>
              </select>
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Target Market</label>
              <select
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                style={styles.select}
              >
                <option value="">Select target market</option>
                <option value="India — Tier 1 Cities">India — Tier 1 Cities</option>
                <option value="India — Nationwide">India — Nationwide</option>
                <option value="Global (EN)">Global (EN)</option>
                <option value="South-East Asia">South-East Asia</option>
                <option value="Enterprise Global">Enterprise Global</option>
                <option value="Local / Regional">Local / Regional</option>
              </select>
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>2. Tech Stack</div>
          <div style={styles.sectionDesc}>Specify your frontend, backend, database, and deployment stack</div>
          <div style={styles.formGrid}>
            <div style={styles.formField}>
              <label style={styles.label}>Frontend</label>
              <input
                type="text"
                placeholder="e.g. Next.js 15, TypeScript, Tailwind v4"
                value={frontend}
                onChange={(e) => setFrontend(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Backend</label>
              <input
                type="text"
                placeholder="e.g. Node.js, Express, tRPC"
                value={backend}
                onChange={(e) => setBackend(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Database</label>
              <input
                type="text"
                placeholder="e.g. PostgreSQL, Prisma ORM"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Deployment</label>
              <input
                type="text"
                placeholder="e.g. Vercel, Docker + AWS"
                value={deployment}
                onChange={(e) => setDeployment(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* PRODUCT GOALS */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>3. Product Goals</div>
          <div style={styles.sectionDesc}>Select goals that apply to your project. Each shapes the generated prompt directives.</div>
          <div style={styles.cardGrid}>
            {uxPromptProductGoals.map((goal) => (
              <div
                key={goal.id}
                style={styles.card(selectedGoals.has(goal.id))}
                onClick={() => toggleGoal(goal.id)}
              >
                <div style={styles.cardTitle}>
                  <span>{goal.emoji}</span>
                  {goal.name}
                </div>
                <div style={styles.cardDesc}>{goal.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* UX LAWS */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>4. UX Laws & Principles</div>
          <div style={styles.sectionDesc}>
            Select 20 UX laws. Each is encoded as an explicit implementation directive. Organized by cognitive category.
          </div>

          {/* Perception & Cognition */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--cyan)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Perception & Cognition
            </div>
            <div style={styles.cardGrid}>
              {uxPromptUxLaws
                .filter((law) => law.categoryGroup === 'perception')
                .map((law) => (
                  <div
                    key={law.id}
                    style={styles.card(selectedLaws.has(law.id))}
                    onClick={() => toggleLaw(law.id)}
                  >
                    <div style={styles.cardTitle}>{law.name}</div>
                    <div style={styles.cardDesc}>{law.description}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: '0.5rem' }}>
                      {law.category}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Attention & Engagement */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--green)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Attention & Engagement
            </div>
            <div style={styles.cardGrid}>
              {uxPromptUxLaws
                .filter((law) => law.categoryGroup === 'attention')
                .map((law) => (
                  <div
                    key={law.id}
                    style={styles.card(selectedLaws.has(law.id))}
                    onClick={() => toggleLaw(law.id)}
                  >
                    <div style={styles.cardTitle}>{law.name}</div>
                    <div style={styles.cardDesc}>{law.description}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: '0.5rem' }}>
                      {law.category}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Design Principles */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--sky)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Design Principles
            </div>
            <div style={styles.cardGrid}>
              {uxPromptUxLaws
                .filter((law) => law.categoryGroup === 'design')
                .map((law) => (
                  <div
                    key={law.id}
                    style={styles.card(selectedLaws.has(law.id))}
                    onClick={() => toggleLaw(law.id)}
                  >
                    <div style={styles.cardTitle}>{law.name}</div>
                    <div style={styles.cardDesc}>{law.description}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: '0.5rem' }}>
                      {law.category}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--pink)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Accessibility
            </div>
            <div style={styles.cardGrid}>
              {uxPromptUxLaws
                .filter((law) => law.categoryGroup === 'accessibility')
                .map((law) => (
                  <div
                    key={law.id}
                    style={styles.card(selectedLaws.has(law.id))}
                    onClick={() => toggleLaw(law.id)}
                  >
                    <div style={styles.cardTitle}>{law.name}</div>
                    <div style={styles.cardDesc}>{law.description}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: '0.5rem' }}>
                      {law.category}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* VALIDATION STATUS */}
        {!canGenerate && (
          <div
            role="status"
            aria-live="polite"
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1rem',
              borderLeft: '3px solid var(--amber)',
              backgroundColor: 'rgba(var(--amber-rgb), 0.06)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--t2)',
              borderRadius: '0.25rem',
            }}
          >
            Missing required:{' '}
            <span style={{ color: 'var(--amber)' }}>
              {missingFields.map((k) => REQUIRED_LABELS_UX[k]).join(' · ')}
            </span>{' '}
            <span style={{ color: 'var(--t3)' }}>
              ({uxPromptRequiredFields.length - missingFields.length}/
              {uxPromptRequiredFields.length})
            </span>
          </div>
        )}

        {/* GENERATE BUTTON */}
        <div style={styles.buttonContainer}>
          <button
            onClick={generatePrompt}
            disabled={!canGenerate}
            aria-disabled={!canGenerate}
            style={{
              ...styles.button,
              opacity: canGenerate ? 1 : 0.45,
              cursor: canGenerate ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={(e) => {
              if (canGenerate) Object.assign(e.currentTarget.style, styles.buttonHover);
            }}
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                backgroundColor: 'var(--amber)',
                transform: 'translateY(0)',
              })
            }
          >
            Generate Prompt
          </button>
        </div>

        {/* OUTPUT */}
        {output && (
          <div style={styles.outputSection}>
            <div style={styles.outputHeader}>
              <div style={styles.outputTitle}>Generated Prompt</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={downloadPrompt}
                  title="Download as Markdown"
                  style={styles.copyButton}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, styles.copyButtonHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, {
                      borderColor: 'var(--border)',
                      boxShadow: 'none',
                    })
                  }
                >
                  ↓ .md
                </button>
                <button
                  onClick={copyToClipboard}
                  style={styles.copyButton}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, styles.copyButtonHover)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, {
                      borderColor: 'var(--border)',
                      boxShadow: 'none',
                    })
                  }
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div style={styles.outputText}>{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}
