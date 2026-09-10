import React, { useState } from 'react'
import { RecruiterPerformanceChart } from '../../charts/RecruiterPerformanceChart'
import { RequirementCoverageChart } from '../../charts/RequirementCoverageChart'
import { MonthlyTimelinePerformanceChart } from '../../charts/MonthlyTimelinePerformanceChart'
import { StagePipelinePerformanceChart } from '../../charts/StagePipelinePerformanceChart'
import { ClientPOCSubmissionChart } from '../../charts/ClientPOCSubmissionChart'
import { DomainWiseSubmissionChart } from '../../charts/DomainWiseSubmissionChart'
import { ClientWiseTeamPerformanceChart } from '../../charts/ClientWiseTeamPerformanceChart'

interface ReportsAnalyticsSectionProps {
  role?: string
}

export const ReportsAnalyticsSection: React.FC<ReportsAnalyticsSectionProps> = ({ role }) => {
  const [toggleState, setToggleState] = useState<'assigned' | 'timeline' | 'stage' | 'self' | 'team'>('assigned')

  return (
    <div className="space-y-6 font-sans">
      {/* Toggles bar matching user prompt */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setToggleState('assigned')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              toggleState === 'assigned' ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            My Assigned REQs Breakdown
          </button>
          <button
            onClick={() => setToggleState('timeline')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              toggleState === 'timeline' ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Monthly Timeline
          </button>
          <button
            onClick={() => setToggleState('stage')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              toggleState === 'stage' ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Stage Pipeline
          </button>
          <button
            onClick={() => setToggleState('self')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              toggleState === 'self' ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Self Performance
          </button>
          <button
            onClick={() => setToggleState('team')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              toggleState === 'team' ? 'bg-[#6B3BF6] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Team Performance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecruiterPerformanceChart />
        <RequirementCoverageChart />
        <MonthlyTimelinePerformanceChart />
        <StagePipelinePerformanceChart />
        <ClientPOCSubmissionChart />
        <DomainWiseSubmissionChart />
      </div>
    </div>
  )
}
