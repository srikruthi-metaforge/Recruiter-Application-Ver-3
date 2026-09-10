import React from 'react'
import { Video, Clock } from 'lucide-react'
import { ScheduleRowItem } from './interviewTrackingData'

interface InterviewScheduleTableProps {
  schedules: ScheduleRowItem[]
  showToast: (msg: string) => void
}

export const InterviewScheduleTable: React.FC<InterviewScheduleTableProps> = ({
  schedules,
  showToast,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Scheduled Interviews</h3>
          <p className="text-xs text-slate-500 font-medium">Live candidate interview slots & meeting links</p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200">
          {schedules.length} Interviews Scheduled
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4">Candidate & Position</th>
              <th className="py-3.5 px-4">Client</th>
              <th className="py-3.5 px-4">Round</th>
              <th className="py-3.5 px-4">Date & Time</th>
              <th className="py-3.5 px-4">Mode / Meeting Link</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {schedules.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{item.candidateName}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{item.position}</div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-700">{item.company}</td>
                <td className="py-3.5 px-4 font-bold text-purple-700">{item.round}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700">{item.dateTime}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1 w-fit">
                    <Video className="w-3 h-3 text-blue-600" />
                    <span>{item.mode}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => showToast(`Launching meeting for ${item.candidateName}...`)}
                    className="px-3 py-1.5 bg-[#6B3BF6] hover:bg-[#5b2fe0] text-white font-bold rounded-xl text-xs flex items-center gap-1 ml-auto shadow-xs cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
