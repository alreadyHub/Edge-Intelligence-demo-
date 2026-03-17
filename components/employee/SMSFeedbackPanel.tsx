'use client'

import { SMSMessage } from '@/types'

interface SMSBubbleProps {
  message: SMSMessage
  highlightName?: string
}

function highlightEmployee(text: string, name?: string): React.ReactNode {
  if (!name) return text
  const parts = text.split(new RegExp(`(${name})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === name.toLowerCase() ? (
      <span key={i} className="text-violet-400 font-medium">{part}</span>
    ) : (
      part
    )
  )
}

export function SMSBubble({ message, highlightName }: SMSBubbleProps) {
  return (
    <div className="bg-zinc-800 rounded-xl px-4 py-3 space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xs bg-zinc-700 text-zinc-400 rounded px-1.5 py-0.5">
          Member #{message.memberId}
        </span>
        <span className="text-xs text-zinc-600">{message.date}</span>
      </div>
      <p className="text-sm text-zinc-200 font-mono leading-relaxed">
        {highlightEmployee(message.message, highlightName || message.employeeName)}
      </p>
    </div>
  )
}

interface SMSFeedbackPanelProps {
  messages: SMSMessage[]
  employeeName?: string
}

export function SMSFeedbackPanel({ messages, employeeName }: SMSFeedbackPanelProps) {
  return (
    <div className="space-y-2">
      {messages.map((msg, i) => (
        <SMSBubble key={i} message={msg} highlightName={employeeName} />
      ))}
    </div>
  )
}
