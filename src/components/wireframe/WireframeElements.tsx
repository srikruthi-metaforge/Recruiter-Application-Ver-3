import React from 'react'

export function WireframeHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-slate-300 pb-3 mb-4">
      <h2 className="text-xl font-bold font-mono text-slate-800 tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs font-mono text-slate-500 mt-1">{subtitle}</p>}
    </div>
  )
}

export function WireframeCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50/50 space-y-2">
      <div className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">{title}</div>
      {children}
    </div>
  )
}

export function WireframeButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="px-3 py-1.5 border border-slate-400 bg-white hover:bg-slate-100 rounded-lg text-xs font-mono font-semibold text-slate-700 cursor-pointer transition-colors">
      [ {label} ]
    </button>
  )
}

export function KpiGrid({ items, columns = 4 }: { items: Array<{ label: string; value: React.ReactNode; highlight?: boolean }>; columns?: number }) {
  const colClass = columns === 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' : 'grid-cols-2 sm:grid-cols-4'
  return (
    <div className={`grid ${colClass} gap-3 font-sans`}>
      {items.map((item, idx) => (
        <div key={idx} className={`p-3.5 rounded-2xl border ${item.highlight ? 'bg-[#EEF2FF] border-[#C7D2FE]' : 'bg-white border-slate-200'} shadow-2xs space-y-1`}>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{item.label}</span>
          <div className="text-xl font-extrabold text-slate-900 tabular-nums">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-3 font-sans">
      <h3 className="text-sm font-extrabold text-slate-900 tracking-tight border-b border-slate-100 pb-2">{title}</h3>
      {children}
    </div>
  )
}

export function DataTable({ columns, rows }: { columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto border border-slate-200 rounded-2xl font-sans">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase">
            {columns.map((c, idx) => <th key={idx} className="py-2.5 px-3">{c}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50/50">
              {row.map((cell, cIdx) => <td key={cIdx} className="py-2.5 px-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function QuickActions({ actions }: { actions: Array<string | { label: string; onClick?: () => void }> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-sans">
      {actions.map((act, idx) => {
        const label = typeof act === 'string' ? act : act.label
        const onClick = typeof act === 'string' ? undefined : act.onClick
        return (
          <button
            key={idx}
            type="button"
            onClick={onClick}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export function AiInsightBanner({ text }: { text: string }) {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-4 rounded-2xl shadow-md border border-purple-500/30 flex items-center gap-3 font-sans text-xs">
      <span className="px-2 py-0.5 rounded bg-purple-500 text-white text-[10px] font-black uppercase shrink-0">AI Insight</span>
      <span className="font-semibold text-purple-100">{text}</span>
    </div>
  )
}

export function ActivityFeed({ items }: { items: Array<{ time: string; user: string; action: string }> }) {
  return (
    <div className="space-y-2 text-xs font-sans">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
          <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.time}</span>
          <span className="font-bold text-slate-800">{item.user}</span>
          <span className="text-slate-600">{item.action}</span>
        </div>
      ))}
    </div>
  )
}

export function WorkflowStrip() {
  return (
    <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 flex items-center justify-between text-xs text-slate-600 font-medium font-sans">
      <span>System Automation Active • Real-time Pipeline Processing</span>
      <span className="text-emerald-700 font-bold">● Active Sync</span>
    </div>
  )
}

export function ChartBlock({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-3 font-sans">
      <div>
        <h4 className="text-xs font-extrabold text-slate-800 tracking-tight">{title}</h4>
        {subtitle && <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
