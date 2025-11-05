import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function OurCompaniesPage() {
  const companies = [
    {
      name: "Prime Engineering Lanka (PVT) LTD",
      description: "Engineering solutions and infrastructure development services",
      focus: "Engineering & Infrastructure",
    },
    {
      name: "Prime Teleservice (PVT) LTD",
      description: "Telecommunications and telecom infrastructure services",
      focus: "Telecommunications",
    },
    {
      name: "Prime IT Solutions (PVT) LTD",
      description: "Comprehensive IT solutions, consulting, and technology services",
      focus: "Information Technology",
    },
    {
      name: "Prime Engineering Automation (PVT) LTD",
      description: "Engineering automation solutions and services",
      focus: "Engineering & Automation",
    },
    {
      name: "Prime Academy (PVT) LTD",
      description: "Professional training and skill development in various fields",
      focus: "Education & Training",
    },
    {
      name: "Prime Holidays (PVT) LTD",
      description: "Travel and hospitality services for corporate and leisure clients",
      focus: "Travel & Hospitality",
    },
    {
      name: "PELa Ceylon Teas (PVT) LTD",
      description: "Premium tea production and export services",
      focus: "Agriculture & Export",
    },  
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary text-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/corporate-companies-business-network.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Companies</h1>
            <p className="text-xl text-background/80 leading-relaxed">
              A diverse portfolio of enterprises delivering excellence across multiple industries and sectors
            </p>
          </div>
        </div>
      </section>

      {/* Companies Grid Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:border-primary overflow-hidden group"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl leading-tight">{company.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{company.description}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-primary">Focus Area</p>
                    <p className="text-sm text-muted-foreground mt-1">{company.focus}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Our Group Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Our Group</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our group of companies represents a commitment to excellence across diverse sectors. From cutting-edge IT
              solutions to traditional industries, we bring innovation, expertise, and reliability to every venture.
              Each company within our portfolio maintains the highest standards of quality and customer service while
              contributing to the broader vision of business excellence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Together, we create synergies that enable us to offer comprehensive solutions to our clients, leveraging
              the strengths and expertise of each company to deliver integrated services that drive business success.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
