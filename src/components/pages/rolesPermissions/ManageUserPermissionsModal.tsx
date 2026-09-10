import React from 'react'
import { X, Save } from 'lucide-react'
import { RecruiterUserPermissionData } from './rolesPermissionsData'

interface Props {
  selectedUserForManage?: RecruiterUserPermissionData | null
  recruiter?: RecruiterUserPermissionData | null
  onClose: () => void
  tempUserRoleName?: string
  setTempUserRoleName?: (val: string) => void
  tempUserPermissions?: RecruiterUserPermissionData['permissions']
  setTempUserPermissions?: React.Dispatch<React.SetStateAction<RecruiterUserPermissionData['permissions']>>
  onSave?: (updatedUser?: any) => void
}

export function ManageUserPermissionsModal({
  selectedUserForManage,
  recruiter,
  onClose,
  tempUserRoleName,
  setTempUserRoleName,
  tempUserPermissions,
  setTempUserPermissions,
  onSave,
}: Props) {
  const user = recruiter || selectedUserForManage
  const [roleName, setRoleName] = React.useState(tempUserRoleName || user?.roleName || '')
  const [perms, setPerms] = React.useState<RecruiterUserPermissionData['permissions']>(
    tempUserPermissions || user?.permissions || {
      addCandidates: false, submitToClients: false, scheduleInterviews: false,
      exportReportsCsv: false, viewTeamAnalytics: false, deleteRecords: false, reassignRequirements: false
    }
  )

  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-100 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-[#6B3BF6] font-bold flex items-center justify-center text-sm border border-purple-200">
              {user.avatar}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Manage Permissions — {user.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {user.email} • {user.team}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Assigned System Role</label>
            <select
              value={roleName}
              onChange={e => {
                setRoleName(e.target.value)
                setTempUserRoleName?.(e.target.value)
              }}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
            >
              <option value="Senior Technical Recruiter">Senior Technical Recruiter</option>
              <option value="IT Recruiter">IT Recruiter</option>
              <option value="ERP Technical Recruiter">ERP Technical Recruiter</option>
              <option value="Junior Recruiter">Junior Recruiter</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-slate-700 mb-1">Granular Capabilities & Access Rights</label>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {[
                { key: 'addCandidates', label: 'Add & Search Candidate Repository' },
                { key: 'submitToClients', label: 'Submit Candidates to Client Requirements' },
                { key: 'scheduleInterviews', label: 'Schedule Candidate Interviews' },
                { key: 'exportReportsCsv', label: 'Export Reports & Resumes CSV' },
                { key: 'viewTeamAnalytics', label: 'View Team Analytics & Benchmarks' },
                { key: 'reassignRequirements', label: 'Reassign Requirements & Candidates' },
                { key: 'deleteRecords', label: 'Delete Requirements / Candidates' },
              ].map(cap => {
                const isChecked = (perms as any)[cap.key]
                return (
                  <label
                    key={cap.key}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-purple-50/60 border-purple-200 text-purple-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cap.label}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const next = { ...perms, [cap.key]: !(perms as any)[cap.key] }
                        setPerms(next)
                        setTempUserPermissions?.(next)
                      }}
                      className="w-4 h-4 text-[#6B3BF6] rounded focus:ring-[#6B3BF6] cursor-pointer"
                    />
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (onSave) {
                onSave({ ...user, roleName, permissions: perms })
              }
            }}
            className="px-5 py-2 text-xs font-bold bg-[#6B3BF6] text-white rounded-xl hover:bg-[#5833E0] shadow-xs cursor-pointer active:scale-98 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Recruiter Permissions</span>
          </button>
        </div>
      </div>
    </div>
  )
}
