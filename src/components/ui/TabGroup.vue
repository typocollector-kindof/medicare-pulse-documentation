<template>
  <div class="tab-group">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="tab-btn"
      :class="{ active: modelValue === tab.value }"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, required: true },
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.tab-group {
  display: flex;
  border-bottom: 1px solid #e4e4e7;
  margin-bottom: 28px;
  gap: 0;
}

.tab-btn {
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: 500;
  color: #71717a;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.tab-btn:hover {
  color: #09090b;
}

.tab-btn.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
}
</style>
