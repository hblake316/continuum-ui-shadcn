import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  TransferList,
  TransferListButtons,
  TransferListItem,
  TransferListPanel,
} from './transfer-list'

const meta: Meta<typeof TransferList> = {
  title: 'Forms/TransferList',
  component: TransferList,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Shuttle/dual-list picker for moving items between two sets (e.g. assigning permissions). Use only when both sides matter and the user needs to see what's NOT selected; otherwise prefer \`MultiSelect\`.`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TransferList>

const ALL_OPTIONS = [
  'Workflows.read',
  'Workflows.write',
  'Schedules.read',
  'Schedules.write',
  'Environments.read',
  'Environments.write',
  'Events.publish',
]

function TransferListDemo() {
  const [left, setLeft] = useState<string[]>(ALL_OPTIONS.slice(0, 4))
  const [right, setRight] = useState<string[]>(ALL_OPTIONS.slice(4))
  const [leftSelected, setLeftSelected] = useState<Set<string>>(new Set())
  const [rightSelected, setRightSelected] = useState<Set<string>>(new Set())

  function move(from: 'left' | 'right', items: string[]) {
    if (from === 'left') {
      setLeft((l) => l.filter((i) => !items.includes(i)))
      setRight((r) => [...r, ...items])
      setLeftSelected(new Set())
    } else {
      setRight((r) => r.filter((i) => !items.includes(i)))
      setLeft((l) => [...l, ...items])
      setRightSelected(new Set())
    }
  }

  function toggle(side: 'left' | 'right', item: string) {
    const setter = side === 'left' ? setLeftSelected : setRightSelected
    setter((prev) => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })
  }

  return (
    <TransferList>
      <TransferListPanel header={`Available (${left.length})`}>
        {left.map((item) => (
          <TransferListItem
            key={item}
            selected={leftSelected.has(item)}
            onClick={() => toggle('left', item)}
          >
            {item}
          </TransferListItem>
        ))}
      </TransferListPanel>

      <TransferListButtons
        onMoveAllRight={() => move('left', left)}
        onMoveRight={() => move('left', Array.from(leftSelected))}
        onMoveLeft={() => move('right', Array.from(rightSelected))}
        onMoveAllLeft={() => move('right', right)}
        disableMoveAllRight={left.length === 0}
        disableMoveRight={leftSelected.size === 0}
        disableMoveLeft={rightSelected.size === 0}
        disableMoveAllLeft={right.length === 0}
      />

      <TransferListPanel header={`Selected (${right.length})`}>
        {right.map((item) => (
          <TransferListItem
            key={item}
            selected={rightSelected.has(item)}
            onClick={() => toggle('right', item)}
          >
            {item}
          </TransferListItem>
        ))}
      </TransferListPanel>
    </TransferList>
  )
}

export const Default: Story = {
  render: () => <TransferListDemo />,
}

export const Empty: Story = {
  render: () => (
    <TransferList>
      <TransferListPanel header="Available (0)" />
      <TransferListButtons
        disableMoveAllRight
        disableMoveRight
        disableMoveLeft
        disableMoveAllLeft
      />
      <TransferListPanel header="Selected (0)" />
    </TransferList>
  ),
}
