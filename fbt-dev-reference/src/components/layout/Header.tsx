'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const navLinks = [
  { href: '/backend', label: 'Backend', color: 'var(--fbt-hi)', darkBg: 'rgba(124,77,255,0.14)', lightBg: 'rgba(91,45,212,0.08)', border: 'rgba(var(--fbt-hi-rgb),0.35)' },
  { href: '/frontend', label: 'Frontend', color: 'var(--cyan)', darkBg: 'rgba(0,245,221,0.10)', lightBg: 'rgba(0,136,120,0.08)', border: 'rgba(var(--cyan-rgb),0.30)' },
  { href: '/system-design', label: 'Sys Design', color: 'var(--green)', darkBg: 'rgba(0,232,156,0.10)', lightBg: 'rgba(0,144,96,0.08)', border: 'rgba(var(--green-rgb),0.30)' },
  { href: '/plugin-architecture', label: 'Plugins', color: 'var(--amber)', darkBg: 'rgba(255,184,64,0.10)', lightBg: 'rgba(196,120,0,0.08)', border: 'rgba(var(--amber-rgb),0.30)' },
  { href: '/tools/cowork', label: 'Cowork', color: 'var(--fbt-hi)', darkBg: 'rgba(124,77,255,0.12)', lightBg: 'rgba(91,45,212,0.06)', border: 'rgba(var(--fbt-hi-rgb),0.30)' },
  { href: '/tools/ux-prompt', label: 'UX', color: 'var(--amber)', darkBg: 'rgba(255,184,64,0.10)', lightBg: 'rgba(196,120,0,0.08)', border: 'rgba(var(--amber-rgb),0.30)' },
  { href: '/tools/kickoff', label: 'Kickoff', color: 'var(--cyan)', darkBg: 'rgba(0,245,221,0.08)', lightBg: 'rgba(0,136,120,0.06)', border: 'rgba(var(--cyan-rgb),0.25)' },
];

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const { toggleTheme, isDark } = useTheme();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 200,
      height: '56px',
      background: 'var(--header-bg)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--header-border)',
      boxShadow: 'var(--header-shadow)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '12px',
      transition: 'all 0.35s ease',
    }}>
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="ref-menu-toggle"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--t2)',
          fontSize: '22px',
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
          fontSize: '24px',
          letterSpacing: '0.12em',
          color: 'var(--cyan)',
          textShadow: isDark ? '0 0 24px rgba(var(--cyan-rgb),0.5)' : 'none',
        }}>
          FBT<em style={{ color: 'var(--fbt-hi)', fontStyle: 'normal' }}> P</em>
        </span>
      </Link>

      <div style={{ width: '1px', height: '24px', background: 'var(--border)', flexShrink: 0 }} />

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: '4px', overflowX: 'auto', flexShrink: 1, minWidth: 0 }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              fontWeight: isActive ? 600 : 400,
              padding: '5px 10px',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              background: isActive ? (isDark ? link.darkBg : link.lightBg) : 'transparent',
              color: isActive ? link.color : 'var(--t3)',
              border: isActive ? `1px solid ${link.border}` : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Theme Toggle — Premium pill */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          style={{
            position: 'relative',
            width: '52px',
            height: '28px',
            borderRadius: '14px',
            border: `1.5px solid ${isDark ? 'rgba(var(--fbt-hi-rgb),0.35)' : 'rgba(var(--amber-rgb),0.30)'}`,
            background: isDark
              ? 'linear-gradient(135deg, rgba(var(--fbt-hi-rgb),0.18), rgba(var(--cyan-rgb),0.08))'
              : 'linear-gradient(135deg, rgba(var(--amber-rgb),0.15), rgba(255,160,50,0.08))',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.35s ease',
            overflow: 'hidden',
            boxShadow: isDark
              ? '0 0 12px rgba(var(--fbt-hi-rgb),0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 0 8px rgba(var(--amber-rgb),0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Knob */}
          <div style={{
            position: 'absolute',
            top: '3px',
            left: isDark ? '3px' : '25px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: isDark
              ? 'linear-gradient(135deg, #7C4DFF, #9B72FF)'
              : 'linear-gradient(135deg, #FFB840, #FFD060)',
            boxShadow: isDark
              ? '0 0 10px rgba(var(--fbt-hi-rgb),0.6), 0 2px 6px rgba(0,0,0,0.3)'
              : '0 0 10px rgba(var(--amber-rgb),0.5), 0 2px 6px rgba(0,0,0,0.15)',
            transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, box-shadow 0.35s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
          }}>
            {isDark ? '🌙' : '☀️'}
          </div>
        </button>

        {/* Search pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--raised)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '5px 12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: 'var(--shadow-sm)',
        }}
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--hover-border)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 5px', background: 'var(--card)', borderRadius: '3px', color: 'var(--t3)', border: '1px solid var(--border)', fontWeight: 600 }}>⌘K</kbd>
        </div>
      </div>
    </header>
  );
}
