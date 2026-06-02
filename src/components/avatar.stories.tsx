import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6587-47403&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `User identity tile rendered as initials, image, or icon. Optional \`badge\` slot in the bottom-right for presence/status.

- **variant**: \`circular\` for people · \`square\`/\`rounded\` for resources or brand marks.
- **size**: \`sm\` (24px) for inline rows · \`md\` (32px) default · \`lg\` (40px) for profile headers.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['circular', 'square', 'rounded'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    badge: { control: 'boolean' },
    initials: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Initials: Story = {
  args: { initials: 'HB', size: 'md', variant: 'circular' },
}

export const Icon: Story = {
  args: { size: 'md', variant: 'circular' },
}

const sampleAvatarDataUrl =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>" +
  "<rect width='64' height='64' fill='%23226BD8'/>" +
  "<circle cx='32' cy='26' r='10' fill='%23fff'/>" +
  "<path d='M14 56c0-10 8-18 18-18s18 8 18 18z' fill='%23fff'/></svg>"

export const Image: Story = {
  args: {
    size: 'md',
    variant: 'circular',
    src: sampleAvatarDataUrl,
    alt: 'User avatar',
  },
}

export const WithBadge: Story = {
  args: { initials: 'HB', size: 'md', variant: 'circular', badge: true },
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" initials="SM" />
      <Avatar size="md" initials="MD" />
      <Avatar size="lg" initials="LG" />
    </div>
  ),
}

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="circular" initials="CI" />
      <Avatar variant="rounded" initials="RO" />
      <Avatar variant="square" initials="SQ" />
    </div>
  ),
}
