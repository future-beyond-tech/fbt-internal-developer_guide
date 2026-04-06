'use client';

import { ReferencePage } from '@/components/layout/ReferencePage';
import { backendNav, backendSections, backendHero } from '@/data/backend';

export default function BackendPage() {
  return (
    <ReferencePage
      nav={backendNav}
      sections={backendSections}
      hero={backendHero}
      variant="backend"
    />
  );
}
