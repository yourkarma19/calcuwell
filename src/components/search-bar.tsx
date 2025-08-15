

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { calculators } from "@/lib/calculators";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { type Calculator } from "@/lib/types";
import { Button } from "./ui/button";

type SearchResult = Omit<Calculator, 'component'>;

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fuse.FuseResult<SearchResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const fuse = useMemo(() => new Fuse(calculators, {
    keys: ["name", "tags", "category"],
    threshold: 0.3,
    includeScore: true,
  }), []);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.search(query);
      setResults(searchResults.slice(0, 10)); // Limit to top 10 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, fuse]);

  const handleSelect = useCallback((slug: string) => {
    router.push(`/calculators/${slug}`);
    setQuery("");
    setIsOpen(false);
  }, [router]);
  
  useEffect(() => {
    if (!isClient) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        const input = document.querySelector("#search-input") as HTMLInputElement;
        input?.focus();
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isClient])


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full md:w-64">
          <Input
            id="search-input"
            placeholder="Search calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pr-10"
            aria-label="Search calculators"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        {results.length > 0 ? (
          <ul className="py-1">
            {results.map(({ item }) => (
              <li
                key={item.slug}
                onClick={() => handleSelect(item.slug)}
                className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-accent rounded-md"
              >
                <item.Icon className="w-4 h-4 text-muted-foreground" />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          query.length > 1 && <p className="p-4 text-sm text-center text-muted-foreground">No results found.</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
