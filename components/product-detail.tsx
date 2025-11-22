"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/app/data/products";

export default function ProductDetail({ productId }: { productId: string }) {
  const router = useRouter();
  const { addToCart } = useCart();

  // fetch product
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  // ******** STATE ********
  const sizes = ["M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [showAddedAlert, setShowAddedAlert] = useState(false);

  // ******** ADD TO CART ********
  const handleAddToCart = () => {
    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      category: product.category,
      size: selectedSize,
      quantity,
      price: product.price,
      image: product.images[0],
    });

    setShowAddedAlert(true);
    setTimeout(() => setShowAddedAlert(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="w-full px-4 py-8 max-w-7xl mx-auto">
      {/* ADD ALERT */}
      {showAddedAlert && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-md shadow z-50 flex items-center gap-2">
          <ShoppingBag size={16} />
          Added to cart!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGES SECTION */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={product.images[currentImage]}
              alt={product.name}
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`rounded-lg overflow-hidden h-20 cursor-pointer border ${
                  currentImage === i ? "border-black" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt="thumbnail"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-3xl font-light mb-4">{product.name}</h1>

          {/* PRICE */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl font-semibold">₹{product.price}</span>
            <span className="line-through text-gray-500">
              ₹{product.originalPrice}
            </span>
            <span className="bg-black text-white px-2 py-1 text-xs rounded">
              {product.discount}% OFF
            </span>
          </div>

          {/* POLICIES */}
          <p className="text-red-600 font-semibold mb-2">
            ⚠️ No Return / No Replacement Policy
          </p>

          <p className="text-sm text-green-700 mb-2">
            🚚 Estimated Delivery: <span className="font-medium">3–5 days</span>
          </p>

          <p className="text-sm text-green-700 font-semibold mb-6">
            🛡 Guaranteed Good Quality
          </p>

          {/* SIZE SELECT */}
          <div className="mb-8">
            <label className="block text-xs font-semibold uppercase mb-2">
              Size: {selectedSize}
            </label>

            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 border rounded text-sm ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-6">
            <label className="text-xs font-semibold uppercase mb-2 block">
              Quantity
            </label>

            <div className="flex items-center border w-fit rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2"
              >
                −
              </button>

              <span className="px-4">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-3 rounded-md flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-black py-3 rounded-md text-center font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
