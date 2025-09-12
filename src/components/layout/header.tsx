"use client";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchBar } from "@/components/search-bar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/calcpro-logo.png"
              alt="CalcPro Logo"
              width={32}
              height={32}
              className="h-8 w-auto logo-glow"
            />
            <span className="font-bold font-headline text-lg text-primary">
              CalcPro
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center px-4 md:px-8">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
