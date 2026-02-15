"use client"

import { useEffect, useState } from "react"
import { Network, Shield, Phone, Cpu, Zap, Lock, Code } from "lucide-react"
import PageLoader from "@/components/PageLoader"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Message from "@/components/message"
import { API_BASE_URL } from "@/lib/config"

export default function ServicesPage() {

  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [toast, setToast] = useState({
    open: false,
    status: "success" as "success" | "error",
    title: "",
    description: "",
  })
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    address: "",
    message: "",
  })
  const [testimonials, setTestimonials] = useState<any[]>([])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  /* =========================
     FETCH CUSTOMER BY EMAIL
  ========================= */
  const fetchCustomerByEmail = async () => {
    if (!formData.email) return;
  
    try {
      const res = await fetch(
        API_BASE_URL + "Prime-IT-Solutions-BackEnd/API/Public/getCustomerDetails.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ Customer_Email: formData.email }),
        }
      );
  
      const data = await res.json();
  
      if (data.success && data.data) {
        setFormData((prev) => ({
          ...prev,
          name: data.data.Customer_Name || "",
          contact: data.data.Customer_Contact || "",
          address: data.data.Customer_Address || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          name: "",
          contact: "",
          address: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const [loading, setLoading] = useState(true)
  
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

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
      
        try {
          const response = await fetch(
            API_BASE_URL + "Prime-IT-Solutions-BackEnd/API/Public/saveReview.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                Customer_Name: formData.name,
                Customer_Contact: formData.contact,
                Customer_Email: formData.email,
                Customer_Address: formData.address,
                rating: String(rating),
                Message: formData.message,
              }),
            }
          )
      
          const data = await response.json()
      
          if (!data.success) {
            setToast({
              open: true,
              status: "error",
              title: "Failed to submit review",
              description: data.message || "Please try again.",
            })
            return
          }
      
          setToast({
            open: true,
            status: "success",
            title: "Review submitted successfully",
            description: "Your review is pending approval.",
          })
      
          setFormData({
            email: "",
            name: "",
            contact: "",
            address: "",
            message: "",
          })
      
          setRating(0)
          setIsReviewOpen(false)
        } catch (error) {
          setToast({
            open: true,
            status: "error",
            title: "Something went wrong",
            description: "Please try again.",
          })
        }
      }      

      useEffect(() => {
        fetch(`${API_BASE_URL}Prime-IT-Solutions-BackEnd/API/Public/getAllReviewData.php`)
          .then((res) => res.json())
          .then((data) => {
            const formatted = data
              .filter((r: any) => r.Is_Approved === "1")
              .map((r: any) => ({
                quote: r.Message,
                author: r.Customer_Name,
                company: r.Customer_Address,
                stars: parseInt(r.Star_Rating),
              }))
      
            setTestimonials(formatted)
          })
          .catch((err) => {
            console.error("Failed to fetch testimonials:", err)
          })
      }, [])
      
      if (loading) {
        return <PageLoader />
      }

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

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            What Our Clients Say
          </h2>

          <div className="flex justify-center mb-10">
            <Button
              onClick={() => setIsReviewOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Write a Review
            </Button>
          </div>

          <div className="space-y-8">
            {testimonials.length === 0 && (
              <p className="text-center text-muted-foreground">
                No reviews available yet.
              </p>
            )}

            {testimonials.slice(0, visibleCount).map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.stars
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Message */}
                  <p className="text-lg mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="border-t pt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-300 text-black flex items-center justify-center font-semibold text-sm">
                      {testimonial.author?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-sm">
                        {testimonial.author}
                      </p>

                      <p
                        className="text-xs text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: testimonial.company,
                        }}
                      />
                    </div>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < testimonials.length && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="px-8"
              >
                Load More Reviews
              </Button>
            </div>
          )}
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

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Write a Review</h3>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                Close
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={fetchCustomerByEmail}
                className="w-full border rounded-lg p-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Customer Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border rounded-lg p-3"
                />
                <input
                  required
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="border rounded-lg p-3"
                />
              </div>

              <input
                required
                type="text"
                name="address"
                placeholder="Customer Address"
                value={formData.address.replace(/<[^>]*>/g, "")}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3"
              />

              <div>
                <label className="text-sm font-medium block mb-2">
                  Add Star Rating
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setRating(star)}
                      className={`h-7 w-7 cursor-pointer ${star <= rating
                          ? "fill-primary text-primary"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>

              <textarea
                required
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3"
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsReviewOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Submit Review
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    {toast.open && (
      <Message
        status={toast.status}
        title={toast.title}
        description={toast.description}
        onClose={() =>
          setToast((prev) => ({ ...prev, open: false }))
        }
      />
    )}

    </main>
  )
}
