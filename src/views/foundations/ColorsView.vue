<template>
  <div>
    <PageHeader
      section="Foundations"
      title="Colors"
      description="The PULSE color system is organized into primitive palettes and semantic aliases that map intent to values."
    />

    <!-- Primitive Colors -->
    <section class="section">
      <h2 class="section-title">Primitive Colors</h2>
      <p class="section-desc">Raw color values organized by family. Use semantic tokens in components — not these directly.</p>

      <div v-for="(shades, family) in primitives" :key="family" class="color-family">
        <div class="family-label">{{ capitalize(family) }}</div>
        <div class="swatch-grid">
          <ColorSwatch
            v-for="(hex, shade) in shades"
            :key="shade"
            :name="`${family}.${shade}`"
            :color="hex"
          />
        </div>
      </div>
    </section>

    <!-- Semantic Colors -->
    <section class="section">
      <h2 class="section-title">Semantic Colors</h2>
      <p class="section-desc">Named tokens mapped to specific UI roles. These are what components and code should reference.</p>

      <div v-for="(tokens, category) in semantic" :key="category" class="semantic-group">
        <h3 class="group-label">{{ capitalize(category) }}</h3>
        <div class="token-list">
          <TokenRow
            v-for="(token, name) in tokens"
            :key="name"
            :name="`${category}/${name}`"
            :value="token.value"
            type="color"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { rootColors, theme } from '@/data/tokens.js'
import PageHeader from '@/components/ui/PageHeader.vue'
import ColorSwatch from '@/components/ui/ColorSwatch.vue'
import TokenRow from '@/components/ui/TokenRow.vue'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Primitives: use rootColors, but skip 'opacity' (deeply nested, not a color palette)
const primitives = computed(() => {
  const { opacity, ...rest } = rootColors
  return rest
})

// Flatten nested object to { 'path/to/key': hex }
function flatten(obj, prefix = '') {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}/${k}` : k
    if (typeof v === 'string') out[path] = v
    else if (typeof v === 'object' && v !== null) Object.assign(out, flatten(v, path))
  }
  return out
}

// Semantic: flatten each theme category into { path: { value: hex } }
const semantic = computed(() => {
  const result = {}
  for (const [cat, tokens] of Object.entries(theme)) {
    const flat = flatten(tokens)
    result[cat] = Object.fromEntries(
      Object.entries(flat).map(([path, hex]) => [path, { value: hex }])
    )
  }
  return result
})
</script>

<style scoped>
.section {
  margin-bottom: 52px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #09090b;
  margin: 0 0 6px;
}

.section-desc {
  font-size: 13.5px;
  color: #71717a;
  margin: 0 0 28px;
  line-height: 1.6;
}

.color-family {
  margin-bottom: 32px;
}

.family-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #a1a1aa;
  margin-bottom: 10px;
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 12px;
}

.semantic-group {
  margin-bottom: 32px;
}

.group-label {
  font-size: 14px;
  font-weight: 600;
  color: #3f3f46;
  margin: 0 0 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f4f4f5;
}

.token-list {
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  padding: 0 16px;
}
</style>
