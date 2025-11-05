import { Network, Shield, Phone, Cpu, Zap, Lock, Code } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Network,
      title: "IT Infrastructure Solutions & Services",
      description:
        "We provide comprehensive IT infrastructure solutions including network design, server deployment, cloud migration, and infrastructure management. Our team ensures your IT foundation is robust, scalable, and secure to support your business growth.",
      image: "/it-infrastructure-network-servers-data-center-tech.jpg",
      
    },
    {
      icon: Shield,
      title: "Cybersecurity Solutions & Services",
      description:
        "Protect your organization with our advanced cybersecurity solutions. We offer threat detection and prevention, security audits, vulnerability assessments, penetration testing, and incident response services to safeguard your critical data.",
      image: "/cybersecurity-protection-shield-digital-security-l.jpg",
      
    },
    {
      icon: Phone,
      title: "IP Telephony and Contact Center Solutions & Services",
      description:
        "Transform your business communications with our IP telephony and contact center solutions. We deliver unified communications platforms, VoIP systems, and omnichannel customer engagement solutions for enterprise-grade reliability.",
      image: "/IP Telephony and Contact Center Solutions & Services.jpg",
      
    },
    {
      icon: Cpu,
      title: "IoT Solutions & Services",
      description:
        "Harness the power of connected devices with our IoT solutions. We provide IoT platform development, sensor integration, device management, and data analytics to enable smart operations and predictive maintenance.",
      image: "/iot-internet-of-things-smart-devices-sensors-conne.jpg",
      
    },
    {
      icon: Zap,
      title: "Electrical & Power Solutions",
      description:
        "Ensure reliable power infrastructure with our electrical and power solutions. We offer UPS systems, backup generators, power monitoring, and energy management solutions to protect your critical systems.",
      image: "/electrical-power-infrastructure-energy-management-.jpg",
      
    },
    {
      icon: Lock,
      title: "Physical Security Solutions and Services",
      description:
        "Secure your facilities with our comprehensive physical security solutions. We provide access control systems, video surveillance, intrusion detection, and integrated security management platforms.",
      image: "/Physical Security Solutions and Services.jpg",
      
    },
    {
      icon: Code,
      title: "Web Designing & Software Solutions & Services",
      description:
        "Bring your digital vision to life with our web design and software development services. We create responsive websites, custom applications, mobile apps, and e-commerce platforms using modern technologies.",
      image: "/Web Designing & Software Solutions & Services.jpg",
      
    },
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary text-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Services.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-background/80 leading-relaxed">
              Comprehensive IT solutions tailored to your business needs. We deliver excellence across all technology
              domains.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-16">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group overflow-hidden rounded-lg border border-secondary/20 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-secondary/5">
                    <div className="h-64 md:h-80 overflow-hidden bg-muted relative">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h3>
                      </div>

                      <p className="text-base text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is ready to discuss your specific requirements and design a solution that fits your needs
            perfectly.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact Our Experts
          </a>
        </div>
      </section>
    </main>
  )
}
