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
  commercialFee: string
  paymentTerms: string
  slaTAT: string
  agreementStatus: 'Active - Executed' | 'Pending Signature' | 'Under Legal Review' | 'Expired'
  agreementStartDate: string
  agreementEndDate: string
  agreementDocName: string
  signedBy: string
  signedDate: string
}

export const INITIAL_CLIENTS: ClientRecord[] = [
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
    paymentTerms: '30 Days Net',
    slaTAT: '2.1 Days',
    agreementStatus: 'Active - Executed',
    agreementStartDate: '05 Jan 2025',
    agreementEndDate: '04 Jan 2028',
    agreementDocName: 'LTTS_Mobility_Services_MSA.pdf',
    signedBy: 'Trayeetanu Ganguly (Sourcing Lead)',
    signedDate: '05 Jan 2025',
  },
]
