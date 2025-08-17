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

type SearchResult = Omit<Calculator, "component">;

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<SearchResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const fuseRef = useRef<Fuse<SearchResult> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initFuse = useCallback(async () => {
    if (fuseRef.current || isLoading) return;
    setIsLoading(true);
    try {
      const FuseModule = await import("fuse.js");
      const allCalculators = await loadFullCalculatorData();
      fuseRef.current = new FuseModule.default(allCalculators, {
        keys: [
          { name: "name", weight: 0.6 },
          { name: "tags", weight: 0.3 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true,
      });
    } catch (error) {
      console.error("❌ Failed to load Fuse.js or calculator data", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!fuseRef.current || !query) {
      setResults([]);
      return;
    }
    const searchResults = fuseRef.current.search(query);
    setResults(searchResults.slice(0, 10));
  }, [query]);

  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/calculators/${slug}`);
      setQuery("");
      setIsOpen(false);
    },
    [router]
  );

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
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, initFuse]);
  
  const onCommandSelect = (value: string) => {
    const selected = results.find(r => r.item.name.toLowerCase() === value.toLowerCase());
    if(selected) {
      handleSelect(selected.item.slug);
    }
  }

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
        <Command onValueChange={setQuery} onSelect={onCommandSelect} shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder="Search calculators..."
            disabled={isLoading}
          />
          <CommandList>
            {isLoading && <CommandEmpty>Loading search...</CommandEmpty>}
            {!isLoading && results.length === 0 && query.length > 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup>
              {results.map(({ item }) => {
                const LucideIcon = Icons[item.iconName as keyof typeof Icons] || Icons.Calculator;
                return (
                  <CommandItem
                    key={item.slug}
                    value={item.name}
                    className="flex items-center gap-3 cursor-pointer"
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