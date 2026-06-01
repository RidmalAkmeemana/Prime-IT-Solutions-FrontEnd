"use client"
import { useEffect, useState } from "react"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import PageLoader from "@/components/PageLoader"
import Message from "@/components/message"
import { API_BASE_URL } from "@/lib/config"

export default function ContactPage() {

  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    // subjectId: "",
    message: "",
  })

  const [company, setCompany] = useState({
    Company_Name: "",
    Company_Email: "",
    Company_Address: "",
    Company_Tel1: "",
    Company_Tel2: "",
    Company_Tel3: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState<"success" | "error">("success");

  /* =========================
     FETCH COMPANY DETAILS
  ========================= */
  useEffect(() => {
    fetch(API_BASE_URL + "API/Public/getCompanyDetails.php")
      .then((res) => res.json())
      .then((data) => {
        setCompany({
          Company_Name: data.Company_Name || "",
          Company_Email: data.Company_Email || "",
          Company_Address: data.Company_Address || "",
          Company_Tel1: data.Company_Tel1 || "",
          Company_Tel2: data.Company_Tel2 || "",
          Company_Tel3: data.Company_Tel3 || "",
        });
      })
      .catch(console.error);
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          phone: data.data.Customer_Contact || "",
          address: data.data.Customer_Address || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          name: "",
          phone: "",
          address: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  /* =========================
     SUBMIT FORM
  ========================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        API_BASE_URL + "API/Public/saveDetails.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            Customer_Email: formData.email,
            Customer_Name: formData.name,
            Customer_Contact: formData.phone,
            Customer_Address: formData.address,
            Subject: formData.subject,
            Message: formData.message,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessageStatus("success");
        setShowMessage(true);
        sendConfirmationEmail();
        sendSubmitEmail();
        setFormData({
          email: "",
          name: "",
          phone: "",
          address: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setShowMessage(false), 5000);
      } else {
        setMessageStatus("error");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
        console.error(data.alert || "Failed to save data");
      }
    } catch (error) {
      setMessageStatus("error");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
      console.error("Server error:", error);
    }
  };

  /* =========================
     EMAIL FUNCTIONS (UNCHANGED)
  ========================= */
  const sendConfirmationEmail = () => {
    const emailBody = `
    <div style="font-family: Arial, sans-serif; background-color:#f6f6f6; padding:30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
                <td style="background:#b72227;padding:20px;text-align:center;color:#ffffff;">
                    <h2 style="margin:0;">Confirmation Email</h2>
                </td>
            </tr>

            <tr>
                <td style="padding-top:20px;text-align:center;">
                    <img src="https://res.cloudinary.com/dy5ciybdm/image/upload/v1775457537/logo_f8qm5r.png" alt="Logo">
                </td>
            </tr>

            <!-- BODY -->
            <tr>
                <td style="padding:30px;">
                    <p style="font-size:15px;color:#333;">
                        Dear <b>${formData.name}</b>,
                    </p>

                    <p style="font-size:14px;color:#555;">
                        Thank you for choosing <b>${company.Company_Name}</b>.  
                        Your inquiry has been <b>successfully submited</b>. Our team member will contact you shortly to discuss further details.
                    </p>

                    <p style="font-size:15px;color:#333;">Thanks & Regards <br><b>${company.Company_Name}</b>,</p>
                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#777;">
                    <b>${company.Company_Name}</b><br>
                    ${company.Company_Address}<br>
                    Email: ${company.Company_Email}<br>
                    Contact: ${company.Company_Tel1}
                </td>
            </tr>

        </table>
    </div>`;

    sendEmail(company.Company_Email, company.Company_Name, formData.email, "Inquiry Submission", emailBody);
  };

  const sendSubmitEmail = () => {
    const emailBody = `
    <div style="font-family: Arial, sans-serif; background-color:#f6f6f6; padding:30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
                <td style="background:#b72227;padding:20px;text-align:center;color:#ffffff;">
                    <h2 style="margin:0;">Inquiry</h2>
                </td>
            </tr>

            <tr>
                <td style="padding-top:20px;text-align:center;">
                    <img src="https://res.cloudinary.com/dy5ciybdm/image/upload/v1775457537/logo_f8qm5r.png" alt="Logo">
                </td>
            </tr>

            <!-- BODY -->
            <tr>
                <td style="padding:30px;">
                    <p style="font-size:15px;color:#333;">
                        New inquiry from <b>${formData.name}</b>,
                    </p>

                    <p style="font-size:14px;color:#555;">
                        ${formData.message}  
                    </p>
                    <p style="font-size:15px;color:#333;">Thanks & Regards 
                        <br><b>${formData.name}</b>,
                        <br><b>${formData.address}</b>,
                        <br><b>${formData.email}</b>,
                        <br><b>${formData.phone}</b>
                    </p>
                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#777;">
                    <b>${company.Company_Name}</b><br>
                    ${company.Company_Address}<br>
                    Email: ${company.Company_Email}<br>
                    Contact: ${company.Company_Tel1}
                </td>
            </tr>

        </table>
    </div>`;

    receiverEmail(formData.email, formData.name, company.Company_Email, `New Inquiry | ${formData.subject}`, emailBody);
  };

  const sendEmail = async (from: string, name: string, to: string, subject: string, body: string) => {
    await fetch(API_BASE_URL + "sendEmail.php", {
      method: "POST",
      body: new URLSearchParams({ from, name, to, subject, body }),
    });
  };

  const receiverEmail = async (from: string, name: string, to: string, subject: string, body: string) => {
    await fetch(API_BASE_URL + "sendEmail.php", {
      method: "POST",
      body: new URLSearchParams({ from, name, to, subject, body }),
    });
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
  
  if (loading) {
    return <PageLoader />
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
                    { icon: Mail, title: "Email", content: "business@pitsl.com" },
                    { icon: Phone, title: "Phone", content: "+94 (78 )913 0036\n+94 (71) 405 9255" },
                    {
                      icon: MapPin,
                      title: "Address",
                      content: "Colombo, Sri Lanka",
                    },
                    {
                      icon: Clock,
                      title: "Business Hours",
                      content: "24 Hours",
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
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={fetchCustomerByEmail}
                          placeholder="Enter Email"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter Your Full Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter Contact Number"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter Your Address"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Enter Subject"
                          required
                        />
                      </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your requirements..."
                        rows={8}
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80392292765!2d79.81491998080642!3d6.921922077524564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1780333042906!5m2!1sen!2slk"
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

      {/* MESSAGE NOTIFICATION — Bottom Right */}
      {showMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <Message
            status={messageStatus}
            onClose={() => setShowMessage(false)}
          />
        </div>
      )}
    </main>
  )
}