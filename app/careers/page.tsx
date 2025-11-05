import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, TrendingUp, Heart, MapPin, Clock } from "lucide-react"

export default function CareersPage() {
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

  const openings = [
    {
      title: "Senior Software Engineer",
      department: "Software Development",
      location: "Colombo, Sri Lanka",
      type: "Full-time",
      description: "Lead development of enterprise software solutions using modern technologies.",
    },
    {
      title: "Cybersecurity Analyst",
      department: "Cybersecurity",
      location: "Remote",
      type: "Full-time",
      description: "Monitor and protect systems from security threats and vulnerabilities.",
    },
    {
      title: "Network Infrastructure Engineer",
      department: "IT Infrastructure",
      location: "Colombo, Sri Lanka",
      type: "Full-time",
      description: "Design and implement network infrastructure for enterprise clients.",
    },
    {
      title: "IoT Solutions Architect",
      department: "IoT Solutions",
      location: "Colombo, Sri Lanka",
      type: "Full-time",
      description: "Architect and deploy IoT solutions for industrial and commercial applications.",
    },
    {
      title: "Technical Support Specialist",
      department: "Customer Support",
      location: "Colombo, Sri Lanka",
      type: "Full-time",
      description: "Provide technical support and troubleshooting for client systems.",
    },
    {
      title: "Project Manager",
      department: "Project Management",
      location: "Colombo, Sri Lanka",
      type: "Full-time",
      description: "Lead IT projects from initiation to completion, ensuring timely delivery.",
    },
  ]

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
          <div className="max-w-5xl mx-auto space-y-6">
            {openings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">Apply Now</Button>
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
        </div>
      </section>

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
