
"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { IconWrapper } from "@/components/IconWrapper";
import BasicCalculator from "@/components/calculator/basic-calculator";
import ScientificCalculator from "@/components/calculator/scientific-calculator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { categories } from "@/lib/calculators";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"basic" | "scientific">("basic");

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 md:py-16">
        <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary mb-4">
          CalcPro
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Your one-stop destination for fast, accurate, and easy-to-use online
          calculators.
        </p>
      </section>

      <section className="pb-12 md:pb-20 flex justify-center">
        <Card className="w-full max-w-lg mx-auto p-4 shadow-lg rounded-2xl bg-card">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "basic" | "scientific")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="scientific">Scientific</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="mt-4">
              <BasicCalculator />
            </TabsContent>
            <TabsContent value="scientific" className="mt-4">
              <ScientificCalculator />
            </TabsContent>
          </Tabs>
        </Card>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Calculator Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.slug}`}
              key={category.slug}
              className="block"
            >
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <IconWrapper
                      iconName={category.iconName}
                      className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors"
                    />
                    <div>
                      <CardTitle as="h3" className="font-semibold">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Why CalcPro?</h2>
        <p className="max-w-3xl mx-auto text-muted-foreground">
          CalcPro offers a comprehensive suite of free online calculators
          designed to be fast, accurate, and easy to use. From solving complex
          mathematical problems to managing your personal finances and health,
          our tools provide reliable results to help you make informed decisions
          instantly.
        </p>
      </section>
    </div>
  );
}
