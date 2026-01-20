import { notFound } from "next/navigation"
import { projects } from "@/lib/portfolioData"
import ProjectDetailClient from "@/components/project-detail-client"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const exists = projects.some((p) => p.slug === params.slug)
  if (!exists) notFound()

  return <ProjectDetailClient slug={params.slug} />
}
