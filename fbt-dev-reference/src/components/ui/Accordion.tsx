'use client';
import { useState } from 'react';

interface AccordionProps {
  title: string;
  icon?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Accordion({ title, icon, badge, defaultOpen = false, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '8px', overflow: 'hidden' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', background: 'var(--card)', cursor: 'pointer', width: '100%', border: 'none', color: 'var(--t1)', transition: 'background 0.15s', textAlign: 'left' }}
      >
        {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: 700, flex: 1 }}>{title}</span>
        {badge && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--t3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{badge}</span>}
        <span style={{ fontSize: '10px', color: 'var(--t3)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>
      {isOpen && (
        <div style={{ padding: '16px', background: 'var(--deep)', borderTop: '1px solid var(--border)' }}>
          {children}
        </div>
      )}
    </div>
  );
}
