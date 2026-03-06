<template>
  <div class="token-row">
    <!-- Color visual -->
    <div v-if="type === 'color'" class="visual-color" :style="{ background: value }" />

    <!-- Spacing visual: horizontal bar -->
    <div v-else-if="type === 'spacing'" class="visual-spacing">
      <div class="spacing-bar" :style="{ width: barWidth }" />
    </div>

    <!-- Shadow visual -->
    <div v-else-if="type === 'shadow'" class="visual-shadow">
      <div class="shadow-box" :style="{ boxShadow: value }" />
    </div>

    <!-- Text / generic visual -->
    <div v-else class="visual-none" />

    <div class="token-name">{{ name }}</div>
    <div class="token-description" v-if="description">{{ description }}</div>
    <code class="token-value">{{ value }}</code>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  value: { type: String, required: true },
  description: { type: String, default: '' },
  type: { type: String, default: 'text' }, // color | spacing | shadow | text
})

const barWidth = computed(() => {
  const px = parseInt(props.value)
  if (isNaN(px)) return '0px'
  return Math.min(px, 160) + 'px'
})
</script>

<style scoped>
.token-row {
  display: grid;
  grid-template-columns: 40px 1fr 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f5;
}

.token-row:last-child {
  border-bottom: none;
}

.visual-color {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.07);
  flex-shrink: 0;
}

.visual-spacing {
  display: flex;
  align-items: center;
  height: 32px;
}

.spacing-bar {
  height: 10px;
  background: #3b82f6;
  border-radius: 3px;
  min-width: 2px;
  transition: width 0.2s;
}

.visual-shadow {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
}

.shadow-box {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #e4e4e7;
}

.visual-none {
  width: 32px;
  height: 32px;
}

.token-name {
  font-size: 13px;
  font-weight: 500;
  color: #18181b;
}

.token-description {
  font-size: 12.5px;
  color: #71717a;
}

.token-value {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 11.5px;
  color: #52525b;
  background: #f4f4f5;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}
</style>
