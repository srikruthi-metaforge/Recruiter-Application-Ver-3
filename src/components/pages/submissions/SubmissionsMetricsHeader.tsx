import React from 'react'
import { FileText, UserCheck, Send, Clock, Plus } from 'lucide-react'
import { PageHeader } from '../../layout/PageHeader'
import { SubmissionsFilterBar } from './SubmissionsFilterBar'

interface Props {
  totalSubmissionsCount: number
  submittedToClientCount: number
  interviewsCount: number
  rejectedCount: number
  onOpenSubmitCandidate?: (reqId?: string) => void
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

export function SubmissionsMetricsHeader({
  totalSubmissionsCount,
  submittedToClientCount,
  interviewsCount,
  rejectedCount,
  onOpenSubmitCandidate,
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
}: Props) {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Total Submissions Overview"
          subtitle="Comprehensive tracking of candidate submissions, client partner delivery, and stage movements."
        />
        <div className="flex items-center gap-2">
          {onOpenSubmitCandidate && (
            <button
              onClick={() => onOpenSubmitCandidate()}
              className="h-10 px-4 rounded-xl bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold shadow-md shadow-purple-200 transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Candidate</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Submissions</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">{totalSubmissionsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Recorded in active database</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Submitted to Client</span>
            <Send className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#5B51D8] font-mono">{submittedToClientCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Sent for client evaluation</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Interviews Scheduled</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">{interviewsCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">Active in interview rounds</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rejected Candidates</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 font-mono">{rejectedCount}</div>
          <p className="text-[11px] text-slate-500 font-medium">With detailed feedback reasons</p>
        </div>
      </div>

      <SubmissionsFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clientFilter={clientFilter}
        setClientFilter={setClientFilter}
        clientOptions={clientOptions}
        clientCounts={clientCounts}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}
        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredCount={filteredCount}
        totalScopeCount={totalScopeCount}
      />
    </>
  )
}
