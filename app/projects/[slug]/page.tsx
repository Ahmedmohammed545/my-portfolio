import { projects } from "@/lib/portfolioData"
import ProjectDetailClient from "@/components/project-detail-client"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = projects.find(
    (project) => project.slug === params.slug
  )

  if (!project) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    )
  }

  return <ProjectDetailClient slug={params.slug} />
}
