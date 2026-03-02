# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.2](https://github.com/aylabyuk/siklo-ui-lib/compare/v0.3.1...v0.3.2) (2026-03-02)


### Fixed

* restore controls and add prop descriptions via argTypes ([bbb96b1](https://github.com/aylabyuk/siklo-ui-lib/commit/bbb96b1317fb5d9d7e411141fe76a822c95516c9))
* switch to react-docgen-typescript for prop descriptions ([cb0705c](https://github.com/aylabyuk/siklo-ui-lib/commit/cb0705c72e337f0af39ef7b06ae623f971269ebd))


### Documentation

* add JSDoc comments and autodocs to all components ([92d7547](https://github.com/aylabyuk/siklo-ui-lib/commit/92d75476dc50be9426cbee25e19f68fcd34aa0b4))

## [0.3.1](https://github.com/aylabyuk/siklo-ui-lib/compare/v0.3.0...v0.3.1) (2026-03-02)


### Added

* make version number dynamic on Welcome page ([122072d](https://github.com/aylabyuk/siklo-ui-lib/commit/122072dcb94d22a392afab96d70531c355a58f43))

## [0.3.0] - 2026-03-01

### Added

- Storybook documentation pages: Welcome, Getting Started, Design Tokens, Component Status, Changelog
- Custom Storybook theme with Siklo branding
- Changelog docs page that imports repo CHANGELOG.md (single source of truth)
- All 5 primitive color scales visualized (Blue, Slate, Red, Green, Amber)

### Changed

- Converted MDX markdown tables to JSX HTML tables for proper rendering
- Redesigned primitive color swatches as horizontal strips
- Used hardcoded values for typography preview (Storybook docs CSS variable workaround)

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
