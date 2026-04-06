interface CalloutProps {
  type?: 'purple' | 'cyan' | 'amber' | 'red' | 'green';
  icon?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<string, { bg: string; border: string }> = {
  purple: { bg: 'rgba(var(--fbt-rgb), 0.12)', border: 'var(--fbt)' },
  cyan: { bg: 'rgba(0,229,204,0.07)', border: 'var(--cyan)' },
  amber: { bg: 'rgba(255,176,32,0.08)', border: 'var(--amber)' },
  red: { bg: 'rgba(255,64,96,0.08)', border: 'var(--red)' },
  green: { bg: 'rgba(0,214,143,0.08)', border: 'var(--green)' },
};

export function Callout({ type = 'cyan', icon = '💡', children }: CalloutProps) {
  const style = calloutStyles[type] || calloutStyles.cyan;
  return (
    <div style={{ display: 'flex', gap: '11px', padding: '13px 16px', borderRadius: '6px', margin: '12px 0', fontSize: '12.5px', lineHeight: 1.6, background: style.bg, borderLeft: `3px solid ${style.border}`, transition: 'background-color 0.2s, border-color 0.2s' }}>
      <span>{icon}</span>
      <span style={{ color: 'var(--t1)', transition: 'color 0.2s' }}>{children}</span>
    </div>
  );
}
