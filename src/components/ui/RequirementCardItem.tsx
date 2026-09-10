import React from 'react'
import { Calendar, Users, Building2, ChevronRight, Clock, Award } from 'lucide-react'
import { Requirement } from '../../types'

interface RequirementCardItemProps {
  req: Requirement
  onSelect?: (id: string) => void
  onOpenSubmit?: (id: string) => void
}

export function RequirementCardItem({ req, onSelect, onOpenSubmit }: RequirementCardItemProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-rose-100 text-rose-700 border-rose-200 font-extrabold'
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200 font-bold'
      default: return 'bg-blue-100 text-blue-700 border-blue-200 font-bold'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
            {req.id}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityStyle(req.priority)}`}>
            {req.priority} Priority
          </span>
        </div>

        <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
          {req.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{req.client}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Submissions</span>
            <span className="font-extrabold text-blue-600 tabular-nums">{req.submissions}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Interviews</span>
            <span className="font-extrabold text-purple-600 tabular-nums">{req.interviews}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Openings</span>
            <span className="font-extrabold text-slate-800 tabular-nums">{req.openings}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">{req.dueDate}</span>
          </div>
          {onOpenSubmit && (
            <button type="button" onClick={() => onOpenSubmit(req.id)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer">
              <span>Submit Candidate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
