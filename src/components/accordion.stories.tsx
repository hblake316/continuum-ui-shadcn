import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6583-46084&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Vertically stacked collapsible sections (e.g. settings groups, FAQs). Each \`AccordionItem\` has a trigger and content slot.`,
      },
    },
  },
  argTypes: {
    type: { control: 'radio', options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  args: { type: 'single', collapsible: true, defaultValue: 'item-1' },
  render: (args) => (
    <Accordion {...args} className="w-[480px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is OpCon?</AccordionTrigger>
        <AccordionContent>
          A workflow automation platform for orchestrating cross-system jobs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How are schedules triggered?</AccordionTrigger>
        <AccordionContent>
          Schedules fire on a cron expression, on an event, or manually from the runtime UI.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I version a workflow?</AccordionTrigger>
        <AccordionContent>
          Yes — every save creates a revision, and you can promote any revision back to active.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['item-1', 'item-2'] },
  render: (args) => (
    <Accordion {...args} className="w-[480px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Production</AccordionTrigger>
        <AccordionContent>12 healthy services, last deploy 2 hours ago.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Staging</AccordionTrigger>
        <AccordionContent>8 healthy services, last deploy 24 minutes ago.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>QA</AccordionTrigger>
        <AccordionContent>0 healthy services — environment is offline.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithDisabledItem: Story = {
  args: { type: 'single', collapsible: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Accordion {...args} className="w-[480px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Production</AccordionTrigger>
        <AccordionContent>12 healthy services.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Restricted (disabled)</AccordionTrigger>
        <AccordionContent>You don't have access to this section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Staging</AccordionTrigger>
        <AccordionContent>8 healthy services.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
