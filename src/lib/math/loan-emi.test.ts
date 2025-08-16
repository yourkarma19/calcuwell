
import { describe, it, expect } from 'vitest';
import { calculateEMI, calculateEMIWithExtraPayments } from './loan-emi';
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

describe('calculateEMIWithExtraPayments', () => {
    it('should calculate reduced tenure and interest saved correctly', () => {
        const { interestSaved, newTotalMonths } = calculateEMIWithExtraPayments(500000, 8.5, 5, 1000, 10000);
        expect(interestSaved).toBeCloseTo(41162.2, 1);
        expect(newTotalMonths).toBe(48);
    });

    it('should handle only extra monthly payment', () => {
        const { interestSaved, newTotalMonths } = calculateEMIWithExtraPayments(500000, 8.5, 5, 2000, 0);
        expect(interestSaved).toBeCloseTo(21147.9, 1);
        expect(newTotalMonths).toBe(54);
    });
    
    it('should handle only extra yearly payment', () => {
        const { interestSaved, newTotalMonths } = calculateEMIWithExtraPayments(500000, 8.5, 5, 0, 20000);
        expect(interestSaved).toBeCloseTo(34743.2, 1);
        expect(newTotalMonths).toBe(51);
    });
});
