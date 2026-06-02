import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component:
          'Low-level shadcn skeleton primitive (pulsing block). For variant-aware widget ' +
          'placeholders prefer WidgetSkeleton.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Rectangle: Story = {
  render: () => <Skeleton className="h-12 w-72" />,
}

export const Line: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
}

export const Circle: Story = {
  render: () => <Skeleton className="size-12 rounded-full" />,
}

export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex w-96 items-center gap-4 rounded border border-outline-border bg-background-paper p-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ),
}
