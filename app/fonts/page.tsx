import { client } from '@/sanity/lib/client'
import { featuredFontProjectsQuery } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pınar Kazak — Fonts',
}

type FontFile = {
  _key?: string
  asset?: {
    _id: string
    url: string
  }
}

type FontProject = {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  sampleText?: string
  fontVariationSettings?: string
  githubUrl?: string
  fontFiles?: FontFile[]
}

export const revalidate = 60

async function getFontProjects(): Promise<FontProject[]> {
  return await client.fetch(featuredFontProjectsQuery)
}

function getFontFormat(url?: string) {
  if (!url) return 'woff2'
  const extension = url.split('.').pop()?.split('?')[0]?.toLowerCase()
  switch (extension) {
    case 'woff2':
      return 'woff2'
    case 'woff':
      return 'woff'
    case 'ttf':
      return 'truetype'
    case 'otf':
      return 'opentype'
    case 'eot':
      return 'embedded-opentype'
    default:
      return 'woff2'
  }
}

export default async function FontsPage() {
  const fontProjects = await getFontProjects()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .font-card:hover {
          background-color: #e5e7eb !important;
        }
        @media (prefers-color-scheme: dark) {
          .font-card:hover {
            background-color: #374151 !important;
          }
        }
        .font-card a {
          text-decoration: underline;
          text-underline-offset: 0.35em;
        }
      `}} />
      <main className="mx-auto max-w-7xl space-y-12 py-16">
        <header className="space-y-4">
        <h1 className="text-4xl font-semibold">Font Collection</h1>
        <p className="max-w-2xl text-lg text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]">
          A selection of experimental typefaces crafted with care.
        </p>
      </header>

      {fontProjects.length === 0 && (
        <p className="text-(--muted)">No featured font projects yet. Check back soon!</p>
      )}

      <div className="flex gap-8">
        {fontProjects.map((project) => {
          const fontFamilyName = `FontFace-${project.slug?.current ?? project._id}`
          const fontSources =
            project.fontFiles
              ?.map((file) => {
                const url = file.asset?.url
                if (!url) return null
                return `url('${url}') format('${getFontFormat(url)}')`
              })
              .filter(Boolean) ?? []
          const fontFaceCss =
            fontSources.length > 0
              ? `
              @font-face {
                font-family: '${fontFamilyName}';
                src: ${fontSources.join(', ')};
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
            `
              : ''

          return (
            <article
              key={project._id}
              className="font-card flex flex-col aspect-square min-w-64 h-48 shrink-0 justify-center items-center 
              border-2 rounded-2xl border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] transition-colors cursor-pointer"
            >
              {fontFaceCss && <style dangerouslySetInnerHTML={{ __html: fontFaceCss }} />}

              <div>
                  <div
                    className="text-(--foreground) overflow-x-auto px-4"
                    style={{
                      fontSize: '8rem',
                      ...(fontSources.length ? { fontFamily: fontFamilyName } : {}),
                      ...(project.fontVariationSettings ? { fontVariationSettings: project.fontVariationSettings } : {}),
                    }}
                  >
                    Ag
                  </div>

                <div className="flex justify-center py-4">
                  {project.description && (
                    <p className="text-md text-base text-center text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]">
                      {project.title}
                    </p>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-(--muted) transition-colors hover:text-(--foreground)"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </main>
    </>
  )
}

