import React, { useState, useMemo } from 'react'
import { Search, Sliders, Trophy } from 'lucide-react'
import { RecruiterAnalyticsData, RecruiterAnalyticsRow } from './RecruiterAnalyticsRow'
import { RecruiterDetailAnalyticsModal } from '../modals/RecruiterDetailAnalyticsModal'

export type { RecruiterAnalyticsData }

const MOCK_ANALYTICS_DATA: RecruiterAnalyticsData[] = [
  { id: 'R01', name: 'Marcus Chen', lead: 'Harish Gadipally', admin: 'David Park', email: 'm.chen@talentflow.io', avatar: 'M', requirementsCount: 5, submissionsCount: 34, l1Interviews: 8, l2Interviews: 5, customInterviews: 3, finalInterviews: 2, placements: 2, weeklyProgress: 100, weeklyTarget: 10, taskStatus: 'POSITIVE', submissionType: 'Direct Sourcing', primaryClient: 'Accenture', tat: '1.8 Days' },
  { id: 'R02', name: 'Priya Sharma', lead: 'Harish Gadipally', admin: 'David Park', email: 'p.sharma@talentflow.io', avatar: 'P', requirementsCount: 4, submissionsCount: 28, l1Interviews: 6, l2Interviews: 4, customInterviews: 2, finalInterviews: 3, placements: 3, weeklyProgress: 90, weeklyTarget: 10, taskStatus: 'POSITIVE', submissionType: 'LinkedIn Recruiter', primaryClient: 'Accenture', tat: '2.1 Days' },
  { id: 'R03', name: 'James O\'Brien', lead: 'Tom Walsh', admin: 'David Park', email: 'j.obrien@talentflow.io', avatar: 'J', requirementsCount: 6, submissionsCount: 41, l1Interviews: 11, l2Interviews: 7, customInterviews: 4, finalInterviews: 4, placements: 4, weeklyProgress: 100, weeklyTarget: 10, taskStatus: 'POSITIVE', submissionType: 'Internal DB', primaryClient: 'Goldman Sachs', tat: '1.5 Days' },
  { id: 'R04', name: 'Aisha Patel', lead: 'Tom Walsh', admin: 'David Park', email: 'a.patel@talentflow.io', avatar: 'A', requirementsCount: 3, submissionsCount: 19, l1Interviews: 4, l2Interviews: 2, customInterviews: 1, finalInterviews: 1, placements: 1, weeklyProgress: 50, weeklyTarget: 10, taskStatus: 'CRITICAL', submissionType: 'Agency Portal', primaryClient: 'Goldman Sachs', tat: '2.4 Days' },
  { id: 'R05', name: 'Carlos Rivera', lead: 'Nina Brooks', admin: 'Lisa Ho', email: 'c.rivera@talentflow.io', avatar: 'C', requirementsCount: 5, submissionsCount: 37, l1Interviews: 9, l2Interviews: 6, customInterviews: 4, finalInterviews: 3, placements: 3, weeklyProgress: 100, weeklyTarget: 10, taskStatus: 'POSITIVE', submissionType: 'Referral', primaryClient: 'Tesla', tat: '1.6 Days' },
]

export function RecruiterAnalyticsTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecruiterModal, setSelectedRecruiterModal] = useState<RecruiterAnalyticsData | null>(null)

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_ANALYTICS_DATA
    const q = searchQuery.toLowerCase()
    return MOCK_ANALYTICS_DATA.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Recruiter Granular Throughput Analytics</h2>
            <p className="text-xs text-slate-500">Comprehensive audit of requirements assigned, submissions, interview stages, placements, and TAT</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Filter recruiters…" className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#6B3BF6]" />
          </div>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-x-auto shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
              <th className="py-2.5 px-4">Recruiter</th>
              <th className="py-2.5 px-3 text-center">Reqs</th>
              <th className="py-2.5 px-3 text-center">Submissions</th>
              <th className="py-2.5 px-3 text-center bg-purple-900/60">L1</th>
              <th className="py-2.5 px-3 text-center bg-purple-900/60">L2</th>
              <th className="py-2.5 px-3 text-center bg-purple-900/60">Custom</th>
              <th className="py-2.5 px-3 text-center bg-purple-900/60">Final</th>
              <th className="py-2.5 px-3 text-center bg-emerald-900/60">Placed</th>
              <th className="py-2.5 px-3 text-center">TAT</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredData.map(row => (
              <RecruiterAnalyticsRow key={row.id} row={row} onSelect={setSelectedRecruiterModal} />
            ))}
          </tbody>
        </table>
      </div>

      {selectedRecruiterModal && (
        <RecruiterDetailAnalyticsModal data={selectedRecruiterModal as any} onClose={() => setSelectedRecruiterModal(null)} />
      )}
    </div>
  )
}
