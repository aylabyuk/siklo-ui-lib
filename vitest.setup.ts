import '@testing-library/jest-dom/vitest'

// Mock pointer capture APIs (not implemented in jsdom, needed by Radix Select)
Element.prototype.hasPointerCapture =
  Element.prototype.hasPointerCapture || (() => false)
Element.prototype.setPointerCapture =
  Element.prototype.setPointerCapture || (() => {})
Element.prototype.releasePointerCapture =
  Element.prototype.releasePointerCapture || (() => {})

// Mock scrollIntoView (not implemented in jsdom, needed by Radix Select items)
Element.prototype.scrollIntoView =
  Element.prototype.scrollIntoView || (() => {})

// Mock ResizeObserver (not implemented in jsdom, needed by Radix popper positioning)
window.ResizeObserver =
  window.ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
