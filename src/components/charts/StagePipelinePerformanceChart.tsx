import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { Layers } from 'lucide-react'
import { Role } from '../../types'
import { RecruiterStageMetric, STAGE_PIPELINE_DATA } from './stagePipelineData'
import { StagePipelineTable } from './StagePipelineTable'

export type { RecruiterStageMetric }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1 font-sans">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1">{label} Pipeline</div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-6"><span className="text-blue-400 font-bold">Submitted to Client:</span><span className="font-extrabold text-white">{d.submittedToClient}</span></div>
          <div className="flex justify-between gap-6"><span className="text-[#6B3BF6] font-bold">L1 Interview:</span><span className="font-extrabold text-white">{d.l1Interview}</span></div>
          <div className="flex justify-between gap-6"><span className="text-indigo-400 font-bold">L2 / Custom:</span><span className="font-extrabold text-white">{d.l2Interview + d.customClientInterview}</span></div>
          <div className="flex justify-between gap-6"><span className="text-emerald-400 font-bold">Placed:</span><span className="font-extrabold text-white">{d.placed}</span></div>
        </div>
      </div>
    )
  }
  return null
}

export interface StagePipelinePerformanceChartProps {
  role?: Role
}

export function StagePipelinePerformanceChart({ role = 'lead' }: StagePipelinePerformanceChartProps) {
  const [data] = useState<RecruiterStageMetric[]>(STAGE_PIPELINE_DATA)
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('table')

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Stage-Wise Candidate Pipeline Breakdown</h2>
            <p className="text-xs text-slate-500">Funnel tracking from sourcing, client submission, interviews (L1, L2, Custom), offer, to placement</p>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
          <button type="button" onClick={() => setViewMode('table')} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'table' ? 'bg-[#6B3BF6] text-white font-bold' : 'text-slate-600'}`}>Detailed Table</button>
          <button type="button" onClick={() => setViewMode('chart')} className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'chart' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'}`}>Funnel Chart</button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <StagePipelineTable data={data} />
      ) : (
        <div className="h-[380px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="recruiter" tick={{ fontSize: 9, fontWeight: 700, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} iconType="circle" />
              <Bar dataKey="submittedToClient" name="Sub to Client" fill="#2563EB" stackId="a" />
              <Bar dataKey="l1Interview" name="L1 Interview" fill="#6B3BF6" stackId="a" />
              <Bar dataKey="l2Interview" name="L2 Interview" fill="#818CF8" stackId="a" />
              <Bar dataKey="placed" name="Placed" fill="#10B981" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
