"use client"

import { useState } from "react"
import { Lock, CheckCircle2, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

export default function PaymentPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [step, setStep] = useState<"payment" | "confirmation">("payment")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [orderID, setOrderID] = useState("")
  const [loading, setLoading] = useState(false)

  const subtotal = getCartTotal()
  const shipping = subtotal > 499 ? 0 : 99
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  if (cartItems.length === 0 && step === "payment") {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-light tracking-tight mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items before proceeding to payment</p>
          <Link href="/shop" className="inline-block btn-primary px-12 py-3">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const handlePaymentSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      const id = `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, "0")}`
      setOrderID(id)
      clearCart()
      setStep("confirmation")
      setLoading(false)
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <div className="bg-background py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {step === "payment" && (
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-12">Secure Payment</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Methods - Left */}
                <div className="lg:col-span-2">
                  <div className="bg-card border border-border rounded-lg p-8">
                    <h2 className="font-semibold text-sm uppercase tracking-wide mb-6">Select Payment Method</h2>
                    <div className="space-y-3">
                      {[
                        {
                          id: "upi",
                          label: "UPI",
                          description: "Google Pay, PhonePe, Paytm, BHIM",
                          icon: "💳",
                        },
                        {
                          id: "card",
                          label: "Credit/Debit Card",
                          description: "Visa, Mastercard, American Express",
                          icon: "💳",
                        },
                        {
                          id: "netbanking",
                          label: "Net Banking",
                          description: "All major banks supported",
                          icon: "🏦",
                        },
                        {
                          id: "wallet",
                          label: "Digital Wallet",
                          description: "Apple Pay, Google Wallet",
                          icon: "📱",
                        },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-start gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mt-1 cursor-pointer w-4 h-4"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm flex items-center gap-2">
                              <span>{method.icon}</span>
                              {method.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                          </div>
                          {paymentMethod === method.id && <ChevronRight size={20} className="text-primary" />}
                        </label>
                      ))}
                    </div>

                    {/* Security Info */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                        <Lock size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-semibold text-sm mb-1">256-bit SSL Encrypted</p>
                          <p className="text-xs text-muted-foreground">
                            Your payment information is secure and never shared
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="flex gap-4 mt-8">
                    <Link
                      href="/checkout"
                      className="flex-1 border-2 border-primary text-primary py-3 px-4 font-medium hover:bg-primary hover:text-primary-foreground transition-colors text-center rounded"
                    >
                      Back
                    </Link>
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={loading}
                      className="flex-1 btn-primary opacity-90 hover:opacity-100 disabled:opacity-50 rounded"
                    >
                      {loading ? "Processing..." : `Pay ₹${total}`}
                    </button>
                  </div>
                </div>

                {/* Order Summary - Right */}
                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">Order Summary</h3>

                    {/* Items */}
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                          {shipping === 0 ? "FREE" : `₹${shipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (18%)</span>
                        <span>₹{tax}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
              </div>
              <h1 className="text-4xl font-light tracking-tight mb-3">Payment Successful!</h1>
              <p className="text-lg text-muted-foreground mb-8">Your order has been confirmed</p>

              <div className="bg-card border border-border rounded-lg p-8 mb-8 text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Order ID</p>
                <p className="font-semibold text-2xl mb-8 font-mono">{orderID}</p>

                <div className="border-t border-border pt-8">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Order Details</p>
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Items ({cartItems.length})</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{tax}</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-semibold">
                    <span>Total Amount Paid</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-8">
                A confirmation email will be sent shortly. You can track your order using your Order ID.
              </p>

              <div className="flex flex-col gap-4">
                <Link href="/order-status" className="inline-block btn-primary px-12 py-3">
                  Track Your Order
                </Link>
                <Link
                  href="/shop"
                  className="inline-block border-2 border-primary text-primary py-3 px-4 font-medium hover:bg-primary hover:text-primary-foreground transition-colors rounded"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
