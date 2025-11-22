import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light tracking-tight mb-8">About RedCardRetail</h1>

        <div className="prose prose-sm max-w-none space-y-8">

          {/* BRAND PHILOSOPHY */}
          <section>
            <h2 className="text-2xl font-light tracking-tight mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              RedCardRetail stands for clean design, bold performance, and everyday comfort.
              What started as a minimal clothing idea has now evolved into a focused sportswear brand,
              delivering premium jerseys and combo sets at unbeatable prices.
              No over-designing — just simple, powerful, reliable quality.
            </p>
          </section>

          {/* QUALITY */}
          <section>
            <h2 className="text-2xl font-light tracking-tight mb-4">Quality Standards</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every jersey at RedCardRetail is crafted using breathable, soft, quick-dry sports fabric
              suitable for gym, college, daily wear, and outdoor activities. Our vibrant prints,
              durable stitching, and comfort-first design ensure long-lasting performance.
              Every piece is manually quality-checked before dispatch.
            </p>
          </section>

          {/* POLICY */}
          <section>
            <h2 className="text-2xl font-light tracking-tight mb-4">Our Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              To maintain affordability and fast-moving stock during our high-demand seasons,
              <strong> RedCardRetail follows a No Return / No Replacement policy.</strong>
              Even with this policy, we ensure guaranteed good quality for every item.
            </p>
          </section>

          {/* DELIVERY */}
          <section>
            <h2 className="text-2xl font-light tracking-tight mb-4">Fast Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              Orders are dispatched quickly through trusted delivery partners.
              Typical delivery timelines: <strong>3–5 business days</strong>.
              We keep you updated on the status to ensure a smooth buying experience.
            </p>
          </section>

          {/* CUSTOMER COMMITMENT */}
          <section>
            <h2 className="text-2xl font-light tracking-tight mb-4">Customer Commitment</h2>
            <p className="text-muted-foreground leading-relaxed">
              Even with no returns, your satisfaction matters deeply to RedCardRetail.
              For order-related queries or concerns, our team is always available to help
              with fast, transparent, and friendly support.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  )
}
