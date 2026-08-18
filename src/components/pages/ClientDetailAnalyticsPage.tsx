import React, { useState } from 'react'
import {
  ArrowLeft,
  Building2,
  Briefcase,
  FileText,
  CheckCircle2,
  Clock,
  Download,
  Users,
  TrendingUp,
  BarChart3,
  Sparkles,
} from 'lucide-react'
import { ClientWiseTeamPerformanceChart } from '../ui/ClientWiseTeamPerformanceChart'

export interface ClientPerformanceData {
  id: string
  clientName: string
  reqSent: number
  reqAssigned: number
  submissions: number
  subRatio: number
  openReqs: number
  closedReqs: number
  activeRecruiters: number
  requirementsList: {
    id: string
    title: string
    assignedRecruiter: string
    submissions: number
    status: 'Open' | 'Closed' | 'In Progress'
    createdDate: string
  }[]
}

interface ClientDetailAnalyticsPageProps {
  client: ClientPerformanceData
  onBack: () => void
}

export function ClientDetailAnalyticsPage({
  client,
  onBack,
}: ClientDetailAnalyticsPageProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [showGraphs, setShowGraphs] = useState(false)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="space-y-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Client Reports</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] font-extrabold flex items-center justify-center text-lg border border-blue-200 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
                {client.clientName}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Client Performance & Sourcing Analytics Breakdown
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGraphs(!showGraphs)}
            className={`px-4 py-2 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer border ${
              showGraphs
                ? 'bg-[#6B3BF6] text-white border-purple-600'
                : 'bg-purple-50 text-[#6B3BF6] border-purple-200 hover:bg-purple-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{showGraphs ? 'Hide Performance Graphs' : '📊 View Client Performance Graphs'}</span>
          </button>

          <button
            onClick={() => showToast(`Exporting ${client.clientName} Performance CSV...`)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Export Client Report</span>
          </button>
        </div>
      </div>

      {/* CLIENT OVERVIEW PERFORMANCE GRAPHS (TOGGLED) */}
      {showGraphs && (
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <ClientWiseTeamPerformanceChart />
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">Req Sent</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{client.reqSent}</p>
          <span className="text-[10px] text-blue-600 font-medium">Lifetime Total</span>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block">Req Assigned</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{client.reqAssigned}</p>
          <span className="text-[10px] text-purple-600 font-medium">Active Sourcing</span>
        </div>

        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider block">Total Submissions</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{client.submissions}</p>
          <span className="text-[10px] text-[#5B51D8] font-semibold">Sub Ratio: {client.subRatio}</span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Open Reqs</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{client.openReqs}</p>
          <span className="text-[10px] text-amber-700 font-medium">Pending Sourcing</span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Closed Reqs</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{client.closedReqs}</p>
          <span className="text-[10px] text-emerald-600 font-bold">Successfully Filled</span>
        </div>
      </div>

      {/* Requirements List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4.5 h-4.5 text-[#2563EB]" />
            <span>Requirements Sent by {client.clientName} ({client.requirementsList.length})</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {client.activeRecruiters} Recruiters Assigned
          </span>
        </div>

        <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">REQUIREMENT ID & TITLE</th>
                <th className="py-3.5 px-4">ASSIGNED RECRUITER</th>
                <th className="py-3.5 px-4 text-center">SUBMISSIONS</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">DATE CREATED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {client.requirementsList.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{req.title}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{req.id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-purple-700 font-bold">{req.assignedRecruiter}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#2563EB]">{req.submissions}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        req.status === 'Closed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : req.status === 'In Progress'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-500">{req.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
