interface CalloutProps {
  type?: 'purple' | 'cyan' | 'amber' | 'red' | 'green';
  icon?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<string, { bg: string; border: string }> = {
  purple: { bg: 'rgba(81,43,212,0.12)', border: '#512BD4' },
  cyan: { bg: 'rgba(0,229,204,0.07)', border: '#00E5CC' },
  amber: { bg: 'rgba(255,176,32,0.08)', border: '#FFB020' },
  red: { bg: 'rgba(255,64,96,0.08)', border: '#FF4060' },
  green: { bg: 'rgba(0,214,143,0.08)', border: '#00D68F' },
};

export function Callout({ type = 'cyan', icon = '💡', children }: CalloutProps) {
  const style = calloutStyles[type] || calloutStyles.cyan;
  return (
    <div style={{ display: 'flex', gap: '11px', padding: '13px 16px', borderRadius: '6px', margin: '12px 0', fontSize: '12.5px', lineHeight: 1.6, background: style.bg, borderLeft: `3px solid ${style.border}` }}>
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  );
}
