import type { Meta, StoryObj } from '@storybook/react'

import { StatusDot } from './status-dot'

const meta: Meta<typeof StatusDot> = {
  title: 'Components/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'radio',
      options: ['online', 'offline', 'degraded', 'success', 'error', 'warning', 'info'],
    },
    size: { control: 'radio', options: ['sm', 'md'] },
    pulse: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof StatusDot>

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-text-primary">
      <span className="inline-flex items-center gap-2">
        <StatusDot status="online" />
        Online
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="offline" />
        Offline
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="degraded" />
        Degraded
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="success" />
        Success
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="error" />
        Error
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="warning" />
        Warning
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="info" />
        Info
      </span>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-text-primary">
      <span className="inline-flex items-center gap-2">
        <StatusDot status="online" size="sm" />
        Small (default)
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="online" size="md" />
        Medium
      </span>
    </div>
  ),
}

export const Pulse: Story = {
  render: () => (
    <span className="inline-flex items-center gap-2 text-sm text-text-primary">
      <StatusDot status="online" pulse />
      Live
    </span>
  ),
}

export const LabelComposition: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-text-primary">
      <span className="inline-flex items-center gap-2">
        <StatusDot status="online" />
        <span>Production environment connected</span>
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="degraded" />
        <span>Staging environment degraded</span>
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot status="offline" />
        <span>QA environment unreachable</span>
      </span>
    </div>
  ),
}
