import React, { useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { Layers, GitMerge, CheckCircle, Users } from 'lucide-react'

export interface StageMetric {
  stage: string
  stageName: string
  requirementsCount: number
  submissionsCount: number
  conversionPct: string
}

const STAGE_PIPELINE_DATA: StageMetric[] = [
  {
    stage: 'L1',
    stageName: 'Technical Round 1 (L1)',
    requirementsCount: 18,
    submissionsCount: 42,
    conversionPct: '100%',
  },
  {
    stage: 'L2',
    stageName: 'Technical Round 2 (L2)',
    requirementsCount: 14,
    submissionsCount: 28,
    conversionPct: '66.7%',
  },
  {
    stage: 'L3',
    stageName: 'Managerial / Architecture (L3)',
    requirementsCount: 10,
    submissionsCount: 18,
    conversionPct: '42.8%',
  },
  {
    stage: 'Final',
    stageName: 'Client Final / HR Round',
    requirementsCount: 6,
    submissionsCount: 12,
    conversionPct: '28.5%',
  },
]

const CustomStageTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0].payload as StageMetric
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans animate-in fade-in zoom-in-95 duration-150">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1 flex items-center justify-between gap-4">
          <span>Stage: {dataObj.stage}</span>
          <span className="text-[10px] text-slate-400 font-normal">{dataObj.stageName}</span>
        </div>
        <div className="space-y-1 text-[11px] font-medium pt-0.5">
          <div className="flex justify-between gap-4">
            <span className="text-blue-400 font-bold">Requirements:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.requirementsCount}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-emerald-400 font-bold">Submissions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.submissionsCount}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-purple-300 font-bold">
            <span>Pipeline Retention:</span>
            <span className="tabular-nums text-purple-300">{dataObj.conversionPct}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function StagePipelinePerformanceChart() {
  const [data] = useState<StageMetric[]>(STAGE_PIPELINE_DATA)

  const totalReqs = data.reduce((acc, curr) => acc + curr.requirementsCount, 0)
  const totalSubs = data.reduce((acc, curr) => acc + curr.submissionsCount, 0)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6 font-sans">
      {/* 1. CHART TITLE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6B3BF6]">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Requirements and Candidate Submissions by Interview Stage
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Recruitment pipeline progression showing candidate volume across L1, L2, L3, and Final rounds
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Total Active Pipeline: {totalSubs} candidates</span>
          </span>
        </div>
      </div>

      {/* 2. SUMMARY TABLE & BAR GRAPH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Summary Table */}
        <div className="lg:col-span-4 space-y-3">
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Stage</th>
                  <th className="py-3 px-3 text-right">Requirements</th>
                  <th className="py-3 px-3 text-right">Submissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.stage} className="hover:bg-purple-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-extrabold text-slate-900">{row.stage}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{row.stageName}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-[#2563EB]">
                      {row.requirementsCount}
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-[#84CC16]">
                      {row.submissionsCount}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t border-slate-200 text-slate-900 font-extrabold">
                  <td className="py-2.5 px-3 text-xs">Total Pipeline</td>
                  <td className="py-2.5 px-3 text-right text-blue-700">{totalReqs}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700">{totalSubs}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right Column: Recharts Bar Graph */}
        <div className="lg:col-span-8 h-[280px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="stageReqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="stageSubGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#84CC16" stopOpacity={1} />
                  <stop offset="100%" stopColor="#65A30D" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomStageTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />

              <Bar dataKey="requirementsCount" name="Requirements" fill="url(#stageReqGrad)" radius={[6, 6, 0, 0]} maxBarSize={40} />
              <Bar dataKey="submissionsCount" name="Submissions" fill="url(#stageSubGrad)" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
