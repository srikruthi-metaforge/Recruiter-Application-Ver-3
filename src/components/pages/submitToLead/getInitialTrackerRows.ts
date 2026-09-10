export function getInitialTrackerRows(selectedCandidates: any[], requirement: any) {
  if (selectedCandidates && selectedCandidates.length > 0) {
    return selectedCandidates.map((c, idx) => ({
      'Sl No': String(idx + 1),
      'Submission Date': '19/08/2026',
      'Skillset': requirement?.skills?.join(', ') || 'QA Lead, Selenium',
      'Candidate Name': c.name || 'Priyanka Sharma',
      'Contact Number': c.phone || '+91 98210 44905',
      'Email id': c.email || 'priyanka.sharma@gmail.com',
      'Total Yrs of Exp': c.totalExperience || '11 Years 3 Months',
      'Relevant Exp': c.relevantExperience || '9 Years',
      'Current Company': c.currentCompany || 'Cognizant Technology Solutions',
      'Current CTC': c.currentCtc || '18.5 LPA',
      'Expected CTC/Rate card': c.expectedCtc || '25 LPA',
      'Notice period': c.noticePeriod || '30 Days',
      'Current Location': c.currentLocation || 'Bangalore',
      'Preferred Location': c.preferredLocation || 'Bangalore / Hybrid',
      'Availability for Interview': c.interviewAvailability || 'Available weekdays',
      'Reason': c.reasonForChange || 'Career Advancement',
      'Offer in Hand': c.offerInHand || 'Yes',
      'Linkedin URL': 'https://linkedin.com/in/priyanka-sharma',
    }))
  }
  return [{
    'Sl No': '1',
    'Submission Date': '19/08/2026',
    'Skillset': requirement?.skills?.join(', ') || 'QA Lead, Selenium',
    'Candidate Name': 'Priyanka Sharma',
    'Contact Number': '+91 98210 44905',
    'Email id': 'priyanka.sharma@gmail.com',
    'Total Yrs of Exp': '11 Years 3 Months',
    'Relevant Exp': '9 Years',
    'Current Company': 'Cognizant Technology Solutions',
    'Current CTC': '18.5 LPA',
    'Expected CTC/Rate card': '25 LPA',
    'Notice period': '30 Days',
    'Current Location': 'Bangalore',
    'Preferred Location': 'Bangalore / Hybrid',
    'Availability for Interview': 'Available weekdays',
    'Reason': 'Career Advancement',
    'Offer in Hand': 'Yes',
    'Linkedin URL': 'https://linkedin.com/in/priyanka-sharma',
  }]
}
