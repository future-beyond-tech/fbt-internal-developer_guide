interface CardProps {
  icon?: string;
  title: string;
  subtitle?: string;
  description?: string;
  accent?: 'purple' | 'cyan' | 'amber' | 'green' | 'red' | 'sky' | 'pink';
  pills?: { label: string; variant: string }[];
  meta?: { label: string; value: string }[];
  children?: React.ReactNode;
  lang?: string;
}

const accentColors: Record<string, string> = {
  purple: 'linear-gradient(90deg, #512BD4, #7C4DFF)',
  cyan: 'linear-gradient(90deg, #00A896, #00E5CC)',
  amber: 'linear-gradient(90deg, #E07000, #FFB020)',
  green: 'linear-gradient(90deg, #009966, #00D68F)',
  red: 'linear-gradient(90deg, #CC0033, #FF4060)',
  sky: 'linear-gradient(90deg, #0066CC, #38BDF8)',
  pink: 'linear-gradient(90deg, #CC0055, #FF2D78)',
};

const pillColors: Record<string, { bg: string; color: string; border: string }> = {
  dotnet: { bg: 'rgba(81,43,212,0.15)', color: '#A080FF', border: 'rgba(81,43,212,0.3)' },
  python: { bg: 'rgba(255,184,48,0.15)', color: '#FFD080', border: 'rgba(255,184,48,0.3)' },
  rust: { bg: 'rgba(255,71,87,0.15)', color: '#FF9090', border: 'rgba(255,71,87,0.3)' },
  all: { bg: 'rgba(0,245,212,0.15)', color: '#00F5D4', border: 'rgba(0,245,212,0.3)' },
  tag: { bg: 'var(--tag-bg)', color: 'var(--tag-color)', border: 'var(--tag-border)' },
  react: { bg: 'rgba(56,189,248,0.12)', color: '#38BDF8', border: 'rgba(56,189,248,0.3)' },
  nextjs: { bg: 'var(--tag-bg)', color: 'var(--t1)', border: 'var(--tag-border)' },
  typescript: { bg: 'rgba(56,189,248,0.12)', color: '#38BDF8', border: 'rgba(56,189,248,0.3)' },
  tailwind: { bg: 'rgba(0,229,204,0.12)', color: '#00E5CC', border: 'rgba(0,229,204,0.25)' },
  tool: { bg: 'rgba(255,176,32,0.12)', color: '#FFB020', border: 'rgba(255,176,32,0.25)' },
};

export function Card({ icon, title, subtitle, description, accent = 'purple', pills, meta, children, lang }: CardProps) {
  return (
    <div
      style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '18px', position: 'relative', overflow: 'hidden', transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.15s', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--hover-border)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accentColors[accent] || accentColors.purple }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
        {icon && <span style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>{icon}</span>}
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: 700, color: 'var(--t1)', lineHeight: 1.3 }}>{title}</div>
          {subtitle && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fbt-hi)', letterSpacing: '0.1em', marginTop: '2px', textTransform: 'uppercase' }}>{subtitle}</div>}
        </div>
        {lang && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{lang}</span>}
      </div>
      {description && <p style={{ fontSize: '12.5px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '10px' }}>{description}</p>}
      {children}
      {meta && meta.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginTop: '10px' }}>
          {meta.map((m, i) => (
            <div key={i} style={{ background: 'var(--raised)', padding: '6px 9px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--t4)' }}>{m.label}</span>
              <span style={{ fontSize: '11.5px', color: 'var(--t1)' }}>{m.value}</span>
            </div>
          ))}
        </div>
      )}
      {pills && pills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
          {pills.map((p, i) => {
            const colors = pillColors[p.variant] || pillColors.tag;
            return (
              <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', padding: '2px 8px', borderRadius: '2px', letterSpacing: '0.04em', background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}>{p.label}</span>
            );
          })}
        </div>
      )}
    </div>
  );
}
