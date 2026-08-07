'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'

export type Project = {
  _id: string
  title: string
  slug: { current: string }
  description: string
  coverImage: unknown
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  coverImageLocation?: 'left' | 'right'
}

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter()
  const imageUrl = project.coverImage ? urlFor(project.coverImage).url() : null
  const imageLocation = project.coverImageLocation || 'left'
  const isImageRight = imageLocation === 'right'

  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)

  // Only offer "Read more" when the clamp actually cuts the text off.
  useEffect(() => {
    const el = descriptionRef.current
    if (!el || isExpanded) return

    const measure = () => setIsClamped(el.scrollHeight > el.clientHeight + 1)
    measure()

    // The clamped paragraph's own height never changes, so watch the parent for
    // width changes and re-measure once the variable font has swapped in.
    const observer = new ResizeObserver(measure)
    if (el.parentElement) observer.observe(el.parentElement)
    document.fonts?.ready.then(measure)

    return () => observer.disconnect()
  }, [isExpanded, project.description])

  const handleCardClick = () => {
    router.push(`/projects/${project.slug.current}`)
  }

  return (
    <article 
      onClick={handleCardClick}
      className={`flex flex-col justify-between h-dvh relative gap-0 min-w-full md:flex-row md:justify-start md:gap-12 md:max-w-full md:min-w-0 cursor-pointer snap-start snap-always overflow-y-auto py-24 w-full ${isImageRight ? 'md:flex-row-reverse' : ''}`}
    >
        {imageUrl && (
          <div className="relative shrink-0">
            <Image
              src={imageUrl}
              alt={project.title}
              width={1920}
              height={1080}
              className="project-card-image h-auto object-contain transition-transform duration-300 w-[150vw] md:w-auto"
              style={{
                maxHeight: '80vh',
                minHeight: '70vh',
                filter: 'drop-shadow(0 0.5em 0.75em rgba(0, 0, 0, 0.1))',
                objectFit: 'contain',
                objectPosition: 'left bottom',
              }}
              sizes="(max-width: 768px) 150vw, 80vw"
            />
          </div>
        )}
        <div className="relative min-w-0 max-w-full mt-4 md:flex-1 md:mt-8">
          <h1 className="inline text-2xl text-(--foreground)">
            {project.title}
          </h1>
          <p
            ref={descriptionRef}
            className={`my-4 text-(--text) md:line-clamp-none ${isExpanded ? '' : 'line-clamp-5'}`}
            style={{ fontVariationSettings: '"wght" 450' }}
          >
            {project.description}
          </p>
          {isClamped && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded((expanded) => !expanded)
              }}
              className="-mt-2 mb-4 text-sm font-medium text-(--text) underline underline-offset-4 md:hidden"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-(--muted) px-3 py-1 text-sm text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-medium text-(--text) hover:opacity-70"
              >
                View Online →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-medium text-(--text) hover:opacity-70"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </article>
  )
}

