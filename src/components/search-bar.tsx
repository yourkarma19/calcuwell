
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type Fuse from "fuse.js";
import { calculators } from "@/lib/calculators";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { type Calculator } from "@/lib/types";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

type SearchResult = Omit<Calculator, 'component'>;

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fuse.FuseResult<SearchResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const fuseRef = useRef<Fuse<SearchResult> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initFuse = useCallback(async () => {
    if (fuseRef.current || isLoading) return;
    
    setIsLoading(true);
    const FuseModule = await import('fuse.js');
    fuseRef.current = new FuseModule.default(calculators, {
      keys: ["name", "tags", "category"],
      threshold: 0.3,
      includeScore: true,
    });
    setIsLoading(false);
  }, [isLoading]);

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
  
  useEffect(() => {
      if (isOpen) {
          initFuse();
      }
  }, [isOpen, initFuse]);

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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full md:w-64">
           <Button
            variant="outline"
            className="w-full justify-between text-muted-foreground"
            onClick={() => setIsOpen(true)}
           >
            <span>Search calculators...</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
           </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
            <CommandInput 
                placeholder="Search calculators..."
                value={query}
                onValueChange={handleInputChange}
            />
            <CommandList>
                {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
                {!isLoading && results.length === 0 && query.length > 1 && <CommandEmpty>No results found.</CommandEmpty>}
                <CommandGroup>
                    {results.map(({ item }) => (
                      <CommandItem
                        key={item.slug}
                        value={item.name}
                        onSelect={() => handleSelect(item.slug)}
                        className="flex items-center gap-3"
                      >
                        <item.Icon className="w-4 h-4 text-muted-foreground" />
                        <span>{item.name}</span>
                      </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
