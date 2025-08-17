
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type Fuse from "fuse.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type Calculator } from "@/lib/types";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
 import { Button } from "@/components/ui/button";
 import { icons } from "lucide-react";
 import { loadFullCalculatorData } from "@/lib/calculators";

type SearchResult = Omit<Calculator, 'component'>;

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fuse.FuseResult<SearchResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const fuseRef = useRef<Fuse<SearchResult> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const initFuse = useCallback(async () => {
    if (fuseRef.current || isLoading) return;
    
    setIsLoading(true);
    try {
      const FuseModule = await import('fuse.js');
      const allCalculators = await loadFullCalculatorData();
      fuseRef.current = new FuseModule.default(allCalculators, {
        keys: ["name", "tags", "category"],
        threshold: 0.3,
        includeScore: true,
      });
      // Re-run search with the current query now that Fuse is initialized
      if (query.length > 1) {
          const searchResults = fuseRef.current.search(query);
          setResults(searchResults.slice(0, 10));
      }
    } catch (error) {
        console.error("Failed to load Fuse.js or calculator data", error);
    } finally {
        setIsLoading(false);
    }
  }, [isLoading, query]);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleInputChange = (newQuery: string) => {
    setQuery(newQuery);

    if (newQuery.length > 1 && fuseRef.current) {
        const searchResults = fuseRef.current.search(newQuery);
        setResults(searchResults.slice(0, 10));
    } else {
        setResults([]);
    }
  };

  const handleSelect = useCallback((slug: string) => {
    router.push(`/calculators/${slug}`);
    setQuery("");
    setIsOpen(false);
  }, [router]);
  
  useEffect(() => {
    if (isOpen) {
      if (!fuseRef.current) {
        initFuse();
      }
      // Focus the input when the popover opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initFuse]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-muted-foreground md:w-64"
         >
          <span>Search calculators...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
         </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
            <CommandInput 
                ref={inputRef}
                placeholder="Search calculators..."
                value={query}
                onValueChange={handleInputChange}
            />
            <CommandList>
                {isLoading && <CommandEmpty>Loading search...</CommandEmpty>}
                {!isLoading && results.length === 0 && query.length > 1 && <CommandEmpty>No results found.</CommandEmpty>}
                <CommandGroup>
                    {results.map(({ item }) => {
                      const LucideIcon = icons[item.iconName as keyof typeof icons] || icons.Calculator;
                      return (
                      <CommandItem
                        key={item.slug}
                        value={item.name}
                        onSelect={() => handleSelect(item.slug)}
                        className="flex items-center gap-3"
                      >
                        <LucideIcon className="w-4 h-4 text-muted-foreground" />
                        <span>{item.name}</span>
                      </CommandItem>
                    )})}
                </CommandGroup>
            </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
