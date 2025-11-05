import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative text-black overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-[#ffffff]"
        style={{ opacity: 0.6 }}
      />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="./Logo.png"
              alt="PELa IT Logo"
              width={150}
              height={60}
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm text-black/80 leading-relaxed">
              Leading IT solutions provider delivering innovative technology services to businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-black/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-black/80 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/clients-partners"
                  className="text-sm text-black/80 hover:text-primary transition-colors"
                >
                  Clients & Partners
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-black/80 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-black/80">IT Infrastructure</li>
              <li className="text-sm text-black/80">Cybersecurity</li>
              <li className="text-sm text-black/80">IoT Solutions</li>
              <li className="text-sm text-black/80">Software Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-black/80">hello@prime.lk</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-black/80">+94 (11) 5 672 666 / +94 (11) 5 752 117</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-black/80">No. 36, Nugegoda Road, Pepiliyana, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} Prime IT Solutions Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
