"use client";

import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

type CheckoutStep = "cart" | "shipping" | "confirmation";

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

  const [errors, setErrors] = useState<any>({});

  // PRICE (NO TAX)
  const subtotal = getCartTotal();
  const shipping = subtotal > 499 ? 0 : 99;
  const total = subtotal + shipping;

  // 🌟 WhatsApp ORDER FLOW
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

    if (Object.keys(newErrors).length !== 0) return;

    // Generate Order ID
    const orderId = `ORD-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000)
    ).padStart(5, "0")}`;

    // Build WhatsApp message
    const message = `
🛍️ *New Order Request from RedCardRetail*

*Order ID:* ${orderId}

--------------------------
📦 *Items Ordered*
${cartItems
  .map(
    (item) =>
      `• ${item.name} (Size: ${item.size}) × ${item.quantity} = ₹${item.price * item.quantity}`
  )
  .join("\n")}

--------------------------
💰 *Total Amount:* ₹${total}
(Shipping: ${shipping === 0 ? "FREE" : "₹" + shipping})

--------------------------
🏡 *Shipping Address*
${shippingInfo.firstName} ${shippingInfo.lastName}
${shippingInfo.address}
${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}

📞 ${shippingInfo.phone}
📧 ${shippingInfo.email}

--------------------------
Please confirm the order and send payment instructions.
    `;

    const whatsappNumber = "918169413019"; // ← REPLACE WITH YOUR WHATSAPP NUMBER

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = url; // Redirect to WhatsApp
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 🔢 STEP INDICATOR */}
      <div className="flex items-center justify-between mb-12">
        {(["cart", "shipping", "confirmation"] as CheckoutStep[]).map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                step === s || (step === "confirmation" && s !== "confirmation")
                  ? "bg-primary text-primary-foreground"
                  : "bg-border text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            {i < 2 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all ${
                  step === "confirmation" ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* 🛒 CART STEP */}
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
              {/* CART ITEMS */}
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

      {/* 🚚 SHIPPING STEP (WITH TRUST TEXT) */}
      {step === "shipping" && (
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-3">Shipping Address</h1>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            👉 <strong>Your order will be confirmed on WhatsApp.</strong>  
            After submitting your address, you will be redirected to our verified WhatsApp Business chat with your full order details.  
            You can review everything, ask questions, and complete payment securely via UPI / QR code.  
            We do this to ensure <strong>safe, verified & trusted order handling for every customer.</strong>
          </p>

          <div className="bg-card border border-border rounded-lg p-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* First Name */}
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

              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name"
                value={shippingInfo.lastName}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                }
                className="col-span-1 border border-border rounded px-4 py-3 text-sm"
              />

              {/* Email */}
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

              {/* Phone */}
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

              {/* Address */}
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

              {/* City */}
              <input
                type="text"
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, city: e.target.value })
                }
                className="col-span-1 border border-border rounded px-4 py-3 text-sm"
              />

              {/* State */}
              <input
                type="text"
                placeholder="State"
                value={shippingInfo.state}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, state: e.target.value })
                }
                className="col-span-1 border border-border rounded px-4 py-3 text-sm"
              />

              {/* Pincode */}
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

              <button
                onClick={handleShippingSubmit}
                className="flex-1 btn-primary"
              >
                Continue on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎉 CONFIRMATION (After WhatsApp redirect) */}
      {step === "confirmation" && (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-light tracking-tight mb-2">
            Redirecting to WhatsApp…
          </h1>
        </div>
      )}
    </div>
  );
}
