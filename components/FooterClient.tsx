'use client'

import Link from 'next/link'

export interface ContactItem {
  href: string
  label: string
}

interface FooterClientProps {
  contactItems: ContactItem[]
}

export default function FooterClient({ contactItems }: FooterClientProps) {
  return (
    <footer className="mt-auto" style={{ minHeight: '50vh', background: 'var(--text)', color: 'var(--background)', overflowY: 'auto' }}>
      <div className="mx-auto max-w-7xl px-6 py-8 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <p className="text-sm">
            © {new Date().getFullYear()} PINAR KAZAK. Made with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline" style={{ textUnderlineOffset: '0.25em' }}>Next.js</a> and <a href="https://sanity.io/" target="_blank" rel="noopener noreferrer" className="underline" style={{ textUnderlineOffset: '0.25em' }}>Sanity</a>.
          </p>
          <div className="flex gap-6">
            {contactItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-colors hover:opacity-80"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

