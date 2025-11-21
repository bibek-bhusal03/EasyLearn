import * as React from 'react'

export function Badge({ children, variant = 'default', className = '' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger'; className?: string }) {
  const base = 'inline-flex items-center px-2 py-1 rounded-md text-sm font-semibold'
  let variantCls = 'bg-slate-200 text-slate-800'
  if (variant === 'success') variantCls = 'bg-green-500 text-white'
  if (variant === 'warning') variantCls = 'bg-amber-500 text-white'
  if (variant === 'danger') variantCls = 'bg-red-500 text-white'

  return <span className={`${base} ${variantCls} ${className}`}>{children}</span>
}

export default Badge
