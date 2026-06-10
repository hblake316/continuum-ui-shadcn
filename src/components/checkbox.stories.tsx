import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6543-43052&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Boolean or tri-state selection control.

For mutually-exclusive options use \`RadioGroup\`; for on/off toggles use \`Switch\`.

- **color**: \`primary\` (default) · \`secondary\` (neutral) · \`invalid\` (validation error).
- For the **invalid state**, set \`color="invalid"\` together with \`aria-invalid\` so assistive technology is notified.
- Set \`checked="indeterminate"\` for parent-of-mixed-children rows (e.g. a "Select all" header in a table).
- Use the built-in \`label\` prop for standalone usage. For form fields with a description line, wrap with a \`<div>\` and compose the description yourself until a \`Field\` component system is added to the library.`,
      },
    },
  },
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'invalid'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Basic: Story = {
  args: { label: 'Accept terms and conditions' },
}

export const Checked: Story = {
  args: { label: 'Accept terms and conditions', checked: true },
}

export const Indeterminate: Story = {
  args: { label: 'Select all', checked: 'indeterminate' },
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox label="Unchecked" disabled />
      <Checkbox label="Checked" disabled checked />
      <Checkbox label="Indeterminate" disabled checked="indeterminate" />
    </div>
  ),
}

export const InvalidState: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Set `color="invalid"` on the checkbox and pass `aria-invalid` so screen readers announce the error. Typically paired with a visible error message below the field.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox color="invalid" label="Accept terms and conditions" aria-invalid />
      <Checkbox color="invalid" label="Accept terms and conditions" aria-invalid checked />
      <Checkbox
        color="invalid"
        label="Accept terms and conditions"
        aria-invalid
        checked="indeterminate"
      />
    </div>
  ),
}

export const Group: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Use multiple checkboxes inside a `fieldset` to build a selection list. Pair with a legend and optional description for full accessibility context.',
      },
    },
  },
  render: function GroupStory() {
    const [selected, setSelected] = useState<Record<string, boolean>>({
      'Hard disks': true,
      'External disks': true,
      'CDs, DVDs, and iPods': false,
      'Connected servers': false,
    })

    return (
      <fieldset className="flex flex-col gap-1 border-0 p-0">
        <legend className="mb-0.5 text-sm font-medium text-text-primary">
          Show these items on the desktop:
        </legend>
        <p className="mb-2 text-xs text-text-secondary">
          Select the items you want to show on the desktop.
        </p>
        {Object.entries(selected).map(([item, isChecked]) => (
          <Checkbox
            key={item}
            label={item}
            checked={isChecked}
            onCheckedChange={() => setSelected((prev) => ({ ...prev, [item]: !prev[item] }))}
          />
        ))}
      </fieldset>
    )
  },
}

export const InTable: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Checkboxes used inside a data table. The header row uses `checked="indeterminate"` when only some rows are selected.',
      },
    },
  },
  render: function TableStory() {
    const rows = [
      { id: '1', name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Admin' },
      { id: '2', name: 'Marcus Rodriguez', email: 'marcus.rodriguez@example.com', role: 'User' },
      { id: '3', name: 'Priya Patel', email: 'priya.patel@example.com', role: 'User' },
      { id: '4', name: 'David Kim', email: 'david.kim@example.com', role: 'Editor' },
    ]
    const [selected, setSelected] = useState<Set<string>>(new Set(['1']))

    const allSelected = selected.size === rows.length
    const someSelected = selected.size > 0 && !allSelected

    const toggleAll = () => {
      setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))
    }

    const toggleRow = (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }

    return (
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-divider text-left text-text-secondary">
            <th className="pb-2 pr-4">
              <Checkbox
                checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                onCheckedChange={toggleAll}
                aria-label="Select all rows"
              />
            </th>
            <th className="pb-2 pr-8 font-medium">Name</th>
            <th className="pb-2 pr-8 font-medium">Email</th>
            <th className="pb-2 font-medium">Role</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-divider last:border-0"
              data-selected={selected.has(row.id) || undefined}
            >
              <td className="py-2 pr-4">
                <Checkbox
                  checked={selected.has(row.id)}
                  onCheckedChange={() => toggleRow(row.id)}
                  aria-label={`Select ${row.name}`}
                />
              </td>
              <td className="py-2 pr-8 font-medium text-text-primary">{row.name}</td>
              <td className="py-2 pr-8 text-text-secondary">{row.email}</td>
              <td className="py-2 text-text-secondary">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox color="primary" label="Primary" checked />
      <Checkbox color="secondary" label="Secondary" checked />
      <Checkbox color="invalid" label="Invalid" checked />
    </div>
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label="Click me"
        checked={checked}
        onCheckedChange={(c) => setChecked(c === true)}
      />
    )
  },
}
