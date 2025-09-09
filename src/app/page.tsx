"use client";

import HomeCalculator from "@/components/calculator/home-calculator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <section className="text-center py-12 md:py-20 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
          CalcPro
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Your one-stop destination for fast, accurate, and easy-to-use online
          calculators.
        </p>
      </section>

      <section id="main-calculator" className="w-full max-w-md">
        <HomeCalculator />
      </section>
    </div>
  );
}
