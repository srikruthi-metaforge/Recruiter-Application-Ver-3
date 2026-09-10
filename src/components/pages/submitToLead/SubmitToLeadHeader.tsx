import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Requirement } from '../../../types'

interface SubmitToLeadHeaderProps {
  requirement?: Requirement | null
  onBack: () => void
}

export const SubmitToLeadHeader: React.FC<SubmitToLeadHeaderProps> = ({
  requirement,
  onBack,
}) => {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
      <button
        onClick={onBack}
        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
        title="Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Submission to Client</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Submit candidates for{' '}
          <strong className="text-slate-800">
            {requirement?.title || 'TPC - Requirement - C# Automation - Bangalore /Mysore - Embedded'}
          </strong>{' '}
          at Kallol.Chakraborty@Ltts.com
        </p>
      </div>
    </div>
  )
}
