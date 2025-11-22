import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ReturnsPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-light tracking-tight mb-8">Returns & Refunds</h1>

        <div className="space-y-8">

          {/* POLICY */}
          <section>
            <h2 className="text-lg font-semibold mb-3">No Return / No Refund Policy</h2>
            <p className="text-muted-foreground mb-4">
              At <strong>RedCardRetail</strong>, we provide high-quality jerseys and combos at special discounted prices.
              Due to hygiene, personalization, size-based handling, and seasonal sale pricing, 
              <strong> all purchases are strictly non-returnable and non-refundable.</strong>
            </p>
          </section>

          {/* CONDITIONS */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Why Returns Are Not Accepted</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Jerseys are considered wearable/hygiene-sensitive products</li>
              <li>Sizes are selected by the customer before ordering</li>
              <li>All items go through strict quality checks before dispatch</li>
              <li>Special Black Friday & Combo discounts make orders final</li>
              <li>Return logistics significantly increase product cost</li>
            </ul>
          </section>

          {/* DAMAGE POLICY */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Damaged or Wrong Product?</h2>
            <p className="text-muted-foreground">
              If your order arrives damaged or you receive the wrong item,
              please contact us within <strong>24 hours of delivery</strong>.  
              We will review your case and offer a replacement if eligible.
            </p>
            <p className="text-muted-foreground mt-2">
              Proof required: clear photos/videos of the parcel, product, and packaging.
            </p>
          </section>

          {/* SUPPORT */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Need Help?</h2>
            <p className="text-muted-foreground">
              For any support, reach out to us at: <br />
              <strong>redcardretailjerseys@gmail.com</strong>
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  )
}
