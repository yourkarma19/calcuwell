
'use server';

import { loadFullCalculatorData } from '@/lib/server/calculator-data';
import Fuse from 'fuse.js';
import type { Calculator } from '@/lib/types';

type SearchResult = Omit<Calculator, 'component'>;

let fuse: Fuse<SearchResult> | null = null;
let calculators: SearchResult[] = [];

async function initializeSearch() {
  if (fuse) return;
  
  calculators = await loadFullCalculatorData();
  fuse = new Fuse(calculators, {
    keys: ['name', 'category', 'tags'],
    threshold: 0.3,
  });
}

export async function searchCalculators(query: string): Promise<SearchResult[]> {
  await initializeSearch();
  
  if (!fuse) {
      return [];
  }

  if (!query) {
    // Return a subset of calculators if the query is empty, e.g., trending or popular ones.
    // For now, we return the first 10.
    return calculators.slice(0, 10);
  }

  const results = fuse.search(query);
  return results.map(result => result.item);
}
