import React, { useState } from 'react'
import {
  ArrowLeft,
  FileText,
  Pencil,
  Briefcase,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  User,
  Users,
  UserPlus,
  ChevronRight,
  ChevronDown,
  Search,
} from 'lucide-react'
import { Requirement } from '../../types'

interface RequirementDetailOverviewProps {
  requirement: Requirement
  onBack: () => void
  onOpenAssignModal?: () => void
  onEditRequirement?: () => void
  onAddCandidate?: () => void
}

export function RequirementDetailOverview({
  requirement,
  onBack,
  onOpenAssignModal,
  onEditRequirement,
  onAddCandidate,
}: RequirementDetailOverviewProps) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Pipeline' | 'Interviews' | 'Offers' | 'Activity'>('Overview')
  const [historyTabFilter, setHistoryTabFilter] = useState<'all' | 'submitted_lead' | 'submitted_client' | 'interview' | 'selected' | 'rejected'>('all')
  const [historySearchQuery, setHistorySearchQuery] = useState('')
  const [historyPage, setHistoryPage] = useState(1)
  const [assignTabFilter, setAssignTabFilter] = useState<'all' | 'active' | 'revoked'>('all')
  const [assignSearchQuery, setAssignSearchQuery] = useState('')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const isUnassigned = !requirement.owner || requirement.owner === 'Unassigned'

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Skills lists matching attached screenshot
  const mandatorySkills = [
    'Catia V6',
    'Door Panel design experience',
    'knowledge on complete door design',
    'packaging',
    'gaps',
    'other CAE',
    'Plant',
    'forming requirements',
    'Any',
  ]

  const generalSkills = [
    'Master section creation & validation',
    'Door mechanisms',
    'Hinges & handles',
    'Cross-functional collaboration (CFT)',
    'Manufacturing awareness',
    'Experienced in Design & Development of BIW Closures from the concept to mass production Design',
    'Design Considering the Package',
    'master sections',
    'styling',
    'vehicle regulation & performance',
    'Knowledge on Door Regulation for Asian and European market',
    'Worked in atleast two complete life cycle of Door design',
  ]

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-gray-800">
      {/* 1. TOP BAR WITH BACK BUTTON AND ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-2xs cursor-pointer w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onAddCandidate || (() => showToast('Opening Add Candidate modal...'))}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-2xs cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-gray-500" />
            <span>Add Candidate</span>
          </button>

          <button
            onClick={onEditRequirement || (() => showToast('Editing requirement details...'))}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-2xs cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
            <span>Edit Requirement</span>
          </button>
        </div>
      </div>

      {/* 2. HEADER BANNER WITH REQUIREMENT ID, PRIORITY, TITLE & SUBTEXT */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-2">
        {/* Top Badges Line */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-gray-800">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>{requirement.id}</span>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase border ${
              requirement.priority === 'High'
                ? 'bg-red-50 text-red-700 border-red-200'
                : requirement.priority === 'Medium'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            {requirement.priority}
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
              isUnassigned
                ? 'bg-gray-100 text-gray-600 border-gray-300'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}
          >
            {isUnassigned ? 'Unassigned' : (requirement.assignmentStatus || 'Submitted')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          {requirement.title}
        </h1>

        {/* Metadata sub-row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 font-medium pt-1">
          <span>{requirement.clientEmail ? requirement.clientEmail.split('@')[0] : 'harish'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>SLA remaining: <strong>{isUnassigned ? '10 days' : '0 days'}</strong></span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <span>{requirement.owner || 'Unassigned'}</span>
            {onOpenAssignModal && (
              <button
                onClick={onOpenAssignModal}
                className="text-blue-600 font-bold hover:underline cursor-pointer ml-1"
              >
                Reassign
              </button>
            )}
          </span>
        </div>
      </div>

      {/* 3. VIEW ONLY WARNING BANNER (IF UNASSIGNED) */}
      {isUnassigned && (
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 flex items-center gap-2.5 shadow-2xs">
          <Eye className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <strong className="font-bold mr-1.5">View only</strong>
            <span>This requirement is not assigned. Candidates cannot be added or submitted until it is assigned.</span>
          </div>
        </div>
      )}

      {/* 4. METRICS ROW (7 STAT CARDS MATCHING SCREENSHOT) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* TOTAL CANDIDATES */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            TOTAL CANDIDATES
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">
            {isUnassigned ? 0 : (requirement.submissions || 7)}
          </div>
        </div>

        {/* SUBMITTED */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            SUBMITTED
          </div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">
            {isUnassigned ? 0 : (requirement.submissions || 7)}
          </div>
        </div>

        {/* INTERVIEWING */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            INTERVIEWING
          </div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">
            {requirement.interviews || 0}
          </div>
        </div>

        {/* SELECTED */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            SELECTED
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {requirement.placed || 0}
          </div>
        </div>

        {/* REJECTED */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            REJECTED
          </div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">
            {requirement.rejections || 0}
          </div>
        </div>

        {/* OFFER RELEASED */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            OFFER RELEASED
          </div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">
            0
          </div>
        </div>

        {/* SLA REMAINING (DAYS) */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 shadow-2xs">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            SLA REMAINING (DAYS)
          </div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">
            {isUnassigned ? 10 : 0}
          </div>
        </div>
      </div>

      {/* SUGGESTIONS BOX (WHEN ASSIGNED) */}
      {!isUnassigned && (
        <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-3.5 text-xs text-blue-900 space-y-1 shadow-2xs">
          <div className="font-bold text-blue-950">Suggestions</div>
          <div className="flex items-center gap-2 text-blue-800 font-medium">
            <span>• • {requirement.submissions || 7} candidate(s) idle in Submitted for over 7 days.</span>
          </div>
        </div>
      )}

      {isUnassigned && (
        <div className="text-xs font-semibold text-gray-500 pl-1">
          SLA 10d left
        </div>
      )}

      {/* 5. RECRUITMENT PROGRESS CARD */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Recruitment Progress</h3>
        <div className="flex flex-wrap items-center gap-4 py-2">
          {/* Step 1: Assigned */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700">Assigned</span>
          </div>

          <div className="w-10 sm:w-12 h-0.5 bg-emerald-500"></div>

          {/* Step 2: Sourcing */}
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs ${
              !isUnassigned ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white font-bold text-xs'
            }`}>
              {!isUnassigned ? <CheckCircle className="w-4 h-4" /> : '●'}
            </div>
            <span className={`text-[11px] font-bold ${!isUnassigned ? 'text-emerald-700' : 'text-blue-600'}`}>Sourcing</span>
          </div>

          {!isUnassigned && (
            <>
              <div className="w-10 sm:w-12 h-0.5 bg-emerald-500"></div>

              {/* Step 3: Submitted to Lead */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-emerald-700">Submitted to Lead</span>
              </div>

              <div className="w-10 sm:w-12 h-0.5 bg-emerald-500"></div>

              {/* Step 4: Submitted to Client */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs font-bold text-xs">
                  ●
                </div>
                <span className="text-[11px] font-bold text-blue-600">Submitted to Client</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 6. TAB NAVIGATION BAR */}
      <div className="bg-slate-50/80 border border-gray-200/80 rounded-xl p-1.5 flex items-center gap-1">
        {(['Overview', 'Pipeline', 'Interviews', 'Offers', 'Activity'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-xs border border-gray-200/60'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 7. TAB CONTENT AREA */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* REQUIREMENT OVERVIEW GRID CARD (MATCHING SCREENSHOT 1 & 2) */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
              Requirement Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6 text-xs">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">REQUIREMENT ID</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.id}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">DEMAND RECEIVED DATE</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.emailArrivedTime || 'Jun 19, 2026, 05:30 AM'}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">INTERNAL POC (TO)</div>
                <div className="font-bold text-gray-900 mt-1">offshore demands</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">REQUIREMENT FROM</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.client}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CLIENT LEAD POC (FROM)</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.clientEmail ? requirement.clientEmail.split('@')[0] : 'harish'}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CLIENT POC (FROM/CC)</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.clientEmail ? requirement.clientEmail.split('@')[0] : 'harish'}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">JOB TITLE</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.title}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">JOB STATUS</div>
                <div className="font-bold text-gray-900 mt-1">{isUnassigned ? 'Unassigned' : (requirement.assignmentStatus || 'Submitted')}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CLOSED DATE</div>
                <div className="font-medium text-gray-700 mt-1">—</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TYPE OF DEMAND</div>
                <div className="font-bold text-gray-900 mt-1">Single</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PRIORITY</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.priority}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">NUMBER OF POSITIONS</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.openings || 1}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">RELEVANT EXPERIENCE</div>
                <div className="font-bold text-gray-900 mt-1">Entry Level</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">EMPLOYMENT TYPE</div>
                <div className="font-bold text-gray-900 mt-1">Full-time</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">BUDGET CURRENCY</div>
                <div className="font-bold text-gray-900 mt-1">INR</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">YEARLY BUDGET</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.budget || '₹5,000,000'}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">WORK MODE</div>
                <div className="font-bold text-gray-900 mt-1">On-site</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LOCATION</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.location || 'Remote, Hybrid, Onsite'}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">OVERALL EXPERIENCE</div>
                <div className="font-bold text-gray-900 mt-1">2-3 Years</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">NOTICE PERIOD</div>
                <div className="font-bold text-gray-900 mt-1">Not specified</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">OPEN SINCE</div>
                <div className="font-bold text-gray-900 mt-1">{requirement.emailArrivedTime || 'Jun 19, 2026 (52 days)'}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SLA</div>
                <div className="font-bold text-gray-900 mt-1">10 days</div>
              </div>
            </div>
          </div>

          {/* SKILLS CARD */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Skills</h3>

            <div className="space-y-2">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                MANDATORY SKILLS
              </div>
              <div className="flex flex-wrap gap-2">
                {mandatorySkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                SKILLS
              </div>
              <div className="flex flex-wrap gap-2">
                {generalSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ASSIGNMENT HISTORY CARD (MATCHING USER SCREENSHOT) */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Assignment history</h3>
                <p className="text-xs text-gray-500 font-normal mt-0.5">
                  Track who was assigned to this requirement and when. Updates when you Reassign or Revoke.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>4 active</span>
              </span>
            </div>

            {/* Filter Pills & Search Input Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <button
                  onClick={() => setAssignTabFilter('all')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    assignTabFilter === 'all'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>All</span>
                  <span className="px-1.5 py-0.2 bg-blue-200/60 text-blue-800 rounded-full text-[10px] font-extrabold">4</span>
                </button>

                <button
                  onClick={() => setAssignTabFilter('active')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    assignTabFilter === 'active'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Active</span>
                  <span className="px-1.5 py-0.2 bg-blue-200/60 text-blue-800 rounded-full text-[10px] font-extrabold">4</span>
                </button>

                <button
                  onClick={() => setAssignTabFilter('revoked')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    assignTabFilter === 'revoked'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Revoked</span>
                  <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px] font-extrabold">0</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search recruiter or assigner..."
                  value={assignSearchQuery}
                  onChange={e => setAssignSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800"
                />
              </div>
            </div>

            {/* Assignment Groups / List */}
            <div className="space-y-3 pt-2">
              {/* Group 1: 2 recruiters grouped */}
              <div className="border border-slate-200/80 rounded-2xl p-4 bg-white space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-gray-900 text-sm">2 recruiters</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-extrabold uppercase">
                          ACTIVE
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                        Assigned on 06/19/2026, 06:42 PM &nbsp; By <strong className="text-gray-600 font-semibold">Harish Gadipally</strong>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {/* Sub-cards inside (2 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                      CD
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-900 text-xs">Charlie Darwin</div>
                      <div className="text-[11px] text-gray-400 font-normal">charlie@metaforgeit.com</div>
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                      RK
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-900 text-xs">Raghu Karnam</div>
                      <div className="text-[11px] text-gray-400 font-normal">rkarnam@metaforgeit.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2: Saiteja Puttapaka */}
              <div className="border border-slate-200/80 rounded-2xl p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                    SP
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 text-xs">Saiteja Puttapaka</div>
                    <div className="text-[11px] text-gray-400 font-normal">saiteja.p@metaforgeit.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-gray-400 font-normal text-[11px]">
                    Assigned on 06/19/2026, 06:35 PM &nbsp; By <strong className="text-gray-600 font-semibold">Harish Gadipally</strong>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-extrabold uppercase">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Item 3: Harish Gadipally */}
              <div className="border border-slate-200/80 rounded-2xl p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                    HG
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 text-xs">Harish Gadipally</div>
                    <div className="text-[11px] text-gray-400 font-normal">harish.g@metaforgeit.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-gray-400 font-normal text-[11px]">
                    Assigned on 06/19/2026, 05:48 PM &nbsp; By <strong className="text-gray-600 font-semibold">Harish Gadipally</strong>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-extrabold uppercase">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* REQUIREMENT HISTORY CARD (MATCHING USER SCREENSHOT) */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Requirement History</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                All recruiter submissions for this requirement, newest first.
              </p>
            </div>

            {/* Top Metric Cards (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50/80 border border-gray-200/80 rounded-xl p-4 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">RECRUITERS WORKING</div>
                <div className="text-2xl font-extrabold text-gray-900">4</div>
              </div>

              <div className="bg-slate-50/80 border border-gray-200/80 rounded-xl p-4 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">RESUMES SUBMITTED</div>
                <div className="text-2xl font-extrabold text-gray-900">7</div>
              </div>

              <div className="bg-slate-50/80 border border-gray-200/80 rounded-xl p-4 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">BY STATUS</div>
                <div className="text-xs font-bold text-gray-800 flex flex-wrap gap-x-2 gap-y-1 pt-1">
                  <span>Lead review: <strong className="text-slate-900">0</strong></span>
                  <span className="text-gray-300">|</span>
                  <span>Client: <strong className="text-slate-900">7</strong></span>
                  <span className="text-gray-300">|</span>
                  <span>Interview: <strong className="text-slate-900">0</strong></span>
                  <span className="text-gray-300">|</span>
                  <span>Selected: <strong className="text-slate-900">0</strong></span>
                  <span className="text-gray-300">|</span>
                  <span>Rejected: <strong className="text-slate-900">0</strong></span>
                </div>
              </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                <button
                  onClick={() => setHistoryTabFilter('all')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    historyTabFilter === 'all'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>All</span>
                  <span className="px-1.5 py-0.2 bg-blue-200/60 text-blue-800 rounded-full text-[10px] font-extrabold">7</span>
                </button>

                <button
                  onClick={() => setHistoryTabFilter('submitted_lead')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    historyTabFilter === 'submitted_lead'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Submitted to Lead</span>
                  <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px] font-extrabold">0</span>
                </button>

                <button
                  onClick={() => setHistoryTabFilter('submitted_client')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    historyTabFilter === 'submitted_client'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Submitted to Client</span>
                  <span className="px-1.5 py-0.2 bg-blue-200/60 text-blue-800 rounded-full text-[10px] font-extrabold">7</span>
                </button>

                <button
                  onClick={() => setHistoryTabFilter('interview')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    historyTabFilter === 'interview'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Interview</span>
                  <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px] font-extrabold">0</span>
                </button>

                <button
                  onClick={() => setHistoryTabFilter('selected')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    historyTabFilter === 'selected'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Selected</span>
                  <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px] font-extrabold">0</span>
                </button>

                <button
                  onClick={() => setHistoryTabFilter('rejected')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                    historyTabFilter === 'rejected'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Rejected</span>
                  <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px] font-extrabold">0</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate or submitter..."
                  value={historySearchQuery}
                  onChange={e => setHistorySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800"
                />
              </div>
            </div>

            {/* Table Info Bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-1">
              <span>1-5 of 7 submissions</span>
              <span>Page {historyPage} of 2 - 5 per page</span>
            </div>

            {/* History Table */}
            <div className="border border-gray-200/80 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">SUBMISSION</th>
                    <th className="py-3 px-4">CANDIDATE</th>
                    <th className="py-3 px-4">SUBMITTED BY</th>
                    <th className="py-3 px-4">SUBMITTED ON</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-800 bg-white">
                  {[
                    {
                      subId: 'SUB-197',
                      avatar: 'MS',
                      name: 'MUNTAZAR SAYED',
                      email: 'sayedmuntazar1996@gmail.com',
                      submittedBy: 'Harish Gadipally',
                      submitterEmail: 'harish.g@metaforgeit.com',
                      submittedOn: '06/19/2026, 07:29 PM',
                      status: 'Submitted to Client',
                      canSchedule: true,
                    },
                    {
                      subId: 'SUB-196',
                      avatar: 'NJ',
                      name: 'Nikhil Joshte',
                      email: 'nikhiljoshte@gmail.com',
                      submittedBy: 'Harish Gadipally',
                      submitterEmail: 'harish.g@metaforgeit.com',
                      submittedOn: '06/19/2026, 07:29 PM',
                      status: 'Submitted to Client',
                      canSchedule: true,
                    },
                    {
                      subId: 'SUB-195',
                      avatar: 'PK',
                      name: 'Pratibha Kale',
                      email: 'pratibhakale13@yahoo.com',
                      submittedBy: 'Harish Gadipally',
                      submitterEmail: 'harish.g@metaforgeit.com',
                      submittedOn: '06/19/2026, 06:45 PM',
                      status: 'Submitted to Client',
                      canSchedule: true,
                    },
                    {
                      subId: 'SUB-194',
                      avatar: 'SY',
                      name: 'SANDEEP YADAV',
                      email: 'sandeep886441@gmail.com',
                      submittedBy: 'Saiteja Puttapaka',
                      submitterEmail: 'saiteja.p@metaforgeit.com',
                      submittedOn: '06/19/2026, 06:38 PM',
                      status: 'Submitted to Client',
                      canSchedule: false,
                    },
                    {
                      subId: 'SUB-193',
                      avatar: 'AS',
                      name: 'Akshay Soni',
                      email: 'akkisoni12123@gmail.com',
                      submittedBy: 'Harish Gadipally',
                      submitterEmail: 'harish.g@metaforgeit.com',
                      submittedOn: '06/19/2026, 06:33 PM',
                      status: 'Submitted to Client',
                      canSchedule: true,
                    },
                  ].map(row => (
                    <tr key={row.subId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-gray-600">
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[11px]">
                          {row.subId}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                            {row.avatar}
                          </div>
                          <div>
                            <div className="font-extrabold text-gray-900">{row.name}</div>
                            <div className="text-[11px] text-gray-400 font-normal">{row.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-gray-900">{row.submittedBy}</div>
                        <div className="text-[11px] text-gray-400 font-normal">{row.submitterEmail}</div>
                      </td>

                      <td className="py-3.5 px-4 text-gray-600 font-medium whitespace-nowrap">
                        {row.submittedOn}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-[11px] font-bold">
                          {row.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        {row.canSchedule ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => showToast(`Scheduling interview for ${row.name}...`)}
                              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold cursor-pointer shadow-2xs flex items-center gap-1 transition-all"
                            >
                              <Calendar className="w-3 h-3 text-blue-600" />
                              <span>Schedule</span>
                            </button>
                            <button
                              onClick={() => showToast(`Editing submission for ${row.name}...`)}
                              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
                              title="Edit submission"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium flex items-center justify-end gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>View only</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="flex items-center justify-between pt-2 text-xs text-gray-500 font-medium">
              <span>Showing submissions 1-5 on page {historyPage}</span>
              <div className="flex items-center gap-1.5 font-bold">
                <button
                  disabled={historyPage === 1}
                  onClick={() => setHistoryPage(1)}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  &lt; Previous
                </button>
                <button
                  onClick={() => setHistoryPage(1)}
                  className={`w-7 h-7 rounded-lg border text-xs cursor-pointer ${
                    historyPage === 1 ? 'border-blue-600 bg-blue-50 text-blue-700 font-extrabold' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setHistoryPage(2)}
                  className={`w-7 h-7 rounded-lg border text-xs cursor-pointer ${
                    historyPage === 2 ? 'border-blue-600 bg-blue-50 text-blue-700 font-extrabold' : 'border-gray-200 text-gray-600'
                  }`}
                >
                  2
                </button>
                <button
                  disabled={historyPage === 2}
                  onClick={() => setHistoryPage(2)}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PIPELINE TAB (MATCHING SCREENSHOT 2) */}
      {activeTab === 'Pipeline' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Candidate Pipeline</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Table view for high-volume tracking across all stages.
              </p>
            </div>
            <div className="bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>7 candidates</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-3 font-bold">CANDIDATE</th>
                  <th className="py-3 px-3 font-bold">EXPERIENCE</th>
                  <th className="py-3 px-3 font-bold">COMPANY</th>
                  <th className="py-3 px-3 font-bold">NOTICE</th>
                  <th className="py-3 px-3 font-bold">SUBMISSION STATUS</th>
                  <th className="py-3 px-2 font-bold text-center">L1</th>
                  <th className="py-3 px-2 font-bold text-center">L2</th>
                  <th className="py-3 px-2 font-bold text-center">FINAL</th>
                  <th className="py-3 px-2 font-bold text-center">OFFER LETTER</th>
                  <th className="py-3 px-3 font-bold">LAST ACTIVITY</th>
                  <th className="py-3 px-3 font-bold text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  {
                    name: 'MUNTAZAR SAYED',
                    exp: '8 Years 2 Months',
                    company: '—',
                    notice: '—',
                    status: 'Submitted to Client',
                    activity: '19/06/2026, 19:29',
                    action: 'Schedule Interview',
                  },
                  {
                    name: 'Nikhil Joshte',
                    exp: '10 Years 4 Months',
                    company: '—',
                    notice: '—',
                    status: 'Submitted to Client',
                    activity: '19/06/2026, 19:29',
                    action: 'Schedule Interview',
                  },
                  {
                    name: 'Pratibha Kale',
                    exp: '10 Years 5 Months',
                    company: '—',
                    notice: '—',
                    status: 'Submitted to Client',
                    activity: '19/06/2026, 18:45',
                    action: 'Schedule Interview',
                  },
                  {
                    name: 'SANDEEP YADAV',
                    exp: '13 Years 1 Month',
                    company: '—',
                    notice: '—',
                    status: 'Submitted to Client',
                    activity: '19/06/2026, 18:38',
                    action: 'View only',
                  },
                  {
                    name: 'Akshay Soni',
                    exp: '3 Years 6 Months',
                    company: '—',
                    notice: '—',
                    status: 'Submitted to Client',
                    activity: '19/06/2026, 18:33',
                    action: 'Schedule Interview',
                  },
                  {
                    name: 'Sima Borokar',
                    exp: '4 Years 5 Months',
                    company: '—',
                    notice: '—',
                    status: 'Submitted to Client',
                    activity: '19/06/2026, 17:56',
                    action: 'Schedule Interview',
                  },
                  {
                    name: 'Puttapaka Saiteja',
                    exp: '5 years',
                    company: 'Metaforge it solutions',
                    notice: '30 days ,last working 29 April 2026.',
                    status: 'Submitted to Client',
                    activity: '19/06/2026, 17:50',
                    action: 'Schedule Interview',
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                    <td className="py-3 px-3 font-bold text-gray-900 whitespace-nowrap">{row.name}</td>
                    <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{row.exp}</td>
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{row.company}</td>
                    <td className="py-3 px-3 text-gray-600 max-w-xs truncate">{row.notice}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-[11px] font-semibold">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-gray-400">—</td>
                    <td className="py-3 px-2 text-center text-gray-400">—</td>
                    <td className="py-3 px-2 text-center text-gray-400">—</td>
                    <td className="py-3 px-2 text-center text-gray-400">—</td>
                    <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{row.activity}</td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      {row.action === 'Schedule Interview' ? (
                        <button
                          onClick={() => showToast(`Scheduling interview for ${row.name}...`)}
                          className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs transition-all"
                        >
                          Schedule Interview
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">View only</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INTERVIEWS TAB (MATCHING SCREENSHOT 3) */}
      {activeTab === 'Interviews' && (
        <div className="space-y-6">
          {/* Card 1: Spec table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">Interview rounds (spec table)</h3>
              <p className="text-xs text-gray-400 font-normal mt-0.5">
                Rows from <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[11px]">interview_rounds</code>, dual-written from legacy interviews.
              </p>
            </div>
            <div className="text-xs text-gray-500 pt-2">
              No interview rounds yet — schedule from the pipeline.
            </div>
          </div>

          {/* Card 2: Legacy interviews */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-gray-900">Legacy interviews (API)</h3>
            <div className="text-xs text-gray-500 pt-1">
              No interviews scheduled yet for this requirement.
            </div>
          </div>
        </div>
      )}

      {/* OFFERS TAB (MATCHING SCREENSHOT 4) */}
      {activeTab === 'Offers' && (
        <div className="space-y-6">
          {/* Card 1: Offer management */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">Offer management (spec table)</h3>
              <p className="text-xs text-gray-400 font-normal mt-0.5">
                Rows from <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[11px]">offer_management</code>, dual-written from legacy offer letters.
              </p>
            </div>
            <div className="text-xs text-gray-500 pt-2">
              No offer rows yet.
            </div>
          </div>

          {/* Card 2: Legacy offer letters summary */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900">Legacy offer letters summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3 font-bold">CANDIDATE</th>
                    <th className="py-2.5 px-3 font-bold">STATUS</th>
                    <th className="py-2.5 px-3 font-bold">COMPENSATION</th>
                    <th className="py-2.5 px-3 font-bold">JOINING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <tr>
                    <td className="py-3.5 px-3 font-bold text-gray-900">MUNTAZAR SAYED</td>
                    <td className="py-3.5 px-3 text-gray-400">—</td>
                    <td className="py-3.5 px-3 text-gray-400">—</td>
                    <td className="py-3.5 px-3 text-gray-400">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY TAB (MATCHING SCREENSHOT 5) */}
      {activeTab === 'Activity' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">Activity & Audit</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Newest first — requirement lifecycle events.
              </p>
            </div>

            {/* 4 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50/80 border border-gray-100 rounded-xl p-4 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">REQUIREMENT</div>
                <div className="font-bold text-gray-900">{requirement.id}</div>
                <div className="text-[11px] text-gray-500">Created: 19/06/2026, 05:30</div>
                <div className="text-[11px] text-gray-500">Current status: <span className="font-semibold text-gray-800">Submitted</span></div>
              </div>

              <div className="bg-slate-50/80 border border-gray-100 rounded-xl p-4 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ASSIGNMENT</div>
                <div className="font-bold text-gray-900">4 active recruiters</div>
                <div className="text-[11px] text-gray-500">Assigned by: Harish Gadipally</div>
              </div>

              <div className="bg-slate-50/80 border border-gray-100 rounded-xl p-4 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SUBMISSIONS</div>
                <div className="font-bold text-gray-900">7 total</div>
                <div className="text-[11px] text-gray-500">Submitted: 7 &nbsp; Interview: 0 &nbsp; Selected: 0 &nbsp; Rejected: 0</div>
              </div>

              <div className="bg-slate-50/80 border border-gray-100 rounded-xl p-4 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">RECRUITERS WORKING</div>
                <div className="font-bold text-gray-900">2</div>
                <div className="text-[11px] text-gray-500">Harish Gadipally: 6 &nbsp; Saiteja Puttapaka: 1</div>
              </div>
            </div>

            {/* Event Timeline Feed */}
            <div className="space-y-4 pt-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                FRI, JUN 19, 2026
              </div>

              <div className="space-y-3">
                {[
                  { candidate: 'MUNTAZAR SAYED', time: '19/06/2026, 19:29' },
                  { candidate: 'Nikhil Joshte', time: '19/06/2026, 19:29' },
                  { candidate: 'Pratibha Kale', time: '19/06/2026, 18:45' },
                ].map((evt, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white shrink-0 mt-1.5"></div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-gray-900">Harish Gadipally submitted {evt.candidate} for {requirement.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span>{evt.time} · Harish Gadipally</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-extrabold rounded uppercase">SUBMISSION.CREATED</span>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex justify-between text-xs text-gray-600">
                        <span>Candidate: <strong className="text-gray-900">{evt.candidate}</strong></span>
                        <span>Status: <strong className="text-gray-900">SUBMITTED_TO_LEAD</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
