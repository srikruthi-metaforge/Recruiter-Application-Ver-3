import React from 'react'
import { FileText, Search, ChevronDown } from 'lucide-react'

interface SubmissionsFilterBarProps {
  searchQuery: string
  setSearchQuery: (v: string) => void
  clientFilter: string
  setClientFilter: (v: string) => void
  clientOptions: string[]
  clientCounts: Record<string, number>
  dateFilter: string
  setDateFilter: (v: string) => void
  customStartDate: string
  setCustomStartDate: (v: string) => void
  customEndDate: string
  setCustomEndDate: (v: string) => void
  statusFilter: string
  setStatusFilter: (v: string) => void
  filteredCount: number
  totalScopeCount: number
}

export function SubmissionsFilterBar({
  searchQuery,
  setSearchQuery,
  clientFilter,
  setClientFilter,
  clientOptions,
  clientCounts,
  dateFilter,
  setDateFilter,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
  statusFilter,
  setStatusFilter,
  filteredCount,
  totalScopeCount,
}: SubmissionsFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center gap-3 justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, client, requirement..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-800 placeholder-slate-400 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center bg-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-purple-50 text-[#6B3BF6] border border-purple-200 text-xs font-extrabold flex items-center gap-2 shrink-0 shadow-2xs animate-in fade-in duration-150">
            <FileText className="w-3.5 h-3.5 text-[#6B3BF6]" />
            <span>
              {filteredCount} {clientFilter !== 'All' ? `Submissions (${clientFilter})` : 'Total Submissions'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-48">
            <select
              value={clientFilter}
              onChange={e => setClientFilter(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-bold cursor-pointer"
            >
              <option value="All">All Clients ({totalScopeCount})</option>
              {clientOptions.map(client => (
                <option key={client} value={client}>
                  Client: {client} ({clientCounts[client] || 0})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-44">
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-bold cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This week">This week</option>
              <option value="This month">This month</option>
              <option value="All">All Submissions</option>
              <option value="Custom range">Custom range...</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {dateFilter === 'Custom range' && (
            <div className="flex items-center gap-2 animate-in fade-in duration-150">
              <input
                type="date"
                value={customStartDate}
                onChange={e => setCustomStartDate(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#6B3BF6]"
              />
              <span className="text-xs text-slate-400 font-bold">to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={e => setCustomEndDate(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#6B3BF6]"
              />
              <button
                type="button"
                onClick={() => {
                  setCustomStartDate('')
                  setCustomEndDate('')
                  setDateFilter('All')
                }}
                className="px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Clear filter
              </button>
            </div>
          )}

          <div className="relative w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B3BF6]/20 focus:border-[#6B3BF6] text-slate-700 bg-white font-bold cursor-pointer"
            >
              <option value="All">All Candidate Statuses</option>
              <option value="Submitted to Lead">Submitted to Client / Lead</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Selected">Selected in Interview</option>
              <option value="Placed">Placed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
