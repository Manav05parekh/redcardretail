"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export function HeroSection() {
  const targetDate = new Date("2025-11-28T23:59:59"); // 🟢 Set SALE END DATE here

const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

useEffect(() => {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(timer);
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);


  return (
    <>
      <section className="bg-background pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Top Text */}
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Premium Jerseys
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight mb-6">
              RedCardRetail
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Timeless minimalism. Pure quality. Perfect fabric. 
            </p>
          </div>

          {/* Featured Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-24">

            {/* Black Jersey */}
           {/* JERSEY SET */}
<div className="flex flex-col">
  <Link href="/shop?category=set">
    <div className="bg-secondary rounded-sm overflow-hidden mb-6 sm:mb-8 aspect-square relative group cursor-pointer">
      <Image
        src="/img1.jpg"   // ⚠️ Replace with your real image
        alt="Jersey with Shorts"
        width={500}
        height={500}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        priority
      />
      <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase font-bold tracking-wider">
        Black Friday 40% Off
      </div>
    </div>
  </Link>

  <h3 className="text-3xl sm:text-4xl font-light mb-3">Jersey Set</h3>
  <p className="text-muted-foreground text-sm mb-6 font-light leading-relaxed">
    Premium breathable jersey with matching shorts. Perfect for training & casual play.
  </p>

  <div className="flex items-center gap-3 mb-6">
    <span className="text-2xl font-light">₹749</span>
    <span className="text-lg text-muted-foreground line-through">₹999</span>
  </div>

  <Link
    href="/shop?category=set"
    className="px-8 py-3 border border-foreground hover:bg-foreground hover:text-background 
    transition-colors text-sm uppercase font-medium tracking-wide w-full text-center"
  >
    Shop Jersey Set
  </Link>
</div>

{/* JERSEY COMBO (2 PCS) */}
<div className="flex flex-col">
  <Link href="/shop?category=combo">
    <div className="bg-secondary rounded-sm overflow-hidden mb-6 sm:mb-8 aspect-square relative group cursor-pointer">
      <Image
        src="/combo1.jpg"   // ⚠️ Replace with your real image
        alt="Jersey Combo of 2"
        width={500}
        height={500}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        priority
      />
      <div className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 text-xs uppercase font-bold tracking-wider">
        Black Friday 30% Off
      </div>
    </div>
  </Link>

  <h3 className="text-3xl sm:text-4xl font-light mb-3">Combo of 2</h3>
  <p className="text-muted-foreground text-sm mb-6 font-light leading-relaxed">
    Two premium jerseys at a special Black Friday price. Best value pack.
  </p>

  <div className="flex items-center gap-3 mb-6">
    <span className="text-2xl font-light">₹1349</span>
    <span className="text-lg text-muted-foreground line-through">₹1988</span>
  </div>

  <Link
    href="/shop?category=combo"
    className="px-8 py-3 border border-foreground hover:bg-foreground hover:text-background 
    transition-colors text-sm uppercase font-medium tracking-wide w-full text-center"
  >
    Shop Combo
  </Link>
</div>
          </div>


          {/* Black Friday Timer */}
          <div className="border-y border-border py-8 sm:py-12 mb-16 sm:mb-24">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Black Friday Sale Ends In
                </p>

                <div className="flex gap-4 sm:gap-6">
                  {/* Days */}
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-light">
                      {String(timeLeft.days).padStart(2, "0")}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      Days
                    </p>
                  </div>

                  <div className="text-3xl sm:text-4xl font-light text-muted-foreground">:</div>

                  {/* Hours */}
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-light">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      Hours
                    </p>
                  </div>

                  <div className="text-3xl sm:text-4xl font-light text-muted-foreground">:</div>

                  {/* Minutes */}
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-light">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      Mins
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/shop"
                className="px-12 py-4 bg-primary text-primary-foreground uppercase font-bold text-sm tracking-wider 
                hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Shop Sale
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
