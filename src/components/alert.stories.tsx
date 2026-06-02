import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert } from './alert'
import { Button } from './button'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=7611-60484&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Inline feedback banner with icon, title, and description. Use for persistent in-page messages; for short transient toasts use \`Snackbar\`; for blocking confirmation use \`ConfirmationDialog\`.

- **severity**: \`error\` for failures · \`warning\` for non-blocking issues · \`info\` for neutral notices · \`success\` for confirmations.
- **variant**: \`standard\` (light tinted bg, colored left border) is the default; \`filled\` (solid bg) for higher emphasis.`,
      },
    },
  },
  argTypes: {
    severity: { control: 'radio', options: ['error', 'warning', 'info', 'success'] },
    variant: { control: 'radio', options: ['standard', 'filled'] },
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    title: 'New feature available',
    children: 'Workflow templates can now be shared across environments.',
  },
  render: (args) => (
    <div className="w-[480px]">
      <Alert {...args} />
    </div>
  ),
}

export const Success: Story = {
  args: {
    severity: 'success',
    variant: 'standard',
    title: 'Deploy succeeded',
    children: 'Revision 42 is now serving 100% of traffic.',
  },
  render: (args) => (
    <div className="w-[480px]">
      <Alert {...args} />
    </div>
  ),
}

export const Warning: Story = {
  args: {
    severity: 'warning',
    variant: 'standard',
    title: 'Action required',
    children: 'Your API key expires in 7 days.',
  },
  render: (args) => (
    <div className="w-[480px]">
      <Alert {...args} />
    </div>
  ),
}

export const Error: Story = {
  args: {
    severity: 'error',
    variant: 'standard',
    title: 'Connection lost',
    children: 'Failed to reach the runtime service. Retrying in 30 seconds.',
  },
  render: (args) => (
    <div className="w-[480px]">
      <Alert {...args} />
    </div>
  ),
}

export const Filled: Story = {
  render: () => (
    <div className="flex w-[480px] flex-col gap-3">
      <Alert severity="info" variant="filled" title="Info">
        Workflow templates can now be shared.
      </Alert>
      <Alert severity="success" variant="filled" title="Success">
        Deploy completed successfully.
      </Alert>
      <Alert severity="warning" variant="filled" title="Warning">
        API key expires in 7 days.
      </Alert>
      <Alert severity="error" variant="filled" title="Error">
        Failed to reach runtime service.
      </Alert>
    </div>
  ),
}

export const WithAction: Story = {
  args: {
    severity: 'warning',
    variant: 'standard',
    title: 'Unsaved changes',
    children: 'You have unsaved edits to this workflow.',
  },
  render: (args) => (
    <div className="w-[560px]">
      <Alert
        {...args}
        action={
          <Button variant="text" color="warning" size="sm">
            Save
          </Button>
        }
      />
    </div>
  ),
}
