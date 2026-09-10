import React, { useState } from 'react'
import { Users, Building2, Search, Crown, Sparkles } from 'lucide-react'
import { RecruiterDetailAnalyticsPage, RecruiterDetailData } from './RecruiterDetailAnalyticsPage'
import { MY_TEAM_LEAD_POD_MEMBERS, TeamMemberData } from './myTeam/myTeamData'
import { AdjustClientModal } from './myTeam/AdjustClientModal'
import { MyTeamHeader } from './myTeam/MyTeamHeader'

export function MyTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>(MY_TEAM_LEAD_POD_MEMBERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [clientFilter, setClientFilter] = useState('All Clients')
  const [selectedRecruiterForDetail, setSelectedRecruiterForDetail] = useState<RecruiterDetailData | null>(null)
  const [adjustClientMember, setAdjustClientMember] = useState<TeamMemberData | null>(null)
  const [selectedClientForMember, setSelectedClientForMember] = useState<string>('Accenture')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const filteredMembers = teamMembers.filter(member => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchesName = member.name.toLowerCase().includes(q)
      const matchesEmail = member.email.toLowerCase().includes(q)
      const matchesClient = member.assignedClients.some(c => c.clientName.toLowerCase().includes(q))
      if (!matchesName && !matchesEmail && !matchesClient) return false
    }
    if (clientFilter !== 'All Clients') {
      const hasClient = member.assignedClients.some(c => c.clientName === clientFilter)
      if (!hasClient) return false
    }
    return true
  })

  if (selectedRecruiterForDetail) {
    return <RecruiterDetailAnalyticsPage recruiter={selectedRecruiterForDetail} onBack={() => setSelectedRecruiterForDetail(null)} />
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <MyTeamHeader teamMembers={teamMembers} />

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#6B3BF6]" />
              <span>Team Members & Client Account Assignments</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing detailed breakdown of names, assigned roles, working client accounts, and output metrics.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search recruiter name, client, or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>
            <select
              value={clientFilter}
              onChange={e => setClientFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All Clients">All Clients</option>
              <option value="Accenture">Accenture</option>
              <option value="Goldman Sachs">Goldman Sachs</option>
              <option value="LTTS Automotive">LTTS Automotive</option>
              <option value="Infosys">Infosys</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">RECRUITER NAME & ROLE</th>
                <th className="py-3.5 px-4">WORKING CLIENT ACCOUNTS</th>
                <th className="py-3.5 px-4">ACTIVE REQS</th>
                <th className="py-3.5 px-4">TOTAL SUBMISSIONS</th>
                <th className="py-3.5 px-4">INTERVIEWS</th>
                <th className="py-3.5 px-4">AVG TAT</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-xs shrink-0 border border-purple-200 shadow-2xs">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-xs">{member.name}</span>
                          {member.isLead && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              <Crown className="w-3 h-3 text-amber-600" />
                              <span>Team Lead</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {member.assignedClients.map(cli => (
                        <span key={cli.clientName} className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center gap-1 shadow-2xs">
                          <Building2 className="w-3 h-3 text-[#2563EB]" />
                          <span>{cli.clientName}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 tabular-nums">{member.totalActiveReqs} Requirements</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#6B3BF6] tabular-nums">{member.totalSubmissions} Candidates</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 tabular-nums">{member.interviewsCount} Scheduled</td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-800 tabular-nums">{member.avgTatDays} Days</td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => {
                        setAdjustClientMember(member)
                        setSelectedClientForMember(member.assignedClients[0]?.clientName || 'Accenture')
                      }}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold rounded-xl border border-blue-200 shadow-2xs transition-all inline-flex items-center gap-1 cursor-pointer active:scale-98"
                    >
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Adjust Client</span>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedRecruiterForDetail({
                          id: member.id,
                          name: member.name,
                          role: member.role,
                          team: 'Engineering Pod',
                          avatar: member.name.charAt(0),
                          requirementsCount: 5,
                          workedReqs: 4,
                          nonWorkedReqs: 1,
                          submissionsCount: member.totalSubmissions,
                          shortlistedCount: 12,
                          noSubmissionsCount: 2,
                          interviewsCount: 6,
                          hiresCount: 2,
                          conversionRate: '25.0%',
                          dailyTaskStatus: 'Done (4/5)',
                          weeklyProgress: '20 / 25',
                          weeklyProgressPct: 80,
                          status: 'On Track',
                          requirementsList: [],
                        })
                      }
                      className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] text-xs font-extrabold rounded-xl border border-purple-200 shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#6B3BF6]" />
                      <span>View Analytics</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdjustClientModal
        adjustClientMember={adjustClientMember}
        setAdjustClientMember={setAdjustClientMember}
        selectedClientForMember={selectedClientForMember}
        setSelectedClientForMember={setSelectedClientForMember}
        setTeamMembers={setTeamMembers}
        showToast={showToast}
      />

      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
