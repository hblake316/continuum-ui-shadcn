import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdInbox, MdOutlineSearchOff } from 'react-icons/md'

import { ButtonOutline } from './button-outline'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component:
          'Low-level shadcn empty primitives. For most use cases prefer the higher-level ' +
          'EmptyState wrapper.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Empty>

export const TitleOnly: Story = {
  render: () => (
    <Empty className="w-[480px]">
      <EmptyHeader>
        <EmptyTitle>No activity yet</EmptyTitle>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Empty className="w-[480px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MdInbox />
        </EmptyMedia>
        <EmptyTitle>No audit events</EmptyTitle>
        <EmptyDescription>Audit events will appear here once enabled.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Empty className="w-[480px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MdOutlineSearchOff />
        </EmptyMedia>
        <EmptyTitle>No matching results</EmptyTitle>
        <EmptyDescription>Try a different search or clear your filters.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ButtonOutline size="sm">Clear filters</ButtonOutline>
      </EmptyContent>
    </Empty>
  ),
}
