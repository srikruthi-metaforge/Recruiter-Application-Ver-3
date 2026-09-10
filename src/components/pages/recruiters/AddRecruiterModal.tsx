import React, { useState } from 'react'
import { UserPlus } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (recruiter: any) => void
}

export function AddRecruiterModal({ isOpen, onClose, onCreate }: Props) {
  const [newRecruiterName, setNewRecruiterName] = useState('')
  const [newRecruiterEmail, setNewRecruiterEmail] = useState('')
  const [newRecruiterRole, setNewRecruiterRole] = useState('Technical Recruiter')
  const [newAssignedLead, setNewAssignedLead] = useState('Harish Gadipally')
  const [newAssignedClient, setNewAssignedClient] = useState('Accenture')
  const [newTatTarget, setNewTatTarget] = useState('2.0')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRecruiterName || !newRecruiterEmail) return
    onCreate({
      name: newRecruiterName,
      email: newRecruiterEmail,
      role: newRecruiterRole,
      teamLead: newAssignedLead,
      clientNames: [newAssignedClient],
      tatDays: parseFloat(newTatTarget) || 2.0,
    })
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-sm border border-purple-200">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Onboard New Recruiter</h3>
              <p className="text-xs text-slate-500">Assign team lead, primary client partner, and SLA TAT target</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={newRecruiterName}
              onChange={e => setNewRecruiterName(e.target.value)}
              placeholder="e.g. Ananya Rao"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={newRecruiterEmail}
              onChange={e => setNewRecruiterEmail(e.target.value)}
              placeholder="e.g. a.rao@talentflow.io"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Role Designation</label>
              <select
                value={newRecruiterRole}
                onChange={e => setNewRecruiterRole(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              >
                <option value="Technical Recruiter">Technical Recruiter</option>
                <option value="Senior IT Recruiter">Senior IT Recruiter</option>
                <option value="Lead Recruiter">Lead Recruiter</option>
                <option value="Sourcing Specialist">Sourcing Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Assigned Team Lead</label>
              <select
                value={newAssignedLead}
                onChange={e => setNewAssignedLead(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              >
                <option value="Harish Gadipally">Harish Gadipally (Accenture Lead)</option>
                <option value="Tom Walsh">Tom Walsh (Goldman Sachs Lead)</option>
                <option value="Nina Brooks">Nina Brooks (Tesla Lead)</option>
                <option value="Ray Diaz">Ray Diaz (ITC Infotech Lead)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Primary Client Account</label>
              <select
                value={newAssignedClient}
                onChange={e => setNewAssignedClient(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              >
                <option value="Accenture">Accenture</option>
                <option value="Goldman Sachs">Goldman Sachs</option>
                <option value="Tesla">Tesla</option>
                <option value="ITC Limited">ITC Limited</option>
                <option value="LTTS Mobility">LTTS Mobility</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Target SLA TAT (Days)</label>
              <input
                type="number"
                step="0.1"
                value={newTatTarget}
                onChange={e => setNewTatTarget(e.target.value)}
                placeholder="2.0"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold rounded-xl transition-all shadow-md cursor-pointer text-xs flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Save & Onboard Recruiter</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
