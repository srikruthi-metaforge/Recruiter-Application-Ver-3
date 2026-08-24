import React, { useState, useMemo } from 'react'
import {
  Building2,
  Plus,
  Search,
  FileText,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  User,
  Users,
  Calendar,
  ExternalLink,
  Edit2,
  Trash2,
  Filter,
  Award,
  DollarSign,
  AlertCircle,
  X,
  FileCheck,
  Upload,
  ArrowLeft,
  Briefcase,
  MapPin,
  FileSpreadsheet,
  Save,
  Check,
  Shield,
  FileSignature,
  Printer,
  Share2,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { Role } from '../../types'
import { PaginationFooter } from '../ui/PaginationFooter'
import { ClientDeliveryGapAnalysisPage } from './ClientDeliveryGapAnalysisPage'

export interface ClientRecord {
  id: string
  name: string
  domain: string
  pocName: string
  pocEmail: string
  pocPhone: string
  location: string
  teamLead: string
  teamMemberCount: number
  teamMembers: string[]
  activeReqs: number
  totalSubmissions: number
  totalPlacements: number
  commercialFee: string // e.g. "8.33% Annual CTC"
  paymentTerms: string // e.g. "30 Days Net"
  slaTAT: string // e.g. "3.5 Days"
  agreementStatus: 'Active - Executed' | 'Pending Signature' | 'Under Legal Review' | 'Expired'
  agreementStartDate: string
  agreementEndDate: string
  agreementDocName: string
  signedBy: string
  signedDate: string
}

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'CLI-100',
    name: 'Accenture',
    domain: 'Enterprise Cloud & Tech Services',
    pocName: 'Kallol Chakraborty',
    pocEmail: 'kallol.c@accenture.com',
    pocPhone: '+91 98765 11223',
    location: 'Bangalore / Hyderabad',
    teamLead: 'Harish Gadipally',
    teamMemberCount: 3,
    teamMembers: ['Marcus Chen', 'Priya Sharma', 'Suresh kulkarni'],
    activeReqs: 45,
    totalSubmissions: 142,
    totalPlacements: 38,
    commercialFee: '8.33% Annual CTC',
    paymentTerms: '30 Days Net',
    slaTAT: '1.8 Days',
    agreementStatus: 'Active - Executed',
    agreementStartDate: '10 Jan 2025',
    agreementEndDate: '09 Jan 2028',
    agreementDocName: 'Accenture_Master_Services_Agreement_2025.pdf',
    signedBy: 'Kallol Chakraborty (VP Talent Sourcing)',
    signedDate: '10 Jan 2025',
  },
  {
    id: 'CLI-101',
    name: 'Goldman Sachs',
    domain: 'Financial Technology & Investment',
    pocName: 'Trayeetanu Ganguly',
    pocEmail: 'trayeetanu.g@goldmansachs.com',
    pocPhone: '+91 98765 43210',
    location: 'Bangalore / Mumbai',
    teamLead: 'Tom Walsh',
    teamMemberCount: 3,
    teamMembers: ['lakshmi.v Recruiter', 'Lingoji Pavani', 'Arvind GR'],
    activeReqs: 32,
    totalSubmissions: 98,
    totalPlacements: 26,
    commercialFee: '12.0% Annual CTC',
    paymentTerms: '30 Days Net',
    slaTAT: '2.0 Days',
    agreementStatus: 'Active - Executed',
    agreementStartDate: '15 Jan 2025',
    agreementEndDate: '14 Jan 2028',
    agreementDocName: 'GoldmanSachs_Vendor_MSA_2025.pdf',
    signedBy: 'Trayeetanu Ganguly (VP Procurement)',
    signedDate: '15 Jan 2025',
  },
  {
    id: 'CLI-102',
    name: 'Tesla',
    domain: 'EV, Energy & AI Sourcing',
    pocName: 'Kiran N',
    pocEmail: 'kiran.n@tesla.com',
    pocPhone: '+91 98123 45678',
    location: 'Pune / Remote',
    teamLead: 'Nina Brooks',
    teamMemberCount: 3,
    teamMembers: ['rahimoon Shaik', 'Adirala sathvika', 'Charlie Darwin'],
    activeReqs: 28,
    totalSubmissions: 84,
    totalPlacements: 22,
    commercialFee: '15.0% Annual CTC',
    paymentTerms: '45 Days Net',
    slaTAT: '2.2 Days',
    agreementStatus: 'Active - Executed',
    agreementStartDate: '01 Mar 2024',
    agreementEndDate: '28 Feb 2027',
    agreementDocName: 'Tesla_Global_Staffing_Agreement.pdf',
    signedBy: 'Kiran N (Head of Talent)',
    signedDate: '01 Mar 2024',
  },
  {
    id: 'CLI-103',
    name: 'ITC Infotech',
    domain: 'Enterprise SAP & ERP',
    pocName: 'Pranati Paul',
    pocEmail: 'pranati.paul@itc.in',
    pocPhone: '+91 99887 76655',
    location: 'Kolkata / Bangalore',
    teamLead: 'Ray Diaz',
    teamMemberCount: 3,
    teamMembers: ['Harini Sindey', 'Viswanath Reddy', 'Rachana Golkonda'],
    activeReqs: 24,
    totalSubmissions: 72,
    totalPlacements: 19,
    commercialFee: '10.0% Annual CTC',
    paymentTerms: '30 Days Net',
    slaTAT: '2.5 Days',
    agreementStatus: 'Active - Executed',
    agreementStartDate: '20 Nov 2024',
    agreementEndDate: '19 Nov 2027',
    agreementDocName: 'ITC_Infotech_Staffing_Agreement.pdf',
    signedBy: 'Pranati Paul (Partner Success Mgr)',
    signedDate: '20 Nov 2024',
  },
  {
    id: 'CLI-104',
    name: 'LTTS Mobility',
    domain: 'Hardware & Automotive Engineering',
    pocName: 'Trayeetanu Ganguly',
    pocEmail: 'trayeetanu.g@ltts.com',
    pocPhone: '+91 97654 32109',
    location: 'Vadodara / Chennai',
    teamLead: 'Harish Gadipally',
    teamMemberCount: 2,
    teamMembers: ['Marcus Chen', 'Priya Sharma'],
    activeReqs: 18,
    totalSubmissions: 56,
    totalPlacements: 15,
    commercialFee: '10.0% Annual CTC',
    paymentTerms: '45 Days Net',
    slaTAT: '2.8 Days',
    agreementStatus: 'Active - Executed',
    agreementStartDate: '10 Jun 2025',
    agreementEndDate: '09 Jun 2028',
    agreementDocName: 'LTTS_Mobility_Empanelment.pdf',
    signedBy: 'Trayeetanu Ganguly (Delivery Dir)',
    signedDate: '10 Jun 2025',
  },
  {
    id: 'CLI-105',
    name: 'Infosys Ltd',
    domain: 'Software & Cloud Services',
    pocName: 'Kallol Chakraborty',
    pocEmail: 'kallol.c@infosys.com',
    pocPhone: '+91 91234 56789',
    location: 'Bangalore / Hyderabad',
    teamLead: 'Tom Walsh',
    teamMemberCount: 2,
    teamMembers: ['lakshmi.v Recruiter', 'Lingoji Pavani'],
    activeReqs: 14,
    totalSubmissions: 42,
    totalPlacements: 12,
    commercialFee: '8.33% Annual CTC',
    paymentTerms: '30 Days Net',
    slaTAT: '3.0 Days',
    agreementStatus: 'Active - Executed',
    agreementStartDate: '05 Feb 2025',
    agreementEndDate: '04 Feb 2028',
    agreementDocName: 'Infosys_Global_Vendor_SLA.pdf',
    signedBy: 'Kallol Chakraborty (VP Procurement)',
    signedDate: '05 Feb 2025',
  },
]

interface ClientsPageProps {
  role?: Role
}

export function ClientsPage({ role = 'superadmin' }: ClientsPageProps) {
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS)
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'view_agreement'>('list')
  const [selectedClientForAgreement, setSelectedClientForAgreement] = useState<ClientRecord | null>(null)
  const [selectedClientForGapAnalysis, setSelectedClientForGapAnalysis] = useState<ClientRecord | null>(null)
  const [activeDropdownClientId, setActiveDropdownClientId] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [domainFilter, setDomainFilter] = useState('All Domains')

  // Dedicated Add Client Page Form State
  const [newClientName, setNewClientName] = useState('')
  const [newClientDomain, setNewClientDomain] = useState('Software & Cloud Services')
  const [newPocName, setNewPocName] = useState('')
  const [newPocDesignation, setNewPocDesignation] = useState('Procurement Manager')
  const [newPocEmail, setNewPocEmail] = useState('')
  const [newPocPhone, setNewPocPhone] = useState('')
  const [newLocation, setNewLocation] = useState('Bangalore / Remote')
  const [newCommercialFee, setNewCommercialFee] = useState('8.33% Annual CTC')
  const [newPaymentTerms, setNewPaymentTerms] = useState('30 Days Net')
  const [newSlaTAT, setNewSlaTAT] = useState('3.0 Days')
  const [newAgreementStartDate, setNewAgreementStartDate] = useState('2026-08-11')
  const [newAgreementEndDate, setNewAgreementEndDate] = useState('2029-08-10')
  const [newAgreementDoc, setNewAgreementDoc] = useState<File | null>(null)

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      if (domainFilter !== 'All Domains' && c.domain !== domainFilter) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          c.name.toLowerCase().includes(q) ||
          c.pocName.toLowerCase().includes(q) ||
          c.pocEmail.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [clients, searchQuery, domainFilter])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredClients.slice(start, start + pageSize)
  }, [filteredClients, currentPage, pageSize])

  // Open Full-Page Agreement View
  const openAgreementPage = (client: ClientRecord) => {
    setSelectedClientForAgreement(client)
    setViewMode('view_agreement')
  }

  // Handle Add Client Form Submit (Full Page Submission)
  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClientName.trim() || !newPocName.trim()) return

    const newRecord: ClientRecord = {
      id: `CLI-${Math.floor(100 + Math.random() * 900)}`,
      name: newClientName.trim(),
      domain: newClientDomain,
      pocName: newPocName.trim(),
      pocEmail: newPocEmail.trim() || 'poc@client.com',
      pocPhone: newPocPhone.trim() || '+91 98765 00000',
      location: newLocation.trim(),
      teamLead: 'Harish Gadipally',
      teamMemberCount: 2,
      teamMembers: ['Marcus Chen', 'Priya Sharma'],
      activeReqs: 0,
      totalSubmissions: 0,
      totalPlacements: 0,
      commercialFee: newCommercialFee,
      paymentTerms: newPaymentTerms,
      slaTAT: newSlaTAT,
      agreementStatus: 'Active - Executed',
      agreementStartDate: newAgreementStartDate,
      agreementEndDate: newAgreementEndDate,
      agreementDocName: newAgreementDoc ? newAgreementDoc.name : `${newClientName.replace(/\s+/g, '_')}_MSA_Agreement.pdf`,
      signedBy: `${newPocName.trim()} (${newPocDesignation})`,
      signedDate: '11 Aug 2026',
    }

    setClients([newRecord, ...clients])
    setViewMode('list')
    showToast(`Successfully empaneled new client: ${newClientName}`)

    // Reset Form
    setNewClientName('')
    setNewPocName('')
    setNewPocEmail('')
    setNewPocPhone('')
  }

  // Render Client Delivery Gap Analysis Page when client is clicked
  if (selectedClientForGapAnalysis) {
    return (
      <ClientDeliveryGapAnalysisPage
        clientName={selectedClientForGapAnalysis.name}
        clientDomain={selectedClientForGapAnalysis.domain}
        pocName={selectedClientForGapAnalysis.pocName}
        pocEmail={selectedClientForGapAnalysis.pocEmail}
        pocPhone={selectedClientForGapAnalysis.pocPhone}
        teamLead={selectedClientForGapAnalysis.teamLead}
        role={role}
        onBack={() => setSelectedClientForGapAnalysis(null)}
      />
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: VIEW MASTER SERVICES AGREEMENT (MSA)
  // -------------------------------------------------------------
  if (viewMode === 'view_agreement' && selectedClientForAgreement) {
    const agreement = selectedClientForAgreement
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        {/* TOP HEADER WITH BACK BUTTON & DOWNLOAD PDF ACTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to Clients List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Master Services Agreement (MSA)
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{agreement.agreementStatus}</span>
                </span>
              </div>
              <p className="text-xs text-[#6B3BF6] font-bold mt-0.5">
                Empaneled Client Partner: <strong className="text-slate-900">{agreement.name}</strong> ({agreement.id})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast(`Printing Agreement Record for ${agreement.name}...`)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print MSA</span>
            </button>

            <button
              onClick={() => showToast(`Downloading ${agreement.agreementDocName}...`)}
              className="px-4 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed Agreement (PDF)</span>
            </button>
          </div>
        </div>

        {/* AGREEMENT OVERVIEW DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* LEFT 2 COLUMNS: DETAILED AGREEMENT SECTIONS */}
          <div className="lg:col-span-2 space-y-5">
            {/* CARD 1: CONTRACTING PARTIES & LEGAL INFORMATION */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>1. Contracting Client Partner & Signatory Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500 font-medium">Organization Name:</span>
                    <span className="font-extrabold text-slate-900">{agreement.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500 font-medium">Industry Domain:</span>
                    <span className="font-bold text-[#6B3BF6]">{agreement.domain}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500 font-medium">Empanelment ID:</span>
                    <span className="font-bold text-slate-800">{agreement.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Operating Location:</span>
                    <span className="font-semibold text-slate-700">{agreement.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500 font-medium">Authorized Signatory:</span>
                    <span className="font-extrabold text-slate-900">{agreement.signedBy}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500 font-medium">Primary POC Email:</span>
                    <span className="font-bold text-blue-700">{agreement.pocEmail}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500 font-medium">Primary POC Contact:</span>
                    <span className="font-semibold text-slate-800">{agreement.pocPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Execution Date:</span>
                    <span className="font-bold text-emerald-800">{agreement.signedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: COMMERCIAL SLA BENCHMARKS & PAYMENT TERMS */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>2. Commercial SLA & Fee Structure</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Commercial Empanelment Fee
                  </span>
                  <p className="text-lg font-extrabold text-emerald-950">{agreement.commercialFee}</p>
                  <p className="text-[10px] text-emerald-700">Calculated on First Year Gross CTC</p>
                </div>

                <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                    Payment Credit Period
                  </span>
                  <p className="text-lg font-extrabold text-purple-950">{agreement.paymentTerms}</p>
                  <p className="text-[10px] text-purple-700">Triggered upon joining date</p>
                </div>

                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                    First Submissions SLA TAT
                  </span>
                  <p className="text-lg font-extrabold text-blue-950">{agreement.slaTAT}</p>
                  <p className="text-[10px] text-blue-700">Turnaround SLA Benchmark</p>
                </div>
              </div>
            </div>

            {/* CARD 3: LEGAL CLAUSES & GUARANTEE COVENANTS */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#6B3BF6]" />
                <span>3. Guarantee Covenants & Legal Terms</span>
              </div>

              <div className="space-y-2 text-slate-700 font-medium leading-relaxed">
                <p>
                  <strong>• Candidate Replacement Guarantee:</strong> Includes a 90-day free replacement guarantee. If a candidate leaves within 90 calendar days of joining, a replacement candidate will be provided at zero additional cost within 30 days.
                </p>
                <p>
                  <strong>• Non-Solicitation & NDA Covenant:</strong> Both parties agree to strict confidentiality and non-solicitation guidelines for a duration of 24 months post-agreement termination.
                </p>
                <p>
                  <strong>• Invoicing Milestones:</strong> Invoices are generated on candidate joining date with standard payment clearance terms as specified ({agreement.paymentTerms}).
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DIGITAL DOCUMENT PREVIEW & VALIDITY RECORD */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl border border-slate-700 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-emerald-400" />
                  <span className="font-extrabold text-sm">Executed MSA Record</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  🔒 Legally Sealed
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Document Filename</span>
                  <p className="font-bold text-white text-xs mt-0.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>{agreement.agreementDocName}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-400 block font-medium">Valid From:</span>
                    <p className="font-bold text-white mt-0.5">{agreement.agreementStartDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Valid Until:</span>
                    <p className="font-bold text-emerald-400 mt-0.5">{agreement.agreementEndDate}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-medium">SHA-256 Digital Checksum:</span>
                  <p className="font-mono text-[10px] text-slate-300 break-all bg-slate-800/90 p-2 rounded-xl border border-slate-700 mt-1">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </p>
                </div>
              </div>

              <button
                onClick={() => showToast(`Downloading ${agreement.agreementDocName}...`)}
                className="w-full py-3 bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Signed Agreement PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // DEDICATED FULL-PAGE VIEW: ADD NEW CLIENT PAGE
  // -------------------------------------------------------------
  if (viewMode === 'add') {
    return (
      <div className="space-y-6 w-full pb-16 font-sans text-slate-800 animate-in fade-in duration-200">
        {/* TOP PAGE HEADER WITH BACK BUTTON */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-200"
              title="Back to Clients List"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#6B3BF6]" />
                <span>Empanel New Client Partner</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill in the organization details, primary contact POC, commercial SLA terms, and upload the signed Master Services Agreement (MSA).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              form="add-client-full-form"
              type="submit"
              className="px-5 py-2 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save & Empanel Client</span>
            </button>
          </div>
        </div>

        {/* FULL PAGE FORM CONTAINER */}
        <form id="add-client-full-form" onSubmit={handleAddClientSubmit} className="space-y-6">
          {/* SECTION 1: CLIENT ORGANIZATION DETAILS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>1. Client Organization Details</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Client Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wipro Digital Solutions"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Industry Sector / Domain</label>
                <select
                  value={newClientDomain}
                  onChange={e => setNewClientDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="Software & Cloud Services">Software & Cloud Services</option>
                  <option value="Hardware & Automotive Engineering">Hardware & Automotive Engineering</option>
                  <option value="Enterprise Security & IT">Enterprise Security & IT</option>
                  <option value="Enterprise SAP & ERP">Enterprise SAP & ERP</option>
                  <option value="AI, Data & Analytics">AI, Data & Analytics</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Operating Location / Region</label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore / Hyderabad / Remote"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: PRIMARY POC & CONTACT DETAILS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <User className="w-5 h-5 text-purple-600" />
              <span>2. Primary Point of Contact (POC)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Primary POC Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newPocName}
                  onChange={e => setNewPocName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Procurement Lead / VP Hiring"
                  value={newPocDesignation}
                  onChange={e => setNewPocDesignation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Official Email Address</label>
                <input
                  type="email"
                  placeholder="ramesh.k@wipro.com"
                  value={newPocEmail}
                  onChange={e => setNewPocEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Mobile Contact Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={newPocPhone}
                  onChange={e => setNewPocPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: COMMERCIAL TERMS & SLA BENCHMARKS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-extrabold text-sm">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>3. Commercial SLA & Payment Terms</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Commercial Empanelment Fee %</label>
                <input
                  type="text"
                  placeholder="e.g. 8.33% Annual CTC"
                  value={newCommercialFee}
                  onChange={e => setNewCommercialFee(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Payment Credit Terms</label>
                <input
                  type="text"
                  placeholder="e.g. 30 Days Net"
                  value={newPaymentTerms}
                  onChange={e => setNewPaymentTerms(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">First Submission SLA TAT</label>
                <input
                  type="text"
                  placeholder="e.g. 3.0 Days"
                  value={newSlaTAT}
                  onChange={e => setNewSlaTAT(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: MASTER SERVICES AGREEMENT (MSA) ATTACHMENT */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <FileText className="w-5 h-5 text-[#6B3BF6]" />
                <span>4. Master Services Agreement (MSA) Contract</span>
              </div>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Active Legal Executed Contract
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Contract Effective Start Date</label>
                <input
                  type="date"
                  value={newAgreementStartDate}
                  onChange={e => setNewAgreementStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5">Contract Expiry / Renewal Date</label>
                <input
                  type="date"
                  value={newAgreementEndDate}
                  onChange={e => setNewAgreementEndDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold text-xs mb-1.5">Upload Signed MSA Agreement PDF / Document</label>
              <div
                onClick={() => document.getElementById('full-page-msa-upload')?.click()}
                className="border-2 border-dashed border-purple-200 rounded-2xl p-6 bg-purple-50/40 text-center cursor-pointer hover:bg-purple-50 transition-colors"
              >
                <Upload className="w-8 h-8 text-[#6B3BF6] mx-auto mb-2" />
                <p className="text-xs text-slate-800 font-bold">Click to attach signed Master Services Agreement (MSA)</p>
                <p className="text-[10px] text-slate-400 mt-1">Supports PDF, DOCX up to 25MB (Digital Signatures Accepted)</p>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={e => setNewAgreementDoc(e.target.files?.[0] || null)}
                  className="hidden"
                  id="full-page-msa-upload"
                />
              </div>
              {newAgreementDoc && (
                <p className="text-xs text-emerald-700 font-bold mt-2 text-center flex items-center justify-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Document Attached: {newAgreementDoc.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* BOTTOM SUBMIT BAR */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save & Empanel Client Partner</span>
            </button>
          </div>
        </form>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MAIN CLIENTS LIST PAGE
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 w-full pb-16 font-sans text-slate-800">
      {/* 1. TOP HEADER & ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Client Management</h1>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-200 inline-flex items-center gap-1.5 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{clients.length} Empaneled Clients</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage empaneled client accounts, view Master Services Agreements (MSA), and add new client partners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* BUTTON SWITCHES TO DEDICATED FULL-PAGE ADD CLIENT VIEW */}
          <button
            onClick={() => setViewMode('add')}
            className="px-4 py-2.5 bg-[#6B3BF6] hover:bg-[#5833E0] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Client</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Active Executed MSAs
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {clients.filter(c => c.agreementStatus === 'Active - Executed').length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Active Requirements
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
              {clients.reduce((acc, c) => acc + c.activeReqs, 0)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Average Commercial Fee
            </span>
            <p className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">10.3% CTC</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6B3BF6]">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. SEARCH & DOMAIN FILTER BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search client organization, POC, email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6B3BF6]"
          />
        </div>

        <div className="w-full sm:w-56">
          <select
            value={domainFilter}
            onChange={e => setDomainFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-[#6B3BF6] cursor-pointer"
          >
            <option value="All Domains">All Industry Domains</option>
            <option value="Software & Cloud Services">Software & Cloud Services</option>
            <option value="Hardware & Automotive Engineering">Hardware & Automotive Engineering</option>
            <option value="Enterprise Security & IT">Enterprise Security & IT</option>
            <option value="Enterprise SAP & ERP">Enterprise SAP & ERP</option>
            <option value="AI, Data & Analytics">AI, Data & Analytics</option>
          </select>
        </div>
      </div>

      {/* 4. CLIENTS TABLE LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">CLIENT ORGANIZATION</th>
                <th className="py-3.5 px-4">TEAM LEAD</th>
                <th className="py-3.5 px-4">TEAM MEMBERS WORKING</th>
                <th className="py-3.5 px-4 text-center">REQUIREMENTS</th>
                <th className="py-3.5 px-4 text-center">SUBMISSIONS</th>
                <th className="py-3.5 px-4">POC & COMMERCIALS</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {paginatedClients.map(client => (
                <tr
                  key={client.id}
                  onClick={() => setSelectedClientForGapAnalysis(client)}
                  className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                >
                  {/* Column 1: Client Organization */}
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => setSelectedClientForGapAnalysis(client)}
                        className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6B3BF6] to-[#5833E0] text-white font-extrabold flex items-center justify-center text-sm shrink-0 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
                        title="View Client Delivery Gap Analysis"
                      >
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          onClick={() => setSelectedClientForGapAnalysis(client)}
                          className="text-slate-900 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer hover:text-[#6B3BF6] transition-colors group"
                        >
                          <span className="group-hover:underline">{client.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                            {client.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#6B3BF6] font-semibold mt-0.5">{client.domain}</div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5">{client.location}</div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Team Lead */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-extrabold text-slate-900 text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{client.teamLead}</span>
                    </div>
                    <div className="text-[10px] text-purple-700 font-semibold mt-0.5">Assigned Team Lead</div>
                  </td>

                  {/* Column 3: Team Members Working */}
                  <td className="py-4 px-4 whitespace-nowrap min-w-56">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          setActiveDropdownClientId(activeDropdownClientId === client.id ? null : client.id)
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold cursor-pointer transition-all flex items-center justify-between gap-2 shadow-2xs ${
                          activeDropdownClientId === client.id
                            ? 'bg-[#6B3BF6] text-white border-[#5833E0] ring-2 ring-[#6B3BF6]/20'
                            : 'bg-purple-50 hover:bg-purple-100 text-[#6B3BF6] border-purple-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span>{client.teamMemberCount} Members</span>
                          <span className="opacity-75 font-normal text-[11px] truncate">({client.teamMembers[0]}...)</span>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${activeDropdownClientId === client.id ? 'rotate-180 text-white' : 'text-[#6B3BF6]'}`} />
                      </button>

                      {/* Custom Animated UI Dropdown Popover */}
                      {activeDropdownClientId === client.id && (
                        <>
                          {/* Backdrop overlay to close */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={e => {
                              e.stopPropagation()
                              setActiveDropdownClientId(null)
                            }}
                          />

                          <div
                            className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 p-3 space-y-2 font-sans animate-in fade-in zoom-in-95 duration-150"
                            onClick={e => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <Users className="w-3 h-3 text-[#6B3BF6]" />
                                <span>Assigned Recruiters</span>
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6B3BF6] text-[10px] font-extrabold">
                                {client.teamMemberCount} Members
                              </span>
                            </div>

                            <div className="space-y-1.5 max-h-48 overflow-y-auto">
                              {client.teamMembers.map((member, idx) => (
                                <div
                                  key={member}
                                  className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50/80 border border-slate-100 transition-colors flex items-center gap-2.5"
                                >
                                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#6B3BF6] font-extrabold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                                    {member.charAt(0)}
                                  </div>
                                  <div className="truncate">
                                    <div className="font-extrabold text-slate-900 text-xs truncate">{member}</div>
                                    <div className="text-[10px] text-slate-500 font-medium">
                                      {idx === 0 ? 'Lead Recruiter' : 'Team Member'}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Column 4: Requirements Count */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200 tabular-nums">
                      {client.activeReqs} Requirements
                    </span>
                  </td>

                  {/* Column 5: Submissions Count */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-purple-900 border border-purple-200 tabular-nums">
                      {client.totalSubmissions} Submissions
                    </span>
                  </td>

                  {/* Column 6: POC & Commercials */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                        <User className="w-3 h-3 text-purple-600" />
                        <span>{client.pocName}</span>
                      </div>
                      <div className="text-[10px] text-emerald-800 font-extrabold">
                        Fee: {client.commercialFee} ({client.slaTAT} TAT)
                      </div>
                    </div>
                  </td>

                  {/* Column 7: Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    {/* CLIENT DELIVERY GAP ANALYSIS BUTTON */}
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setSelectedClientForGapAnalysis(client)
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#6B3BF6] hover:bg-[#5833E0] text-white font-extrabold cursor-pointer inline-flex items-center gap-1.5 text-xs shadow-2xs transition-all active:scale-98"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Gap Analysis</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 10-ITEM PAGINATION FOOTER */}
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredClients.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-medium animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
