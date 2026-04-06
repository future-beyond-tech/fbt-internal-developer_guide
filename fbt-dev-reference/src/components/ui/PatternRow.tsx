interface PatternRowProps {
  name: string;
  family: string;
  description: string;
  when: string;
}

export function PatternRow({ name, family, description, when }: PatternRowProps) {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', alignItems: 'start', gap: '16px', padding: '11px 14px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', marginBottom: '7px', transition: 'border-color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(124,77,255,0.3)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--t1)' }}>{name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fbt-hi)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{family}</div>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5 }}>{description}</div>
      <div style={{ fontSize: '11px', color: 'var(--t3)', fontStyle: 'italic', minWidth: '150px', textAlign: 'right' }}>{when}</div>
    </div>
  );
}
