import React, { useState } from 'react'
import { X } from 'lucide-react'
import { ScheduleInterviewFormFields } from './scheduleInterview/ScheduleInterviewFormFields'

interface ScheduleInterviewModalProps {
  isOpen: boolean
  onClose: () => void
  initialSubmission?: string
  submissionsOptions?: Array<{ id: string; candidateName: string; requirement: string }>
  onScheduleSuccess?: (data: any) => void
  candidate?: any
  onSuccess?: () => void
}

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  initialSubmission = '',
  onScheduleSuccess,
  onSuccess,
}: ScheduleInterviewModalProps) {
  const getTodayDateString = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

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
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Schedule New Interview</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <ScheduleInterviewFormFields
            submission={submission}
            setSubmission={setSubmission}
            interviewRound={interviewRound}
            setInterviewRound={setInterviewRound}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            interviewMode={interviewMode}
            setInterviewMode={setInterviewMode}
            status={status}
            setStatus={setStatus}
            meetingLink={meetingLink}
            setMeetingLink={setMeetingLink}
            candidateEmail={candidateEmail}
            setCandidateEmail={setCandidateEmail}
            candidatePhone={candidatePhone}
            setCandidatePhone={setCandidatePhone}
            sendEmail={sendEmail}
            setSendEmail={setSendEmail}
            sendWhatsApp={sendWhatsApp}
            setSendWhatsApp={setSendWhatsApp}
            notes={notes}
            setNotes={setNotes}
          />

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
