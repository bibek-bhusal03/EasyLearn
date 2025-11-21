import * as React from 'react'

export function Card({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-white border rounded-md shadow-sm p-4 ${className}`}>{children}</div>
  )
}

export function CardHeader({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-2 ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`text-lg font-medium text-slate-800 ${className}`}>{children}</div>
}

export function CardContent({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mt-2 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mt-4 ${className}`}>{children}</div>
}

export default Card
