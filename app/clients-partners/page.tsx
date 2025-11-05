import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientsPartnersPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary text-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Clients.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Clients & Partners</h1>
            <p className="text-xl text-background/80 leading-relaxed">
              Building lasting relationships with industry leaders and innovative organizations worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="clients" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="clients" className="text-lg">
                Our Clients
              </TabsTrigger>
              <TabsTrigger value="partners" className="text-lg">
                Our Partners
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clients" className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">Trusted by Leading Organizations</h2>
                <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                  We're proud to serve a diverse portfolio of clients across industries, from startups to Fortune 500
                  companies. Our commitment to excellence has earned us long-term partnerships with organizations that
                  value innovation and reliability.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                    <Card
                      key={i}
                      className="hover:shadow-lg transition-shadow flex items-center justify-center"
                    >
                      <CardContent className="flex items-center justify-center h-48 p-8">
                        <img
                          src={`/Our Customers/${logo}`}
                          alt={`Client ${i + 1}`}
                          className="max-h-[80px] max-w-[150px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

              </div>

              <div className="bg-muted rounded-lg p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Industries We Serve</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Financial Services",
                    "Healthcare",
                    "Manufacturing",
                    "Retail & E-commerce",
                    "Education",
                    "Government",
                    "Telecommunications",
                    "Energy & Utilities",
                    "Transportation & Logistics",
                  ].map((industry, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-lg">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="partners" className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">Strategic Technology Partners</h2>
                <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                  We collaborate with world-class technology vendors and solution providers to deliver best-in-class
                  solutions. Our partnerships enable us to offer cutting-edge technologies and comprehensive support to
                  our clients.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                    <Card
                      key={i}
                      className="hover:shadow-lg transition-shadow flex items-center justify-center"
                    >
                      <CardContent className="flex items-center justify-center h-48 p-8">
                        <img
                          src={`/Partners/${logo}`}
                          alt={`Partner ${i + 1}`}
                          className="max-h-[80px] max-w-[150px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

              </div>

              <div className="bg-muted rounded-lg p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Partnership Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Certified Expertise",
                      description: "Our team holds certifications from leading technology vendors",
                    },
                    {
                      title: "Priority Support",
                      description: "Direct access to vendor technical support and resources",
                    },
                    {
                      title: "Latest Technologies",
                      description: "Early access to new products and innovative solutions",
                    },
                    {
                      title: "Competitive Pricing",
                      description: "Preferred pricing and licensing terms for our clients",
                    },
                  ].map((benefit, index) => (
                    <div key={index}>
                      <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Become a Partner</h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Interested in partnering with us? Let's explore how we can create value together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}
