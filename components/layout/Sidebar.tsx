'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Início' },
  { href: '/dashboard/invoices', label: 'Notas Fiscais' },
  { href: '/dashboard/reports', label: 'Relatórios' },
  { href: '/dashboard/leads', label: 'Leads' },
  { href: '/dashboard/settings', label: 'Configurações' },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed">
      <div className="p-6 border-b border-gray-700"><span className="text-xl font-bold">Assistly</span></div>
      <nav className="flex-1 p-4 space-y-2">
        <ul className="space-y-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`block px-4 py-2 rounded-lg text-sm transition-colors ${pathname === href ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
