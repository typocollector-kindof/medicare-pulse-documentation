<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <span class="logo-mark">P</span>
      <span class="logo-text">PULSE</span>
    </div>

    <nav class="sidebar-nav">
      <div v-for="section in NAV_TREE" :key="section.label" class="nav-section">
        <div class="nav-section-header">{{ section.label }}</div>
        <ul class="nav-items">
          <li v-for="item in section.children" :key="item.path">
            <RouterLink
              :to="item.path"
              class="nav-item"
              :class="{ active: isActive(item) }"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <div class="sidebar-footer">
      <span>v1.0.0</span>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { NAV_TREE } from '@/router/index.js'

const route = useRoute()

function isActive(item) {
  if (item.path === '/') return route.path === '/'
  return route.path === item.path || route.path.startsWith(item.path + '/')
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width, 240px);
  min-width: var(--sidebar-width, 240px);
  height: 100vh;
  background: #fafafa;
  border-right: 1px solid #e4e4e7;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  height: 48px;
  border-bottom: 1px solid #e4e4e7;
  flex-shrink: 0;
}

.logo-mark {
  width: 26px;
  height: 26px;
  background: #2563eb;
  color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.logo-text {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #09090b;
  text-transform: uppercase;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 20px;
}

.nav-section-header {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a1a1aa;
  padding: 0 16px;
  margin-bottom: 4px;
}

.nav-items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: block;
  padding: 6px 16px;
  font-size: 13.5px;
  color: #52525b;
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color 0.1s, background 0.1s;
  line-height: 1.4;
}

.nav-item:hover {
  color: #09090b;
  background: #f4f4f5;
}

.nav-item.active {
  color: #2563eb;
  background: #eff6ff;
  border-left-color: #2563eb;
  font-weight: 500;
}

.sidebar-footer {
  padding: 12px 16px;
  font-size: 11px;
  color: #a1a1aa;
  border-top: 1px solid #e4e4e7;
}
</style>
