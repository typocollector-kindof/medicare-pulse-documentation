<template>
  <div class="page-header">
    <div class="header-meta" v-if="section">{{ section }}</div>
    <h1 class="header-title">{{ title }}</h1>
    <p class="header-description" v-if="description">{{ description }}</p>
    <hr class="header-divider" />
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  section: { type: String, default: '' },
})
</script>

<style scoped>
.page-header {
  margin-bottom: 36px;
}

.header-meta {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #a1a1aa;
  margin-bottom: 8px;
}

.header-title {
  font-size: 32px;
  font-weight: 700;
  color: #09090b;
  margin: 0 0 10px;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.header-description {
  font-size: 15px;
  line-height: 1.65;
  color: #52525b;
  margin: 0 0 24px;
  max-width: 620px;
}

.header-divider {
  border: none;
  border-top: 1px solid #e4e4e7;
  margin: 0;
}
</style>
