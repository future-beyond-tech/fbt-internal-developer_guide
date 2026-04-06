'use client';
import { useState, useEffect } from 'react';

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 9999, background: 'var(--void)' }}>
      <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #512BD4, #00E5CC)', transition: 'width 0.1s', boxShadow: '0 0 10px rgba(0,229,204,0.5)' }} />
    </div>
  );
}
