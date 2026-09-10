import React from 'react'
import { X, User, Laptop } from 'lucide-react'
import { RecruiterLoginRecord } from './activityLogsData'

interface RecruiterLoginHistoryModalProps {
  rec: RecruiterLoginRecord | null
  onClose: () => void
}

export const RecruiterLoginHistoryModal: React.FC<RecruiterLoginHistoryModalProps> = ({
  rec,
  onClose,
}) => {
  if (!rec) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-sm border border-purple-200">
              {rec.userAvatar}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{rec.userName}</h3>
              <p className="text-xs text-slate-500 font-mono">{rec.userEmail}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">First Ever Login</span>
            <div className="font-bold text-slate-800">{rec.firstEverLoginTimestamp}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Current Session IP</span>
            <div className="font-mono font-bold text-purple-700">{rec.ipAddress}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Active Screen Time</span>
            <div className="font-bold text-emerald-700">{rec.activeScreenTime}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Session Duration</span>
            <div className="font-bold text-slate-900">{rec.sessionDuration}</div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Laptop className="w-4 h-4 text-slate-400" />
            <span>Device Info: <strong>{rec.deviceInfo}</strong></span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-extrabold cursor-pointer">
            Close Audit Inspector
          </button>
        </div>
      </div>
    </div>
  )
}
