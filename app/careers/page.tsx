"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, TrendingUp, Heart, MapPin, Clock } from "lucide-react"
import PageLoader from "@/components/PageLoader"
import { API_BASE_URL } from "@/lib/config"
import { X } from "lucide-react"

export default function CareersPage() {
  // ==================== HOOKS ====================
  const [loading, setLoading] = useState(true)
  const [openings, setOpenings] = useState<any[]>([])
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [fileName, setFileName] = useState("")
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    address: "",
    cv: null as File | null
  })
  const [visibleCount, setVisibleCount] = useState(3)

  // ==================== EFFECTS ====================
  useEffect(() => {
    const startTime = performance.now()

    const handleLoad = () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime

      setTimeout(() => {
        setLoading(false)
      }, loadTime)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  useEffect(() => {
    fetch(`${API_BASE_URL}API/Public/getAllVacancies.php`)
      .then(res => res.json())
      .then(data => {
        // remove duplicates (JOB0005 issue)
        const unique = Array.from(
          new Map(data.map((item: any) => [item.Vacancy_Id, item])).values()
        )

        const mapped = unique.map((job: any) => ({
          id: job.Vacancy_Id,
          title: job.Job_Title,
          department: job.Department_Name,
          location: job.Location_Name,
          type: job.Job_Type,
          description: job.Job_Description.replace(/<[^>]*>?/gm, "")
        }))

        setOpenings(mapped)
      })
      .catch(err => console.error(err))
  }, [])

  // ==================== HANDLERS ====================
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3)
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files allowed")
        return
      }

      setFileName(file.name)

      setFormData(prev => ({
        ...prev,
        cv: file
      }))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!formData.cv) {
      alert("Please upload CV")
      return
    }

    if (formData.cv.type !== "application/pdf") {
      alert("Only PDF files allowed")
      return
    }

    // TODO: API integration
    setIsApplyOpen(false)
  }

  const pdfPreview = formData.cv ? URL.createObjectURL(formData.cv) : null

  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Continuous learning opportunities and clear career progression paths",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with talented professionals in a supportive team environment",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and comprehensive wellness programs",
    },
    {
      icon: Briefcase,
      title: "Exciting Projects",
      description: "Work on cutting-edge technologies and challenging projects",
    },
  ]

  // ==================== RENDER ====================
  if (loading) return <PageLoader />

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary text-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Team.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-background/80 leading-relaxed mb-8">
              Build your career with a leading IT solutions provider. We're looking for talented individuals who are
              passionate about technology and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Why Join PrimeIT Solutions?</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            We invest in our people and create an environment where talent thrives
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Current Openings</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">Explore opportunities to make an impact</p>
          {openings.length === 0 && (
            <p className="text-center text-muted-foreground">
              No job openings available yet.
            </p>
          )}
          <div className="max-w-5xl mx-auto space-y-6">
            {openings.slice(0, visibleCount).map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedJob(job)
                        setIsApplyOpen(true)
                      }}
                      className="cursor-pointer"
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Load More Button */}
          {visibleCount < openings.length && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="px-8 cursor-pointer"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* APPLY MODAL */}
      {isApplyOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8">

            <div className="flex justify-between mb-6">
              <h4 className="text-lg font-semibold">
                Apply for {selectedJob?.title}
              </h4>
              <button onClick={() => setIsApplyOpen(false)} className="flex items-center gap-2 text-gray-500 hover:text-black cursor-pointer"><X className="h-5 w-5" /></button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="email" placeholder="Email" required
                value={formData.email} onChange={handleInputChange}
                className="w-full border p-3 rounded-lg" />

              <div className="grid grid-cols-2 gap-4">
                <input name="name" placeholder="Full Name" required
                  value={formData.name} onChange={handleInputChange}
                  className="border p-3 rounded-lg" />

                <input name="contact" placeholder="Contact" required
                  value={formData.contact} onChange={handleInputChange}
                  className="border p-3 rounded-lg" />
              </div>

              <input name="address" placeholder="Address" required
                value={formData.address} onChange={handleInputChange}
                className="w-full border p-3 rounded-lg" />

              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-muted-foreground">
                  Upload CV
                </label>

                <div
                  className="border-2 border-dashed border-red-400 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => document.getElementById("cvUpload")?.click()}
                >
                  {pdfPreview ? (
                    <div className="flex items-center justify-center gap-3 py-4">

                      {/* PDF Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M7 7h10M7 11h6m-6 4h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                      </svg>

                      {/* File Details */}
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                          {fileName}
                        </p>
                        <p className="text-xs text-green-600">PDF Uploaded</p>
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-gray-600 py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0l-4 4m4-4l4 4m6 8v-6m0 0l4 4m-4-4l-4 4" />
                      </svg>

                      <p className="text-sm">
                        Drag & Drop file here <br />
                        or <span className="text-red-500 font-semibold">Click to Upload</span>
                      </p>
                    </div>
                  )}

                  <input
                    id="cvUpload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  File must be PDF
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline"
                  onClick={() => setIsApplyOpen(false)}
                  className="cursor-pointer">
                  Cancel
                </Button>

                <Button type="submit"
                  className="cursor-pointer">
                  Submit Application
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Don't See the Right Role?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future
            opportunities.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <a href="/contact">Submit Your Resume</a>
          </Button>
        </div>
      </section>
    </main>
  )
}