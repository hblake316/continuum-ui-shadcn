import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'
import { Step, Stepper } from './stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component: `Multi-step progress indicator for wizards and flows. The \`Stepper\` owns \`activeStep\`; each \`Step\` derives \`active\`/\`completed\`/\`upcoming\` from position. Set \`status='error'\` explicitly on a failed step.`,
      },
    },
  },
  argTypes: {
    activeStep: { control: { type: 'number', min: 0 } },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const ThreeSteps: Story = {
  args: { activeStep: 1 },
  render: (args) => (
    <Stepper {...args} className="w-[480px]">
      <Step label="Select source" />
      <Step label="Configure" />
      <Step label="Review" />
    </Stepper>
  ),
}

export const WithDescriptions: Story = {
  args: { activeStep: 1 },
  render: (args) => (
    <Stepper {...args} className="w-[640px]">
      <Step label="Select source" description="Pick an environment" />
      <Step label="Configure" description="Map fields" />
      <Step label="Review" description="Confirm and apply" />
    </Stepper>
  ),
}

export const AllCompleted: Story = {
  args: { activeStep: 3 },
  render: (args) => (
    <Stepper {...args} className="w-[480px]">
      <Step label="Select source" />
      <Step label="Configure" />
      <Step label="Review" />
    </Stepper>
  ),
}

export const WithError: Story = {
  render: () => (
    <Stepper activeStep={1} className="w-[480px]">
      <Step label="Select source" />
      <Step status="error" label="Configure" description="Missing required fields" />
      <Step label="Review" />
    </Stepper>
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [active, setActive] = useState(0)
    const total = 3
    return (
      <div className="flex w-[480px] flex-col gap-6">
        <Stepper activeStep={active}>
          <Step label="Select source" />
          <Step label="Configure" />
          <Step label="Review" />
        </Stepper>
        <div className="flex justify-end gap-2">
          <Button
            variant="text"
            onClick={() => setActive((s) => Math.max(0, s - 1))}
            disabled={active === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => setActive((s) => Math.min(total, s + 1))}
            disabled={active === total}
          >
            {active === total - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    )
  },
}
