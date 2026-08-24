import React, { useState } from 'react'
import { X } from 'lucide-react'

interface ScheduleInterviewModalProps {
  isOpen: boolean
  onClose: () => void
  initialSubmission?: string
  submissionsOptions?: Array<{ id: string; candidateName: string; requirement: string }>
  onScheduleSuccess?: (data: any) => void
}

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  initialSubmission = '',
  submissionsOptions = [],
  onScheduleSuccess,
}: ScheduleInterviewModalProps) {
  const getTodayDateString = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  // Form State matching attached screenshot
  const [submission, setSubmission] = useState(initialSubmission)
  const [interviewRound, setInterviewRound] = useState('L1 - Technical Round')
  const [date, setDate] = useState(getTodayDateString)
  const [time, setTime] = useState('10:00')
  const [interviewMode, setInterviewMode] = useState('Online')
  const [status, setStatus] = useState('Scheduled')
  const [meetingLink, setMeetingLink] = useState('')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [candidatePhone, setCandidatePhone] = useState('')
  const [sendEmail, setSendEmail] = useState(false)
  const [sendWhatsApp, setSendWhatsApp] = useState(false)
  const [notes, setNotes] = useState('')

  React.useEffect(() => {
    if (isOpen) {
      if (initialSubmission) setSubmission(initialSubmission)
      setDate(getTodayDateString())
    }
  }, [isOpen, initialSubmission])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const scheduleData = {
      submission: submission || 'Select submission',
      interviewRound,
      date,
      time,
      interviewMode,
      status,
      meetingLink,
      candidateEmail,
      candidatePhone,
      sendEmail,
      sendWhatsApp,
      notes,
    }

    if (onScheduleSuccess) {
      onScheduleSuccess(scheduleData)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 border border-slate-200 my-6 animate-in zoom-in-95 duration-150 font-sans text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Schedule New Interview
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Submission & Interview Round */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Submission</label>
              <select
                value={submission}
                onChange={e => setSubmission(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select submission
                </option>
                <option value="Siddharth Sunil — Java Full Stack Developer">
                  Siddharth Sunil — Java Full Stack Developer
                </option>
                <option value="Priyanka Sharma — Senior React Developer">
                  Priyanka Sharma — Senior React Developer
                </option>
                <option value="Vidyasagar Gade — SAP MM Specialist">
                  Vidyasagar Gade — SAP MM Specialist
                </option>
                <option value="Kanchan Meshram — AI Developer">
                  Kanchan Meshram — AI Developer
                </option>
                <option value="Arpit Srivastav — MIG Welding Engineer">
                  Arpit Srivastav — MIG Welding Engineer
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Interview Round</label>
              <select
                value={interviewRound}
                onChange={e => setInterviewRound(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="L1 - Technical Round">L1 - Technical Round</option>
                <option value="L2 - Technical Round">L2 - Technical Round</option>
                <option value="Managerial Round">Managerial Round</option>
                <option value="HR Screening Round">HR Screening Round</option>
                <option value="Final Round">Final Round</option>
              </select>
            </div>
          </div>

          {/* Row 2: Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Row 3: Interview Mode & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Interview Mode</label>
              <select
                value={interviewMode}
                onChange={e => setInterviewMode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="Online">Online</option>
                <option value="Offline / In-Person">Offline / In-Person</option>
                <option value="Telephonic">Telephonic</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#2563EB] cursor-pointer"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Rescheduled">Rescheduled</option>
              </select>
            </div>
          </div>

          {/* Row 4: Meeting Link (Optional) */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Meeting Link (Optional)</label>
            <input
              type="text"
              placeholder="https://meet.google.com/xxx-xxx-xxx"
              value={meetingLink}
              onChange={e => setMeetingLink(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Row 5: Candidate Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Candidate Email</label>
              <input
                type="email"
                placeholder="candidate@email.com"
                value={candidateEmail}
                onChange={e => setCandidateEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Candidate Phone</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={candidatePhone}
                onChange={e => setCandidatePhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Checkbox Section: Send Interview Schedule */}
          <div className="pt-2 space-y-2">
            <label className="block font-bold text-slate-800">Send Interview Schedule</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={e => setSendEmail(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />
                <span>Send via Email</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendWhatsApp}
                  onChange={e => setSendWhatsApp(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />
                <span>Send via WhatsApp</span>
              </label>
            </div>
          </div>

          {/* Notes Textarea */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Notes</label>
            <textarea
              rows={4}
              placeholder="Additional interview details, requirements, etc."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full p-3 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Footer Actions matching screenshot */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-sm transition-all cursor-pointer active:scale-98"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
