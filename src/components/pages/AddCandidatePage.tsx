import React from 'react'
import { Candidate, Requirement } from '../../types'
import { PageHeader } from '../layout/PageHeader'
import { Users, Upload, FileText, CheckCircle, Bookmark, ArrowRight } from 'lucide-react'
import { useAddCandidateForm } from './addCandidate/useAddCandidateForm'
import { AddCandidateSingleForm } from './addCandidate/AddCandidateSingleForm'
import { AddCandidateBulkForm } from './addCandidate/AddCandidateBulkForm'

interface AddCandidatePageProps {
  requirements?: Requirement[]
  selectedReqId?: string | null
  onOpenRepository: () => void
  onAddCandidate?: (candidate: Candidate) => void
}

export function AddCandidatePage({
  requirements = [],
  selectedReqId = null,
  onOpenRepository,
  onAddCandidate,
}: AddCandidatePageProps) {
  const formState = useAddCandidateForm({ requirements, selectedReqId, onAddCandidate })

  return (
    <div className="w-full space-y-6 pb-20 font-sans text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Add New Candidate Profile"
          subtitle="Parse resume via AI, complete candidate profile details, or import candidate batch."
        />
        <button
          onClick={onOpenRepository}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <span>View Candidate Repository</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1 max-w-md">
        <button
          type="button"
          onClick={() => formState.setImportMode('single')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            formState.importMode === 'single'
              ? 'bg-[#6B3BF6] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Single Candidate Entry</span>
        </button>

        <button
          type="button"
          onClick={() => formState.setImportMode('bulk')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            formState.importMode === 'bulk'
              ? 'bg-[#6B3BF6] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Bulk Resume Upload</span>
        </button>

        <button
          type="button"
          onClick={() => formState.setImportMode('drafts')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            formState.importMode === 'drafts'
              ? 'bg-[#6B3BF6] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Drafts ({formState.draftsList.length})</span>
        </button>
      </div>

      {formState.importMode === 'single' ? (
        <AddCandidateSingleForm
          requirements={requirements}
          formState={formState}
          onCancel={onOpenRepository}
        />
      ) : (
        <AddCandidateBulkForm
          importMode={formState.importMode}
          draftsList={formState.draftsList}
          handleLoadDraft={formState.handleLoadDraft}
          handleRemoveDraft={formState.handleRemoveDraft}
          onOpenRepository={onOpenRepository}
        />
      )}

      {formState.showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Candidate profile saved and added to database successfully!</span>
        </div>
      )}

      {formState.showSaveDraftToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#6B3BF6] text-white px-5 py-3 rounded-2xl shadow-2xl border border-purple-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <Bookmark className="w-4 h-4 text-white" />
          <span>Profile saved to drafts list successfully!</span>
        </div>
      )}

      {formState.toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-600 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <span>{formState.toastMsg}</span>
        </div>
      )}
    </div>
  )
}
