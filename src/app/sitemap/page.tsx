import { Metadata } from "next";
import { List } from "lucide-react";
import { calculators, categories, getCalculatorsByCategory } from "@/lib/calculators";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sitemap | CalcuWell",
    description: "A complete list of all calculators available on CalcuWell, your ultimate calculator hub.",
};

export default function SitemapPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                 <List className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Sitemap
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Browse all available calculators grouped by category.
                </p>
            </div>

            <div className="space-y-12">
                {categories.map((category) => (
                    <section key={category.slug}>
                        <h2 className="text-3xl font-bold font-headline text-primary mb-6 flex items-center gap-3">
                           <category.Icon className="w-8 h-8"/> 
                           {category.name} Calculators
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {getCalculatorsByCategory(category.slug)
                                .map((calc) => (
                                    <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="text-sm hover:text-primary hover:underline">
                                        {calc.name}
                                    </Link>
                                ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
