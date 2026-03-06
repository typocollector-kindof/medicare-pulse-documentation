import{P as t}from"./PageHeader-ijXCoGXQ.js";import{c as o,a as n,b as s,o as r}from"./index-CDJEKavy.js";const c={__name:"GettingStartedView",setup(i){return(a,e)=>(r(),o("div",null,[n(t,{section:"Introduction",title:"Getting Started",description:"Add PULSE tokens and components to your project in minutes."}),e[0]||(e[0]=s(`<div class="prose"><h2>Installation</h2><p>Install the PULSE token package from npm:</p><pre><code>npm install @pulse/tokens</code></pre><h2>CSS Custom Properties</h2><p>Import the token stylesheet into your project&#39;s entry file:</p><pre><code>@import &#39;@pulse/tokens/css/tokens.css&#39;;</code></pre><p>This makes all PULSE tokens available as CSS custom properties:</p><pre><code>.my-element {
  color: var(--pulse-text-primary);
  background: var(--pulse-background-default);
  border: 1px solid var(--pulse-border-default);
}</code></pre><h2>JavaScript / TypeScript</h2><p>Import tokens directly in your JS/TS files:</p><pre><code>import { tokens } from &#39;@pulse/tokens&#39;

const primary = tokens.color.brand[500] // &#39;#3b82f6&#39;
const spacing = tokens.spacing.space[4]  // &#39;16px&#39;</code></pre><h2>Figma Library</h2><p> The PULSE Figma Library contains all components and styles. To use it: </p><ul><li>Open any Figma file in your organization</li><li>Go to <strong>Assets panel → Libraries</strong></li><li>Enable <strong>PULSE Design System</strong></li><li>Components and styles will appear in the Assets panel</li></ul><h2>Tailwind CSS</h2><p>If your project uses Tailwind, extend the theme with PULSE tokens:</p><pre><code>// tailwind.config.js
import pulsePreset from &#39;@pulse/tokens/tailwind&#39;

export default {
  presets: [pulsePreset],
  content: [&#39;./src/**/*.{vue,js,ts}&#39;],
}</code></pre><h2>Design Token Layers</h2><p>PULSE uses a two-layer token architecture:</p><ul><li><strong>Primitives</strong> — Raw values (e.g., <code>gray.500 = #71717a</code>). Never use in component code directly.</li><li><strong>Semantic</strong> — Named decisions (e.g., <code>text.secondary = gray.500</code>). Use these in components.</li></ul><p>This separation allows theming: swapping semantic values changes the entire look without touching component code.</p><h2>Support</h2><p> Have questions or want to contribute? Reach out in the <code>#design-system</code> Slack channel or open an issue in the PULSE GitHub repository. </p></div>`,1))]))}};export{c as default};
