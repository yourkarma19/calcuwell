"use server";

import Fuse from "fuse.js";
import { loadFullCalculatorData } from "@/lib/server/calculator-data";
import type { Calculator } from "@/lib/types";

type SearchResult = Omit<Calculator, "component">;

let fuse: Fuse<SearchResult> | null = null;
let calculators: SearchResult[] = [];

async function initializeSearch() {
  if (fuse && calculators.length > 0) return;

  const data = await loadFullCalculatorData();
  calculators = data.map(({ ...rest }) => rest);
  fuse = new Fuse(calculators, {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "tags", weight: 0.3 },
      { name: "description", weight: 0.2 },
    ],
    threshold: 0.4,
    includeScore: true,
  });
}

export async function searchCalculators(
  query: string,
): Promise<SearchResult[]> {
  await initializeSearch();

  if (!fuse) {
    console.error("Fuse.js not initialized");
    return [];
  }

  if (!query.trim()) {
    // Return a subset of calculators if the query is empty, e.g., trending or popular ones.
    // For now, we return the first 10.
    return calculators.slice(0, 10);
  }

  const results = fuse.search(query);
  return results.map((result) => result.item);
}
