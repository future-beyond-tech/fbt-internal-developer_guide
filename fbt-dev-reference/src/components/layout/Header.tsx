'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const navLinks = [
  { href: '/backend', label: 'Backend', color: '#7C4DFF', bg: 'rgba(124,77,255,0.2)', border: 'rgba(124,77,255,0.4)' },
  { href: '/frontend', label: 'Frontend', color: '#00E5CC', bg: 'rgba(0,229,204,0.12)', border: 'rgba(0,229,204,0.3)' },
  { href: '/system-design', label: 'Sys Design', color: '#39FF14', bg: 'rgba(57,255,20,0.1)', border: 'rgba(57,255,20,0.25)' },
  { href: '/plugin-architecture', label: 'Plugins', color: '#C9872A', bg: 'rgba(201,135,42,0.12)', border: 'rgba(201,135,42,0.3)' },
  { href: '/tools/cowork', label: 'Cowork', color: '#7C4DFF', bg: 'rgba(124,77,255,0.15)', border: 'rgba(124,77,255,0.3)' },
  { href: '/tools/ux-prompt', label: 'UX', color: '#FFB020', bg: 'rgba(255,176,32,0.12)', border: 'rgba(255,176,32,0.3)' },
  { href: '/tools/kickoff', label: 'Kickoff', color: '#00E5CC', bg: 'rgba(0,229,204,0.1)', border: 'rgba(0,229,204,0.25)' },
];

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();

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
      padding: '0 16px',
      gap: '10px',
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
      <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          letterSpacing: '0.1em',
          color: '#00E5CC',
          textShadow: '0 0 20px rgba(0,229,204,0.5)',
        }}>
          FBT<em style={{ color: '#7C4DFF', fontStyle: 'normal' }}> P</em>
        </span>
      </Link>

      <div style={{ width: '1px', height: '20px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: '3px', overflowX: 'auto', flexShrink: 1, minWidth: 0 }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '4px 8px',
              borderRadius: '3px',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              background: isActive ? link.bg : 'transparent',
              color: isActive ? link.color : 'var(--t3)',
              border: isActive ? `1px solid ${link.border}` : '1px solid transparent',
              transition: 'all 0.15s',
            }}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side - Search */}
      <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '4px 9px',
          cursor: 'pointer',
        }}
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--t4)' }}>Search</span>
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '1px 4px', background: 'var(--raised)', borderRadius: '2px', color: 'var(--t4)', border: '1px solid var(--border)' }}>⌘K</kbd>
        </div>
      </div>
    </header>
  );
}
