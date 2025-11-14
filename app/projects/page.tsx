import { client } from '@/sanity/lib/client'
import { projectsQuery, settingsQuery } from '@/sanity/lib/queries'
import ProjectCard, { type Project } from '@/components/ProjectCard'
import Hero from '@/components/Hero'
import type { PortableTextBlock } from '@portabletext/react'

export const revalidate = 60

type Settings = {
  bio?: PortableTextBlock[]
}

async function getData(): Promise<{ projects: Project[]; settings: Settings }> {
  const [projects, settings] = await Promise.all([
    client.fetch(projectsQuery) as Promise<Project[]>,
    client.fetch(settingsQuery) as Promise<Settings>,
  ])

  return { projects, settings }
}

export default async function ProjectsPage() {
  const { projects, settings } = await getData()

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Hero bio={settings?.bio} />
      {projects && projects.length > 0 ? (
        <div className="flex flex-col gap-8">
          {projects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-(--muted)">No projects found.</p>
      )}
    </main>
  )
}

