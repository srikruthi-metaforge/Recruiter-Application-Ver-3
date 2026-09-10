# Candidate Onboarding & Non-Joining Note Tracking System

## Overview of Implemented Features

### 1. Joined vs Not Joined Top Status Toggle Tab (`InterviewTrackingPage.tsx`)
The **Onboarding & Offer Outcome Track (Joined vs Not Joined)** is now integrated directly into the top main status switcher bar alongside `All Interviews`, `Upcoming`, `In Progress`, `Completed`, and `Rejections Track`:

- **Top Toggle Button**: `Joined vs Not Joined` tab pill with live candidate count badge.
- **Top Helper Banner**: When selected, displays an overview banner explaining the onboarding and non-joining tracking workflows.
- **Sub-Filter Pills**:
  - `All Offers`: Total list of offer letters released.
  - `Joined / On-boarded`: Filters candidates who successfully joined the client organization.
  - `Not Joined / Backed Out`: Filters candidates who backed out or declined the offer.
  - `Pending Response`: Candidates with active released/accepted offers awaiting onboarding date.
- **Upfront KPI Summary Bar**:
  - **Total Offers Released** count.
  - **Joined / On-boarded** count and joining rate percentage (`%`).
  - **Not Joined / Backed Out** count.
  - **Awaiting Onboarding** count.

---

### 2. Recruiter Non-Joining Notes & Reason Tracking
When a candidate backs out or does not join:
- **Mark Not Joined Action**:
  - Clicking **`Mark Not Joined`** or **`Add / Edit Note`** opens a dedicated modal: **Record Non-Joining Reason & Recruiter Note**.
- **Reason Category Selector**:
  - *Competing offer with higher compensation*
  - *Counter offer from current employer*
  - *Relocation / Location constraint*
  - *Shift timing / work mode mismatch*
  - *Personal / Family / Health issues*
  - *Joined another organization*
  - *Other*
- **Detailed Recruiter Note Textarea**:
  - Recruiters can enter custom background notes explaining why the candidate did not join (e.g. *"Candidate accepted offer from Microsoft with ₹34 LPA CTC (20% higher than approved client band)."*).
- **Non-Joining Note Card in Table**:
  - Displays a Rose **`Not Joined / Backed Out`** status badge along with the non-joining reason tag and recruiter note box in the candidate's table row.
- **View Non-Joining Details Modal**:
  - Clicking **`View Details`** on a non-joined candidate opens a detailed audit pop-up displaying candidate profile details, client name, offered CTC, non-joining category, and recruiter notes.

---

## Verification
- Built using Vite & React (`npm run build`). Clean compilation with 0 errors.
