"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    subjectId: "",
    message: "",
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const services = [
    { id: 1, label: "IT Infrastructure Solutions & Services" },
    { id: 2, label: "Cybersecurity Solutions & Services" },
    { id: 3, label: "IP Telephony and Contact Center Solutions" },
    { id: 4, label: "IoT Solutions & Services" },
    { id: 5, label: "Electrical & Power Solutions" },
    { id: 6, label: "Physical Security Solutions and Services" },
    { id: 7, label: "Web Designing & Software Solutions" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      subjectId: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleServiceSelect = (service: { id: number; label: string }) => {
    setFormData({
      ...formData,
      subject: service.label,
      subjectId: String(service.id),
    })
    setIsDropdownOpen(false)
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary text-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Contact.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-background/80 leading-relaxed">
              Get in touch with our team. We're here to help you find the right IT solutions for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { icon: Mail, title: "Email", content: "hello@prime.lk" },
                    { icon: Phone, title: "Phone", content: "+94 (11) 5 672 666\n+94 (11) 5 752 117" },
                    {
                      icon: MapPin,
                      title: "Address",
                      content: "No. 36,\nNugegoda Road, Pepiliyana,\nSri Lanka",
                    },
                    {
                      icon: Clock,
                      title: "Business Hours",
                      content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        {item.content.split("\n").map((line, i) => (
                          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        {/* Dropdown styled to match Input height */}
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full border border-input rounded-md bg-background text-foreground flex items-center justify-between px-3 py-2.5 text-sm hover:bg-muted transition-colors"
                        >
                          <span className={formData.subject ? "text-foreground" : "text-muted-foreground"}>
                            {formData.subject || "Select a service..."}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50">
                            {services.map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => handleServiceSelect(service)}
                                className="w-full text-left px-3 py-2 hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md text-sm"
                              >
                                {service.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your requirements..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Visit Our Office</h2>
            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px] bg-secondary/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2763789000046!2d79.89100077507793!3d6.857440793141025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bc0d2d89371%3A0x9e7e382aef447059!2sPrime%20Engineering%20Lanka%20(Pvt)%20Limited!5e0!3m2!1sen!2slk!4v1760906450090!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
