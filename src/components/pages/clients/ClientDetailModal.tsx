import React from 'react'
import { Building2, X, Download, ShieldCheck, Mail, Phone, User, MapPin } from 'lucide-react'
import { ClientRecord } from './clientsData'

interface Props {
  selectedClientDetail: ClientRecord | null
  onClose: () => void
  onDownloadAgreement: (clientName: string, docName: string) => void
}

export function ClientDetailModal({ selectedClientDetail, onClose, onDownloadAgreement }: Props) {
  if (!selectedClientDetail) return null

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6B3BF6] font-black text-lg flex items-center justify-center border border-purple-200 shadow-sm">
              {selectedClientDetail.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">{selectedClientDetail.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-50 text-[#6B3BF6] border border-purple-200">
                  {selectedClientDetail.domain}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Client ID: <strong className="font-mono text-slate-800">{selectedClientDetail.id}</strong> • Location: <strong>{selectedClientDetail.location}</strong>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 text-center">
            <span className="text-[10px] font-bold text-blue-800 uppercase block">Active Reqs</span>
            <span className="text-xl font-black text-blue-950 font-mono">{selectedClientDetail.activeReqs}</span>
          </div>
          <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100 text-center">
            <span className="text-[10px] font-bold text-purple-800 uppercase block">Total Submissions</span>
            <span className="text-xl font-black text-purple-950 font-mono">{selectedClientDetail.totalSubmissions}</span>
          </div>
          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-center">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Placements</span>
            <span className="text-xl font-black text-emerald-950 font-mono">{selectedClientDetail.totalPlacements}</span>
          </div>
          <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-100 text-center">
            <span className="text-[10px] font-bold text-amber-900 uppercase block">SLA TAT</span>
            <span className="text-xl font-black text-amber-950 font-mono">{selectedClientDetail.slaTAT}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#6B3BF6]" />
            <span>Primary Client Contact POC</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">POC Name</span>
              <span className="font-extrabold text-slate-900">{selectedClientDetail.pocName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Email Address</span>
              <span className="font-extrabold text-purple-700 font-mono">{selectedClientDetail.pocEmail}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Phone Number</span>
              <span className="font-extrabold text-slate-800 font-mono">{selectedClientDetail.pocPhone}</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#6B3BF6]" />
              <span>Executed Client MSA Agreement</span>
            </h4>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {selectedClientDetail.agreementStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Commercial Rate</span>
              <span className="font-extrabold text-slate-900">{selectedClientDetail.commercialFee}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Payment Terms</span>
              <span className="font-extrabold text-slate-900">{selectedClientDetail.paymentTerms}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Agreement Term</span>
              <span className="font-bold text-slate-800 font-mono text-[11px]">
                {selectedClientDetail.agreementStartDate} - {selectedClientDetail.agreementEndDate}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between">
            <div className="text-xs font-medium text-slate-700">
              Document: <strong className="font-mono text-purple-900">{selectedClientDetail.agreementDocName}</strong>
            </div>
            <button
              onClick={() => onDownloadAgreement(selectedClientDetail.name, selectedClientDetail.agreementDocName)}
              className="px-3 py-1.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white rounded-xl text-xs font-extrabold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
          >
            Close Account Details
          </button>
        </div>
      </div>
    </div>
  )
}
