import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function FAQPage() {
  const faqs = [
    {
      q: "What products does RedCardRetail sell?",
      a: "We specialize in premium football jerseys, combos, and athletic wear designed for comfort, durability, and performance.",
    },
    {
      q: "What is the material of the jerseys?",
      a: "Our jerseys are made using high-quality breathable polyester sports fabric designed to keep you cool and comfortable during play.",
    },
    {
      q: "Do you offer free shipping?",
      a: "Yes! Free shipping is available on all orders above ₹499. Orders below that amount have a flat ₹99 delivery charge.",
    },
    {
      q: "What is your return or exchange policy?",
      a: "We currently have a **No Return / No Exchange Policy** for all orders due to sizing hygiene and limited-stock inventory. Please check the size guide carefully before purchasing.",
    },
    {
      q: "When will I receive my order?",
      a: "Orders are typically delivered within **3–5 business days** depending on your location. Remote areas may take slightly longer.",
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can be cancelled only **before they are processed or shipped**. Once dispatched, cancellation is not possible.",
    },
    {
      q: "Do you ship internationally?",
      a: "Currently, we ship only within India. International shipping will be introduced soon.",
    },
    {
      q: "How can I contact support?",
      a: "You can reach us anytime at our official WhatsApp support number shown during checkout. We're happy to help!",
    },
  ]

  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-12">
          Find quick answers about RedCardRetail’s products, shipping, and order policies.
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
