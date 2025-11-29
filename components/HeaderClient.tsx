'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface ContactItem {
  href: string
  label: string
}

export default function HeaderClient({ contactItems }: { contactItems: ContactItem[] }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4">
        <Link href="/" className="text-xl font-bold">
          PINAR KAZAK
        </Link>
        <div className="flex gap-6">
          {contactItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${pathname === item.href ? 'font-medium' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

