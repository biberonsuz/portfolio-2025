import { client } from '@/sanity/lib/client'
import { featuredProjectsQuery, settingsQuery } from '@/sanity/lib/queries'
import ProjectCard, { type Project } from '@/components/ProjectCard'
import type { PortableTextBlock } from '@portabletext/react'
import Hero from '@/components/Hero'

export const revalidate = 60 // Revalidate every 60 seconds

type Settings = {
  bio?: PortableTextBlock[]
}

async function getData(): Promise<{ featuredProjects: Project[]; settings: Settings }> {
  const [featuredProjects, settings] = await Promise.all([
    client.fetch(featuredProjectsQuery) as Promise<Project[]>,
    client.fetch(settingsQuery) as Promise<Settings>,
  ])

  return { featuredProjects, settings }
}

export default async function Home() {
  const { featuredProjects, settings } = await getData()

  return (
    <main className="mx-auto max-w-7xl">
      <Hero bio={settings?.bio} />

      {/* Featured Projects */}
      {featuredProjects && featuredProjects.length > 0 && (
        <div className="w-full">
          {featuredProjects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </main>
  )
}

