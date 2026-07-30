import { headers } from 'next/headers'
import Header from './Header'
import Footer from './Footer'

export default async function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('referer') || ''
  const isStudio = pathname.includes('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="flex-1 px-4">
        {children}
      </main>
      <Footer />
    </>
  )
}
