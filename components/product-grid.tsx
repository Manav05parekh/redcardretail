"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/app/data/products";

export function ProductGrid({ category }: { category: string }) {
  const filteredProducts =
    category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  return (
    <div className="mt-6">
      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filteredProducts.length} products
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl">
              <Image
                src={product.images[0]} // <-- MAIN IMAGE
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-full group-hover:scale-105 transition-all duration-300"
              />

              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-medium text-sm line-clamp-2">
                {product.name}
              </h3>

              <p className="text-xs text-muted-foreground mt-1">
                ★ {product.rating} ({product.reviews})
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-semibold text-red-600">
                  ₹{product.price}
                </span>
                <span className="line-through text-xs text-muted-foreground">
                  ₹{product.originalPrice}
                </span>
              </div>

              {/* Check Jersey */}
              <button className="mt-3 w-full py-2 bg-black text-white text-xs rounded hover:bg-gray-900">
                Check Jersey
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
