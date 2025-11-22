"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";

function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromURL = searchParams.get("category");

  const [selected, setSelected] = useState<"all" | "set" | "combo">("all");

  useEffect(() => {
    if (categoryFromURL === "set") {
      setSelected("set");
    } else if (categoryFromURL === "combo") {
      setSelected("combo");
    } else {
      setSelected("all");
    }
  }, [categoryFromURL]);

  const updateCategory = (value: "all" | "set" | "combo") => {
    setSelected(value);

    if (value === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${value}`);
    }
  };

  return (
    <main>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-light mb-6">Shop</h1>

        {/* Category Buttons */}
        <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => updateCategory("set")}
            className={`px-5 py-2 rounded-lg text-sm border transition ${
              selected === "set"
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            Jersey Set
          </button>

          <button
            onClick={() => updateCategory("combo")}
            className={`px-5 py-2 rounded-lg text-sm border transition ${
              selected === "combo"
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            Combo of 2
          </button>

          <button
            onClick={() => updateCategory("all")}
            className={`px-5 py-2 rounded-lg text-sm border transition ${
              selected === "all"
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            All
          </button>
        </div>

        <ProductGrid category={selected} />
      </section>

      <Footer />
    </main>
  );
}

export default function ShopPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPage />
    </Suspense>
  );
}
