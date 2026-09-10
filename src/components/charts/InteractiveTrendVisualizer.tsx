import React, { useState } from 'react'
import {
  ResponsiveContainer, ComposedChart, Area, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from 'recharts'
import { TrendingUp, Sparkles, Sliders } from 'lucide-react'
import { TrendDataPoint, TREND_DATA } from './trendVisualizerData'

export type { TrendDataPoint }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1 font-sans">
        <div className="font-extrabold text-blue-300 border-b border-slate-700 pb-1">{label} Performance</div>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex justify-between gap-6">
            <span style={{ color: entry.color }} className="font-bold">{entry.name}:</span>
            <span className="font-extrabold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function InteractiveTrendVisualizer() {
  const [data] = useState<TrendDataPoint[]>(TREND_DATA)
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area')
  const [metricView, setMetricView] = useState<'all' | 'submissions' | 'placements'>('all')

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Interactive Multi-Metric Trend Analysis
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">Interactive</span>
            </h2>
            <p className="text-xs text-slate-500">Historical performance trajectory across sourcing, interviewing, and placement conversions</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
            {(['area', 'bar', 'line'] as const).map(type => (
              <button key={type} type="button" onClick={() => setChartType(type)} className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${chartType === type ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/60'}`}>{type}</button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold">
            {(['all', 'submissions', 'placements'] as const).map(mv => (
              <button key={mv} type="button" onClick={() => setMetricView(mv)} className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${metricView === mv ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/60'}`}>{mv}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[360px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} iconType="circle" />
            {(metricView === 'all' || metricView === 'submissions') && (
              chartType === 'area' ? <Area dataKey="submissions" name="Submissions" fill="#818CF8" stroke="#4F46E5" fillOpacity={0.2} /> :
              chartType === 'bar' ? <Bar dataKey="submissions" name="Submissions" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={20} /> :
              <Line dataKey="submissions" name="Submissions" stroke="#4F46E5" strokeWidth={2.5} />
            )}
            {metricView === 'all' && <Line dataKey="interviews" name="Interviews" stroke="#F59E0B" strokeWidth={2.5} />}
            {(metricView === 'all' || metricView === 'placements') && <Bar dataKey="placements" name="Placements" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={16} />}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
