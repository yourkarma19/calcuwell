
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import Fuse from "fuse.js";
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
  const [calculators, setCalculators] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  const fuse = React.useMemo(() => {
    if (calculators.length > 0) {
      return new Fuse(calculators, {
        keys: ["name", "category", "tags"],
        threshold: 0.3,
      });
    }
  }, [calculators]);

  const searchResults = React.useMemo(() => {
    if (!search || !fuse) {
      return calculators;
    }
    return fuse.search(search).map((result) => result.item);
  }, [search, fuse, calculators]);


  React.useEffect(() => {
    if (isOpen && calculators.length === 0) {
      setIsLoading(true);
      loadFullCalculatorData()
        .then(setCalculators)
        .catch((err) => console.error("Failed to load calculators:", err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, calculators.length]);

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

  const runCommand = React.useCallback(
    (slug: string) => {
      router.push(`/calculators/${slug}`);
      setIsOpen(false);
      setSearch("");
    },
    [router]
  );

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
            value={search}
            onValueChange={setSearch}
            placeholder="Type to search..."
            disabled={isLoading}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading search index...</CommandEmpty>
            ) : (
              <CommandEmpty>No results found for "{search}".</CommandEmpty>
            )}
            <CommandGroup>
              {searchResults.map((calc) => {
                const LucideIcon =
                  Icons[calc.iconName as keyof typeof Icons] ||
                  Icons.Calculator;
                return (
                  <CommandItem
                    key={calc.slug}
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
