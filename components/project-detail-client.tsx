"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { projects, certificates } from "@/lib/portfolioData"

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const relatedCertificates = certificates.filter((cert) =>
    project.relatedCertificateIds.includes(cert.id)
  )

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/projects">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        {/* Cover */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
          {project.awardBadge && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-base px-4 py-2">
              {project.awardBadge}
            </Badge>
          )}
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span><strong>Year/Grade:</strong> {project.yearOrGrade}</span>
            <span><strong>Role:</strong> {project.role}</span>
            <span><strong>Type:</strong> {project.type}</span>
          </div>
        </div>

        {/* Hook */}
        <div className="mb-8 p-6 bg-accent/10 border-l-4 border-accent rounded">
          <p className="text-lg font-medium">{project.oneLineHook}</p>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground">{project.overview}</p>
        </section>

        {/* Problem */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <p className="text-muted-foreground">{project.problem}</p>
        </section>

        {/* Process */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Process</h2>
          <ul className="space-y-3">
            {project.processSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Impact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Impact</h2>
          <ul className="space-y-3">
            {project.impactBullets.map((impact, i) => (
              <li key={i} className="flex gap-3">
                <span>•</span>
                <span className="text-muted-foreground">{impact}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Gallery */}
        {project.galleryImages.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.galleryImages.map((img, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div className="relative h-48 rounded-lg overflow-hidden cursor-pointer">
                      <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="relative w-full h-[70vh]">
                      <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-contain" />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </section>
        )}

        {/* External Link */}
        {(project as any).externalUrl && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Official Link</h2>
            <a
              href={(project as any).externalUrl}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View official page →
            </a>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t flex justify-between">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`}>
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                {prevProject.title}
              </Button>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`}>
              <Button variant="outline">
                {nextProject.title}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
