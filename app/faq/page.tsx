import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function FAQPage() {
  const faqs = [
    {
      q: "What is the material composition?",
      a: "Our t-shirts are made from 100% premium cotton blend at 240 GSM weight. This ensures durability, comfort, and longevity.",
    },
    {
      q: "Do you offer free shipping?",
      a: "Yes! Free shipping is available on all orders above ₹499. Orders below that amount incur a ₹99 shipping charge.",
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day return policy on all items. If you're not satisfied, simply initiate a return within 30 days of purchase.",
    },
    {
      q: "How should I care for my MINIML tee?",
      a: "Machine wash in cold water, do not bleach, and line dry for best results. This will keep your tee vibrant and durable for years.",
    },
    {
      q: "When will I receive my order?",
      a: "Delivery typically takes 3-7 business days depending on your location. You can check delivery estimates during checkout.",
    },
    {
      q: "Do you ship internationally?",
      a: "Currently, we ship only within India. We're exploring international shipping options and will announce them soon.",
    },
  ]

  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-12">
          Find answers to common questions about MINIML products and services.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border pb-6 last:border-b-0">
              <h3 className="text-lg font-semibold mb-3">{faq.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
