import * as React from 'react'

export function Table({ children, className = '' }: React.HTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full table-auto ${className}`}>{children}</table>
}

export function TableHead({ children, className = '' }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className}>{children}</thead>
}

export function TableRow({ children, className = '' }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={className}>{children}</tr>
}

export function TableCell({ children, className = '' }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`py-2 ${className}`}>{children}</td>
}

export function TableHeaderCell({ children, className = '' }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={`pb-2 text-left text-sm text-slate-500 ${className}`}>{children}</th>
}

export default Table
