"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-light tracking-tight mb-2">Get in Touch</h1>
        <p className="text-muted-foreground mb-10">
          We'd love to hear from you. Reach out with any questions or feedback.
        </p>

        {/* CENTERED CONTAINER */}
        <div className="flex flex-col items-center gap-12">

          {/* EMAIL SECTION */}
          <div className="flex flex-col items-center">
            <Mail className="text-muted-foreground mb-3" size={26} />
            <p className="font-semibold text-sm mb-1">Email</p>
            <a
              href="mailto:redcardretailjerseys@gmail.com"
              className="text-muted-foreground hover:text-foreground text-sm transition"
            >
              redcardretailjerseys@gmail.com
            </a>
          </div>

          {/* ADDRESS SECTION */}
          <div className="flex flex-col items-center">
            <MapPin className="text-muted-foreground mb-3" size={26} />
            <p className="font-semibold text-sm mb-1">Address</p>
            <p className="text-muted-foreground text-sm leading-5 text-center">
              RedCardRetail <br />
              Mumbai, India
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
