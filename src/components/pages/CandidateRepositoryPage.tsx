import React, { useState, useMemo } from 'react'
import {
  ArrowLeft,
  Search,
  Eye,
  Edit2,
  X,
  Download,
  FileText,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Filter,
  Check,
} from 'lucide-react'
import { Candidate } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'
import { SubmitToLeadPage } from './SubmitToLeadPage'

export interface CandidateRepoItem {
  id: string
  candidateId: string
  name: string
  email: string
  phone: string
  technology: string
  totalExperience: string
  createdDate: string
  createdBy: string
  status?: string
  qualification?: string
  skills?: string
  relevantExperience?: string
  currentCompany?: string
  currentCtc?: string
  expectedCtc?: string
  noticePeriod?: string
  currentLocation?: string
  preferredLocation?: string
  interviewAvailability?: string
  reasonForChange?: string
  offerInHand?: string
  resumeReference?: string
  notes?: string
}

const DEFAULT_REPO_CANDIDATES: CandidateRepoItem[] = [
  {
    id: '1',
    candidateId: '18016',
    name: 'Candidate (draft)',
    email: 'pr************@gmail.com',
    phone: '*********4905',
    technology: 'Test Manager',
    totalExperience: '11 Years 3 Months',
    createdDate: '12 Aug 2026',
    createdBy: 'Nithya Maripelly',
  },
  {
    id: '2',
    candidateId: '18015',
    name: 'VISHWATEJA THOPARAM',
    email: 'vi************@gmail.com',
    phone: '*********9457',
    technology: 'QA Automation Engineer, SDET, Full-Stack Tester',
    totalExperience: '5 Years 3 Months',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
  },
  {
    id: '3',
    candidateId: '18014',
    name: 'SHILPA R',
    email: 'sh************@gmail.com',
    phone: '*********6998',
    technology: 'Storage, Virtualization, Ha-Ft Systems',
    totalExperience: '5 Years 1 Month',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
    status: 'Submitted to Client',
  },
  {
    id: '4',
    candidateId: '18013',
    name: 'Varun kumar B H',
    email: 'va************@gmail.com',
    phone: '*********6912',
    technology: 'Qa Manual, Automation Software Test Engineer',
    totalExperience: '4 Years 7 Months',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
    status: 'Submitted to Client',
  },
  {
    id: '5',
    candidateId: '18012',
    name: 'AKASH MAHADEV TALBAR',
    email: 'ta*********@gmail.com',
    phone: '*********6236',
    technology: 'Biw, Sheet Metal Product Design',
    totalExperience: '5 Years 4 Months',
    createdDate: '12 Aug 2026',
    createdBy: 'rahimoon Shaik',
  },
  {
    id: '6',
    candidateId: '18011',
    name: 'KUNDETI PRATHYUSHA',
    email: 'pr************@gmail.com',
    phone: '*********8955',
    technology: 'Manual Testing, Automation Testing',
    totalExperience: '5 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
    status: 'Submitted to Client',
  },
  {
    id: '7',
    candidateId: '18010',
    name: 'AMIT KULKARNI',
    email: 'am************@gmail.com',
    phone: '*********7712',
    technology: 'Software Engineering',
    totalExperience: '6 Years',
    createdDate: '12 Aug 2026',
    createdBy: 'rahimoon Shaik',
  },
]

interface CandidateRepositoryPageProps {
  candidates?: Candidate[]
  onOpenAddForm: () => void
  onSelectCandidate?: (candidate: Candidate) => void
}

export function CandidateRepositoryPage({
  candidates = [],
  onOpenAddForm,
  onSelectCandidate,
}: CandidateRepositoryPageProps) {
  const [repoList, setRepoList] = useState<CandidateRepoItem[]>(DEFAULT_REPO_CANDIDATES)
  const [viewMode, setViewMode] = useState<'list' | 'submit_to_lead'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedPeriod, setSubmittedPeriod] = useState('All time')
  const [totalExpFilter, setTotalExpFilter] = useState('All experience')

  // Checkbox selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['1']))

  // Mask toggling for phone/email in table view
  const [unmaskedIds, setUnmaskedIds] = useState<Set<string>>(new Set())

  // Full-page edit state
  const [editingCandidate, setEditingCandidate] = useState<CandidateRepoItem | null>(null)

  // Edit Form Fields
  const [editFullName, setEditFullName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editLinkedIn, setEditLinkedIn] = useState('')
  const [editCurrentCompany, setEditCurrentCompany] = useState('')
  const [editQualification, setEditQualification] = useState('')
  const [editSkills, setEditSkills] = useState('')
  const [editTechnology, setEditTechnology] = useState('')
  const [editTotalExp, setEditTotalExp] = useState('')
  const [editRelevantExp, setEditRelevantExp] = useState('')
  const [editCurrentCtc, setEditCurrentCtc] = useState('')
  const [editExpectedCtc, setEditExpectedCtc] = useState('')
  const [editNoticePeriod, setEditNoticePeriod] = useState('')
  const [editCurrentLoc, setEditCurrentLoc] = useState('')
  const [editPreferredLoc, setEditPreferredLoc] = useState('')
  const [editAvailability, setEditAvailability] = useState('')
  const [editReasonForChange, setEditReasonForChange] = useState('')
  const [editOfferInHand, setEditOfferInHand] = useState('—')
  const [editResumeReference, setEditResumeReference] = useState('')
  const [editNotes, setEditNotes] = useState('')

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const toggleSelectCandidate = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredList.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredList.map(item => item.id)))
    }
  }

  const toggleMask = (id: string) => {
    const next = new Set(unmaskedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setUnmaskedIds(next)
  }

  // Filter repo list dynamically
  const filteredList = useMemo(() => {
    return repoList.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = item.name.toLowerCase().includes(q)
        const matchId = item.candidateId.toLowerCase().includes(q)
        const matchTech = item.technology.toLowerCase().includes(q)
        const matchCreator = item.createdBy.toLowerCase().includes(q)
        if (!matchName && !matchId && !matchTech && !matchCreator) return false
      }
      return true
    })
  }, [repoList, searchQuery])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const paginatedRepoList = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredList.slice(start, start + pageSize)
  }, [filteredList, currentPage, pageSize])

  // Open Full-Page Edit Form
  const handleOpenEdit = (item: CandidateRepoItem) => {
    setEditingCandidate(item)
    setEditFullName(item.name)
    setEditEmail(item.email.includes('*') ? `${item.name.toLowerCase().replace(/\s+/g, '')}111@gmail.com` : item.email)
    setEditPhone(item.phone.includes('*') ? '+91 78282 12226' : item.phone)
    setEditLinkedIn('https://...')
    setEditCurrentCompany(item.currentCompany || '')
    setEditQualification(item.qualification || 'B.E. - Bachelor of Engineering')
    setEditSkills(item.skills || 'Testing, Automation, Manual Testing, Java, Python')
    setEditTechnology(item.technology)
    setEditTotalExp(item.totalExperience)
    setEditRelevantExp(item.relevantExperience || item.totalExperience)
    setEditCurrentCtc(item.currentCtc || '')
    setEditExpectedCtc(item.expectedCtc || '')
    setEditNoticePeriod(item.noticePeriod || '')
    setEditCurrentLoc(item.currentLocation || 'Bangalore')
    setEditPreferredLoc(item.preferredLocation || 'Bangalore / Remote')
    setEditAvailability(item.interviewAvailability || 'Immediate')
    setEditReasonForChange(item.reasonForChange || 'Career Growth')
    setEditOfferInHand(item.offerInHand || '—')
    setEditResumeReference(item.resumeReference || 'resume_attachment.pdf')
    setEditNotes(item.notes || 'Candidate profile in repository')
  }

  // Handle Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCandidate) return

    const updated = repoList.map(item =>
      item.id === editingCandidate.id
        ? {
            ...item,
            name: editFullName,
            email: editEmail,
            phone: editPhone,
            technology: editTechnology,
            totalExperience: editTotalExp,
            qualification: editQualification,
            skills: editSkills,
            currentCompany: editCurrentCompany,
            currentCtc: editCurrentCtc,
            expectedCtc: editExpectedCtc,
            noticePeriod: editNoticePeriod,
            currentLocation: editCurrentLoc,
            preferredLocation: editPreferredLoc,
            interviewAvailability: editAvailability,
            reasonForChange: editReasonForChange,
            offerInHand: editOfferInHand,
            notes: editNotes,
          }
        : item
    )

    setRepoList(updated)
    setEditingCandidate(null)
    showToast('Candidate profile updated successfully!')
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: SUBMIT TO LEAD & FORWARD PAGE
  // -------------------------------------------------------------
  if (viewMode === 'submit_to_lead') {
    const selectedItems = repoList.filter(item => selectedIds.has(item.id))
    return (
      <SubmitToLeadPage
        selectedCandidates={selectedItems}
        onBack={() => setViewMode('list')}
        onSubmitSuccess={() => {
          setViewMode('list')
          setSelectedIds(new Set())
          showToast('Successfully submitted to lead & client loop!')
        }}
      />
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE EDIT VIEW
  // -------------------------------------------------------------
  if (editingCandidate) {
    return (
      <div className="space-y-6 w-full pb-20 font-sans text-slate-800 animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditingCandidate(null)}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to Repository"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Candidate Profile</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                ID: {editingCandidate.candidateId} • Created by {editingCandidate.createdBy} on {editingCandidate.createdDate}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-6 max-w-5xl">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={e => setEditFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Company</label>
                <input
                  type="text"
                  value={editCurrentCompany}
                  onChange={e => setEditCurrentCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingCandidate(null)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // RENDER CANDIDATE REPOSITORY TABLE VIEW (100% MATCHING SCREENSHOT)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full pb-24 font-sans text-slate-800">
      {/* 1. BACK BUTTON & HEADER BAR (MATCHING SCREENSHOT) */}
      <div className="space-y-4">
        <button
          onClick={onOpenAddForm}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
          <span>Back</span>
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Candidate Repository</h1>
          <p className="text-xs text-slate-500 mt-1">
            Select one or more candidates from your internal database to submit to this requirement
          </p>
        </div>
      </div>

      {/* 2. GREEN REQUIREMENT INFO BANNER (MATCHING SCREENSHOT) */}
      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="text-emerald-950 font-medium">
          Selecting for:{' '}
          <strong className="font-extrabold text-emerald-950">
            REQ-2026-08-12-004 — TPC - Requirement - C# Automation - Bangalore /Mysore - Embedded
          </strong>
        </div>
        <button
          onClick={() => showToast('Requirement selection updated')}
          className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer text-xs shrink-0"
        >
          Change requirement
        </button>
      </div>

      {/* 3. FILTER & SEARCH CONTROL CARD (MATCHING SCREENSHOT) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, skills, technology, company,"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 self-end md:self-auto">
          {/* Submitted period */}
          <div className="space-y-1 w-full sm:w-44">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider">
              Submitted period
            </div>
            <select
              value={submittedPeriod}
              onChange={e => setSubmittedPeriod(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All time">All time</option>
              <option value="Week">Week</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="Year">Year</option>
            </select>
          </div>

          {/* Total experience */}
          <div className="space-y-1 w-full sm:w-44">
            <div className="text-[10px] font-bold text-slate-400 tracking-wider">
              Total experience
            </div>
            <select
              value={totalExpFilter}
              onChange={e => setTotalExpFilter(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="All experience">All experience</option>
              <option value="Custom range">Custom range</option>
              <option value="0–2 years">0–2 years</option>
              <option value="2–5 years">2–5 years</option>
              <option value="5–8 years">5–8 years</option>
              <option value="8–10 years">8–10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. CANDIDATE REPOSITORY TABLE CARD (MATCHING SCREENSHOT) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="w-10 px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredList.length && filteredList.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#6B3BF6] rounded-md focus:ring-[#6B3BF6] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  CANDIDATE
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  PHONE
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  TECHNOLOGY
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  TOTAL EXPERIENCE
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  CREATED BY
                </th>
                <th className="px-4 py-3.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider text-right">
                  EDIT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {paginatedRepoList.map(item => {
                const isSelected = selectedIds.has(item.id)
                const isUnmasked = unmaskedIds.has(item.id)
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-purple-50/30 transition-colors ${
                      isSelected ? 'bg-purple-50/20' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectCandidate(item.id)}
                        className="w-4 h-4 text-[#6B3BF6] rounded-md focus:ring-[#6B3BF6] cursor-pointer"
                      />
                    </td>

                    {/* Candidate Name, ID & Status Badge */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-xs">{item.name}</span>
                        {item.status && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {item.candidateId}
                      </div>
                    </td>

                    {/* Email (Masked Format) */}
                    <td className="px-4 py-4 font-mono text-slate-700 text-xs">
                      {isUnmasked ? `${item.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com` : item.email}
                    </td>

                    {/* Phone + Eye Icon Button (Masked Format) */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono text-slate-700 text-xs">
                        <span>{isUnmasked ? '+91 78282 12226' : item.phone}</span>
                        <button
                          type="button"
                          onClick={() => toggleMask(item.id)}
                          className="p-1 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                          title={isUnmasked ? 'Mask contact info' : 'View unmasked contact info'}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Technology */}
                    <td className="px-4 py-4 text-slate-800 font-medium max-w-xs">
                      {item.technology}
                    </td>

                    {/* Total Experience */}
                    <td className="px-4 py-4 text-slate-800 font-semibold whitespace-nowrap">
                      {item.totalExperience}
                    </td>

                    {/* Created By */}
                    <td className="px-4 py-4 text-slate-700 font-medium whitespace-nowrap">
                      {item.createdBy}
                    </td>

                    {/* Edit Button */}
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="px-3.5 py-1.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-2xs transition-all cursor-pointer active:scale-98"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={Math.ceil(filteredList.length / pageSize)}
          totalItems={filteredList.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemLabel="candidates"
        />
      </div>

      {/* 5. FLOATING SELECTION DOCK (MATCHING SCREENSHOT - NAVIGATES TO DEDICATED SUBMIT TO LEAD PAGE) */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#EFF6FF] border border-[#C7D2FE] shadow-2xl rounded-2xl p-2.5 px-6 flex items-center gap-6 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="text-xs font-extrabold text-[#1E3A8A]">
            {selectedIds.size} candidate(s) selected
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-4 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-all shadow-2xs"
            >
              Clear
            </button>
            <button
              onClick={() => setViewMode('submit_to_lead')}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer active:scale-98 flex items-center gap-1.5"
            >
              <span>Submit to Lead</span>
            </button>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
