"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type Fuse from "fuse.js";
import type { FuseResult } from "fuse.js";
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

  // Load Fuse.js + calculators
  const initFuse = useCallback(async () => {
    if (fuseRef.current || isLoading) return;

    setIsLoading(true);
    try {
      const FuseModule = await import("fuse.js");
      let allCalculators = await loadFullCalculatorData();

      if (!allCalculators || allCalculators.length === 0) {
        allCalculators = [
          { slug: "test-calc", name: "Test Calculator", iconName: "Calculator", tags: ["math"], category: "Math" },
        ] as SearchResult[];
      }

      fuseRef.current = new FuseModule.default(allCalculators, {
        keys: ["name", "tags", "category"],
        threshold: 0.3,
        includeScore: true,
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
      const found = fuseRef.current!.search(query).slice(0, 10);
      setResults(found);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Handle item selection
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

  // Handle arrow navigation + Enter
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
