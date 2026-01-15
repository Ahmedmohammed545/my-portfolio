import { notFound } from "next/navigation"
import { projects, certificates } from "@/lib/portfolioData"
import ProjectDetailClient from "@/components/project-detail-client"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const relatedCertificates = certificates.filter((cert) => project.relatedCertificateIds.includes(cert.id))

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      relatedCertificates={relatedCertificates}
    />
  )
}

