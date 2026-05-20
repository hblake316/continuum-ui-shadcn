import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

/**
 * Sidebar primitives derived from Figma:
 *   - sideNav/template          (node 18755:19470)
 *   - sideNav/Sections          (node 18755:19367)
 *   - sideNav/logo & collapse   (node 18755:20273)
 *   - sideNav/button-collapse   (node 18755:19463)
 *
 * Composable building blocks for the side navigation. Pair with
 * AppSidebar (from app-layout) which provides the 220/60 collapsed
 * shell + bordered card.
 */

// ── SidebarHeader ───────────────────────────────────────────────
// Wraps the top-most region of the sidebar (collapse button + logo).
// Renders as a stacked column flush to the top with no inner padding.

type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex w-full flex-col items-center', className)} {...props}>
      {children}
    </div>
  )
)
SidebarHeader.displayName = 'SidebarHeader'

// ── SidebarLogo ─────────────────────────────────────────────────
// Centered logo slot. Caller swaps between expanded/collapsed asset.

interface SidebarLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const SidebarLogo = React.forwardRef<HTMLDivElement, SidebarLogoProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex h-[34px] w-full items-center justify-center px-3 no-underline',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarLogo.displayName = 'SidebarLogo'

// ── SidebarCollapseButton ───────────────────────────────────────
// Small bordered chevron toggle aligned to the right edge of the header.

interface SidebarCollapseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  collapsed?: boolean
}

const SidebarCollapseButton = React.forwardRef<HTMLButtonElement, SidebarCollapseButtonProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <div
      className={cn(
        'flex w-full items-center pt-1 pb-0.5 px-1',
        collapsed ? 'justify-center' : 'justify-end'
      )}
    >
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex size-4 items-center justify-center rounded border border-outline-border bg-background-paper text-text-secondary transition-colors',
          'hover:bg-action-hover-subtle hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus-ring',
          className
        )}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
        {...props}
      >
        {children}
      </button>
    </div>
  )
)
SidebarCollapseButton.displayName = 'SidebarCollapseButton'

// ── SidebarBody ─────────────────────────────────────────────────
// Scrollable middle region that hosts the navigation sections.
// Renders as a <nav> landmark; consumers should pass `aria-label`
// (e.g. "Primary") so assistive tech can distinguish multiple nav
// landmarks on the page.

type SidebarBodyProps = React.HTMLAttributes<HTMLElement>

const SidebarBody = React.forwardRef<HTMLElement, SidebarBodyProps>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn('flex w-full flex-1 min-h-0 flex-col gap-3 overflow-y-auto', className)}
      {...props}
    >
      {children}
    </nav>
  )
)
SidebarBody.displayName = 'SidebarBody'

// ── SidebarSection ──────────────────────────────────────────────
// A vertical group of items rendered as a <ul> (browser preflight is
// often disabled in MUI-coexistent apps, so we explicitly null the
// list defaults). 4px gap between items, 18px x-padding to match
// Figma sideNav/Sections (drops to 8px when collapsed so icon-only
// items can sit comfortably in the 60px rail).

interface SidebarSectionProps extends React.HTMLAttributes<HTMLUListElement> {
  collapsed?: boolean
}

const SidebarSection = React.forwardRef<HTMLUListElement, SidebarSectionProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(
        'flex w-full m-0 list-none flex-col gap-1',
        collapsed ? 'px-2' : 'px-[18px]',
        className
      )}
      {...props}
    >
      {children}
    </ul>
  )
)
SidebarSection.displayName = 'SidebarSection'

// ── SidebarSectionHeader ────────────────────────────────────────
// Section label text shown above a SidebarSection in expanded mode.
// Consumers should swap to `SidebarSectionRule` (below) when the
// sidebar is collapsed — keeping the two cases as separate component
// names means consumer-passed `id` / `data-*` / refs always land on
// the element they expect.

type SidebarSectionHeaderProps = React.HTMLAttributes<HTMLDivElement>

const SidebarSectionHeader = React.forwardRef<HTMLDivElement, SidebarSectionHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-[34px] items-center px-4 py-1 text-[13px] font-normal leading-[17.55px] tracking-[0.15px] text-text-secondary',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
SidebarSectionHeader.displayName = 'SidebarSectionHeader'

// ── SidebarSectionRule ──────────────────────────────────────────
// Short centered horizontal line shown in place of a section header
// when the sidebar is collapsed (Figma sideNav/Sections collapsed
// template, node 18755:19416 — DividerHorizontal at 40px wide).

type SidebarSectionRuleProps = React.HTMLAttributes<HTMLDivElement>

const SidebarSectionRule = React.forwardRef<HTMLDivElement, SidebarSectionRuleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex min-h-[34px] w-full items-center justify-center', className)}
      aria-hidden="true"
      {...props}
    >
      <span className="block h-px w-10 bg-divider" />
    </div>
  )
)
SidebarSectionRule.displayName = 'SidebarSectionRule'

// ── SidebarDivider ──────────────────────────────────────────────

type SidebarDividerProps = React.HTMLAttributes<HTMLDivElement>

const SidebarDivider = React.forwardRef<HTMLDivElement, SidebarDividerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn('mx-[18px] h-px bg-divider', className)}
      {...props}
    />
  )
)
SidebarDivider.displayName = 'SidebarDivider'

// ── SidebarItemRow ──────────────────────────────────────────────
// Wrapper <li> for each item inside a SidebarSection. Resets the
// browser default list-item styles since preflight may be disabled.

type SidebarItemRowProps = React.HTMLAttributes<HTMLLIElement>

const SidebarItemRow = React.forwardRef<HTMLLIElement, SidebarItemRowProps>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={cn('list-none', className)} {...props}>
      {children}
    </li>
  )
)
SidebarItemRow.displayName = 'SidebarItemRow'

// ── SidebarItem ─────────────────────────────────────────────────
// Nav row with optional icon + label. Renders as a <button> by
// default; pass `asChild` to swap in an anchor / router link.
//
// Disabled state uses `aria-disabled` (not the HTML `disabled`
// attribute) so the element stays in the focus order and a
// surrounding Tooltip can still fire on hover/focus. Consumers that
// pass `aria-disabled` are responsible for suppressing navigation
// (e.g. by calling `e.preventDefault()` in the click handler) — the
// CVA variant only handles styling.

const sidebarItemVariants = cva(
  'group relative flex w-full items-center gap-2 overflow-hidden rounded font-sans text-text-primary no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus-ring aria-disabled:cursor-not-allowed aria-disabled:text-disabled-text',
  {
    variants: {
      size: {
        // Body items — Figma sideNav/Sections: 32h, 14px Button Medium
        md: 'h-8 px-3 py-1.5 text-[14px] font-medium leading-[18.9px] tracking-[0px]',
        // Footer items — Figma footer: 26h, 13px Button Small
        sm: 'h-[26px] px-2.5 py-1 text-[13px] font-medium leading-[16.9px] tracking-[0px]',
      },
      active: {
        // Hover deepens to primary-light so the active item still
        // signals interactivity on hover (vs. flat primary-focus).
        true: 'bg-primary-focus hover:bg-primary-light',
        false: 'hover:bg-action-hover-subtle',
      },
      collapsed: {
        true: 'justify-center px-0',
        false: 'justify-start',
      },
    },
    defaultVariants: {
      size: 'md',
      active: false,
      collapsed: false,
    },
  }
)

interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof sidebarItemVariants> {
  asChild?: boolean
}

const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  (
    { className, size, active, collapsed, asChild = false, type, disabled, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    // When asChild is true the slotted element may be an <a> (or RouterLink)
    // for which `disabled` and button `type` are invalid attributes — drop
    // them. Consumers that need disabled styling on a link should pass
    // `aria-disabled` directly.
    const buttonOnlyProps = asChild
      ? {}
      : { type: type ?? 'button', disabled: disabled ?? undefined }
    return (
      <Comp
        ref={ref}
        aria-current={active ? 'page' : undefined}
        className={cn(sidebarItemVariants({ size, active, collapsed }), className)}
        {...buttonOnlyProps}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
SidebarItem.displayName = 'SidebarItem'

// ── SidebarItemContent ──────────────────────────────────────────
// Convenience inner layout for an item: icon slot + truncated label.
// Hide the label when the sidebar is collapsed.
//
// Icon container is fixed at 20×20 to match Figma's MUI Masked-Icon
// slot (Figma sideNav/Sections, node I…;10004:115091 — h-[20px] w-[16px]
// with a 20×20 icon glyph). The `[&_svg]:size-5` override forces MUI
// icons (default 24px) to render at 20px so they fit the slot exactly.
//
// Renders as a Fragment (no wrapping element) so the icon + label
// span participate in the parent SidebarItem's flex row directly. As
// a result this component intentionally does NOT use forwardRef and
// does NOT spread HTMLAttributes — refs and DOM props have nowhere
// meaningful to land.

interface SidebarItemContentProps {
  icon?: React.ReactNode
  collapsed?: boolean
  children?: React.ReactNode
}

const SidebarItemContent = ({ icon, collapsed, children }: SidebarItemContentProps) => (
  <>
    {icon ? (
      <span className="flex size-5 shrink-0 items-center justify-center [&_svg]:size-5">
        {icon}
      </span>
    ) : null}
    {!collapsed ? <span className="min-w-0 flex-1 truncate text-left">{children}</span> : null}
  </>
)
SidebarItemContent.displayName = 'SidebarItemContent'

// ── SidebarFooter ───────────────────────────────────────────────
// Anchored to the bottom; pushes itself away from the body via mt-auto.
// Renders as a <nav> landmark so footer links (Settings, etc.) are
// announced as a separate group from the main navigation.
//
// pb-6 (24px) matches Figma's footer wrapper inset
// (sideNav/template, node I…;18809:2700 — pb:24px on the footer
// frame). It's intentionally asymmetric with the 4px top inset
// (SidebarCollapseButton: pt:4px) — Figma uses tight top spacing
// because the collapse chevron sits flush to the top of the card,
// while the footer wants comfortable breathing room above the card
// edge.

interface SidebarFooterProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean
}

const SidebarFooter = React.forwardRef<HTMLElement, SidebarFooterProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        'mt-auto flex w-full flex-col gap-1 pb-6',
        collapsed ? 'px-2' : 'px-[18px]',
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
)
SidebarFooter.displayName = 'SidebarFooter'

export {
  SidebarHeader,
  SidebarLogo,
  SidebarCollapseButton,
  SidebarBody,
  SidebarSection,
  SidebarSectionHeader,
  SidebarSectionRule,
  SidebarDivider,
  SidebarItemRow,
  SidebarItem,
  SidebarItemContent,
  sidebarItemVariants,
  SidebarFooter,
}
export type {
  SidebarHeaderProps,
  SidebarLogoProps,
  SidebarCollapseButtonProps,
  SidebarBodyProps,
  SidebarSectionProps,
  SidebarSectionHeaderProps,
  SidebarSectionRuleProps,
  SidebarDividerProps,
  SidebarItemRowProps,
  SidebarItemProps,
  SidebarItemContentProps,
  SidebarFooterProps,
}
