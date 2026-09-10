import React from 'react'

interface SubmitMailRecipientsCardProps {
  toRecipients: string[]
  ccRecipients: string[]
  newToInput: string
  setNewToInput: (val: string) => void
  newCcInput: string
  setNewCcInput: (val: string) => void
  handleAddToRecipient: () => void
  handleAddCcRecipient: () => void
  handleRemoveTo: (email: string) => void
  handleRemoveCc: (email: string) => void
}

export const SubmitMailRecipientsCard: React.FC<SubmitMailRecipientsCardProps> = ({
  toRecipients,
  ccRecipients,
  newToInput,
  setNewToInput,
  newCcInput,
  setNewCcInput,
  handleAddToRecipient,
  handleAddCcRecipient,
  handleRemoveTo,
  handleRemoveCc,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-sans">
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <span className="text-xs font-extrabold text-slate-900">TO ({toRecipients.length})</span>
        <div className="space-y-1.5 min-h-[90px]">
          {toRecipients.map(e => (
            <div key={e} className="flex items-center justify-between px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              <span>{e}</span>
              <button onClick={() => handleRemoveTo(e)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <input
            type="email"
            placeholder="Add email..."
            value={newToInput}
            onChange={e => setNewToInput(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
          />
          <button onClick={handleAddToRecipient} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer">
            + Add
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <span className="text-xs font-extrabold text-slate-900">CC ({ccRecipients.length})</span>
        <div className="space-y-1.5 min-h-[90px]">
          {ccRecipients.map(e => (
            <div key={e} className="flex items-center justify-between px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              <span>{e}</span>
              <button onClick={() => handleRemoveCc(e)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <input
            type="email"
            placeholder="Add email..."
            value={newCcInput}
            onChange={e => setNewCcInput(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
          />
          <button onClick={handleAddCcRecipient} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer">
            + Add
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
        <span className="text-xs font-extrabold text-slate-900">BCC</span>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 my-auto">
          Drop recipients here
        </div>
      </div>
    </div>
  )
}
