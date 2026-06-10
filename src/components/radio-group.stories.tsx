import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup, RadioGroupItem } from './radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6558-39344&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Mutually-exclusive selection from a small set of options. For 2-way toggles use \`Switch\`; for many independent boolean options use \`Checkbox\`; for one-of-many from longer lists use \`Select\` or \`SegmentedControl\`.

- **color** (item): \`default\` · \`invalid\`.
- For the **invalid state**, set \`color="invalid"\` on items and pass \`error\` to the group so assistive technology is notified.
- The group \`label\` supports an optional \`description\` line below it.`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Basic: Story = {
  args: { label: 'Environment', defaultValue: 'prod' },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="prod" label="Production" />
      <RadioGroupItem value="staging" label="Staging" />
      <RadioGroupItem value="dev" label="Development" />
    </RadioGroup>
  ),
}

export const ItemWithDescription: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Each `RadioGroupItem` accepts an optional `description` prop that renders hint text below its label. The radio icon aligns to the top of the label+description block.',
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="default">
      <RadioGroupItem
        value="default"
        label="Default"
        description="Standard spacing for most use cases."
      />
      <RadioGroupItem
        value="comfortable"
        label="Comfortable"
        description="More space between elements."
      />
      <RadioGroupItem
        value="compact"
        label="Compact"
        description="Minimal spacing for dense layouts."
      />
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The group label supports an optional `description` line below it. Description text stays secondary gray even in the invalid state.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        label="Label"
        description="This is descriptive info. It is hint text"
        defaultValue="b"
      >
        <RadioGroupItem value="a" label="Label" />
        <RadioGroupItem value="b" label="Label" />
        <RadioGroupItem value="c" label="Label" />
      </RadioGroup>

      <RadioGroup
        label="Label"
        description="This is descriptive info. It is hint text"
        error=" "
        defaultValue="b"
      >
        <RadioGroupItem color="invalid" value="a" label="Label" />
        <RadioGroupItem color="invalid" value="b" label="Label" />
        <RadioGroupItem color="invalid" value="c" label="Label" />
      </RadioGroup>
    </div>
  ),
}

export const InvalidState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Set `color="invalid"` on each item and pass `error` to the group to show the invalid state with an error message below.',
      },
    },
  },
  render: () => (
    <RadioGroup label="Environment" error="An environment selection is required.">
      <RadioGroupItem color="invalid" value="prod" label="Production" />
      <RadioGroupItem color="invalid" value="staging" label="Staging" />
      <RadioGroupItem color="invalid" value="dev" label="Development" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup label="Environment" defaultValue="staging">
      <RadioGroupItem value="prod" label="Production" disabled />
      <RadioGroupItem value="staging" label="Staging" disabled />
      <RadioGroupItem value="dev" label="Development" disabled />
    </RadioGroup>
  ),
}

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup label="Default" defaultValue="a">
        <RadioGroupItem color="default" value="a" label="Selected" />
        <RadioGroupItem color="default" value="b" label="Unselected" />
      </RadioGroup>
      <RadioGroup label="Invalid" defaultValue="a">
        <RadioGroupItem color="invalid" value="a" label="Selected" />
        <RadioGroupItem color="invalid" value="b" label="Unselected" />
      </RadioGroup>
    </div>
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [value, setValue] = useState('staging')
    return (
      <RadioGroup label="Environment" value={value} onValueChange={setValue}>
        <RadioGroupItem value="prod" label="Production" />
        <RadioGroupItem value="staging" label="Staging" />
        <RadioGroupItem value="dev" label="Development" />
      </RadioGroup>
    )
  },
}
