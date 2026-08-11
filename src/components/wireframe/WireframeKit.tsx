import React from 'react'
import { brand, cardThemeColors, kpiVariantKeys } from '../../theme'

export interface KpiItem {
  label: string
  value: string | number
  sub?: string
  highlight?: boolean
}

export function KpiGrid({ items, columns = 4 }: { items: KpiItem[]; columns?: 2 | 3 | 4 | 6 }) {
  const gridClass =
    columns === 6
      ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-6'
      : columns === 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : columns === 2
          ? 'grid-cols-2'
          : 'grid-cols-2 lg:grid-cols-4'

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {items.map((kpi, i) => {
        const variant = kpiVariantKeys[i % kpiVariantKeys.length]
        const theme = cardThemeColors[variant]
        return (
          <div
            key={i}
            className="rounded-2xl border p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md"
            style={{
              background: theme.bg,
              borderColor: theme.borderColor,
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">{kpi.label}</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tabular-nums">
                  {kpi.value}
                </p>
                {kpi.sub && <p className="text-xs text-slate-500 mt-1 font-medium">{kpi.sub}</p>}
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm shrink-0"
                style={{ background: theme.iconBg }}
              >
                <span className="text-xs font-bold">✓</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ChartBlock({ title, subtitle }: { title: string; subtitle?: string }) {
  const bars = [40, 65, 50, 80, 55, 70, 45]
  return (
    <div
      className="rounded-2xl border p-5 shadow-sm"
      style={{ background: brand.surface, borderColor: brand.border }}
    >
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      {subtitle && <p className="text-xs mt-0.5 mb-4 text-slate-500">{subtitle}</p>}
      <div className="flex items-end gap-2 h-28 pt-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="rounded-t w-full"
              style={{ height: `${h}%`, background: i === bars.length - 1 ? '#6B3BF6' : '#CBD5E1' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: (string | number)[][]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
            {columns.map(col => (
              <th key={col} className="text-left py-3 px-4 text-xs font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3.5 px-4 ${j === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Panel({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm"
      style={{ background: brand.surface, borderColor: brand.border }}
    >
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export function AiInsightBanner({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border px-5 py-4 text-sm flex items-start gap-3 bg-[#F4EFFE] border-[#E9D8FD]">
      <span className="font-semibold shrink-0 text-[#6B3BF6]">AI Insight</span>
      <span className="text-slate-600">{text}</span>
    </div>
  )
}

export function ActivityFeed({
  items,
}: {
  items: { time: string; user: string; action: string }[]
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm">
          <span className="text-xs shrink-0 w-16 text-slate-400">{item.time}</span>
          <span className="text-slate-900">
            <span className="font-medium">{item.user}</span>{' '}
            <span className="text-slate-600">{item.action}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export function QuickActions({ actions, onAction }: { actions: string[]; onAction?: (a: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map(a => (
        <button
          key={a}
          onClick={() => onAction?.(a)}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#6B3BF6] hover:bg-[#5833E0] transition-colors"
        >
          {a}
        </button>
      ))}
    </div>
  )
}

export function WorkflowStrip() {
  const steps = [
    'Client',
    'Requirement',
    'AI JD',
    'Assignment',
    'AI Match',
    'Source',
    'Duplicate Check',
    'Parse',
    'Lead Approval',
    'Submit',
    'Interview',
    'Offer',
    'Joining',
    'Billing',
  ]
  return (
    <div
      className="rounded-2xl border p-5 overflow-x-auto shadow-sm"
      style={{ background: brand.surface, borderColor: brand.border }}
    >
      <p className="text-xs font-semibold mb-3 text-slate-500 uppercase tracking-wider">
        Recruitment Lifecycle
      </p>
      <div className="flex items-center gap-1 min-w-max">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap bg-slate-100 text-slate-600">
              {step}
            </span>
            {i < steps.length - 1 && <span className="text-slate-400">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export function PriorityLegend() {
  const items = [
    { label: 'Critical', color: '#DC2626', bg: '#FEF2F2' },
    { label: 'High', color: '#D97706', bg: '#FFFBEB' },
    { label: 'Medium', color: '#6B3BF6', bg: '#F4EFFE' },
    { label: 'Low', color: '#64748B', bg: '#F1F5F9' },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(p => (
        <span
          key={p.label}
          className="text-xs font-medium px-2.5 py-0.5 rounded-lg"
          style={{ background: p.bg, color: p.color }}
        >
          {p.label}
        </span>
      ))}
    </div>
  )
}
