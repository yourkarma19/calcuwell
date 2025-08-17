"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse, { type FuseResult } from "fuse.js";
import * as Icons from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type Calculator } from "@/lib/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { loadFullCalculatorData } from "@/lib/calculators";

// Define the type for search results, omitting the component part for performance
type SearchResult = Omit<Calculator, "component">;

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<SearchResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const fuseRef = useRef<Fuse<SearchResult> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazily load calculator data and initialize the Fuse.js search index
  const initializeSearch = useCallback(async () => {
    if (fuseRef.current || isLoading) return;

    setIsLoading(true);
    try {
      // Dynamically import Fuse.js for better performance
      const FuseModule = await import("fuse.js");
      const allCalculators = await loadFullCalculatorData();

      if (!allCalculators || allCalculators.length === 0) {
        console.error("❌ No calculator data was loaded.");
        return;
      }
      
      // Create the search index
      fuseRef.current = new FuseModule.default(allCalculators, {
        keys: ["name", "tags", "category"],
        threshold: 0.3,
        includeScore: true,
      });
    } catch (error) {
      console.error("❌ Failed to initialize search:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Perform a debounced search when the query changes
  useEffect(() => {
    if (!fuseRef.current || !query) {
      setResults([]);
      return;
    }
    // Debounce to prevent searching on every keystroke
    const timer = setTimeout(() => {
      const searchResults = fuseRef.current!.search(query).slice(0, 10);
      setResults(searchResults);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Navigate to the selected calculator page
  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/calculators/${slug}`);
      setQuery("");
      setIsOpen(false);
    },
    [router]
  );

  // Add keyboard shortcut (⌘K or Ctrl+K) to open the search bar
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

  // Initialize search and focus the input when the popover opens
  useEffect(() => {
    if (isOpen) {
      if (!fuseRef.current) {
        initializeSearch();
      }
      // Add a small delay to ensure the input is rendered before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initializeSearch]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-muted-foreground md:w-64"
        >
          <span>Search calculators...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        {/* The Command component handles its own filtering, keyboard nav, etc. */}
        {/* We set shouldFilter={false} because Fuse.js is handling the search logic */}
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder="Search for a calculator..."
            value={query}
            onValueChange={setQuery}
            disabled={isLoading}
          />
          <CommandList>
            {isLoading && <CommandEmpty>Loading search...</CommandEmpty>}
            {!isLoading && results.length === 0 && query.length > 1 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup>
              {results.map(({ item }) => {
                const LucideIcon =
                  Icons[item.iconName as keyof typeof Icons] || Icons.Calculator;
                return (
                  <CommandItem
                    key={item.slug}
                    value={item.name}
                    onSelect={() => handleSelect(item.slug)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <LucideIcon className="w-4 h-4 text-muted-foreground" />
                    <span>{item.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
