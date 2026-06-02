import type { Meta, StoryObj } from '@storybook/react-vite'

import { CircularProgress } from './progress'

const meta: Meta<typeof CircularProgress> = {
  title: 'Components/Progress/Circular',
  component: CircularProgress,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=21459-12954&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Circular progress indicator. Use for short determinate operations or inline loading states. For full-page or top-of-section indeterminate loading use \`LinearProgress\`.`,
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: { type: 'number', min: 16, max: 96, step: 4 } },
    thickness: { control: { type: 'number', min: 1, max: 8, step: 0.4 } },
  },
}

export default meta
type Story = StoryObj<typeof CircularProgress>

export const Determinate: Story = {
  args: { value: 50, color: 'primary', size: 40, thickness: 3.6 },
}

export const Indeterminate: Story = {
  args: { color: 'primary', size: 40, thickness: 3.6 },
}

export const AllValues: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <CircularProgress value={25} />
      <CircularProgress value={50} />
      <CircularProgress value={75} />
      <CircularProgress value={100} />
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <CircularProgress size={24} thickness={2.4} />
      <CircularProgress size={40} />
      <CircularProgress size={64} thickness={4} />
    </div>
  ),
}
