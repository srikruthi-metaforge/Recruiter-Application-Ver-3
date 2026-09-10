import React from 'react'
import { Upload, FileText, Play, Trash2, Bookmark } from 'lucide-react'
import { SavedDraftItem } from '../../../data/savedDraftsStore'

interface Props {
  importMode: 'bulk' | 'drafts'
  draftsList: SavedDraftItem[]
  handleLoadDraft: (item: SavedDraftItem) => void
  handleRemoveDraft: (id: string) => void
  onOpenRepository: () => void
}

export function AddCandidateBulkForm({
  importMode,
  draftsList,
  handleLoadDraft,
  handleRemoveDraft,
  onOpenRepository,
}: Props) {
  if (importMode === 'bulk') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6B3BF6] flex items-center justify-center mx-auto border border-purple-100 shadow-2xs">
          <Upload className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Bulk Resume Upload & Zip Ingestion</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 font-medium">
            Upload a ZIP archive containing multiple candidate resumes (.pdf, .docx). Metaforge AI will parse, score, and populate the candidate repository in batch.
          </p>
        </div>

        <div className="border-2 border-dashed border-purple-200 hover:border-[#6B3BF6] bg-purple-50/30 rounded-2xl p-8 max-w-xl mx-auto cursor-pointer transition-all">
          <FileText className="w-8 h-8 text-[#6B3BF6] mx-auto mb-2" />
          <span className="text-xs font-bold text-slate-800 block">Drag & Drop ZIP file or click to browse</span>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">Supports up to 50 resumes per batch</span>
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={onOpenRepository}
            className="px-5 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer transition-all"
          >
            View Candidate Repository
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Saved Draft Profiles</h3>
          <p className="text-xs text-slate-500 font-medium">Resume entries saved in local storage to finish later</p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] border border-purple-200 rounded-full text-xs font-extrabold">
          {draftsList.length} Drafts Saved
        </span>
      </div>

      {draftsList.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Bookmark className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <p className="font-bold text-xs">No saved drafts currently in progress.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Use "Save as Draft" while editing a single candidate form to save it here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {draftsList.map(item => (
            <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <div className="font-extrabold text-slate-900 text-xs">{item.candidateName}</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Company: <strong>{item.currentCompany || 'N/A'}</strong> • Email: {item.email || 'N/A'} • Exp: {item.experience || 'N/A'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">Saved: {item.savedAt}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadDraft(item)}
                  className="px-3 py-1.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5" /> Resume Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveDraft(item.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove draft"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
