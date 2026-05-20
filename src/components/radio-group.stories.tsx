import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioGroupItem } from './radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: { label: 'Environment', defaultValue: 'prod' },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="prod" label="Production" />
      <RadioGroupItem value="staging" label="Staging" />
      <RadioGroupItem value="dev" label="Development" />
    </RadioGroup>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup label="Small" defaultValue="b">
        <RadioGroupItem size="sm" value="a" label="Option A" />
        <RadioGroupItem size="sm" value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup label="Medium" defaultValue="b">
        <RadioGroupItem size="md" value="a" label="Option A" />
        <RadioGroupItem size="md" value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup label="Large" defaultValue="b">
        <RadioGroupItem size="lg" value="a" label="Option A" />
        <RadioGroupItem size="lg" value="b" label="Option B" />
      </RadioGroup>
    </div>
  ),
}

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup label="Primary" defaultValue="a">
        <RadioGroupItem color="primary" value="a" label="Selected" />
        <RadioGroupItem color="primary" value="b" label="Unselected" />
      </RadioGroup>
      <RadioGroup label="Secondary" defaultValue="a">
        <RadioGroupItem color="secondary" value="a" label="Selected" />
        <RadioGroupItem color="secondary" value="b" label="Unselected" />
      </RadioGroup>
      <RadioGroup label="Default" defaultValue="a">
        <RadioGroupItem color="default" value="a" label="Selected" />
        <RadioGroupItem color="default" value="b" label="Unselected" />
      </RadioGroup>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup label="Disabled group" defaultValue="b">
      <RadioGroupItem value="a" label="Option A" disabled />
      <RadioGroupItem value="b" label="Option B" disabled />
    </RadioGroup>
  ),
}

export const WithError: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup label="Pick an environment" error="An environment is required">
      <RadioGroupItem value="prod" label="Production" />
      <RadioGroupItem value="staging" label="Staging" />
    </RadioGroup>
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
