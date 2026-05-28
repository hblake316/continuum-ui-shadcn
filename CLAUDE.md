# UI Shadcn - Claude Code Context

## Overview

OpCon design system built on [shadcn/ui](https://ui.shadcn.com) primitives, Radix headless components, and Tailwind CSS. **This is the canonical UI library for all new frontend work** — the previous `@opcon/ui-kit` (MUI-based) is being phased out and should NOT be used in new code.

## Package Info

- **Name:** `@opcon/ui-shadcn`
- **Peer Dependencies:** React 18, React DOM 18
- **Styling:** Tailwind CSS 3.4 (consumers must include `globals.css` and extend `tailwind.config.ts`)
- **Primitives:** Radix UI (`@radix-ui/react-*`), shadcn patterns, `class-variance-authority` for variants
- **React 18 caveat:** All primitives are hand-wrapped in `React.forwardRef` (shadcn upstream targets React 19's `ref` prop). Match this when authoring new components.

## Consumer Setup

In a consuming app:

```typescript
// 1. Import the global stylesheet once (e.g. in the app's root layout):
import '@opcon/ui-shadcn/globals.css';

// 2. Extend the package's tailwind config so OpCon tokens resolve in your app:
//    (in the app's tailwind.config.ts)
import sharedConfig from '@opcon/ui-shadcn/tailwind.config';
export default { presets: [sharedConfig], content: [...] };

// 3. Import components from the package root:
import { Button, Card, CardHeader, CardContent, cn } from '@opcon/ui-shadcn';
```

Do **not** deep-import (`@opcon/ui-shadcn/src/components/button`) — the public surface is `src/index.ts`. Add a new re-export there if something is missing.

## What's In It

The authoritative inventory is [src/index.ts](./src/index.ts) — check there before assuming a component does or doesn't exist. Components are flat under `src/components/`, and every exported component has a matching `*.stories.tsx` (best place to see its API in action) and usually a `*.test.tsx`.

**Add shadcn primitives on-demand, not speculatively.** If a real consumer needs a primitive that isn't exported yet, add it here rather than reaching for a different library or writing a one-off — but don't backfill the catalog just because shadcn upstream has more components than we do. The hand-authoring workflow takes ~2 minutes per primitive and is documented in [README.md](./README.md).

A handful of OpCon-specific additive components live alongside the shadcn primitives — these won't be on shadcn.com, so they're worth knowing about by name: `EmptyState` (one-shot wrapper around the lower-level `Empty` parts), `WidgetSkeleton`, `StatusDot`, `StatusIndicator`, `TransferList`, `FormDialog`, `ConfirmationDialog`, `SplitButton`, `SegmentedControl`, and the `AppLayout` / `Sidebar*` composition.

## Conventions

- **Use `cn()` for all conditional class composition.** Imported from `@opcon/ui-shadcn` (or `../lib/utils` inside this package).
- **Icons come from `react-icons/md`** (Material Design subset) — `import { MdAdd, MdCheckCircle } from 'react-icons/md'`. Do not introduce other icon libraries (Lucide, Heroicons, FontAwesome, raw SVGs, etc.) or other `react-icons/*` subsets without a design-system discussion — consistency of glyph style matters here. The package depends on `react-icons` directly, so consumers get it transitively.
- **Use OpCon Tailwind tokens, not raw colors.** `bg-primary`, `text-error`, `bg-action-disabled-bg`, etc. — defined in `tailwind.config.ts` and backed by CSS variables in `globals.css`. Don't write `bg-blue-500` or hex literals in component classes.
- **Avoid Tailwind opacity modifiers on color tokens** (`bg-action/20`, `text-error/50`) — they currently produce no CSS rule because the token vars are opaque `#rrggbb` literals. Use the explicit opaque variants instead. (Tracked as a workspace-wide refactor; see `README.md`.)
- **Variants live in `cva()` blocks** at the top of each component file (see `button.tsx` for the canonical pattern: `variants` + `compoundVariants` + `defaultVariants`).
- **Forward refs explicitly.** Every public component uses `React.forwardRef` with an explicit `displayName`. Plain function components will drop `ref` under React 18.
- **Single quotes, no semicolons at EOL where the linter doesn't insist** — match surrounding files. `pnpm exec eslint --fix` will normalize.

## Adding a new primitive

The full hand-authoring workflow (which shadcn upstream to copy, what to edit, peer deps to install, etc.) is documented in [README.md](./README.md). Short version: do NOT use the shadcn CLI — copy the **Manual** tab source, change `@/lib/utils` → `../lib/utils`, wrap in `forwardRef`, set `displayName`, then re-export from `src/index.ts` and add a story + test.

## Testing & Storybook

```sh
pnpm --filter=@opcon/ui-shadcn test           # vitest run
pnpm --filter=@opcon/ui-shadcn storybook      # storybook dev on :6006
pnpm --filter=@opcon/ui-shadcn typecheck      # tsc --noEmit
```

Test files use Vitest + `@testing-library/react`. Follow `confirmation-dialog.test.tsx` as the template for component tests.

## Migration note: `@opcon/ui-kit` (MUI) is deprecated

If you find yourself reaching for `@opcon/ui-kit` or `@mui/material`, stop — bring the equivalent shadcn primitive in from this package instead. If the component you need doesn't exist here yet, add it (see workflow above) rather than extending the MUI lib.
