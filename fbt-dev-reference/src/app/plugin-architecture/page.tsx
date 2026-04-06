'use client';
import { ReferencePage } from '@/components/layout/ReferencePage';
import { pluginArchNav, pluginArchSections, pluginArchHero } from '@/data/plugin-architecture';

export default function PluginArchPage() {
  return (
    <ReferencePage
      nav={pluginArchNav}
      sections={pluginArchSections}
      hero={pluginArchHero}
      variant="plugin-architecture"
    />
  );
}
