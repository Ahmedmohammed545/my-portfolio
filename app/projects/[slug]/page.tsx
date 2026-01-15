
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { projects, certificates } from "@/lib/portfolioData"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const relatedCertificates = certificates.filter((cert) => project.relatedCertificateIds.includes(cert.id))

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        {/* Cover Image */}
        <div className="relative mb-8 h-64 overflow-hidden rounded-lg md:h-96">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {project.awardBadge && (
            <Badge className="absolute right-4 top-4 bg-primary text-base text-primary-foreground px-4 py-2">
              {project.awardBadge}
            </Badge>
          )}
        </div>

        {/* Title and Tags */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              <strong>Year/Grade:</strong> {project.yearOrGrade}
            </span>
            <span>
              <strong>Role:</strong> {project.role}
            </span>
            <span>
              <strong>Type:</strong> {project.type}
            </span>
          </div>
        </div>

        {/* One Line Hook */}
        <div className="mb-8 rounded border-l-4 border-accent bg-accent/10 p-6">
          <p className="text-lg font-medium text-accent-foreground">{project.oneLineHook}</p>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Overview</h2>
          <p className="leading-relaxed text-muted-foreground">{project.overview}</p>
        </section>

        {/* My Role */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">My Role</h2>
          <p className="leading-relaxed text-muted-foreground">{project.role}</p>
        </section>

        {/* Problem */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">The Problem / Why It Mattered</h2>
          <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
        </section>

        {/* Process */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Process</h2>
          <ul className="space-y-3">
            {project.processSteps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="leading-relaxed text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Impact */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Impact & Results</h2>
          <ul className="space-y-3">
            {project.impactBullets.map((impact, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-accent text-xl">•</span>
                <span className="leading-relaxed text-muted-foreground">{impact}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tools & Technologies */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <Badge key={tool} variant="outline">
                {tool}
              </Badge>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {project.galleryImages.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {project.galleryImages.map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="relative h-48 cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-90">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl">
                    <div className="relative h-[70vh] w-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </section>
        )}

        {/* Certificates & Proof */}
        {relatedCertificates.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">Certificates & Proof</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {relatedCertificates.map((cert) => (
                <Card key={cert.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="relative mb-3 h-32 overflow-hidden rounded bg-muted">
                      <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
                    </div>
                    <h3 className="mb-1 font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-16 border-t pt-8">
          <div className="flex items-center justify-between">
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`}>
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="font-medium">{prevProject.title}</div>
                  </div>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`}>
                <Button variant="outline">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="font-medium">{nextProject.title}</div>
                  </div>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
