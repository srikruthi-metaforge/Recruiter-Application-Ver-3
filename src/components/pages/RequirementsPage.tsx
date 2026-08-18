import React, { useState, useMemo } from 'react'
import { Requirement, Submission, Interview, Recruiter } from '../../types'
import { brand } from '../../theme'
import {
  FileText,
  Send,
  UserX,
  UserCheck,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  Search,
  ChevronDown,
  Filter,
  Plus,
  ArrowUpDown,
  RefreshCw,
  UserPlus,
  X,
} from 'lucide-react'

import { RequirementCardsGrid, CardFilterType } from '../ui/RequirementCardsGrid'
import { RequirementDetailOverview } from './RequirementDetailOverview'
import { CreateJobDemandForm } from './CreateJobDemandForm'
import { PaginationFooter } from '../ui/PaginationFooter'

interface RequirementsPageProps {
  role?: string
  requirements: Requirement[]
  submissions?: Submission[]
  interviews?: Interview[]
  recruiters?: Recruiter[]
  onOpenSubmit?: (reqId?: string) => void
  onUpdateRequirements?: (updated: Requirement[]) => void
}

export function RequirementsPage({
  role = 'superadmin',
  requirements = [],
  submissions = [],
  interviews = [],
  recruiters = [],
  onOpenSubmit,
  onUpdateRequirements,
}: RequirementsPageProps) {
  // Local requirements state so assignments take immediate visual effect
  const [localRequirements, setLocalRequirements] = useState<Requirement[]>(requirements)

  React.useEffect(() => {
    setLocalRequirements(requirements)
  }, [requirements])

  // Selected requirement for detail overview screen
  const [selectedReqForDetail, setSelectedReqForDetail] = useState<Requirement | null>(null)

  // Create Job Demand state
  const [isCreatingDemand, setIsCreatingDemand] = useState(false)

  // Search and Filter states
  const [globalSearch, setGlobalSearch] = useState('')
  const [statusDropdown, setStatusDropdown] = useState<string>('All')
  const [clientDropdown, setClientDropdown] = useState<string>('All')

  // Selected card filter
  const [activeCardFilter, setActiveCardFilter] = useState<CardFilterType>('ALL')

  // Selected table rows
  const [selectedReqIds, setSelectedReqIds] = useState<Set<string>>(new Set())

  // Dynamic unique client list derived from local requirements
  const availableClients = useMemo(() => {
    const clientsSet = new Set<string>()
    localRequirements.forEach(r => {
      if (r.client) clientsSet.add(r.client)
    })
    return Array.from(clientsSet).sort()
  }, [localRequirements])

  // Assignment Modal & Toast State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // States for "Assign to recruiters" modal matching screenshot
  const [isAssignMyselfChecked, setIsAssignMyselfChecked] = useState(true)
  const [selectedRecruiterNames, setSelectedRecruiterNames] = useState<Set<string>>(new Set())
  const [recruiterSearchQuery, setRecruiterSearchQuery] = useState('')

  // Current logged in user name based on role (defaults to Harish Gadipally as shown in screenshot)
  const currentUserName = useMemo(() => {
    if (role === 'superadmin') return 'Harish Gadipally'
    if (role === 'admin') return 'Harish Gadipally'
    if (role === 'lead') return 'Sarah Kim'
    if (role === 'recruiter') return 'Harish Gadipally'
    return 'Harish Gadipally'
  }, [role])

  // List of recruiters matching screenshot (Showing 17 recruiters)
  const recruiterList = useMemo(() => {
    return [
      { id: '1', name: 'Adirala sathvika', email: 'No email' },
      { id: '2', name: 'Arvind GR', email: 'arvind.gr@metaforgeit.com' },
      { id: '3', name: 'Charlie Darwin', email: 'charlie@metaforgeit.com' },
      { id: '4', name: 'Harini Sindey', email: 'harini.s@metaforgeit.com' },
      { id: '5', name: 'Harish Gadipally', email: 'harish.g@metaforgeit.com' },
      { id: '6', name: 'Puttapaka Saiteja', email: 'saiteja.p@metaforgeit.com' },
      { id: '7', name: 'Kallol Chakraborty', email: 'kallol.c@ltts.com' },
      { id: '8', name: 'Marcus Chen', email: 'm.chen@talentflow.io' },
      { id: '9', name: 'Sarah Kim', email: 's.kim@talentflow.io' },
      { id: '10', name: 'David Park', email: 'd.park@talentflow.io' },
      { id: '11', name: 'Alex Turner', email: 'alex.t@dev.com' },
      { id: '12', name: 'Nina Brooks', email: 'n.brooks@talentflow.io' },
      { id: '13', name: 'Priya Sharma', email: 'priya.s@talentflow.io' },
      { id: '14', name: 'James O\'Brien', email: 'j.obrien@talentflow.io' },
      { id: '15', name: 'Carlos Rivera', email: 'c.rivera@talentflow.io' },
      { id: '16', name: 'Tejasree Chakravarthy', email: 'tejasree@metaforgeit.com' },
      { id: '17', name: 'Rahul Verma', email: 'rahul.v@metaforgeit.com' },
    ]
  }, [])

  // Filtered recruiter list based on search input
  const filteredRecruiterList = useMemo(() => {
    if (!recruiterSearchQuery.trim()) return recruiterList
    const q = recruiterSearchQuery.trim().toLowerCase()
    return recruiterList.filter(
      r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
    )
  }, [recruiterList, recruiterSearchQuery])

  // Count total selected recruiters for footer button label
  const totalSelectedRecruitersCount = (isAssignMyselfChecked ? 1 : 0) + selectedRecruiterNames.size

  const toggleRecruiterSelection = (name: string) => {
    const next = new Set(selectedRecruiterNames)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    setSelectedRecruiterNames(next)
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  // Self Assign handler shortcut
  const handleSelfAssign = () => {
    if (selectedReqIds.size === 0) return
    const count = selectedReqIds.size
    const updated = localRequirements.map(r =>
      selectedReqIds.has(r.id)
        ? { ...r, owner: currentUserName, assignmentStatus: 'Assigned' as const }
        : r
    )
    setLocalRequirements(updated)
    onUpdateRequirements?.(updated)
    setSelectedReqIds(new Set())
    showToast(`Successfully assigned ${count} requirement(s) to ${currentUserName} (Myself)`)
  }

  // Confirm assignment from the modal
  const handleConfirmModalAssignment = () => {
    const assignees: string[] = []
    if (isAssignMyselfChecked) {
      assignees.push(currentUserName)
    }
    selectedRecruiterNames.forEach(name => assignees.push(name))

    if (assignees.length === 0) return

    const assigneesText = assignees.join(', ')
    const updated = localRequirements.map(r =>
      selectedReqIds.has(r.id) || (selectedReqForDetail && r.id === selectedReqForDetail.id)
        ? { ...r, owner: assigneesText, assignmentStatus: 'Assigned' as const, submissions: r.submissions || 7 }
        : r
    )

    setLocalRequirements(updated)
    onUpdateRequirements?.(updated)

    if (selectedReqForDetail) {
      setSelectedReqForDetail({
        ...selectedReqForDetail,
        owner: assigneesText,
        assignmentStatus: 'Assigned',
        submissions: selectedReqForDetail.submissions || 7,
      })
    }

    setSelectedReqIds(new Set())
    setIsAssignModalOpen(false)
    setSelectedRecruiterNames(new Set())
    setIsAssignMyselfChecked(true)
    setRecruiterSearchQuery('')

    showToast(`Successfully assigned ${assignees.length} recruiter(s)`)
  }

  // Filter requirements based on single global search field & active card filter
  const filteredRequirements = useMemo(() => {
    return localRequirements.filter(r => {
      // Global single search filter (matches ID, Client, Role, Location, Owner, Email, Lead, Skills)
      if (globalSearch.trim()) {
        const query = globalSearch.trim().toLowerCase()
        const matchId = r.id.toLowerCase().includes(query)
        const matchClient = r.client.toLowerCase().includes(query)
        const matchTitle = r.title.toLowerCase().includes(query)
        const matchLocation = (r.location || '').toLowerCase().includes(query)
        const matchOwner = (r.owner || '').toLowerCase().includes(query)
        const matchEmail = (r.clientEmail || '').toLowerCase().includes(query)
        const matchLead = (r.assignedLead || '').toLowerCase().includes(query)
        const matchSkills = (r.skills || []).some(s =>
          s.toLowerCase().includes(query)
        )

        if (
          !matchId &&
          !matchClient &&
          !matchTitle &&
          !matchLocation &&
          !matchOwner &&
          !matchEmail &&
          !matchLead &&
          !matchSkills
        ) {
          return false
        }
      }

      // Client dropdown filter
      if (clientDropdown !== 'All') {
        if (r.client !== clientDropdown) return false
      }

      // Status dropdown filter
      if (statusDropdown !== 'All') {
        if (statusDropdown === 'Unassigned') {
          if (r.owner && r.owner !== 'Unassigned' && r.assignmentStatus !== 'Unassigned') return false
        } else if (statusDropdown === 'Assigned') {
          if (!r.owner || r.owner === 'Unassigned' || r.assignmentStatus === 'Unassigned') return false
        } else if (statusDropdown === 'Submitted') {
          if ((r.submissions || 0) === 0) return false
        } else if (statusDropdown === 'Submitted to Lead') {
          if ((r.submissions || 0) === 0) return false
        } else if (statusDropdown === 'Submitted to Client') {
          if ((r.submissions || 0) === 0) return false
        } else if (statusDropdown === 'Interview') {
          if ((r.interviews || 0) === 0) return false
        } else if (statusDropdown === 'Selected') {
          if ((r.placed || r.selections || 0) === 0) return false
        } else if (statusDropdown === 'Rejected') {
          if ((r.rejections || 0) === 0) return false
        } else if (statusDropdown === 'Closed') {
          if (r.status !== 'Closed' && r.assignmentStatus !== 'Closed') return false
        }
      }

      // Card filter
      if (activeCardFilter === 'UNASSIGNED') {
        return !r.owner || r.owner === 'Unassigned'
      } else if (activeCardFilter === 'ASSIGNED') {
        return r.owner && r.owner !== 'Unassigned'
      } else if (activeCardFilter === 'IN_PROGRESS') {
        return r.status === 'Active' || r.assignmentStatus === 'In Progress'
      } else if (activeCardFilter === 'SUBMISSIONS') {
        return r.submissions > 0
      } else if (activeCardFilter === 'INTERVIEWS') {
        return r.interviews > 0
      } else if (activeCardFilter === 'SELECTIONS') {
        return (r.placed || r.selections || 0) > 0
      } else if (activeCardFilter === 'REJECTIONS') {
        return (r.rejections || 0) > 0
      }

      return true
    })
  }, [
    localRequirements,
    globalSearch,
    statusDropdown,
    clientDropdown,
    activeCardFilter,
  ])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const paginatedRequirements = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredRequirements.slice(start, start + pageSize)
  }, [filteredRequirements, currentPage, pageSize])

  // Select all checkbox state
  const isAllSelected =
    paginatedRequirements.length > 0 &&
    paginatedRequirements.every(r => selectedReqIds.has(r.id))

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedReqIds(new Set())
    } else {
      setSelectedReqIds(new Set(paginatedRequirements.map(r => r.id)))
    }
  }

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedReqIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedReqIds(next)
  }

  const handleResetFilters = () => {
    setGlobalSearch('')
    setStatusDropdown('All')
    setClientDropdown('All')
    setActiveCardFilter('ALL')
  }

  const roleLabel =
    role === 'superadmin' || role === 'devteam'
      ? 'Super Admin View'
      : role === 'admin'
        ? 'Admin View'
        : role === 'lead'
          ? 'Team Lead View'
          : 'Recruiter View'

  // Edit Job Demand state
  const [isEditingDemand, setIsEditingDemand] = useState(false)
  const [editingReq, setEditingReq] = useState<Requirement | null>(null)

  if (isCreatingDemand) {
    return (
      <CreateJobDemandForm
        userRole={roleLabel}
        mode="create"
        onCancel={() => setIsCreatingDemand(false)}
        onSubmit={newReq => {
          const updated = [newReq, ...localRequirements]
          setLocalRequirements(updated)
          if (onUpdateRequirements) {
            onUpdateRequirements(updated)
          }
          setIsCreatingDemand(false)
        }}
      />
    )
  }

  if (isEditingDemand && editingReq) {
    return (
      <CreateJobDemandForm
        userRole={roleLabel}
        mode="edit"
        initialData={editingReq}
        onCancel={() => setIsEditingDemand(false)}
        onSubmit={updatedReq => {
          const updatedList = localRequirements.map(r =>
            r.id === updatedReq.id ? updatedReq : r
          )
          setLocalRequirements(updatedList)
          onUpdateRequirements?.(updatedList)
          setSelectedReqForDetail(updatedReq)
          setIsEditingDemand(false)
          setEditingReq(null)
          showToast('Requirement details updated successfully!')
        }}
      />
    )
  }

  if (selectedReqForDetail) {
    return (
      <>
        <RequirementDetailOverview
          requirement={selectedReqForDetail}
          onBack={() => setSelectedReqForDetail(null)}
          onAddCandidate={() => onOpenSubmit?.(selectedReqForDetail.id)}
          onEditRequirement={() => {
            setEditingReq(selectedReqForDetail)
            setIsEditingDemand(true)
          }}
          onOpenAssignModal={() => {
            setSelectedReqIds(new Set([selectedReqForDetail.id]))
            setIsAssignModalOpen(true)
          }}
        />

        {/* REASSIGN MODAL OVERLAY */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden border border-slate-100 font-sans">
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Reassign
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-1">
                    Select yourself and/or other recruiters for this requirement in one step.
                  </p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Assign myself card */}
                <label className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer hover:bg-blue-50 transition-colors block">
                  <input
                    type="checkbox"
                    checked={isAssignMyselfChecked}
                    onChange={e => setIsAssignMyselfChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <div>
                    <div className="text-sm font-bold text-blue-900 leading-snug">
                      Assign myself ({currentUserName})
                    </div>
                    <div className="text-xs text-blue-600/90 leading-normal mt-0.5 font-normal">
                      Include yourself along with any recruiters selected below.
                    </div>
                  </div>
                </label>

                {/* Search recruiter input */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ASSIGN TO RECRUITER
                  </div>
                  <input
                    type="text"
                    placeholder="Search recruiter by name or email"
                    value={recruiterSearchQuery}
                    onChange={e => setRecruiterSearchQuery(e.target.value)}
                    className="w-full h-11 px-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
                  />
                </div>

                {/* Showing counter */}
                <div className="text-xs text-slate-500 font-medium px-0.5">
                  Showing {filteredRecruiterList.length} of {recruiterList.length} recruiters
                </div>

                {/* Recruiter cards scrollable list */}
                <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
                  {filteredRecruiterList.map(rec => {
                    const isChecked = selectedRecruiterNames.has(rec.name)
                    return (
                      <label
                        key={rec.id}
                        className={`border rounded-2xl p-3.5 flex items-center gap-3.5 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-blue-300 bg-blue-50/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleRecruiterSelection(rec.name)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-snug">
                            {rec.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 font-normal">
                            {rec.email}
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Footer actions */}
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-5 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmModalAssignment}
                  disabled={totalSelectedRecruitersCount === 0}
                  className="px-6 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  Assign {totalSelectedRecruitersCount} recruiter(s)
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="space-y-5 w-full pb-10">
      {/* 8 TOP CARDS GRID */}
      <RequirementCardsGrid
        requirements={localRequirements}
        submissions={submissions}
        interviews={interviews}
        activeCardFilter={activeCardFilter}
        onSelectFilter={setActiveCardFilter}
        onCreateNewJobDemand={() => setIsCreatingDemand(true)}
        title="Requirements Dashboard"
        badgeLabel={roleLabel}
      />

      {/* UNIFIED SINGLE SEARCH BAR */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Requirement ID, Client name, Role, Location, Owner or Recruiter..."
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 placeholder-gray-400 bg-gray-50/50 transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center bg-gray-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Client Filter Dropdown */}
          <div className="relative shrink-0 w-full sm:w-52">
            <select
              value={clientDropdown}
              onChange={e => setClientDropdown(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-gray-50/50 font-medium cursor-pointer"
            >
              <option value="All">All Clients ({availableClients.length})</option>
              {availableClients.map(clientName => (
                <option key={clientName} value={clientName}>
                  🏢 {clientName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative shrink-0 w-full sm:w-44">
            <select
              value={statusDropdown}
              onChange={e => setStatusDropdown(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-gray-50/50 font-medium cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Unassigned">Unassigned</option>
              <option value="Assigned">Assigned</option>
              <option value="Submitted">Submitted</option>
              <option value="Submitted to Lead">Submitted to Lead</option>
              <option value="Submitted to Client">Submitted to Client</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="Closed">Closed</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* REQUIREMENTS COUNT & ASSIGNMENT ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            {filteredRequirements.length} requirement(s)
          </span>
          {(globalSearch ||
            statusDropdown !== 'All' ||
            clientDropdown !== 'All' ||
            activeCardFilter !== 'ALL') && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium underline ml-2"
            >
              Clear search & filters
            </button>
          )}
        </div>

        {selectedReqIds.size > 0 && (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-2 rounded-xl shadow-md border border-blue-700/50 flex flex-wrap items-center gap-2.5 animate-in fade-in duration-200">
            <span className="bg-blue-600/80 text-white font-bold px-2.5 py-0.5 rounded text-xs border border-blue-400/40">
              {selectedReqIds.size} Selected
            </span>

            {/* Self Assign Button */}
            <button
              onClick={handleSelfAssign}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title={`Assign to ${currentUserName}`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Self Assign ({currentUserName})</span>
            </button>

            {/* Assign to Someone Button */}
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Assign to Someone...</span>
            </button>

            <button
              onClick={() => setSelectedReqIds(new Set())}
              className="text-xs text-blue-300 hover:text-white px-2 py-1 font-medium transition-colors cursor-pointer ml-auto"
            >
              Deselect
            </button>
          </div>
        )}
      </div>

      {/* REQUIREMENTS DATA TABLE (MATCHING ATTACHED SCREENSHOT) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 font-bold">REQUIREMENT ID</th>
                <th className="py-3 px-4 font-bold">CLIENT NAME</th>
                <th className="py-3 px-4 font-bold">ROLE</th>
                <th className="py-3 px-4 font-bold">PRIORITY</th>
                <th className="py-3 px-4 font-bold">OWNER</th>
                <th className="py-3 px-4 font-bold">EMAIL ARRIVED TIME</th>
                <th className="py-3 px-4 font-bold">OPEN SINCE</th>
                <th className="py-3 px-4 font-bold text-center">SUBMISSIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredRequirements.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    <p className="text-sm font-medium">
                      No requirements match your current search or filter.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 text-xs text-blue-600 font-semibold hover:underline"
                    >
                      Reset filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedRequirements.map(req => {
                  const isUnassigned =
                    !req.owner || req.owner === 'Unassigned'
                  const isSelected = selectedReqIds.has(req.id)

                  return (
                    <tr
                      key={req.id}
                      className={`hover:bg-blue-50/30 transition-colors ${
                        isSelected ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(req.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Requirement ID */}
                      <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                        <div className="space-y-1">
                          <button
                            onClick={() => setSelectedReqForDetail(req)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center gap-1 group text-left"
                            title="Click to view full requirement overview"
                          >
                            <span>{req.id}</span>
                          </button>
                          <div>
                            <span
                              className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                                isUnassigned
                                  ? 'bg-gray-100 text-gray-600 border-gray-300'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              {req.owner || 'Unassigned'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Client Name */}
                      <td className="py-3.5 px-4 font-medium text-gray-800 whitespace-nowrap">
                        {req.client}
                      </td>

                      {/* Role & Subtext */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-gray-900 leading-snug line-clamp-2">
                          {req.title}
                        </div>
                        {req.location && (
                          <div className="text-[11px] text-gray-400 mt-0.5 truncate">
                            {req.location}
                          </div>
                        )}
                      </td>

                      {/* Priority Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            req.priority === 'High'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : req.priority === 'Medium'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {req.priority || 'Low'}
                        </span>
                      </td>

                      {/* Owner */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isUnassigned ? 'bg-gray-400' : 'bg-emerald-500'
                            }`}
                          />
                          <span
                            className={`text-xs ${
                              isUnassigned
                                ? 'text-gray-500 italic font-medium'
                                : 'text-gray-900 font-semibold'
                            }`}
                          >
                            {req.owner || 'Unassigned'}
                          </span>
                        </div>
                      </td>

                      {/* Email Arrived Time */}
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {req.emailArrivedTime || 'Aug 6, 2026, 11:05 AM'}
                      </td>

                      {/* Open Since */}
                      <td className="py-3.5 px-4 text-gray-700 font-medium whitespace-nowrap">
                        {req.openDays !== undefined
                          ? `${req.openDays} days`
                          : '0 days'}
                      </td>

                      {/* Submissions Count */}
                      <td className="py-3.5 px-4 text-center font-bold text-gray-900 tabular-nums">
                        {req.submissions || 0}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={Math.ceil(filteredRequirements.length / pageSize)}
          totalItems={filteredRequirements.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemLabel="requirements"
        />
      </div>

      {/* ASSIGN TO RECRUITERS / REASSIGN MODAL (MATCHING ATTACHED SCREENSHOT) */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden border border-slate-100 font-sans">
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Reassign
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-1">
                  Select yourself and/or other recruiters for this requirement in one step.
                </p>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Assign myself card */}
              <label className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer hover:bg-blue-50 transition-colors block">
                <input
                  type="checkbox"
                  checked={isAssignMyselfChecked}
                  onChange={e => setIsAssignMyselfChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
                <div>
                  <div className="text-sm font-bold text-blue-900 leading-snug">
                    Assign myself ({currentUserName})
                  </div>
                  <div className="text-xs text-blue-600/90 leading-normal mt-0.5 font-normal">
                    Include yourself along with any recruiters selected below.
                  </div>
                </div>
              </label>

              {/* Search recruiter input */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ASSIGN TO RECRUITER
                </div>
                <input
                  type="text"
                  placeholder="Search recruiter by name or email"
                  value={recruiterSearchQuery}
                  onChange={e => setRecruiterSearchQuery(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
                />
              </div>

              {/* Showing counter */}
              <div className="text-xs text-slate-500 font-medium px-0.5">
                Showing {filteredRecruiterList.length} of {recruiterList.length} recruiters
              </div>

              {/* Recruiter cards scrollable list */}
              <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1.5 custom-scrollbar">
                {filteredRecruiterList.map(rec => {
                  const isChecked = selectedRecruiterNames.has(rec.name)
                  return (
                    <label
                      key={rec.id}
                      className={`border rounded-2xl p-3.5 flex items-center gap-3.5 cursor-pointer transition-all ${
                        isChecked
                          ? 'border-blue-300 bg-blue-50/50'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRecruiterSelection(rec.name)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900 leading-snug">
                          {rec.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 font-normal">
                          {rec.email}
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="px-5 h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmModalAssignment}
                disabled={totalSelectedRecruitersCount === 0}
                className="px-6 h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-98"
              >
                Assign {totalSelectedRecruitersCount} recruiter(s)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
