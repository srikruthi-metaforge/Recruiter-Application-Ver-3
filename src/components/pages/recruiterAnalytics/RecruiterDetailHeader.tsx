import React from 'react'
import { ArrowLeft, Award, Briefcase, FileText, Calendar, Download } from 'lucide-react'
import { RecruiterDetailData } from '../RecruiterDetailAnalyticsPage'

interface RecruiterDetailHeaderProps {
  recruiter: RecruiterDetailData
  onBack: () => void
  userRole?: string
  showToast: (msg: string) => void
}

export function RecruiterDetailHeader({ recruiter, onBack, userRole, showToast }: RecruiterDetailHeaderProps) {
  return (
    <>
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
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{recruiter.name}</h1>
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

        {userRole !== 'recruiter' && userRole !== 'lead' && userRole !== 'admin' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast(`Exporting ${recruiter.name} Detailed Performance Report...`)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Export Recruiter CSV</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider">Assigned Requirements</span>
            <Briefcase className="w-4 h-4 text-[#5B51D8]" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{recruiter.requirementsCount}</p>
          <div className="text-xs font-semibold flex items-center justify-between pt-1 border-t border-[#C7D2FE]/60">
            <span className="text-blue-700">Worked: {recruiter.workedReqs}</span>
            <span className="text-amber-700">Non-worked: {recruiter.nonWorkedReqs}</span>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">Total Submissions</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{recruiter.submissionsCount}</p>
          <div className="text-xs font-semibold flex items-center justify-between pt-1 border-t border-purple-200/60">
            <span className="text-purple-700">Shortlisted: {recruiter.shortlistedCount}</span>
            <span className="text-slate-500">Pending: {recruiter.noSubmissionsCount}</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Total Interviews</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{recruiter.interviewsCount || '—'}</p>
          <div className="text-xs font-semibold text-blue-700 pt-1 border-t border-blue-200/60">Conversion Rate: {recruiter.conversionRate}</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Successful Hires</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{recruiter.hiresCount}</p>
          <div className="text-xs font-semibold text-emerald-700 pt-1 border-t border-emerald-200/60">Weekly Target Progress: {recruiter.weeklyProgressPct}%</div>
        </div>
      </div>
    </>
  )
}
