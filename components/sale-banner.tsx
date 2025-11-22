"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function SaleBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Black Friday sale ends: Nov 29, 2025 at 11:59 PM
    const saleEndDate = new Date("2025-11-29T23:59:59").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = saleEndDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white py-3 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="text-sm font-bold">
            BLACK FRIDAY SALE: UP TO 50% OFF!
            <span className="ml-4 text-xs font-semibold">
              Ends in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-red-700 rounded transition-colors flex-shrink-0"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
