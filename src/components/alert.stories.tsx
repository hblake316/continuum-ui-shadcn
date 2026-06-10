import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert, AlertDescription, AlertTitle } from './alert'
import { ButtonDefault } from './button-default'

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
        component: `Inline feedback banner composed from \`Alert\`, \`AlertTitle\`, \`AlertDescription\`, and \`AlertAction\`.

- **severity**: \`basic\` · \`error\` · \`warning\` · \`info\` · \`success\`
- **startIcon**: show/hide the built-in severity icon (default \`true\`)
- **action**: shorthand prop — pass any node and it is wrapped in \`AlertAction\` automatically
- Use \`AlertAction\` as a child for full control, or pass \`onClose\` for the built-in close button`,
      },
    },
  },
  argTypes: {
    severity: { control: 'radio', options: ['basic', 'error', 'warning', 'info', 'success'] },
    startIcon: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  render: () => (
    <div className="w-[480px]">
      <Alert severity="info">
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          Workflow templates can now be shared across environments.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const Success: Story = {
  render: () => (
    <div className="w-[480px]">
      <Alert severity="success">
        <AlertTitle>Deploy succeeded</AlertTitle>
        <AlertDescription>Revision 42 is now serving 100% of traffic.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const Warning: Story = {
  render: () => (
    <div className="w-[480px]">
      <Alert severity="warning">
        <AlertTitle>Action required</AlertTitle>
        <AlertDescription>Your API key expires in 7 days.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="w-[480px]">
      <Alert severity="error">
        <AlertTitle>Connection lost</AlertTitle>
        <AlertDescription>
          Failed to reach the runtime service. Retrying in 30 seconds.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const Basic: Story = {
  render: () => (
    <div className="w-[480px]">
      <Alert severity="basic">
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>This is a neutral informational message.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const AllSeverities: Story = {
  render: () => (
    <div className="flex w-[480px] flex-col gap-3">
      <Alert severity="basic">
        <AlertTitle>Basic</AlertTitle>
        <AlertDescription>Neutral informational message.</AlertDescription>
      </Alert>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Workflow templates can now be shared.</AlertDescription>
      </Alert>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Deploy completed successfully.</AlertDescription>
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>API key expires in 7 days.</AlertDescription>
      </Alert>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to reach runtime service.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <div className="flex w-[480px] flex-col gap-3">
      <Alert
        severity="error"
        title="Failed to load workspace objects"
        action={
          <ButtonDefault variant="secondary" size="sm" onClick={() => {}}>
            Retry
          </ButtonDefault>
        }
      >
        An unexpected error occurred. Please try again.
      </Alert>
      <Alert
        severity="warning"
        title="Session expiring soon"
        action={
          <ButtonDefault variant="secondary" size="sm" onClick={() => {}}>
            Renew
          </ButtonDefault>
        }
      >
        Your session will expire in 5 minutes.
      </Alert>
      <Alert
        severity="info"
        title="Update available"
        action={
          <ButtonDefault variant="secondary" size="sm" onClick={() => {}}>
            Learn more
          </ButtonDefault>
        }
      >
        A new version of the platform is ready to deploy.
      </Alert>
    </div>
  ),
}

export const WithOnClose: Story = {
  render: () => (
    <div className="w-[480px]">
      <Alert severity="info" onClose={() => {}}>
        <AlertTitle>Dismissible via onClose</AlertTitle>
        <AlertDescription>Uses the built-in close button.</AlertDescription>
      </Alert>
    </div>
  ),
}

const severities = ['basic', 'error', 'warning', 'info', 'success'] as const

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6 w-[480px]">
      <div>
        <h3 className="text-sm font-medium mb-2">Default (icon + title + description)</h3>
        <div className="flex flex-col gap-2">
          {severities.map((s) => (
            <Alert key={s} severity={s}>
              <AlertTitle>{s.charAt(0).toUpperCase() + s.slice(1)} title</AlertTitle>
              <AlertDescription>Description text for the {s} severity.</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">With close button (onClose)</h3>
        <div className="flex flex-col gap-2">
          {severities.map((s) => (
            <Alert key={s} severity={s} onClose={() => {}}>
              <AlertTitle>{s.charAt(0).toUpperCase() + s.slice(1)} title</AlertTitle>
              <AlertDescription>Closeable alert.</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">With action prop</h3>
        <div className="flex flex-col gap-2">
          {severities.map((s) => (
            <Alert
              key={s}
              severity={s}
              action={
                <ButtonDefault variant="secondary" size="sm">
                  Action
                </ButtonDefault>
              }
            >
              <AlertTitle>{s.charAt(0).toUpperCase() + s.slice(1)} title</AlertTitle>
              <AlertDescription>Alert with an action button.</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  ),
}
