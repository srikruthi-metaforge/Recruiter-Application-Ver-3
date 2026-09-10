import React, { useState, useMemo } from 'react'
import { Role } from '../../types'
import { INITIAL_CLIENTS, ClientRecord } from './clients/clientsData'
import { ClientsMetricsHeader } from './clients/ClientsMetricsHeader'
import { ClientsTable } from './clients/ClientsTable'
import { AddClientModal } from './clients/AddClientModal'
import { ClientDetailModal } from './clients/ClientDetailModal'
import { ClientDeliveryGapAnalysisPage } from './ClientDeliveryGapAnalysisPage'

interface ClientsPageProps {
  userRole?: Role
  role?: Role
}

export function ClientsPage({ userRole, role = 'superadmin' }: ClientsPageProps) {
  const activeRole = userRole || role
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTeamLead, setSelectedTeamLead] = useState<string>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const [clientsList, setClientsList] = useState<ClientRecord[]>(INITIAL_CLIENTS)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedClientDetail, setSelectedClientDetail] = useState<ClientRecord | null>(null)
  const [isGapAnalysisOpen, setIsGapAnalysisOpen] = useState(false)

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const teamLeads = useMemo(() => {
    const set = new Set<string>()
    set.add('ALL')
    clientsList.forEach(c => set.add(c.teamLead))
    return Array.from(set)
  }, [clientsList])

  const filteredClients = useMemo(() => {
    return clientsList.filter(client => {
      const matchesSearch =
        !searchQuery.trim() ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.pocName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.pocEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.domain.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLead = selectedTeamLead === 'ALL' || client.teamLead === selectedTeamLead
      return matchesSearch && matchesLead
    })
  }, [clientsList, searchQuery, selectedTeamLead])

  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredClients.slice(start, start + pageSize)
  }, [filteredClients, currentPage, pageSize])

  const activeReqsCount = useMemo(() => clientsList.reduce((acc, curr) => acc + curr.activeReqs, 0), [clientsList])
  const totalPlacementsCount = useMemo(() => clientsList.reduce((acc, curr) => acc + curr.totalPlacements, 0), [clientsList])
  const executedAgreementsCount = useMemo(() => clientsList.filter(c => c.agreementStatus === 'Active - Executed').length, [clientsList])

  const handleDownloadAgreement = (clientName: string, docName: string) => {
    showToast(`Downloading signed MSA PDF: "${docName}" for ${clientName}...`)
  }

  const handleCreateClient = (c: any) => {
    const created: ClientRecord = {
      id: `CLI-${Math.floor(Math.random() * 900 + 100)}`,
      name: c.name,
      domain: c.domain,
      pocName: c.pocName,
      pocEmail: c.pocEmail,
      pocPhone: c.pocPhone,
      location: c.location,
      teamLead: c.teamLead,
      teamMemberCount: 3,
      teamMembers: ['Marcus Chen', 'Priya Sharma'],
      activeReqs: 5,
      totalSubmissions: 12,
      totalPlacements: 2,
      commercialFee: c.commercialFee,
      paymentTerms: '30 Days Net',
      slaTAT: '2.0 Days',
      agreementStatus: 'Active - Executed',
      agreementStartDate: '01 Jan 2026',
      agreementEndDate: '31 Dec 2028',
      agreementDocName: `${c.name.replace(/\s+/g, '_')}_MSA_Agreement_2026.pdf`,
      signedBy: `${c.pocName} (POC)`,
      signedDate: '01 Jan 2026',
    }
    setClientsList([created, ...clientsList])
    setIsAddModalOpen(false)
    showToast(`Onboarded new client partner "${c.name}"!`)
  }

  if (isGapAnalysisOpen) {
    return <ClientDeliveryGapAnalysisPage clientName="Accenture" userRole={activeRole} onBack={() => setIsGapAnalysisOpen(false)} />
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-150">
      <ClientsMetricsHeader
        totalClientsCount={clientsList.length}
        activeReqsCount={activeReqsCount}
        totalPlacementsCount={totalPlacementsCount}
        executedAgreementsCount={executedAgreementsCount}
        setIsAddModalOpen={setIsAddModalOpen}
        setIsGapAnalysisOpen={setIsGapAnalysisOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTeamLead={selectedTeamLead}
        setSelectedTeamLead={setSelectedTeamLead}
        teamLeads={teamLeads}
      />

      <ClientsTable
        paginatedClients={paginatedClients}
        filteredClientsLength={filteredClients.length}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setSelectedClientDetail={setSelectedClientDetail}
        onDownloadAgreement={handleDownloadAgreement}
      />

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={handleCreateClient}
      />

      <ClientDetailModal
        selectedClientDetail={selectedClientDetail}
        onClose={() => setSelectedClientDetail(null)}
        onDownloadAgreement={handleDownloadAgreement}
      />

      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
