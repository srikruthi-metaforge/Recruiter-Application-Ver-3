import React, { useState } from 'react'
import { X, Send, User, Upload, CheckCircle2, Sparkles, DollarSign, Briefcase } from 'lucide-react'
import { Requirement, Submission } from '../../types'

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
  const [step, setStep] = useState<1 | 2>(1)
  const [targetReqId, setTargetReqId] = useState(selectedReqId || (requirements[0]?.id ?? 'REQ-001'))
  const [candidateName, setCandidateName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [experience, setExperience] = useState('7 years')
  const [matchScore, setMatchScore] = useState(92)
  const [resumeName, setResumeName] = useState<string | null>('Alex_Turner_Resume_2026.pdf')

  if (!isOpen) return null

  const targetReq = requirements.find(r => r.id === targetReqId) || requirements[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidateName) return

    const newSub: Submission = {
      id: `SUB-${Math.floor(Math.random() * 900 + 100)}`,
      candidate: candidateName,
      req: targetReqId,
      client: targetReq?.client || 'Enterprise Client',
      date: 'Aug 5, 2026',
      stage: 'Submitted',
      match: `${matchScore}%`,
      recruiter: currentRecruiterName,
      email: email || `${candidateName.toLowerCase().replace(/\s+/g, '.')}@dev.com`,
      phone: phone || '+1 555-0199',
      experience,
    }

    onSubmit(newSub)
    setStep(1)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-sans">Submit Candidate Profile</h3>
              <p className="text-xs text-slate-500 font-mono">Step {step} of 2 · AI Candidate Match Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold uppercase text-slate-600">Target Requirement</label>
                <select
                  value={targetReqId}
                  onChange={e => setTargetReqId(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono"
                >
                  {requirements.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.id} - {r.title} ({r.client})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold uppercase text-slate-600">Candidate Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={candidateName}
                  onChange={e => setCandidateName(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-semibold uppercase text-slate-600">Email Address</label>
                  <input
                    type="email"
                    placeholder="j.miller@dev.io"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-semibold uppercase text-slate-600">Years of Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 8 years"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Upload Drop Zone Simulation */}
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60 hover:bg-blue-50/40 hover:border-blue-300 transition-all text-center">
                <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-800 font-sans">
                  {resumeName ? `Attached: ${resumeName}` : 'Drag & Drop Resume PDF'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">Parsed automatically by AI Matcher</p>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!candidateName}
                  className="px-5 h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 font-sans"
                >
                  Next: AI Match Preview →
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: AI MATCH REVIEW */
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-md border border-indigo-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> TalentFlow AI Score
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{matchScore}% Match</span>
                </div>
                <p className="text-xs text-slate-300 font-body">
                  High competency match with <span className="font-semibold text-white">{targetReq?.title}</span> requirements.
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {targetReq?.skills?.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono rounded border border-emerald-500/30">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-semibold uppercase text-slate-600">Adjust Candidate Match Score</label>
                <input
                  type="range"
                  min="60"
                  max="99"
                  value={matchScore}
                  onChange={e => setMatchScore(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 h-10 text-xs font-mono text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-5 h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 font-sans"
                >
                  <CheckCircle2 className="w-4 h-4" /> Confirm & Submit Candidate
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
