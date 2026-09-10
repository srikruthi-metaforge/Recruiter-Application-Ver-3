import React from 'react'
import { Search, ChevronDown, UserCheck, UserPlus } from 'lucide-react'

interface Props {
  globalSearch: string
  setGlobalSearch: (v: string) => void
  clientDropdown: string
  setClientDropdown: (v: string) => void
  availableClients: string[]
  statusDropdown: string
  setStatusDropdown: (v: string) => void
  filteredRequirementsLength?: number
  selectedReqIds?: Set<string>
  selectedCount?: number
  setSelectedReqIds?: (set: Set<string>) => void
  handleSelfAssign?: () => void
  onSelfAssign?: () => void
  setIsAssignModalOpen?: (v: boolean) => void
  onOpenAssignModal?: () => void
  onCreateDemand?: () => void
  currentUserName?: string
  role?: string
}

export function RequirementsSearchBar({
  globalSearch,
  setGlobalSearch,
  clientDropdown,
  setClientDropdown,
  availableClients,
  statusDropdown,
  setStatusDropdown,
  filteredRequirementsLength = 0,
  selectedReqIds,
  selectedCount,
  setSelectedReqIds = () => {},
  handleSelfAssign,
  onSelfAssign,
  setIsAssignModalOpen,
  onOpenAssignModal,
  onCreateDemand,
  currentUserName = '',
  role = 'admin',
}: Props) {
  const selCount = selectedCount !== undefined ? selectedCount : (selectedReqIds ? selectedReqIds.size : 0)
  const selfAssignFn = onSelfAssign || handleSelfAssign || (() => {})
  const openAssignFn = onOpenAssignModal || (() => setIsAssignModalOpen?.(true))
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm font-sans">
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

          <div className="relative shrink-0 w-full sm:w-44">
            <select
              value={statusDropdown}
              onChange={e => setStatusDropdown(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-gray-50/50 font-semibold cursor-pointer"
            >
              <option value="All">All Requirements</option>
              <option value="Unassigned">Unassigned</option>
              <option value="Assigned">Assigned</option>
              <option value="Submitted">Submitted</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="Closed">Closed</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 font-sans">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            {filteredRequirementsLength} requirement(s)
          </span>
        </div>

        {selCount > 0 && (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-2 rounded-xl shadow-md border border-blue-700/50 flex flex-wrap items-center gap-2.5 animate-in fade-in duration-200">
            <span className="bg-blue-600/80 text-white font-bold px-2.5 py-0.5 rounded text-xs border border-blue-400/40">
              {selCount} Selected
            </span>

            <button
              onClick={selfAssignFn}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title={`Assign to ${currentUserName}`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Self Assign ({currentUserName})</span>
            </button>

            {role !== 'recruiter' && (
              <button
                onClick={openAssignFn}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Assign to Someone...</span>
              </button>
            )}

            <button
              onClick={() => setSelectedReqIds(new Set())}
              className="text-xs text-blue-300 hover:text-white px-2 py-1 font-medium transition-colors cursor-pointer ml-auto"
            >
              Deselect
            </button>
          </div>
        )}
      </div>
    </>
  )
}
