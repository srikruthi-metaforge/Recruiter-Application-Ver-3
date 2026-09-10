import React, { useState, useMemo } from 'react'
import { Role } from '../../types'
import {
  ClientPerformanceData,
  RecruiterReqDashboardItem,
  MOCK_RECRUITERS_REPORT_DATA,
  MOCK_CLIENT_PERFORMANCE_DATA,
} from './reports/reportsData'
import { ReportsHeader } from './reports/ReportsHeader'
import { ReportsAnalyticsSection } from './reports/ReportsAnalyticsSection'
import { RecruiterBreakdownTable } from './reports/RecruiterBreakdownTable'
import { ClientPerformanceTable } from './reports/ClientPerformanceTable'
import { RecruiterDetailAnalyticsPage } from './RecruiterDetailAnalyticsPage'
import { ClientDeliveryGapAnalysisPage } from './ClientDeliveryGapAnalysisPage'

export type { ClientPerformanceData, RecruiterReqDashboardItem }

interface ReportsPageProps {
  role?: Role
}

export function ReportsPage({ role = 'superadmin' }: ReportsPageProps) {
  const [activeTab, setActiveTab] = useState<'overview_charts' | 'recruiter_breakdown' | 'client_performance' | 'team_vs_self'>('overview_charts')
  const [dateRange, setDateRange] = useState('All Time')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterReqDashboardItem | null>(null)
  const [selectedGapClient, setSelectedGapClient] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const filteredRecruiters = useMemo(() => {
    return MOCK_RECRUITERS_REPORT_DATA.filter(rec => {
      if (searchQuery.trim()) {
        return rec.recruiterName.toLowerCase().includes(searchQuery.toLowerCase())
      }
      return true
    })
  }, [searchQuery])

  if (selectedRecruiter) {
    return (
      <RecruiterDetailAnalyticsPage
        recruiter={{
          id: selectedRecruiter.id,
          name: selectedRecruiter.recruiterName,
          email: `${selectedRecruiter.recruiterName.toLowerCase().replace(' ', '.')}@talentflow.io`,
          assignedReqsCount: selectedRecruiter.assignedReqsCount,
          submissionsCount: selectedRecruiter.submissionsCount,
          submittedClients: selectedRecruiter.submittedClients,
        }}
        onBack={() => setSelectedRecruiter(null)}
      />
    )
  }

  if (selectedGapClient) {
    return (
      <ClientDeliveryGapAnalysisPage
        clientName={selectedGapClient}
        role={role}
        onBack={() => setSelectedGapClient(null)}
      />
    )
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <ReportsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExportCsv={() => showToast('Exporting Analytics CSV report...')}
      />

      {activeTab === 'overview_charts' && <ReportsAnalyticsSection role={role} />}

      {activeTab === 'recruiter_breakdown' && (
        <RecruiterBreakdownTable
          recruiters={filteredRecruiters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onDrilldown={setSelectedRecruiter}
        />
      )}

      {activeTab === 'client_performance' && (
        <ClientPerformanceTable
          clients={MOCK_CLIENT_PERFORMANCE_DATA}
          onOpenGapAnalysis={setSelectedGapClient}
        />
      )}

      {activeTab === 'team_vs_self' && (
        <div className="space-y-6">
          <ReportsAnalyticsSection role={role} />
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
