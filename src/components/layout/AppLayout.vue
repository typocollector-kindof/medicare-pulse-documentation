<template>
  <div class="app-layout">
    <AppSidebar />
    <div class="main-column">
      <header class="top-bar">
        <span class="top-bar-title">PULSE Design System</span>
      </header>
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.top-bar {
  height: 48px;
  min-height: 48px;
  border-bottom: 1px solid #e4e4e7;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: #ffffff;
}

.top-bar-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #a1a1aa;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 40px 48px;
}
</style>
