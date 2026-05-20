import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  MdChevronLeft,
  MdChevronRight,
  MdDashboard,
  MdOutlineHelp,
  MdSchedule,
  MdSettings,
  MdViewModule,
} from 'react-icons/md'

import { AppSidebar } from './app-layout'
import {
  SidebarBody,
  SidebarCollapseButton,
  SidebarDivider,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarItemContent,
  SidebarItemRow,
  SidebarLogo,
  SidebarSection,
  SidebarSectionHeader,
  SidebarSectionRule,
} from './sidebar'

const meta: Meta<typeof SidebarBody> = {
  title: 'Navigation/Sidebar',
  component: SidebarBody,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component:
          'Composable side-navigation primitives. Pair with AppSidebar (from AppLayout) for the ' +
          'bordered 220px/60px shell. Toggle between expanded and collapsed in the stories below.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SidebarBody>

function SidebarDemo({ collapsedInitial = false }: { collapsedInitial?: boolean }) {
  const [collapsed, setCollapsed] = useState(collapsedInitial)
  const [active, setActive] = useState('overview')

  return (
    <div className="h-screen bg-background-default p-3">
      <AppSidebar collapsed={collapsed}>
        <SidebarHeader>
          <SidebarCollapseButton collapsed={collapsed} onClick={() => setCollapsed((c) => !c)}>
            {collapsed ? <MdChevronRight size={12} /> : <MdChevronLeft size={12} />}
          </SidebarCollapseButton>
          <SidebarLogo>
            <span className="text-sm font-medium text-text-primary">
              {collapsed ? 'O' : 'OpCon'}
            </span>
          </SidebarLogo>
        </SidebarHeader>

        <SidebarBody aria-label="Primary">
          <SidebarSection collapsed={collapsed}>
            {collapsed ? (
              <SidebarSectionRule />
            ) : (
              <SidebarSectionHeader>Workspace</SidebarSectionHeader>
            )}
            <SidebarItemRow>
              <SidebarItem
                collapsed={collapsed}
                active={active === 'overview'}
                onClick={() => setActive('overview')}
              >
                <SidebarItemContent icon={<MdDashboard />} collapsed={collapsed}>
                  Overview
                </SidebarItemContent>
              </SidebarItem>
            </SidebarItemRow>
            <SidebarItemRow>
              <SidebarItem
                collapsed={collapsed}
                active={active === 'workflows'}
                onClick={() => setActive('workflows')}
              >
                <SidebarItemContent icon={<MdViewModule />} collapsed={collapsed}>
                  Workflows
                </SidebarItemContent>
              </SidebarItem>
            </SidebarItemRow>
            <SidebarItemRow>
              <SidebarItem
                collapsed={collapsed}
                active={active === 'schedules'}
                onClick={() => setActive('schedules')}
              >
                <SidebarItemContent icon={<MdSchedule />} collapsed={collapsed}>
                  Schedules
                </SidebarItemContent>
              </SidebarItem>
            </SidebarItemRow>
          </SidebarSection>

          <SidebarDivider />

          <SidebarSection collapsed={collapsed}>
            {collapsed ? (
              <SidebarSectionRule />
            ) : (
              <SidebarSectionHeader>Admin</SidebarSectionHeader>
            )}
            <SidebarItemRow>
              <SidebarItem
                collapsed={collapsed}
                active={active === 'settings'}
                onClick={() => setActive('settings')}
              >
                <SidebarItemContent icon={<MdSettings />} collapsed={collapsed}>
                  Settings
                </SidebarItemContent>
              </SidebarItem>
            </SidebarItemRow>
          </SidebarSection>
        </SidebarBody>

        <SidebarFooter collapsed={collapsed} aria-label="Footer">
          <SidebarItem collapsed={collapsed} size="sm">
            <SidebarItemContent icon={<MdOutlineHelp />} collapsed={collapsed}>
              Help
            </SidebarItemContent>
          </SidebarItem>
        </SidebarFooter>
      </AppSidebar>
    </div>
  )
}

export const Expanded: Story = {
  render: () => <SidebarDemo />,
}

export const Collapsed: Story = {
  render: () => <SidebarDemo collapsedInitial />,
}
