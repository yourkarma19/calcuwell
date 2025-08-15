import { describe, it, expect } from 'vitest';
import { calculateEMI } from './loan-emi';
import testVectors from './loan-emi.test.json';
import { createTestRunner } from './test-utils';

// This is a type guard to ensure the inputs match what the function expects
type EMITestCase = {
    inputs: { principal: number; annualRate: number; tenureInYears: number; };
    expected: { emi: number; totalInterest: number; totalPayable: number; };
    precision?: number;
    description: string;
};

// Create a test runner for our EMI calculation function
const runTest = createTestRunner<EMITestCase>((testCase) => {
    return calculateEMI(testCase.inputs.principal, testCase.inputs.annualRate, testCase.inputs.tenureInYears);
});

describe('calculateEMI', () => {
    runTest(testVectors.cases);

    it('should throw an error for negative interest rates', () => {
        expect(() => calculateEMI(10000, -5, 5)).toThrow('Interest rate cannot be negative.');
    });
});
