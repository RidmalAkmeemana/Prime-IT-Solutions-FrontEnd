"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Message from "@/components/message"
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
    cv: null as File | null
  })

  // ==================== NEW: Individual Resume Submission ====================
  const [isIndividualOpen, setIsIndividualOpen] = useState(false)
  const [individualFileName, setIndividualFileName] = useState("")
  const [individualFormData, setIndividualFormData] = useState({
    email: "",
    name: "",
    contact: "",
    address: "",
    position: "",
    cv: null as File | null
  })

  const [company, setCompany] = useState({
    name: "",
    address: "",
    email: "",
    tel1: "N/A",
    tel2: "N/A",
    tel3: "N/A",
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

  /* =========================
       FETCH COMPANY DETAILS
    ========================= */
    const fetchCompanyDetails = async () => {
      try {
          const res = await fetch(
              API_BASE_URL + "API/Public/getCompanyDetails.php"
          );
          const data = await res.json();
          if (data) {
              setCompany({
                  name: data.Company_Name || "",
                  address: data.Company_Address || "",
                  email: data.Company_Email || "",
                  tel1: data.Company_Tel1?.trim() || "N/A",
                  tel2: data.Company_Tel2?.trim() || "N/A",
                  tel3: data.Company_Tel3?.trim() || "N/A",
              });
          }
      } catch (error) {
          console.error("Error fetching company details:", error);
      }
  };

  useEffect(() => {
      fetchCompanyDetails();
  }, []);

  /* =========================
     FETCH APPLICANT BY EMAIL
  ========================= */
  const fetchApplicantByEmail = async () => {
    if (!formData.email) return;
  
    try {
      const res = await fetch(
        API_BASE_URL + "API/Public/getApplicantDetails.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ Applicant_Email: formData.email }),
        }
      );
  
      const data = await res.json();
  
      if (data.success && data.data) {
        setFormData((prev) => ({
          ...prev,
          name: data.data.Applicant_Name || "",
          contact: data.data.Applicant_Contact || "",
          address: data.data.Applicant_Address || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.cv) {
      setToast({
        open: true,
        status: "error",
        title: "No CV selected",
        description: "Please upload your CV before submitting.",
      });
      return;
    }
  
    if (!selectedJob?.id) {
      setToast({
        open: true,
        status: "error",
        title: "No Job Selected",
        description: "Please select a job to apply for.",
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const form = new FormData();
      form.append("Vacancy_Id", selectedJob.id);
      form.append("Applicant_Name", formData.name);
      form.append("Applicant_Email", formData.email);
      form.append("Applicant_Contact", formData.contact);
      form.append("Applicant_Address", formData.address);
      form.append("Applicant_CV", formData.cv); // matches backend field name
  
      const response = await fetch(API_BASE_URL + "API/Public/applyJob.php", {
        method: "POST",
        body: form,
      });
  
      const data = await response.json();
  
      if (!data.success) {
        setToast({
          open: true,
          status: "error",
          title: "Failed to submit CV",
          description: data.message || "Please try again.",
        });
        return;
      }

      await sendApplicationEmails(data);
  
      setToast({
        open: true,
        status: "success",
        title: "Application Submitted",
        description: `Your application for "${selectedJob.title}" has been submitted.`,
      });
  
      // Reset form
      setFormData({
        email: "",
        name: "",
        contact: "",
        address: "",
        cv: null,
      });
      setFileName("");
      setIsApplyOpen(false);
    } catch (error) {
      console.error("Error submitting CV:", error);
      setToast({
        open: true,
        status: "error",
        title: "Something went wrong",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const pdfPreview = formData.cv ? URL.createObjectURL(formData.cv) : null

  const sendApplicationEmails = async (data: any) => {

    let statusBadge = "";

    if (data.Status === "Pending") {
      statusBadge = `<span style="background:#ffc107;color:#000;padding:5px 10px;border-radius:4px;font-size:12px;">Pending</span>`;
    }
    else if (data.Status === "Hired") {
      statusBadge = `<span style="background:#0d6efd;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;">Hired</span>`;
    }
    else if (data.Status === "Rejected") {
      statusBadge = `<span style="background:#dc3545;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;">Rejected</span>`;
    }
    else if (data.Status === "Interview") {
      statusBadge = `<span style="background:#0dcaf0;color:#000;padding:5px 10px;border-radius:4px;font-size:12px;">Interview</span>`;
    }
    else {
      statusBadge = `<span style="background:#6c757d;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;">${data.Status}</span>`;
    }
  
    /* =========================
       APPLICANT EMAIL
    ========================= */
    const applicantBody = `
        <div style="font-family: Arial, sans-serif; background-color:#f6f6f6; padding:30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">
              
              <!-- HEADER -->
              <tr>
                  <td style="background:#b72227;padding:20px;text-align:center;color:#ffffff;">
                      <h2 style="margin:0;">Application Submited</h2>
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
                          Dear <b>${data.Applicant_Name}</b>,
                      </p>

                      <p style="font-size:14px;color:#555;"> 
                          Your application has been <b>successfully submited</b>. Our team member will contact you shortly to discuss further details.
                      </p>

                      <!-- APPLICATION DETAILS -->
                      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                          <tr style="background:#f2f2f2;">
                              <td colspan="2" style="font-weight:bold;">Applicant Details</td>
                          </tr>
                          <tr>
                              <td><b>Application No</b></td>
                              <td>${data.Application_Id}</td>
                          </tr>
                          <tr>
                              <td><b>Process Status</b></td>
                              <td>${statusBadge}</td>
                          </tr>
                          <tr>
                              <td><b>Job Title</b></td>
                              <td>${data.Job_Title}</td>
                          </tr>
                          <tr>
                              <td><b>Job Location</b></td>
                              <td>${data.Job_Location}</td>
                          </tr>
                          <tr>
                              <td><b>Job Type</b></td>
                              <td>${data.Job_Type}</td>
                          </tr>
                          <tr>
                              <td><b>Applicant Name</b></td>
                              <td>${data.Applicant_Name}</td>
                          </tr>
                          <tr>
                              <td><b>Applicant Address</b></td>
                              <td>${data.Applicant_Address}</td>
                          </tr>
                          <tr>
                              <td><b>Applicant Contact</b></td>
                              <td>${data.Applicant_Contact}</td>
                          </tr>
                          <tr>
                              <td><b>Applicant Email</b></td>
                              <td>${data.Applicant_Email}</td>
                          </tr>
                      </table>
                  </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                  <td style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#777;">
                      <b>${company.name}</b><br>
                      ${company.address}<br>
                      Email: ${company.email}<br>
                      Contact: ${company.tel1}
                  </td>
              </tr>
          </table>
        </div>
    `;
  
    /* =========================
       HR EMAIL
    ========================= */
    const hrBody = `
      <div style="font-family: Arial, sans-serif; background-color:#f6f6f6; padding:30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
                <td style="background:#b72227;padding:20px;text-align:center;color:#ffffff;">
                    <h2 style="margin:0;">Application Submited</h2>
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

                    <p style="font-size:14px;color:#555;"> 
                        New application has been <b>successfully submited</b>. Please review the submitted application at your earliest convenience and proceed with the necessary next steps. 
                    </p>

                    <!-- APPLICATION DETAILS -->
                    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                        <tr style="background:#f2f2f2;">
                            <td colspan="2" style="font-weight:bold;">Applicant Details</td>
                        </tr>
                        <tr>
                            <td><b>Application No</b></td>
                            <td>${data.Application_Id}</td>
                        </tr>
                        <tr>
                            <td><b>Process Status</b></td>
                            <td>${statusBadge}</td>
                        </tr>
                        <tr>
                            <td><b>Job Title</b></td>
                            <td>${data.Job_Title}</td>
                        </tr>
                        <tr>
                            <td><b>Job Location</b></td>
                            <td>${data.Job_Location}</td>
                        </tr>
                        <tr>
                            <td><b>Job Type</b></td>
                            <td>${data.Job_Type}</td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td>${data.Applicant_Name}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>${data.Applicant_Address}</td>
                        </tr>
                        <tr>
                            <td><b>Contact</b></td>
                            <td>${data.Applicant_Contact}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>${data.Applicant_Email}</td>
                        </tr>
                    </table>

                    <!-- DOWNLOAD BUTTON -->
                    <div style="text-align:center; margin-top:20px;">
                        <a href="${API_BASE_URL + data.Applicant_CV}" download
                        style="padding:10px 20px; background:#b72227; color:#fff; text-decoration:none; border-radius:5px;"><i class="fe fe-download"></i>
                            Download CV
                        </a>
                    </div>
                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#777;">
                    <b>${company.name}</b><br>
                    ${company.address}<br>
                    Email: ${company.email}<br>
                    Contact: ${company.tel1}
                </td>
            </tr>
        </table>
      </div>
    `;
  
    /* =========================
       SEND EMAILS
    ========================= */
  
    // Applicant Email
    await fetch(API_BASE_URL + "sendEmail.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        from: company.email,
        name: company.name,
        to: data.Applicant_Email,
        subject: `New Application Submitted - ${data.Application_Id}`,
        body: applicantBody,
      }),
    });
  
    // HR Email (send to company email)
    await fetch(API_BASE_URL + "sendEmail.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        from: company.email,
        name: company.name,
        to: company.email, // HR email
        subject: `New Application Submitted - ${data.Application_Id}`,
        body: hrBody,
      }),
    });
  };

  // ==================== NEW: Individual Resume Handlers ====================
 
  const handleIndividualInputChange = (e: any) => {
    const { name, value } = e.target
    setIndividualFormData(prev => ({ ...prev, [name]: value }))
  }
 
  const fetchIndividualApplicantByEmail = async () => {
    if (!individualFormData.email) return
 
    try {
      const res = await fetch(
        API_BASE_URL + "API/Public/getApplicantDetails.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ Applicant_Email: individualFormData.email }),
        }
      )
      const data = await res.json()
 
      if (data.success && data.data) {
        setIndividualFormData(prev => ({
          ...prev,
          name: data.data.Applicant_Name || "",
          contact: data.data.Applicant_Contact || "",
          address: data.data.Applicant_Address || "",
        }))
      } else {
        setIndividualFormData(prev => ({
          ...prev,
          name: "",
          contact: "",
          address: "",
        }))
      }
    } catch (error) {
      console.error("Error fetching applicant details:", error)
    }
  }
 
  const handleIndividualFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files allowed")
        return
      }
      setIndividualFileName(file.name)
      setIndividualFormData(prev => ({ ...prev, cv: file }))
    }
  }
 
  const sendIndividualApplicationEmails = async (data: any) => {

    let statusBadge = "";

    if (data.Status === "Pending") {
      statusBadge = `<span style="background:#ffc107;color:#000;padding:5px 10px;border-radius:4px;font-size:12px;">Pending</span>`;
    }
    else if (data.Status === "Hired") {
      statusBadge = `<span style="background:#0d6efd;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;">Hired</span>`;
    }
    else if (data.Status === "Rejected") {
      statusBadge = `<span style="background:#dc3545;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;">Rejected</span>`;
    }
    else if (data.Status === "Interview") {
      statusBadge = `<span style="background:#0dcaf0;color:#000;padding:5px 10px;border-radius:4px;font-size:12px;">Interview</span>`;
    }
    else {
      statusBadge = `<span style="background:#6c757d;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;">${data.Status}</span>`;
    }

    /* =========================
       APPLICANT EMAIL
    ========================= */
    const applicantBody = `
      <div style="font-family: Arial, sans-serif; background-color:#f6f6f6; padding:30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">
            <!-- HEADER -->
            <tr>
                <td style="background:#b72227;padding:20px;text-align:center;color:#ffffff;">
                    <h2 style="margin:0;">Application Submited</h2>
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
                        Dear <b>${data.Applicant_Name}</b>,
                    </p>

                    <p style="font-size:14px;color:#555;"> 
                        Your application has been <b>successfully submited</b>. Our team member will contact you shortly to discuss further details.
                    </p>

                    <!-- DETAILS -->
                    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                        <tr style="background:#f2f2f2;">
                            <td colspan="2" style="font-weight:bold;">Applicant Details</td>
                        </tr>
                        <tr>
                            <td><b>Application No</b></td>
                            <td>${data.Individuals_Id}</td>
                        </tr>
                        <tr>
                              <td><b>Process Status</b></td>
                              <td>${statusBadge}</td>
                        </tr>
                        <tr>
                            <td><b>Job Title</b></td>
                            <td>${data.Job_Title}</td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td>${data.Applicant_Name}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>${data.Applicant_Address}</td>
                        </tr>
                        <tr>
                            <td><b>Contact</b></td>
                            <td>${data.Applicant_Contact}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>${data.Applicant_Email}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- FOOTER -->
            <tr>
                <td style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#777;">
                    <b>${company.name}</b><br>
                    ${company.address}<br>
                    Email: ${company.email}<br>
                    Contact: ${company.tel1}
                </td>
            </tr>
        </table>
      </div>
    `
 
    /* =========================
       HR EMAIL
    ========================= */
    const hrBody = `
      <div style="font-family: Arial, sans-serif; background-color:#f6f6f6; padding:30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden;">
            <!-- HEADER -->
            <tr>
                <td style="background:#b72227;padding:20px;text-align:center;color:#ffffff;">
                    <h2 style="margin:0;">Application Submited</h2>
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
                    <p style="font-size:14px;color:#555;"> 
                        New application has been <b>successfully submited</b>. Please review the submitted application at your earliest convenience and proceed with the necessary next steps. 
                    </p>
                    <!-- DETAILS -->
                    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">
                        <tr style="background:#f2f2f2;">
                            <td colspan="2" style="font-weight:bold;">Applicant Details</td>
                        </tr>
                        <tr>
                            <td><b>Application No</b></td>
                            <td>${data.Individuals_Id}</td>
                        </tr>
                        <tr>
                            <td><b>Process Status</b></td>
                            <td>${statusBadge}</td>
                        </tr>
                        <tr>
                            <td><b>Job Title</b></td>
                            <td>${data.Job_Title}</td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td>${data.Applicant_Name}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>${data.Applicant_Address}</td>
                        </tr>
                        <tr>
                            <td><b>Contact</b></td>
                            <td>${data.Applicant_Contact}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>${data.Applicant_Email}</td>
                        </tr>
                    </table>
                    <!-- DOWNLOAD BUTTON -->
                    <div style="text-align:center; margin-top:20px;">
                        <a href="${API_BASE_URL + data.Applicant_CV}" download
                        style="padding:10px 20px; background:#b72227; color:#fff; text-decoration:none; border-radius:5px;">
                            Download CV
                        </a>
                    </div>
                </td>
            </tr>
            <!-- FOOTER -->
            <tr>
                <td style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#777;">
                    <b>${company.name}</b><br>
                    ${company.address}<br>
                    Email: ${company.email}<br>
                    Contact: ${company.tel1}
                </td>
            </tr>
        </table>
      </div>
    `
 
    // Applicant Email
    await fetch(API_BASE_URL + "sendEmail.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        from: company.email,
        name: company.name,
        to: data.Applicant_Email,
        subject: `New Application Submitted - ${data.Individuals_Id}`,
        body: applicantBody,
      }),
    })
 
    // HR Email
    await fetch(API_BASE_URL + "sendEmail.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        from: company.email,
        name: company.name,
        to: company.email,
        subject: `New Application Submitted - ${data.Individuals_Id}`,
        body: hrBody,
      }),
    })
  }
 
  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
 
    if (!individualFormData.cv) {
      setToast({
        open: true,
        status: "error",
        title: "No CV selected",
        description: "Please upload your CV before submitting.",
      })
      return
    }
 
    setLoading(true)
 
    try {
      const form = new FormData()
      form.append("Applicant_Name", individualFormData.name)
      form.append("Applicant_Email", individualFormData.email)
      form.append("Applicant_Contact", individualFormData.contact)
      form.append("Applicant_Address", individualFormData.address)
      form.append("Job_Title", individualFormData.position)
      form.append("Applicant_CV", individualFormData.cv)
 
      const response = await fetch(API_BASE_URL + "API/Public/applyIndividual.php", {
        method: "POST",
        body: form,
      })
 
      const data = await response.json()
 
      if (!data.success) {
        setToast({
          open: true,
          status: "error",
          title: "Failed to submit resume",
          description: data.message || "Please try again.",
        })
        return
      }
 
      await sendIndividualApplicationEmails(data)
 
      setToast({
        open: true,
        status: "success",
        title: "Resume Submitted",
        description: "Your resume has been submitted successfully. We'll be in touch!",
      })
 
      // Reset form
      setIndividualFormData({
        email: "",
        name: "",
        contact: "",
        address: "",
        position: "",
        cv: null,
      })
      setIndividualFileName("")
      setIsIndividualOpen(false)
    } catch (error) {
      console.error("Error submitting resume:", error)
      setToast({
        open: true,
        status: "error",
        title: "Something went wrong",
        description: "Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }
 
  const individualPdfPreview = individualFormData.cv ? URL.createObjectURL(individualFormData.cv) : null

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
                value={formData.email} onChange={handleInputChange} onBlur={fetchApplicantByEmail}
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
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => setIsIndividualOpen(true)}
          >
            Submit Your Resume
          </Button>
        </div>
      </section>

      {/* INDIVIDUAL RESUME MODAL */}
      {isIndividualOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
 
            <div className="flex justify-between mb-6">
              <h4 className="text-lg font-semibold">Submit Your Resume</h4>
              <button
                onClick={() => setIsIndividualOpen(false)}
                className="flex items-center gap-2 text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
 
            <form className="space-y-4" onSubmit={handleIndividualSubmit}>
              <input
                name="email"
                placeholder="Email"
                required
                value={individualFormData.email}
                onChange={handleIndividualInputChange}
                onBlur={fetchIndividualApplicantByEmail}
                className="w-full border p-3 rounded-lg"
              />
 
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  value={individualFormData.name}
                  onChange={handleIndividualInputChange}
                  className="border p-3 rounded-lg"
                />
                <input
                  name="contact"
                  placeholder="Contact"
                  required
                  value={individualFormData.contact}
                  onChange={handleIndividualInputChange}
                  className="border p-3 rounded-lg"
                />
              </div>
 
              <input
                name="address"
                placeholder="Address"
                required
                value={individualFormData.address}
                onChange={handleIndividualInputChange}
                className="w-full border p-3 rounded-lg"
              />
 
              <input
                name="position"
                placeholder="Applying Position (e.g. Software Engineer)"
                required
                value={individualFormData.position}
                onChange={handleIndividualInputChange}
                className="w-full border p-3 rounded-lg"
              />
 
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-muted-foreground">
                  Upload CV
                </label>
 
                <div
                  className="border-2 border-dashed border-red-400 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => document.getElementById("individualCvUpload")?.click()}
                >
                  {individualPdfPreview ? (
                    <div className="flex items-center justify-center gap-3 py-4">
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
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                          {individualFileName}
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
                    id="individualCvUpload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleIndividualFileChange}
                    className="hidden"
                  />
                </div>
 
                <p className="text-xs text-gray-500 mt-2">File must be PDF</p>
              </div>
 
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsIndividualOpen(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Submit Resume
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