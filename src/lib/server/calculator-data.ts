
import 'server-only';
import type { Calculator } from '@/lib/types';
import { calculatorsData } from '@/lib/calculator-data';

let allCalculators: Omit<Calculator, 'component'>[] | null = null;

// This function now only runs on the server.
export const loadFullCalculatorData = async () => {
  if (allCalculators === null) {
    allCalculators = calculatorsData;
  }
  return allCalculators;
}
