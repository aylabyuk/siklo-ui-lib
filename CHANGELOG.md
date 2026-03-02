# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-03-01

### Added

- **Select** component — fully keyboard-navigable dropdown built on Radix Select with grouped items, check indicator, and popper positioning
- **Tooltip** component — accessible tooltip with configurable placement, delay, and arrow built on Radix Tooltip
- **Toast** component — notification system with `useToast` hook, `ToastProvider`, four variants (default, success, error, warning), auto-dismiss, swipe-to-dismiss, and action button support
- **InputField** component — custom accessible form field with auto-generated IDs, label, helper text, error states, and full ARIA wiring (`aria-describedby`, `aria-invalid`, `aria-required`)
- jsdom mocks in `vitest.setup.ts` for Radix browser APIs (`hasPointerCapture`, `scrollIntoView`, `ResizeObserver`)

### Changed

- Refactored all components to use `React.FC<Props>` pattern
- Refactored all components from function declarations to arrow function expressions
- Updated CLAUDE.md to reflect actual package versions (React 19, Storybook 10)

## [0.1.0] - 2026-02-28

### Added

- Project scaffolding with Vite + React 19 + TypeScript
- Storybook 10 with `@storybook/react-vite` and a11y addon
- Vitest 4 with jsdom environment and React Testing Library
- Prettier with import sorting plugin
- **Design token pipeline**: Tokens Studio (DTCG format) → Style Dictionary → CSS variables + TypeScript constants
  - Base tokens: colors, typography, spacing, radii, shadows, motion
  - Semantic tokens: role-based color aliases, component-level tokens
- **Button** component — primary, secondary, ghost, destructive variants; sm/md/lg sizes; loading spinner; icon slots; `asChild` via Radix Slot
- **Dialog** component — accessible modal with focus trapping, overlay, enter/exit animations, built on Radix Dialog
- React 19 ref-as-prop pattern (no `forwardRef`)
