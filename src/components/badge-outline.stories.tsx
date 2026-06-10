import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdStar } from 'react-icons/md'

import { BadgeOutline } from './badge-outline'

const meta: Meta<typeof BadgeOutline> = {
  title: 'Components/BadgeOutline',
  component: BadgeOutline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Outlined badge pill — paper background with a 1px semantic border and matching text color.

- **color**: \`primary\` · \`secondary\` · \`accent\` · \`success\` · \`warning\` · \`invalid\` · \`info\`.
- **size**: \`large\` (34px) · \`default\` (28px) · \`small\` (18px, fully pill-shaped).
- Hover and focus show light semantic tints over the paper background.
- Compare with \`BadgeDefault\` which uses solid color fills with white text.`,
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
type Story = StoryObj<typeof BadgeOutline>

export const Default: Story = {
  args: { color: 'primary', size: 'default', children: 'Label' },
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(['primary', 'secondary', 'accent', 'success', 'warning', 'invalid', 'info'] as const).map(
        (color) => (
          <BadgeOutline key={color} color={color}>
            {color}
          </BadgeOutline>
        )
      )}
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <BadgeOutline size="large">Large</BadgeOutline>
      <BadgeOutline size="default">Default</BadgeOutline>
      <BadgeOutline size="small">Small</BadgeOutline>
    </div>
  ),
}

export const WithLeftIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <BadgeOutline size="large" leftIcon={<MdStar size={24} />}>
        Large
      </BadgeOutline>
      <BadgeOutline size="default" leftIcon={<MdStar size={18} />}>
        Default
      </BadgeOutline>
      <BadgeOutline size="small" leftIcon={<MdStar size={14} />}>
        Small
      </BadgeOutline>
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
            <BadgeOutline key={color} color={color} onDelete={() => {}}>
              {color}
            </BadgeOutline>
          )
        )}
      </div>
    )
  },
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <BadgeOutline disabled>Primary</BadgeOutline>
      <BadgeOutline color="secondary" disabled>
        Secondary
      </BadgeOutline>
      <BadgeOutline disabled leftIcon={<MdStar size={18} />} onDelete={() => {}}>
        With icons
      </BadgeOutline>
    </div>
  ),
}

export const CompareWithDefault: Story = {
  name: 'Compare: Outline vs Default',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Side by side comparison — same color, Outline (left) vs Default (right).',
      },
    },
  },
  render: () => {
    // inline import to avoid circular dep in stories

    const { BadgeDefault } = require('./badge-default')
    return (
      <div className="flex flex-col gap-2">
        {(['primary', 'secondary', 'accent', 'success'] as const).map((color) => (
          <div key={color} className="flex items-center gap-3">
            <BadgeOutline color={color}>{color}</BadgeOutline>
            <BadgeDefault color={color}>{color}</BadgeDefault>
          </div>
        ))}
      </div>
    )
  },
}
