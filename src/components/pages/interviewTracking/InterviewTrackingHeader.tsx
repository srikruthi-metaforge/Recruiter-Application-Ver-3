import React from 'react'
import { CalendarRange, Plus, Video, CheckCircle2, UserX } from 'lucide-react'

interface InterviewTrackingHeaderProps {
  activeTab: 'schedules' | 'decisions' | 'rejections'
  setActiveTab: (tab: 'schedules' | 'decisions' | 'rejections') => void
  onOpenScheduleModal: () => void
}

export const InterviewTrackingHeader: React.FC<InterviewTrackingHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenScheduleModal,
}) => {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] flex items-center justify-center font-extrabold shadow-2xs">
            <CalendarRange className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Interview Tracking & Decisions</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage interview slots, video meeting links, final selections, and rejection archives.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenScheduleModal}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>+ Schedule Interview</span>
        </button>
      </div>

      {/* Tabs Selector */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200/80 w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('schedules')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'schedules'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Video className="w-4 h-4 text-[#6B3BF6]" />
          <span>Upcoming & Ongoing Schedules</span>
        </button>

        <button
          onClick={() => setActiveTab('decisions')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'decisions'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Final Decisions & Offers</span>
        </button>

        <button
          onClick={() => setActiveTab('rejections')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'rejections'
              ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserX className="w-4 h-4 text-rose-600" />
          <span>Rejection Archive</span>
        </button>
      </div>
    </div>
  )
}
