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
} from 'lucide-react'

import { RequirementCardsGrid, CardFilterType } from '../ui/RequirementCardsGrid'

interface RequirementsPageProps {
  role?: string
  requirements: Requirement[]
  submissions?: Submission[]
  interviews?: Interview[]
  recruiters?: Recruiter[]
  onOpenSubmit?: (reqId?: string) => void
}

export function RequirementsPage({
  role = 'superadmin',
  requirements = [],
  submissions = [],
  interviews = [],
  recruiters = [],
  onOpenSubmit,
}: RequirementsPageProps) {
  // Single global search state replacing separate inputs
  const [globalSearch, setGlobalSearch] = useState('')
  const [statusDropdown, setStatusDropdown] = useState<string>('All')

  // Selected card filter
  const [activeCardFilter, setActiveCardFilter] = useState<CardFilterType>('ALL')

  // Selected table rows
  const [selectedReqIds, setSelectedReqIds] = useState<Set<string>>(new Set())

  // Inline assignment state
  const [assigningReqId, setAssigningReqId] = useState<string | null>(null)
  const [assignedOwnerName, setAssignedOwnerName] = useState<string>('')

  // Filter requirements based on single global search field & active card filter
  const filteredRequirements = useMemo(() => {
    return requirements.filter(r => {
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

      // Status dropdown filter
      if (statusDropdown !== 'All') {
        if (statusDropdown === 'Unassigned') {
          if (r.owner && r.owner !== 'Unassigned') return false
        } else if (statusDropdown === 'Assigned') {
          if (!r.owner || r.owner === 'Unassigned') return false
        } else if (statusDropdown === 'In progress') {
          if (r.status !== 'Active' && r.assignmentStatus !== 'In Progress')
            return false
        } else if (statusDropdown === 'On Hold') {
          if (r.status !== 'On Hold') return false
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
    requirements,
    globalSearch,
    statusDropdown,
    activeCardFilter,
  ])

  // Select all checkbox state
  const isAllSelected =
    filteredRequirements.length > 0 &&
    filteredRequirements.every(r => selectedReqIds.has(r.id))

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedReqIds(new Set())
    } else {
      setSelectedReqIds(new Set(filteredRequirements.map(r => r.id)))
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
    setActiveCardFilter('ALL')
  }

  const roleLabel =
    role === 'superadmin'
      ? 'Super Admin View'
      : role === 'admin'
        ? 'Admin View'
        : role === 'lead'
          ? 'Team Lead View'
          : 'Recruiter View'

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto pb-10">
      {/* 8 TOP CARDS GRID */}
      <RequirementCardsGrid
        requirements={requirements}
        submissions={submissions}
        interviews={interviews}
        activeCardFilter={activeCardFilter}
        onSelectFilter={setActiveCardFilter}
        title="Requirement Dashboard Overview"
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

          <div className="relative shrink-0 w-full sm:w-48">
            <select
              value={statusDropdown}
              onChange={e => setStatusDropdown(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-gray-50/50 font-medium cursor-pointer"
            >
              <option value="All">All Requirements</option>
              <option value="Unassigned">Unassigned</option>
              <option value="Assigned">Assigned</option>
              <option value="In progress">In progress</option>
              <option value="On Hold">On Hold</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* REQUIREMENTS COUNT & FILTERS SUMMARY BAR */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            {filteredRequirements.length} requirement(s)
          </span>
          {(globalSearch ||
            statusDropdown !== 'All' ||
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
          <div className="text-xs text-gray-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md flex items-center gap-3">
            <span>
              <strong>{selectedReqIds.size}</strong> requirement(s) selected
            </span>
            <button
              onClick={() => {
                alert(`Exporting ${selectedReqIds.size} requirements`)
              }}
              className="text-blue-700 font-semibold hover:underline"
            >
              Export Selected
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
                <th className="py-3 px-4 font-bold">CLIENT EMAIL ID</th>
                <th className="py-3 px-4 font-bold">CLIENT CONTACT NUMBER</th>
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
                  <td colSpan={11} className="py-12 text-center text-gray-400">
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
                filteredRequirements.map(req => {
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
                          <span className="text-xs font-bold text-gray-900">
                            {req.id}
                          </span>
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

                      {/* Client Email ID */}
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {req.clientEmail || 'N/A'}
                      </td>

                      {/* Client Contact Number */}
                      <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                        {req.clientPhone || 'Not available'}
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
                            req.priority === 'Hot'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : req.priority === 'High'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : req.priority === 'Medium'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {req.priority || 'LOW'}
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
      </div>
    </div>
  )
}
