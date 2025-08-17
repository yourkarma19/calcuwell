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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { type Calculator } from "@/lib/types";
import { loadFullCalculatorData } from "@/lib/calculators";

// Define the type for search results, omitting the component part for performance
type SearchResult = Omit<Calculator, "component">;

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<SearchResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const router = useRouter();
  const fuseRef = useRef<Fuse<SearchResult> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse.js with calculator data
  const initFuse = useCallback(async () => {
    if (fuseRef.current || isLoading) return;
    setIsLoading(true);

    try {
      const FuseModule = await import("fuse.js");
      let allCalculators = await loadFullCalculatorData();

      // Fallback demo data in case your dataset is empty
      if (!allCalculators || allCalculators.length === 0) {
        allCalculators = [
          {
            slug: "bmi-calculator",
            name: "BMI Calculator",
            iconName: "Activity",
            tags: ["health", "fitness", "body mass"],
            category: "Health",
          },
          {
            slug: "loan-calculator",
            name: "Loan Calculator",
            iconName: "Wallet",
            tags: ["finance", "emi", "interest"],
            category: "Finance",
          },
          {
            slug: "age-calculator",
            name: "Age Calculator",
            iconName: "Calendar",
            tags: ["birthday", "time", "years"],
            category: "Date & Time",
          },
        ] as SearchResult[];
      }

      // Advanced Fuse.js setup
      fuseRef.current = new FuseModule.default(allCalculators, {
        keys: [
          { name: "name", weight: 0.6 },
          { name: "tags", weight: 0.3 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 1,
      });
    } catch (error) {
      console.error("❌ Failed to load Fuse.js or calculator data", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Handle input
  const handleInputChange = (newQuery: string) => {
    setQuery(newQuery);
    setHighlightedIndex(0); // reset highlight
  };

  // Run search when query changes
  useEffect(() => {
    if (!fuseRef.current || query.length < 1) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      let found = fuseRef.current!.search(query);

      // Advanced: sort exact matches to top
      found = found.sort((a, b) => {
        const aExact = a.item.name.toLowerCase() === query.toLowerCase();
        const bExact = b.item.name.toLowerCase() === query.toLowerCase();
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return a.score! - b.score!;
      });

      setResults(found.slice(0, 10));
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Handle selection
  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/calculators/${slug}`);
      setQuery("");
      setIsOpen(false);
    },
    [router]
  );

  // Keyboard shortcut ⌘K / Ctrl+K
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

  // Autofocus input when opening
  useEffect(() => {
    if (isOpen) {
      if (!fuseRef.current && !isLoading) {
        initFuse();
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isLoading, initFuse]);

  // Handle arrow keys + Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = results[highlightedIndex];
      if (selected) handleSelect(selected.item.slug);
    }
  };

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

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder="Search calculators..."
            value={query}
            onValueChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <CommandList>
            {isLoading && <CommandEmpty>Loading search...</CommandEmpty>}
            {!isLoading && results.length === 0 && query.length > 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup>
              {results.map(({ item }, idx) => {
                const LucideIcon =
                  Icons[item.iconName as keyof typeof Icons] ||
                  Icons.Calculator;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <CommandItem
                    key={item.slug}
                    value={item.name}
                    onSelect={() => handleSelect(item.slug)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`flex items-center gap-3 cursor-pointer ${
                      isHighlighted ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    <LucideIcon className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
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