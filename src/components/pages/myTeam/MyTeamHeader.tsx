import React from 'react'
import { Users, Crown } from 'lucide-react'
import { TeamMemberData } from './myTeamData'

interface MyTeamHeaderProps {
  teamMembers: TeamMemberData[]
}

export function MyTeamHeader({ teamMembers }: MyTeamHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-6 h-6 text-[#6B3BF6]" />
              <span>My Team Overview</span>
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200 inline-flex items-center gap-1.5 shadow-2xs">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>Engineering Pod</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Recruiter team member list, assigned client accounts, active requirement workloads, and sourcing throughput.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl flex items-center gap-2 text-xs font-extrabold text-[#6B3BF6]">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Team Lead: Harish Gadipally</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block">Team Members</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">{teamMembers.length}</p>
          <span className="text-[10px] text-purple-700 font-semibold">6 Active Recruiters</span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">Assigned Clients</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">6 Accounts</p>
          <span className="text-[10px] text-blue-700 font-semibold">Accenture, Goldman, LTTS...</span>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Active Requirements</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">35 Job Demands</p>
          <span className="text-[10px] text-amber-700 font-semibold">In Sourcing Phase</span>
        </div>
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-[#5B51D8] uppercase tracking-wider block">Total Submissions</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">306 Submissions</p>
          <span className="text-[10px] text-[#5B51D8] font-bold">Pod Overall Total</span>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Interview Pipeline</span>
          <p className="text-2xl font-extrabold text-slate-900 tabular-nums">75 Scheduled</p>
          <span className="text-[10px] text-emerald-700 font-bold">27 Final Placements</span>
        </div>
      </div>
    </>
  )
}
