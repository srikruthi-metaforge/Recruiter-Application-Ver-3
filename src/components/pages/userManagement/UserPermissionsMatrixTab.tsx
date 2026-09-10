import React from 'react'
import { ShieldCheck, Check, X } from 'lucide-react'
import { RecruiterUserPermissionData } from './userManagementData'

interface UserPermissionsMatrixTabProps {
  permissionsList: RecruiterUserPermissionData[]
  onTogglePermission: (userId: string, permKey: keyof RecruiterUserPermissionData['permissions']) => void
  showToast: (msg: string) => void
}

export const UserPermissionsMatrixTab: React.FC<UserPermissionsMatrixTabProps> = ({
  permissionsList,
  onTogglePermission,
  showToast,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Recruiter Feature Access & Permissions Matrix</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Configure granular access toggles per recruiter user account.
          </p>
        </div>
        <button
          onClick={() => showToast('Permission matrix saved successfully!')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
        >
          Save Matrix
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4">Recruiter User</th>
              <th className="py-3.5 px-4 text-center">Add Candidates</th>
              <th className="py-3.5 px-4 text-center">Submit to Clients</th>
              <th className="py-3.5 px-4 text-center">Schedule Interviews</th>
              <th className="py-3.5 px-4 text-center">Export CSV Reports</th>
              <th className="py-3.5 px-4 text-center">View Analytics</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {permissionsList.map(rec => (
              <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <div>{rec.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{rec.email}</div>
                </td>

                <td className="py-3.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={rec.permissions.addCandidates}
                    onChange={() => onTogglePermission(rec.id, 'addCandidates')}
                    className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                  />
                </td>

                <td className="py-3.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={rec.permissions.submitToClients}
                    onChange={() => onTogglePermission(rec.id, 'submitToClients')}
                    className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                  />
                </td>

                <td className="py-3.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={rec.permissions.scheduleInterviews}
                    onChange={() => onTogglePermission(rec.id, 'scheduleInterviews')}
                    className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                  />
                </td>

                <td className="py-3.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={rec.permissions.exportReportsCsv}
                    onChange={() => onTogglePermission(rec.id, 'exportReportsCsv')}
                    className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                  />
                </td>

                <td className="py-3.5 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={rec.permissions.viewTeamAnalytics}
                    onChange={() => onTogglePermission(rec.id, 'viewTeamAnalytics')}
                    className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
