import React, { useState, useMemo } from 'react'
import { Candidate } from '../../types'
import {
  Users,
  Search,
  Plus,
  FileText,
  Building,
  MapPin,
  Briefcase,
  ExternalLink,
  ChevronDown,
  Sparkles,
  CheckCircle,
  Clock,
  Filter,
} from 'lucide-react'

interface CandidateRepositoryPageProps {
  candidates: Candidate[]
  onOpenAddForm: () => void
  onSelectCandidate?: (candidate: Candidate) => void
}

export function CandidateRepositoryPage({
  candidates = [],
  onOpenAddForm,
  onSelectCandidate,
}: CandidateRepositoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  )

  // Filter candidates dynamically
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase()
        const matchName = c.name.toLowerCase().includes(q)
        const matchId = c.id.toLowerCase().includes(q)
        const matchCompany = (c.company || '').toLowerCase().includes(q)
        const matchSkills = (c.skills || '').toLowerCase().includes(q)
        const matchTech = (c.technologies || '').toLowerCase().includes(q)
        const matchEmail = (c.email || '').toLowerCase().includes(q)
        const matchLoc = (c.currentLocation || '').toLowerCase().includes(q)

        if (
          !matchName &&
          !matchId &&
          !matchCompany &&
          !matchSkills &&
          !matchTech &&
          !matchEmail &&
          !matchLoc
        ) {
          return false
        }
      }

      if (statusFilter !== 'All') {
        if (statusFilter === 'Parsed' && c.status !== 'Parsed') return false
        if (statusFilter === 'In Review' && c.status !== 'In Review')
          return false
        if (statusFilter === 'Submitted' && c.status !== 'Submitted')
          return false
        if (statusFilter === 'Placed' && c.status !== 'Placed') return false
      }

      return true
    })
  }, [candidates, searchQuery, statusFilter])

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-16">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Candidate Repository
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Master database of all parsed, uploaded, and submitted candidate
            profiles.
          </p>
        </div>

        <button
          onClick={onOpenAddForm}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Candidate
        </button>
      </div>

      {/* METRIC OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
            Total Candidates
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mt-2">
            {candidates.length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
            Parsed via AI
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mt-2">
            {candidates.filter(c => c.status === 'Parsed' || c.matchScore).length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
            In Pipeline / Review
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mt-2">
            {candidates.filter(c => c.status === 'In Review' || c.status === 'Submitted').length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
            Offers & Placed
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 mt-2">
            {candidates.filter(c => c.status === 'Placed' || c.offerInHand === 'Yes').length}
          </p>
        </div>
      </div>

      {/* UNIFIED SEARCH & FILTER BAR */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Candidate Repository by Name, ID, Skills, Company, Email, Location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 placeholder-gray-400 bg-gray-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center bg-gray-200"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative shrink-0 w-full sm:w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 bg-gray-50/50 font-medium cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Parsed">Parsed</option>
              <option value="In Review">In Review</option>
              <option value="Submitted">Submitted</option>
              <option value="Placed">Placed</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* CANDIDATES TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 font-bold">CANDIDATE ID</th>
                <th className="py-3 px-4 font-bold">CANDIDATE NAME</th>
                <th className="py-3 px-4 font-bold">COMPANY</th>
                <th className="py-3 px-4 font-bold">SKILLS & TECH</th>
                <th className="py-3 px-4 font-bold">EXPERIENCE / CTC</th>
                <th className="py-3 px-4 font-bold">LOCATION</th>
                <th className="py-3 px-4 font-bold">OFFER IN HAND</th>
                <th className="py-3 px-4 font-bold">STATUS</th>
                <th className="py-3 px-4 font-bold text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    <p className="text-sm font-medium">
                      No candidates found in the repository matching your query.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCandidates.map(cand => (
                  <tr
                    key={cand.id}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                      {cand.id}
                    </td>

                    {/* Candidate Name & Email */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-gray-900">{cand.name}</div>
                      <div className="text-[11px] text-gray-400 truncate">
                        {cand.email || 'No email provided'}
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4 text-gray-800 font-medium whitespace-nowrap">
                      {cand.company || 'N/A'}
                    </td>

                    {/* Skills & Technologies */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="line-clamp-1 text-gray-800 font-medium">
                        {cand.technologies || cand.skills || 'N/A'}
                      </div>
                    </td>

                    {/* Experience & CTC */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-gray-900 font-semibold">
                        {cand.totalExperience || 'N/A'}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {cand.currentCtc ? `CTC: ${cand.currentCtc}` : ''}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap">
                      {cand.currentLocation || 'N/A'}
                    </td>

                    {/* Offer in hand */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          cand.offerInHand === 'Yes'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : cand.offerInHand === 'In Pipeline'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {cand.offerInHand || 'No'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          cand.status === 'Placed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : cand.status === 'In Review'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {cand.status || 'Active'}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedCandidate(cand)
                          if (onSelectCandidate) onSelectCandidate(cand)
                        }}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-xs bg-blue-50 px-2.5 py-1 rounded-md transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CANDIDATE DETAIL MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedCandidate.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedCandidate.id} • {selectedCandidate.company || 'Candidate Profile'}
                </p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Email</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Phone</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Qualification</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.qualification || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">LinkedIn</span>
                <span className="text-blue-600 font-bold truncate block">{selectedCandidate.linkedIn || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Total Experience</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.totalExperience || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Relevant Experience</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.relevantExperience || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Current CTC</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.currentCtc || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Expected CTC</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.expectedCtc || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Current Location</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.currentLocation || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium">Preferred Location</span>
                <span className="text-gray-900 font-bold">{selectedCandidate.preferredLocation || 'N/A'}</span>
              </div>
            </div>

            <div className="text-xs pt-2 border-t border-gray-100 space-y-2">
              <div>
                <span className="text-gray-400 block font-medium">Technologies & Skills</span>
                <span className="text-gray-900 font-semibold">{selectedCandidate.technologies || selectedCandidate.skills || 'N/A'}</span>
              </div>
              {selectedCandidate.notes && (
                <div>
                  <span className="text-gray-400 block font-medium">Notes</span>
                  <p className="text-gray-700 bg-gray-50 p-2 rounded-lg italic">{selectedCandidate.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
