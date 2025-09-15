"use client";

import Fuse from "fuse.js";
import React, { createContext, useContext, useState, useMemo } from "react";
import type { Calculator } from "@/lib/types";
import { calculatorsData } from "@/lib/calculator-data";

type SearchResult = Omit<Calculator, "component">;

interface SearchContextType {
  results: SearchResult[];
  isLoading: boolean;
  searchCalculators: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(calculatorsData, {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "tags", weight: 0.3 },
        { name: "description", weight: 0.2 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }, []);

  const searchCalculators = (query: string) => {
    setIsLoading(true);
    if (!query.trim()) {
      setResults(calculatorsData.slice(0, 10));
      setIsLoading(false);
      return;
    }
    const searchResults = fuse.search(query).map((result) => result.item);
    setResults(searchResults);
    setIsLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{ results, isLoading, searchCalculators }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
