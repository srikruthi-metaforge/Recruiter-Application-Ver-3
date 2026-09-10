import React from 'react'
import { X, User, Mail, Phone, Briefcase, Calendar, Building, DollarSign, Clock, MapPin, Eye, EyeOff } from 'lucide-react'
import { CandidateRepoItem, maskEmail, maskPhone, getCandidateSubmissionsHistory } from './candidateRepoData'

interface CandidateDetailModalProps {
  candidate: CandidateRepoItem | null
  unmaskedContactIds: Set<string>
  toggleUnmaskContact: (id: string) => void
  onClose: () => void
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  unmaskedContactIds,
  toggleUnmaskContact,
  onClose,
}) => {
  if (!candidate) return null

  const isUnmasked = unmaskedContactIds.has(candidate.id)
  const history = getCandidateSubmissionsHistory(candidate)

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                Candidate ID: {candidate.candidateId}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{candidate.name}</h3>
            <p className="text-xs text-slate-500 font-medium">{candidate.technology}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Info Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-mono font-bold text-slate-800">
              {isUnmasked ? candidate.email : maskEmail(candidate.email)}
            </span>
            <button onClick={() => toggleUnmaskContact(candidate.id)} className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer">
              {isUnmasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-purple-600" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-mono font-bold text-slate-800">
              {isUnmasked ? candidate.phone : maskPhone(candidate.phone)}
            </span>
            <button onClick={() => toggleUnmaskContact(candidate.id)} className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer">
              {isUnmasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-purple-600" />}
            </button>
          </div>
        </div>

        {/* Experience & Salary Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Experience</span>
            <span className="text-sm font-black text-slate-900">{candidate.totalExperience}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Current CTC</span>
            <span className="text-sm font-black text-slate-900">{candidate.currentCtc || 'N/A'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected CTC</span>
            <span className="text-sm font-black text-emerald-700">{candidate.expectedCtc || 'N/A'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Notice Period</span>
            <span className="text-sm font-black text-purple-700">{candidate.noticePeriod || 'N/A'}</span>
          </div>
        </div>

        {/* Submission History */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Submissions History ({history.count})</h4>
          {history.records.length === 0 ? (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
              No submissions recorded yet.
            </div>
          ) : (
            <div className="space-y-2">
              {history.records.map(rec => (
                <div key={rec.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{rec.client}</span>
                    <span className="text-slate-500 ml-2">— {rec.requirementTitle}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800">
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-extrabold cursor-pointer">
            Close Profile
          </button>
        </div>
      </div>
    </div>
  )
}
