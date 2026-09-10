import React, { useState, useEffect } from 'react'
import { Clock, Activity, ShieldCheck, X, BarChart2, Info, ChevronRight, User } from 'lucide-react'
import {
  getRecruiterScreenTime,
  formatDuration,
  formatDurationShort,
  ScreenTimeRecord,
  screenTimeManager,
} from '../../utils/screenTimeTracker'

interface ScreenTimeWidgetProps {
  currentUserName: string
  currentUserRole: string
  compact?: boolean
}

export function ScreenTimeWidget({ currentUserName, currentUserRole, compact = false }: ScreenTimeWidgetProps) {
  const [record, setRecord] = useState<ScreenTimeRecord>(() => getRecruiterScreenTime(currentUserName))
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Start background tracking and subscribe to updates
  useEffect(() => {
    screenTimeManager.startTracking(currentUserName, currentUserRole)

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ScreenTimeRecord>
      if (customEvent.detail && customEvent.detail.userName === currentUserName) {
        setRecord(customEvent.detail)
      }
    }

    window.addEventListener('metaforge_screentime_update', handleUpdate)

    return () => {
      window.removeEventListener('metaforge_screentime_update', handleUpdate)
    }
  }, [currentUserName, currentUserRole])

  const totalSecs = record.activeSeconds + record.idleSeconds
  const activeRatio = totalSecs > 0 ? Math.round((record.activeSeconds / totalSecs) * 100) : 100

  return (
    <>
      {/* Live Badge Trigger */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer shadow-2xs group ${
          record.status === 'Active'
            ? 'bg-purple-50/80 hover:bg-purple-100/80 border-purple-200 text-purple-950'
            : 'bg-amber-50/80 hover:bg-amber-100/80 border-amber-200 text-amber-950'
        }`}
        title="Click to view full screen time & performance metrics"
      >
        <div className="relative flex items-center justify-center">
          <Clock className="w-3.5 h-3.5 text-[#6B3BF6]" />
          <span
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
              record.status === 'Active' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
            }`}
          />
          <span
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
              record.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-1 text-xs font-bold">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider hidden md:inline">
            Screen Time:
          </span>
          <span className="font-mono text-xs font-black text-[#6B3BF6]">
            {formatDurationShort(record.activeSeconds)}
          </span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[9px] font-black uppercase ${
              record.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {record.status}
          </span>
        </div>
      </button>

      {/* Screen Time & Application Usage Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 font-sans">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#6B3BF6]/10 text-[#6B3BF6] flex items-center justify-center font-extrabold text-base border border-[#6B3BF6]/20">
                  <Clock className="w-5 h-5 text-[#6B3BF6]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recruiter Screen Time Tracking</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    User: <strong className="text-slate-800 font-bold">{currentUserName}</strong> ({currentUserRole})
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Notice Banner */}
              <div className="bg-purple-50 border border-purple-200/80 rounded-2xl p-3.5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#6B3BF6] shrink-0 mt-0.5" />
                <p className="text-xs text-purple-950 font-medium leading-relaxed">
                  <strong>Notice of Usage & Performance Tracking:</strong> Application screen time is recorded for individual recruiter performance evaluations, attendance verification, and workload analysis.
                </p>
              </div>

              {/* Key Time Metrics Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Screen Time</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {formatDuration(record.activeSeconds)}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {activeRatio}% Active Ratio
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Idle / Inactive Time</span>
                  </div>
                  <div className="text-2xl font-black text-slate-700 font-mono">
                    {formatDuration(record.idleSeconds)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Pauses after 60s inactivity
                  </div>
                </div>
              </div>

              {/* Weekly Performance Overview */}
              <div className="border border-slate-200/80 rounded-2xl p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-[#6B3BF6]" />
                    Weekly Usage Timeline
                  </h3>
                  <span className="text-[11px] font-bold text-[#6B3BF6]">This Week</span>
                </div>

                <div className="space-y-2">
                  {[
                    { day: 'Mon', hours: '6h 30m', pct: 85 },
                    { day: 'Tue', hours: '7h 15m', pct: 92 },
                    { day: 'Wed (Today)', hours: formatDurationShort(record.activeSeconds), pct: activeRatio },
                    { day: 'Thu', hours: '—', pct: 0 },
                    { day: 'Fri', hours: '—', pct: 0 },
                  ].map((d, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{d.day}</span>
                        <span className="font-mono text-slate-900">{d.hours}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#6B3BF6] to-indigo-500 rounded-full transition-all duration-300"
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                Tracking status: <strong className="text-emerald-700 font-bold">Active & Recorded</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
