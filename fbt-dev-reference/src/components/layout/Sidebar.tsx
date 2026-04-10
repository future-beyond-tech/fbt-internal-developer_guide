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
      <div
        className={`ref-mobile-overlay${isOpen ? ' show' : ''}`}
        onClick={onClose}
      />

      <nav className={`ref-sidebar${isOpen ? ' open' : ''}`}>
        {nav.map((section, si) => (
          <div key={si}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--t3)',
              padding: si === 0 ? '8px 20px 6px' : '18px 20px 6px',
            }}>
              {section.label}
            </div>
            {section.items.map((item, ii) => {
              const isExternalLink = item.href && !item.href.startsWith('#');
              const itemId = getItemId(item);
              const isActive = activeId === itemId;
              return (
                <a
                  key={ii}
                  href={isExternalLink ? item.href : `#${itemId}`}
                  onClick={isExternalLink ? undefined : (e) => {
                    e.preventDefault();
                    document.getElementById(itemId)?.scrollIntoView({ behavior: 'smooth' });
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '7px 20px',
                    color: isActive ? 'var(--t1)' : 'var(--t2)',
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: 'none',
                    fontSize: '12.5px',
                    transition: 'all 0.15s ease',
                    borderLeft: `2.5px solid ${isActive ? 'var(--fbt-hi)' : 'transparent'}`,
                    background: isActive ? 'rgba(var(--fbt-hi-rgb),0.08)' : 'transparent',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--hover-bg)';
                      e.currentTarget.style.color = 'var(--t1)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--t2)';
                    }
                  }}
                >
                  <span style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--fbt-hi)' : 'var(--t4)',
                    flexShrink: 0,
                    boxShadow: isActive ? '0 0 8px var(--fbt-hi)' : 'none',
                    transition: 'all 0.2s ease',
                  }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {getItemTitle(item)}
                  </span>
                  {item.label && !item.title && (
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--t4)',
                      marginLeft: 'auto',
                      flexShrink: 0,
                    }}>
                      {item.label}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
