"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckoutFlow } from "@/components/checkout-flow"

export default function CheckoutPage() {
  return (
    <main>
      <Navbar />
      <CheckoutFlow />
      <Footer />
    </main>
  )
}
