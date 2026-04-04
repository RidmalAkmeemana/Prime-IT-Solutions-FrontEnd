"use client"

import { API_BASE_URL } from "@/lib/config";
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Network, Phone, Cpu, Zap, Lock, Code, Star } from "lucide-react"
import PageLoader from "@/components/PageLoader"
import Message from "@/components/message"
import { X } from "lucide-react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

export default function HomePage() {
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [toast, setToast] = useState({
    open: false,
    status: "success" as "success" | "error",
    title: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    address: "",
    message: "",
  })
  const [testimonials, setTestimonials] = useState<any[]>([])
  const getInitials = (name: string) => {
    if (!name) return ""
    const parts = name.trim().split(" ")
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* =========================
     FETCH CUSTOMER BY EMAIL
  ========================= */
  const fetchCustomerByEmail = async () => {
    if (!formData.email) return;
  
    try {
      const res = await fetch(
        API_BASE_URL + "API/Public/getCustomerDetails.php",
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
    e.preventDefault();
  
    try {
      const response = await fetch(
        API_BASE_URL + "API/Public/saveReview.php",
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
            rating: String(rating), // use rating from state
            Message: formData.message,
          }),
        }
      );
  
      const data = await response.json();
  
      if (!data.success) {
        setToast({
          open: true,
          status: "error",
          title: "Failed to submit review",
          description: data.message || "Please try again.",
        });
        return;
      }
  
      // Success
      setToast({
        open: true,
        status: "success",
        title: "Review submitted successfully",
        description: "Your review is pending approval.",
      });
  
      // Reset form
      setFormData({
        email: "",
        name: "",
        contact: "",
        address: "",
        message: "",
      });
      setRating(0);
  
      // Close modal
      setIsReviewOpen(false);
  
    } catch (error) {
      console.error("Submit error:", error);
      setToast({
        open: true,
        status: "error",
        title: "Something went wrong",
        description: "Please try again.",
      });
    }
  };
  

  useEffect(() => {
    fetch(
      `${API_BASE_URL}API/Public/getRecentReviews.php`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .filter((r: any) => r.Is_Approved === "1")
          .map((r: any) => ({
            quote: r.Message,
            author: r.Customer_Name,
            company: r.Customer_Address, // change later if company added
            logo: "/placeholder.svg",
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

          {/* Write Review Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setIsReviewOpen(true)}
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              Write a Review
            </Button>
          </div>

            {testimonials.length === 0 && (
              <p className="text-center text-muted-foreground">
                No reviews available yet.
              </p>
            )}

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{
              el: ".custom-pagination", // Attach to custom div
              clickable: true,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardContent className="p-8 flex flex-col flex-grow">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.stars
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-lg mb-6 leading-relaxed italic flex-grow">"{testimonial.quote}"</p>

                    {/* Company Logo and Reviewer Info */}
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-300 text-black flex items-center justify-center font-semibold text-sm">
                          {getInitials(testimonial.author)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{testimonial.author}</p>
                          <p
                            className="text-xs text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: testimonial.company }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots outside the Swiper */}
          <div className="custom-pagination mt-8 flex justify-center"></div>
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

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Write a Review</h3>
              <button onClick={() => setIsReviewOpen(false)} className="flex items-center gap-2 text-gray-500 hover:text-black cursor-pointer"><X className="h-5 w-5" /></button>
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
                  className="cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                >
                  Submit Review
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/*Toast Message */}
      {toast.open && (
        <Message
          status={toast.status}
          title={toast.title}
          description={toast.description}
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
        />
      )}

    </main>
  )
}
