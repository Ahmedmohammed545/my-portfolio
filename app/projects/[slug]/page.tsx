import { notFound } from "next/navigation"
import { projects } from "@/lib/portfolioData"
import ProjectDetailClient from "@/components/project-detail-client"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) notFound()

  return <ProjectDetailClient slug={params.slug} />
}
