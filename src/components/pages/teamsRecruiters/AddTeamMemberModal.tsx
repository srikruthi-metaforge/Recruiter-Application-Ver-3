import React, { useState } from 'react'
import { UserPlus } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (member: any) => void
}

export function AddTeamMemberModal({ isOpen, onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Technical Recruiter')
  const [isTeamLead, setIsTeamLead] = useState(false)
  const [teamLead, setTeamLead] = useState('Harish Gadipally')
  const [client, setClient] = useState('Accenture')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    onCreate({
      name,
      email,
      role,
      isTeamLead,
      teamLead: isTeamLead ? `${name} (Self)` : teamLead,
      clientNames: [client],
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
              <h3 className="text-base font-extrabold text-slate-900">Onboard Team Member / Lead</h3>
              <p className="text-xs text-slate-500">Configure team hierarchy and primary account pairing</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Ananya Rao"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. a.rao@metaforgeit.com"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="isLeadCheck"
              checked={isTeamLead}
              onChange={e => setIsTeamLead(e.target.checked)}
              className="w-4 h-4 text-[#6B3BF6] rounded border-slate-300 cursor-pointer"
            />
            <label htmlFor="isLeadCheck" className="text-xs font-extrabold text-slate-800 cursor-pointer">
              Designate as Team Lead (Pod Manager)
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Role Title</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              />
            </div>

            {!isTeamLead && (
              <div>
                <label className="block text-slate-700 font-bold mb-1">Assigned Team Lead</label>
                <select
                  value={teamLead}
                  onChange={e => setTeamLead(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                >
                  <option value="Harish Gadipally">Harish Gadipally</option>
                  <option value="Tom Walsh">Tom Walsh</option>
                  <option value="Nina Brooks">Nina Brooks</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Primary Client Partner</label>
            <select
              value={client}
              onChange={e => setClient(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
            >
              <option value="Accenture">Accenture</option>
              <option value="Goldman Sachs">Goldman Sachs</option>
              <option value="Tesla">Tesla</option>
              <option value="LTTS">LTTS</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold rounded-xl shadow-md text-xs flex items-center gap-1.5 cursor-pointer">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Save & Onboard Member</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
