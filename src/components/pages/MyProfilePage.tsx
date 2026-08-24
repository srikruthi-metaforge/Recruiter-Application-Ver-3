import React, { useState } from 'react'
import { User, Mail, Briefcase, Pencil, Check, X, ShieldCheck } from 'lucide-react'
import { Role } from '../../types'
import { DEMO_ACCOUNTS } from '../../data/mockData'

interface MyProfilePageProps {
  role: Role
}

export function MyProfilePage({ role }: MyProfilePageProps) {
  const defaultAccount = DEMO_ACCOUNTS[role] || {
    name: 'Harish Gadipally',
    email: 'harish.g@metaforgeit.com',
    title: 'Senior Recruiting Lead',
  }

  // Local state for profile details dynamically initialized from DEMO_ACCOUNTS
  const [name, setName] = useState(defaultAccount.name)
  const [email, setEmail] = useState(defaultAccount.email)
  const [isEditing, setIsEditing] = useState(false)

  const [editName, setEditName] = useState(name)
  const [editEmail, setEditEmail] = useState(email)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editName.trim() || !editEmail.trim()) return

    setName(editName.trim())
    setEmail(editEmail.trim())
    setIsEditing(false)

    setToastMessage('Profile information updated successfully!')
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  const roleLabel =
    role === 'superadmin'
      ? 'Super Admin'
      : role === 'admin'
        ? 'Admin'
        : role === 'lead'
          ? 'Lead'
          : role === 'devteam'
            ? 'Dev Team'
            : 'Recruiter'

  return (
    <div className="space-y-6 w-full pb-12 font-sans">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          My Profile
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage your recruiter profile and login details
        </p>
      </div>

      {/* BASIC INFORMATION CARD (MATCHING ATTACHED SCREENSHOT EXACTLY) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        {/* CARD HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-100/90 text-slate-400 flex items-center justify-center border border-slate-200/60 shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                Basic Information
              </h2>
              <p className="text-xs text-slate-400 font-normal">
                Profile and contact details
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditName(name)
              setEditEmail(email)
              setIsEditing(!isEditing)
            }}
            className="px-4 py-2 border border-slate-200/90 rounded-xl text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-500" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        {/* EDIT MODE FORM OR READ-ONLY GRID */}
        {isEditing ? (
          <form onSubmit={handleSave} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 space-y-4 animate-in fade-in duration-150">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Edit Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full h-10 px-3.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="w-full h-10 px-3.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200/60">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* READ ONLY GRID (MATCHING SCREENSHOT FIELD CARDS) */
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* FIELD 1: NAME */}
              <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    Name
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {name}
                  </div>
                </div>
              </div>

              {/* FIELD 2: EMAIL */}
              <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100/60">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    Email
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {email}
                  </div>
                </div>
              </div>
            </div>

            {/* FIELD 3: ROLE (HALF WIDTH IN GRID) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400">
                    Role
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {roleLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUCCESS TOAST BANNER */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
