import React, { useState } from 'react'
import {
  ArrowLeft,
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Briefcase,
  FileText,
  Check,
  AlertTriangle,
  ArrowUpRight,
  Download,
  Calendar,
  Zap,
  Filter,
  MessageSquare,
  Plus,
  Edit2,
} from 'lucide-react'

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
    reasonNote?: string
  }[]
}

interface RecruiterDetailAnalyticsPageProps {
  recruiter: RecruiterDetailData
  onBack: () => void
}

export function RecruiterDetailAnalyticsPage({
  recruiter: initialRecruiter,
  onBack,
}: RecruiterDetailAnalyticsPageProps) {
  const [recruiter, setRecruiter] = useState<RecruiterDetailData>(initialRecruiter)
  const [activeTab, setActiveTab] = useState<'requirements' | 'submissions'>('requirements')
  const [dateFilter, setDateFilter] = useState<'today' | 'this_week' | 'this_month' | 'custom'>('this_month')
  const [startDate, setStartDate] = useState('2026-08-01')
  const [endDate, setEndDate] = useState('2026-08-11')

  // Reason Modal State
  const [selectedReqForReason, setSelectedReqForReason] = useState<{ id: string; title: string; currentReason?: string } | null>(null)
  const [reasonText, setReasonText] = useState('')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleOpenReasonModal = (req: { id: string; title: string; reasonNote?: string }) => {
    setSelectedReqForReason({ id: req.id, title: req.title, currentReason: req.reasonNote })
    setReasonText(req.reasonNote || '')
  }

  const handleSaveReasonNote = () => {
    if (!selectedReqForReason) return
    const updatedList = recruiter.requirementsList.map(item =>
      item.id === selectedReqForReason.id ? { ...item, reasonNote: reasonText.trim() } : item
    )
    setRecruiter({ ...recruiter, requirementsList: updatedList })
    showToast(`Saved non-submission reason for ${selectedReqForReason.id}!`)
    setSelectedReqForReason(null)
    setReasonText('')
  }

  const PRESET_REASONS = [
    'Client JD requirements unclear / pending clarification',
    'Candidate salary expectation exceeds client budget',
    'Location constraint / No local candidates available',
    'Requirement put on hold by hiring manager',
    'Niche skill set requiring extended sourcing timeline',
  ]

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      {/* 1. TOP NAVIGATION & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="space-y-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Recruiter Reports</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6B3BF6]/10 text-[#6B3BF6] font-extrabold flex items-center justify-center text-lg border border-[#6B3BF6]/20 shrink-0">
              {recruiter.avatar || recruiter.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {recruiter.name}
                </h1>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-bold ${
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
                Role: <strong className="text-slate-700">{recruiter.role}</strong> • Team: <strong className="text-slate-700">{recruiter.team}</strong> • Recruiter Performance Analytics Page
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast(`Exporting ${recruiter.name} Detailed Performance Report...`)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Export Recruiter CSV</span>
          </button>
        </div>
      </div>

      {/* 2. TOP SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider">
              Assigned Requirements
            </span>
            <Briefcase className="w-4 h-4 text-[#5B51D8]" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {recruiter.requirementsCount}
          </p>
          <div className="text-xs font-semibold flex items-center justify-between pt-1 border-t border-[#C7D2FE]/60">
            <span className="text-blue-700">Worked: {recruiter.workedReqs}</span>
            <span className="text-amber-700">Non-worked: {recruiter.nonWorkedReqs}</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">
              Total Submissions
            </span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {recruiter.submissionsCount}
          </p>
          <div className="text-xs font-semibold flex items-center justify-between pt-1 border-t border-purple-200/60">
            <span className="text-purple-700">Shortlisted: {recruiter.shortlistedCount}</span>
            <span className="text-slate-500">Pending: {recruiter.noSubmissionsCount}</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
              Total Interviews
            </span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {recruiter.interviewsCount || '—'}
          </p>
          <div className="text-xs font-semibold text-blue-700 pt-1 border-t border-blue-200/60">
            Conversion Rate: {recruiter.conversionRate}
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Successful Hires
            </span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {recruiter.hiresCount}
          </p>
          <div className="text-xs font-semibold text-emerald-700 pt-1 border-t border-emerald-200/60">
            Weekly Target Progress: {recruiter.weeklyProgressPct}%
          </div>
        </div>
      </div>

      {/* 3. WORKED VS NON-WORKED REQUIREMENTS FULL LIST TABLE WITH NON-SUBMISSION REASON NOTES */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4.5 h-4.5 text-[#6B3BF6]" />
              <span>Assigned Requirements Breakdown ({recruiter.requirementsList.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Detailed list of requirements worked vs non-worked by {recruiter.name} with non-submission reasons
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Filter Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value as any)}
                className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer shadow-2xs"
              >
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>

              {dateFilter === 'custom' && (
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-xs shadow-2xs">
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2 py-0.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                  <span className="text-slate-400 font-bold">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2 py-0.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>
              )}
            </div>

            {/* Worked / Non-Worked Tabs (Worked is active by default) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('requirements')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'requirements' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Worked ({recruiter.workedReqs})
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'submissions' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Non-Worked ({recruiter.nonWorkedReqs})
              </button>
            </div>
          </div>
        </div>

        <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">REQUIREMENT TITLE & ID</th>
                <th className="py-3.5 px-4">CLIENT</th>
                <th className="py-3.5 px-4">WORKED STATUS</th>
                <th className="py-3.5 px-4">NON-SUBMISSION REASON / NOTE</th>
                <th className="py-3.5 px-4 text-center">SUBMISSIONS</th>
                <th className="py-3.5 px-4 text-center">INTERVIEWS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {recruiter.requirementsList
                .filter(r => {
                  if (activeTab === 'requirements') return r.status === 'Worked'
                  if (activeTab === 'submissions') return r.status === 'Non-Worked'
                  return true
                })
                .map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{r.title}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{r.id}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{r.client}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          r.status === 'Worked'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {r.status === 'Worked' ? '✓ Worked' : '⚠️ Non-Worked'}
                      </span>
                    </td>

                    {/* Non-submission Reason / Note Space */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {r.reasonNote ? (
                        <div className="flex items-start gap-1.5 bg-amber-50/80 border border-amber-200/80 p-2 rounded-xl text-[11px] text-amber-900">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="flex-1 font-medium leading-tight">{r.reasonNote}</span>
                          <button
                            onClick={() => handleOpenReasonModal(r)}
                            className="text-amber-700 hover:text-amber-900 font-bold p-0.5 rounded cursor-pointer"
                            title="Edit Reason Note"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenReasonModal(r)}
                          className="px-3 py-1.5 bg-[#6B3BF6]/10 text-[#6B3BF6] hover:bg-[#6B3BF6]/20 font-bold rounded-xl text-[11px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Reason Note</span>
                        </button>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-purple-700">
                      {r.submissions}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {r.interviews}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. ADD NON-SUBMISSION REASON NOTE MODAL */}
      {selectedReqForReason && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Non-Submission Reason Note</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {selectedReqForReason.id} • {selectedReqForReason.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedReqForReason(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Quick Presets (1-Click Selection)</label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_REASONS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setReasonText(preset)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-purple-100 hover:text-[#6B3BF6] text-slate-700 text-[11px] font-medium rounded-lg border border-slate-200 transition-all text-left cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Custom Reason / Notes *</label>
                <textarea
                  rows={3}
                  placeholder="Explain why candidates have not been submitted for this requirement yet..."
                  value={reasonText}
                  onChange={e => setReasonText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6B3BF6] focus:bg-white transition-all text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedReqForReason(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveReasonNote}
                className="px-5 py-2 text-xs font-bold bg-[#6B3BF6] text-white rounded-xl hover:bg-[#5833E0] shadow-xs cursor-pointer active:scale-98"
              >
                Save Reason Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
