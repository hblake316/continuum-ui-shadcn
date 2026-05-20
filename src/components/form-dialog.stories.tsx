import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { FormDialog } from './form-dialog'
import { Button } from './button'
import { TextField } from './text-field'

const meta: Meta<typeof FormDialog> = {
  title: 'Dialogs/FormDialog',
  component: FormDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dialog with confirm and cancel actions and a free-form body slot. ' +
          'Use this when the dialog body needs custom content such as a form or ' +
          'interactive elements. For simple text-only confirmations, prefer ' +
          'ConfirmationDialog. Click "Open dialog" in the examples below to see ' +
          'each variant.',
      },
    },
  },
  argTypes: {
    severity: { control: 'radio', options: ['default', 'destructive'] },
    size: { control: 'radio', options: ['narrow', 'wide', 'x-wide'] },
  },
}

export default meta
type Story = StoryObj<typeof FormDialog>

function DialogDemo(props: {
  label: string
  dialogProps: Omit<React.ComponentProps<typeof FormDialog>, 'open' | 'onConfirm' | 'onCancel'>
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{props.label}</Button>
      <FormDialog
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
        title: 'Save changes',
        confirmLabel: 'Save',
        severity: 'default',
        size: 'narrow',
        children: (
          <p className="text-sm text-text-primary">Your unsaved changes will be applied.</p>
        ),
      }}
    />
  ),
}

export const Destructive: Story = {
  render: () => (
    <DialogDemo
      label="Open destructive dialog"
      dialogProps={{
        title: 'Delete schedule',
        confirmLabel: 'Delete',
        severity: 'destructive',
        children: (
          <p className="text-sm text-text-primary">
            This will permanently remove the schedule and all associated runs.
          </p>
        ),
      }}
    />
  ),
}

export const Wide: Story = {
  render: () => (
    <DialogDemo
      label="Open wide dialog"
      dialogProps={{
        title: 'Configure integration',
        confirmLabel: 'Save',
        size: 'wide',
        children: (
          <div className="flex flex-col gap-4">
            <TextField label="Name" placeholder="Enter integration name" />
            <TextField label="Endpoint URL" placeholder="https://..." />
          </div>
        ),
      }}
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <DialogDemo
      label="Open with error"
      dialogProps={{
        title: 'Create resource',
        confirmLabel: 'Create',
        errorMessage: 'A resource with this name already exists.',
        children: <TextField label="Resource name" placeholder="Enter a unique name" />,
      }}
    />
  ),
}

export const Loading: Story = {
  render: () => (
    <DialogDemo
      label="Open loading dialog"
      dialogProps={{
        title: 'Save changes',
        confirmLabel: 'Save',
        loading: true,
        children: <p className="text-sm text-text-primary">Saving your changes...</p>,
      }}
    />
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()

    function handleConfirm() {
      setError(undefined)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setOpen(false)
      }, 1500)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open interactive demo</Button>
        <FormDialog
          open={open}
          title="Add new environment"
          confirmLabel="Create"
          loading={loading}
          errorMessage={error}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <TextField label="Environment name" placeholder="e.g. production" />
            <TextField label="Description" placeholder="Optional description" />
          </div>
        </FormDialog>
      </>
    )
  },
}
