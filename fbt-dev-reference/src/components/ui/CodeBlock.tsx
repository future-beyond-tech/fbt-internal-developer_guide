'use client';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.replace(/<[^>]*>/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{ position: 'relative', background: 'var(--void)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#B8C4FF', overflowX: 'auto', margin: '8px 0', lineHeight: '1.6' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {language && (
        <span style={{ position: 'absolute', top: '6px', right: '40px', fontSize: '8.5px', color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{language}</span>
      )}
      <button
        onClick={handleCopy}
        style={{ position: 'absolute', top: '6px', right: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', padding: '2px 8px', fontSize: '9px', color: copied ? 'var(--green)' : 'var(--t3)', cursor: 'pointer', fontFamily: 'var(--font-mono)', opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}
