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
- **size**: \`lg\` (40px) · \`md\` (32px) · \`sm\` (24px) · \`xs\` (14px).`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['circular', 'square', 'rounded'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm', 'xs'] },
    content: { control: 'radio', options: ['text', 'icon'] },
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
  args: { size: 'md', variant: 'circular', content: 'icon' },
}

export const WithBadge: Story = {
  args: { initials: 'HB', size: 'lg', variant: 'circular', badge: true },
}

const sizes = ['lg', 'md', 'sm', 'xs'] as const
const variants = ['circular', 'rounded', 'square'] as const

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Text</p>
        <div className="flex flex-col gap-3">
          {variants.map((v) => (
            <div key={v} className="flex items-center gap-3">
              <span className="w-16 text-xs text-muted-foreground">{v}</span>
              {sizes.map((s) => (
                <Avatar key={s} size={s} variant={v} initials="OP" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Icon</p>
        <div className="flex flex-col gap-3">
          {variants.map((v) => (
            <div key={v} className="flex items-center gap-3">
              <span className="w-16 text-xs text-muted-foreground">{v}</span>
              {sizes.map((s) => (
                <Avatar key={s} size={s} variant={v} content="icon" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">With badge</p>
        <div className="flex items-center gap-3">
          {sizes.map((s) => (
            <Avatar key={s} size={s} variant="circular" initials="OP" badge />
          ))}
        </div>
      </div>
    </div>
  ),
}
