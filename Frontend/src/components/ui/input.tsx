import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  return <input ref={ref} className={cn('w-full px-3 py-2 border rounded-md bg-white text-slate-700 outline-none focus-visible:ring-2 focus-visible:ring-blue-500')} {...props} />
})

Input.displayName = 'Input'
