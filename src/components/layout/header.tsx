import Link from "next/link";
import { Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import { categories } from "@/lib/calculators";

export default function Header() {
  // Select top categories to display in the header
  const headerCategories = categories.filter(c => ['Finance', 'Health', 'Math'].includes(c.name));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto">
        <div className="mr-6 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-transparent bg-clip-text">
              CalcPro
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {headerCategories.map(category => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="transition-colors hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
