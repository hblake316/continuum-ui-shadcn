import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'

import { Backdrop } from './backdrop'
import { Button } from './button'
import { CircularProgress } from './progress'

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6643-52207&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Semi-transparent viewport overlay used behind custom focus surfaces. Most modal flows don't need this directly — \`Dialog\`, \`FormDialog\`, and \`ConfirmationDialog\` render their own overlay.`,
      },
    },
  },
  argTypes: {
    open: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Backdrop>

const showBackdrop: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button', { name: /show backdrop/i }))
}

export const OpenWithSpinner: Story = {
  render: function OpenStory() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show backdrop</Button>
        <Backdrop open={open} onClick={() => setOpen(false)}>
          <CircularProgress />
        </Backdrop>
      </>
    )
  },
  play: showBackdrop,
}

export const OpenWithMessage: Story = {
  render: function MessageStory() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show backdrop</Button>
        <Backdrop open={open}>
          <div className="rounded bg-background-paper p-6 text-center text-sm text-text-primary shadow-lg">
            <p className="font-medium">Saving workflow…</p>
            <Button variant="text" onClick={() => setOpen(false)} className="mt-2">
              Cancel
            </Button>
          </div>
        </Backdrop>
      </>
    )
  },
  play: showBackdrop,
}
