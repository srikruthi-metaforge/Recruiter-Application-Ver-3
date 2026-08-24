import React, { useState, useMemo } from 'react'
import {
  X,
  Send,
  User,
  Upload,
  CheckCircle2,
  Sparkles,
  Search,
  FileText,
  Check,
  UserCheck,
  Building,
  Briefcase,
  Layers,
} from 'lucide-react'
import { Requirement, Submission } from '../../types'

interface CandidateRepoItem {
  id: string
  name: string
  candidateId: string
  email: string
  phone: string
  technology: string
  skills: string
  totalExperience: string
  currentCompany: string
  status: string
}

const SAMPLE_EXISTING_CANDIDATES: CandidateRepoItem[] = [
  {
    id: '1',
    name: 'Priyanka Sharma',
    candidateId: '18016',
    email: 'priyanka.sharma@gmail.com',
    phone: '+91 98210 44905',
    technology: 'Test Manager / QA Lead',
    skills: 'Test Management, Automation Frameworks, Selenium',
    totalExperience: '11 Years 3 Months',
    currentCompany: 'Cognizant Technology Solutions',
    status: 'In Review',
  },
  {
    id: '2',
    name: 'VISHWATEJA THOPARAM',
    candidateId: '18015',
    email: 'vishwateja.t@gmail.com',
    phone: '+91 98765 49457',
    technology: 'QA Automation Engineer, SDET',
    skills: 'Java, Selenium WebDriver, TestNG, Cucumber',
    totalExperience: '5 Years 3 Months',
    currentCompany: 'Infosys Limited',
    status: 'New Profile',
  },
  {
    id: '3',
    name: 'SHILPA R',
    candidateId: '18014',
    email: 'shilpa.r@gmail.com',
    phone: '+91 99887 76998',
    technology: 'Storage, Virtualization, Ha-Ft Systems',
    skills: 'VMware ESXi, SAN/NAS Storage, NetApp',
    totalExperience: '5 Years 1 Month',
    currentCompany: 'Wipro Technologies',
    status: 'Submitted to Client',
  },
  {
    id: '4',
    name: 'AKASH MAHADEV TALBAR',
    candidateId: '18012',
    email: 'akash.talbar@gmail.com',
    phone: '+91 98112 26236',
    technology: 'Biw, Sheet Metal Product Design',
    skills: 'CATIA V5, NX CAD, BIW Closures',
    totalExperience: '5 Years 4 Months',
    currentCompany: 'Tata Technologies Ltd',
    status: 'Interview Scheduled',
  },
  {
    id: '5',
    name: 'AMIT KULKARNI',
    candidateId: '18010',
    email: 'amit.kulkarni@gmail.com',
    phone: '+91 98450 17712',
    technology: 'Software Engineering / C# Automation',
    skills: 'C#, .NET Core, SpecFlow, NUnit',
    totalExperience: '6 Years',
    currentCompany: 'Bosch Global Software Technologies',
    status: 'Shortlisted',
  },
]

interface SubmitCandidateModalProps {
  isOpen: boolean
  onClose: () => void
  requirements: Requirement[]
  selectedReqId?: string | null
  onSubmit: (sub: Submission) => void
  currentRecruiterName: string
}

export function SubmitCandidateModal({
  isOpen,
  onClose,
  requirements,
  selectedReqId,
  onSubmit,
  currentRecruiterName,
}: SubmitCandidateModalProps) {
  // Path Switcher: 'existing' (Path 1) vs 'new' (Path 2)
  const [pathMode, setPathMode] = useState<'existing' | 'new'>('existing')

  // Selected Target Requirement
  const [targetReqId, setTargetReqId] = useState(selectedReqId || (requirements[0]?.id ?? 'REQ-001'))

  // Path 1 State (Search Existing)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRepoItem | null>(SAMPLE_EXISTING_CANDIDATES[0])

  // Path 2 State (Add New Candidate via Resume Upload)
  const [newCandidateName, setNewCandidateName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newExperience, setNewExperience] = useState('')
  const [newCompany, setNewCompany] = useState('')
  const [newSkills, setNewSkills] = useState('')
  const [resumeName, setResumeName] = useState<string | null>(null)
  const [isParsing, setIsParsing] = useState(false)

  if (!isOpen) return null

  const targetReq = requirements.find(r => r.id === targetReqId) || requirements[0]

  // Filter existing candidates based on search
  const filteredCandidates = SAMPLE_EXISTING_CANDIDATES.filter(c => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase().trim()
    return (
      c.name.toLowerCase().includes(q) ||
      c.technology.toLowerCase().includes(q) ||
      c.skills.toLowerCase().includes(q) ||
      c.currentCompany.toLowerCase().includes(q)
    )
  })

  // Resume Auto-Parse Simulation for Path 2
  const handleSimulateResumeUpload = (fileLabel?: string) => {
    const filename = fileLabel || 'Anish_Malhotra_Senior_React_Dev_Resume.pdf'
    setResumeName(filename)
    setIsParsing(true)

    setTimeout(() => {
      setNewCandidateName('Anish Malhotra')
      setNewEmail('anish.malhotra@devnet.io')
      setNewPhone('+91 98123 45678')
      setNewExperience('6 Years 2 Months')
      setNewCompany('Wipro Limited')
      setNewSkills('React.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL')
      setIsParsing(false)
    }, 600)
  }

  // Handle Submission for Path 1 (Existing Candidate)
  const handleSubmitExisting = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCandidate) return

    const newSub: Submission = {
      id: `SUB-${Math.floor(Math.random() * 900 + 100)}`,
      candidate: selectedCandidate.name,
      req: targetReqId,
      client: targetReq?.client || 'Enterprise Client',
      date: 'Aug 19, 2026',
      stage: 'Submitted',
      match: '94%',
      recruiter: currentRecruiterName || 'Marcus Chen',
      email: selectedCandidate.email,
      phone: selectedCandidate.phone,
      experience: selectedCandidate.totalExperience,
    }

    onSubmit(newSub)
    onClose()
  }

  // Handle Submission for Path 2 (New Candidate)
  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCandidateName) return

    const newSub: Submission = {
      id: `SUB-${Math.floor(Math.random() * 900 + 100)}`,
      candidate: newCandidateName,
      req: targetReqId,
      client: targetReq?.client || 'Enterprise Client',
      date: 'Aug 19, 2026',
      stage: 'Submitted',
      match: '96%',
      recruiter: currentRecruiterName || 'Marcus Chen',
      email: newEmail || 'new.candidate@devnet.io',
      phone: newPhone || '+91 98765 43210',
      experience: newExperience || '5 Years',
    }

    onSubmit(newSub)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* MODAL HEADER WITH REQUIREMENT BINDING */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6B3BF6]/10 text-[#6B3BF6] flex items-center justify-center border border-[#6B3BF6]/20 font-bold">
              <UserPlusIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight">Add Candidate to Requirement</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Targeting: <strong className="text-slate-800 font-bold">{targetReq?.id} — {targetReq?.title}</strong> ({targetReq?.client})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PATH TOGGLE TABS (PATH 1: EXISTING VS PATH 2: NEW) */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 bg-white flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPathMode('existing')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              pathMode === 'existing'
                ? 'bg-[#6B3BF6] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Path 1: Search Existing Candidate</span>
          </button>

          <button
            type="button"
            onClick={() => setPathMode('new')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              pathMode === 'new'
                ? 'bg-[#6B3BF6] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Path 2: Add New Candidate</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* ========================================================================= */}
          {/* PATH 1: SEARCH & SUBMIT EXISTING CANDIDATE                                */}
          {/* ========================================================================= */}
          {pathMode === 'existing' && (
            <form onSubmit={handleSubmitExisting} className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate repository by name, technology, or skills..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
                />
              </div>

              {/* Candidate Selection List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {filteredCandidates.map(c => {
                  const isSelected = selectedCandidate?.id === c.id
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCandidate(c)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#6B3BF6] bg-purple-50/50 shadow-2xs'
                          : 'border-slate-200/80 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-xs truncate">{c.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">ID: {c.candidateId}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-700 truncate">{c.technology}</div>
                        <div className="text-[11px] text-slate-500 font-medium truncate">
                          {c.totalExperience} • {c.currentCompany}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {isSelected ? (
                          <span className="w-6 h-6 rounded-full bg-[#6B3BF6] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-lg hover:bg-slate-200">
                            Select
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Selected Candidate Quick Preview Box */}
              {selectedCandidate && (
                <div className="bg-[#EFF6FF] border border-[#C7D2FE] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#1E3A8A] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Ready to Submit to Client</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      94% Skill Match
                    </span>
                  </div>
                  <p className="text-xs text-[#1E3A8A]/80">
                    Candidate <strong>{selectedCandidate.name}</strong> will be submitted for <strong>{targetReq?.id} — {targetReq?.title}</strong> ({targetReq?.client}).
                  </p>
                </div>
              )}

              {/* Footer Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedCandidate}
                  className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] disabled:opacity-50 text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer active:scale-98 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Client</span>
                </button>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* PATH 2: UPLOAD RESUME & SUBMIT NEW CANDIDATE                              */}
          {/* ========================================================================= */}
          {pathMode === 'new' && (
            <form onSubmit={handleSubmitNew} className="space-y-4">
              {/* Resume Upload Drag & Drop Area */}
              <div
                onClick={() => handleSimulateResumeUpload()}
                className="p-5 border-2 border-dashed border-slate-300 hover:border-[#6B3BF6] rounded-2xl bg-slate-50 hover:bg-purple-50/40 transition-all text-center cursor-pointer space-y-1.5"
              >
                <Upload className="w-7 h-7 text-[#6B3BF6] mx-auto" />
                <div className="text-xs font-extrabold text-slate-900">
                  {resumeName ? `Attached: ${resumeName}` : 'Click or Drag & Drop Candidate Resume (PDF/DOCX)'}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {isParsing ? '⚡ Automatically parsing candidate skills...' : 'AI Parser automatically extracts contact info, experience & technology'}
                </div>
              </div>

              {/* Auto-Populated Candidate Preview Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Candidate Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anish Malhotra"
                    value={newCandidateName}
                    onChange={e => setNewCandidateName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="anish.m@gmail.com"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98123 45678"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 Years"
                    value={newExperience}
                    onChange={e => setNewExperience(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Current Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Wipro Limited"
                    value={newCompany}
                    onChange={e => setNewCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Technology & Primary Skills</label>
                  <input
                    type="text"
                    placeholder="e.g. React.js, TypeScript, Node.js"
                    value={newSkills}
                    onChange={e => setNewSkills(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                  />
                </div>
              </div>

              {/* Footer Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newCandidateName}
                  className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] disabled:opacity-50 text-white text-xs font-extrabold rounded-xl shadow-md transition-all cursor-pointer active:scale-98 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Client</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v6m3-3h-6m-2 3a6 6 0 11-12 0 6 6 0 0112 0zM12 14a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  )
}
