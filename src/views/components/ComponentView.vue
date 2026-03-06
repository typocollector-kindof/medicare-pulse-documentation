<template>
  <div v-if="component">
    <PageHeader section="Components" :title="component.label" :description="component.description" />
    <TabGroup :tabs="tabs" v-model="activeTab" />

    <!-- ===== DESIGN TAB ===== -->
    <div v-if="activeTab === 'design'">
      <template v-if="spec">

        <!-- ── BUTTON-STYLE (spec.variants) ──────────────────────────── -->
        <template v-if="spec.variants">

          <!-- Variants -->
          <section class="section">
            <h2 class="section-title">Variants</h2>
            <p class="section-desc">All visual variants at their default state.</p>
            <div class="variant-grid">
              <div v-for="variant in spec.variants" :key="variant.name" class="variant-card">
                <div class="variant-preview" :style="{ background: variant.name === 'Secondary' ? '#f8fafc' : '#fff' }">
                  <div class="btn-preview" :style="getBtnStyle(variant, 'lg', 'default')">
                    <span :style="{ color: variant.text.hex, fontSize: '16px', fontWeight: 500 }">Button</span>
                  </div>
                </div>
                <div class="variant-info">
                  <div class="variant-name">{{ variant.name }}</div>
                  <div class="variant-desc">{{ variant.description }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Sizes -->
          <section class="section">
            <h2 class="section-title">Sizes</h2>
            <p class="section-desc">Three size tokens for use in different density contexts.</p>
            <div class="sizes-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Preview</th>
                    <th>Height</th>
                    <th>Padding V</th>
                    <th>Padding H</th>
                    <th>Font size</th>
                    <th>Font weight</th>
                    <th>Border radius</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="size in spec.sizes" :key="size.name">
                    <td><code class="tag">{{ size.name }}</code></td>
                    <td>
                      <div class="btn-preview" :style="getBtnStyle(spec.variants[0], size.name, 'default')">
                        <span :style="{ color: spec.variants[0].text.hex, fontSize: size.fontSize + 'px', fontWeight: size.fontWeight }">Button</span>
                      </div>
                    </td>
                    <td>{{ size.height }}px</td>
                    <td>{{ size.paddingV }}px</td>
                    <td>{{ size.paddingH }}px</td>
                    <td>{{ size.fontSize }}px</td>
                    <td>{{ size.fontWeight }}</td>
                    <td>{{ size.cornerRadius }}px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- States -->
          <section class="section">
            <h2 class="section-title">States</h2>
            <p class="section-desc">All interactive states applied to each variant.</p>
            <div class="states-wrap">
              <div class="states-grid" :style="{ gridTemplateColumns: '80px repeat(' + spec.variants.length + ', 1fr)' }">
                <div class="state-header" />
                <div class="state-header" v-for="v in spec.variants" :key="v.name">{{ v.name }}</div>

                <div class="state-label">Default</div>
                <div v-for="v in spec.variants" :key="v.name + '-default'" class="state-cell">
                  <div class="btn-preview" :style="getBtnStyle(v, 'lg', 'default')">
                    <span :style="{ color: v.text.hex, fontSize: '14px', fontWeight: 500 }">Button</span>
                  </div>
                </div>

                <div class="state-label">Hover</div>
                <div v-for="v in spec.variants" :key="v.name + '-hover'" class="state-cell">
                  <div class="btn-preview" :style="getBtnStyle(v, 'lg', 'hover')">
                    <span :style="{ color: v.states.hover.text || v.text.hex, fontSize: '14px', fontWeight: 500 }">Button</span>
                  </div>
                </div>

                <div class="state-label">Pressed</div>
                <div v-for="v in spec.variants" :key="v.name + '-pressed'" class="state-cell">
                  <div class="btn-preview" :style="getBtnStyle(v, 'lg', 'pressed')">
                    <span :style="{ color: v.states.pressed.text || v.text.hex, fontSize: '14px', fontWeight: 500 }">Button</span>
                  </div>
                </div>

                <div class="state-label">Disabled</div>
                <div v-for="v in spec.variants" :key="v.name + '-disabled'" class="state-cell">
                  <div class="btn-preview" :style="getBtnStyle(v, 'lg', 'disabled')">
                    <span :style="{ color: v.states.disabled.text, fontSize: '14px', fontWeight: 500 }">Button</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Token Usage — variants-based -->
          <section class="section">
            <h2 class="section-title">Token Usage</h2>
            <p class="section-desc">Design tokens bound to each variant. All values resolve from the PULSE variable library.</p>
            <div class="token-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Property</th>
                    <th>Token</th>
                    <th>Resolved value</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="v in spec.variants" :key="v.name">
                    <tr>
                      <td rowspan="3" class="variant-cell">{{ v.name }}</td>
                      <td>Background</td>
                      <td><code class="token-pill">{{ v.bg.token || '—' }}</code></td>
                      <td>
                        <div class="resolved-color">
                          <span class="color-dot" :style="{ background: v.bg.hex }" />
                          <code>{{ v.bg.hex }}</code>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Border</td>
                      <td><code class="token-pill">{{ v.border.token || '—' }}</code></td>
                      <td>
                        <div class="resolved-color">
                          <span class="color-dot" :style="{ background: v.border.hex, border: v.border.hex === 'transparent' ? '1px dashed #e4e4e7' : 'none' }" />
                          <code>{{ v.border.hex }}</code>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Label text</td>
                      <td><code class="token-pill">{{ v.text.token }}</code></td>
                      <td>
                        <div class="resolved-color">
                          <span class="color-dot" :style="{ background: v.text.hex }" />
                          <code>{{ v.text.hex }}</code>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Anatomy — button -->
          <section class="section">
            <h2 class="section-title">Anatomy</h2>
            <div class="anatomy-wrap">
              <div class="anatomy-preview">
                <div class="anatomy-btn">
                  <span class="anatomy-marker" data-num="1" />
                  <span class="anatomy-icon-slot anatomy-marker-wrap" data-num="3">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>
                  </span>
                  <span class="anatomy-label anatomy-marker-wrap" data-num="2">Button</span>
                  <span class="anatomy-icon-slot anatomy-marker-wrap" data-num="4">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>
                  </span>
                </div>
              </div>
              <div class="anatomy-list">
                <div v-for="(item, i) in spec.anatomy" :key="item.element" class="anatomy-item">
                  <span class="anatomy-num">{{ i + 1 }}</span>
                  <div>
                    <div class="anatomy-element">{{ item.element }}</div>
                    <div class="anatomy-role">{{ item.role }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </template>
        <!-- ── END BUTTON-STYLE ─────────────────────────────────────── -->

        <!-- ── INPUT-STYLE (spec.statuses) ───────────────────────────── -->
        <template v-else-if="spec.statuses">

          <!-- Statuses -->
          <section class="section">
            <h2 class="section-title">Statuses</h2>
            <p class="section-desc">Visual appearance of the field across all interaction and validation states.</p>
            <div class="variant-grid">
              <div v-for="status in spec.statuses" :key="status.name" class="variant-card">
                <div class="variant-preview" :style="{ background: '#f8fafc' }">
                  <div style="display:flex;flex-direction:column;gap:4px;width:200px;">
                    <!-- Mini label -->
                    <div style="font-size:11px;font-weight:600;color:#0f172b;display:flex;align-items:center;gap:3px;">
                      Label
                      <span style="color:#dc2626;">*</span>
                    </div>
                    <!-- Field box -->
                    <div :style="getInputPreviewStyle(status, 'lg')">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;opacity:0.5;"><circle cx="8" cy="8" r="5.5" stroke="#1d293d" stroke-width="1.5"/></svg>
                      <span :style="{ fontSize: '13px', color: status.text.hex, flex: 1 }">
                        {{ status.name === 'placeholder' ? 'Placeholder text' : status.name === 'disabled' ? 'Disabled value' : 'Filled value' }}
                      </span>
                    </div>
                    <!-- Hint text -->
                    <div :style="{ fontSize: '11px', color: status.hint.hex }">
                      {{ status.name === 'success' ? 'Looks good!' : status.name === 'destructive' ? 'This field has an error.' : 'Hint text' }}
                    </div>
                  </div>
                </div>
                <div class="variant-info">
                  <div class="variant-name">{{ status.label }}</div>
                  <div class="variant-desc">{{ status.description }}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Sizes -->
          <section class="section">
            <h2 class="section-title">Sizes</h2>
            <p class="section-desc">Three size tokens for use in different density contexts.</p>
            <div class="sizes-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Preview</th>
                    <th>Field height</th>
                    <th>Padding V</th>
                    <th>Padding H</th>
                    <th>Font size</th>
                    <th>Border radius</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="size in spec.sizes" :key="size.name">
                    <td><code class="tag">{{ size.name }}</code></td>
                    <td>
                      <div :style="getInputSizePreviewStyle(size)">
                        <span :style="{ fontSize: size.fontSize + 'px', color: '#cad5e2' }">Placeholder</span>
                      </div>
                    </td>
                    <td>{{ size.fieldHeight }}px</td>
                    <td>{{ size.paddingV }}px</td>
                    <td>{{ size.paddingH }}px</td>
                    <td>{{ size.fontSize }}px</td>
                    <td>{{ size.cornerRadius }}px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Token Usage — element-based -->
          <section class="section">
            <h2 class="section-title">Token Usage</h2>
            <p class="section-desc">Design tokens bound to each element of the component. All values resolve from the PULSE variable library.</p>
            <div class="token-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>Token</th>
                    <th>Resolved value</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tok in spec.tokens" :key="tok.element">
                    <td><strong>{{ tok.element }}</strong></td>
                    <td><code class="token-pill">{{ tok.token }}</code></td>
                    <td>
                      <div class="resolved-color">
                        <span class="color-dot" :style="{ background: tok.hex }" />
                        <code>{{ tok.hex }}</code>
                      </div>
                    </td>
                    <td class="muted-cell">{{ tok.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Anatomy — input -->
          <section class="section">
            <h2 class="section-title">Anatomy</h2>
            <div class="anatomy-wrap">
              <div class="anatomy-preview">
                <div class="input-anatomy-diagram">
                  <!-- Label row -->
                  <div class="input-anat-label-row anatomy-marker-wrap" data-num="1">
                    <span class="input-anat-label-text">Label</span>
                    <span class="input-anat-required">*</span>
                  </div>
                  <!-- Field box -->
                  <div class="input-anat-field anatomy-marker-wrap" data-num="2">
                    <span class="input-anat-icon anatomy-marker-wrap" data-num="3">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>
                    </span>
                    <span class="input-anat-value anatomy-marker-wrap" data-num="4">Placeholder text</span>
                    <span class="input-anat-icon anatomy-marker-wrap" data-num="5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/></svg>
                    </span>
                  </div>
                  <!-- Hint row -->
                  <div class="input-anat-hint-row">
                    <span class="input-anat-hint anatomy-marker-wrap" data-num="6">This is hint text</span>
                    <span class="input-anat-counter anatomy-marker-wrap" data-num="7">0/100</span>
                  </div>
                </div>
              </div>
              <div class="anatomy-list">
                <div v-for="(item, i) in spec.anatomy" :key="item.element" class="anatomy-item">
                  <span class="anatomy-num">{{ i + 1 }}</span>
                  <div>
                    <div class="anatomy-element">{{ item.element }}</div>
                    <div class="anatomy-role">{{ item.role }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </template>
        <!-- ── END INPUT-STYLE ─────────────────────────────────────── -->

        <!-- ── SHARED SECTIONS ─────────────────────────────────────── -->

        <!-- Component Properties -->
        <section class="section">
          <h2 class="section-title">Component Properties</h2>
          <p class="section-desc">All configurable properties as defined in the Figma component set.</p>
          <div class="token-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Options</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prop in spec.properties" :key="prop.name">
                  <td><strong>{{ prop.name }}</strong></td>
                  <td><code class="tag tag--gray">{{ prop.type }}</code></td>
                  <td>
                    <span v-if="prop.values.length">
                      <code class="tag" v-for="v in prop.values" :key="v">{{ v }}</code>
                    </span>
                    <span v-else class="muted">—</span>
                  </td>
                  <td><code class="tag tag--blue">{{ prop.default }}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Usage Guidelines -->
        <section class="section">
          <h2 class="section-title">Usage Guidelines</h2>
          <div class="do-dont">
            <div class="do-box">
              <div class="do-header">
                <span class="do-icon">✓</span> Do
              </div>
              <ul>
                <li v-for="item in spec.doList" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="dont-box">
              <div class="dont-header">
                <span class="dont-icon">✕</span> Don't
              </div>
              <ul>
                <li v-for="item in spec.dontList" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

      </template>

      <!-- Generic fallback for components without spec -->
      <template v-else>
        <div class="figma-placeholder">
          <div class="figma-placeholder-inner">
            <div class="figma-icon">
              <svg width="32" height="32" viewBox="0 0 38 57" fill="none">
                <path d="M19 28.5C19 25.46 21.46 23 24.5 23C27.54 23 30 25.46 30 28.5C30 31.54 27.54 34 24.5 34C21.46 34 19 31.54 19 28.5Z" fill="#1ABCFE"/>
                <path d="M8 45.5C8 42.46 10.46 40 13.5 40H19V45.5C19 48.54 16.54 51 13.5 51C10.46 51 8 48.54 8 45.5Z" fill="#0ACF83"/>
                <path d="M19 6V17H24.5C27.54 17 30 14.54 30 11.5C30 8.46 27.54 6 24.5 6H19Z" fill="#FF7262"/>
                <path d="M8 11.5C8 14.54 10.46 17 13.5 17H19V6H13.5C10.46 6 8 8.46 8 11.5Z" fill="#F24E1E"/>
                <path d="M8 28.5C8 31.54 10.46 34 13.5 34H19V23H13.5C10.46 23 8 25.46 8 28.5Z" fill="#A259FF"/>
              </svg>
            </div>
            <div class="figma-title">{{ component.label }} — Design spec coming soon</div>
            <div class="figma-subtitle">Figma data for this component hasn't been extracted yet.</div>
            <div class="figma-badge">In progress</div>
          </div>
        </div>
      </template>
    </div>

    <!-- ===== STORYBOOK TAB ===== -->
    <div v-else-if="activeTab === 'storybook'">
      <div v-if="component.storybookEmbedUrl || component.storybookUrl">
        <div class="sb-topbar">
          <div class="sb-topbar-left">
            <svg width="14" height="14" viewBox="0 0 64 80" fill="none">
              <rect width="64" height="80" rx="8" fill="#FF4785"/>
              <rect x="14" y="20" width="36" height="40" rx="4" fill="white"/>
              <rect x="20" y="30" width="24" height="4" rx="2" fill="#FF4785"/>
              <rect x="20" y="40" width="16" height="4" rx="2" fill="#FF4785"/>
            </svg>
            <span>Storybook — {{ component.label }}</span>
          </div>
          <a
            :href="component.storybookUrl || component.storybookEmbedUrl"
            target="_blank"
            rel="noopener"
            class="sb-open-link"
          >
            Open in Storybook ↗
          </a>
        </div>
        <iframe
          :src="component.storybookEmbedUrl || component.storybookUrl"
          class="storybook-frame"
          :title="component.label + ' Storybook'"
          allowfullscreen
        />
      </div>
      <div v-else class="storybook-placeholder">
        <div class="sb-icon">
          <svg width="28" height="32" viewBox="0 0 64 80" fill="none">
            <rect width="64" height="80" rx="8" fill="#FF4785"/>
            <rect x="14" y="20" width="36" height="40" rx="4" fill="white"/>
            <rect x="20" y="30" width="24" height="4" rx="2" fill="#FF4785"/>
            <rect x="20" y="40" width="16" height="4" rx="2" fill="#FF4785"/>
          </svg>
        </div>
        <div class="sb-title">No Storybook URL</div>
        <div class="sb-desc">Add a <code>storybookUrl</code> for <strong>{{ component.label }}</strong> in <code>src/data/components.js</code> to embed the story here.</div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="nf-title">Component not found</div>
    <div class="nf-desc">No component with slug <code>{{ $route.params.slug }}</code></div>
    <RouterLink to="/" class="nf-link">← Back to Overview</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { components } from '@/data/components.js'
import { componentSpecs } from '@/data/componentSpecs.js'
import PageHeader from '@/components/ui/PageHeader.vue'
import TabGroup from '@/components/ui/TabGroup.vue'

const route = useRoute()
const activeTab = ref('design')

const tabs = [
  { label: 'Design', value: 'design' },
  { label: 'Storybook', value: 'storybook' },
]

const component = computed(() => components.find(c => c.slug === route.params.slug))
const spec = computed(() => componentSpecs[route.params.slug] || null)

function getSizeObj(sizeName) {
  return spec.value?.sizes.find(s => s.name === sizeName)
}

// ── Button helpers ────────────────────────────────────────────────────
function getBtnStyle(variant, sizeName, state) {
  const s = getSizeObj(sizeName)
  if (!s) return {}

  let bg = variant.bg.hex
  let border = variant.border.hex

  if (state === 'hover') {
    bg = variant.states.hover.bg
    border = variant.states.hover.border
  } else if (state === 'pressed') {
    bg = variant.states.pressed.bg
    border = variant.states.pressed.border
  } else if (state === 'disabled') {
    bg = variant.states.disabled.bg
    border = variant.states.disabled.border
  }

  return {
    height: s.height + 'px',
    padding: s.paddingV + 'px ' + s.paddingH + 'px',
    borderRadius: s.cornerRadius + 'px',
    background: bg,
    border: border === 'transparent' ? '1px solid transparent' : '1px solid ' + border,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap + 'px',
    cursor: state === 'disabled' ? 'not-allowed' : 'default',
    opacity: state === 'disabled' ? 0.9 : 1,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  }
}

// ── Input helpers ────────────────────────────────────────────────────
function getInputPreviewStyle(status, sizeName) {
  const s = getSizeObj(sizeName)
  const h = s ? s.fieldHeight : 48
  const pV = s ? s.paddingV : 12
  const pH = s ? s.paddingH : 12
  const r = s ? s.cornerRadius : 6

  return {
    height: h + 'px',
    padding: pV + 'px ' + pH + 'px',
    borderRadius: r + 'px',
    background: status.bg.hex,
    border: '1px solid ' + status.border.hex,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxSizing: 'border-box',
    cursor: status.name === 'disabled' ? 'not-allowed' : 'default',
  }
}

function getInputSizePreviewStyle(size) {
  return {
    height: size.fieldHeight + 'px',
    padding: size.paddingV + 'px ' + size.paddingH + 'px',
    borderRadius: size.cornerRadius + 'px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: '160px',
    boxSizing: 'border-box',
  }
}
</script>

<style scoped>
.section { margin-bottom: 52px; }
.section-title { font-size: 20px; font-weight: 700; color: #09090b; margin: 0 0 8px; }
.section-desc { font-size: 13.5px; color: #71717a; margin: 0 0 20px; line-height: 1.6; }

/* Variants grid */
.variant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.variant-card {
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.variant-preview {
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f4f4f5;
  min-height: 88px;
}

.btn-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  user-select: none;
  transition: none;
}

.variant-info { padding: 14px 16px; }
.variant-name { font-size: 13px; font-weight: 600; color: #09090b; margin-bottom: 4px; }
.variant-desc { font-size: 12px; color: #71717a; line-height: 1.5; }

/* Tables */
.sizes-table-wrap, .token-table-wrap { overflow-x: auto; }

.data-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  font-size: 13px;
  background: #fff;
}

.data-table th {
  text-align: left;
  padding: 10px 16px;
  background: #fafafa;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #71717a;
  border-bottom: 1px solid #e4e4e7;
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f4f4f5;
  color: #3f3f46;
  vertical-align: middle;
}

.data-table tr:last-child td { border-bottom: none; }

.variant-cell {
  font-weight: 600;
  color: #09090b;
  white-space: nowrap;
  border-right: 1px solid #f4f4f5;
}

.muted-cell { color: #71717a; font-size: 12.5px; }

.tag {
  display: inline-block;
  font-size: 11px;
  font-family: monospace;
  background: #f4f4f5;
  color: #3f3f46;
  padding: 2px 7px;
  border-radius: 4px;
  margin: 2px 2px 2px 0;
  white-space: nowrap;
}
.tag--gray { background: #f4f4f5; color: #71717a; }
.tag--blue { background: #eff6ff; color: #2563eb; }

.token-pill {
  display: inline-block;
  font-size: 11px;
  font-family: monospace;
  background: #f4f4f5;
  color: #3f3f46;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.resolved-color {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.08);
  flex-shrink: 0;
}

.muted { color: #a1a1aa; font-size: 12px; }

/* States grid */
.states-wrap { overflow-x: auto; }
.states-grid {
  display: grid;
  gap: 1px;
  background: #e4e4e7;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
  min-width: 600px;
}

.state-header {
  background: #fafafa;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #71717a;
  display: flex;
  align-items: center;
}

.state-label {
  background: #fafafa;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 500;
  color: #52525b;
  display: flex;
  align-items: center;
}

.state-cell {
  background: #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Anatomy — shared */
.anatomy-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.anatomy-preview {
  background: #f8fafc;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e4e4e7;
}

/* Anatomy — button */
.anatomy-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 6px;
  background: #d50032;
  border: 1px solid #d50032;
  position: relative;
  color: #f8fafc;
}

.anatomy-marker-wrap { position: relative; }
.anatomy-marker-wrap[data-num]::before,
.anatomy-marker[data-num]::before {
  content: attr(data-num);
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #3b82f6;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.anatomy-marker[data-num] {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px dashed #3b82f6;
  border-radius: 6px;
  pointer-events: none;
}

.anatomy-icon-slot { color: rgba(255,255,255,0.8); }
.anatomy-label { font-size: 16px; font-weight: 500; }

.anatomy-list { padding: 28px 24px; display: flex; flex-direction: column; gap: 16px; }

.anatomy-item { display: flex; align-items: flex-start; gap: 12px; }
.anatomy-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.anatomy-element { font-size: 13px; font-weight: 600; color: #09090b; margin-bottom: 2px; }
.anatomy-role { font-size: 12.5px; color: #71717a; line-height: 1.5; }

/* Anatomy — input diagram */
.input-anatomy-diagram {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 220px;
}

.input-anat-label-row {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 13px;
  font-weight: 600;
  color: #0f172b;
  padding-top: 22px;
}

.input-anat-label-row[data-num]::before {
  top: 0;
  left: 0;
  transform: none;
}

.input-anat-required { color: #dc2626; }

.input-anat-field {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #d50032;
  box-sizing: border-box;
  color: #90a1b9;
  margin-top: 16px;
}

.input-anat-icon {
  color: #1d293d;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.input-anat-value {
  flex: 1;
  font-size: 13px;
  color: #cad5e2;
}

.input-anat-hint-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.input-anat-hint {
  font-size: 11px;
  color: #90a1b9;
}

.input-anat-counter {
  font-size: 11px;
  color: #90a1b9;
}

/* marker positioning for input diagram sub-elements */
.input-anat-icon[data-num]::before { top: -22px; }
.input-anat-value[data-num]::before { top: -22px; }
.input-anat-hint[data-num]::before { top: -22px; }
.input-anat-counter[data-num]::before { top: -22px; }

/* Do / Don't */
.do-dont { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.do-box, .dont-box {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e4e4e7;
}

.do-header, .dont-header {
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.do-header { background: #f0fdf4; color: #166534; border-bottom: 1px solid #bbf7d0; }
.dont-header { background: #fef2f2; color: #991b1b; border-bottom: 1px solid #fecaca; }

.do-icon { color: #16a34a; }
.dont-icon { color: #dc2626; }

.do-box ul, .dont-box ul {
  list-style: none;
  margin: 0;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
}

.do-box li, .dont-box li {
  font-size: 13px;
  color: #3f3f46;
  line-height: 1.55;
  padding-left: 16px;
  position: relative;
}

.do-box li::before { content: '·'; position: absolute; left: 0; color: #16a34a; font-weight: 700; }
.dont-box li::before { content: '·'; position: absolute; left: 0; color: #dc2626; font-weight: 700; }

/* Figma / Storybook placeholders */
.figma-placeholder {
  border: 2px dashed #e4e4e7;
  border-radius: 16px;
  padding: 60px 40px;
  background: #fafafa;
}
.figma-placeholder-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}
.figma-icon {
  width: 64px; height: 64px;
  display: flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid #e4e4e7; border-radius: 14px;
}
.figma-title { font-size: 16px; font-weight: 600; color: #18181b; }
.figma-subtitle { font-size: 13.5px; color: #71717a; max-width: 360px; line-height: 1.5; }
.figma-badge {
  font-size: 11px; font-weight: 600;
  background: #f4f4f5; color: #71717a;
  padding: 4px 12px; border-radius: 100px;
}
.sb-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #fafafa;
  border: 1px solid #e4e4e7;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  font-size: 12.5px;
  color: #52525b;
}

.sb-topbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.sb-open-link {
  font-size: 12px;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.sb-open-link:hover { text-decoration: underline; }

.storybook-frame {
  width: 100%;
  height: 720px;
  border: 1px solid #e4e4e7;
  border-radius: 0 0 10px 10px;
  display: block;
}
.storybook-placeholder {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 60px 40px;
  border: 2px dashed #e4e4e7; border-radius: 16px;
  background: #fafafa; gap: 12px;
}
.sb-icon {
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid #e4e4e7; border-radius: 12px;
}
.sb-title { font-size: 16px; font-weight: 600; color: #18181b; }
.sb-desc { font-size: 13.5px; color: #71717a; max-width: 400px; line-height: 1.55; }

/* Not found */
.not-found {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: 80px 40px; gap: 12px;
}
.nf-title { font-size: 24px; font-weight: 700; color: #09090b; }
.nf-desc { font-size: 14px; color: #71717a; }
.nf-link { font-size: 13.5px; color: #2563eb; text-decoration: none; }
.nf-link:hover { text-decoration: underline; }

@media (max-width: 700px) {
  .anatomy-wrap, .do-dont { grid-template-columns: 1fr; }
}
</style>
