import React from 'react'
import { Briefcase, Users, FileText, TrendingUp, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react'

interface GapAnalysisStatsCardsProps {
  metrics: {
    totalReqs: number
    totalPositions: number
    totalSubmissions: number
    coveragePct: number
    zeroSubReqs: number
    missingDomainReqs: number
    nonNumericPositions: number
  }
  openSections: Record<string, boolean>
}

export const GapAnalysisStatsCards: React.FC<GapAnalysisStatsCardsProps> = ({
  metrics,
  openSections,
}) => {
  if (!openSections.kpi) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-in fade-in duration-200">
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
          <span>Active Reqs</span>
          <Briefcase className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-2xl font-black text-slate-900">{metrics.totalReqs}</div>
        <p className="text-[11px] text-slate-500 font-medium">Requirements tracked</p>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
          <span>Positions Demanded</span>
          <Users className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-2xl font-black text-slate-900">{metrics.totalPositions}</div>
        <p className="text-[11px] text-slate-500 font-medium">Target headcount</p>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
          <span>Submissions Made</span>
          <FileText className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl font-black text-slate-900">{metrics.totalSubmissions}</div>
        <p className="text-[11px] text-slate-500 font-medium">Profiles submitted</p>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
          <span>Fulfillment Coverage</span>
          <TrendingUp className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-2xl font-black text-slate-900">{metrics.coveragePct}%</div>
        <p className="text-[11px] text-slate-500 font-medium">Submissions vs Positions</p>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-rose-200/80 shadow-2xs space-y-2 bg-rose-50/30">
        <div className="flex items-center justify-between text-rose-700 text-xs font-bold">
          <span>Zero Submissions</span>
          <AlertTriangle className="w-4 h-4 text-rose-600" />
        </div>
        <div className="text-2xl font-black text-rose-900">{metrics.zeroSubReqs}</div>
        <p className="text-[11px] text-rose-700 font-bold">Critical delivery gaps</p>
      </div>
    </div>
  )
}
