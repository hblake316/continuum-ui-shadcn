import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { AutocompleteTrigger, AutocompleteMenu, AutocompleteMenuItem } from './autocomplete'

const meta: Meta<typeof AutocompleteTrigger> = {
  title: 'Components/Autocomplete',
  component: AutocompleteTrigger,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof AutocompleteTrigger>

const ENVIRONMENTS = [
  'prod-us-east',
  'prod-us-west',
  'prod-eu-west',
  'prod-ap-south',
  'staging',
  'qa',
  'dev',
]

function AutocompleteDemo(props: { size?: 'lg' | 'md' | 'sm'; disabled?: boolean }) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const matches = useMemo(
    () => ENVIRONMENTS.filter((env) => env.toLowerCase().includes(value.toLowerCase())),
    [value]
  )

  return (
    <div className="w-[320px]">
      <AutocompleteTrigger
        size={props.size}
        disabled={props.disabled}
        label="Environment"
        value={value}
        placeholder="Search environments"
        open={open}
        onInputChange={(v) => {
          setValue(v)
          if (!open) setOpen(true)
        }}
        onClear={() => setValue('')}
        onToggle={() => setOpen((o) => !o)}
      />
      {open && (
        <div className="mt-1">
          <AutocompleteMenu>
            {matches.length === 0 ? (
              <div className="px-4 py-2 text-sm text-text-secondary">No matches</div>
            ) : (
              matches.map((env) => (
                <AutocompleteMenuItem
                  key={env}
                  selected={env === value}
                  onClick={() => {
                    setValue(env)
                    setOpen(false)
                  }}
                >
                  {env}
                </AutocompleteMenuItem>
              ))
            )}
          </AutocompleteMenu>
        </div>
      )}
    </div>
  )
}

export const Closed: Story = {
  args: { size: 'md', disabled: false },
  render: (args) => <AutocompleteDemo {...args} />,
}

export const Small: Story = {
  args: { size: 'sm', disabled: false },
  render: (args) => <AutocompleteDemo {...args} />,
}

export const Large: Story = {
  args: { size: 'lg', disabled: false },
  render: (args) => <AutocompleteDemo {...args} />,
}

export const Disabled: Story = {
  args: { size: 'md', disabled: true },
  render: (args) => <AutocompleteDemo {...args} />,
}
