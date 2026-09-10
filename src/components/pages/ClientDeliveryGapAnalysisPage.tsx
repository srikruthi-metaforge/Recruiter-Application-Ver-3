import React from 'react'
import { ClientGapAnalysisProps, STANDARDIZED_DOMAINS_LIST } from './gapAnalysis/gapAnalysisData'
import { GapAnalysisHeader } from './gapAnalysis/GapAnalysisHeader'
import { GapAnalysisStatsCards } from './gapAnalysis/GapAnalysisStatsCards'
import { GapAnalysisChartsSection } from './gapAnalysis/GapAnalysisChartsSection'
import { GapAnalysisRequirementsTable } from './gapAnalysis/GapAnalysisRequirementsTable'
import { GapAnalysisDetailModal } from './gapAnalysis/GapAnalysisDetailModal'
import { useGapAnalysisFilters } from './gapAnalysis/useGapAnalysisFilters'

export function ClientDeliveryGapAnalysisPage({
  clientName,
  pocName = 'Kallol Chakraborty',
  pocEmail = 'kallol.c@client.com',
  teamLead = 'Harish Gadipally',
  role = 'superadmin',
  initialDateRange = 'All Time',
  onBack,
  onSelectRequirement,
}: ClientGapAnalysisProps) {
  const {
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    selectedDomainFilter,
    setSelectedDomainFilter,
    selectedSpocFilter,
    setSelectedSpocFilter,
    selectedReqStatus,
    setSelectedReqStatus,
    selectedSubStatus,
    setSelectedSubStatus,
    selectedInterviewStatus,
    setSelectedInterviewStatus,
    toastMsg,
    showToast,
    selectedDetailReq,
    setSelectedDetailReq,
    openSections,
    toggleSection,
    expandAll,
    collapseAll,
    filteredRequirements,
    gapCurrentPage,
    setGapCurrentPage,
    gapPageSize,
    setGapPageSize,
    gapTotalPages,
    paginatedRequirements,
    metrics,
    domainChartData,
    uniqueSpocList,
    resetFilters,
  } = useGapAnalysisFilters(clientName, pocName, initialDateRange)

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <GapAnalysisHeader
        clientName={clientName}
        pocName={pocName}
        pocEmail={pocEmail}
        teamLead={teamLead}
        role={role}
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDomainFilter={selectedDomainFilter}
        setSelectedDomainFilter={setSelectedDomainFilter}
        selectedSpocFilter={selectedSpocFilter}
        setSelectedSpocFilter={setSelectedSpocFilter}
        selectedReqStatus={selectedReqStatus}
        setSelectedReqStatus={setSelectedReqStatus}
        selectedSubStatus={selectedSubStatus}
        setSelectedSubStatus={setSelectedSubStatus}
        selectedInterviewStatus={selectedInterviewStatus}
        setSelectedInterviewStatus={setSelectedInterviewStatus}
        healthStatus={metrics.healthStatus}
        uniqueSpocList={uniqueSpocList}
        standardizedDomains={STANDARDIZED_DOMAINS_LIST}
        onBack={onBack}
        showToast={showToast}
        resetFilters={resetFilters}
        expandAll={expandAll}
        collapseAll={collapseAll}
        openSections={openSections}
        toggleSection={toggleSection}
      />

      <GapAnalysisStatsCards metrics={metrics} openSections={openSections} />
      <GapAnalysisChartsSection domainChartData={domainChartData} openSections={openSections} />
      <GapAnalysisRequirementsTable
        paginatedRequirements={paginatedRequirements}
        filteredRequirements={filteredRequirements}
        gapCurrentPage={gapCurrentPage}
        setGapCurrentPage={setGapCurrentPage}
        gapPageSize={gapPageSize}
        setGapPageSize={setGapPageSize}
        gapTotalPages={gapTotalPages}
        setSelectedDetailReq={setSelectedDetailReq}
        onSelectRequirement={onSelectRequirement}
        openSections={openSections}
      />

      <GapAnalysisDetailModal req={selectedDetailReq} onClose={() => setSelectedDetailReq(null)} />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium">
          {toastMsg}
        </div>
      )}
    </div>
  )
}

