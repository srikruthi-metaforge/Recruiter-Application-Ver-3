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
} from 'lucide-react'
import { Candidate } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'

interface CandidateRepoItem {
  id: string
  candidateId: string
  name: string
  email: string
  phone: string
  technology: string
  totalExperience: string
  createdDate: string
  createdBy: string
  // Additional profile fields matching edit screenshots
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
    candidateId: '17977',
    name: 'Amit kumar choudhary',
    email: 'amitkumarchoudhary111@gmail.com',
    phone: '+91 78282 12226',
    technology: 'Project Test Lead',
    totalExperience: '9 Years 9 Months',
    relevantExperience: '9 Years 9 Months',
    qualification: 'B.E. - Bachelor of Engineering, Electronics and Communication Engineering — Rajiv Gandhi Proudyogiki Vishwavidyalaya',
    skills: 'Machine Learning, Deep Learning, Natural Language Processing (NLP), Predictive Analytics, Prompt Engineering, Python, TensorFlow, PyTorch, SQL & APIs, Manual, Functional, Regression, UAT, SIT, API and End-to-End Testing',
    offerInHand: '—',
    resumeReference: 'amitkumarchoudhary111_gmail_com-1786355305976.docx',
    notes: 'previously received call from different vendor',
    createdDate: '10 Aug 2026',
    createdBy: 'Sai aishwarya.n',
  },
  {
    id: '2',
    candidateId: '17976',
    name: 'ANIKE VINAY KUMAR REDDY',
    email: 'vinaykumarreddy.a@gmail.com',
    phone: '+91 98765 13790',
    technology: 'Mechanical Engineering',
    totalExperience: '3 Years 2 Months',
    relevantExperience: '3 Years 2 Months',
    qualification: 'B.Tech Mechanical Engineering',
    skills: 'CAD, SOLIDWORKS, CATIA, ANSYS, Manufacturing Design',
    offerInHand: '—',
    resumeReference: 'anike_vinay_kumar_reddy_resume.docx',
    notes: 'Available for immediate joining',
    createdDate: '10 Aug 2026',
    createdBy: 'rahimoon Shaik',
  },
  {
    id: '3',
    candidateId: '17975',
    name: 'SNEHA CM',
    email: 'sneha.cm@gmail.com',
    phone: '+91 98765 05501',
    technology: 'Engineering Change Management, PLM, PDM',
    totalExperience: '2 Years 6 Months',
    relevantExperience: '2 Years 6 Months',
    qualification: 'B.E. Industrial Engineering',
    skills: 'Engineering Change Management, PLM, PDM, Windchill, Teamcenter',
    offerInHand: '—',
    resumeReference: 'sneha_cm_resume.pdf',
    notes: 'Looking for remote/hybrid opportunities',
    createdDate: '10 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
  },
  {
    id: '4',
    candidateId: '17973',
    name: 'KAUSTUBH JOSHI',
    email: 'kaustubh.joshi@gmail.com',
    phone: '+91 98765 68032',
    technology: 'It Technical Support, IT admin Support',
    totalExperience: '6 Years',
    relevantExperience: '5.5 Years',
    qualification: 'B.Sc Information Technology',
    skills: 'IT Support, Active Directory, Network Administration, Linux, Windows Server',
    offerInHand: '—',
    resumeReference: 'kaustubh_joshi_resume.docx',
    notes: 'Strong technical troubleshooting skills',
    createdDate: '10 Aug 2026',
    createdBy: 'Lingoji Pavani',
  },
  {
    id: '5',
    candidateId: '17974',
    name: 'PREETHI C J',
    email: 'preethi.cj@gmail.com',
    phone: '+91 98765 35194',
    technology: 'Design Engineer, Plm & Bom Specialist, Operations & Product Development',
    totalExperience: '2 Years 8 Months',
    relevantExperience: '2 Years 8 Months',
    qualification: 'B.Tech Product Design',
    skills: 'Design Engineering, PLM & BOM Specialist, Product Development, Creo, AutoCAD',
    offerInHand: '—',
    resumeReference: 'preethi_cj_resume.pdf',
    notes: 'Recommended by lead recruiter',
    createdDate: '10 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
  },
  {
    id: '6',
    candidateId: '17972',
    name: 'SANJEEV KUMAR',
    email: 'sanjeev.kumar@gmail.com',
    phone: '+91 98765 66415',
    technology: 'Manufacturing Engineering',
    totalExperience: '4 Years 8 Months',
    relevantExperience: '4.5 Years',
    qualification: 'B.E. Manufacturing Science',
    skills: 'Process Optimization, Lean Manufacturing, Six Sigma, Quality Control',
    offerInHand: '—',
    resumeReference: 'sanjeev_kumar_resume.docx',
    notes: 'Notice period 30 days',
    createdDate: '10 Aug 2026',
    createdBy: 'rahimoon Shaik',
  },
  {
    id: '7',
    candidateId: '17927',
    name: 'Kamana Lakshmi Tejaswi',
    email: 'tejaswi.kamana@gmail.com',
    phone: '+91 98765 85442',
    technology: 'HR Recruiter Intern',
    totalExperience: '3 Months',
    relevantExperience: '3 Months',
    qualification: 'MBA Human Resources',
    skills: 'Talent Acquisition, Sourcing, Screening, Candidate Management, Scheduling',
    offerInHand: '—',
    resumeReference: 'tejaswi_kamana_resume.pdf',
    notes: 'Good communication skills',
    createdDate: '06 Aug 2026',
    createdBy: 'Rachana Golkonda',
  },
  {
    id: '8',
    candidateId: '17971',
    name: 'C Harsha Vardhan',
    email: 'harsha.c@gmail.com',
    phone: '+91 98765 90183',
    technology: 'Manufacturing Engineer',
    totalExperience: '1 Year 5 Months',
    relevantExperience: '1 Year 5 Months',
    qualification: 'B.Tech Industrial Engineering',
    skills: 'Production Planning, CNC Programming, Tooling, Quality Inspection',
    offerInHand: '—',
    resumeReference: 'harsha_vardhan_resume.docx',
    notes: 'Junior engineer profile',
    createdDate: '10 Aug 2026',
    createdBy: 'lakshmi.v Recruiter',
  },
  {
    id: '9',
    candidateId: '17970',
    name: 'Siddharth Sunil',
    email: 'siddharth.sunil@gmail.com',
    phone: '+91 98765 43210',
    technology: 'Java Full Stack Developer',
    totalExperience: '4 Years 2 Months',
    relevantExperience: '4 Years',
    qualification: 'B.Tech Computer Science',
    skills: 'Java, Spring Boot, Microservices, Angular, PostgreSQL, Docker, AWS',
    offerInHand: '—',
    resumeReference: 'siddharth_sunil_resume.pdf',
    notes: 'Highly rated full stack engineer',
    createdDate: '10 Aug 2026',
    createdBy: 'Harish Gadipally',
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
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedPeriod, setSubmittedPeriod] = useState('All time')
  const [totalExpFilter, setTotalExpFilter] = useState('All experience')

  // Mask toggling for phone/email in table view
  const [unmaskedIds, setUnmaskedIds] = useState<Set<string>>(new Set())

  // Full-page edit state matching screenshots 1, 2 & 3
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

  // Open Full-Page Edit Form matching Screenshots 1, 2 & 3
  const handleOpenEdit = (item: CandidateRepoItem) => {
    setEditingCandidate(item)
    setEditFullName(item.name)
    setEditEmail(item.email.includes('*') ? `${item.name.toLowerCase().replace(/\s+/g, '')}111@gmail.com` : item.email)
    setEditPhone(item.phone.includes('*') ? '+91 78282 12226' : item.phone)
    setEditLinkedIn('https://...')
    setEditCurrentCompany(item.currentCompany || '')
    setEditQualification(item.qualification || 'B.E. - Bachelor of Engineering, Electronics and Communication Engineering — Rajiv Gandhi Proudyogiki Vishwavidyalaya')
    setEditSkills(item.skills || 'Machine Learning, Deep Learning, Natural Language Processing (NLP), Predictive Analytics, Prompt Engineering, Python, TensorFlow, PyTorch, SQL & APIs, Manual, Functional, Regression, UAT, SIT, API and End-to-End Testing')
    setEditTechnology(item.technology)
    setEditTotalExp(item.totalExperience)
    setEditRelevantExp(item.relevantExperience || item.totalExperience)
    setEditCurrentCtc(item.currentCtc || '')
    setEditExpectedCtc(item.expectedCtc || '')
    setEditNoticePeriod(item.noticePeriod || '')
    setEditCurrentLoc(item.currentLocation || '')
    setEditPreferredLoc(item.preferredLocation || '')
    setEditAvailability(item.interviewAvailability || '')
    setEditReasonForChange(item.reasonForChange || '')
    setEditOfferInHand(item.offerInHand || '—')
    setEditResumeReference(item.resumeReference || `${item.name.toLowerCase().replace(/\s+/g, '')}111_gmail_com-1786355305976.docx`)
    setEditNotes(item.notes || 'previously received call from different vendor')
  }

  // Save Candidate Profile
  const handleSaveProfile = (e: React.FormEvent) => {
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
            relevantExperience: editRelevantExp,
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
            resumeReference: editResumeReference,
            notes: editNotes,
          }
        : item
    )

    setRepoList(updated)
    setEditingCandidate(null)
    showToast(`Candidate profile for ${editFullName} updated successfully!`)
  }

  // -------------------------------------------------------------
  // RENDER FULL-PAGE CANDIDATE PROFILE EDIT VIEW (MATCHING SCREENSHOTS 1, 2 & 3)
  // -------------------------------------------------------------
  if (editingCandidate) {
    return (
      <div className="space-y-6 w-full pb-24 font-sans text-slate-800">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setEditingCandidate(null)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-2xs cursor-pointer mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Candidate profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All fields are optional. Save partial profiles — you can still submit to the client from the requirement page.
            </p>
          </div>

          <button
            type="button"
            onClick={() => showToast(`Downloading resume document for ${editFullName}...`)}
            className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download resume</span>
          </button>
        </div>

        {/* Internal ID Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs text-xs font-mono text-slate-600">
          Internal ID: {editingCandidate.candidateId}
        </div>

        {/* Submissions Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-1">
          <h3 className="text-sm font-bold text-slate-900">Submissions</h3>
          <p className="text-xs text-slate-400 font-normal">
            No submissions found for your login on this candidate.
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Contact & Identity Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Contact & identity</h3>
              <p className="text-xs text-slate-400">Optional — leave blank if unknown.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full name (optional)
                </label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={e => setEditFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn URL (optional)
                </label>
                <input
                  type="text"
                  value={editLinkedIn}
                  onChange={e => setEditLinkedIn(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900 placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Role & Skills Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Role & skills</h3>
              <p className="text-xs text-slate-400">Optional — comma-separated skills and technologies.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current company
                </label>
                <input
                  type="text"
                  value={editCurrentCompany}
                  onChange={e => setEditCurrentCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Highest qualification
                </label>
                <input
                  type="text"
                  value={editQualification}
                  onChange={e => setEditQualification(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Skills</label>
              <textarea
                value={editSkills}
                onChange={e => setEditSkills(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900 leading-relaxed resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Technology</label>
              <input
                type="text"
                value={editTechnology}
                onChange={e => setEditTechnology(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Total experience</label>
                  <span className="text-[10px] text-slate-400">Years, months, combined, or decimal (e.g. 3.5 Years → 3 Years 5 Months)</span>
                </div>
                <input
                  type="text"
                  value={editTotalExp}
                  onChange={e => setEditTotalExp(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Relevant experience</label>
                  <span className="text-[10px] text-slate-400">Years, months, combined, or decimal (e.g. 2.8 Years → 2 Years 8 Months)</span>
                </div>
                <input
                  type="text"
                  value={editRelevantExp}
                  onChange={e => setEditRelevantExp(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Compensation & Logistics Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Compensation & logistics</h3>
              <p className="text-xs text-slate-400">All optional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current CTC</label>
                <input
                  type="text"
                  value={editCurrentCtc}
                  onChange={e => setEditCurrentCtc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expected CTC</label>
                <input
                  type="text"
                  value={editExpectedCtc}
                  onChange={e => setEditExpectedCtc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notice period</label>
                <input
                  type="text"
                  value={editNoticePeriod}
                  onChange={e => setEditNoticePeriod(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current location</label>
                <input
                  type="text"
                  value={editCurrentLoc}
                  onChange={e => setEditCurrentLoc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred location</label>
                <input
                  type="text"
                  value={editPreferredLoc}
                  onChange={e => setEditPreferredLoc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Available for interview</label>
                <input
                  type="text"
                  value={editAvailability}
                  onChange={e => setEditAvailability(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for job change</label>
              <input
                type="text"
                value={editReasonForChange}
                onChange={e => setEditReasonForChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Offer in hand</label>
                <select
                  value={editOfferInHand}
                  onChange={e => setEditOfferInHand(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900 cursor-pointer"
                >
                  <option value="—">—</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="In Pipeline">In Pipeline</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Resume reference (optional)</label>
                  <span className="text-[10px] text-slate-400">Filename or label stored on the profile</span>
                </div>
                <input
                  type="text"
                  value={editResumeReference}
                  onChange={e => setEditResumeReference(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Internal Notes Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Internal notes</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notes</label>
              <textarea
                value={editNotes}
                onChange={e => setEditNotes(e.target.value)}
                rows={3}
                placeholder="Internal notes..."
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-900 leading-relaxed resize-y"
              />
            </div>
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-6 shadow-2xl">
            <div className="w-full flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingCandidate(null)}
                className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2F80ED] hover:bg-[#256BD1] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>

        {/* TOAST NOTIFICATION */}
        {toastMsg && (
          <div className="fixed bottom-16 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
            {toastMsg}
          </div>
        )}
      </div>
    )
  }

  // -------------------------------------------------------------
  // RENDER CANDIDATE REPOSITORY TABLE VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. BACK BUTTON & HEADER BAR */}
      <div>
        <button
          onClick={onOpenAddForm}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-2xs cursor-pointer mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Candidate Repository</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          All candidates from internal database and requirement-linked submissions
        </p>
      </div>

      {/* 2. FILTER & SEARCH CONTROL CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, skills, technology, company,"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all"
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
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
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
              className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
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

      {/* 3. CANDIDATE REPOSITORY TABLE CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CANDIDATE
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  PHONE
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  TECHNOLOGY
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  TOTAL EXPERIENCE
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CREATED
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CREATED BY
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">
                  EDIT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {paginatedRepoList.map(item => {
                const isUnmasked = unmaskedIds.has(item.id)
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Candidate Name & ID */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 leading-snug">{item.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                        {item.candidateId}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 font-mono text-slate-700 text-[11px]">
                      {isUnmasked ? `${item.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com` : item.email}
                    </td>

                    {/* Phone + Eye Button */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono text-slate-700 text-[11px]">
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
                    <td className="px-5 py-4 text-slate-800 font-medium max-w-xs">
                      {item.technology}
                    </td>

                    {/* Total Experience */}
                    <td className="px-5 py-4 text-slate-800 font-semibold whitespace-nowrap">
                      {item.totalExperience}
                    </td>

                    {/* Created Date */}
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                      {item.createdDate}
                    </td>

                    {/* Created By */}
                    <td className="px-5 py-4 text-slate-700 font-medium whitespace-nowrap">
                      {item.createdBy}
                    </td>

                    {/* Edit Button */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="px-4 py-1.5 bg-[#5B4DFB] hover:bg-[#4A3CE4] text-white text-xs font-bold rounded-xl shadow-2xs transition-all cursor-pointer active:scale-98"
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

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-16 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
