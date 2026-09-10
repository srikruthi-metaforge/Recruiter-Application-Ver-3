import React from 'react'
import { Eye, Building2 } from 'lucide-react'
import { ClientPerformanceData } from './reportsData'

interface ClientPerformanceTableProps {
  clients: ClientPerformanceData[]
  onOpenGapAnalysis: (clientName: string) => void
}

export const ClientPerformanceTable: React.FC<ClientPerformanceTableProps> = ({
  clients,
  onOpenGapAnalysis,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Client Account Delivery & Performance</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Track total REQs sent by client, assigned counts, submissions, and open/closed ratios.
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-[#6B3BF6] text-xs font-extrabold rounded-full border border-purple-200">
          {clients.length} Client Accounts
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <th className="py-3.5 px-4">Client Account Name</th>
              <th className="py-3.5 px-4 text-center">REQs Sent</th>
              <th className="py-3.5 px-4 text-center">REQs Assigned</th>
              <th className="py-3.5 px-4 text-center">Submissions Delivered</th>
              <th className="py-3.5 px-4 text-center">Open / Closed REQs</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {clients.map(cli => (
              <tr key={cli.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6B3BF6] flex items-center justify-center font-extrabold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-slate-900">{cli.clientName}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center font-black text-slate-900">{cli.reqSent}</td>
                <td className="py-3.5 px-4 text-center font-black text-purple-700">{cli.reqAssigned}</td>
                <td className="py-3.5 px-4 text-center font-black text-emerald-700">{cli.submissions}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-800 font-bold rounded-md mr-1">{cli.openReqs} Open</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-md">{cli.closedReqs} Closed</span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => onOpenGapAnalysis(cli.clientName)}
                    className="px-3 py-1.5 bg-[#6B3BF6] hover:bg-[#5b2fe0] text-white font-bold rounded-xl text-xs flex items-center gap-1 ml-auto shadow-xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Gap Analysis</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
