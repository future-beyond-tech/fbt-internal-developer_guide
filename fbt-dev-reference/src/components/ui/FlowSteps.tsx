interface FlowStep {
  title: string;
  description: string;
}

export function FlowSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
          {i < steps.length - 1 && (
            <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '-8px', width: '1px', background: 'var(--fbt-lo)', transition: 'background-color 0.2s' }} />
          )}
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--raised)', border: '1px solid var(--fbt-lo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--fbt-hi)', flexShrink: 0, zIndex: 1, transition: 'background-color 0.2s, border-color 0.2s, color 0.2s' }}>{i + 1}</div>
          <div style={{ padding: '6px 0 20px' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, marginBottom: '4px', color: 'var(--t1)' }}>{step.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--t2)' }}>{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
