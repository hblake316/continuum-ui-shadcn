import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { ConfirmationDialog } from './confirmation-dialog'
import { ButtonDefault } from './button-default'

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'Dialogs/ConfirmationDialog',
  component: ConfirmationDialog,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component:
          'A thin wrapper over FormDialog for simple text-only confirmation dialogs. ' +
          'Use this when the dialog body is a single message string; use FormDialog ' +
          'directly when you need custom body content. Click "Open dialog" in the ' +
          'examples below to see each variant.',
      },
    },
  },
  argTypes: {
    severity: { control: 'radio', options: ['default', 'destructive'] },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmationDialog>

function DialogDemo(props: {
  label: string
  dialogProps: Omit<
    React.ComponentProps<typeof ConfirmationDialog>,
    'open' | 'onConfirm' | 'onCancel'
  >
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ButtonDefault onClick={() => setOpen(true)}>{props.label}</ButtonDefault>
      <ConfirmationDialog
        {...props.dialogProps}
        open={open}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}

export const Default: Story = {
  render: () => (
    <DialogDemo
      label="Open dialog"
      dialogProps={{
        title: 'Confirm action',
        message: 'Are you sure you want to proceed?',
        confirmLabel: 'Confirm',
        severity: 'default',
      }}
    />
  ),
}

export const Destructive: Story = {
  render: () => (
    <DialogDemo
      label="Open destructive dialog"
      dialogProps={{
        title: 'Remove integration',
        message: 'Are you sure you want to remove this integration?',
        confirmLabel: 'Remove',
        severity: 'destructive',
      }}
    />
  ),
}

export const WithWarning: Story = {
  render: () => (
    <DialogDemo
      label="Open with warning"
      dialogProps={{
        title: 'Archive schedule',
        message: 'Are you sure you want to archive this schedule?',
        warningMessage: 'This will also pause 4 dependent sub-schedules.',
        severity: 'destructive',
        confirmLabel: 'Archive',
      }}
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <DialogDemo
      label="Open with error"
      dialogProps={{
        title: 'Delete resource',
        message: 'Are you sure you want to delete this resource?',
        severity: 'destructive',
        confirmLabel: 'Delete',
        errorMessage: 'Failed to delete: resource is locked by another process.',
      }}
    />
  ),
}

export const Loading: Story = {
  render: () => (
    <DialogDemo
      label="Open loading dialog"
      dialogProps={{
        title: 'Remove integration',
        message: 'Are you sure you want to remove this integration?',
        confirmLabel: 'Remove',
        severity: 'destructive',
        loading: true,
      }}
    />
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleConfirm() {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setOpen(false)
      }, 1500)
    }

    return (
      <>
        <ButtonDefault onClick={() => setOpen(true)}>Open interactive demo</ButtonDefault>
        <ConfirmationDialog
          open={open}
          title="Confirm action"
          message="Are you sure you want to proceed with this action?"
          severity="default"
          confirmLabel="Confirm"
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      </>
    )
  },
}
