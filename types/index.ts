export type TimeState = 'day1' | '30days' | '90days'
export type UpgradeStatus = 'free' | 'trial' | 'premium'
export type TrendDirection = 'improving' | 'stable' | 'declining'
export type LocationStatus = 'high-performing' | 'improving' | 'needs-attention'

export interface WeeklyDataPoint {
  week: string
  score: number
}

export interface SMSMessage {
  date: string
  memberId: string
  message: string
  employeeName?: string
}

export interface IssueCategory {
  name: string
  frequency: number
  locations: string[]
  samples: SMSMessage[]
}

export interface Employee {
  id: string
  name: string
  role: string
  locationId: string
  locationName: string
  scores: {
    day1: number
    '30days': number
    '90days': number
  }
  feedbackCounts: {
    day1: number
    '30days': number
    '90days': number
  }
  trend: TrendDirection
  strengths: string[]
  issues: string[]
  smsExamples: SMSMessage[]
  weeklyData: {
    '30days': WeeklyDataPoint[]
    '90days': WeeklyDataPoint[]
  }
}

export interface Location {
  id: string
  name: string
  city: string
  status: {
    day1: LocationStatus
    '30days': LocationStatus
    '90days': LocationStatus
  }
  scores: {
    day1: number
    '30days': number
    '90days': number
  }
  feedbackCounts: {
    day1: number
    '30days': number
    '90days': number
  }
  topStrength: string
  topIssue: string
  weeklyData: {
    '30days': WeeklyDataPoint[]
    '90days': WeeklyDataPoint[]
  }
  recentFeedback: SMSMessage[]
  strengths: { theme: string; samples: SMSMessage[] }[]
  issues: { theme: string; samples: SMSMessage[] }[]
}

export interface TimeContextType {
  timeState: TimeState
  setTimeState: (state: TimeState) => void
}

export interface UpgradeContextType {
  upgradeStatus: UpgradeStatus
  setUpgradeStatus: (status: UpgradeStatus) => void
  trialDaysRemaining: number
}
