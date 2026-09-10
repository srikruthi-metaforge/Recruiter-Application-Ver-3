import React from 'react'
import { X, Briefcase, Users, FileText, UserCheck, Calendar } from 'lucide-react'
import { ClientRequirementItem } from './gapAnalysisData'

interface GapAnalysisDetailModalProps {
  req: ClientRequirementItem | null
  onClose: () => void
}

export const GapAnalysisDetailModal: React.FC<GapAnalysisDetailModalProps> = ({
  req,
  onClose,
}) => {
  if (!req) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-purple-700">{req.id}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-900">
                {req.domain}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">{req.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block">Positions</span>
            <span className="text-lg font-black text-slate-900">{req.positions}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block">Submissions</span>
            <span className="text-lg font-black text-emerald-700">{req.submissions}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 block">SPOC</span>
            <span className="text-sm font-bold text-slate-900">{req.spoc}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Candidate Interview Pipeline</h4>
          {req.interviews.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              No interview records logged for this requirement yet.
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {req.interviews.map((inv, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-slate-900">{inv.candidateName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      inv.stage === 'Final Select' ? 'bg-emerald-100 text-emerald-800' : inv.stage === 'L1 Reject' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inv.stage}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{inv.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-extrabold cursor-pointer">
            Close Drilldown
          </button>
        </div>
      </div>
    </div>
  )
}
