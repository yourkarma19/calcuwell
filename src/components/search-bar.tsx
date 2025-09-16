"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearch } from "@/components/providers/search-provider";
import { Loader2, Search } from "lucide-react";
import IconLoader from "@/components/calculator/IconLoader";

export function SearchBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { results, isLoading, searchCalculators } = useSearch();

  React.useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  // Debounce search input
  React.useEffect(() => {
    if (isOpen) {
      const debounceTimeout = setTimeout(() => {
        searchCalculators(search);
      }, 100); // Shorter debounce
      return () => clearTimeout(debounceTimeout);
    }
  }, [search, isOpen, searchCalculators]);

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

  const runCommand = React.useCallback(
    (slug: string) => {
      router.push(`/calculators/${slug}`);
      setIsOpen(false);
      setSearch("");
    },
    [router],
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-muted-foreground"
        >
          <span>Search calculators...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-card border"
        align="start"
        onOpenAutoFocus={() => inputRef.current?.focus()}
      >
        <Command shouldFilter={false}>
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              ref={inputRef}
              value={search}
              onValueChange={setSearch}
              placeholder="Type to search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin" />
            )}
          </div>
          <CommandList>
            {results.length === 0 && !isLoading && (
              <CommandEmpty>
                No results found for &quot;{search}&quot;.
              </CommandEmpty>
            )}
            <CommandGroup>
              {results.map((calc) => (
                <CommandItem
                  key={calc.slug}
                  onSelect={() => runCommand(calc.slug)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <IconLoader
                    iconName={calc.iconName}
                    className="w-4 h-4 text-muted-foreground"
                  />
                  <div className="flex flex-col">
                    <span>{calc.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {calc.category}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
