import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Network, Phone, Cpu, Zap, Lock, Code, Star } from "lucide-react"

export default function HomePage() {
  const businessUnits = [
    {
      icon: Network,
      title: "IT Infrastructure Solutions & Services",
      description: "Comprehensive infrastructure design, implementation, and management",
      bgImage: "/it-infrastructure-network-servers-data-center.jpg",
    },
    {
      icon: Shield,
      title: "Cybersecurity Solutions & Services",
      description: "Advanced security solutions to protect your digital assets",
      bgImage: "/cybersecurity-protection-shield-digital-security.jpg",
    },
    {
      icon: Phone,
      title: "IP Telephony and Contact Center Solutions",
      description: "Modern communication systems for seamless connectivity",
      bgImage: "/ip-telephony-communication-contact-center-voip.jpg",
    },
    {
      icon: Cpu,
      title: "IoT Solutions & Services",
      description: "Smart connected devices and IoT platform integration",
      bgImage: "/iot-internet-of-things-smart-devices-sensors.jpg",
    },
    {
      icon: Zap,
      title: "Electrical & Power Solutions",
      description: "Reliable power infrastructure and management systems",
      bgImage: "/electrical-power-infrastructure-energy-management.jpg",
    },
    {
      icon: Lock,
      title: "Physical Security Solutions",
      description: "Comprehensive physical security and surveillance systems",
      bgImage: "/physical-security-surveillance-access-control-cctv.jpg",
    },
    {
      icon: Code,
      title: "Web Designing & Software Solutions",
      description: "Custom software development and web design services",
      bgImage: "/web-design-software-development-coding-programming.jpg",
    },
  ]

  const testimonials = [
    {
      quote: "Prime IT Solutions showed professionalism and outstanding developer efficiency. Any questions and problems, arising during the development cycle, were attended to by Prime specialists in a timely fashion leaving no unresolved issues.Prime team always remained responsive, demonstrated great communicative skills and ensured smooth interaction throughout all development and implementation stages, suggesting articulate and consistent decisions and viable solutions for our project.Prime ensured fast finalization of our project and fully met our expectations, concerning the time to bring the new features to our clients. We won't hesitate to turn to Prime services again and hope for further fruitful collaboration.",
      author: "Ruwan Weerasuriya",
      position: "Air Resources Management Center, Sri Lanka",
      company: "Air Resources Management Center, Sri Lanka",
      logo: "/Test2.jpg",
    },
    
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-secondary text-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Header.jpg')] bg-cover bg-center opacity-65" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Where Innovation Meets IT Excellence</h1>
            <p className="text-xl md:text-2xl text-background/80 mb-8 leading-relaxed text-pretty">
              Delivering cutting-edge IT solutions and consulting services to transform your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/services">
                  Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-background text-background hover:bg-background hover:text-secondary bg-transparent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Us</h2>
            <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
              <p className="text-lg mb-6 text-justify">
                Prime IT Solutions focuses on IT solution designing & consulting. A division founded upon a vision to
                change the way in which we interact with information technology, we deliver workflow and knowledge
                support in information solutions to help our clients deal with changing business and technology issues.
              </p>
              <p className="text-lg mb-6 text-justify">
                Our aim is to combine deep industry expertise and unsurpassed enabling technologies that help our
                clients improve their bottom-line performance. We bring our experience, best practices and customized
                tools to apply to client's unique requirements.
              </p>
              <p className="text-lg text-justify">
                We provide IT solutions for both private and public sector, and organizations of all sizes, adding value
                for our customers and simplifying their business by integrating and automating their business processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Units Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Business Units</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Comprehensive IT solutions spanning various needs at every stage of the transformation process
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessUnits.map((unit, index) => {
              const Icon = unit.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden relative text-white">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${unit.bgImage}')` }}
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{unit.title}</h3>
                    <p className="text-sm text-white/90 leading-relaxed">{unit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
{/* Solution Partners Section */}
<section className="py-20 bg-background">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Solution Partners</h2>
    <p className="text-xl text-center text-muted-foreground mb-12">
      Collaborating with industry leaders to deliver best-in-class solutions
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {[
        "logo1.png",
        "logo2.png",
        "logo3.png",
        "logo4.png",
        "logo5.png",
        "logo6.png",
        "logo7.png",
        "logo8.png",
        "logo9.png",
        "logo10.png",
        "logo11.png",
        "logo12.png",
        "logo13.png",
        "logo14.png",
        "logo15.png",
        "logo16.png",
        "logo17.png",
        "logo18.png",
      ].map((logo, i) => (
        <div
          key={i}
          className="flex items-center justify-center p-6 bg-muted rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            src={`/Partners/${logo}`}
            alt={`Partner ${i + 1}`}
            className="max-w-[120px] h-auto opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  </div>
</section>


{/* Customers Section */}
<section className="py-20 bg-muted">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Customers</h2>
    <p className="text-xl text-center text-muted-foreground mb-12">
      Trusted by leading organizations across industries
    </p>

    <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-8">
      {[
        "customer1.png",
        "customer2.png",
        "customer3.png",
        "customer4.png",
        "customer5.png",
        "customer6.png",
        "customer7.png",
        "customer8.png",
        "customer9.png",
        "customer10.png",
        "customer11.png",
        "customer12.png",
      ].map((logo, i) => (
        <div
          key={i}
          className="flex items-center justify-center p-6 bg-background rounded-lg hover:shadow-md transition-shadow"
        >
          <img
            src={`/Our Customers/${logo}`}
            alt={`Customer ${i + 1}`}
            className="max-w-[120px] h-auto opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardContent className="p-8 flex flex-col flex-grow">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg mb-6 leading-relaxed italic flex-grow">"{testimonial.quote}"</p>

                  {/* Company Logo and Reviewer Info */}
                  <div className="border-t pt-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.logo || "/placeholder.svg"}
                        alt={testimonial.company}
                        className="h-12 w-auto opacity-80"
                      />
                      <div>
                        <p className="font-semibold text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-background/80">
            Let's discuss how our IT solutions can help you achieve your business goals
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/contact">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
