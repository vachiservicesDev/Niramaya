// Guard to prevent TinyMCE/webcomponent double-initialization across HMR reloads or duplicate imports.
// Import this module once (early) in main.tsx.

declare global {
  interface Window { __niramaya_tiny_init_done?: boolean }
}

if (!window.__niramaya_tiny_init_done) {
  window.__niramaya_tiny_init_done = true

  // If the external bundle or plugin uses customElements.define('mce-autosize-textarea', ...),
  // ensure we never try to re-define it if it already exists:
  if (!customElements.get('mce-autosize-textarea')) {
    // Nothing to define here directly - this check prevents errors
    // when the third-party bundle calls customElements.define later.
    // If you control the bundle, apply the same guard where define is called.
  } else {
    console.info('mce-autosize-textarea already defined; skipping duplicate define.')
  }
}
export {}
