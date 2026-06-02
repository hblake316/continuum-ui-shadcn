import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdHistory, MdSchedule, MdSettings } from 'react-icons/md'

import { Tab, TabList, TabPanel } from './tabs'

const meta: Meta<typeof TabList> = {
  title: 'Navigation/Tabs',
  component: TabList,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=17761-3994&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `In-page horizontal navigation between sibling views. For top-level app routes use the sidebar; for short binary mode toggles use \`SegmentedControl\`. \`TabPanel\` renders conditionally based on which \`Tab\` is \`selected\`.`,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabList>

export const TextOnly: Story = {
  render: function TextOnlyStory() {
    const [active, setActive] = useState('overview')
    return (
      <div className="w-[520px]">
        <TabList>
          <Tab selected={active === 'overview'} onClick={() => setActive('overview')}>
            Overview
          </Tab>
          <Tab selected={active === 'schedules'} onClick={() => setActive('schedules')}>
            Schedules
          </Tab>
          <Tab selected={active === 'history'} onClick={() => setActive('history')}>
            History
          </Tab>
        </TabList>
        <TabPanel selected={active === 'overview'}>
          <p className="text-sm text-text-primary">Overview panel content.</p>
        </TabPanel>
        <TabPanel selected={active === 'schedules'}>
          <p className="text-sm text-text-primary">Schedules panel content.</p>
        </TabPanel>
        <TabPanel selected={active === 'history'}>
          <p className="text-sm text-text-primary">History panel content.</p>
        </TabPanel>
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: function WithIconsStory() {
    const [active, setActive] = useState('schedules')
    return (
      <div className="w-[520px]">
        <TabList>
          <Tab
            selected={active === 'schedules'}
            onClick={() => setActive('schedules')}
            icon={<MdSchedule size={16} />}
          >
            Schedules
          </Tab>
          <Tab
            selected={active === 'history'}
            onClick={() => setActive('history')}
            icon={<MdHistory size={16} />}
          >
            History
          </Tab>
          <Tab
            selected={active === 'settings'}
            onClick={() => setActive('settings')}
            icon={<MdSettings size={16} />}
          >
            Settings
          </Tab>
        </TabList>
      </div>
    )
  },
}

export const WithDisabled: Story = {
  render: function DisabledStory() {
    const [active, setActive] = useState('a')
    return (
      <div className="w-[520px]">
        <TabList>
          <Tab selected={active === 'a'} onClick={() => setActive('a')}>
            Active
          </Tab>
          <Tab selected={active === 'b'} onClick={() => setActive('b')}>
            Inactive
          </Tab>
          <Tab disabled>Disabled</Tab>
        </TabList>
      </div>
    )
  },
}
