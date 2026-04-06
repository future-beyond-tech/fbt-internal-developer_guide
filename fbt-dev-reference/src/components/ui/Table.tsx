interface TableProps {
  headers: string[];
  rows: string[][];
  highlightFirst?: boolean;
}

export function Table({ headers, rows, highlightFirst = true }: TableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--t3)', padding: '9px 13px', background: 'var(--raised)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ transition: 'background 0.1s' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,77,255,0.04)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '10px 13px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: ci === 0 && highlightFirst ? 'var(--cyan-accent)' : ci === 1 && highlightFirst ? 'var(--t1)' : 'var(--t2)', fontFamily: ci === 0 && highlightFirst ? 'var(--font-mono)' : 'inherit', fontSize: ci === 0 && highlightFirst ? '11px' : '12px', fontWeight: ci <= 1 && highlightFirst ? 500 : 400, verticalAlign: 'top', whiteSpace: ci === 0 ? 'nowrap' : 'normal' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
