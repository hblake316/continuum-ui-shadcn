import type { Meta, StoryObj } from '@storybook/react-vite'

import { WidgetSkeleton } from './widget-skeleton'

const meta: Meta<typeof WidgetSkeleton> = {
  title: 'Components/WidgetSkeleton',
  component: WidgetSkeleton,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Accessible shape-aware loading placeholder. Use over bare \`Skeleton\` when the placeholder represents UI a screen reader will see (sets \`role='status'\` and \`aria-busy\`).

- **variant**: \`rectangle\` for cards/widgets · \`line\` for text lines · \`circle\` for avatars/icons.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['rectangle', 'line', 'circle'] },
    srLabel: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof WidgetSkeleton>

export const Default: Story = {
  args: {
    variant: 'rectangle',
    className: 'h-12 w-full',
  },
}

export const Line: Story = {
  args: {
    variant: 'line',
    className: 'w-3/4',
  },
}

export const Circle: Story = {
  args: {
    variant: 'circle',
    className: 'size-10',
  },
}

export const WidgetSlot: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3 rounded border border-outline-border bg-background-paper p-4">
      <WidgetSkeleton variant="line" className="w-1/2" />
      <WidgetSkeleton variant="line" />
      <WidgetSkeleton variant="line" className="w-5/6" />
    </div>
  ),
}

export const MultipleVariants: Story = {
  render: () => (
    <div className="grid w-96 grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
      <WidgetSkeleton variant="circle" className="size-10" />
      <div className="flex flex-col gap-2">
        <WidgetSkeleton variant="line" className="w-1/2" />
        <WidgetSkeleton variant="line" className="w-3/4" />
      </div>
      <WidgetSkeleton variant="rectangle" className="col-span-2 h-24 w-full" />
    </div>
  ),
}
