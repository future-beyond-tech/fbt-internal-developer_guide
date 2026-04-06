'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();

  const isBackend = pathname === '/backend';
  const isFrontend = pathname === '/frontend';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 200,
      height: '52px',
      background: 'rgba(5,5,15,0.95)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '14px',
    }}>
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="ref-menu-toggle"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--t2)',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '4px',
        }}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          letterSpacing: '0.12em',
          color: '#00E5CC',
          textShadow: '0 0 20px rgba(0,229,204,0.5)',
        }}>
          FBT<em style={{ color: '#7C4DFF', fontStyle: 'normal' }}> PARTNER</em>
        </span>
      </Link>

      <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: '4px' }}>
        <Link href="/backend" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          padding: '5px 12px',
          borderRadius: '4px',
          textDecoration: 'none',
          letterSpacing: '0.06em',
          textTransform: 'uppercase' as const,
          background: isBackend ? 'rgba(124,77,255,0.2)' : 'transparent',
          color: isBackend ? '#7C4DFF' : 'var(--t3)',
          border: isBackend ? '1px solid rgba(124,77,255,0.4)' : '1px solid transparent',
          transition: 'all 0.15s',
        }}>
          Backend
        </Link>
        <Link href="/frontend" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          padding: '5px 12px',
          borderRadius: '4px',
          textDecoration: 'none',
          letterSpacing: '0.06em',
          textTransform: 'uppercase' as const,
          background: isFrontend ? 'rgba(0,229,204,0.12)' : 'transparent',
          color: isFrontend ? '#00E5CC' : 'var(--t3)',
          border: isFrontend ? '1px solid rgba(0,229,204,0.3)' : '1px solid transparent',
          transition: 'all 0.15s',
        }}>
          Frontend
        </Link>
      </nav>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isBackend && (
          <>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500, padding: '3px 9px', borderRadius: '2px', letterSpacing: '0.06em', background: 'rgba(81,43,212,0.3)', color: '#9B72FF', border: '1px solid rgba(81,43,212,0.5)' }}>.NET</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500, padding: '3px 9px', borderRadius: '2px', letterSpacing: '0.06em', background: 'rgba(255,176,32,0.12)', color: '#FFB020', border: '1px solid rgba(255,176,32,0.3)' }}>PYTHON</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500, padding: '3px 9px', borderRadius: '2px', letterSpacing: '0.06em', background: 'rgba(255,64,96,0.12)', color: '#FF6080', border: '1px solid rgba(255,64,96,0.3)' }}>RUST</span>
          </>
        )}
        {isFrontend && (
          <>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500, padding: '3px 9px', borderRadius: '2px', letterSpacing: '0.06em', background: 'rgba(56,189,248,0.12)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.3)' }}>REACT 19</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500, padding: '3px 9px', borderRadius: '2px', letterSpacing: '0.06em', background: 'rgba(255,255,255,0.06)', color: 'var(--t2)', border: '1px solid var(--border)' }}>NEXT.JS 15</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500, padding: '3px 9px', borderRadius: '2px', letterSpacing: '0.06em', background: 'rgba(81,43,212,0.25)', color: '#7C4DFF', border: '1px solid rgba(124,77,255,0.5)' }}>TS 5</span>
          </>
        )}

        {/* Cmd+K hint */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '5px 11px',
          marginLeft: '8px',
          cursor: 'pointer',
        }}
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        >
          <span style={{ color: 'var(--t4)', fontSize: '13px' }}>🔍</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--t4)' }}>Search</span>
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '1px 5px', background: 'var(--raised)', borderRadius: '2px', color: 'var(--t4)', border: '1px solid var(--border)' }}>⌘K</kbd>
        </div>
      </div>
    </header>
  );
}
