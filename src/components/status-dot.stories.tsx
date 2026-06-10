import type { Meta, StoryObj } from '@storybook/react-vite'

import { StatusDot } from './status-dot'

const meta: Meta<typeof StatusDot> = {
  title: 'Components/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6587-47500&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Tiny presence/state dot (online/offline/error/etc). Use beside text or avatars. For status with an inline label use \`StatusIndicator\`.

- **variant**: \`standard\` (default) — pill badge with text · \`dot\` — 8×8 decorative circle.
- **color**: \`default\` · \`primary\` · \`secondary\` · \`error\` · \`warning\` · \`info\` · \`success\`.
- \`default\` color Standard has no background — text only on transparent.
- Pair \`dot\` with adjacent text in the parent for accessible labelling.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['standard', 'dot'] },
    color: {
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
  },
}

export default meta
type Story = StoryObj<typeof StatusDot>

export const Standard: Story = {
  args: { variant: 'standard', color: 'success', children: 'Online' },
}

export const Dot: Story = {
  args: { variant: 'dot', color: 'success' },
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <StatusDot variant="standard" color="default">
          Default
        </StatusDot>
        <StatusDot variant="dot" color="default" />
      </div>
      <div className="flex items-center gap-4">
        <StatusDot variant="standard" color="primary">
          Primary
        </StatusDot>
        <StatusDot variant="dot" color="primary" />
      </div>
      <div className="flex items-center gap-4">
        <StatusDot variant="standard" color="secondary">
          Secondary
        </StatusDot>
        <StatusDot variant="dot" color="secondary" />
      </div>
      <div className="flex items-center gap-4">
        <StatusDot variant="standard" color="error">
          Error
        </StatusDot>
        <StatusDot variant="dot" color="error" />
      </div>
      <div className="flex items-center gap-4">
        <StatusDot variant="standard" color="warning">
          Warning
        </StatusDot>
        <StatusDot variant="dot" color="warning" />
      </div>
      <div className="flex items-center gap-4">
        <StatusDot variant="standard" color="info">
          Info
        </StatusDot>
        <StatusDot variant="dot" color="info" />
      </div>
      <div className="flex items-center gap-4">
        <StatusDot variant="standard" color="success">
          Success
        </StatusDot>
        <StatusDot variant="dot" color="success" />
      </div>
    </div>
  ),
}

export const DotWithLabel: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Pair the dot variant with adjacent text — the dot itself is `aria-hidden`.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2 text-sm text-text-primary">
      <span className="inline-flex items-center gap-2">
        <StatusDot variant="dot" color="success" />
        Production connected
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot variant="dot" color="warning" />
        Staging degraded
      </span>
      <span className="inline-flex items-center gap-2">
        <StatusDot variant="dot" color="error" />
        QA unreachable
      </span>
    </div>
  ),
}
