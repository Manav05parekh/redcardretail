"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { SaleBanner } from "./sale-banner"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <SaleBanner />
      <nav className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-lg font-bold tracking-tight">
              RedCardRetail
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/shop" className="nav-link flex items-center gap-2">
                Shop
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">SALE</span>
              </Link>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
              <Link href="/order-status" className="nav-link font-semibold border-b-2 border-primary pb-1">
                Check Order Status
              </Link>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/checkout" className="p-2 hover:opacity-60 transition-opacity relative">
                <ShoppingBag size={20}  />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button and Cart Icon */}
            <div className="md:hidden flex items-center gap-2">
              <Link href="/checkout" className="p-2 hover:opacity-60 transition-opacity relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              <Link href="/" className="block py-2.5 px-0 text-sm font-medium hover:opacity-60">
                Home
              </Link>
              <Link
                href="/shop"
                className="block py-2.5 px-0 text-sm font-medium hover:opacity-60 flex items-center gap-2"
              >
                Shop <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">SALE</span>
              </Link>
              <Link href="/about" className="block py-2.5 px-0 text-sm font-medium hover:opacity-60">
                About
              </Link>
              <Link href="/contact" className="block py-2.5 px-0 text-sm font-medium hover:opacity-60">
                Contact
              </Link>
              <Link
                href="/order-status"
                className="block py-2.5 px-0 text-sm font-bold border-b-2 border-primary pb-1 hover:opacity-60"
              >
                Check Order Status
              </Link>
              <Link href="/checkout" className="block py-2.5 px-0 text-sm font-medium mt-4 flex items-center gap-2">
                <ShoppingBag size={16} />
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
