import React, { useState } from 'react'
import { Filter, Calendar, Building2, Search, ArrowUpDown, AlertCircle, CheckCircle2, User, Layers } from 'lucide-react'
import { Recruiter } from '../../types'
import { ProgressBar } from './ProgressBar'

interface RecruiterAnalyticsTableProps {
  recruiters: Recruiter[]
  title?: string
  subtitle?: string
}

export function RecruiterAnalyticsTable({
  recruiters,
  title = 'Recruiter-Wise Performance Analytics',
  subtitle = 'Comprehensive breakdown of requirements, interview stages (L1, L2, Custom, Final), weekly tasks, and client accounts',
}: RecruiterAnalyticsTableProps) {
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly' | 'Custom'>('Monthly')
  const [selectedClient, setSelectedClient] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Client options list (highlighting KPMG, Accenture, L&T, etc.)
  const CLIENT_OPTIONS = ['All', 'KPMG', 'Accenture', 'L&T', 'Goldman Sachs', 'Tesla', 'Microsoft']

  // Filter recruiters based on dropdown selections
  const filteredRecruiters = recruiters.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.admin.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesClient = selectedClient === 'All' || r.primaryClient === selectedClient
    const matchesStatus = selectedStatus === 'All' || r.taskStatus === selectedStatus
    const matchesType = selectedType === 'All' || r.submissionType === selectedType

    return matchesSearch && matchesClient && matchesStatus && matchesType
  })

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
      {/* Header & Filter Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" /> {title}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{subtitle}</p>
        </div>

        {/* Filter Dropdowns Strip */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-400">Period:</span>
            <select
              value={timeframe}
              onChange={e => setTimeframe(e.target.value as any)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none font-mono cursor-pointer"
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Custom">Custom Range</option>
            </select>
          </div>

          {/* Client Performance Filter Dropdown (KPMG, Accenture, L&T, etc.) */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-400">Client:</span>
            <select
              value={selectedClient}
              onChange={e => setSelectedClient(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none font-mono cursor-pointer"
            >
              {CLIENT_OPTIONS.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Clients' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Condition Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none font-mono cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="POSITIVE">🟢 POSITIVE (Task Met)</option>
              <option value="CRITICAL">🔴 CRITICAL (Lagging)</option>
            </select>
          </div>

          {/* Submission Type Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400">Sourcing:</span>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none font-mono cursor-pointer"
            >
              <option value="All">All Sourcing Types</option>
              <option value="Direct Sourcing">Direct Sourcing</option>
              <option value="LinkedIn Recruiter">LinkedIn Recruiter</option>
              <option value="Internal DB">Internal DB</option>
              <option value="Agency Portal">Agency Portal</option>
              <option value="Referral">Referral</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recruiter Wise Performance Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              <th className="py-3.5 px-4">Recruiter Info</th>
              <th className="py-3.5 px-4 text-center">Total Reqs</th>
              <th className="py-3.5 px-4 text-center">Total Subs</th>
              <th className="py-3.5 px-4">Interviews Stage Breakdown (L1 / L2 / Custom / Final)</th>
              <th className="py-3.5 px-4 w-44">Weekly Task & Progress</th>
              <th className="py-3.5 px-4 text-center">Task Status</th>
              <th className="py-3.5 px-4">Submission Sourcing Type</th>
              <th className="py-3.5 px-4">Primary Client Account</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRecruiters.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs font-mono text-slate-400">
                  No recruiter performance data found matching current filter criteria.
                </td>
              </tr>
            ) : (
              filteredRecruiters.map(r => {
                const totalInt = r.interviews || (r.l1Interviews + r.l2Interviews + r.customInterviews + r.finalInterviews)
                const isPositive = r.taskStatus === 'POSITIVE'

                return (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Recruiter Name & Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold font-mono shadow-xs ${
                            isPositive ? 'bg-indigo-600' : 'bg-rose-500'
                          }`}
                        >
                          {r.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 font-sans text-sm">{r.name}</p>
                          <p className="text-[10px] font-mono text-slate-400">
                            Lead: {r.lead} · Admin: {r.admin}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Total Requirements */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {r.requirementsCount || 4} Reqs
                      </span>
                    </td>

                    {/* Total Submissions */}
                    <td className="py-3.5 px-4 text-center">
                      <p className="text-sm font-bold font-mono text-blue-600">{r.submissions}</p>
                      <p className="text-[9px] font-mono text-slate-400">+{r.today} today</p>
                    </td>

                    {/* Total Interviews Breakdown (L1, L2, Custom, Final) */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-slate-900">{totalInt} Total Interviews</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1 font-mono text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold" title="Level 1 Technical">
                            L1: {r.l1Interviews}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold" title="Level 2 Technical">
                            L2: {r.l2Interviews}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold" title="Custom Client Round">
                            Custom: {r.customInterviews}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold" title="Final HR / Manager Round">
                            Final: {r.finalInterviews}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Daily Task & Weekly Progress */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-500">Weekly Quota</span>
                          <span className="font-bold text-slate-900">{r.weeklyProgress}%</span>
                        </div>
                        <ProgressBar
                          value={r.weeklyProgress}
                          max={100}
                          color={isPositive ? '#10B981' : '#F43F5E'}
                          height="h-2"
                        />
                      </div>
                    </td>

                    {/* Task Status Condition Badge (POSITIVE in Green vs CRITICAL in Red) */}
                    <td className="py-3.5 px-4 text-center">
                      {isPositive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> POSITIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold bg-rose-50 text-rose-700 border border-rose-300 shadow-2xs">
                          <AlertCircle className="w-3 h-3 text-rose-600" /> CRITICAL
                        </span>
                      )}
                    </td>

                    {/* Submission Sourcing Type */}
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold">
                        {r.submissionType}
                      </span>
                    </td>

                    {/* Primary Client Performance Account (KPMG, Accenture, L&T, etc.) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                        <div>
                          <p className="font-bold text-slate-900 font-sans text-xs">{r.primaryClient}</p>
                          <p className="text-[10px] font-mono text-emerald-600 font-semibold">
                            {r.placements} Placements
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Metadata */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
        <span>Showing {filteredRecruiters.length} recruiter metrics</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            🟢 POSITIVE: Task target condition met
          </span>
          <span className="flex items-center gap-1 text-rose-600 font-bold">
            🔴 CRITICAL: Below weekly target threshold
          </span>
        </div>
      </div>
    </div>
  )
}
