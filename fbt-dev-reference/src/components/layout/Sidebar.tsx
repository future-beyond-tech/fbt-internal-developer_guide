'use client';

import { useEffect, useState } from 'react';

interface NavItem {
  id?: string;
  title?: string;
  label?: string;
  href?: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  nav: NavSection[];
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ nav, isOpen, onClose }: SidebarProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const getItemId = (item: NavItem) => item.id || item.href?.replace('#', '') || '';
  const getItemTitle = (item: NavItem) => item.title || item.label || '';

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`ref-mobile-overlay${isOpen ? ' show' : ''}`}
        onClick={onClose}
      />

      <nav className={`ref-sidebar${isOpen ? ' open' : ''}`}>
        {nav.map((section, si) => (
          <div key={si}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8.5px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--t4)',
              padding: si === 0 ? '6px 16px 5px' : '14px 16px 5px',
            }}>
              {section.label}
            </div>
            {section.items.map((item, ii) => {
              const itemId = getItemId(item);
              const isActive = activeId === itemId;
              return (
                <a
                  key={ii}
                  href={`#${itemId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(itemId)?.scrollIntoView({ behavior: 'smooth' });
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9px',
                    padding: '6px 16px',
                    color: isActive ? 'var(--t1)' : 'var(--t3)',
                    textDecoration: 'none',
                    fontSize: '12px',
                    transition: 'all 0.12s',
                    borderLeft: `2px solid ${isActive ? '#7C4DFF' : 'transparent'}`,
                    background: isActive ? 'rgba(124,77,255,0.08)' : 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: isActive ? '#7C4DFF' : 'currentColor',
                    flexShrink: 0,
                    opacity: isActive ? 1 : 0.5,
                    boxShadow: isActive ? '0 0 6px #7C4DFF' : 'none',
                  }} />
                  {getItemTitle(item)}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
