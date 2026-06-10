import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdInbox, MdOutlineSearchOff } from 'react-icons/md'

import { ButtonDefault } from './button-default'
import { Card, CardContent } from './card'
import { EmptyState } from './empty-state'
import { ButtonOutline } from './button-outline'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Pre-composed empty card with icon, title, description, and optional action. Use for "no data yet" and "no search results" screens. For fully custom layouts drop down to the \`Empty\` primitives.`,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: 'No activity yet',
  },
}

export const WithIcon: Story = {
  args: {
    title: 'No audit events',
  },
  render: (args) => <EmptyState {...args} icon={<MdInbox size={24} />} />,
}

export const WithDescription: Story = {
  args: {
    title: 'No audit events',
    description: 'Audit events will appear here once enabled.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'No audit events',
    description: 'Audit events will appear here once enabled.',
  },
  render: (args) => (
    <EmptyState {...args} action={<ButtonDefault size="sm">Configure</ButtonDefault>} />
  ),
}

export const Full: Story = {
  args: {
    title: 'No matching results',
    description: 'Try a different search or clear your filters.',
  },
  render: (args) => (
    <EmptyState
      {...args}
      icon={<MdOutlineSearchOff size={24} />}
      action={<ButtonOutline size="sm">Clear filters</ButtonOutline>}
    />
  ),
}

export const WidgetEmpty: Story = {
  render: () => (
    <Card className="w-96">
      <CardContent>
        <EmptyState
          icon={<MdInbox size={24} />}
          title="No environments yet"
          description="Connect your first environment to see its health here."
        />
      </CardContent>
    </Card>
  ),
}
