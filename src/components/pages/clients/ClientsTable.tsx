import React from 'react'
import { Building2, Eye, Download, ShieldCheck } from 'lucide-react'
import { ClientRecord } from './clientsData'
import { PaginationFooter } from '../../ui/PaginationFooter'

interface Props {
  paginatedClients: ClientRecord[]
  filteredClientsLength: number
  currentPage: number
  totalPages: number
  pageSize: number
  setCurrentPage: (p: number) => void
  setSelectedClientDetail: (c: ClientRecord) => void
  onDownloadAgreement: (clientName: string, docName: string) => void
}

export function ClientsTable({
  paginatedClients,
  filteredClientsLength,
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setSelectedClientDetail,
  onDownloadAgreement,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-5">CLIENT ACCOUNT & DOMAIN</th>
              <th className="py-4 px-4">PRIMARY POC & CONTACT</th>
              <th className="py-4 px-4">ASSIGNED POD LEAD</th>
              <th className="py-4 px-4 text-center">ACTIVE REQS</th>
              <th className="py-4 px-4 text-center">SUBMISSIONS</th>
              <th className="py-4 px-4 text-center">PLACEMENTS</th>
              <th className="py-4 px-4 text-center">COMMERCIAL FEE</th>
              <th className="py-4 px-4">MSA AGREEMENT</th>
              <th className="py-4 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {paginatedClients.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400 font-semibold">
                  No client partner accounts match your search filter criteria.
                </td>
              </tr>
            ) : (
              paginatedClients.map(client => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedClientDetail(client)}
                  className="hover:bg-purple-50/30 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6B3BF6] font-bold text-sm flex items-center justify-center shrink-0 border border-purple-200 group-hover:scale-105 transition-transform">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 group-hover:text-[#6B3BF6] transition-colors">{client.name}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{client.domain}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800">{client.pocName}</div>
                    <div className="text-[10px] text-purple-600 font-bold font-mono">{client.pocEmail}</div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-800">{client.teamLead}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{client.teamMemberCount} Recruiters</div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-900 border border-blue-200 tabular-nums">
                      {client.activeReqs} Reqs
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-purple-900 border border-purple-200 tabular-nums">
                      {client.totalSubmissions} Subs
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-900 border border-emerald-200 tabular-nums">
                      {client.totalPlacements} Hired
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-center font-bold text-slate-800 text-xs">
                    {client.commercialFee}
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => onDownloadAgreement(client.name, client.agreementDocName)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 cursor-pointer transition-all active:scale-98 shadow-2xs"
                      title="Download signed MSA PDF document"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{client.agreementStatus}</span>
                      <Download className="w-3 h-3 text-emerald-700 ml-0.5" />
                    </button>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedClientDetail(client)}
                      className="px-3 py-1.5 bg-white hover:bg-purple-50 text-[#6B3BF6] border border-purple-200 rounded-xl text-xs font-extrabold shadow-2xs transition-all cursor-pointer flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#6B3BF6]" />
                      <span>View Account</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredClientsLength}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
