import type { Meta, StoryObj } from '@storybook/react'

import { AppLayout, AppSidebar, AppMain, AppHeader, AppBody } from './app-layout'

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
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
