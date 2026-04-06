'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { uxPromptUxLaws, uxPromptProductGoals } from '@/data/ux-prompt';

type UxLaw = (typeof uxPromptUxLaws)[0];
type ProductGoal = (typeof uxPromptProductGoals)[0];

export default function UxPromptGeneratorPage() {
  // ═══ FORM STATE ═══
  const [projectName, setProjectName] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [targetUsers, setTargetUsers] = useState('');
  const [coreProblem, setCoreProblems] = useState('');
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

  // ═══ PROMPT GENERATION ═══
  const generatePrompt = () => {
    const selectedLawsData = uxPromptUxLaws.filter((law) => selectedLaws.has(law.id));
    const selectedGoalsData = uxPromptProductGoals.filter((goal) => selectedGoals.has(goal.id));

    const prompt = `# UX-FIRST NEXT.JS PROMPT BUILDER

## PROJECT DEFINITION
**Project Name:** ${projectName || '(not specified)'}
**Codename/Slug:** ${projectSlug || '(not specified)'}
**Description:** ${projectDesc || '(not specified)'}
**Primary Users:** ${targetUsers || '(not specified)'}
**Core Problem:** ${coreProblem || '(not specified)'}
**Business Model:** ${businessModel || '(not specified)'}
**Target Market:** ${targetMarket || '(not specified)'}

## TECH STACK
**Frontend:** ${frontend}
**Backend:** ${backend || '(not specified)'}
**Database:** ${database || '(not specified)'}
**Deployment:** ${deployment || '(not specified)'}

## PRODUCT GOALS DIRECTIVES
${selectedGoalsData
  .map((goal) => `### ${goal.emoji} ${goal.name}\n${goal.directive}`)
  .join('\n\n')}

## UX LAWS & PRINCIPLES
The following UX laws must be implemented as explicit directives in all component design:

${selectedLawsData
  .map(
    (law) =>
      `### ${law.name}
**Category:** ${law.category}
**Description:** ${law.description}
**Implementation:** ${law.implementation}`
  )
  .join('\n\n')}

## GENERATION DIRECTIVES
1. **Cyberpunk Dark Theme:** Use the FBT design system with --fbt (#512BD4), --cyan (#00E5CC), --amber (#FFB020) for accent.
2. **Component-First:** Build reusable, modular components. Every interactive element is tested in isolation.
3. **Accessibility-First:** ${selectedLaws.has('wcag') ? 'WCAG 2.2 AA is mandatory.' : 'Accessibility standards should be considered.'} All interactive elements are keyboard navigable.
4. **Performance:** ${selectedLaws.has('doherty') ? 'Target <100ms perceived response for all interactions.' : 'Optimize for fast perceived performance.'}
5. **Mobile-Responsive:** ${selectedGoals.has('goal-mobile') ? 'Mobile-first design from 320px up.' : 'Responsive design across all breakpoints.'}
6. **Type-Safe:** Use TypeScript strict mode. No \`any\` types.

## IMPLEMENTATION CHECKLIST
- [ ] Project structure set up
- [ ] Design tokens defined
- [ ] Component library scaffolded
- [ ] Form validation patterns
- [ ] Error handling & recovery flows
- [ ] Loading and empty states
- [ ] Analytics instrumentation${selectedGoals.has('goal-analytics') ? ' (PostHog/Mixpanel)' : ''}
- [ ] Accessibility testing (axe-core)
- [ ] Mobile testing on real devices
- [ ] Launch checklist

---
**Generated by:** UX-First Prompt Builder
**Quality Score:** ${score}/100
`;

    setOutput(prompt);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      outline: 'none' as const,
    },
    inputFocus: {
      borderColor: 'var(--amber)',
      boxShadow: '0 0 0 2px rgba(255, 176, 32, 0.1)',
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
      outline: 'none' as const,
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
      outline: 'none' as const,
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1rem',
    },
    card: (selected: boolean) => ({
      padding: '1rem',
      backgroundColor: selected ? 'rgba(255, 176, 32, 0.1)' : 'var(--card)',
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
      boxShadow: '0 0 8px rgba(255, 176, 32, 0.6)',
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
      backgroundColor: '#FFC840',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(255, 176, 32, 0.3)',
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
      boxShadow: '0 0 8px rgba(255, 176, 32, 0.2)',
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
          <div style={styles.subtitle}>// Generate structured prompts for AI-assisted development</div>
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
                onChange={(e) => setCoreProblems(e.target.value)}
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

        {/* GENERATE BUTTON */}
        <div style={styles.buttonContainer}>
          <button
            onClick={generatePrompt}
            style={styles.button}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'var(--amber)', transform: 'translateY(0)' })}
          >
            Generate Prompt
          </button>
        </div>

        {/* OUTPUT */}
        {output && (
          <div style={styles.outputSection}>
            <div style={styles.outputHeader}>
              <div style={styles.outputTitle}>Generated Prompt</div>
              <button
                onClick={copyToClipboard}
                style={styles.copyButton}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.copyButtonHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { borderColor: 'var(--border)', boxShadow: 'none' })}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div style={styles.outputText}>{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}
