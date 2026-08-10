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
      label: 'Total',
      value: totalReqs,
      icon: FileText,
      bg: '#F4EFFE',
      borderColor: '#E9D8FD',
      iconBg: '#8B5CF6',
    },
    {
      key: 'SUBMISSIONS' as CardFilterType,
      label: 'Submissions',
      value: totalSubmissionsCount,
      icon: Send,
      bg: '#E6F8F0',
      borderColor: '#A7F3D0',
      iconBg: '#00BA7C',
    },
    {
      key: 'UNASSIGNED' as CardFilterType,
      label: 'Unassigned',
      value: unassignedCount,
      icon: UserX,
      bg: '#FDE8EC',
      borderColor: '#FECDD3',
      iconBg: '#FF3B68',
    },
    {
      key: 'ASSIGNED' as CardFilterType,
      label: 'Assigned',
      value: assignedCount,
      icon: UserCheck,
      bg: '#EBF3FF',
      borderColor: '#BFDBFE',
      iconBg: '#2F80ED',
    },
    {
      key: 'IN_PROGRESS' as CardFilterType,
      label: 'In Progress',
      value: inProgressCount,
      icon: Send,
      bg: '#FFF8E7',
      borderColor: '#FDE68A',
      iconBg: '#F2994A',
    },
    {
      key: 'INTERVIEWS' as CardFilterType,
      label: 'Interviews',
      value: totalInterviewsCount,
      icon: Video,
      bg: '#EEF2FF',
      borderColor: '#C7D2FE',
      iconBg: '#5B51D8',
    },
    {
      key: 'SELECTIONS' as CardFilterType,
      label: 'Selected',
      value: totalSelectionsCount,
      icon: CheckCircle2,
      bg: '#E6F8F0',
      borderColor: '#A7F3D0',
      iconBg: '#00BA7C',
    },
    {
      key: 'REJECTIONS' as CardFilterType,
      label: 'Rejected',
      value: totalRejectionsCount,
      icon: XCircle,
      bg: '#FDE8EC',
      borderColor: '#FECDD3',
      iconBg: '#FF3B68',
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              className={`relative group rounded-2xl border p-4 sm:p-5 transition-all duration-200 shadow-sm ${
                onSelectFilter ? 'cursor-pointer' : ''
              } ${
                isActive
                  ? 'ring-2 ring-blue-500 shadow-md transform -translate-y-0.5'
                  : 'hover:shadow-md hover:-translate-y-0.5'
              }`}
              style={{
                background: card.bg,
                borderColor: card.borderColor,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className="text-xs sm:text-sm font-semibold text-slate-700 block truncate"
                    title={card.label}
                  >
                    {card.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tabular-nums">
                    {card.value}
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm shrink-0 transition-transform group-hover:scale-105"
                  style={{ background: card.iconBg }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              {onSelectFilter && (
                <div className="mt-1 flex justify-end">
                  <span className="text-[10px] text-slate-500 font-medium">
                    {isActive ? 'Active Filter' : 'Click to filter'}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
