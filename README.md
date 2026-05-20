# @opcon/ui-shadcn

OpCon design system built on [shadcn/ui](https://ui.shadcn.com) primitives, with brand-specific Tailwind tokens and an additive component layer for product-specific patterns (`WidgetSkeleton`, `EmptyState`, `StatusDot`, etc.).

## Adding a new shadcn primitive

**This package does NOT use the shadcn CLI.** Primitives are hand-authored from the shadcn upstream source.

The CLI was evaluated and rejected for this package because:

- Its scaffolding heuristics target app-context usage (Next.js / Vite app skeletons) and misbehave inside a library package — recent versions bootstrap a full `next-app/` directory inside `src/components/` that has to be deleted every install.
- It emits React 19-idiom function components (`ref` as a prop). This package targets React 18, so every CLI-generated primitive has to be hand-wrapped in `React.forwardRef` afterward.
- It emits `import { cn } from "@/lib/utils"` imports. The `@/` alias only resolves at this package's own build time; downstream consumers bundling `@opcon/ui-shadcn` from source can't resolve it (enforced by an eslint rule).
- It uses `pnpm add` for peer deps with atomic-rename semantics that hit periodic `EPERM` failures on Windows.

The manual workflow below has none of those failure modes and takes ~2 minutes per primitive.

### Workflow

1. **Find the primitive.** Browse to `https://ui.shadcn.com/docs/components/<name>` and click the **Manual** tab.
2. **Install any peer deps.** If the primitive uses a Radix package, install it scoped to this package:
   ```sh
   pnpm add @radix-ui/react-<name> --filter=@opcon/ui-shadcn
   ```
   shadcn's docs list the peer deps under "Install the following dependencies."
3. **Create the file.** Copy the source from the Manual tab into `packages/ui-shadcn/src/components/<name>.tsx`.
4. **Adapt for this package** — three small edits:
   - Change `import { cn } from "@/lib/utils"` to `import { cn } from "../lib/utils"` (the `@/` alias doesn't exist here and the eslint rule will block commits that use it).
   - Wrap each exported component in `React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>` (or whatever element it renders). The wrappers in `widget-skeleton.tsx` and `empty-state.tsx` need ref forwarding to flow through, and React 18 strips `ref` from props for plain function components.
   - Add a `displayName` on each forwardRef component.
   - Use single quotes to match the package style. `pnpm exec eslint --fix packages/ui-shadcn/src/components/<name>.tsx` will normalize formatting after.
5. **Re-export from `src/index.ts`.** Append the new component(s) and prop types.
6. **Add a story** at `<name>.stories.tsx` (follow `button.stories.tsx` as the template).
7. **Add tests** at `<name>.test.tsx` (follow `confirmation-dialog.test.tsx`).

### Verification

```sh
pnpm exec vitest run                                            # all tests pass
pnpm exec eslint packages/ui-shadcn/src --max-warnings=0        # no lint errors
pnpm exec storybook build --config-dir .storybook               # storybook builds
```

### Header comment convention

Both `skeleton.tsx` and `empty.tsx` carry a header comment documenting the React 18 forwardRef adaptation. Apply the same pattern to new primitives so future maintainers know what diverges from upstream and why.

## Design tokens

The Tailwind config (`tailwind.config.ts`) declares OpCon-specific colors backed by CSS variables in `src/globals.css`. Several **shadcn-compat aliases** are also declared so upstream primitives style correctly without modification:

| shadcn token | maps to OpCon token | CSS var |
|---|---|---|
| `foreground` | `Text.primary` | `--color-text-primary` |
| `muted-foreground` | `Text.secondary` | `--color-text-secondary` |
| `muted` (bg) | `Background.default less saturated` | `--color-background-default-less-saturated` |

`accent` is intentionally **not** mapped — Figma has its own brand-blue `Accent` group that would conflict. Add it only when a primitive actually needs `bg-accent` / `text-accent-foreground`, and decide the mapping with the design-system owner first.

### Known gap

Tailwind opacity modifiers (`bg-action/20`, `text-error/50`, etc.) currently produce **no CSS rule** because the color CSS variables are defined as `#rrggbb` literals referenced via `var(--color-X)`, and Tailwind can't extract channels from an opaque variable. Fixing this requires converting every `--color-*` to space-separated RGB triplets and wrapping in `rgb(var(--color-X) / <alpha-value>)`. Tracked as a separate workspace-wide initiative; use opaque tokens (e.g. `bg-action-disabled-bg`) until that lands.
