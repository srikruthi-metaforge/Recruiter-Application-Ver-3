import React from 'react'
import { Upload, Sparkles } from 'lucide-react'

interface Props {
  jdText: string
  setJdText: (val: string) => void
  isExtracting: boolean
  handleExtractAndAutoFill: () => void
}

export function FormExtractJdSection({
  jdText,
  setJdText,
  isExtracting,
  handleExtractAndAutoFill,
}: Props) {
  return (
    <div className="bg-blue-50/40 border border-dashed border-blue-200 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="text-xs font-bold text-indigo-900">Extract & Auto-fill (optional)</div>
          <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white/80 rounded-2xl p-6 text-center transition-all cursor-pointer group">
            <Upload className="w-6 h-6 text-indigo-400 mx-auto group-hover:scale-110 transition-transform" />
            <div className="text-xs font-semibold text-slate-700 mt-2">
              Drop file here or <span className="text-indigo-600 hover:underline">browse</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center self-center py-2">
          <button
            type="button"
            onClick={handleExtractAndAutoFill}
            disabled={isExtracting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isExtracting ? 'Extracting...' : 'Extract & Auto-fill'}</span>
          </button>
        </div>

        <div className="flex-1 space-y-2">
          <div className="text-xs font-bold text-slate-700">Or paste JD here for Extract & Auto-fill</div>
          <textarea
            value={jdText}
            onChange={e => setJdText(e.target.value)}
            placeholder="Paste JD text here..."
            className="w-full h-28 bg-white border border-slate-200 rounded-2xl p-3 text-xs focus:ring-2 focus:ring-[#6B3BF6]/20 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  )
}
