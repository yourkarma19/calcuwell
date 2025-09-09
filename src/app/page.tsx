"use client";

import HomeCalculator from "@/components/calculator/home-calculator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categories } from "@/lib/calculators";
import { IconWrapper } from "@/components/IconWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
          CalcPro
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your one-stop destination for fast, accurate, and easy-to-use online
          calculators.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <HomeCalculator />
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why CalcPro?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <IconWrapper iconName="FastForward" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Fast & Accurate</h4>
                  <p>Our calculators are built for speed and tested for accuracy to give you reliable results instantly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <IconWrapper iconName="ToggleLeft" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Easy to Use</h4>
                  <p>With clean, intuitive interfaces, you can find the numbers you need without the fuss.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <IconWrapper iconName="Smartphone" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Mobile Friendly</h4>
                  <p>Use our tools on any device, anywhere. Our responsive design ensures a great experience.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-headline text-primary">Calculator Categories</h2>
          <p className="mt-2 text-muted-foreground">Explore our wide range of tools for every need.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link href={`/categories/${category.slug}`} key={category.slug}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline group-hover:text-primary transition-colors">
                    <IconWrapper iconName={category.iconName} className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors" />
                    {category.name}
                  </CardTitle>
                  <CardDescription className="pt-2">{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
