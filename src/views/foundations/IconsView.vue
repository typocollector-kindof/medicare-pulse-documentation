<template>
  <div>
    <PageHeader
      section="Foundations"
      title="Icons"
      description="PULSE uses two icon collections: Heroicons (open source, by Tailwind Labs) in both outline and solid styles, and custom Medicare icons designed for health-specific use cases."
    />

    <!-- Controls bar -->
    <div class="controls">
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor"
            d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"/>
        </svg>
        <input
          v-model="query"
          class="search-input"
          type="search"
          placeholder="Search icons…"
          autocomplete="off"
        />
        <span v-if="query" class="search-count">{{ totalVisible }} result{{ totalVisible !== 1 ? 's' : '' }}</span>
      </div>

      <div class="filter-tabs">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          class="filter-tab"
          :class="{ active: activeFilter === tab.value }"
          @click="activeFilter = tab.value"
        >
          {{ tab.label }}
          <span class="filter-count">{{ tab.count }}</span>
        </button>
      </div>

      <div class="style-tabs" v-if="activeFilter !== 'medicare'">
        <button
          class="style-tab"
          :class="{ active: heroStyle === 'outline' }"
          @click="heroStyle = 'outline'"
        >Outline</button>
        <button
          class="style-tab"
          :class="{ active: heroStyle === 'solid' }"
          @click="heroStyle = 'solid'"
        >Solid</button>
      </div>
    </div>

    <!-- Medicare custom icons -->
    <template v-if="activeFilter !== 'hero' && visibleMedicare.length">
      <div class="section-label">Medicare Icons <span class="badge">{{ visibleMedicare.length }}</span></div>
      <div class="icon-grid">
        <div
          v-for="icon in visibleMedicare"
          :key="'mc-' + icon.name"
          class="icon-card"
          :class="{ copied: copiedName === 'mc-' + icon.name }"
          @click="copyName(icon.name, 'mc-' + icon.name)"
          :title="icon.name"
        >
          <div class="icon-preview">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" v-html="icon.svg" />
          </div>
          <div class="icon-name">{{ icon.name }}</div>
          <div class="copied-badge">Copied!</div>
        </div>
      </div>
    </template>

    <!-- Heroicons -->
    <template v-if="activeFilter !== 'medicare' && visibleHero.length">
      <div class="section-label">
        Heroicons
        <span class="badge">{{ visibleHero.length }}</span>
        <a href="https://heroicons.com" target="_blank" rel="noopener" class="section-link">heroicons.com ↗</a>
      </div>
      <div class="icon-grid">
        <div
          v-for="icon in visibleHero"
          :key="'hi-' + icon.name"
          class="icon-card"
          :class="{ copied: copiedName === 'hi-' + icon.name }"
          @click="copyName(icon.name, 'hi-' + icon.name)"
          :title="icon.name"
        >
          <div class="icon-preview">
            <svg
              width="24" height="24" viewBox="0 0 24 24"
              :style="heroStyle === 'solid'
                ? 'fill:currentColor;stroke:none'
                : 'fill:none;stroke:currentColor;stroke-width:1.5'"
              v-html="heroStyle === 'outline' ? icon.outline : icon.solid"
            />
          </div>
          <div class="icon-name">{{ icon.name }}</div>
          <div class="copied-badge">Copied!</div>
        </div>
      </div>
    </template>

    <!-- Empty state -->
    <div v-if="totalVisible === 0" class="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"/>
      </svg>
      <div class="empty-title">No icons found for "{{ query }}"</div>
      <div class="empty-desc">Try a different keyword or clear the search.</div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { heroicons } from '@/data/icons.js'
import { medicareIcons } from '@/data/icons.js'
import PageHeader from '@/components/ui/PageHeader.vue'

const query      = ref('')
const activeFilter = ref('all')
const heroStyle  = ref('outline')
const copiedName = ref(null)

const filterTabs = computed(() => [
  { label: 'All',      value: 'all',      count: heroicons.length + medicareIcons.length },
  { label: 'Heroicons', value: 'hero',    count: heroicons.length },
  { label: 'Medicare', value: 'medicare', count: medicareIcons.length },
])

const q = computed(() => query.value.trim().toLowerCase())

const visibleHero     = computed(() => heroicons.filter(i => !q.value || i.name.includes(q.value)))
const visibleMedicare = computed(() => medicareIcons.filter(i => !q.value || i.name.includes(q.value)))
const totalVisible    = computed(() => {
  if (activeFilter.value === 'hero')     return visibleHero.value.length
  if (activeFilter.value === 'medicare') return visibleMedicare.value.length
  return visibleHero.value.length + visibleMedicare.value.length
})

function copyName(name, key) {
  navigator.clipboard.writeText(name).catch(() => {})
  copiedName.value = key
  setTimeout(() => { copiedName.value = null }, 1500)
}
</script>

<style scoped>
/* Controls */
.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
  max-width: 360px;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: #a1a1aa;
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 36px;
  padding: 0 10px 0 34px;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: #18181b;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}

.search-input:focus { border-color: #d50032; }
.search-input::placeholder { color: #a1a1aa; }
.search-input::-webkit-search-cancel-button { cursor: pointer; }

.search-count {
  position: absolute;
  right: 10px;
  font-size: 11px;
  color: #71717a;
  pointer-events: none;
}

.filter-tabs {
  display: flex;
  gap: 4px;
  background: #f4f4f5;
  border-radius: 8px;
  padding: 3px;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  color: #52525b;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.filter-tab.active {
  background: #fff;
  color: #09090b;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
}

.filter-count {
  font-size: 11px;
  background: #e4e4e7;
  color: #52525b;
  padding: 1px 6px;
  border-radius: 100px;
  font-weight: 500;
}

.filter-tab.active .filter-count {
  background: #f4f4f5;
}

.style-tabs {
  display: flex;
  gap: 4px;
  background: #f4f4f5;
  border-radius: 8px;
  padding: 3px;
}

.style-tab {
  padding: 5px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
  color: #52525b;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.style-tab.active {
  background: #fff;
  color: #09090b;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
}

/* Section labels */
.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
  margin-top: 12px;
}

.badge {
  font-size: 11px;
  background: #f4f4f5;
  color: #71717a;
  padding: 2px 7px;
  border-radius: 100px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
}

.section-link {
  font-size: 12px;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}
.section-link:hover { text-decoration: underline; }

/* Icon grid */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 8px;
  margin-bottom: 40px;
}

.icon-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px 12px;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  overflow: hidden;
}

.icon-card:hover {
  border-color: #d50032;
  background: #fff5f7;
  box-shadow: 0 2px 8px rgba(213,0,50,0.08);
}

.icon-card.copied {
  border-color: #059669;
  background: #f0fdf4;
}

.icon-preview {
  color: #0f172b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.icon-name {
  font-size: 10.5px;
  color: #71717a;
  text-align: center;
  line-height: 1.3;
  word-break: break-word;
  max-width: 100%;
}

.icon-card:hover .icon-name { color: #d50032; }
.icon-card.copied .icon-name { color: #059669; }

.copied-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 9px;
  font-weight: 600;
  background: #059669;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.15s;
  pointer-events: none;
}

.icon-card.copied .copied-badge { opacity: 1; }

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 40px;
  color: #a1a1aa;
  text-align: center;
}
.empty-title { font-size: 15px; font-weight: 600; color: #52525b; }
.empty-desc  { font-size: 13px; color: #71717a; }
</style>
