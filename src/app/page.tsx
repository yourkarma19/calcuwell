
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IconWrapper } from "@/components/IconWrapper";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/lib/calculators";

const HomeCalculator = dynamic(
  () => import("@/components/calculator/home-calculator"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full max-w-lg h-[600px] mx-auto" />,
  },
);

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full text-center py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-primary mb-4">
            CalcPro
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your one-stop destination for fast, accurate, and easy-to-use online
            calculators.
          </p>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="w-full max-w-5xl px-4 py-16 md:py-24">
         <Card className="shadow-xl">
            <HomeCalculator />
        </Card>
      </section>

      {/* Categories Section */}
      <section className="w-full bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">
            Calculator Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.slug}
                className="block"
              >
                <Card className="h-full hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1.5 transform">
                  <CardHeader className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <IconWrapper
                        iconName={category.iconName}
                        className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors"
                      />
                      <div>
                        <CardTitle as="h3" className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
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
        </div>
      </section>
      
      {/* Why CalcPro Section */}
      <section className="w-full text-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4">Why CalcPro?</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            CalcPro offers a comprehensive suite of free online calculators
            designed to be fast, accurate, and easy to use. From solving complex
            mathematical problems to managing your personal finances and health,
            our tools provide reliable results to help you make informed decisions
            instantly.
          </p>
        </div>
      </section>
    </div>
  );
}
