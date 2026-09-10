import React, { useState } from 'react'
import { Building2, X, Plus } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (client: any) => void
}

export function AddClientModal({ isOpen, onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [domain, setDomain] = useState('')
  const [pocName, setPocName] = useState('')
  const [pocEmail, setPocEmail] = useState('')
  const [pocPhone, setPocPhone] = useState('')
  const [location, setLocation] = useState('')
  const [teamLead, setTeamLead] = useState('Harish Gadipally')
  const [commercialFee, setCommercialFee] = useState('8.33% Annual CTC')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !pocName) return
    onCreate({
      name,
      domain: domain || 'Enterprise Technology',
      pocName,
      pocEmail: pocEmail || `${name.toLowerCase().replace(/\s+/g, '')}@partner.com`,
      pocPhone: pocPhone || '+91 98765 43210',
      location: location || 'Hyderabad / Remote',
      teamLead,
      commercialFee,
    })
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6B3BF6] font-extrabold flex items-center justify-center text-sm border border-purple-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Onboard New Client Partner</h3>
              <p className="text-xs text-slate-500">Configure client POC, SLA expectations, and assigned team lead</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Client Company Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Continental Automotive"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Business Domain</label>
              <input
                type="text"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="e.g. Automotive & Hardware"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Primary Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Bangalore / Pune"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Client POC Name *</label>
              <input
                type="text"
                required
                value={pocName}
                onChange={e => setPocName(e.target.value)}
                placeholder="e.g. Kallol Chakraborty"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Client POC Email</label>
              <input
                type="email"
                value={pocEmail}
                onChange={e => setPocEmail(e.target.value)}
                placeholder="poc@client.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Assigned Lead Recruiter</label>
              <select
                value={teamLead}
                onChange={e => setTeamLead(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
              >
                <option value="Harish Gadipally">Harish Gadipally</option>
                <option value="Tom Walsh">Tom Walsh</option>
                <option value="Nina Brooks">Nina Brooks</option>
                <option value="Ray Diaz">Ray Diaz</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Commercial Fee Term</label>
              <input
                type="text"
                value={commercialFee}
                onChange={e => setCommercialFee(e.target.value)}
                placeholder="8.33% Annual CTC"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6] text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Save & Onboard Client</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
