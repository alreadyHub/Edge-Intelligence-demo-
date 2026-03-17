import { Location, Employee, IssueCategory, SMSMessage } from '@/types'

// SMS Examples
const sarahPositive: SMSMessage[] = [
  { date: 'Mar 12', memberId: '4821', message: "Sarah's 7am class is the only reason I get out of bed. She remembers everyone's name. 🔥", employeeName: 'Sarah M.' },
  { date: 'Mar 8', memberId: '3107', message: 'Best cycling class I\'ve ever taken. Sarah pushed us hard but knew when to dial it back.', employeeName: 'Sarah M.' },
  { date: 'Mar 3', memberId: '6644', message: 'Sarah always offers modifications. Really appreciate that as someone coming back from an injury.', employeeName: 'Sarah M.' },
]

const marcusPositive: SMSMessage[] = [
  { date: 'Mar 14', memberId: '2291', message: 'Marcus has really improved. His cueing has gotten so much more precise in the last few weeks.', employeeName: 'Marcus W.' },
  { date: 'Mar 10', memberId: '5502', message: 'Energy was great today. Marcus seems more confident than when I first started coming to his class.', employeeName: 'Marcus W.' },
]

const lilyNeedsAttention: SMSMessage[] = [
  { date: 'Mar 11', memberId: '1834', message: "Lily's class felt low energy today. Not the usual vibe.", employeeName: 'Lily C.' },
  { date: 'Mar 7', memberId: '4409', message: "I don't want to be harsh but I left the 6pm class early. The pacing was really off.", employeeName: 'Lily C.' },
  { date: 'Feb 28', memberId: '7721', message: 'Has Lily been okay? The last 3 classes have felt disengaged.', employeeName: 'Lily C.' },
]

const tomNeedsAttention: SMSMessage[] = [
  { date: 'Mar 13', memberId: '3318', message: "Tom seems distracted. Feels like he's going through the motions.", employeeName: 'Tom B.' },
  { date: 'Mar 5', memberId: '8801', message: 'No modifications offered today. I had to stop mid-class. That shouldn\'t happen.', employeeName: 'Tom B.' },
  { date: 'Feb 24', memberId: '2250', message: 'I really want Tom to succeed but the energy in his class is dragging the whole vibe.', employeeName: 'Tom B.' },
]

const cambridgeLateStarts: SMSMessage[] = [
  { date: 'Mar 15', memberId: '9943', message: '10 minutes late again. This keeps happening at Cambridge. Getting frustrating.' },
  { date: 'Mar 9', memberId: '6127', message: 'Love the instructors but the scheduling is a mess. Two classes overlapped today.' },
]

const formatFeedback: SMSMessage[] = [
  { date: 'Mar 12', memberId: '4102', message: 'The Pilates Sculpt format is incredible. Keep it on the schedule please.' },
  { date: 'Mar 6', memberId: '7733', message: 'HIIT at 6pm is too intense after work. Would love a lower-intensity option at that time slot.' },
]

const southEndPositive: SMSMessage[] = [
  { date: 'Mar 14', memberId: '5512', message: 'The community here is unreal. Front desk team makes you feel like family every time.', },
  { date: 'Mar 11', memberId: '3304', message: 'Chris led an incredible class today. The energy was contagious.', employeeName: 'Chris R.' },
  { date: 'Mar 8', memberId: '6621', message: 'Amara is such a great instructor. Always checks in on how I\'m feeling.', employeeName: 'Amara J.' },
]

const cambridgePositive: SMSMessage[] = [
  { date: 'Mar 13', memberId: '7712', message: 'Cleanest gym I\'ve been to. Always spotless.' },
  { date: 'Mar 10', memberId: '4430', message: 'Alex is a phenomenal instructor. Really improved my form today.', employeeName: 'Alex M.' },
  { date: 'Mar 6', memberId: '2218', message: 'Mia at the front desk is the best. Always so welcoming.', employeeName: 'Mia C.' },
]

// Employees
export const employees: Employee[] = [
  // Back Bay
  {
    id: 'sarah-m',
    name: 'Sarah M.',
    role: 'Lead Instructor',
    locationId: 'back-bay',
    locationName: 'Back Bay',
    scores: { day1: 4.6, '30days': 4.8, '90days': 4.9 },
    feedbackCounts: { day1: 3, '30days': 47, '90days': 142 },
    trend: 'improving',
    strengths: ['Energy & motivation', 'Remembers members names', 'Offers modifications'],
    issues: [],
    smsExamples: sarahPositive,
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.6 }, { week: 'W2', score: 4.7 }, { week: 'W3', score: 4.7 }, { week: 'W4', score: 4.8 },
      ],
      '90days': [
        { week: 'W1', score: 4.5 }, { week: 'W2', score: 4.6 }, { week: 'W3', score: 4.6 }, { week: 'W4', score: 4.7 },
        { week: 'W5', score: 4.7 }, { week: 'W6', score: 4.7 }, { week: 'W7', score: 4.8 }, { week: 'W8', score: 4.8 },
        { week: 'W9', score: 4.8 }, { week: 'W10', score: 4.8 }, { week: 'W11', score: 4.9 }, { week: 'W12', score: 4.9 }, { week: 'W13', score: 4.9 },
      ],
    },
  },
  {
    id: 'jake-t',
    name: 'Jake T.',
    role: 'Instructor',
    locationId: 'back-bay',
    locationName: 'Back Bay',
    scores: { day1: 4.3, '30days': 4.5, '90days': 4.6 },
    feedbackCounts: { day1: 2, '30days': 38, '90days': 115 },
    trend: 'stable',
    strengths: ['Class pacing', 'Music selection'],
    issues: ['Occasionally runs over time'],
    smsExamples: [
      { date: 'Mar 11', memberId: '3321', message: "Jake's playlist is always on point. Best music in the building.", employeeName: 'Jake T.' },
      { date: 'Mar 7', memberId: '5540', message: 'Solid class today. Jake keeps a good pace the whole hour.', employeeName: 'Jake T.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.4 }, { week: 'W2', score: 4.5 }, { week: 'W3', score: 4.5 }, { week: 'W4', score: 4.5 },
      ],
      '90days': [
        { week: 'W1', score: 4.3 }, { week: 'W2', score: 4.4 }, { week: 'W3', score: 4.4 }, { week: 'W4', score: 4.4 },
        { week: 'W5', score: 4.5 }, { week: 'W6', score: 4.5 }, { week: 'W7', score: 4.5 }, { week: 'W8', score: 4.5 },
        { week: 'W9', score: 4.5 }, { week: 'W10', score: 4.6 }, { week: 'W11', score: 4.6 }, { week: 'W12', score: 4.6 }, { week: 'W13', score: 4.6 },
      ],
    },
  },
  {
    id: 'priya-k',
    name: 'Priya K.',
    role: 'Instructor',
    locationId: 'back-bay',
    locationName: 'Back Bay',
    scores: { day1: 4.0, '30days': 4.2, '90days': 4.5 },
    feedbackCounts: { day1: 2, '30days': 33, '90days': 101 },
    trend: 'improving',
    strengths: ['Technical cueing', 'Member attentiveness'],
    issues: ['Energy dips in early morning classes'],
    smsExamples: [
      { date: 'Mar 13', memberId: '6601', message: "Priya corrected my form in a way that finally made sense. My back doesn't hurt anymore.", employeeName: 'Priya K.' },
      { date: 'Mar 9', memberId: '4412', message: 'Priya is so attentive. She noticed I was struggling and adjusted the class on the fly.', employeeName: 'Priya K.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.0 }, { week: 'W2', score: 4.1 }, { week: 'W3', score: 4.2 }, { week: 'W4', score: 4.2 },
      ],
      '90days': [
        { week: 'W1', score: 3.9 }, { week: 'W2', score: 4.0 }, { week: 'W3', score: 4.0 }, { week: 'W4', score: 4.1 },
        { week: 'W5', score: 4.1 }, { week: 'W6', score: 4.2 }, { week: 'W7', score: 4.2 }, { week: 'W8', score: 4.3 },
        { week: 'W9', score: 4.3 }, { week: 'W10', score: 4.4 }, { week: 'W11', score: 4.4 }, { week: 'W12', score: 4.5 }, { week: 'W13', score: 4.5 },
      ],
    },
  },
  {
    id: 'marcus-w',
    name: 'Marcus W.',
    role: 'Instructor',
    locationId: 'back-bay',
    locationName: 'Back Bay',
    scores: { day1: 3.7, '30days': 3.9, '90days': 4.2 },
    feedbackCounts: { day1: 2, '30days': 30, '90days': 98 },
    trend: 'improving',
    strengths: ['Improving confidence', 'Better cueing week over week'],
    issues: ['Still developing consistency'],
    smsExamples: marcusPositive,
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.7 }, { week: 'W2', score: 3.8 }, { week: 'W3', score: 3.9 }, { week: 'W4', score: 3.9 },
      ],
      '90days': [
        { week: 'W1', score: 3.5 }, { week: 'W2', score: 3.6 }, { week: 'W3', score: 3.6 }, { week: 'W4', score: 3.7 },
        { week: 'W5', score: 3.7 }, { week: 'W6', score: 3.8 }, { week: 'W7', score: 3.8 }, { week: 'W8', score: 3.9 },
        { week: 'W9', score: 4.0 }, { week: 'W10', score: 4.0 }, { week: 'W11', score: 4.1 }, { week: 'W12', score: 4.2 }, { week: 'W13', score: 4.2 },
      ],
    },
  },
  {
    id: 'lily-c',
    name: 'Lily C.',
    role: 'Instructor',
    locationId: 'back-bay',
    locationName: 'Back Bay',
    scores: { day1: 3.6, '30days': 3.4, '90days': 3.3 },
    feedbackCounts: { day1: 3, '30days': 28, '90days': 86 },
    trend: 'declining',
    strengths: ['Good form knowledge'],
    issues: ['Low energy in evening classes', 'Pacing inconsistent', 'Members flagging disengagement'],
    smsExamples: lilyNeedsAttention,
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.7 }, { week: 'W2', score: 3.5 }, { week: 'W3', score: 3.4 }, { week: 'W4', score: 3.4 },
      ],
      '90days': [
        { week: 'W1', score: 3.9 }, { week: 'W2', score: 3.8 }, { week: 'W3', score: 3.8 }, { week: 'W4', score: 3.7 },
        { week: 'W5', score: 3.7 }, { week: 'W6', score: 3.6 }, { week: 'W7', score: 3.5 }, { week: 'W8', score: 3.5 },
        { week: 'W9', score: 3.4 }, { week: 'W10', score: 3.4 }, { week: 'W11', score: 3.3 }, { week: 'W12', score: 3.3 }, { week: 'W13', score: 3.3 },
      ],
    },
  },
  {
    id: 'devon-h',
    name: 'Devon H.',
    role: 'Front Desk',
    locationId: 'back-bay',
    locationName: 'Back Bay',
    scores: { day1: 4.5, '30days': 4.7, '90days': 4.8 },
    feedbackCounts: { day1: 2, '30days': 24, '90days': 74 },
    trend: 'improving',
    strengths: ['Warmth & hospitality', 'Efficient check-in', 'Problem resolution'],
    issues: [],
    smsExamples: [
      { date: 'Mar 14', memberId: '8813', message: "Devon at the front desk is a gem. Always smiling and remembers my coffee order.", employeeName: 'Devon H.' },
      { date: 'Mar 10', memberId: '2230', message: "Had an issue with my membership and Devon sorted it in 2 minutes. That's how it should be.", employeeName: 'Devon H.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.6 }, { week: 'W2', score: 4.6 }, { week: 'W3', score: 4.7 }, { week: 'W4', score: 4.7 },
      ],
      '90days': [
        { week: 'W1', score: 4.4 }, { week: 'W2', score: 4.5 }, { week: 'W3', score: 4.5 }, { week: 'W4', score: 4.6 },
        { week: 'W5', score: 4.6 }, { week: 'W6', score: 4.6 }, { week: 'W7', score: 4.7 }, { week: 'W8', score: 4.7 },
        { week: 'W9', score: 4.7 }, { week: 'W10', score: 4.8 }, { week: 'W11', score: 4.8 }, { week: 'W12', score: 4.8 }, { week: 'W13', score: 4.8 },
      ],
    },
  },
  {
    id: 'zoe-a',
    name: 'Zoe A.',
    role: 'Instructor',
    locationId: 'back-bay',
    locationName: 'Back Bay',
    scores: { day1: 3.9, '30days': 4.1, '90days': 4.3 },
    feedbackCounts: { day1: 2, '30days': 29, '90days': 91 },
    trend: 'improving',
    strengths: ['Creative class formats', 'High energy'],
    issues: ['Music occasionally too loud'],
    smsExamples: [
      { date: 'Mar 12', memberId: '5523', message: "Zoe keeps it fresh every week. Never the same class twice.", employeeName: 'Zoe A.' },
      { date: 'Mar 8', memberId: '3312', message: "Zoe's energy is infectious. I dragged myself in and left on a high.", employeeName: 'Zoe A.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.9 }, { week: 'W2', score: 4.0 }, { week: 'W3', score: 4.1 }, { week: 'W4', score: 4.1 },
      ],
      '90days': [
        { week: 'W1', score: 3.8 }, { week: 'W2', score: 3.9 }, { week: 'W3', score: 3.9 }, { week: 'W4', score: 4.0 },
        { week: 'W5', score: 4.0 }, { week: 'W6', score: 4.1 }, { week: 'W7', score: 4.1 }, { week: 'W8', score: 4.2 },
        { week: 'W9', score: 4.2 }, { week: 'W10', score: 4.2 }, { week: 'W11', score: 4.3 }, { week: 'W12', score: 4.3 }, { week: 'W13', score: 4.3 },
      ],
    },
  },
  // South End
  {
    id: 'chris-r',
    name: 'Chris R.',
    role: 'Lead Instructor',
    locationId: 'south-end',
    locationName: 'South End',
    scores: { day1: 4.4, '30days': 4.6, '90days': 4.7 },
    feedbackCounts: { day1: 2, '30days': 42, '90days': 128 },
    trend: 'stable',
    strengths: ['Energy & motivation', 'Class structure'],
    issues: ['Occasionally runs long'],
    smsExamples: southEndPositive.filter(s => s.employeeName === 'Chris R.').concat([
      { date: 'Mar 6', memberId: '7711', message: 'Chris brings such positive energy. Every class feels like he prepared just for us.', employeeName: 'Chris R.' },
    ]),
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.5 }, { week: 'W2', score: 4.6 }, { week: 'W3', score: 4.6 }, { week: 'W4', score: 4.6 },
      ],
      '90days': [
        { week: 'W1', score: 4.4 }, { week: 'W2', score: 4.5 }, { week: 'W3', score: 4.5 }, { week: 'W4', score: 4.5 },
        { week: 'W5', score: 4.6 }, { week: 'W6', score: 4.6 }, { week: 'W7', score: 4.6 }, { week: 'W8', score: 4.7 },
        { week: 'W9', score: 4.7 }, { week: 'W10', score: 4.7 }, { week: 'W11', score: 4.7 }, { week: 'W12', score: 4.7 }, { week: 'W13', score: 4.7 },
      ],
    },
  },
  {
    id: 'amara-j',
    name: 'Amara J.',
    role: 'Instructor',
    locationId: 'south-end',
    locationName: 'South End',
    scores: { day1: 4.2, '30days': 4.4, '90days': 4.6 },
    feedbackCounts: { day1: 2, '30days': 36, '90days': 110 },
    trend: 'improving',
    strengths: ['Member attentiveness', 'Encouragement'],
    issues: [],
    smsExamples: southEndPositive.filter(s => s.employeeName === 'Amara J.').concat([
      { date: 'Mar 5', memberId: '8802', message: 'Amara noticed I was having an off day and checked in after class. That meant a lot.', employeeName: 'Amara J.' },
    ]),
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.3 }, { week: 'W2', score: 4.4 }, { week: 'W3', score: 4.4 }, { week: 'W4', score: 4.4 },
      ],
      '90days': [
        { week: 'W1', score: 4.1 }, { week: 'W2', score: 4.2 }, { week: 'W3', score: 4.2 }, { week: 'W4', score: 4.3 },
        { week: 'W5', score: 4.3 }, { week: 'W6', score: 4.4 }, { week: 'W7', score: 4.4 }, { week: 'W8', score: 4.5 },
        { week: 'W9', score: 4.5 }, { week: 'W10', score: 4.5 }, { week: 'W11', score: 4.6 }, { week: 'W12', score: 4.6 }, { week: 'W13', score: 4.6 },
      ],
    },
  },
  {
    id: 'tom-b',
    name: 'Tom B.',
    role: 'Instructor',
    locationId: 'south-end',
    locationName: 'South End',
    scores: { day1: 2.7, '30days': 2.9, '90days': 3.2 },
    feedbackCounts: { day1: 3, '30days': 31, '90days': 95 },
    trend: 'improving',
    strengths: ['Class knowledge'],
    issues: ['Low energy', 'Not offering modifications', 'Members feel disengaged'],
    smsExamples: tomNeedsAttention,
    weeklyData: {
      '30days': [
        { week: 'W1', score: 2.7 }, { week: 'W2', score: 2.8 }, { week: 'W3', score: 2.9 }, { week: 'W4', score: 2.9 },
      ],
      '90days': [
        { week: 'W1', score: 2.5 }, { week: 'W2', score: 2.6 }, { week: 'W3', score: 2.6 }, { week: 'W4', score: 2.7 },
        { week: 'W5', score: 2.8 }, { week: 'W6', score: 2.8 }, { week: 'W7', score: 2.9 }, { week: 'W8', score: 3.0 },
        { week: 'W9', score: 3.0 }, { week: 'W10', score: 3.1 }, { week: 'W11', score: 3.1 }, { week: 'W12', score: 3.2 }, { week: 'W13', score: 3.2 },
      ],
    },
  },
  {
    id: 'nina-p',
    name: 'Nina P.',
    role: 'Instructor',
    locationId: 'south-end',
    locationName: 'South End',
    scores: { day1: 4.0, '30days': 4.1, '90days': 4.0 },
    feedbackCounts: { day1: 2, '30days': 28, '90days': 87 },
    trend: 'stable',
    strengths: ['Consistent delivery', 'Good cueing'],
    issues: ['Class format could use more variety'],
    smsExamples: [
      { date: 'Mar 10', memberId: '6614', message: 'Nina always delivers. Consistent, professional, solid class.', employeeName: 'Nina P.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.1 }, { week: 'W2', score: 4.1 }, { week: 'W3', score: 4.1 }, { week: 'W4', score: 4.1 },
      ],
      '90days': [
        { week: 'W1', score: 4.1 }, { week: 'W2', score: 4.1 }, { week: 'W3', score: 4.0 }, { week: 'W4', score: 4.1 },
        { week: 'W5', score: 4.1 }, { week: 'W6', score: 4.0 }, { week: 'W7', score: 4.0 }, { week: 'W8', score: 4.1 },
        { week: 'W9', score: 4.0 }, { week: 'W10', score: 4.0 }, { week: 'W11', score: 4.0 }, { week: 'W12', score: 4.0 }, { week: 'W13', score: 4.0 },
      ],
    },
  },
  {
    id: 'sam-l',
    name: 'Sam L.',
    role: 'Instructor',
    locationId: 'south-end',
    locationName: 'South End',
    scores: { day1: 3.4, '30days': 3.6, '90days': 4.0 },
    feedbackCounts: { day1: 2, '30days': 27, '90days': 84 },
    trend: 'improving',
    strengths: ['Shows improvement', 'Building rapport with members'],
    issues: ['Needs more experience with modifications'],
    smsExamples: [
      { date: 'Mar 13', memberId: '4425', message: "Sam's gotten so much better. Really noticing the improvement week over week.", employeeName: 'Sam L.' },
      { date: 'Mar 9', memberId: '7736', message: "Sam is finding his groove. Still a few rough edges but I can see the growth.", employeeName: 'Sam L.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.4 }, { week: 'W2', score: 3.5 }, { week: 'W3', score: 3.6 }, { week: 'W4', score: 3.6 },
      ],
      '90days': [
        { week: 'W1', score: 3.2 }, { week: 'W2', score: 3.3 }, { week: 'W3', score: 3.4 }, { week: 'W4', score: 3.5 },
        { week: 'W5', score: 3.5 }, { week: 'W6', score: 3.6 }, { week: 'W7', score: 3.7 }, { week: 'W8', score: 3.8 },
        { week: 'W9', score: 3.8 }, { week: 'W10', score: 3.9 }, { week: 'W11', score: 3.9 }, { week: 'W12', score: 4.0 }, { week: 'W13', score: 4.0 },
      ],
    },
  },
  {
    id: 'kai-f',
    name: 'Kai F.',
    role: 'Front Desk',
    locationId: 'south-end',
    locationName: 'South End',
    scores: { day1: 4.3, '30days': 4.5, '90days': 4.5 },
    feedbackCounts: { day1: 2, '30days': 21, '90days': 67 },
    trend: 'stable',
    strengths: ['Community feel', 'Warm welcome'],
    issues: [],
    smsExamples: southEndPositive.filter(s => !s.employeeName).concat([
      { date: 'Mar 12', memberId: '9921', message: "Kai at the front desk makes the whole experience. Love this studio.", employeeName: 'Kai F.' },
    ]),
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.4 }, { week: 'W2', score: 4.5 }, { week: 'W3', score: 4.5 }, { week: 'W4', score: 4.5 },
      ],
      '90days': [
        { week: 'W1', score: 4.3 }, { week: 'W2', score: 4.4 }, { week: 'W3', score: 4.4 }, { week: 'W4', score: 4.5 },
        { week: 'W5', score: 4.5 }, { week: 'W6', score: 4.5 }, { week: 'W7', score: 4.5 }, { week: 'W8', score: 4.5 },
        { week: 'W9', score: 4.5 }, { week: 'W10', score: 4.5 }, { week: 'W11', score: 4.5 }, { week: 'W12', score: 4.5 }, { week: 'W13', score: 4.5 },
      ],
    },
  },
  {
    id: 'rachel-d',
    name: 'Rachel D.',
    role: 'Instructor',
    locationId: 'south-end',
    locationName: 'South End',
    scores: { day1: 3.6, '30days': 3.8, '90days': 4.2 },
    feedbackCounts: { day1: 2, '30days': 26, '90days': 81 },
    trend: 'improving',
    strengths: ['Improving week over week', 'Good technical knowledge'],
    issues: ['Early classes feel low energy'],
    smsExamples: [
      { date: 'Mar 11', memberId: '3317', message: "Rachel's really come into her own lately. Her classes feel so much more confident.", employeeName: 'Rachel D.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.6 }, { week: 'W2', score: 3.7 }, { week: 'W3', score: 3.8 }, { week: 'W4', score: 3.8 },
      ],
      '90days': [
        { week: 'W1', score: 3.4 }, { week: 'W2', score: 3.5 }, { week: 'W3', score: 3.5 }, { week: 'W4', score: 3.6 },
        { week: 'W5', score: 3.7 }, { week: 'W6', score: 3.7 }, { week: 'W7', score: 3.8 }, { week: 'W8', score: 3.9 },
        { week: 'W9', score: 4.0 }, { week: 'W10', score: 4.0 }, { week: 'W11', score: 4.1 }, { week: 'W12', score: 4.2 }, { week: 'W13', score: 4.2 },
      ],
    },
  },
  // Cambridge
  {
    id: 'alex-m',
    name: 'Alex M.',
    role: 'Lead Instructor',
    locationId: 'cambridge',
    locationName: 'Cambridge',
    scores: { day1: 4.1, '30days': 4.3, '90days': 4.5 },
    feedbackCounts: { day1: 2, '30days': 37, '90days': 113 },
    trend: 'improving',
    strengths: ['Technical expertise', 'Form correction'],
    issues: ['Class sometimes feels rushed'],
    smsExamples: cambridgePositive.filter(s => s.employeeName === 'Alex M.').concat([
      { date: 'Mar 7', memberId: '5518', message: "Alex is the reason I keep coming back to Cambridge. Phenomenal instructor.", employeeName: 'Alex M.' },
    ]),
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.1 }, { week: 'W2', score: 4.2 }, { week: 'W3', score: 4.3 }, { week: 'W4', score: 4.3 },
      ],
      '90days': [
        { week: 'W1', score: 3.9 }, { week: 'W2', score: 4.0 }, { week: 'W3', score: 4.0 }, { week: 'W4', score: 4.1 },
        { week: 'W5', score: 4.1 }, { week: 'W6', score: 4.2 }, { week: 'W7', score: 4.2 }, { week: 'W8', score: 4.3 },
        { week: 'W9', score: 4.3 }, { week: 'W10', score: 4.4 }, { week: 'W11', score: 4.4 }, { week: 'W12', score: 4.5 }, { week: 'W13', score: 4.5 },
      ],
    },
  },
  {
    id: 'jordan-s',
    name: 'Jordan S.',
    role: 'Instructor',
    locationId: 'cambridge',
    locationName: 'Cambridge',
    scores: { day1: 2.9, '30days': 3.1, '90days': 3.6 },
    feedbackCounts: { day1: 2, '30days': 28, '90days': 86 },
    trend: 'improving',
    strengths: ['Shows development', 'Members rooting for them'],
    issues: ['Inconsistent modifications', 'Energy still developing'],
    smsExamples: [
      { date: 'Mar 12', memberId: '6624', message: "Jordan is getting better each week. You can see them growing into the role.", employeeName: 'Jordan S.' },
      { date: 'Mar 5', memberId: '4413', message: "Some rough spots in Jordan's class but I can tell they're trying hard.", employeeName: 'Jordan S.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 2.9 }, { week: 'W2', score: 3.0 }, { week: 'W3', score: 3.0 }, { week: 'W4', score: 3.1 },
      ],
      '90days': [
        { week: 'W1', score: 2.7 }, { week: 'W2', score: 2.8 }, { week: 'W3', score: 2.9 }, { week: 'W4', score: 2.9 },
        { week: 'W5', score: 3.0 }, { week: 'W6', score: 3.0 }, { week: 'W7', score: 3.1 }, { week: 'W8', score: 3.2 },
        { week: 'W9', score: 3.3 }, { week: 'W10', score: 3.4 }, { week: 'W11', score: 3.5 }, { week: 'W12', score: 3.6 }, { week: 'W13', score: 3.6 },
      ],
    },
  },
  {
    id: 'taylor-w',
    name: 'Taylor W.',
    role: 'Instructor',
    locationId: 'cambridge',
    locationName: 'Cambridge',
    scores: { day1: 2.8, '30days': 2.7, '90days': 2.9 },
    feedbackCounts: { day1: 3, '30days': 24, '90days': 74 },
    trend: 'declining',
    strengths: ['Class knowledge'],
    issues: ['Not offering modifications', 'Members feeling unseen', 'Inconsistent effort'],
    smsExamples: [
      { date: 'Mar 14', memberId: '7720', message: "Taylor's class is getting worse, not better. I've noticed it for a few weeks now.", employeeName: 'Taylor W.' },
      { date: 'Mar 8', memberId: '3309', message: "No modifications offered at all. I have a knee issue and had to guess my way through.", employeeName: 'Taylor W.' },
      { date: 'Mar 2', memberId: '5516', message: "Taylor doesn't seem to care about the members. Just going through the motions.", employeeName: 'Taylor W.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 2.9 }, { week: 'W2', score: 2.8 }, { week: 'W3', score: 2.7 }, { week: 'W4', score: 2.7 },
      ],
      '90days': [
        { week: 'W1', score: 3.2 }, { week: 'W2', score: 3.1 }, { week: 'W3', score: 3.0 }, { week: 'W4', score: 2.9 },
        { week: 'W5', score: 2.9 }, { week: 'W6', score: 2.8 }, { week: 'W7', score: 2.8 }, { week: 'W8', score: 2.7 },
        { week: 'W9', score: 2.8 }, { week: 'W10', score: 2.8 }, { week: 'W11', score: 2.9 }, { week: 'W12', score: 2.9 }, { week: 'W13', score: 2.9 },
      ],
    },
  },
  {
    id: 'brianna-k',
    name: 'Brianna K.',
    role: 'Instructor',
    locationId: 'cambridge',
    locationName: 'Cambridge',
    scores: { day1: 3.7, '30days': 3.9, '90days': 4.1 },
    feedbackCounts: { day1: 2, '30days': 27, '90days': 83 },
    trend: 'improving',
    strengths: ['Warm demeanor', 'Good at modifications'],
    issues: ['Class pacing could be tighter'],
    smsExamples: [
      { date: 'Mar 11', memberId: '8815', message: "Brianna is so warm and welcoming. Perfect for the 8am slot.", employeeName: 'Brianna K.' },
      { date: 'Mar 7', memberId: '4408', message: "Brianna offered modifications throughout the whole class. Really appreciated it.", employeeName: 'Brianna K.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.7 }, { week: 'W2', score: 3.8 }, { week: 'W3', score: 3.9 }, { week: 'W4', score: 3.9 },
      ],
      '90days': [
        { week: 'W1', score: 3.5 }, { week: 'W2', score: 3.6 }, { week: 'W3', score: 3.6 }, { week: 'W4', score: 3.7 },
        { week: 'W5', score: 3.7 }, { week: 'W6', score: 3.8 }, { week: 'W7', score: 3.8 }, { week: 'W8', score: 3.9 },
        { week: 'W9', score: 3.9 }, { week: 'W10', score: 4.0 }, { week: 'W11', score: 4.0 }, { week: 'W12', score: 4.1 }, { week: 'W13', score: 4.1 },
      ],
    },
  },
  {
    id: 'owen-l',
    name: 'Owen L.',
    role: 'Instructor',
    locationId: 'cambridge',
    locationName: 'Cambridge',
    scores: { day1: 3.3, '30days': 3.5, '90days': 3.8 },
    feedbackCounts: { day1: 2, '30days': 23, '90days': 71 },
    trend: 'improving',
    strengths: ['Improving energy', 'Better pacing recently'],
    issues: ['Started slow, still catching up'],
    smsExamples: [
      { date: 'Mar 13', memberId: '2221', message: "Owen has gotten noticeably better. Glad management kept him — the growth is real.", employeeName: 'Owen L.' },
    ],
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.3 }, { week: 'W2', score: 3.4 }, { week: 'W3', score: 3.5 }, { week: 'W4', score: 3.5 },
      ],
      '90days': [
        { week: 'W1', score: 3.1 }, { week: 'W2', score: 3.2 }, { week: 'W3', score: 3.2 }, { week: 'W4', score: 3.3 },
        { week: 'W5', score: 3.4 }, { week: 'W6', score: 3.4 }, { week: 'W7', score: 3.5 }, { week: 'W8', score: 3.6 },
        { week: 'W9', score: 3.6 }, { week: 'W10', score: 3.7 }, { week: 'W11', score: 3.7 }, { week: 'W12', score: 3.8 }, { week: 'W13', score: 3.8 },
      ],
    },
  },
  {
    id: 'mia-c',
    name: 'Mia C.',
    role: 'Front Desk',
    locationId: 'cambridge',
    locationName: 'Cambridge',
    scores: { day1: 4.4, '30days': 4.6, '90days': 4.7 },
    feedbackCounts: { day1: 2, '30days': 20, '90days': 62 },
    trend: 'improving',
    strengths: ['Warm welcome', 'Professionalism'],
    issues: [],
    smsExamples: cambridgePositive.filter(s => s.employeeName === 'Mia C.').concat([
      { date: 'Mar 9', memberId: '6626', message: "Mia remembered my name on my second visit. Little things like that matter.", employeeName: 'Mia C.' },
    ]),
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.5 }, { week: 'W2', score: 4.5 }, { week: 'W3', score: 4.6 }, { week: 'W4', score: 4.6 },
      ],
      '90days': [
        { week: 'W1', score: 4.3 }, { week: 'W2', score: 4.4 }, { week: 'W3', score: 4.4 }, { week: 'W4', score: 4.5 },
        { week: 'W5', score: 4.5 }, { week: 'W6', score: 4.5 }, { week: 'W7', score: 4.6 }, { week: 'W8', score: 4.6 },
        { week: 'W9', score: 4.6 }, { week: 'W10', score: 4.7 }, { week: 'W11', score: 4.7 }, { week: 'W12', score: 4.7 }, { week: 'W13', score: 4.7 },
      ],
    },
  },
]

// Locations
export const locations: Location[] = [
  {
    id: 'back-bay',
    name: 'Back Bay',
    city: 'Boston, MA',
    status: {
      day1: 'high-performing',
      '30days': 'high-performing',
      '90days': 'high-performing',
    },
    scores: { day1: 4.1, '30days': 4.3, '90days': 4.6 },
    feedbackCounts: { day1: 0, '30days': 214, '90days': 687 },
    topStrength: 'Instructor energy + class pacing',
    topIssue: 'Music selection (minor)',
    weeklyData: {
      '30days': [
        { week: 'W1', score: 4.1 }, { week: 'W2', score: 4.2 }, { week: 'W3', score: 4.2 }, { week: 'W4', score: 4.3 },
      ],
      '90days': [
        { week: 'W1', score: 4.0 }, { week: 'W2', score: 4.1 }, { week: 'W3', score: 4.0 }, { week: 'W4', score: 4.2 },
        { week: 'W5', score: 4.3 }, { week: 'W6', score: 4.2 }, { week: 'W7', score: 4.4 }, { week: 'W8', score: 4.3 },
        { week: 'W9', score: 4.5 }, { week: 'W10', score: 4.4 }, { week: 'W11', score: 4.5 }, { week: 'W12', score: 4.6 }, { week: 'W13', score: 4.6 },
      ],
    },
    recentFeedback: [
      ...sarahPositive,
      ...marcusPositive,
      ...lilyNeedsAttention,
      { date: 'Mar 6', memberId: '7733', message: 'HIIT at 6pm is too intense after work. Would love a lower-intensity option at that time slot.' },
    ],
    strengths: [
      { theme: 'Instructor energy & motivation', samples: sarahPositive },
      { theme: 'Class pacing', samples: [{ date: 'Mar 8', memberId: '3107', message: 'Best cycling class I\'ve ever taken. Sarah pushed us hard but knew when to dial it back.', employeeName: 'Sarah M.' }] },
      { theme: 'Modifications offered', samples: [{ date: 'Mar 3', memberId: '6644', message: 'Sarah always offers modifications. Really appreciate that as someone coming back from an injury.', employeeName: 'Sarah M.' }] },
    ],
    issues: [
      { theme: 'Music selection', samples: [{ date: 'Mar 6', memberId: '7733', message: 'HIIT at 6pm is too intense after work. Would love a lower-intensity option at that time slot.' }] },
      { theme: 'Instructor energy (specific)', samples: lilyNeedsAttention },
      { theme: 'Class format fit', samples: formatFeedback },
    ],
  },
  {
    id: 'south-end',
    name: 'South End',
    city: 'Boston, MA',
    status: {
      day1: 'improving',
      '30days': 'needs-attention',
      '90days': 'improving',
    },
    scores: { day1: 3.8, '30days': 3.7, '90days': 4.1 },
    feedbackCounts: { day1: 0, '30days': 189, '90days': 601 },
    topStrength: 'Community feel, front desk warmth',
    topIssue: 'One instructor underperforming; class format confusion',
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.8 }, { week: 'W2', score: 3.7 }, { week: 'W3', score: 3.7 }, { week: 'W4', score: 3.7 },
      ],
      '90days': [
        { week: 'W1', score: 3.6 }, { week: 'W2', score: 3.5 }, { week: 'W3', score: 3.5 }, { week: 'W4', score: 3.6 },
        { week: 'W5', score: 3.6 }, { week: 'W6', score: 3.7 }, { week: 'W7', score: 3.7 }, { week: 'W8', score: 3.8 },
        { week: 'W9', score: 3.9 }, { week: 'W10', score: 4.0 }, { week: 'W11', score: 4.0 }, { week: 'W12', score: 4.1 }, { week: 'W13', score: 4.1 },
      ],
    },
    recentFeedback: [
      ...southEndPositive,
      ...tomNeedsAttention,
      { date: 'Mar 12', memberId: '4102', message: 'The Pilates Sculpt format is incredible. Keep it on the schedule please.' },
    ],
    strengths: [
      { theme: 'Community feel', samples: southEndPositive.filter(s => !s.employeeName) },
      { theme: 'Front desk warmth', samples: [{ date: 'Mar 14', memberId: '5512', message: 'The community here is unreal. Front desk team makes you feel like family every time.' }] },
      { theme: 'Lead instructor performance', samples: southEndPositive.filter(s => s.employeeName === 'Chris R.') },
    ],
    issues: [
      { theme: 'Instructor engagement', samples: tomNeedsAttention },
      { theme: 'Modifications offered', samples: [{ date: 'Mar 5', memberId: '8801', message: 'No modifications offered today. I had to stop mid-class. That shouldn\'t happen.', employeeName: 'Tom B.' }] },
      { theme: 'Class format fit', samples: [{ date: 'Mar 12', memberId: '4102', message: 'The Pilates Sculpt format is incredible. Keep it on the schedule please.' }] },
    ],
  },
  {
    id: 'cambridge',
    name: 'Cambridge',
    city: 'Cambridge, MA',
    status: {
      day1: 'needs-attention',
      '30days': 'needs-attention',
      '90days': 'improving',
    },
    scores: { day1: 3.5, '30days': 3.4, '90days': 3.9 },
    feedbackCounts: { day1: 0, '30days': 143, '90days': 468 },
    topStrength: 'Facility cleanliness',
    topIssue: 'Instructor consistency; modifications not offered; late starts',
    weeklyData: {
      '30days': [
        { week: 'W1', score: 3.5 }, { week: 'W2', score: 3.4 }, { week: 'W3', score: 3.4 }, { week: 'W4', score: 3.4 },
      ],
      '90days': [
        { week: 'W1', score: 3.3 }, { week: 'W2', score: 3.2 }, { week: 'W3', score: 3.3 }, { week: 'W4', score: 3.3 },
        { week: 'W5', score: 3.4 }, { week: 'W6', score: 3.4 }, { week: 'W7', score: 3.5 }, { week: 'W8', score: 3.6 },
        { week: 'W9', score: 3.6 }, { week: 'W10', score: 3.7 }, { week: 'W11', score: 3.8 }, { week: 'W12', score: 3.9 }, { week: 'W13', score: 3.9 },
      ],
    },
    recentFeedback: [
      ...cambridgePositive,
      ...cambridgeLateStarts,
      { date: 'Mar 8', memberId: '3309', message: 'No modifications offered at all. I have a knee issue and had to guess my way through.', employeeName: 'Taylor W.' },
    ],
    strengths: [
      { theme: 'Facility cleanliness', samples: [{ date: 'Mar 13', memberId: '7712', message: 'Cleanest gym I\'ve been to. Always spotless.' }] },
      { theme: 'Front desk experience', samples: cambridgePositive.filter(s => s.employeeName === 'Mia C.') },
      { theme: 'Lead instructor quality', samples: cambridgePositive.filter(s => s.employeeName === 'Alex M.') },
    ],
    issues: [
      { theme: 'Late starts / scheduling', samples: cambridgeLateStarts },
      { theme: 'Modifications not offered', samples: [{ date: 'Mar 8', memberId: '3309', message: 'No modifications offered at all. I have a knee issue and had to guess my way through.', employeeName: 'Taylor W.' }] },
      { theme: 'Instructor consistency', samples: [{ date: 'Mar 14', memberId: '7720', message: "Taylor's class is getting worse, not better. I've noticed it for a few weeks now.", employeeName: 'Taylor W.' }] },
    ],
  },
]

// Top Issues (network-wide)
export const topIssues: IssueCategory[] = [
  {
    name: 'Instructor energy & motivation',
    frequency: 87,
    locations: ['Back Bay', 'South End'],
    samples: [...lilyNeedsAttention.slice(0, 2), ...tomNeedsAttention.slice(0, 1)],
  },
  {
    name: 'Modifications not offered',
    frequency: 64,
    locations: ['South End', 'Cambridge'],
    samples: [
      { date: 'Mar 5', memberId: '8801', message: 'No modifications offered today. I had to stop mid-class. That shouldn\'t happen.', employeeName: 'Tom B.' },
      { date: 'Mar 8', memberId: '3309', message: 'No modifications offered at all. I have a knee issue and had to guess my way through.', employeeName: 'Taylor W.' },
    ],
  },
  {
    name: 'Late starts / scheduling',
    frequency: 51,
    locations: ['Cambridge'],
    samples: cambridgeLateStarts,
  },
  {
    name: 'Class format fit',
    frequency: 43,
    locations: ['Back Bay', 'South End'],
    samples: formatFeedback,
  },
  {
    name: 'Music selection',
    frequency: 28,
    locations: ['Back Bay'],
    samples: [{ date: 'Mar 6', memberId: '7733', message: 'HIIT at 6pm is too intense after work. Would love a lower-intensity option at that time slot.' }],
  },
]

// Helper: get employees for a location
export function getLocationEmployees(locationId: string): Employee[] {
  return employees.filter(e => e.locationId === locationId)
}

// Helper: get employee by id
export function getEmployee(id: string): Employee | undefined {
  return employees.find(e => e.id === id)
}

// Helper: get location by id
export function getLocation(id: string): Location | undefined {
  return locations.find(l => l.id === id)
}

// Network-wide overview stats
export const overviewStats = {
  day1: { score: 3.8, feedbackCount: 0, locationsTracked: 3, topIssue: 'Instructor energy' },
  '30days': { score: 3.8, feedbackCount: 546, locationsTracked: 3, topIssue: 'Instructor energy & motivation' },
  '90days': { score: 4.2, feedbackCount: 1756, locationsTracked: 3, topIssue: 'Modifications not offered' },
}
