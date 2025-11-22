"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-light tracking-tight mb-2">Get in Touch</h1>
        <p className="text-muted-foreground mb-10">
          We'd love to hear from you. Reach out with any questions or feedback.
        </p>

        <div className="space-y-10">
          {/* Email */}
          <div className="flex items-center justify-center gap-4">
            <Mail className="text-muted-foreground" size={22} />
            <div className="text-left">
              <p className="font-semibold text-sm mb-1">Email</p>
              <a
                href="mailto:hello@miniml.com"
                className="text-muted-foreground hover:text-foreground text-sm transition"
              >
                redcardretailjerseys@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          
          {/* Address */}
          <div className="flex items-center justify-center gap-4">
            <MapPin className="text-muted-foreground" size={22} />
            <div className="text-left">
              <p className="font-semibold text-sm mb-1">Address</p>
              <p className="text-muted-foreground text-sm leading-5">
                RedCardRetail <br />
                Mumbai, India
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
