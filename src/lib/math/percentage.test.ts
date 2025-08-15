import { describe, it, expect } from 'vitest';
import { percentageOf, isWhatPercentageOf, percentageChange } from './percentage';

describe('percentageOf', () => {
    it('calculates the correct percentage of a number', () => {
        expect(percentageOf(50, 100)).toBe(50);
        expect(percentageOf(25, 200)).toBe(50);
        expect(percentageOf(10, 50)).toBe(5);
    });

    it('handles zero correctly', () => {
        expect(percentageOf(0, 100)).toBe(0);
        expect(percentageOf(10, 0)).toBe(0);
    });
});

describe('isWhatPercentageOf', () => {
    it('calculates what percentage a is of b', () => {
        expect(isWhatPercentageOf(50, 100)).toBe(50);
        expect(isWhatPercentageOf(10, 50)).toBe(20);
    });

    it('throws an error when dividing by zero', () => {
        expect(() => isWhatPercentageOf(10, 0)).toThrow("Cannot divide by zero.");
    });
});

describe('percentageChange', () => {
    it('calculates percentage increase', () => {
        expect(percentageChange(100, 150)).toBe(50);
    });

    it('calculates percentage decrease', () => {
        expect(percentageChange(100, 75)).toBe(-25);
    });

    it('throws an error if the initial value is zero', () => {
        expect(() => percentageChange(0, 100)).toThrow("Cannot calculate percentage change from zero.");
    });
});
