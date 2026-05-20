import type { Meta, StoryObj } from '@storybook/react-vite'

import { AppLayout, AppSidebar, AppMain, AppHeader, AppBody } from './app-layout'

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component: `Top-level page shell. Wraps \`AppSidebar\` (220px / 60px collapsed) and \`AppMain\` (which contains \`AppHeader\` and \`AppBody\`). Use once per route; for the inner sidebar contents compose with the \`Sidebar*\` primitives.`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AppLayout>

export const Default: Story = {
  render: () => (
    <AppLayout>
      <AppSidebar>
        <div className="p-4 text-sm text-text-secondary">Sidebar</div>
      </AppSidebar>
      <AppMain>
        <AppHeader>
          <div className="flex h-full items-center px-4 text-sm font-medium text-text-primary">
            Header
          </div>
        </AppHeader>
        <AppBody>
          <p className="text-sm text-text-primary">Page body content goes here.</p>
        </AppBody>
      </AppMain>
    </AppLayout>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <AppLayout>
      <AppSidebar collapsed>
        <div aria-hidden="true" className="p-2 text-center text-xs text-text-secondary">
          ↕
        </div>
      </AppSidebar>
      <AppMain>
        <AppHeader>
          <div className="flex h-full items-center px-4 text-sm font-medium text-text-primary">
            Header (sidebar collapsed)
          </div>
        </AppHeader>
        <AppBody>
          <p className="text-sm text-text-primary">Body shifts left when the sidebar collapses.</p>
        </AppBody>
      </AppMain>
    </AppLayout>
  ),
}
