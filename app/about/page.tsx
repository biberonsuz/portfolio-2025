import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

async function getSettings() {
  return await client.fetch(settingsQuery)
}

export default async function AboutPage() {
  const settings = await getSettings()
  const avatarUrl = settings?.avatar ? urlFor(settings.avatar).width(300).height(300).url() : null

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-12 text-center">
        {avatarUrl && (
          <div className="mb-6 flex justify-center">
            <Image
              src={avatarUrl}
              alt={settings?.name || 'Avatar'}
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        )}
        <h1 className="mb-4 text-4xl font-bold text-[var(--foreground)]">
          {settings?.name || 'About Me'}
        </h1>
        <p className="text-xl text-[var(--muted)]">{settings?.role || 'Developer'}</p>
      </div>

      {settings?.bio && (
        <section className="mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={settings.bio} />
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">Get in Touch</h2>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">Connect</h2>
        <div className="flex gap-6">
          {settings?.github && (
            <a
              href={settings.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              GitHub
            </a>
          )}
          {settings?.linkedin && (
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              LinkedIn
            </a>
          )}
          {settings?.twitter && (
            <a
              href={settings.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Twitter
            </a>
          )}
        </div>
      </section>
    </main>
  )
}

