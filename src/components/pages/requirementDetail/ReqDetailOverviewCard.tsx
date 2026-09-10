import React from 'react'
import { Requirement } from '../../../types'

interface ReqDetailOverviewCardProps {
  requirement: Requirement
  isUnassigned: boolean
}

export const ReqDetailOverviewCard: React.FC<ReqDetailOverviewCardProps> = ({
  requirement,
  isUnassigned,
}) => {
  const mandatorySkills = [
    'Catia V6',
    'Door Panel design experience',
    'knowledge on complete door design',
    'packaging',
    'gaps',
    'other CAE',
    'Plant',
    'forming requirements',
    'Any',
  ]

  const generalSkills = [
    'Master section creation & validation',
    'Door mechanisms',
    'Hinges & handles',
    'Cross-functional collaboration (CFT)',
    'Manufacturing awareness',
    'Experienced in Design & Development of BIW Closures from concept to mass production Design',
    'Design Considering the Package',
    'master sections',
    'styling',
    'vehicle regulation & performance',
    'Knowledge on Door Regulation for Asian and European market',
    'Worked in atleast two complete life cycle of Door design',
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
          Requirement Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6 text-xs">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">REQUIREMENT ID</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.id}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">DEMAND RECEIVED DATE</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.emailArrivedTime || 'Jun 19, 2026, 05:30 AM'}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">REQUIREMENT FROM</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.client}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">JOB TITLE</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.title}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">JOB STATUS</div>
            <div className="font-bold text-gray-900 mt-1">{isUnassigned ? 'Unassigned' : (requirement.assignmentStatus || 'Submitted')}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PRIORITY</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.priority}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">NUMBER OF POSITIONS</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.openings || 1}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">YEARLY BUDGET</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.budget || '₹5,000,000'}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LOCATION</div>
            <div className="font-bold text-gray-900 mt-1">{requirement.location || 'Remote, Hybrid, Onsite'}</div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SLA</div>
            <div className="font-bold text-gray-900 mt-1">10 days</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Skills</h3>

        <div className="space-y-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            MANDATORY SKILLS
          </div>
          <div className="flex flex-wrap gap-2">
            {mandatorySkills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200/70">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            GENERAL SKILLS
          </div>
          <div className="flex flex-wrap gap-2">
            {generalSkills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200/70">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
