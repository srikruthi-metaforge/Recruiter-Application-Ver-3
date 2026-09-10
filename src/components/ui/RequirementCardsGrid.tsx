import React, { useState } from 'react'
import { Requirement } from '../../types'
import { RequirementCardItem } from './RequirementCardItem'
import { Search, Filter } from 'lucide-react'

export type CardFilterType = 'ALL' | 'ACTIVE' | 'CRITICAL' | 'COMPLETED' | 'ON_HOLD' | string

interface RequirementCardsGridProps {
  requirements: Requirement[]
  onSelectRequirement?: (reqId: string) => void
  onOpenSubmitCandidate?: (reqId: string) => void
}

export function RequirementCardsGrid({
  requirements,
  onSelectRequirement,
  onOpenSubmitCandidate,
}: RequirementCardsGridProps) {
  const [filterPriority, setFilterPriority] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filtered = requirements.filter(r => {
    if (filterPriority !== 'All' && r.priority !== filterPriority) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchTitle = r.title.toLowerCase().includes(q)
      const matchClient = r.client.toLowerCase().includes(q)
      const matchId = r.id.toLowerCase().includes(q)
      if (!matchTitle && !matchClient && !matchId) return false
    }
    return true
  })

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search requirements by title, client, or REQ ID..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-semibold">Priority:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {['All', 'High', 'Medium', 'Low'].map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filterPriority === p ? 'bg-white text-slate-900 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(req => (
          <RequirementCardItem
            key={req.id}
            req={req}
            onSelect={onSelectRequirement}
            onOpenSubmit={onOpenSubmitCandidate}
          />
        ))}
      </div>
    </div>
  )
}
