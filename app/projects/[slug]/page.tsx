import { client } from '@/sanity/lib/client'
import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react'
import { notFound } from 'next/navigation'

interface ContentBlock {
  blockType: 'image' | 'video' | 'text'
  image?: {
    asset?: {
      _id: string
      url: string
      metadata?: {
        dimensions?: {
          aspectRatio?: number
          width?: number
          height?: number
        }
      }
    }
    alt?: string
  }
  videoUrl?: string
  videoFile?: {
    asset?: {
      _id: string
      url: string
    }
  }
  textContent?: PortableTextBlock[]
}

interface ProjectNavItem {
  title?: string
  slug?: {
    current?: string
  }
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>,
    normal: ({ children }) => <p className="text-xl mb-4">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <a 
          href={value?.href} 
          target={value?.blank ? '_blank' : undefined} 
          rel={value?.blank ? 'noopener noreferrer' : undefined}
          className="underline"
          style={{ textUnderlineOffset: '0.25em' }}
        >
          {children}
        </a>
      )
    },
  },
}

export const revalidate = 60

async function getProject(slug: string) {
  return await client.fetch(projectBySlugQuery, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  return {
    title: project?.title ? `${project.title} — Pınar Kazak` : 'Project — Pınar Kazak',
  }
}

async function getProjects() {
  return await client.fetch(projectsQuery)
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const projects = (await getProjects()) as ProjectNavItem[]
  const projectIndex = Array.isArray(projects)
    ? projects.findIndex((proj) => proj.slug?.current === project.slug?.current)
    : -1
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex !== -1 && projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null
  const prevProjectSlug = prevProject?.slug?.current
  const nextProjectSlug = nextProject?.slug?.current
  const hasPrevProject = Boolean(prevProjectSlug)
  const hasNextProject = Boolean(nextProjectSlug)
  const hasTechnologies = Array.isArray(project.technologies) && project.technologies.length > 0
  const hasGallery = Array.isArray(project.images) && project.images.length > 0
  const hasBottomSection = hasTechnologies || hasGallery || hasPrevProject || hasNextProject

  const firstBlock = project.contentBlocks && project.contentBlocks.length > 0 ? project.contentBlocks[0] : null
  const isFirstBlockText = firstBlock?.blockType === 'text' && firstBlock?.textContent && firstBlock.textContent.length > 0
  const remainingBlocks = project.contentBlocks && project.contentBlocks.length > 0 
    ? (isFirstBlockText ? project.contentBlocks.slice(1) : project.contentBlocks)
    : []

  return (
    <main className="mx-auto max-w-7xl  py-12">
      <article>
        <div className="h-dvh flex items-center justify-center snap-start snap-always py-8">
          <div className="w-full max-w-7xl">
            <h1 className="text-4xl font-bold text-(--foreground) mb-4">{project.title}</h1>
            {isFirstBlockText && firstBlock && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={firstBlock.textContent} components={components} />
              </div>
            )}
            <div className="mt-8 flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium text-(--primary) hover:opacity-90"
                >
                  View Online →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium text-(--muted) hover:text-(--foreground)"
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </div>

        {remainingBlocks.length > 0 && (
          <div>
            {remainingBlocks.map((block: ContentBlock, index: number) => {
              if (block.blockType === 'image' && block.image?.asset?.url) {
                const dimensions = block.image.asset.metadata?.dimensions
                const aspectRatio = dimensions?.aspectRatio
                const naturalWidth = dimensions?.width ?? (aspectRatio ? Math.round(1080 * aspectRatio) : 1920)
                const naturalHeight = dimensions?.height ?? (aspectRatio ? Math.round(naturalWidth / aspectRatio) : 1080)
                const isLandscape = aspectRatio !== undefined ? aspectRatio >= 1 : true
                const imageUrl = urlFor(block.image).url()
                return (
                  <div key={index} className="h-dvh flex items-center justify-center snap-start snap-always py-8">
                    <div
                      className="relative w-full max-w-7xl flex items-center justify-center"
                      style={{
                        transform: 'scale(0.85)',
                        maxHeight: 'calc(100vh - 4rem)',
                        overflow: 'visible',
                      }}
                    >
                      <Image
                        src={imageUrl}
                        alt={block.image.alt || `${project.title} - Image ${index + 1}`}
                        width={naturalWidth}
                        height={naturalHeight}
                        className={`rounded-lg object-contain ${isLandscape ? 'w-full h-auto max-w-full' : 'max-w-full max-h-full w-auto h-auto'}`}
                        style={{ filter: 'drop-shadow(0 35px 80px rgba(0,0,0,0.35))' }}
                      />
                    </div>
                  </div>
                )
              }

              if (block.blockType === 'video') {
                if (block.videoUrl) {
                  // Handle YouTube, Vimeo, or other video URLs
                  const isYouTube = block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')
                  const isVimeo = block.videoUrl.includes('vimeo.com')
                  
                  if (isYouTube) {
                    const videoId = block.videoUrl.includes('youtu.be')
                      ? block.videoUrl.split('/').pop()?.split('?')[0]
                      : new URL(block.videoUrl).searchParams.get('v')
                    return (
                      <div key={index} className="h-dvh flex items-center justify-center snap-start snap-always py-8">
                        <div
                          className="relative w-full max-w-7xl flex items-center justify-center"
                          style={{
                            aspectRatio: 'auto',
                            transform: 'scale(0.85)',
                            maxHeight: 'calc(100vh - 4rem)',
                            overflow: 'visible',
                          }}
                        >
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&playlist=${videoId}&controls=0`}
                            title={`Video ${index + 1}`}
                            className="max-w-full max-h-full rounded-lg"
                            style={{
                              aspectRatio: 'auto',
                              minHeight: '400px',
                              borderRadius: '1rem',
                              filter: 'drop-shadow(0 35px 80px rgba(0,0,0,0.35))',
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )
                  } else if (isVimeo) {
                    const videoId = block.videoUrl.split('/').pop()
                    return (
                      <div key={index} className="h-dvh flex items-center justify-center snap-start snap-always py-8">
                        <div
                          className="relative w-full max-w-7xl flex items-center justify-center"
                          style={{
                            aspectRatio: 'auto',
                            transform: 'scale(0.85)',
                            maxHeight: 'calc(100vh - 4rem)',
                            overflow: 'visible',
                          }}
                        >
                          <iframe
                            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&controls=0`}
                            title={`Video ${index + 1}`}
                            className="max-w-full max-h-full rounded-lg"
                            style={{
                              aspectRatio: 'auto',
                              minHeight: '400px',
                              borderRadius: '1rem',
                              filter: 'drop-shadow(0 35px 80px rgba(0,0,0,0.35))',
                            }}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )
                  } else {
                    // Generic video URL - render as a video element
                    return (
                      <div key={index} className="h-dvh flex items-center justify-center snap-start snap-always py-8">
                        <div
                          className="relative w-full max-w-7xl flex items-center justify-center"
                          style={{
                            transform: 'scale(0.85)',
                            maxHeight: 'calc(100vh - 4rem)',
                            overflow: 'visible',
                          }}
                        >
                          <video
                            src={block.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                            style={{ filter: 'drop-shadow(0 35px 80px rgba(0,0,0,0.35))' }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    )
                  }
                } else if (block.videoFile?.asset?.url) {
                  return (
                    <div key={index} className="h-dvh flex items-center justify-center snap-start snap-always py-8">
                      <div
                        className="relative w-full max-w-7xl flex items-center justify-center"
                        style={{
                          transform: 'scale(0.85)',
                          maxHeight: 'calc(100vh - 4rem)',
                          overflow: 'visible',
                        }}
                      >
                        <video
                          src={block.videoFile.asset.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls={false}
                          className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                          style={{ filter: 'drop-shadow(0 35px 80px rgba(0,0,0,0.35))' }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  )
                }
              }

              if (block.blockType === 'text' && block.textContent && block.textContent.length > 0) {
                return (
                  <div key={index} className="h-dvh flex items-center snap-start snap-always py-8">
                    <div className="prose prose-lg max-w-7xl w-full">
                      <PortableText value={block.textContent} components={components} />
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>
        )}

        {hasBottomSection && (
          <section className="snap-start snap-always py-16">
            <div className="mx-auto max-w-7xl space-y-12">
              {hasTechnologies && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies!.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full bg-(--muted) px-3 py-1 text-sm text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {hasGallery && (
                <div className="space-y-4">
                  {project.images!.map((image: { asset?: { _ref?: string } }, index: number) => {
                    const imageUrl = urlFor(image).width(1200).url()
                    return (
                      <div key={index} className="relative h-64 w-full overflow-hidden rounded-lg md:h-96">
                        <Image src={imageUrl} alt={`${project.title} - Image ${index + 1}`} fill className="object-cover" />
                      </div>
                    )
                  })}
                </div>
              )}

              {(hasPrevProject || hasNextProject) && (
                <nav className="flex items-center justify-between gap-4">
                  <div className="flex flex-1 justify-start">
                    {hasPrevProject && (
                      <a
                        href={`/projects/${prevProjectSlug}`}
                        className="group flex h-16 w-16 items-center justify-center rounded-full border border-(--muted) text-3xl text-(--foreground) transition-colors hover:bg-(--muted)"
                        aria-label={`Previous project${prevProject?.title ? `: ${prevProject.title}` : ''}`}
                      >
                        <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
                          ←
                        </span>
                      </a>
                    )}
                  </div>

                  <div className="flex flex-1 justify-end">
                    {hasNextProject && (
                      <a
                        href={`/projects/${nextProjectSlug}`}
                        className="group flex h-16 w-16 items-center justify-center rounded-full border border-(--muted) text-3xl text-(--foreground) transition-colors hover:bg-(--muted)"
                        aria-label={`Next project${nextProject?.title ? `: ${nextProject.title}` : ''}`}
                      >
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </nav>
              )}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}

