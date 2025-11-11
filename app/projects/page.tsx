import { client } from '@/sanity/lib/client'
import { projectsQuery, settingsQuery } from '@/sanity/lib/queries'
import ProjectCard from '@/components/ProjectCard'
import Hero from '@/components/Hero'

export const revalidate = 60

async function getData() {
  const [projects, settings] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(settingsQuery),
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
          {projects.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted)]">No projects found.</p>
      )}
    </main>
  )
}

