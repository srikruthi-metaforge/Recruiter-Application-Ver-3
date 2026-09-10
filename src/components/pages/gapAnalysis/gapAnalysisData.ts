import { Role } from '../../../types'

export interface ClientGapAnalysisProps {
  clientName: string
  clientDomain?: string
  pocName?: string
  pocEmail?: string
  pocPhone?: string
  teamLead?: string
  role?: Role
  userRole?: Role
  initialDateRange?: string
  onBack: () => void
  onSelectRequirement?: (reqId: string) => void
}

export interface ClientRequirementItem {
  id: string
  title: string
  domain: string
  positions: number | 'N/A'
  submissions: number
  spoc: string
  status: 'Open' | 'In Progress' | 'Closed'
  createdDate: string
  hasMissingDomain?: boolean
  hasNonNumericPositions?: boolean
  interviews: {
    candidateName: string
    stage: 'Final Select' | 'L1 Reject' | 'Awaiting / Pending' | 'L2 Interview' | 'Sourced'
    date: string
  }[]
}

export const STANDARDIZED_DOMAINS_LIST = [
  'Automotive / Mobility',
  'Aerospace & Defense',
  'Plant / Process / Industrial Engineering',
  'Product Engineering / CAD-CAE-PLM',
  'Embedded / Electronics / V&V',
  'Digital / IT / Data',
  'Medical Devices / Healthcare',
  'Energy / Oil & Gas / Renewables',
  'Manufacturing / Quality / Cost Engineering',
  'Warehouse / Supply Chain',
  'Enterprise Apps / Asset & Process Transformation',
  'Other / Needs Validation',
]

export function getClientGapAnalysisDataset(clientName: string = 'Accenture', clientPoc?: string): ClientRequirementItem[] {
  const safeClientName = (clientName || 'Accenture').trim()
  const seed = safeClientName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const clientCode = (safeClientName.length >= 3 ? safeClientName.substring(0, 3) : 'CLI').toUpperCase()

  const pseudoRandom = (index: number) => {
    const x = Math.sin(seed + index) * 10000
    return x - Math.floor(x)
  }

  const reqTitlesByDomain: Record<string, string[]> = {
    'Automotive / Mobility': [
      'EV Battery Management System Architect',
      'AUTOSAR Software Integration Specialist',
      'ADAS Perception & Sensor Fusion Lead',
      'Chassis & Powertrain Design Engineer',
      'Vehicle Dynamics Simulation Engineer',
    ],
    'Aerospace & Defense': [
      'Avionics Embedded Software Engineer',
      'DO-178C Safety Critical Systems Specialist',
      'Aerostructures Stress Analysis Engineer',
      'Flight Control Systems Specialist',
    ],
    'Plant / Process / Industrial Engineering': [
      'Industrial Automation & PLC Programmer',
      'SCADA Systems Integration Specialist',
      'Plant Layout & Process Optimization Lead',
      'Robotics & Conveyor Cell Engineer',
    ],
    'Product Engineering / CAD-CAE-PLM': [
      'CATIA V5/V6 Mechanical Design Specialist',
      'Teamcenter PLM Solution Architect',
      'ANSYS FEA Thermal & Structural Analyst',
      'CREO Plastics & Sheet Metal Engineer',
    ],
    'Embedded / Electronics / V&V': [
      'Embedded C/C++ Firmware Developer',
      'Hardware-in-the-Loop (HIL) Test Specialist',
      'PCB Design & Hardware Board Bringup Lead',
      'Microcontroller Driver Developer',
    ],
    'Digital / IT / Data': [
      'Senior Full Stack Java & Cloud Architect',
      'AWS / Azure DevOps Systems Lead',
      'Data Engineering & Snowflake Architect',
      'Cybersecurity & Network Infrastructure Specialist',
    ],
    'Medical Devices / Healthcare': [
      'ISO 13485 Medical Device Verification Lead',
      'FDA Regulatory Compliance Specialist',
      'Biomedical Signal Processing Engineer',
    ],
    'Energy / Oil & Gas / Renewables': [
      'Subsea Structural Integrity Engineer',
      'Solar & Wind Farm Substation Architect',
      'Pipeline Corrosion & Quality Analyst',
    ],
    'Manufacturing / Quality / Cost Engineering': [
      'Six Sigma Black Belt Quality Manager',
      'Should Costing & Value Engineering Lead',
      'GD&T Metrology Inspector Specialist',
    ],
    'Warehouse / Supply Chain': [
      'WMS / SAP Logistics Solution Consultant',
      'Supply Chain Demand Planning Analyst',
    ],
    'Enterprise Apps / Asset & Process Transformation': [
      'SAP S/4HANA Functional Consultant',
      'Salesforce Enterprise Solution Architect',
    ],
    'Other / Needs Validation': [
      'General Engineering Consultant',
      'Technical Support Specialist',
    ],
  }

  const spocList = ['Nirmal Dev', 'Harish Gadipally', 'Priyanka R', 'Kavya S', 'Anand K', 'Srikruthi M']
  const candidatesList = [
    'Rahul Verma', 'Sneha Patil', 'Amitav Ghosh', 'Preeti Nair',
    'Vikramaditya R', 'Divya M', 'Karthik Raja', 'Deepak Joshi',
    'Pooja Hegde', 'Siddharth Rao', 'Ananya Deshmukh', 'Rohan Mehta'
  ]

  const items: ClientRequirementItem[] = []
  const domains = Object.keys(reqTitlesByDomain)
  const totalReqs = 14 + Math.floor(pseudoRandom(1) * 8)

  for (let i = 1; i <= totalReqs; i++) {
    const domainIdx = Math.floor(pseudoRandom(i * 3) * domains.length)
    const selectedDomain = domains[domainIdx]
    const titles = reqTitlesByDomain[selectedDomain]
    const titleIdx = Math.floor(pseudoRandom(i * 7) * titles.length)
    const title = titles[titleIdx]

    const isNonNumericPos = i % 7 === 0
    const isMissingDomain = i % 9 === 0
    const positionsVal: number | 'N/A' = isNonNumericPos ? 'N/A' : (1 + Math.floor(pseudoRandom(i * 11) * 6))
    const submissionsVal = Math.floor(pseudoRandom(i * 13) * 12)
    const spocVal = spocList[Math.floor(pseudoRandom(i * 17) * spocList.length)]
    
    let statusVal: 'Open' | 'In Progress' | 'Closed' = 'Open'
    const statusRand = pseudoRandom(i * 19)
    if (statusRand > 0.6) statusVal = 'In Progress'
    else if (statusRand > 0.35) statusVal = 'Closed'

    const monthNum = 1 + Math.floor(pseudoRandom(i * 23) * 8)
    const dayNum = 1 + Math.floor(pseudoRandom(i * 29) * 27)
    const dateStr = `2026-${monthNum < 10 ? '0' + monthNum : monthNum}-${dayNum < 10 ? '0' + dayNum : dayNum}`

    const interviewCount = Math.floor(pseudoRandom(i * 31) * 4)
    const interviews: ClientRequirementItem['interviews'] = []
    const stagesList: ('Final Select' | 'L1 Reject' | 'Awaiting / Pending' | 'L2 Interview' | 'Sourced')[] = [
      'Final Select', 'L1 Reject', 'Awaiting / Pending', 'L2 Interview', 'Sourced'
    ]

    for (let j = 0; j < interviewCount; j++) {
      const cand = candidatesList[Math.floor(pseudoRandom(i * 37 + j) * candidatesList.length)]
      const stg = stagesList[Math.floor(pseudoRandom(i * 41 + j) * stagesList.length)]
      interviews.push({
        candidateName: cand,
        stage: stg,
        date: dateStr,
      })
    }

    items.push({
      id: `${clientCode}-REQ-2026-${100 + i}`,
      title,
      domain: isMissingDomain ? 'Other / Needs Validation' : selectedDomain,
      positions: positionsVal,
      submissions: submissionsVal,
      spoc: clientPoc || spocVal,
      status: statusVal,
      createdDate: dateStr,
      hasMissingDomain: isMissingDomain,
      hasNonNumericPositions: isNonNumericPos,
      interviews,
    })
  }

  return items
}
