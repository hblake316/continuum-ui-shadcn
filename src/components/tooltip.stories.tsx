import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { MdInfoOutline } from 'react-icons/md'

import { ButtonDefault } from './button-default'
import { ButtonDefaultIcon } from './button-default-icon'
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
        component: `Hover/focus text hint for icons and truncated content. Wrap the app in \`TooltipProvider\` once; use \`Tooltip\` + \`TooltipTrigger\` + \`TooltipContent\` per instance.

- **direction**: \`up\` (default) · \`down\` · \`left\` · \`right\` · \`none\` (no arrow).
- \`up\` places the tooltip above the trigger; \`down\` places it below.
- For interactive popover content use \`Popover\` instead.`,
      },
    },
  },
  argTypes: {
    direction: { control: 'radio', options: ['none', 'up', 'down', 'left', 'right'] },
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
  args: { direction: 'up', sideOffset: 4, children: 'Save the current workflow' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <ButtonDefault>Hover me</ButtonDefault>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
  play: hoverTrigger,
}

export const OnButtonDefaultIcon: Story = {
  args: {
    direction: 'up',
    sideOffset: 4,
    children: 'Schedules with the same key get deduplicated.',
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <ButtonDefaultIcon color="secondary" aria-label="Info">
          <MdInfoOutline size={18} />
        </ButtonDefaultIcon>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
  play: hoverTrigger,
}

export const NoArrow: Story = {
  args: { direction: 'none', sideOffset: 4, children: 'No arrow variant' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <ButtonDefault>Hover me</ButtonDefault>
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
          <ButtonDefault>Up</ButtonDefault>
        </TooltipTrigger>
        <TooltipContent direction="up">Tooltip above trigger</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonDefault>Right</ButtonDefault>
        </TooltipTrigger>
        <TooltipContent direction="right">Tooltip right of trigger</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonDefault>Down</ButtonDefault>
        </TooltipTrigger>
        <TooltipContent direction="down">Tooltip below trigger</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonDefault>Left</ButtonDefault>
        </TooltipTrigger>
        <TooltipContent direction="left">Tooltip left of trigger</TooltipContent>
      </Tooltip>
    </div>
  ),
}
