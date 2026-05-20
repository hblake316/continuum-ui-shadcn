import type { Meta, StoryObj } from '@storybook/react'

import { Breadcrumbs, BreadcrumbLink, BreadcrumbCurrent } from './breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbLink>Workflows</BreadcrumbLink>
      <BreadcrumbLink>Production</BreadcrumbLink>
      <BreadcrumbCurrent>Nightly ETL</BreadcrumbCurrent>
    </Breadcrumbs>
  ),
}

export const TwoLevels: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbLink>Environments</BreadcrumbLink>
      <BreadcrumbCurrent>prod-us-east</BreadcrumbCurrent>
    </Breadcrumbs>
  ),
}

export const DeepNesting: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbLink>Workspaces</BreadcrumbLink>
      <BreadcrumbLink>Continuum</BreadcrumbLink>
      <BreadcrumbLink>Workflows</BreadcrumbLink>
      <BreadcrumbLink>Schedules</BreadcrumbLink>
      <BreadcrumbCurrent>Nightly ETL</BreadcrumbCurrent>
    </Breadcrumbs>
  ),
}

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumbs separator={<span className="px-1 text-text-secondary">/</span>}>
      <BreadcrumbLink>Workflows</BreadcrumbLink>
      <BreadcrumbLink>Production</BreadcrumbLink>
      <BreadcrumbCurrent>Nightly ETL</BreadcrumbCurrent>
    </Breadcrumbs>
  ),
}
