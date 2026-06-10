import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdStar } from 'react-icons/md'

import { BadgeDefault } from './badge-default'

const meta: Meta<typeof BadgeDefault> = {
  title: 'Components/BadgeDefault',
  component: BadgeDefault,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Semantic badge pill. Use for counts, labels, and status indicators attached to content.

- **color**: \`primary\` · \`secondary\` · \`accent\` · \`success\` · \`warning\` · \`invalid\` · \`info\`.
- **size**: \`large\` (34px) · \`default\` (28px) · \`small\` (18px).
- Pass \`leftIcon\` to prepend an icon. Pass \`onDelete\` to show a delete (×) button.
- \`secondary\` is the only light-background color; all others use colored fills with white text.`,
      },
    },
  },
  argTypes: {
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'invalid', 'info'],
    },
    size: { control: 'radio', options: ['large', 'default', 'small'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof BadgeDefault>

export const Default: Story = {
  args: { color: 'primary', size: 'default', children: 'Label' },
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(['primary', 'secondary', 'accent', 'success', 'warning', 'invalid', 'info'] as const).map(
        (color) => (
          <BadgeDefault key={color} color={color}>
            {color}
          </BadgeDefault>
        )
      )}
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <BadgeDefault size="large">Large</BadgeDefault>
      <BadgeDefault size="default">Default</BadgeDefault>
      <BadgeDefault size="small">Small</BadgeDefault>
    </div>
  ),
}

export const WithLeftIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <BadgeDefault size="large" leftIcon={<MdStar size={24} />}>
        Large
      </BadgeDefault>
      <BadgeDefault size="default" leftIcon={<MdStar size={18} />}>
        Default
      </BadgeDefault>
      <BadgeDefault size="small" leftIcon={<MdStar size={14} />}>
        Small
      </BadgeDefault>
    </div>
  ),
}

export const WithDelete: Story = {
  parameters: { controls: { disable: true } },
  render: function DeleteStory() {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {(['primary', 'secondary', 'accent', 'success', 'warning', 'invalid', 'info'] as const).map(
          (color) => (
            <BadgeDefault key={color} color={color} onDelete={() => {}}>
              {color}
            </BadgeDefault>
          )
        )}
      </div>
    )
  },
}

export const WithIconAndDelete: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <BadgeDefault leftIcon={<MdStar size={18} />} onDelete={() => {}}>
        Label
      </BadgeDefault>
      <BadgeDefault color="secondary" leftIcon={<MdStar size={18} />} onDelete={() => {}}>
        Label
      </BadgeDefault>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <BadgeDefault disabled>Primary</BadgeDefault>
      <BadgeDefault color="secondary" disabled>
        Secondary
      </BadgeDefault>
      <BadgeDefault disabled leftIcon={<MdStar size={18} />} onDelete={() => {}}>
        With icons
      </BadgeDefault>
    </div>
  ),
}
