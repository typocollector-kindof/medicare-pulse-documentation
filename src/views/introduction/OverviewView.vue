<template>
  <div>
    <PageHeader
      section="Introduction"
      title="PULSE Design System"
      description="A cohesive set of design tokens, components, and guidelines for building consistent, accessible, and beautiful product experiences."
    />

    <div class="prose">
      <h2>What is PULSE?</h2>
      <p>
        PULSE is the design system that powers our product suite. It provides a shared visual language — colors, typography, spacing, and components — that allows designers and engineers to build faster, with more consistency and less friction.
      </p>

      <h2>Core Principles</h2>
      <ul>
        <li><strong>Consistency</strong> — The same visual decisions across all surfaces, so users always know where they are.</li>
        <li><strong>Accessibility</strong> — Every token and component is built with WCAG 2.1 AA contrast ratios and keyboard interaction in mind.</li>
        <li><strong>Scalability</strong> — Semantic token layers allow for theming, density changes, and brand variants without touching components.</li>
        <li><strong>Minimal</strong> — Only what's needed. No decorative complexity, no redundant tokens.</li>
      </ul>

      <h2>Layers</h2>
      <p>PULSE is structured in three layers:</p>
      <ul>
        <li><strong>Foundations</strong> — Raw primitives: colors, type scale, spacing, and shadows.</li>
        <li><strong>Semantic Tokens</strong> — Named decisions that map primitives to intent (e.g., <code>text.secondary</code> → <code>gray.500</code>).</li>
        <li><strong>Components</strong> — Composed UI elements that consume semantic tokens.</li>
      </ul>

      <h2>Extracted from Figma</h2>
      <p>
        All tokens on this site are extracted directly from the Figma library using the PULSE CLI. When the Figma library changes, tokens are re-exported and this documentation is regenerated automatically.
      </p>
    </div>

    <div class="quick-links">
      <RouterLink to="/getting-started" class="quick-link">
        <div class="ql-icon">→</div>
        <div>
          <div class="ql-title">Getting Started</div>
          <div class="ql-desc">Set up PULSE in your project</div>
        </div>
      </RouterLink>
      <RouterLink to="/foundations/colors" class="quick-link">
        <div class="ql-icon">◎</div>
        <div>
          <div class="ql-title">Colors</div>
          <div class="ql-desc">Primitives and semantic tokens</div>
        </div>
      </RouterLink>
      <RouterLink to="/foundations/typography" class="quick-link">
        <div class="ql-icon">T</div>
        <div>
          <div class="ql-title">Typography</div>
          <div class="ql-desc">Type scale, weights, families</div>
        </div>
      </RouterLink>
      <RouterLink to="/components/button" class="quick-link">
        <div class="ql-icon">◻</div>
        <div>
          <div class="ql-title">Components</div>
          <div class="ql-desc">Ready-to-use UI building blocks</div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/ui/PageHeader.vue'
</script>

<style scoped>
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  background: #fff;
}

.quick-link:hover {
  border-color: #a1a1aa;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.ql-icon {
  width: 36px;
  height: 36px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

.ql-title {
  font-size: 13.5px;
  font-weight: 600;
  color: #09090b;
  margin-bottom: 2px;
}

.ql-desc {
  font-size: 12px;
  color: #71717a;
}
</style>
