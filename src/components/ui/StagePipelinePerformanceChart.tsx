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
import { Layers, Users } from 'lucide-react'

export interface StageMetric {
  stage: string
  stageName: string
  requirementsCount: number
  submissionsCount: number
  placedCount: number
  closuresCount: number
  conversionPct: string
}

const STAGE_PIPELINE_DATA: StageMetric[] = [
  {
    stage: 'L1',
    stageName: 'Technical Round 1 (L1)',
    requirementsCount: 18,
    submissionsCount: 42,
    placedCount: 12,
    closuresCount: 8,
    conversionPct: '100%',
  },
  {
    stage: 'L2',
    stageName: 'Technical Round 2 (L2)',
    requirementsCount: 14,
    submissionsCount: 28,
    placedCount: 9,
    closuresCount: 6,
    conversionPct: '66.7%',
  },
  {
    stage: 'L3',
    stageName: 'Managerial / Architecture (L3)',
    requirementsCount: 10,
    submissionsCount: 18,
    placedCount: 6,
    closuresCount: 4,
    conversionPct: '42.8%',
  },
  {
    stage: 'Final',
    stageName: 'Client Final / HR Round',
    requirementsCount: 6,
    submissionsCount: 12,
    placedCount: 4,
    closuresCount: 3,
    conversionPct: '28.5%',
  },
]

const CustomStageTooltip = ({ active, payload }: any) => {
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
            <span className="font-extrabold tabular-nums text-white">{dataObj.requirementsCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-lime-400 font-bold">Submissions:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.submissionsCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-amber-400 font-bold">Placed:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.placedCount ?? 0}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-purple-400 font-bold">Closures:</span>
            <span className="font-extrabold tabular-nums text-white">{dataObj.closuresCount ?? 0}</span>
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

import { Role } from '../../types'

export interface StagePipelinePerformanceChartProps {
  role?: Role
}

export function StagePipelinePerformanceChart({ role = 'lead' }: StagePipelinePerformanceChartProps) {
  const [leadChartView, setLeadChartView] = useState<'individual' | 'team'>('individual')
  const [data] = useState<StageMetric[]>(STAGE_PIPELINE_DATA)

  const totalReqs = data.reduce((acc, curr) => acc + (Number(curr.requirementsCount) || 0), 0)
  const totalSubs = data.reduce((acc, curr) => acc + (Number(curr.submissionsCount) || 0), 0)
  const totalPlaced = data.reduce((acc, curr) => acc + (Number(curr.placedCount) || 0), 0)
  const totalClosures = data.reduce((acc, curr) => acc + (Number(curr.closuresCount) || 0), 0)

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
              {role === 'lead'
                ? leadChartView === 'individual'
                  ? 'Lead Individual Pipeline: Requirements & Candidate Submissions by Interview Stage'
                  : 'Team Members Comparison: Interview Stage Pipeline Breakdown'
                : 'Requirements and Candidate Submissions by Interview Stage'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {role === 'lead'
              ? leadChartView === 'individual'
                ? 'Individual recruitment pipeline progression across L1, L2, L3, and Final rounds for Harish Gadipally'
                : 'Team members pipeline progression comparison'
              : 'Recruitment pipeline progression showing candidate volume across L1, L2, L3, and Final rounds'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Lead View Mode Toggle (Lead Only) */}
          {role === 'lead' && (
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLeadChartView('individual')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  leadChartView === 'individual' ? 'bg-[#6B3BF6] text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Lead Individual Performance
              </button>
              <button
                type="button"
                onClick={() => setLeadChartView('team')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  leadChartView === 'team' ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Team Members Comparison
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. SUMMARY TABLE & BAR GRAPH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Summary Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-2.5">Stage</th>
                  <th className="py-3 px-2.5 text-right">Reqs</th>
                  <th className="py-3 px-2.5 text-right">Subs</th>
                  <th className="py-3 px-2.5 text-right">Placed</th>
                  <th className="py-3 px-2.5 text-right">Closures</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {data.map(row => (
                  <tr key={row.stage} className="hover:bg-purple-50/60 transition-colors">
                    <td className="py-3 px-2.5">
                      <div className="font-extrabold text-slate-900">{row.stage}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{row.stageName}</div>
                    </td>
                    <td className="py-3 px-2.5 text-right font-extrabold text-[#2563EB]">
                      {row.requirementsCount ?? 0}
                    </td>
                    <td className="py-3 px-2.5 text-right font-extrabold text-[#84CC16]">
                      {row.submissionsCount ?? 0}
                    </td>
                    <td className="py-3 px-2.5 text-right font-extrabold text-amber-600">
                      {row.placedCount ?? 0}
                    </td>
                    <td className="py-3 px-2.5 text-right font-extrabold text-purple-600">
                      {row.closuresCount ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 border-t border-slate-200 text-slate-900 font-extrabold">
                  <td className="py-2.5 px-2.5 text-xs">Total Pipeline</td>
                  <td className="py-2.5 px-2.5 text-right text-blue-700">{totalReqs}</td>
                  <td className="py-2.5 px-2.5 text-right text-lime-700">{totalSubs}</td>
                  <td className="py-2.5 px-2.5 text-right text-amber-700">{totalPlaced}</td>
                  <td className="py-2.5 px-2.5 text-right text-purple-700">{totalClosures}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right Column: Recharts Bar Graph */}
        <div className="lg:col-span-7 h-[300px] w-full pt-1">
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
                <linearGradient id="stagePlacedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                  <stop offset="100%" stopColor="#D97706" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="stageClosureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333EA" stopOpacity={1} />
                  <stop offset="100%" stopColor="#7E22CE" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomStageTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingTop: '10px' }} iconType="circle" />

              <Bar dataKey="requirementsCount" name="Requirements" fill="url(#stageReqGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="submissionsCount" name="Submissions" fill="url(#stageSubGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="placedCount" name="Placed" fill="url(#stagePlacedGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="closuresCount" name="Closures" fill="url(#stageClosureGrad)" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
