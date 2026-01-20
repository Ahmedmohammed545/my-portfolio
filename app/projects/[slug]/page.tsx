import { notFound } from "next/navigation"
import { projects } from "@/lib/portfolioData"
import ProjectDetailClient from "@/components/project-detail-client"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

type PageProps = {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find(
    (p) => p.slug === params.slug
  )

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient slug={params.slug} />
}


