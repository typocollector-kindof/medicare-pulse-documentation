import { createRouter, createWebHistory } from 'vue-router'

export const NAV_TREE = [
  {
    label: 'Introduction',
    children: [
      { label: 'Overview', path: '/', name: 'overview' },
      { label: 'Getting Started', path: '/getting-started', name: 'getting-started' },
    ],
  },
  {
    label: 'Foundations',
    children: [
      { label: 'Colors', path: '/foundations/colors', name: 'colors' },
      { label: 'Typography', path: '/foundations/typography', name: 'typography' },
      { label: 'Icons', path: '/foundations/icons', name: 'icons' },
      { label: 'Spacing & Layout', path: '/foundations/spacing', name: 'spacing' },
      { label: 'Shadows', path: '/foundations/shadows', name: 'shadows' },
    ],
  },
  {
    label: 'Components',
    children: [
      { label: 'Button', path: '/components/button', name: 'component-button' },
      { label: 'Input', path: '/components/input', name: 'component-input' },
      { label: 'Badge', path: '/components/badge', name: 'component-badge' },
      { label: 'Card', path: '/components/card', name: 'component-card' },
      { label: 'Modal', path: '/components/modal', name: 'component-modal' },
    ],
  },
]

const router = createRouter({
  history: createWebHistory('/medicare-pulse-documentation/'),
  routes: [
    {
      path: '/',
      component: () => import('@/views/introduction/OverviewView.vue'),
      name: 'overview',
    },
    {
      path: '/getting-started',
      component: () => import('@/views/introduction/GettingStartedView.vue'),
      name: 'getting-started',
    },
    {
      path: '/foundations/colors',
      component: () => import('@/views/foundations/ColorsView.vue'),
      name: 'colors',
    },
    {
      path: '/foundations/typography',
      component: () => import('@/views/foundations/TypographyView.vue'),
      name: 'typography',
    },
    {
      path: '/foundations/icons',
      component: () => import('@/views/foundations/IconsView.vue'),
      name: 'icons',
    },
    {
      path: '/foundations/spacing',
      component: () => import('@/views/foundations/SpacingView.vue'),
      name: 'spacing',
    },
    {
      path: '/foundations/shadows',
      component: () => import('@/views/foundations/ShadowsView.vue'),
      name: 'shadows',
    },
    {
      path: '/components/:slug',
      component: () => import('@/views/components/ComponentView.vue'),
      name: 'component',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
