"use client";

import { useState } from "react";

export function OrderTracker() {
  const [orderId, setOrderId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    // Simulate checking...
    setTimeout(() => {
      setShowResult(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light mb-2">Track Your Order</h1>
      <p className="text-muted-foreground mb-8">
        Enter your Order ID to check your delivery timeline.
      </p>

      {/* Search Box */}
      <div className="bg-card border border-border p-6 rounded mb-8">
        <label className="text-sm font-semibold">Order ID</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value.toUpperCase())}
          placeholder="e.g., ORD-2025-00012"
          className="w-full mt-2 border border-border rounded px-4 py-3"
        />

        <button
          onClick={handleSearch}
          className="btn-primary w-full mt-4"
          disabled={!orderId || loading}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>

      {/* Result */}
      {showResult && (
        <div className="bg-card border border-border rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>

          <p className="text-sm mb-2">
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>

          <p className="text-sm mb-2">
            <span className="font-semibold">Status:</span>{" "}
            Order Confirmed ✔
          </p>

          <p className="text-sm mb-2">
            <span className="font-semibold">Delivery Estimate:</span>{" "}
            <span className="text-green-700 font-semibold">
              Your order will arrive in 3–5 business days.
            </span>
          </p>

          <p className="text-sm text-muted-foreground mt-4">
            If you need help, contact us on WhatsApp or email.
          </p>
        </div>
      )}
    </div>
  );
}
