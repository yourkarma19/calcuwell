import Link from "next/link";
import { Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-7xl mx-auto">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              CalcPro
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
