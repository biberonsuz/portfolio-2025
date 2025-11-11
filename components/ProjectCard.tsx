'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  coverImage: any
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  coverImageLocation?: 'left' | 'right'
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const imageUrl = project.coverImage ? urlFor(project.coverImage).url() : null
  const imageLocation = project.coverImageLocation || 'left'
  const isImageRight = imageLocation === 'right'

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
        <div className="relative min-w-0 max-w-full mt-4 md:flex-1 md:mt-8 overflow-y-auto">
          <h1 className="inline text-2xl text-[var(--foreground)]">
            {project.title}
          </h1>
          <p className="my-4 text-[var(--muted)]" style={{ fontVariationSettings: '"wght" 450' }}>
            {project.description}
          </p>
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--muted)] px-3 py-1 text-sm text-[color-mix(in_oklab,var(--foreground)_80%,transparent)]"
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
                className="text-sm font-medium text-[var(--primary)] hover:opacity-90"
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
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </article>
  )
}

