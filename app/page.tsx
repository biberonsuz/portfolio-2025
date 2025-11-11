import { client } from '@/sanity/lib/client'
import { featuredProjectsQuery, settingsQuery } from '@/sanity/lib/queries'
import ProjectCard from '@/components/ProjectCard'
import Hero from '@/components/Hero'

export const revalidate = 60 // Revalidate every 60 seconds

async function getData() {
  const [featuredProjects, settings] = await Promise.all([
    client.fetch(featuredProjectsQuery),
    client.fetch(settingsQuery),
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
          {featuredProjects.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </main>
  )
}

