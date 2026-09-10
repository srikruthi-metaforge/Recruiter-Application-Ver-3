import React, { useState } from 'react'
import { ArrowLeft, ShieldPlus, CheckCircle } from 'lucide-react'
import { EnterpriseRoleData } from './rolesPermissionsData'

interface Props {
  onBack: () => void
  onCreate: (role: EnterpriseRoleData) => void
}

export function CreateRoleView({ onBack, onCreate }: Props) {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !code.trim()) return

    const newRole: EnterpriseRoleData = {
      id: `role_${Date.now()}`,
      name: name.trim(),
      code: code.trim().toLowerCase().replace(/\s+/g, '_'),
      description: description.trim() || 'Custom enterprise role created by administrator.',
      userCount: 0,
      isSystem: false,
      lastUpdated: 'Just now',
      permissions: {},
    }

    onCreate(newRole)
  }

  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer border border-slate-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Custom Enterprise Role</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Define a new system role and assign initial permissions.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs max-w-2xl space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Role Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g., Talent Sourcing Specialist"
            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6B3BF6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Role Code Identifier</label>
          <input
            type="text"
            required
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="e.g., sourcing_specialist"
            className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6B3BF6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Role Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Briefly describe the responsibilities and scope of this role..."
            className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#6B3BF6]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5b2fd8] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <ShieldPlus className="w-4 h-4" />
            <span>Create Role</span>
          </button>
        </div>
      </form>
    </div>
  )
}
