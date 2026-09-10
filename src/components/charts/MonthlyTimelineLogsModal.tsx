import React from 'react'
import { FileText } from 'lucide-react'
import { DetailLogItem } from './monthlyTimelineData'

interface MonthlyTimelineLogsModalProps {
  logs: DetailLogItem[]
  onClose: () => void
}

export function MonthlyTimelineLogsModal({ logs, onClose }: MonthlyTimelineLogsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-base font-extrabold text-slate-900">First Submission Timelines & Requirements Received Log</h3>
          </div>
          <button onClick={onClose} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl cursor-pointer">
            Close
          </button>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Req ID</th>
                <th className="py-2.5 px-3">Subject / Requirement</th>
                <th className="py-2.5 px-3">Recruiter</th>
                <th className="py-2.5 px-3">Received Time</th>
                <th className="py-2.5 px-3">Submitted Time</th>
                <th className="py-2.5 px-2 text-center">Positions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {logs.map(row => (
                <tr key={row.id} className="hover:bg-blue-50/60 transition-colors">
                  <td className="py-2 px-3 font-mono font-bold text-blue-600 shrink-0">{row.id}</td>
                  <td className="py-2 px-3 font-bold text-slate-900 max-w-[220px] truncate" title={row.subject}>{row.subject}</td>
                  <td className="py-2 px-3 font-semibold text-slate-700">{row.recruiter}</td>
                  <td className="py-2 px-3 text-slate-500 whitespace-nowrap">{row.receivedDate} ({row.receivedTime})</td>
                  <td className="py-2 px-3 text-emerald-600 font-semibold whitespace-nowrap">{row.submittedDate} ({row.submittedTime})</td>
                  <td className="py-2 px-2 text-center font-extrabold text-slate-800">{row.positions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
