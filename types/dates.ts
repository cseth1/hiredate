export interface DateEntry {
  benefitsEligibleDeadline: string
  nonBenefitsEligibleDeadline: string
  hireDate: string
  onboardingDate: string
  employeeTypes: string
  notes?: string
}

export interface DateData {
  [key: string]: DateEntry[]
}

