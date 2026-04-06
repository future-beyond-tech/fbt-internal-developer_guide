'use client';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              padding: '5px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              border: '1px solid',
              transition: 'all 0.15s',
              userSelect: 'none',
              background: activeTab === tab.id ? '#512BD4' : 'var(--raised)',
              borderColor: activeTab === tab.id ? '#512BD4' : 'var(--border)',
              color: activeTab === tab.id ? '#fff' : 'var(--t2)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none' }}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
