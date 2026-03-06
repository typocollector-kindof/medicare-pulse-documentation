<template>
  <div class="swatch" :title="tooltipText">
    <div
      class="swatch-color"
      :style="{ background: color }"
    />
    <div class="swatch-info">
      <div class="swatch-name">{{ name }}</div>
      <div class="swatch-value">{{ color }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  color: { type: String, required: true },
})

const tooltipText = computed(() => `${props.name}: ${props.color}`)
</script>

<style scoped>
.swatch {
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: default;
}

.swatch-color {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  min-height: 60px;
}

.swatch-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.swatch-name {
  font-size: 12px;
  font-weight: 500;
  color: #3f3f46;
  line-height: 1.3;
}

.swatch-value {
  font-size: 11px;
  color: #a1a1aa;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
</style>
