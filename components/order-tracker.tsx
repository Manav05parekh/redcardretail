"use client";

import { useState } from "react";

export function OrderTracker() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch("/api/get-order", {
        method: "POST",
        body: JSON.stringify({ orderId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!data.success) {
        setError("No order found. Check your Order ID.");
      } else {
        setOrder(data);
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deliveryDate = "26–29 November";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light mb-2">Track Your Order</h1>
      <p className="text-muted-foreground mb-8">
        Enter your Order ID to check order details.
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
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-600 p-4 rounded">
          {error}
        </div>
      )}

      {order && (
        <div className="bg-card border border-border rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>

          <p className="text-sm mb-2">
            <span className="font-semibold">Order ID:</span> {order.orderId}
          </p>
          <p className="text-sm mb-2">
            <span className="font-semibold">Items:</span> {order.items}
          </p>
          <p className="text-sm mb-2">
            <span className="font-semibold">Amount:</span> ₹{order.total}
          </p>
          <p className="text-sm mb-2">
            <span className="font-semibold">Delivery Estimate:</span>{" "}
            {deliveryDate}
          </p>
        </div>
      )}
    </div>
  );
}
