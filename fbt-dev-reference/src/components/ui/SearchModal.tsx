'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchItem {
  title: string;
  section: string;
  href: string;
  description?: string;
}

interface SearchModalProps {
  items: SearchItem[];
}

export function SearchModal({ items }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.section.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '120px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-bg)', backdropFilter: 'blur(8px)' }} onClick={() => setIsOpen(false)} />
      <div style={{ position: 'relative', width: '100%', maxWidth: '560px', background: 'var(--modal-bg)', border: '1px solid var(--border-hi)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', transition: 'background-color 0.2s, border-color 0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--border)', transition: 'border-color 0.2s' }}>
          <span style={{ color: 'var(--t3)', fontSize: '18px' }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patterns, technologies, concepts..."
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--t1)', fontFamily: 'var(--font-mono)', fontSize: '14px', transition: 'color 0.2s' }}
          />
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 6px', background: 'var(--raised)', borderRadius: '3px', color: 'var(--t3)', border: '1px solid var(--border)', transition: 'background-color 0.2s, border-color 0.2s, color 0.2s' }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--t3)', fontSize: '13px', transition: 'color 0.2s' }}>No results found</div>
          ) : (
            filtered.slice(0, 20).map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  router.push(item.href);
                  setIsOpen(false);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', color: 'var(--t1)', transition: 'background-color 0.1s, color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--hover-bg)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.title}</div>
                  {item.description && <div style={{ fontSize: '11px', color: 'var(--t3)', marginTop: '2px', transition: 'color 0.2s' }}>{item.description}</div>}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--t4)', padding: '2px 6px', background: 'var(--raised)', borderRadius: '3px', transition: 'background-color 0.2s, color 0.2s' }}>{item.section}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
