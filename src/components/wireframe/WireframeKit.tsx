import React from 'react'
import { brand } from '../../theme'

export interface KpiItem {
  label: string
  value: string | number
  sub?: string
  highlight?: boolean
}

const KPI_COLOR_VARIANTS = [
  { bg: '#F4EFFE', borderColor: '#E9D8FD', iconBg: '#8B5CF6' }, // purple
  { bg: '#E6F8F0', borderColor: '#A7F3D0', iconBg: '#00BA7C' }, // mint/green
  { bg: '#FDE8EC', borderColor: '#FECDD3', iconBg: '#FF3B68' }, // rose/red
  { bg: '#EBF3FF', borderColor: '#BFDBFE', iconBg: '#2F80ED' }, // blue
  { bg: '#FFF8E7', borderColor: '#FDE68A', iconBg: '#F2994A' }, // amber/orange
  { bg: '#EEF2FF', borderColor: '#C7D2FE', iconBg: '#5B51D8' }, // indigo
]

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
    <div className={`grid ${gridClass} gap-3.5`}>
      {items.map((kpi, i) => {
        const theme = KPI_COLOR_VARIANTS[i % KPI_COLOR_VARIANTS.length]
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
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {kpi.label}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tabular-nums">
                  {kpi.value}
                </p>
                {kpi.sub && (
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {kpi.sub}
                  </p>
                )}
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
      className="rounded-lg border p-4"
      style={{ background: brand.surface, borderColor: brand.border }}
    >
      <p className="text-sm font-semibold" style={{ color: brand.text }}>
        {title}
      </p>
      {subtitle && (
        <p className="text-xs mt-0.5 mb-4" style={{ color: brand.textMuted }}>
          {subtitle}
        </p>
      )}
      <div className="flex items-end gap-2 h-28 pt-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="rounded-t w-full"
              style={{ height: `${h}%`, background: i === bars.length - 1 ? brand.primary : '#CBD5E1' }}
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
          <tr style={{ background: brand.background, color: brand.textMuted }}>
            {columns.map(col => (
              <th key={col} className="text-left py-2.5 px-4 text-xs font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t" style={{ borderColor: brand.borderLight }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 px-4 ${j === 0 ? 'font-medium' : ''}`}
                  style={{ color: j === 0 ? brand.text : brand.textSecondary }}
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
    <div className="rounded-lg border overflow-hidden" style={{ background: brand.surface, borderColor: brand.border }}>
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: brand.borderLight }}
      >
        <h3 className="text-sm font-semibold" style={{ color: brand.text }}>
          {title}
        </h3>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export function AiInsightBanner({ text }: { text: string }) {
  return (
    <div
      className="rounded-lg border px-4 py-3 text-sm flex items-start gap-3"
      style={{ background: brand.primaryLight, borderColor: '#BFDBFE', color: brand.text }}
    >
      <span className="font-semibold shrink-0" style={{ color: brand.primary }}>
        AI Insight
      </span>
      <span style={{ color: brand.textSecondary }}>{text}</span>
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
          <span className="text-xs shrink-0 w-16" style={{ color: brand.textMuted }}>
            {item.time}
          </span>
          <span style={{ color: brand.text }}>
            <span className="font-medium">{item.user}</span>{' '}
            <span style={{ color: brand.textSecondary }}>{item.action}</span>
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
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
          style={{ background: brand.primary }}
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
      className="rounded-lg border p-4 overflow-x-auto"
      style={{ background: brand.surface, borderColor: brand.border }}
    >
      <p className="text-xs font-medium mb-3" style={{ color: brand.textMuted }}>
        Recruitment Lifecycle
      </p>
      <div className="flex items-center gap-1 min-w-max">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <span
              className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
              style={{ background: brand.background, color: brand.textSecondary }}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <span style={{ color: brand.textMuted }}>→</span>
            )}
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
    { label: 'Medium', color: '#2563EB', bg: '#EBF1FF' },
    { label: 'Low', color: '#6B7280', bg: '#F3F4F6' },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(p => (
        <span
          key={p.label}
          className="text-xs font-medium px-2 py-0.5 rounded"
          style={{ background: p.bg, color: p.color }}
        >
          {p.label}
        </span>
      ))}
    </div>
  )
}
