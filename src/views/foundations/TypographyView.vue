<template>
  <div>
    <PageHeader
      section="Foundations"
      title="Typography"
      description="The PULSE type system covers font families, a fluid size scale, weights, line heights, and letter spacing tokens."
    />

    <!-- Font Families -->
    <section class="section">
      <h2 class="section-title">Font Families</h2>
      <div class="token-card" v-for="(data, name) in typography.families" :key="name">
        <div class="family-specimen" :style="{ fontFamily: data.value }">
          The quick brown fox jumps over the lazy dog
        </div>
        <div class="family-meta">
          <span class="family-name">{{ name }}</span>
          <code class="family-value">{{ data.value }}</code>
        </div>
        <div class="family-desc">{{ data.value }} — font/family/{{ name }}</div>
      </div>
    </section>

    <!-- Type Scale -->
    <section class="section">
      <h2 class="section-title">Type Scale</h2>
      <p class="section-desc">Live specimens at each size. Token: <code>size.{name}</code></p>
      <div class="scale-list">
        <div v-for="(data, name) in typography.size" :key="name" class="scale-row">
          <div class="scale-meta">
            <span class="scale-name">{{ name }}</span>
            <code class="scale-px">{{ data.value }}</code>
          </div>
          <div class="scale-specimen" :style="{ fontSize: data.value, lineHeight: '1.2' }">
            The quick brown fox
          </div>
        </div>
      </div>
    </section>

    <!-- Weights -->
    <section class="section">
      <h2 class="section-title">Font Weights</h2>
      <div class="weight-list">
        <div v-for="(data, name) in typography.weight" :key="name" class="weight-row">
          <div class="weight-meta">
            <span class="scale-name">{{ name }}</span>
            <code class="scale-px">{{ data.value }}</code>
          </div>
          <div class="weight-specimen" :style="{ fontWeight: data.value }">
            PULSE Design System
          </div>
        </div>
      </div>
    </section>

    <!-- Line Height -->
    <section class="section">
      <h2 class="section-title">Line Height</h2>
      <div class="token-card" v-for="(data, name) in typography.lineHeight" :key="name">
        <div class="lh-specimen" :style="{ lineHeight: data.value }">
          This line uses <strong>{{ name }}</strong> line height ({{ data.value }}). Multiple lines show the spacing between them.
        </div>
        <div class="family-meta">
          <span class="family-name">lineHeight.{{ name }}</span>
          <code class="family-value">{{ data.value }}</code>
        </div>
      </div>
    </section>

    <!-- Letter Spacing -->
    <section class="section">
      <h2 class="section-title">Letter Spacing</h2>
      <div class="weight-list">
        <div v-for="(data, name) in typography.letterSpacing" :key="name" class="weight-row">
          <div class="weight-meta">
            <span class="scale-name">{{ name }}</span>
            <code class="scale-px">{{ data.value }}</code>
          </div>
          <div class="weight-specimen" :style="{ letterSpacing: data.value }">
            PULSE DESIGN SYSTEM
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { rootFont, global as globalTokens } from '@/data/tokens.js'
import PageHeader from '@/components/ui/PageHeader.vue'

// Shape new collection data into the { name: { value } } format the template uses
const typography = computed(() => ({
  families: Object.fromEntries(
    Object.entries(globalTokens.font.family).map(([k, v]) => [k, { value: v }])
  ),
  size: Object.fromEntries(
    Object.entries(rootFont.font.size).map(([k, v]) => [k, { value: v + 'px' }])
  ),
  weight: Object.fromEntries(
    Object.entries(rootFont.font.weight).map(([k, v]) => [k, { value: String(v) }])
  ),
  lineHeight: Object.fromEntries(
    Object.entries(rootFont.font['line-height']).map(([k, v]) => [k, { value: v + 'px' }])
  ),
  letterSpacing: Object.fromEntries(
    Object.entries(rootFont.font['letter-spacing']).map(([k, v]) => [k, { value: v + 'px' }])
  ),
}))
</script>

<style scoped>
.section {
  margin-bottom: 52px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #09090b;
  margin: 0 0 16px;
}

.section-desc {
  font-size: 13.5px;
  color: #71717a;
  margin: -8px 0 20px;
}

.token-card {
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 12px;
  background: #fff;
}

.family-specimen {
  font-size: 22px;
  color: #09090b;
  margin-bottom: 12px;
  line-height: 1.3;
}

.family-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.family-name {
  font-size: 12px;
  font-weight: 600;
  color: #3f3f46;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.family-value {
  font-family: monospace;
  font-size: 11.5px;
  background: #f4f4f5;
  padding: 2px 8px;
  border-radius: 4px;
  color: #52525b;
}

.family-desc {
  font-size: 12px;
  color: #a1a1aa;
}

.scale-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.scale-row {
  display: flex;
  align-items: baseline;
  gap: 24px;
  padding: 14px 20px;
  border-bottom: 1px solid #f4f4f5;
}

.scale-row:last-child {
  border-bottom: none;
}

.scale-meta {
  min-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.scale-name {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #a1a1aa;
}

.scale-px {
  font-family: monospace;
  font-size: 11px;
  background: #f4f4f5;
  padding: 1px 6px;
  border-radius: 3px;
  color: #71717a;
  width: fit-content;
}

.scale-specimen {
  color: #09090b;
  flex: 1;
}

.weight-list {
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.weight-row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  border-bottom: 1px solid #f4f4f5;
}

.weight-row:last-child {
  border-bottom: none;
}

.weight-meta {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.weight-specimen {
  font-size: 16px;
  color: #09090b;
  flex: 1;
}

.lh-specimen {
  font-size: 14px;
  color: #52525b;
  margin-bottom: 10px;
  max-width: 480px;
}
</style>
