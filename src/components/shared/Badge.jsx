import React from 'react'

const variants = {
  // Status colors
  active: 'bg-primary-100 text-primary-800',
  in_progress: 'bg-primary-200 text-primary-900',
  completed: 'bg-success-100 text-success-800',
  cancelled: 'bg-danger-100 text-danger-800',
  on_hold: 'bg-warning-100 text-warning-800',

  // Priority colors
  urgent: 'bg-danger-100 text-danger-800',
  high: 'bg-warning-200 text-warning-900',
  normal: 'bg-primary-100 text-primary-800',
  low: 'bg-gray-100 text-gray-800',

  // Task type colors
  call: 'bg-primary-100 text-primary-800',
  email: 'bg-success-100 text-success-800',
  voucher: 'bg-warning-100 text-warning-800',
  letter: 'bg-primary-200 text-primary-900',

  // Generic colors
  info: 'bg-primary-100 text-primary-800',
  success: 'bg-success-100 text-success-800',
  warning: 'bg-warning-100 text-warning-800',
  danger: 'bg-danger-100 text-danger-800',
  neutral: 'bg-gray-100 text-gray-800'
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${variants[variant] || variants.neutral}
      ${className}
    `}>
      {children}
    </span>
  )
}
