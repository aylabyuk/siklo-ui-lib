# CLAUDE.md — Siklo Design System

> A production-grade React component library built on Radix UI primitives, powered by design tokens, documented in Storybook, and fully tested. Created as a portfolio piece demonstrating senior-level design system engineering.

---

## Purpose

This project demonstrates the skills required for a Senior UI Developer role focused on building and scaling a design system. It showcases:

- Radix UI as a headless foundation for accessible components
- Storybook as a system of record (not just a demo tool)
- A Figma → Design Token → Code pipeline using Style Dictionary
- Component-level testing with Vitest + React Testing Library
- Keyboard navigation, focus management, and screen-reader support throughout

---

## Tech Stack

| Tool                  | Role                                         |
| --------------------- | -------------------------------------------- |
| React 18              | UI framework                                 |
| TypeScript            | Type safety across components and tokens     |
| Radix UI              | Headless, accessible component primitives    |
| Style Dictionary      | Design token transformation pipeline         |
| Storybook 8           | Component documentation, controls, a11y      |
| Vitest                | Unit/component test runner                   |
| React Testing Library | DOM-based component testing                  |
| CSS Modules           | Scoped, token-driven component styles        |
| GitHub Actions        | CI pipeline + Storybook deployment           |
| GitHub Pages          | Hosted Storybook for sharing                 |

---

## Project Structure

```
siklo/
├── .github/
│   └── workflows/
│       └── deploy-storybook.yml    # GitHub Actions: build + deploy Storybook
├── .storybook/
│   ├── main.ts                     # Storybook config
│   ├── preview.ts                  # Global decorators, token imports
│   └── theme.ts                    # Custom Storybook theme (branding)
├── src/
│   ├── tokens/
│   │   ├── figma-export/           # Raw JSON exported from Tokens Studio (source of truth)
│   │   │   ├── base/
│   │   │   │   ├── colors.json
│   │   │   │   ├── typography.json
│   │   │   │   ├── spacing.json
│   │   │   │   ├── radii.json
│   │   │   │   ├── shadows.json
│   │   │   │   └── motion.json
│   │   │   └── semantic/
│   │   │       ├── colors.json
│   │   │       └── components.json
│   │   ├── style-dictionary.config.ts  # Style Dictionary transform config
│   │   └── build/                  # Auto-generated output (CSS vars, TS constants)
│   │       ├── variables.css
│   │       └── tokens.ts
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.figma.tsx    # Code Connect mapping
│   │   │   └── index.ts
│   │   ├── Dialog/
│   │   │   ├── Dialog.tsx
│   │   │   ├── Dialog.module.css
│   │   │   ├── Dialog.stories.tsx
│   │   │   ├── Dialog.test.tsx
│   │   │   ├── Dialog.figma.tsx
│   │   │   └── index.ts
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   ├── Select.module.css
│   │   │   ├── Select.stories.tsx
│   │   │   ├── Select.test.tsx
│   │   │   ├── Select.figma.tsx
│   │   │   └── index.ts
│   │   ├── Tooltip/
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Tooltip.module.css
│   │   │   ├── Tooltip.stories.tsx
│   │   │   ├── Tooltip.test.tsx
│   │   │   ├── Tooltip.figma.tsx
│   │   │   └── index.ts
│   │   ├── Toast/
│   │   │   ├── Toast.tsx
│   │   │   ├── Toast.module.css
│   │   │   ├── Toast.stories.tsx
│   │   │   ├── Toast.test.tsx
│   │   │   ├── Toast.figma.tsx
│   │   │   └── index.ts
│   │   ├── InputField/
│   │   │   ├── InputField.tsx
│   │   │   ├── InputField.module.css
│   │   │   ├── InputField.stories.tsx
│   │   │   ├── InputField.test.tsx
│   │   │   ├── InputField.figma.tsx
│   │   │   └── index.ts
│   │   └── index.ts                # Barrel export for all components
│   └── index.ts                    # Package entry point
├── package.json
├── figma.config.json               # Figma Code Connect configuration
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── CLAUDE.md                       # This file — project instructions
└── README.md                       # Public-facing project overview
```

---

## Implementation Phases

We build this step by step. Each phase is self-contained — we verify it works before moving on. No phase should be started until the previous one is complete and understood.

---

### Phase 1: Project Scaffolding

**Goal:** Set up the project skeleton with all tooling configured and a "hello world" Storybook running.

**Steps:**

1. Initialize the project with Vite + React + TypeScript template
2. Install core dependencies:
   - `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-tooltip`, `@radix-ui/react-toast`
   - `storybook`, `@storybook/react-vite`, `@storybook/addon-essentials`, `@storybook/addon-a11y`
   - `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
   - `style-dictionary`
3. Configure Storybook (`main.ts`, `preview.ts`)
4. Configure Vitest (`vitest.config.ts`)
5. Create the folder structure as outlined above (empty files are fine)
6. Create a placeholder story to confirm Storybook runs

**Checkpoint:** Run `npm run storybook` and see the placeholder story. Run `npm run test` and see a passing placeholder test.

**What you'll learn:**
- How Vite, Storybook 8, and Vitest are configured together
- The role of each config file
- Why we separate `.storybook/` from `src/`

---

### Phase 2: Design Token Pipeline (Figma → Code)

**Goal:** Create a real Figma → JSON → Style Dictionary → CSS/TS pipeline using Tokens Studio, the same workflow used by production design systems.

**Overview:** Instead of hand-writing token JSON files, we define our tokens visually in Figma using the Tokens Studio plugin, export them as JSON, and then use Style Dictionary to transform them into CSS variables and TypeScript constants. This demonstrates the full designer-developer handoff workflow.

#### Phase 2a: Define Tokens in Figma with Tokens Studio

**Steps:**

1. Install the [Tokens Studio plugin](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma) in Figma (free tier is sufficient)
2. Create a new Figma file called "Siklo Design Tokens"
3. In Tokens Studio, define the following token sets:

   **Primitive tokens (`base`):**
   - `colors` — color primitives: a neutral scale (slate-50 through slate-900), a primary scale (blue-50 through blue-900), plus red, green, and amber scales for semantic use. Include white and black.
   - `typography` — font families (1 display, 1 body), a type scale (xs: 12px, sm: 14px, base: 16px, lg: 18px, xl: 20px, 2xl: 24px), font weights (regular: 400, medium: 500, semibold: 600, bold: 700), line-heights (tight: 1.25, normal: 1.5, relaxed: 1.75)
   - `spacing` — scale: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px)
   - `radii` — none (0), sm (4px), md (6px), lg (8px), xl (12px), full (9999px)
   - `shadows` — sm, md, lg, xl (increasing elevation)
   - `motion` — durations: fast (100ms), normal (200ms), slow (300ms); easings: ease-in, ease-out, ease-in-out

   **Semantic tokens (`semantic`):**
   - `colors` — map primitives to roles using references/aliases:
     - `primary` → `{colors.blue.600}`, `primary-foreground` → `{colors.white}`
     - `secondary` → `{colors.slate.100}`, `secondary-foreground` → `{colors.slate.900}`
     - `destructive` → `{colors.red.600}`, `destructive-foreground` → `{colors.white}`
     - `muted` → `{colors.slate.100}`, `muted-foreground` → `{colors.slate.500}`
     - `accent` → `{colors.slate.100}`, `accent-foreground` → `{colors.slate.900}`
     - `background` → `{colors.white}`, `foreground` → `{colors.slate.950}`
     - `border` → `{colors.slate.200}`, `ring` → `{colors.blue.400}`
   - `components` — component-level aliases:
     - `button-primary-bg` → `{semantic.primary}`, `button-primary-text` → `{semantic.primary-foreground}`
     - `input-border` → `{semantic.border}`, `input-focus-ring` → `{semantic.ring}`
     - (Additional component tokens will be added as we build each component)

4. Export tokens from Tokens Studio as JSON:
   - Use "Export" → choose JSON format
   - Save to `src/tokens/figma-export/` in the project
   - This JSON becomes the **single source of truth** — if tokens change in Figma, re-export and rebuild

5. Optionally, set up Tokens Studio's GitHub sync:
   - Tokens Studio can sync directly to a GitHub repo, writing JSON files to a configured path
   - This is a nice-to-have for the demo — it shows the automated Figma → repo pipeline
   - If set up: point it to `src/tokens/figma-export/` in the repo

**Checkpoint:** Tokens are defined in Figma and exported as JSON files in `src/tokens/figma-export/`. You can see the token structure and references in the JSON.

**What you'll learn:**
- How Tokens Studio organizes tokens into sets (primitive vs semantic)
- How token aliasing/referencing works (`{colors.blue.600}` syntax)
- The Figma-side workflow that designers use to maintain a design system
- How JSON export creates the handoff artifact between design and engineering

#### Phase 2b: Transform Tokens with Style Dictionary

**Steps:**

1. Configure Style Dictionary (`style-dictionary.config.ts`):
   - Source: `src/tokens/figma-export/**/*.json`
   - Add a custom parser to handle Tokens Studio's `$value` / `$type` format (DTCG spec)
   - Configure transform groups for:
     - CSS: output → `src/tokens/build/variables.css` (all tokens as `--token-name: value`)
     - TypeScript: output → `src/tokens/build/tokens.ts` (typed constants)
   - Handle token aliases/references so `{colors.blue.600}` resolves to the actual value in output
2. Add npm scripts:
   - `"build:tokens": "style-dictionary build --config src/tokens/style-dictionary.config.ts"`
3. Import `variables.css` in Storybook's `preview.ts` so all stories consume live tokens
4. Create a Storybook docs page: "Design Tokens" that visualizes the token catalog:
   - Color swatches showing primitive and semantic palettes
   - Type scale preview with actual rendered text
   - Spacing visualizer (boxes at each scale step)
   - Shadow examples
   - Include a link to the Figma file

**Checkpoint:** Run `npm run build:tokens` and see generated CSS + TS files. Open Storybook and see the Design Tokens documentation page with live token previews. Change a value in the exported JSON, rebuild, and see it update everywhere.

**What you'll learn:**
- How Style Dictionary transforms and resolves token references
- Handling the DTCG token format (W3C design token spec) that Tokens Studio exports
- The full pipeline: Figma → Tokens Studio → JSON → Style Dictionary → CSS variables + TS constants → consumed by components → documented in Storybook
- Why this pipeline matters: one change in Figma cascades automatically through the entire system

---

### Phase 3: Button Component

**Goal:** Build the first full component end-to-end to establish the pattern for all others.

**Steps:**

1. Build `Button.tsx`:
   - Props: `variant` (primary, secondary, ghost, destructive), `size` (sm, md, lg), `disabled`, `loading`, `icon` (left/right slot), `asChild` (Radix Slot pattern)
   - Use Radix `Slot` for polymorphic rendering (`asChild` prop)
   - All styles driven by CSS variables from tokens
   - Loading state: disable interactions, show spinner, preserve button width
2. Build `Button.module.css`:
   - All values reference CSS custom properties (e.g., `var(--color-primary)`)
   - Variant styles via data attributes: `[data-variant="primary"]`
   - Focus-visible ring using token values
   - Transition durations from motion tokens
3. Build `Button.stories.tsx`:
   - Default story with controls for all props
   - Stories: AllVariants, AllSizes, WithIcon, Loading, Disabled, AsLink (using `asChild`)
   - Docs page with usage guidelines
4. Build `Button.test.tsx`:
   - Renders with correct text
   - Applies variant classes/data attributes
   - Handles click events
   - Disabled state prevents clicks
   - Loading state prevents clicks and shows spinner
   - Keyboard: responds to Enter and Space
   - Accessibility: correct role, aria-disabled, aria-busy

**Checkpoint:** All Button stories render in Storybook with working controls and a11y panel clean. All tests pass.

**What you'll learn:**
- The pattern: Radix primitive → token-driven styles → stories → tests
- How `asChild` and Radix `Slot` enable polymorphic components
- How to use data attributes for variant styling (vs className string manipulation)
- Writing meaningful accessibility tests

---

### Phase 4: Dialog Component

**Goal:** Build an accessible modal dialog with focus trapping and animations.

**Steps:**

1. Build `Dialog.tsx`:
   - Compose from Radix Dialog: `Root`, `Trigger`, `Portal`, `Overlay`, `Content`, `Title`, `Description`, `Close`
   - Expose a clean API: `<Dialog>`, `<DialogTrigger>`, `<DialogContent>`, `<DialogTitle>`, `<DialogDescription>`, `<DialogClose>`
   - Focus trap is automatic via Radix
   - Close on Escape (built-in), close on overlay click (configurable)
2. Build `Dialog.module.css`:
   - Overlay: backdrop blur + semi-transparent background using token colors
   - Content: centered, max-width, padding from spacing tokens, border-radius from radii tokens
   - Entry/exit animations using motion tokens (fade + scale)
   - Use `[data-state="open"]` and `[data-state="closed"]` for animation states
3. Build `Dialog.stories.tsx`:
   - Default, WithForm, LongContent (scrollable), NestedActions, Controlled
   - Show accessible title/description patterns
4. Build `Dialog.test.tsx`:
   - Opens on trigger click
   - Closes on Escape
   - Closes on overlay click
   - Focus moves into dialog on open
   - Focus returns to trigger on close
   - Has accessible role="dialog", aria-labelledby, aria-describedby

**Checkpoint:** Dialog works with full keyboard navigation in Storybook. A11y panel clean. Tests pass.

**What you'll learn:**
- How Radix handles focus trapping and restoration automatically
- Composing multiple Radix sub-components into a clean public API
- CSS animation patterns with `data-state` attributes
- Testing focus management

---

### Phase 5: Select Component

**Goal:** Build a fully keyboard-navigable dropdown select.

**Steps:**

1. Build `Select.tsx`:
   - Compose from Radix Select: `Root`, `Trigger`, `Value`, `Content`, `Viewport`, `Item`, `ItemText`, `Group`, `Label`, `Separator`
   - Expose: `<Select>`, `<SelectTrigger>`, `<SelectContent>`, `<SelectItem>`, `<SelectGroup>`, `<SelectLabel>`
   - Props: `placeholder`, `defaultValue`, `value`, `onValueChange`, `disabled`
   - Chevron icon on trigger
2. Build `Select.module.css`:
   - Trigger: styled like an input field, token-driven border, focus ring
   - Content: dropdown with shadow token, border-radius, smooth open/close animation
   - Item: hover and focus highlight, check icon for selected item
   - Use `[data-highlighted]` for keyboard focus styling
3. Build `Select.stories.tsx`:
   - Default, WithGroups, Placeholder, Disabled, Controlled
4. Build `Select.test.tsx`:
   - Opens on trigger click and keyboard (Enter/Space)
   - Arrow keys navigate items
   - Enter selects item
   - Escape closes without selecting
   - Displays selected value
   - Has correct ARIA roles (listbox, option)

**Checkpoint:** Select is fully navigable via keyboard in Storybook. Tests pass.

**What you'll learn:**
- Radix Select's complex composition model
- How `[data-highlighted]` works for keyboard-driven focus
- ARIA listbox pattern

---

### Phase 6: Tooltip Component

**Goal:** Build a simple, accessible tooltip with configurable placement.

**Steps:**

1. Build `Tooltip.tsx`:
   - Compose from Radix Tooltip: `Provider`, `Root`, `Trigger`, `Portal`, `Content`, `Arrow`
   - Props: `content` (string), `side` (top, right, bottom, left), `delayDuration`, `children` (trigger element)
   - Wrap app-level `Provider` in Storybook's `preview.ts`
2. Build `Tooltip.module.css`:
   - Dark background, light text (or inverse of theme)
   - Subtle animation on enter/exit using motion tokens
   - Arrow matches tooltip background
   - Max-width to prevent overly wide tooltips
3. Build `Tooltip.stories.tsx`:
   - Default, AllPlacements, CustomDelay, OnButton, OnIcon
4. Build `Tooltip.test.tsx`:
   - Shows on hover/focus
   - Hides on mouse leave / blur
   - Has role="tooltip"
   - Accessible via keyboard focus (not just hover)
   - Content is announced by screen readers

**Checkpoint:** Tooltip works on hover and keyboard focus. Tests pass.

**What you'll learn:**
- Radix Tooltip's Provider pattern for global config
- How tooltips must be accessible via keyboard, not just mouse
- Testing hover and focus interactions

---

### Phase 7: Toast Component

**Goal:** Build a notification toast system with auto-dismiss and variants.

**Steps:**

1. Build `Toast.tsx`:
   - Compose from Radix Toast: `Provider`, `Root`, `Title`, `Description`, `Action`, `Close`, `Viewport`
   - Create a `useToast` hook + `ToastProvider` context for imperative usage: `toast({ title, description, variant })`
   - Variants: `default`, `success`, `error`, `warning`
   - Auto-dismiss with configurable duration
   - Swipe to dismiss (built-in with Radix)
2. Build `Toast.module.css`:
   - Viewport positioned bottom-right (configurable)
   - Each variant uses semantic color tokens
   - Slide-in animation from right, slide-out on dismiss
   - Stacked toasts with slight offset
3. Build `Toast.stories.tsx`:
   - Default, AllVariants, WithAction, AutoDismiss, MultipleToasts
   - Interactive story with buttons that trigger toasts
4. Build `Toast.test.tsx`:
   - Renders toast with title and description
   - Auto-dismisses after duration
   - Close button dismisses immediately
   - Variant applies correct styling
   - Has correct ARIA: role="status" or role="alert" for errors
   - Action button is focusable

**Checkpoint:** Toast system works imperatively via hook. Multiple toasts stack. Tests pass.

**What you'll learn:**
- Building a context + hook pattern for imperative component usage
- Radix Toast's swipe gesture support
- ARIA live region patterns (status vs alert)

---

### Phase 8: InputField Component

**Goal:** Build a composable form field with label, input, helper text, and error states.

**Steps:**

1. Build `InputField.tsx`:
   - Not Radix-based (Radix doesn't have a Form primitive we need here) — this is a custom accessible component
   - Props: `label`, `helperText`, `error` (string), `required`, `disabled`, `id` (auto-generated if not provided), `type`, and all standard input HTML attributes
   - Auto-wire `id`, `htmlFor`, `aria-describedby`, `aria-invalid`, `aria-required`
   - Compose: `<Label>`, `<Input>`, `<HelperText>`, `<ErrorMessage>`
2. Build `InputField.module.css`:
   - Input: token-driven border, padding, border-radius, focus ring
   - Error state: red border, error message in destructive color
   - Disabled state: reduced opacity, not-allowed cursor
   - Label: proper spacing, required asterisk indicator
   - Transition on border color change using motion tokens
3. Build `InputField.stories.tsx`:
   - Default, WithHelperText, WithError, Required, Disabled, Password, WithPlaceholder
   - Form example story showing multiple fields together
4. Build `InputField.test.tsx`:
   - Label and input are linked (htmlFor/id)
   - aria-describedby points to helper text
   - aria-invalid is true when error is present
   - aria-required when required
   - Error message is rendered and associated
   - Disabled input doesn't accept focus (or does, per HTML spec — test the attribute)

**Checkpoint:** InputField handles all states cleanly. Accessibility wiring is correct. Tests pass.

**What you'll learn:**
- Building accessible form patterns without a headless library
- The importance of ARIA attribute wiring (describedby, invalid, required)
- Why auto-generated IDs matter for reusable form components

---

### Phase 9: Storybook Documentation & Polish

**Goal:** Turn Storybook from a component playground into a real system of record.

**Steps:**

1. Create a welcome/intro page: "Siklo Design System"
   - What it is, tech stack, architecture diagram
2. Create a "Getting Started" page:
   - Installation, importing components, importing tokens
3. Enhance the "Design Tokens" page from Phase 2:
   - Interactive color swatches, type scale preview, spacing visualizer, shadow examples
4. Add a "Component Status" page:
   - Table showing each component, its status (stable/beta), version, last updated
5. For each component, ensure the Docs tab includes:
   - Description and usage guidance
   - Do's and Don'ts (when to use, when not to use)
   - Prop table (auto-generated by Storybook)
   - Accessibility notes
6. Custom Storybook theme (`theme.ts`):
   - Brand the Storybook UI with the design system's own tokens
7. Add `@storybook/addon-a11y` to every story for live a11y auditing

**Checkpoint:** Storybook feels like a polished, professional design system site — not just a dev tool.

**What you'll learn:**
- How Storybook MDX pages work for custom documentation
- The difference between Storybook as a playground vs. a system of record
- How to brand Storybook itself

---

### Phase 9b: Figma Code Connect

**Goal:** Link your React components back to their Figma representations using Figma Code Connect, so designers inspecting components in Figma see real production code snippets instead of auto-generated CSS.

**Why this matters:** This is specifically listed in CoLab's job posting as a nice-to-have: "Experience leveraging Figma-based workflows to connect design system definitions with production code (e.g., Code Connect, MCP, or similar tools)." This phase directly demonstrates that skill.

**Prerequisites:**
- A Figma file with your components represented as Figma components (doesn't need to be pixel-perfect — simple rectangles with correct variant properties are enough)
- A Figma access token (free, from your Figma account settings)

#### Phase 9b-i: Set Up Figma Components

**Steps:**

1. In your "Siklo Design Tokens" Figma file (or a new file), create simple Figma components for each of your 6 React components:
   - **Button** — create a Figma component with variant properties: `Variant` (primary, secondary, ghost, destructive), `Size` (sm, md, lg), `Disabled` (true/false), `Loading` (true/false)
   - **Dialog** — a component showing the modal layout (overlay + content card + title + description)
   - **Select** — trigger + dropdown representation
   - **Tooltip** — trigger + tooltip bubble with `Side` property (top, right, bottom, left)
   - **Toast** — notification card with `Variant` property (default, success, error, warning)
   - **InputField** — label + input + helper text, with `Error` (true/false), `Disabled` (true/false), `Required` (true/false) properties
2. These don't need to be production-quality designs — they represent the component structure and variant properties. The point is that Code Connect maps Figma properties to React props.

**Checkpoint:** You have Figma components with variant properties that mirror your React component props.

#### Phase 9b-ii: Install and Configure Code Connect

**Steps:**

1. Install Code Connect:
   ```bash
   npm install --save-dev @figma/code-connect
   ```
2. Create a `figma.config.json` in the project root:
   ```json
   {
     "codeConnect": {
       "parser": "react",
       "include": ["src/components/**/*.figma.tsx"],
       "importPaths": {
         "src/components/*": "siklo"
       }
     }
   }
   ```
3. For each component, create a `.figma.tsx` file alongside the component. Example for Button:

   `src/components/Button/Button.figma.tsx`:
   ```tsx
   import figma from "@figma/code-connect";
   import { Button } from "./Button";

   figma.connect(Button, "<FIGMA_COMPONENT_URL>", {
     props: {
       variant: figma.enum("Variant", {
         Primary: "primary",
         Secondary: "secondary",
         Ghost: "ghost",
         Destructive: "destructive",
       }),
       size: figma.enum("Size", {
         Small: "sm",
         Medium: "md",
         Large: "lg",
       }),
       disabled: figma.boolean("Disabled"),
       loading: figma.boolean("Loading"),
       label: figma.string("Label"),
     },
     example: (props) => (
       <Button
         variant={props.variant}
         size={props.size}
         disabled={props.disabled}
         loading={props.loading}
       >
         {props.label}
       </Button>
     ),
   });
   ```

4. Repeat for all 6 components, mapping each Figma variant property to the corresponding React prop
5. Publish your Code Connect mappings:
   ```bash
   npx figma connect publish
   ```

**Checkpoint:** Open Figma, inspect any of your components, and see the real React code snippet in the "Code" panel — with correct props mapped to the selected Figma variant. For example, selecting the "Destructive + Large" variant of Button shows `<Button variant="destructive" size="lg">`.

#### Phase 9b-iii: Document the Workflow

**Steps:**

1. Add a "Figma Integration" page in Storybook documenting:
   - The token pipeline: Figma (Tokens Studio) → JSON → Style Dictionary → CSS/TS
   - The component connection: Figma Components → Code Connect → React source code
   - How designers and developers stay in sync
   - A diagram showing the full bidirectional workflow
2. Update the README with a "Figma Integration" section explaining both pipelines
3. Link to the Figma file in both Storybook and the README

**Checkpoint:** A viewer of your Storybook or README can understand the complete Figma ↔ Code workflow.

**What you'll learn:**
- How Code Connect bridges the gap between design and engineering
- Mapping Figma variant properties to React props
- The difference between token sync (Tokens Studio) and component sync (Code Connect)
- How this workflow eliminates the "inspect in Figma → manually translate to code" bottleneck
- Why this matters at scale: when a design system has 50+ components, Code Connect ensures designers and developers always see the same truth

---

### Phase 10: CI/CD + Deployment

**Goal:** Automate testing and deploy Storybook to GitHub Pages.

**Steps:**

1. Create `.github/workflows/deploy-storybook.yml`:
   - Trigger: push to `main`
   - Steps: checkout → install → build tokens → run tests → build storybook → deploy to GitHub Pages
2. Create `.github/workflows/ci.yml` (optional, for PRs):
   - Trigger: pull request
   - Steps: checkout → install → build tokens → run tests → build storybook (verify it builds)
3. Configure `package.json` scripts:
   - `"build:tokens"` — run Style Dictionary
   - `"test"` — run Vitest
   - `"storybook"` — dev server
   - `"build-storybook"` — production build
   - `"build"` — full pipeline: tokens → test → build-storybook
4. Add a `README.md`:
   - Project overview, live Storybook link, architecture diagram
   - Token pipeline diagram: `Figma (Tokens Studio) → JSON Export → Style Dictionary → CSS Variables + TS Constants → Components → Storybook`
   - Link to the Figma token file
   - Local setup instructions
   - Component list with status
5. Final review:
   - All 6 components have stories, tests, and docs
   - All tests pass
   - Storybook builds cleanly
   - Deployed Storybook is accessible via URL

**Checkpoint:** Push to `main` triggers a deploy. Live Storybook URL is shareable with CoLab.

**What you'll learn:**
- GitHub Actions workflow for frontend projects
- How to chain token builds → tests → deployments
- Presenting your work publicly

---

## Coding Standards

These rules apply across all phases:

### Components
- Every component must be fully keyboard navigable
- Every component must pass Storybook's a11y addon audit with zero violations
- Use `data-*` attributes for variant/state styling, not className string construction
- Every component exports a named export and a default export from its `index.ts`
- Props interfaces are explicitly defined and exported (e.g., `export interface ButtonProps`)

### Tokens
- Never hardcode colors, spacing, font sizes, shadows, or radii in component CSS
- Always reference CSS custom properties: `var(--color-primary)`, `var(--spacing-4)`
- Semantic tokens reference primitive tokens — components reference semantic tokens

### Styles
- CSS Modules for scoping (`.module.css`)
- No inline styles except for truly dynamic values (e.g., computed widths)
- Follow the cascade: base → variant → state → interactive (hover/focus/active)

### Stories
- Every component needs at minimum: a Default story, a Docs page, and variant stories
- Use `args` and `argTypes` for interactive controls
- Group related stories logically

### Tests
- Test behavior, not implementation
- Every component needs: render test, interaction test, accessibility test, keyboard nav test
- Use `screen.getByRole()` over `getByTestId()` — if you can't find it by role, it's probably not accessible

### Git
- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
- One phase = one branch → PR → merge to main
- Each PR should include: code + stories + tests + docs

---

## Useful Commands

```bash
npm run build:tokens      # Transform design tokens → CSS + TS
npm run storybook         # Launch Storybook dev server
npm run build-storybook   # Build Storybook for production
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run build             # Full pipeline: tokens → test → build
```

---

## Key Decisions & Rationale

| Decision | Rationale |
|---|---|
| Radix UI over building from scratch | Focus on composition and DX, not re-inventing ARIA patterns |
| CSS Modules over Tailwind | Shows understanding of CSS architecture; token-driven styling is more visible |
| Style Dictionary over hardcoded variables | Demonstrates the full Figma → code pipeline with real token transformation |
| Tokens Studio as token source | Industry-standard Figma plugin; exports DTCG-spec JSON; shows real designer-developer workflow |
| Figma Code Connect | Directly maps Figma component variants to React props; listed in CoLab's job posting as a desired skill |
| Vitest over Jest | Faster, native ESM, integrates with Vite |
| data-attributes for variants | Cleaner than className strings, works well with CSS selectors |
| Storybook 8 | Latest features: improved docs, faster builds, better TypeScript support |

---

## Resources

- [Radix UI Docs](https://www.radix-ui.com/primitives)
- [Storybook 8 Docs](https://storybook.js.org/docs)
- [Style Dictionary Docs](https://amzn.github.io/style-dictionary)
- [Tokens Studio Docs](https://docs.tokens.studio/)
- [Figma Code Connect Docs](https://www.figma.com/developers/code-connect)
- [W3C Design Token Community Group (DTCG) Spec](https://design-tokens.github.io/community-group/format/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
