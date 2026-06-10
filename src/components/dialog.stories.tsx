import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'

import { ButtonDefault } from './button-default'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './dialog'
import { TextField } from './text-field'

const meta: Meta<typeof DialogContent> = {
  title: 'Dialogs/Dialog',
  component: DialogContent,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component:
          'Low-level dialog primitives (Header, Body, Footer) for composing custom dialogs. ' +
          'For confirm/cancel flows prefer FormDialog or ConfirmationDialog.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['narrow', 'wide', 'x-wide'] },
  },
}

export default meta
type Story = StoryObj<typeof DialogContent>

const openTrigger: Story['play'] = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button', { name: /^open/i }))
}

export const Narrow: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonDefault>Open dialog</ButtonDefault>
      </DialogTrigger>
      <DialogContent size="narrow">
        <DialogHeader>Save changes</DialogHeader>
        <DialogBody>Your unsaved changes will be applied to the workflow.</DialogBody>
        <DialogFooter>
          <ButtonDefault variant="secondary">Cancel</ButtonDefault>
          <ButtonDefault>Save</ButtonDefault>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: openTrigger,
}

export const Wide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonDefault>Open wide dialog</ButtonDefault>
      </DialogTrigger>
      <DialogContent size="wide">
        <DialogHeader>Configure integration</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <TextField label="Name" placeholder="Enter integration name" />
            <TextField label="Endpoint URL" placeholder="https://..." />
          </div>
        </DialogBody>
        <DialogFooter>
          <ButtonDefault variant="secondary">Cancel</ButtonDefault>
          <ButtonDefault>Save</ButtonDefault>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: openTrigger,
}

export const ExtraWide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonDefault>Open x-wide dialog</ButtonDefault>
      </DialogTrigger>
      <DialogContent size="x-wide">
        <DialogHeader>Workflow summary</DialogHeader>
        <DialogBody>
          <p>Use the x-wide variant when the body needs to host a wide table or canvas.</p>
        </DialogBody>
        <DialogFooter>
          <ButtonDefault variant="secondary">Close</ButtonDefault>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: openTrigger,
}

export const HideClose: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonDefault>Open without close button</ButtonDefault>
      </DialogTrigger>
      <DialogContent size="narrow">
        <DialogHeader hideClose>Confirm action</DialogHeader>
        <DialogBody>This dialog can only be dismissed via the footer buttons.</DialogBody>
        <DialogFooter>
          <ButtonDefault variant="secondary">Cancel</ButtonDefault>
          <ButtonDefault>Confirm</ButtonDefault>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: openTrigger,
}
