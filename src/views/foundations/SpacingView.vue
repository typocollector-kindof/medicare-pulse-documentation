<template>
  <div>
    <PageHeader
      section="Foundations"
      title="Spacing & Layout"
      description="PULSE uses a base-4 spacing scale with semantic layout tokens for padding, gap, radius, and more."
    />

    <!-- Space scale -->
    <section class="section">
      <h2 class="section-title">Space Scale</h2>
      <p class="section-desc">Core spacing primitives. Token: <code>space.{n}</code></p>
      <div class="space-list">
        <div v-for="(value, key) in spacing.space" :key="key" class="space-row">
          <span class="space-name">space.{{ key }}</span>
          <div class="space-visual">
            <div class="space-bar" :style="{ width: barWidth(value) }" />
          </div>
          <code class="space-value">{{ value }}</code>
        </div>
      </div>
    </section>

    <!-- Layout tokens -->
    <div class="layout-grid">
      <section v-for="(tokens, group) in spacing.layout" :key="group" class="section">
        <h2 class="section-title">{{ capitalize(group) }}</h2>
        <div class="layout-list">
          <div v-for="(value, name) in tokens" :key="name" class="layout-row">
            <span class="space-name">{{ group }}.{{ name }}</span>
            <code class="space-value">{{ value }}</code>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { rootGlobal, global as globalTokens } from '@/data/tokens.js'
import PageHeader from '@/components/ui/PageHeader.vue'

const spacing = computed(() => ({
  space: rootGlobal.space,
  layout: globalTokens.layout,
}))

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function barWidth(val) {
  const px = parseInt(val)
  if (isNaN(px) || px === 0) return '2px'
  return Math.min(px, 200) + 'px'
}
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

.space-list {
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.space-row {
  display: grid;
  grid-template-columns: 100px 1fr 80px;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  border-bottom: 1px solid #f4f4f5;
}

.space-row:last-child {
  border-bottom: none;
}

.space-name {
  font-size: 12px;
  font-weight: 500;
  color: #3f3f46;
  font-family: monospace;
}

.space-visual {
  display: flex;
  align-items: center;
}

.space-bar {
  height: 12px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 3px;
  min-width: 2px;
  transition: width 0.2s;
}

.space-value {
  font-family: monospace;
  font-size: 11.5px;
  background: #f4f4f5;
  padding: 2px 8px;
  border-radius: 4px;
  color: #52525b;
  text-align: right;
}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
}

.layout-list {
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.layout-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 9px 16px;
  border-bottom: 1px solid #f4f4f5;
}

.layout-row:last-child {
  border-bottom: none;
}
</style>
