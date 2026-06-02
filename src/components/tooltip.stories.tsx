import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { MdInfoOutline } from 'react-icons/md'

import { Button } from './button'
import { IconButton } from './icon-button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const meta: Meta<typeof TooltipContent> = {
  title: 'Overlays/Tooltip',
  component: TooltipContent,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Hover/focus text hint for icons and truncated content. Wrap the app in \`TooltipProvider\` once; use \`Tooltip\` + \`TooltipTrigger\` + \`TooltipContent\` per instance. For interactive popover content use \`Popover\` instead.`,
      },
    },
  },
  argTypes: {
    side: { control: 'radio', options: ['top', 'right', 'bottom', 'left'] },
    sideOffset: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof TooltipContent>

const hoverTrigger: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.hover(canvas.getByRole('button'))
}

export const Default: Story = {
  args: { side: 'top', sideOffset: 4, children: 'Save the current workflow' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
  play: hoverTrigger,
}

export const OnIconButton: Story = {
  args: { side: 'top', sideOffset: 4, children: 'Schedules with the same key get deduplicated.' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton variant="text" color="action" aria-label="Info">
          <MdInfoOutline size={18} />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
  play: hoverTrigger,
}

export const Directions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-2 gap-12 p-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip above</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip below</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip left</TooltipContent>
      </Tooltip>
    </div>
  ),
}
