import React, { useState } from 'react'
import { X, Award } from 'lucide-react'
import { RecruiterAnalyticsCharts } from './recruiterAnalytics/RecruiterAnalyticsCharts'
import { RecruiterAnalyticsReqTable } from './recruiterAnalytics/RecruiterAnalyticsReqTable'

export interface RecruiterDetailData {
  id: string
  name: string
  role: string
  team: string
  avatar: string
  requirementsCount: number
  workedReqs: number
  nonWorkedReqs: number
  submissionsCount: number
  shortlistedCount: number
  noSubmissionsCount: number
  interviewsCount: number
  hiresCount: number
  conversionRate: string
  dailyTaskStatus: string
  weeklyProgress: string
  weeklyProgressPct: number
  status: 'On Track' | 'Warning' | 'Critical'
  requirementsList: {
    id: string
    title: string
    client: string
    status: 'Worked' | 'Non-Worked'
    submissions: number
    interviews: number
  }[]
}

interface RecruiterDetailAnalyticsModalProps {
  recruiter?: RecruiterDetailData | null
  data?: RecruiterDetailData | null
  onClose: () => void
}

export function RecruiterDetailAnalyticsModal({
  recruiter,
  data,
  onClose,
}: RecruiterDetailAnalyticsModalProps) {
  const targetRecruiter = recruiter || data
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'submissions'>('overview')

  if (!targetRecruiter) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl space-y-6 border border-slate-100 my-6 animate-in zoom-in-95 duration-150 font-sans text-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6B3BF6]/10 text-[#6B3BF6] font-extrabold flex items-center justify-center text-lg border border-[#6B3BF6]/20">
              {targetRecruiter.avatar || targetRecruiter.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{targetRecruiter.name}</h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    targetRecruiter.status === 'On Track'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : targetRecruiter.status === 'Warning'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  ● {targetRecruiter.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {targetRecruiter.role} • {targetRecruiter.team} • Detailed Performance Breakdown
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close analytics"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top KPI Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#5B51D8] uppercase tracking-wider block">Total Requirements</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">{targetRecruiter.requirementsCount}</span>
              <span className="text-[10px] text-slate-500">Assigned</span>
            </div>
            <div className="text-[10px] font-semibold text-blue-700 flex justify-between">
              <span>Worked: {targetRecruiter.workedReqs}</span>
              <span className="text-amber-700">Non-worked: {targetRecruiter.nonWorkedReqs}</span>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">Total Submissions</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">{targetRecruiter.submissionsCount}</span>
              <span className="text-[10px] text-purple-600 font-bold">Lifetime</span>
            </div>
            <div className="text-[10px] font-semibold text-purple-700 flex justify-between">
              <span>Shortlisted: {targetRecruiter.shortlistedCount}</span>
              <span className="text-slate-500">Pending: {targetRecruiter.noSubmissionsCount}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">Total Interviews</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">{targetRecruiter.interviewsCount || '—'}</span>
              <span className="text-[10px] text-blue-600">Conducted</span>
            </div>
            <div className="text-[10px] font-semibold text-blue-700">Conversion: {targetRecruiter.conversionRate}</div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Successful Hires</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">{targetRecruiter.hiresCount}</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-[10px] font-semibold text-emerald-700">Weekly Progress: {targetRecruiter.weeklyProgressPct}%</div>
          </div>
        </div>

        {/* Visual Charts & Graphs Grid */}
        <RecruiterAnalyticsCharts recruiter={targetRecruiter} />

        {/* Worked vs Non-Worked Requirements List */}
        <RecruiterAnalyticsReqTable recruiter={targetRecruiter} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Close Analytics
          </button>
        </div>
      </div>
    </div>
  )
}
