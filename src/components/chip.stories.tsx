import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './avatar'
import { Chip } from './chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component: `Compact pill for tags, attributes, filter values, or selected items. For numeric counts on another element use \`Badge\`; for status text use \`StatusIndicator\`; for full-width feedback use \`Alert\`.

- **variant**: \`filled\` when the chip is content (tags, identifiers) · \`outlined\` for filter/toggle affordances.
- **color**: \`default\` neutral · \`primary\` for selected/active · semantic colors (\`error\`/\`warning\`/\`success\`) only when the chip itself encodes state.
- Add \`onDelete\` for filter or selection chips users can remove.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outlined'] },
    color: {
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: { control: 'radio', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Filled: Story = {
  args: { variant: 'filled', color: 'primary', children: 'Production' },
}

export const Outlined: Story = {
  args: { variant: 'outlined', color: 'primary', children: 'Production' },
}

export const AllColorsFilled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(
        (color) => (
          <Chip key={color} color={color}>
            {color}
          </Chip>
        )
      )}
    </div>
  ),
}

export const AllColorsOutlined: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(
        (color) => (
          <Chip key={color} variant="outlined" color={color}>
            {color}
          </Chip>
        )
      )}
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
    </div>
  ),
}

export const WithThumbnail: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Chip thumbnail={<Avatar size="sm" initials="HB" />}>Heather Blake</Chip>
      <Chip variant="outlined" color="primary" thumbnail={<Avatar size="sm" initials="JD" />}>
        Jane Doe
      </Chip>
    </div>
  ),
}

export const Deletable: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip onDelete={args.onDelete}>prod-us-east</Chip>
      <Chip variant="outlined" color="primary" onDelete={args.onDelete}>
        staging
      </Chip>
      <Chip color="error" onDelete={args.onDelete}>
        critical
      </Chip>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
}
