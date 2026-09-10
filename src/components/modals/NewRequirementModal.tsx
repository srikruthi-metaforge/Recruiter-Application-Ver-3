import React, { useState } from 'react'
import { Requirement } from '../../types'
import { Plus, X, Bookmark } from 'lucide-react'
import { saveDraftItem } from '../../data/savedDraftsStore'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdd: (req: Requirement) => void
}

export function NewRequirementModal({ isOpen, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [openings, setOpenings] = useState(1)
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High')
  const [budget, setBudget] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [skillsStr, setSkillsStr] = useState('')

  if (!isOpen) return null

  const skillBadges = skillsStr.split(',').map(s => s.trim()).filter(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newReq: Requirement = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      title,
      client: client || 'Internal Client',
      openings: Number(openings) || 1,
      priority,
      status: 'Active',
      budget: budget || '₹20–25 LPA',
      skills: skillBadges.length > 0 ? skillBadges : ['Java', 'React'],
      location: 'Hybrid / Remote',
      owner: 'Unassigned',
      submissions: 0,
      interviews: 0,
      placed: 0,
      dueDate: '14 Days',
      rejections: 0,
    }
    onAdd(newReq)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">Create New Job Demand</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Java Full Stack Engineer"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Client Account</label>
              <input
                type="text"
                placeholder="e.g. Accenture"
                value={client}
                onChange={e => setClient(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Openings Count</label>
              <input
                type="number"
                min={1}
                value={openings}
                onChange={e => setOpenings(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Budget Range</label>
              <input
                type="text"
                placeholder="e.g. ₹20–25 LPA"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Required Skills (Comma Separated)</label>
            <input
              type="text"
              placeholder="Java, Spring Boot, React, Microservices"
              value={skillsStr}
              onChange={e => setSkillsStr(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                saveDraftItem({
                  type: 'requirement',
                  title: title || 'Draft Requirement',
                  subtitle: `Client: ${client || 'Internal'}`,
                  createdBy: 'Harish Gadipally',
                  status: 'Saved for Later',
                  data: { title, client, priority, openings, budget, dueDate, skillsStr },
                })
                onClose()
              }}
              className="px-4 py-2 bg-amber-50 text-amber-900 border border-amber-300 font-bold rounded-lg flex items-center gap-1"
            >
              <Bookmark className="w-4 h-4" /> Save Draft
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1">
              <Plus className="w-4 h-4" /> Create Demand
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
