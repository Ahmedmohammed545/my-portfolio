import { projects } from "@/lib/portfolioData"
import ProjectDetailClient from "@/components/project-detail-client"

export const dynamic = "force-dynamic"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return <ProjectDetailClient slug={params.slug} />
}
