import { describe, it, expect } from 'vitest';
import { calculateAge, Age } from './date';
import dateTestCases from './date.test.json';

describe('calculateAge', () => {
    dateTestCases.cases.forEach(testCase => {
        it(testCase.description, () => {
            const startDate = new Date(testCase.inputs.startDate);
            const endDate = new Date(testCase.inputs.endDate);
            const expected = testCase.expected as Age;

            const result = calculateAge(endDate, startDate);
            
            expect(result).toEqual(expected);
        });
    });
});
