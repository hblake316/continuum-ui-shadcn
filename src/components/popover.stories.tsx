import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'

import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Floating panel anchored to a trigger. Use for filter forms, inline menus, and disclosure surfaces. For text-only hints use \`Tooltip\`; for modal flows use \`Dialog\`.`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

const openTrigger: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button', { name: /^open/i }))
}

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <p className="text-sm font-medium text-text-primary">Workflow details</p>
        <p className="mt-1 text-sm text-text-secondary">
          Last ran 2h ago. Next scheduled run in 22h.
        </p>
      </PopoverContent>
    </Popover>
  ),
  play: openTrigger,
}

export const Centered: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open centered</Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-56 p-3">
        <p className="text-sm text-text-primary">Aligned to the center of the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
  play: openTrigger,
}

export const Above: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open above</Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-56 p-3">
        <p className="text-sm text-text-primary">This popover appears above the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
  play: openTrigger,
}
