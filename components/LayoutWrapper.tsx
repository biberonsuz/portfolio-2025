'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  useEffect(() => {
    if (isStudio) {
      document.body.classList.add('studio-mode')
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.height = '100vh'
    } else {
      document.body.classList.remove('studio-mode')
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
    }
  }, [isStudio])

  return <>{children}</>
}
