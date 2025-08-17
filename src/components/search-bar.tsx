"use client";

import * as React from "react";
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<FuseResult<SearchResult>[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const fuseRef = React.useRef<Fuse<SearchResult> | null>(null);

  // Load calculator data and initialize Fuse.js
  const initializeSearch = React.useCallback(async () => {
    if (fuseRef.current) return;
    setIsLoading(true);
    try {
      const allCalculators = await loadFullCalculatorData();
      const FuseModule = await import("fuse.js");
      fuseRef.current = new FuseModule.default(allCalculators, {
        keys: ["name", "tags", "category"],
        threshold: 0.3,
        includeScore: true,
      });
    } catch (error) {
      console.error("Failed to initialize search:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Perform search when query changes
  React.useEffect(() => {
    if (!query || !fuseRef.current) {
      setResults([]);
      return;
    }
    const searchResults = fuseRef.current.search(query).slice(0, 10);
    setResults(searchResults);
  }, [query]);

  // Keyboard shortcut to open search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  
  // Initialize search when popover opens
  React.useEffect(() => {
      if(isOpen) {
          initializeSearch();
      }
  }, [isOpen, initializeSearch]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
    setIsOpen(open);
  };

  const runCommand = React.useCallback(
    (slug: string) => {
      router.push(`/calculators/${slug}`);
      onOpenChange(false);
    },
    [router]
  );

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
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
            value={query}
            onValueChange={setQuery}
            placeholder="Search for a calculator..."
            disabled={isLoading}
          />
          <CommandList>
            {isLoading ? (
                <CommandEmpty>Loading search index...</CommandEmpty>
            ) : (
                query.length > 0 && results.length === 0 && <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup>
              {results.map(({ item: calc }) => {
                const LucideIcon =
                  Icons[calc.iconName as keyof typeof Icons] ||
                  Icons.Calculator;
                return (
                  <CommandItem
                    key={calc.slug}
                    value={calc.name}
                    onSelect={() => runCommand(calc.slug)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <LucideIcon className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span>{calc.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {calc.category}
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
