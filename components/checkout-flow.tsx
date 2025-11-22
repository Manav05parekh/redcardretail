"use client";

import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export function CheckoutFlow() {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderID, setOrderID] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // PRICE (NO TAX)
  const subtotal = getCartTotal();
  const shipping = subtotal > 499 ? 0 : 99;
  const total = subtotal + shipping;

  // SHIPPING VALIDATION
  const handleShippingSubmit = () => {
    let newErrors: any = {};

    if (!shippingInfo.firstName.trim()) newErrors.firstName = "First name is required";

    if (!shippingInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email))
      newErrors.email = "Enter a valid email";

    if (!shippingInfo.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(shippingInfo.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";

    if (!shippingInfo.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(shippingInfo.pincode))
      newErrors.pincode = "Enter a valid 6-digit pincode";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) setStep("payment");
  };

  // PAYMENT + API
  const handlePaymentSubmit = async () => {
    if (!paymentMethod) {
      setErrors({ payment: "Please select a payment method" });
      return;
    }

    setIsPlacingOrder(true);
    setSyncError(null);

    const id = `ORD-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000)
    ).padStart(5, "0")}`;

    setOrderID(id);

    // Array sent to backend
    const payload = {
      orderId: id,
      shippingInfo,
      paymentMethod,
      subtotal,
      shipping,
      total,
      items: cartItems.map((item) => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error("Order sync failed:", data);
        setSyncError("Order saved locally, but failed to sync to Sheets.");
      }
    } catch (error) {
      console.error("Order sync error:", error);
      setSyncError("Order saved locally, but failed to sync to Sheets.");
    } finally {
      setIsPlacingOrder(false);
      setStep("confirmation");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* STEP INDICATOR */}
      <div className="flex items-center justify-between mb-12">
        {(["cart", "shipping", "payment", "confirmation"] as CheckoutStep[]).map(
          (s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  step === s ||
                  (["payment", "confirmation"].includes(step) &&
                    ["cart", "shipping"].includes(s))
                    ? "bg-primary text-primary-foreground"
                    : "bg-border text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all ${
                    step > s ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          )
        )}
      </div>

      {/* CART STEP */}
      {step === "cart" && (
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-8">Order Review</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <a href="/shop" className="text-primary underline">
                Continue Shopping
              </a>
            </div>
          ) : (
            <>
              <div className="bg-card border border-border rounded-lg p-8 mb-8">
                <h2 className="font-semibold text-sm uppercase tracking-wide mb-6">
                  Items in Cart
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start gap-4 pb-4 border-b border-border last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover border"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold mb-2">
                          ₹{item.price * item.quantity}
                        </p>
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 text-xs border border-border hover:bg-secondary"
                          >
                            −
                          </button>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 text-xs border border-border hover:bg-secondary"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-2 py-1 text-xs border border-border hover:bg-red-50 text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="bg-card border border-border rounded-lg p-8 mb-8">
                <h2 className="font-semibold text-sm uppercase tracking-wide mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setStep("shipping")} className="btn-primary w-full">
                Continue to Shipping
              </button>
            </>
          )}
        </div>
      )}

      {/* SHIPPING STEP */}
      {step === "shipping" && (
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-8">Shipping Address</h1>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="col-span-1">
                <input
                  type="text"
                  placeholder="First Name"
                  value={shippingInfo.firstName}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                  }
                  className={`w-full border rounded px-4 py-3 text-sm ${
                    errors.firstName ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <input
                type="text"
                placeholder="Last Name"
                value={shippingInfo.lastName}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                }
                className="col-span-1 border border-border rounded px-4 py-3 text-sm"
              />

              <div className="col-span-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, email: e.target.value })
                  }
                  className={`w-full border rounded px-4 py-3 text-sm ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="col-span-2">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={shippingInfo.phone}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, phone: e.target.value })
                  }
                  className={`w-full border rounded px-4 py-3 text-sm ${
                    errors.phone ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, address: e.target.value })
                  }
                  className={`w-full border rounded px-4 py-3 text-sm ${
                    errors.address ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <input
                type="text"
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, city: e.target.value })
                }
                className="col-span-1 border border-border rounded px-4 py-3 text-sm"
              />

              <input
                type="text"
                placeholder="State"
                value={shippingInfo.state}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, state: e.target.value })
                }
                className="col-span-1 border border-border rounded px-4 py-3 text-sm"
              />

              <div className="col-span-1">
                <input
                  type="text"
                  placeholder="Pincode"
                  value={shippingInfo.pincode}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                  }
                  className={`w-full border rounded px-4 py-3 text-sm ${
                    errors.pincode ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep("cart")}
                className="flex-1 border-2 border-primary text-primary py-3 px-4 font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Back
              </button>
              <button onClick={handleShippingSubmit} className="flex-1 btn-primary">
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT STEP */}
      {step === "payment" && (
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-8">Payment Method</h1>

          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="font-semibold text-sm uppercase tracking-wide mb-6">
              Select Payment Method
            </h2>

            <div className="space-y-3 mb-8">
              {[

                { id: "upi", label: "UPI", description: "Google Pay, PhonePe, Paytm" },
                { id: "card", label: "Credit/Debit Card", description: "All major cards" },
                { id: "netbanking", label: "Net Banking", description: "All major banks" },

              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-start gap-3 p-4 border border-border rounded cursor-pointer hover:bg-secondary transition-colors"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setErrors({});
                    }}
                    className="mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>

            {errors.payment && (
              <p className="text-red-500 text-xs mb-4">{errors.payment}</p>
            )}

            {syncError && (
              <p className="text-red-500 text-xs mb-4">{syncError}</p>
            )}

            <div className="bg-secondary/50 rounded-lg p-4 mb-8">
              <div className="flex justify-between text-sm font-semibold">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Lock size={14} />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep("shipping")}
                className="flex-1 border-2 border-primary text-primary py-3 px-4 font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePaymentSubmit}
                className="flex-1 btn-primary disabled:opacity-70"
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION STEP */}
      {step === "confirmation" && (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-light tracking-tight mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase
          </p>

          <div className="bg-card border border-border rounded-lg p-8 mb-8 text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Order ID
            </p>
            <p className="font-semibold text-lg mb-6">{orderID}</p>

            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">
                Order Summary
              </p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="/order-status" className="flex-1 btn-primary text-center py-3">
              Track Order
            </a>
            <a
              href="/shop"
              className="flex-1 border-2 border-primary text-primary py-3 px-4 font-medium hover:bg-primary hover:text-primary-foreground text-center transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
