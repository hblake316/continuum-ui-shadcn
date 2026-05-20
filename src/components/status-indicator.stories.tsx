import type { Meta, StoryObj } from '@storybook/react'
import { MdHourglassEmpty, MdReportProblem } from 'react-icons/md'

import { StatusIndicator } from './status-indicator'

const meta: Meta<typeof StatusIndicator> = {
  title: 'Components/StatusIndicator',
  component: StatusIndicator,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'radio',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    },
    showIcon: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof StatusIndicator>

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-text-primary">
      <StatusIndicator tone="success">Healthy</StatusIndicator>
      <StatusIndicator tone="warning">Degraded</StatusIndicator>
      <StatusIndicator tone="error">Critical</StatusIndicator>
      <StatusIndicator tone="info">Informational</StatusIndicator>
      <StatusIndicator tone="neutral">Unknown</StatusIndicator>
    </div>
  ),
}

export const IconOverride: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-text-primary">
      <StatusIndicator
        tone="warning"
        icon={<MdReportProblem aria-hidden className="size-4 shrink-0 text-warning" />}
      >
        Pending review
      </StatusIndicator>
      <StatusIndicator
        tone="info"
        icon={<MdHourglassEmpty aria-hidden className="size-4 shrink-0 text-info" />}
      >
        Queued
      </StatusIndicator>
    </div>
  ),
}

export const NoIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-text-primary">
      <StatusIndicator tone="success" showIcon={false}>
        Healthy
      </StatusIndicator>
      <StatusIndicator tone="error" showIcon={false}>
        Critical
      </StatusIndicator>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-3 text-sm text-text-primary">
      <StatusIndicator tone="success" aria-label="Healthy" />
      <StatusIndicator tone="warning" aria-label="Degraded" />
      <StatusIndicator tone="error" aria-label="Critical" />
      <StatusIndicator tone="info" aria-label="Info" />
      <StatusIndicator tone="neutral" aria-label="Unknown" />
    </div>
  ),
}

export const Playground: Story = {
  args: {
    tone: 'success',
    children: 'Healthy',
    showIcon: true,
  },
}
