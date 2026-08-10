import React from 'react'
import { Requirement, Submission, Interview } from '../../types'
import {
  FileText,
  Send,
  UserX,
  UserCheck,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from 'lucide-react'

export type CardFilterType =
  | 'ALL'
  | 'SUBMISSIONS'
  | 'UNASSIGNED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'INTERVIEWS'
  | 'SELECTIONS'
  | 'REJECTIONS'

interface RequirementCardsGridProps {
  requirements: Requirement[]
  submissions?: Submission[]
  interviews?: Interview[]
  activeCardFilter?: CardFilterType
  onSelectFilter?: (filter: CardFilterType) => void
  title?: string
  badgeLabel?: string
}

export function RequirementCardsGrid({
  requirements = [],
  submissions = [],
  interviews = [],
  activeCardFilter = 'ALL',
  onSelectFilter,
  title = 'Requirements Overview',
  badgeLabel,
}: RequirementCardsGridProps) {
  // Compute dynamic 8 stats
  const totalReqs = requirements.length
  const totalSubmissionsCount = requirements.reduce(
    (acc, r) => acc + (r.submissions || 0),
    submissions.length
  )
  const unassignedCount = requirements.filter(
    r =>
      !r.owner ||
      r.owner === 'Unassigned' ||
      r.assignmentStatus === 'Unassigned'
  ).length
  const assignedCount = requirements.filter(
    r =>
      r.owner &&
      r.owner !== 'Unassigned' &&
      r.assignmentStatus !== 'Unassigned'
  ).length
  const inProgressCount = requirements.filter(
    r => r.status === 'Active' || r.assignmentStatus === 'In Progress'
  ).length
  const totalInterviewsCount = requirements.reduce(
    (acc, r) => acc + (r.interviews || 0),
    interviews.length
  )
  const totalSelectionsCount = requirements.reduce(
    (acc, r) => acc + (r.placed || r.selections || 0),
    0
  )
  const totalRejectionsCount = requirements.reduce(
    (acc, r) => acc + (r.rejections || 0),
    interviews.filter(i => i.status === 'Rejected').length
  )

  const cards = [
    {
      key: 'ALL' as CardFilterType,
      label: 'Totals requirements',
      value: totalReqs,
      icon: FileText,
      color: '#3B82F6',
      bgLight: '#EFF6FF',
      borderColor: '#93C5FD',
    },
    {
      key: 'SUBMISSIONS' as CardFilterType,
      label: 'Total submission',
      value: totalSubmissionsCount,
      icon: Send,
      color: '#6366F1',
      bgLight: '#EEF2FF',
      borderColor: '#A5B4FC',
    },
    {
      key: 'UNASSIGNED' as CardFilterType,
      label: 'Unassigned',
      value: unassignedCount,
      icon: UserX,
      color: '#F59E0B',
      bgLight: '#FEF3C7',
      borderColor: '#FCD34D',
    },
    {
      key: 'ASSIGNED' as CardFilterType,
      label: 'Assigned',
      value: assignedCount,
      icon: UserCheck,
      color: '#10B981',
      bgLight: '#ECFDF5',
      borderColor: '#6EE7B7',
    },
    {
      key: 'IN_PROGRESS' as CardFilterType,
      label: 'In progress',
      value: inProgressCount,
      icon: Clock,
      color: '#8B5CF6',
      bgLight: '#F5F3FF',
      borderColor: '#C4B5FD',
    },
    {
      key: 'INTERVIEWS' as CardFilterType,
      label: 'Total Interviews',
      value: totalInterviewsCount,
      icon: Video,
      color: '#0284C7',
      bgLight: '#E0F2FE',
      borderColor: '#7DD3FC',
    },
    {
      key: 'SELECTIONS' as CardFilterType,
      label: 'Total selection in interviews',
      value: totalSelectionsCount,
      icon: CheckCircle2,
      color: '#059669',
      bgLight: '#D1FAE5',
      borderColor: '#6EE7B7',
    },
    {
      key: 'REJECTIONS' as CardFilterType,
      label: 'Rejections in the Interveiws',
      value: totalRejectionsCount,
      icon: XCircle,
      color: '#EF4444',
      bgLight: '#FEE2E2',
      borderColor: '#FCA5A5',
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold tracking-tight text-gray-900 flex items-center gap-2">
          {title}
          {badgeLabel && (
            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
              {badgeLabel}
            </span>
          )}
        </h2>
        {activeCardFilter !== 'ALL' && onSelectFilter && (
          <button
            onClick={() => onSelectFilter('ALL')}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-md transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
        {cards.map(card => {
          const Icon = card.icon
          const isActive = activeCardFilter === card.key
          return (
            <div
              key={card.key}
              onClick={() => {
                if (onSelectFilter) {
                  onSelectFilter(isActive ? 'ALL' : card.key)
                }
              }}
              className={`relative group rounded-xl border p-4 transition-all duration-200 ${
                onSelectFilter ? 'cursor-pointer' : ''
              } ${
                isActive
                  ? 'ring-2 ring-blue-500 shadow-md transform -translate-y-0.5'
                  : 'hover:shadow-md hover:-translate-y-0.5'
              }`}
              style={{
                background: isActive ? card.bgLight : '#FFFFFF',
                borderColor: isActive ? card.borderColor : '#E2E8F0',
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold uppercase tracking-wider text-gray-500 truncate"
                  title={card.label}
                >
                  {card.label}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: card.bgLight,
                    color: card.color,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-gray-900 tabular-nums">
                  {card.value}
                </span>
                {onSelectFilter && (
                  <span className="text-[10px] text-gray-400 font-medium">
                    {isActive ? 'Active' : 'Click to filter'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
