import React, { useState } from 'react'
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  X,
  FileText,
  Building,
  Mail,
  User,
  Layers,
  Sparkles,
  ChevronDown,
  RotateCcw,
  GripVertical,
  Eye,
  EyeOff,
  Send,
  Sliders,
} from 'lucide-react'

import { Requirement } from '../../types'

interface SubmitToLeadPageProps {
  selectedCandidates?: any[]
  requirement?: Requirement | null
  onBack: () => void
  onSubmitSuccess?: () => void
}

export function SubmitToLeadPage({
  selectedCandidates = [],
  requirement = null,
  onBack,
  onSubmitSuccess,
}: SubmitToLeadPageProps) {
  // Destination Checkboxes
  const [submitToLeadChecked, setSubmitToLeadChecked] = useState(true)
  const [forwardLoopChecked, setForwardLoopChecked] = useState(true)
  const [clientName, setClientName] = useState(
    requirement?.client || 'Metaforge Client'
  )

  // Thread Subject
  const [threadSubject, setThreadSubject] = useState(
    requirement
      ? `${requirement.id} — ${requirement.title} (${requirement.client})`
      : 'Candidate Profile Submission'
  )

  // From Recruiter
  const [recruiterName, setRecruiterName] = useState('Harish Gadipally')
  const [recruiterEmail, setRecruiterEmail] = useState('harish.g@metaforgeit.com')

  // Recipients
  const [toRecipients, setToRecipients] = useState([
    'Nikitha.S@Ltts.com',
    'Deepashree.Bc_ext@Ltts.com',
    'Bowya.Bowya_ext@Ltts.com',
  ])
  const [ccRecipients, setCcRecipients] = useState([
    'Ashwini.Kudi@Ltts.com',
    'Kallol.Chakraborty@Ltts.com',
  ])
  const [newToInput, setNewToInput] = useState('')
  const [newCcInput, setNewCcInput] = useState('')

  // Lead Email & Introduction
  const [leadEmail, setLeadEmail] = useState('lead@company.com')
  const [emailGreeting, setEmailGreeting] = useState('Dear Team,')
  const [introduction, setIntroduction] = useState(
    'I hope you are doing well.\n\nPlease find below the candidate profile submitted for your review against the discussed requirement.\n\nKindly review the profile and share your feedback. We will be happy to coordinate the next steps based on your evaluation.'
  )

  // Custom Column Adder
  const [customColName, setCustomColName] = useState('')
  const [customColPosition, setCustomColPosition] = useState('At start')
  const [headerColor, setHeaderColor] = useState('#FFFF00')

  const [confirmForwardChecked, setConfirmForwardChecked] = useState(true)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleAddToRecipient = () => {
    if (newToInput.trim() && newToInput.includes('@')) {
      setToRecipients([...toRecipients, newToInput.trim()])
      setNewToInput('')
    }
  }

  const handleAddCcRecipient = () => {
    if (newCcInput.trim() && newCcInput.includes('@')) {
      setCcRecipients([...ccRecipients, newCcInput.trim()])
      setNewCcInput('')
    }
  }

  const handleRemoveTo = (email: string) => {
    setToRecipients(toRecipients.filter(e => e !== email))
  }

  const handleRemoveCc = (email: string) => {
    setCcRecipients(ccRecipients.filter(e => e !== email))
  }

  const handleSubmitFinal = () => {
    showToast('Submission successfully sent to Lead & forwarded in client loop!')
    if (onSubmitSuccess) {
      setTimeout(() => onSubmitSuccess(), 1200)
    } else {
      setTimeout(() => onBack(), 1200)
    }
  }

  return (
    <div className="space-y-6 w-full pb-24 font-sans text-slate-800 animate-in fade-in duration-200">
      {/* 1. TOP NAVIGATION HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Submission to Client</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit candidates for <strong className="text-slate-800">TPC - Requirement - C# Automation - Bangalore /Mysore - Embedded</strong> at Kallol.Chakraborty@Ltts.com
          </p>
        </div>
      </div>

      {/* 2. CARD 1: SUBMISSION DESTINATION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Submission destination</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose what to do — you can select one or both. Submit to Lead counts in metrics; forward to the loop does not add a second submission.
          </p>
        </div>

        {/* CHECKBOX CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Submit to Lead */}
          <label
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              submitToLeadChecked
                ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-500/20'
                : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <input
              type="checkbox"
              checked={submitToLeadChecked}
              onChange={e => setSubmitToLeadChecked(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
            />
            <div>
              <div className="text-xs font-extrabold text-slate-900">Submit to Lead</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Send to lead review email. <strong className="text-slate-800">Counts as one submission.</strong>
              </div>
            </div>
          </label>

          {/* Option 2: Forward to original requirement loop */}
          <label
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
              forwardLoopChecked
                ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-500/20'
                : 'bg-slate-50/60 border-slate-200'
            }`}
          >
            <input
              type="checkbox"
              checked={forwardLoopChecked}
              onChange={e => setForwardLoopChecked(e.target.checked)}
              className="mt-1 w-4 h-4 text-amber-600 rounded-md focus:ring-amber-500 cursor-pointer"
            />
            <div>
              <div className="text-xs font-extrabold text-slate-900">Forward to original requirement loop</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Reply in the client/DL email thread. <strong className="text-slate-800">Not a separate submission.</strong>
              </div>
            </div>
          </label>
        </div>

        {/* CLIENT SELECTOR */}
        <div className="w-full max-w-sm">
          <label className="block text-slate-700 font-bold text-xs mb-1.5">Client</label>
          <select
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="LTTS / L&T">LTTS / L&T</option>
            <option value="Continental Automotive">Continental Automotive</option>
            <option value="Bosch Global">Bosch Global</option>
          </select>
        </div>

        {/* HOW THE EMAIL LOOP CONNECTS BOX */}
        <div className="bg-blue-50/50 border border-blue-200/80 rounded-2xl p-4 text-xs text-slate-700 space-y-1.5">
          <span className="font-extrabold text-blue-900 block mb-1">How the email loop connects</span>
          <p className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>Auto-ingested requirements</strong> — the app stores the Microsoft Graph message ID from the <span className="text-emerald-700 underline font-bold">linked mailbox message (ready)</span>.</span>
          </p>
          <p className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>Manually created requirements</strong> — paste the exact original subject below and click <strong>Find email thread</strong>. The app searches <span className="font-mono text-slate-900">recruitment.application@metaforgeit.com</span> and saves the link on this requirement.</span>
          </p>
          <p className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>On forward</strong> — the app calls Microsoft Graph <span className="font-mono text-slate-900">createReplyAll</span> on that message so your submission appears in the same client/DL thread (not a new email).</span>
          </p>
        </div>

        {/* THREAD SUBJECT */}
        <div>
          <label className="block text-slate-700 font-bold text-xs mb-1">THREAD SUBJECT</label>
          <input
            type="text"
            value={threadSubject}
            onChange={e => setThreadSubject(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-xs font-semibold text-blue-950 focus:outline-none focus:border-blue-500"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">
            Pre-filled from the original requirement. Edits apply to this reply; the message stays in the same email thread.
          </span>
        </div>

        {/* FROM RECRUITER GREEN BOX */}
        <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
            FROM Recruiter sending this submission
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold text-xs mb-1">Display name</label>
              <input
                type="text"
                value={recruiterName}
                onChange={e => setRecruiterName(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold text-xs mb-1">Reply-to email</label>
              <input
                type="email"
                value={recruiterEmail}
                onChange={e => setRecruiterEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none"
              />
            </div>
          </div>
          <p className="text-[10px] text-slate-500">
            Clients see <strong className="text-slate-800">{recruiterName}</strong> as the sender. Messages are delivered via <span className="font-mono text-slate-800">recruitment.application@metaforgeit.com</span>. When the client clicks <strong>Reply</strong>, the response goes to your reply-to email. <strong>Reply All</strong> keeps everyone in the original thread plus you on CC.
          </p>
        </div>

        {/* RECIPIENTS TO / CC / BCC CHIPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* TO Column */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">TO ({toRecipients.length})</span>
            </div>
            <div className="space-y-1.5 min-h-[90px]">
              {toRecipients.map(e => (
                <div key={e} className="flex items-center justify-between px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
                  <span>{e}</span>
                  <button onClick={() => handleRemoveTo(e)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="email"
                placeholder="Add email..."
                value={newToInput}
                onChange={e => setNewToInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
              />
              <button onClick={handleAddToRecipient} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer">
                + Add
              </button>
            </div>
          </div>

          {/* CC Column */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">CC ({ccRecipients.length})</span>
            </div>
            <div className="space-y-1.5 min-h-[90px]">
              {ccRecipients.map(e => (
                <div key={e} className="flex items-center justify-between px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
                  <span>{e}</span>
                  <button onClick={() => handleRemoveCc(e)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="email"
                placeholder="Add email..."
                value={newCcInput}
                onChange={e => setNewCcInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
              />
              <button onClick={handleAddCcRecipient} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer">
                + Add
              </button>
            </div>
          </div>

          {/* BCC Column */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <span className="text-xs font-extrabold text-slate-900">BCC</span>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 my-auto">
              Drop recipients here
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="email"
                placeholder="Add email..."
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
              />
              <button className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer">
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CARD 2: LEAD REVIEW EMAIL & INTRODUCTION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900">Lead review email</h3>
          <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer">
            + Add lead email
          </button>
        </div>

        <div>
          <label className="block text-slate-700 font-bold text-xs mb-1">Lead email</label>
          <input
            type="email"
            value={leadEmail}
            onChange={e => setLeadEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-slate-700 font-bold text-xs">EMAIL GREETING</label>
            <button onClick={() => setEmailGreeting('Dear Team,')} className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">
              Reset from To recipients
            </button>
          </div>
          <input
            type="text"
            value={emailGreeting}
            onChange={e => setEmailGreeting(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-slate-700 font-bold text-xs">INTRODUCTION</label>
            <button onClick={() => setIntroduction('I hope you are doing well.')} className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">
              Reset to default
            </button>
          </div>
          <textarea
            rows={4}
            value={introduction}
            onChange={e => setIntroduction(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* 4. CARD 3: REQUIREMENT READ-ONLY SUMMARY */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Requirement</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ROLE</span>
            <span className="font-extrabold text-slate-900 block mt-1">
              TPC - Requirement - C# Automation - Bangalore /Mysore - Embedded
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CLIENT</span>
            <span className="font-bold text-blue-700 block mt-1">Kallol.Chakraborty@Ltts.com</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EXPERIENCE</span>
            <span className="font-bold text-slate-900 block mt-1">5-8 Years</span>
          </div>
        </div>

        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">SKILLS</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-200 inline-block">
            C# Automation - Bangalore /Mysore
          </span>
        </div>
      </div>

      {/* 5. CARD 4: ATTACH CANDIDATES */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Attach Candidates</h3>
            <p className="text-xs text-slate-500">Search and attach candidates for this requirement.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer">
            + Add Active Candidate
          </button>
          <button className="px-4 py-2 bg-blue-50 text-[#2563EB] font-extrabold text-xs rounded-xl border border-blue-200 cursor-pointer">
            Open Candidate Repository (checkboxes)
          </button>
        </div>

        {/* ATTACHED CANDIDATES LIST */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-extrabold text-slate-900 block">Attached Candidates (1 / 1)</span>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-slate-900 text-xs">Candidate (draft)</h4>
                <span className="text-[10px] font-mono text-slate-400">18016</span>
                <span className="text-[10px] text-blue-700 font-semibold">• pritishmalik8@gmail.com</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                Resume on file: <span className="underline">PritishMalikImmediateJoiner[11y_0m].pdf</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer">
                Replace resume
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. CARD 5: CLIENT SUBMISSION TRACKER TABLE & CUSTOMIZATION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Client submission tracker</h3>
          <p className="text-xs text-slate-500">
            LTTS / L&T layout: formal yellow header row and black grid. Review and edit before send — the same grid is embedded in the client email.
          </p>
        </div>

        {/* FORMAL YELLOW HEADER GRID TABLE */}
        <div className="border-2 border-slate-800 rounded-xl overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr style={{ backgroundColor: headerColor }} className="text-slate-950 font-black border-b-2 border-slate-800 text-[10px] uppercase">
                <th className="p-2.5 border-r-2 border-slate-800">SL.NO</th>
                <th className="p-2.5 border-r-2 border-slate-800">VENDOR NAME</th>
                <th className="p-2.5 border-r-2 border-slate-800">BU/IS</th>
                <th className="p-2.5 border-r-2 border-slate-800">POSITION/ TITLE</th>
                <th className="p-2.5 border-r-2 border-slate-800">SKILL</th>
                <th className="p-2.5 border-r-2 border-slate-800">RESUMES SENT DATE (DDMMYY)</th>
                <th className="p-2.5 border-r-2 border-slate-800">FULL NAME OF THE CANDIDATE</th>
                <th className="p-2.5 border-r-2 border-slate-800">LAST FULL TIME QUALIFICATION</th>
                <th className="p-2.5 border-r-2 border-slate-800">MOBILE NO</th>
                <th className="p-2.5">MAIL ID</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-800 font-semibold text-slate-900">
              <tr>
                <td className="p-2.5 border-r-2 border-slate-800">1</td>
                <td className="p-2.5 border-r-2 border-slate-800">MetaForge</td>
                <td className="p-2.5 border-r-2 border-slate-800"></td>
                <td className="p-2.5 border-r-2 border-slate-800">TPC - Requireme</td>
                <td className="p-2.5 border-r-2 border-slate-800">a world-wide manag</td>
                <td className="p-2.5 border-r-2 border-slate-800">12/08/26</td>
                <td className="p-2.5 border-r-2 border-slate-800">Candidate (draft)</td>
                <td className="p-2.5 border-r-2 border-slate-800">—</td>
                <td className="p-2.5 border-r-2 border-slate-800">+91966578</td>
                <td className="p-2.5">pritishmalik8@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TRACKER CUSTOMIZATION PANEL */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-4">
          <span className="text-xs font-extrabold text-slate-900 block">Tracker customization</span>

          {/* ADD CUSTOM COLUMN */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              ADD CUSTOM COLUMN
            </span>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Column name"
                value={customColName}
                onChange={e => setCustomColName(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
              />
              <select
                value={customColPosition}
                onChange={e => setCustomColPosition(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option value="At start">At start</option>
                <option value="At end">At end</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  if (customColName) {
                    showToast(`Custom column "${customColName}" inserted!`)
                    setCustomColName('')
                  }
                }}
                className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                + Insert
              </button>
            </div>
          </div>

          {/* COLUMN LAYOUT CHIPS */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                COLUMN LAYOUT (17 VISIBLE)
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Drag chips to reorder • eye icon to hide</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Sl.No', 'Vendor Name', 'BU/IS', 'Position/ Title', 'Skill', 'Resumes sent Date (DDMMYY)',
                'Full Name of the candidate', 'Last Full Time Qualification', 'MOBILE NO', 'Mail ID',
                'NP(Days)', 'Total Exp', 'Relevant Exp', 'Current Location', 'Job Location', 'Current Organization', 'Rate per Month'
              ].map(chip => (
                <span key={chip} className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-2xs">
                  <GripVertical className="w-3 h-3 text-emerald-600" />
                  <span>{chip}</span>
                  <Eye className="w-3.5 h-3.5 text-emerald-700 cursor-pointer" />
                </span>
              ))}
            </div>
          </div>

          {/* APPEARANCE HEADER COLOR */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">APPEARANCE</span>
              <span className="text-xs text-slate-600 font-medium">Header row color</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={headerColor}
                onChange={e => setHeaderColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
              />
              <input
                type="text"
                value={headerColor}
                onChange={e => setHeaderColor(e.target.value)}
                className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => showToast('Column layout & color preferences saved!')}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Save layout
            </button>
            <span className="text-[10px] text-slate-400">Confirm your column order and colors before sending</span>
          </div>
        </div>
      </div>

      {/* 7. CONFIRMATION CHECKBOX */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmForwardChecked}
            onChange={e => setConfirmForwardChecked(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-amber-600 rounded-md focus:ring-amber-500 cursor-pointer"
          />
          <span className="text-xs font-bold text-amber-950">
            I confirm these candidates should be forwarded in the original client requirement email thread.
          </span>
        </label>
        <p className="text-[10px] text-slate-500 pl-7">
          One submission will be recorded; lead email and client thread forward for: <strong>LTTS / L&T</strong>
        </p>
      </div>

      {/* 8. STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-8 shadow-2xl">
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
          <span className="text-xs font-bold text-slate-700">
            Submit 1 candidate(s) to lead and forward in the client loop.
          </span>

          <button
            onClick={handleSubmitFinal}
            className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer active:scale-98"
          >
            Submit to Lead & Forward
          </button>
        </div>
      </div>

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
