import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-light tracking-tight mb-8">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">

          {/* INTRODUCTION */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Introduction</h2>
            <p>
              At <strong>RedCardRetail</strong>, your privacy matters to us. 
              This Privacy Policy explains how we collect, use, and safeguard 
              your personal information when you shop for our jerseys, combos, 
              and other apparel.
            </p>
          </section>

          {/* INFORMATION COLLECTED */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Information We Collect</h2>
            <p>
              We collect information you provide while placing an order, such as:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping address</li>
              <li>Selected size and items</li>
            </ul>
            <p>
              We also use cookies and basic analytics to improve your browsing experience.
            </p>
          </section>

          {/* HOW WE USE YOUR DATA */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">How We Use Your Information</h2>
            <p>Your data helps us:</p>
            <ul>
              <li>Process and deliver your orders</li>
              <li>Send order updates and confirmations</li>
              <li>Improve product quality and customer experience</li>
              <li>Share offers and updates (you can opt out anytime)</li>
            </ul>
          </section>

          {/* DATA SECURITY */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Data Security</h2>
            <p>
              We use secure systems and trusted payment gateways to protect your personal information.
              Your payment details are never stored on our servers and are processed securely.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Contact Us</h2>
            <p>
              For any privacy-related questions, feel free to reach out to us at:  
              <br />
              <strong>privacy@redcardretail.com</strong>
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  )
}
