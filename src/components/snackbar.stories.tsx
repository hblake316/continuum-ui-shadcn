import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Snackbar } from './snackbar'

const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Short transient toast (success confirmation, undo prompt). For persistent in-page messages use \`Alert\`; for blocking confirmation use \`ConfirmationDialog\`. Add an \`action\` for undo/retry affordances.`,
      },
    },
  },
  argTypes: {
    message: { control: 'text' },
    open: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Snackbar>

export const Default: Story = {
  args: { message: 'Workflow saved.' },
}

export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Snackbar
      message="Workflow archived."
      action={
        <Button
          variant="outlined"
          color="action"
          size="sm"
          className="text-background-paper border-background-paper"
        >
          Undo
        </Button>
      }
    />
  ),
}

export const WithClose: Story = {
  args: { message: 'Could not reach runtime service.' },
  render: (args) => <Snackbar {...args} />,
}

export const TriggeredFromButton: Story = {
  render: function TriggeredStory() {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col gap-4">
        <Button onClick={() => setOpen(true)}>Show snackbar</Button>
        <Snackbar open={open} message="Workflow saved." onClose={() => setOpen(false)} />
      </div>
    )
  },
}
