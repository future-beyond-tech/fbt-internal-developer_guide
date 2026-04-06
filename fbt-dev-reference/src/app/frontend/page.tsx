'use client';

import { ReferencePage } from '@/components/layout/ReferencePage';
import { frontendNav, frontendSections, frontendHero } from '@/data/frontend';

export default function FrontendPage() {
  return (
    <ReferencePage
      nav={frontendNav}
      sections={frontendSections}
      hero={frontendHero}
      variant="frontend"
    />
  );
}
