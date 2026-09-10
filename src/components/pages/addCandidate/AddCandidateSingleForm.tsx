import React from 'react'
import { Requirement } from '../../../types'
import { Upload, Sparkles } from 'lucide-react'
import { AddCandidateSingleFormFields } from './AddCandidateSingleFormFields'

interface Props {
  requirements: Requirement[]
  formState: any
  onCancel: () => void
}

export function AddCandidateSingleForm({ requirements, formState, onCancel }: Props) {
  const {
    isParsing,
    parsedFileName,
    handleParseResume,
    targetReqId,
    setTargetReqId,
    dupCheckResult,
    handleSubmit,
    handleSaveDraft,
  } = formState

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 space-y-1">
            <label className="block text-xs font-bold text-slate-800">Select Target Requirement for Submission</label>
            <select
              value={targetReqId}
              onChange={e => setTargetReqId(e.target.value)}
              className="w-full max-w-md p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
            >
              {requirements.map(req => (
                <option key={req.id} value={req.id}>
                  {req.id} — {req.title} ({req.client})
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Resume Upload & Metaforge AI Parsing</span>
              <button
                type="button"
                onClick={handleParseResume}
                disabled={isParsing}
                className="text-xs font-extrabold text-[#6B3BF6] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isParsing ? 'Parsing Resume...' : 'Parse Resume with AI'}</span>
              </button>
            </div>
            <div
              onClick={handleParseResume}
              className="border-2 border-dashed border-purple-200 hover:border-[#6B3BF6] bg-purple-50/40 rounded-2xl p-4 text-center cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5 text-[#6B3BF6] mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-700">
                {parsedFileName ? `Parsed File: ${parsedFileName}` : 'Drop Resume PDF/DOCX here or click to browse'}
              </p>
            </div>
          </div>
        </div>

        {dupCheckResult.isDuplicate && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-2">
            <span>⚠️ Duplicate Warning: Candidate matching this email/phone or name is already submitted for Requirement #{targetReqId}.</span>
          </div>
        )}
      </div>

      <AddCandidateSingleFormFields formState={formState} />

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveDraft}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
        >
          Save Draft
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
        >
          Submit Candidate
        </button>
      </div>
    </form>
  )
}
