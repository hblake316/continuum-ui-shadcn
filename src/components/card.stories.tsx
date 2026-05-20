import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdMoreVert } from 'react-icons/md'

import { Avatar } from './avatar'
import { Button } from './button'
import { Card, CardContent, CardFooter, CardHeader } from './card'
import { IconButton } from './icon-button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component: `Container for grouped content. Compose \`CardHeader\`, \`CardContent\`, and \`CardFooter\` as needed; \`stroke\` adds a border for stronger separation. Use \`dense\` on \`CardHeader\` for compact list layouts.`,
      },
    },
  },
  argTypes: {
    stroke: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  args: { stroke: true },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader title="Nightly ETL" subtitle="Last run 2h ago" />
      <CardContent>
        <p className="text-sm text-text-primary">
          Extracts events from yesterday and loads them into the warehouse.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader title="Archive workflow?" subtitle="This action cannot be undone" />
      <CardContent>
        <p className="text-sm text-text-primary">
          Archived workflows stop firing on their schedule and are hidden from search.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="text">Cancel</Button>
        <Button color="error">Archive</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAvatarAndAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader
        title="Heather Blake"
        subtitle="heather.blake@continuous.com"
        avatar={<Avatar initials="HB" />}
        action={
          <IconButton variant="text" color="action" size="sm" aria-label="More">
            <MdMoreVert size={16} />
          </IconButton>
        }
      />
      <CardContent>
        <p className="text-sm text-text-primary">Owner of 12 workflows across 3 environments.</p>
      </CardContent>
    </Card>
  ),
}

export const NoStroke: Story = {
  render: () => (
    <Card stroke={false} className="w-80 shadow-md">
      <CardHeader title="Borderless" subtitle="Useful inside other surfaces" />
      <CardContent>
        <p className="text-sm text-text-primary">
          Drop the border when the card already sits on a panel that provides separation.
        </p>
      </CardContent>
    </Card>
  ),
}
