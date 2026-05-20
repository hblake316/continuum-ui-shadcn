import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrev,
} from './pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['circular', 'rounded'] },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Basic: Story = {
  render: () => (
    <Pagination>
      <PaginationPrev />
      <PaginationItem>1</PaginationItem>
      <PaginationItem selected>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationItem>4</PaginationItem>
      <PaginationItem>5</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
}

export const Rounded: Story = {
  render: () => (
    <Pagination>
      <PaginationPrev variant="rounded" />
      <PaginationItem variant="rounded">1</PaginationItem>
      <PaginationItem variant="rounded" selected>
        2
      </PaginationItem>
      <PaginationItem variant="rounded">3</PaginationItem>
      <PaginationNext variant="rounded" />
    </Pagination>
  ),
}

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationPrev />
      <PaginationItem>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem selected>3</PaginationItem>
      <PaginationItem>4</PaginationItem>
      <PaginationItem>5</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>20</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
}

export const DisabledEdges: Story = {
  render: () => (
    <Pagination>
      <PaginationPrev disabled />
      <PaginationItem selected>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [page, setPage] = useState(1)
    const totalPages = 5
    return (
      <Pagination>
        <PaginationPrev disabled={page === 1} onClick={() => setPage((p) => p - 1)} />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <PaginationItem key={n} selected={n === page} onClick={() => setPage(n)}>
            {n}
          </PaginationItem>
        ))}
        <PaginationNext disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} />
      </Pagination>
    )
  },
}
