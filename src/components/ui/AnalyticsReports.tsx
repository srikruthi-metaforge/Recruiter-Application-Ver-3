import React from 'react'
import { PieChart as PieIcon, BarChart3, TrendingUp, Clock, UserCheck, Building2, Calendar, Filter, CheckCircle2, Zap, Download } from 'lucide-react'
import { InteractiveTrendVisualizer } from '../charts/InteractiveTrendVisualizer'
import { DonutChart, PieSegment } from './PieChartHelper'

export type { PieSegment }

const PIPELINE_DATA: PieSegment[] = [
  { label: 'Screening / Sourced', value: 142, color: '#3B82F6' },
  { label: 'Submitted to Client', value: 98, color: '#6366F1' },
  { label: 'Interview Scheduled', value: 64, color: '#F59E0B' },
  { label: 'Interview Passed', value: 38, color: '#10B981' },
  { label: 'Offered / Placed', value: 24, color: '#059669' },
  { label: 'Rejected', value: 45, color: '#EF4444' },
]

const REQ_DATA: PieSegment[] = [
  { label: 'Active / Open', value: 48, color: '#10B981' },
  { label: 'On Hold', value: 12, color: '#F59E0B' },
  { label: 'Closed / Fulfilled', value: 34, color: '#64748B' },
]

export function AnalyticsReports() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Executive Recruiting Analytics & Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive visual metrics across pipelines, client demands, recruiter throughput, and SLA velocity</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Period</span>
          </button>
          <button type="button" className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Submissions', val: '411', change: '+14.2%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Interviews Scheduled', val: '126', change: '+8.5%', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
          { title: 'Candidates Placed', val: '24', change: '+18.0%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'Avg Time-to-Fill (TAT)', val: '4.2 Days', change: '-1.1 Days', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map(card => (
          <div key={card.title} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{card.title}</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{card.val}</p>
              <span className="text-[11px] font-semibold text-emerald-600 mt-0.5 block">{card.change} vs last month</span>
            </div>
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-blue-600" />
              Candidate Pipeline Stage Distribution
            </h3>
            <span className="text-xs text-slate-400 font-medium">411 Total Candidates</span>
          </div>
          <DonutChart data={PIPELINE_DATA} centerText="411 Candidates" />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Requirement Status Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-medium">94 Total Reqs</span>
          </div>
          <DonutChart data={REQ_DATA} centerText="94 Reqs" />
        </div>
      </div>

      <InteractiveTrendVisualizer />
    </div>
  )
}
