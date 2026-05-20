import type { Meta, StoryObj } from '@storybook/react'

import { StatusIndicator, type StatusTone } from './status-indicator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right tabular-nums">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right tabular-nums">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right tabular-nums">$350.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const WithCaptionAndFooter: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right tabular-nums">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right tabular-nums">$150.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right tabular-nums">$400.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

interface EnvRow {
  id: string
  name: string
  environmentType: string
  status: 'active' | 'degraded' | 'offline'
  serviceCount: number
  healthyServiceCount: number
}

const ENV_ROWS: EnvRow[] = [
  {
    id: 'env-prod-us',
    name: 'prod-us-east',
    environmentType: 'PRODUCTION',
    status: 'active',
    serviceCount: 12,
    healthyServiceCount: 12,
  },
  {
    id: 'env-prod-eu',
    name: 'prod-eu-west',
    environmentType: 'PRODUCTION',
    status: 'degraded',
    serviceCount: 12,
    healthyServiceCount: 10,
  },
  {
    id: 'env-staging',
    name: 'staging',
    environmentType: 'STAGING',
    status: 'active',
    serviceCount: 8,
    healthyServiceCount: 8,
  },
  {
    id: 'env-qa',
    name: 'qa',
    environmentType: 'QA',
    status: 'offline',
    serviceCount: 4,
    healthyServiceCount: 0,
  },
]

const STATUS_TONE: Record<EnvRow['status'], StatusTone> = {
  active: 'success',
  degraded: 'warning',
  offline: 'error',
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export const EnvironmentsExample: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Healthy services</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ENV_ROWS.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.environmentType}</TableCell>
            <TableCell>
              <StatusIndicator tone={STATUS_TONE[row.status]}>
                {titleCase(row.status)}
              </StatusIndicator>
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {row.healthyServiceCount}/{row.serviceCount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody />
    </Table>
  ),
}
