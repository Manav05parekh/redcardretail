"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrderTracker } from "@/components/order-tracker"

export default function OrderStatusPage() {
  return (
    <main>
      <Navbar />
      <OrderTracker />
      <Footer />
    </main>
  )
}
