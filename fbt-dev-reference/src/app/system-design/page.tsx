'use client';
import { ReferencePage } from '@/components/layout/ReferencePage';
import { systemDesignNav, systemDesignSections, systemDesignHero } from '@/data/system-design';

export default function SystemDesignPage() {
  return (
    <ReferencePage
      nav={systemDesignNav}
      sections={systemDesignSections}
      hero={systemDesignHero}
      variant="system-design"
    />
  );
}
