<template>
  <div>
    <PageHeader
      section="Foundations"
      title="Shadows"
      description="Shadow tokens cover position offsets, blur values, and color tints for consistent elevation across the system."
    />

    <!-- Shadow Color Tokens -->
    <section class="section">
      <h2 class="section-title">Shadow Colors</h2>
      <p class="section-desc">Colored glows for feedback states and interactive elements.</p>
      <div class="shadow-color-grid">
        <div v-for="(data, name) in shadows.color" :key="name" class="shadow-color-card">
          <div
            class="shadow-preview"
            :style="{ boxShadow: `0 8px 24px ${data.value}` }"
          />
          <div class="sc-name">shadow.color.{{ name }}</div>
          <code class="sc-value">{{ data.value }}</code>
          <div class="sc-label">{{ data.label }}</div>
        </div>
      </div>
    </section>

    <!-- Position tokens -->
    <div class="two-col">
      <section class="section">
        <h2 class="section-title">Position — Positive</h2>
        <p class="section-desc">Drop shadow offsets pointing downward.</p>
        <div class="token-list">
          <div v-for="(value, name) in shadows.position.positive" :key="name" class="token-row">
            <div class="shadow-mini" :style="{ boxShadow: `0 ${value}px ${value * 2}px rgba(0,0,0,0.15)` }" />
            <span class="t-name">position.positive.{{ name }}</span>
            <code class="t-value">{{ value }}px</code>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Position — Negative</h2>
        <p class="section-desc">Drop shadow offsets pointing upward.</p>
        <div class="token-list">
          <div v-for="(value, name) in shadows.position.negative" :key="name" class="token-row">
            <div class="shadow-mini" :style="{ boxShadow: `0 ${value}px ${Math.abs(value) * 2}px rgba(0,0,0,0.12)` }" />
            <span class="t-name">position.negative.{{ name }}</span>
            <code class="t-value">{{ value }}px</code>
          </div>
        </div>
      </section>
    </div>

    <!-- Blur tokens -->
    <div class="two-col">
      <section class="section">
        <h2 class="section-title">Blur — Positive</h2>
        <p class="section-desc">Increasing blur spread values.</p>
        <div class="token-list">
          <div v-for="(value, name) in shadows.blur.positive" :key="name" class="token-row">
            <span class="t-name">blur.positive.{{ name }}</span>
            <code class="t-value">{{ value }}px</code>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Blur — Negative</h2>
        <p class="section-desc">Inward blur values for inner shadows.</p>
        <div class="token-list">
          <div v-for="(value, name) in shadows.blur.negative" :key="name" class="token-row">
            <span class="t-name">blur.negative.{{ name }}</span>
            <code class="t-value">{{ value }}px</code>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { theme, global as globalTokens } from '@/data/tokens.js'
import PageHeader from '@/components/ui/PageHeader.vue'

const shadows = computed(() => ({
  // Flatten theme.shadow: { neutral: { lighter: hex } } → { 'neutral/lighter': { value: hex } }
  color: Object.fromEntries(
    Object.entries(theme.shadow).flatMap(([cat, variants]) =>
      Object.entries(variants).map(([variant, hex]) => [
        `${cat}/${variant}`, { value: hex, label: cat }
      ])
    )
  ),
  position: globalTokens.shadow.position,
  blur: globalTokens.shadow.blur,
}))
</script>

<style scoped>
.section {
  margin-bottom: 44px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #09090b;
  margin: 0 0 8px;
}

.section-desc {
  font-size: 13.5px;
  color: #71717a;
  margin: 0 0 20px;
}

.shadow-color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.shadow-color-card {
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 20px 16px 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.shadow-preview {
  width: 48px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  margin-bottom: 4px;
}

.sc-name {
  font-size: 11px;
  font-weight: 600;
  color: #3f3f46;
  line-height: 1.3;
}

.sc-value {
  font-family: monospace;
  font-size: 10.5px;
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 4px;
  color: #52525b;
  width: fit-content;
}

.sc-label {
  font-size: 11px;
  color: #a1a1aa;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.token-list {
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.token-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid #f4f4f5;
}

.token-row:last-child {
  border-bottom: none;
}

.shadow-mini {
  width: 24px;
  height: 24px;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 4px;
  flex-shrink: 0;
}

.t-name {
  font-size: 12px;
  font-weight: 500;
  color: #3f3f46;
  flex: 1;
  font-family: monospace;
}

.t-value {
  font-family: monospace;
  font-size: 11px;
  background: #f4f4f5;
  padding: 2px 7px;
  border-radius: 4px;
  color: #52525b;
  white-space: nowrap;
}

@media (max-width: 700px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
