import React, { useState } from 'react'
import { X, Award, CheckCircle2, AlertCircle, BarChart3, TrendingUp, Users, Clock, Briefcase, FileText, Check, AlertTriangle, ArrowUpRight } from 'lucide-react'

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
  recruiter: RecruiterDetailData | null
  onClose: () => void
}

export function RecruiterDetailAnalyticsModal({
  recruiter,
  onClose,
}: RecruiterDetailAnalyticsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'submissions'>('overview')

  if (!recruiter) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl space-y-6 border border-slate-100 my-6 animate-in zoom-in-95 duration-150 font-sans text-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6B3BF6]/10 text-[#6B3BF6] font-extrabold flex items-center justify-center text-lg border border-[#6B3BF6]/20">
              {recruiter.avatar || recruiter.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {recruiter.name}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    recruiter.status === 'On Track'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : recruiter.status === 'Warning'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  ● {recruiter.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {recruiter.role} • {recruiter.team} • Detailed Performance Breakdown
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
            <span className="text-[10px] font-bold text-[#5B51D8] uppercase tracking-wider block">
              Total Requirements
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {recruiter.requirementsCount}
              </span>
              <span className="text-[10px] text-slate-500">Assigned</span>
            </div>
            <div className="text-[10px] font-semibold text-blue-700 flex justify-between">
              <span>Worked: {recruiter.workedReqs}</span>
              <span className="text-amber-700">Non-worked: {recruiter.nonWorkedReqs}</span>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
              Total Submissions
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {recruiter.submissionsCount}
              </span>
              <span className="text-[10px] text-purple-600 font-bold">Lifetime</span>
            </div>
            <div className="text-[10px] font-semibold text-purple-700 flex justify-between">
              <span>Shortlisted: {recruiter.shortlistedCount}</span>
              <span className="text-slate-500">Pending: {recruiter.noSubmissionsCount}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
              Total Interviews
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {recruiter.interviewsCount || '—'}
              </span>
              <span className="text-[10px] text-blue-600">Conducted</span>
            </div>
            <div className="text-[10px] font-semibold text-blue-700">
              Conversion: {recruiter.conversionRate}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              Successful Hires
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {recruiter.hiresCount}
              </span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-[10px] font-semibold text-emerald-700">
              Weekly Progress: {recruiter.weeklyProgressPct}%
            </div>
          </div>
        </div>

        {/* Visual Charts & Graphs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Graph 1: Requirements Worked vs Non-Worked */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#6B3BF6]" />
                <span>Requirements Worked vs Non-Worked</span>
              </h4>
              <span className="text-[10px] font-bold text-slate-500">
                {Math.round((recruiter.workedReqs / (recruiter.requirementsCount || 1)) * 100)}% Activity
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6B3BF6]" />
                    <span>Worked Requirements ({recruiter.workedReqs})</span>
                  </span>
                  <span className="tabular-nums font-bold">
                    {Math.round((recruiter.workedReqs / (recruiter.requirementsCount || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6B3BF6] rounded-full"
                    style={{
                      width: `${(recruiter.workedReqs / (recruiter.requirementsCount || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Non-Worked Requirements ({recruiter.nonWorkedReqs})</span>
                  </span>
                  <span className="tabular-nums font-bold text-amber-700">
                    {Math.round((recruiter.nonWorkedReqs / (recruiter.requirementsCount || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${(recruiter.nonWorkedReqs / (recruiter.requirementsCount || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Graph 2: Submissions Funnel & Shortlist Ratio */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Submissions & Shortlist Breakdown</span>
              </h4>
              <span className="text-[10px] font-bold text-emerald-700">
                {recruiter.shortlistedCount} Shortlisted
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <span>Total Submissions ({recruiter.submissionsCount})</span>
                  </span>
                  <span className="tabular-nums font-bold">100%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Shortlisted / Approved ({recruiter.shortlistedCount})</span>
                  </span>
                  <span className="tabular-nums font-bold text-emerald-700">
                    {Math.round((recruiter.shortlistedCount / (recruiter.submissionsCount || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${(recruiter.shortlistedCount / (recruiter.submissionsCount || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Worked vs Non-Worked Requirements List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-600" />
              <span>Assigned Requirements Activity ({recruiter.requirementsList.length})</span>
            </h4>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'overview' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                All ({recruiter.requirementsList.length})
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'requirements' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Worked ({recruiter.workedReqs})
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'submissions' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Non-Worked ({recruiter.nonWorkedReqs})
              </button>
            </div>
          </div>

          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <div className="max-h-48 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">REQUIREMENT</th>
                    <th className="py-2.5 px-3">CLIENT</th>
                    <th className="py-2.5 px-3">WORKED STATUS</th>
                    <th className="py-2.5 px-3 text-center">SUBMISSIONS</th>
                    <th className="py-2.5 px-3 text-center">INTERVIEWS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {recruiter.requirementsList
                    .filter(r => {
                      if (activeTab === 'requirements') return r.status === 'Worked'
                      if (activeTab === 'submissions') return r.status === 'Non-Worked'
                      return true
                    })
                    .map(r => (
                      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {r.title}
                          <span className="text-[10px] text-slate-400 block font-normal">{r.id}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{r.client}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              r.status === 'Worked'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {r.status === 'Worked' ? '✓ Worked' : '⚠️ Non-Worked'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-purple-700">
                          {r.submissions}
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                          {r.interviews}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

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
