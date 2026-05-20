import type { Meta, StoryObj } from '@storybook/react'

import { Divider } from './divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm text-text-primary">Section above</p>
      <Divider className="my-3" />
      <p className="text-sm text-text-primary">Section below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="inline-flex h-8 items-center gap-3 text-sm text-text-primary">
      <span>Workflows</span>
      <Divider orientation="vertical" />
      <span>Schedules</span>
      <Divider orientation="vertical" />
      <span>Environments</span>
    </div>
  ),
}

export const InList: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ul className="w-80 rounded border border-outline-border bg-background-paper">
      <li className="px-4 py-2 text-sm text-text-primary">prod-us-east</li>
      <li aria-hidden="true">
        <Divider />
      </li>
      <li className="px-4 py-2 text-sm text-text-primary">prod-eu-west</li>
      <li aria-hidden="true">
        <Divider />
      </li>
      <li className="px-4 py-2 text-sm text-text-primary">staging</li>
    </ul>
  ),
}
