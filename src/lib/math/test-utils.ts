import { it, expect } from 'vitest';

interface TestCase {
    id: string;
    description: string;
    inputs: any;
    expected: any;
    precision?: number;
}

/**
 * Creates a test runner function for a given calculation function.
 * This factory consumes an array of test cases and generates a Vitest `it` block for each one.
 * It handles precision checks for floating-point numbers.
 *
 * @param calcFunction The calculator function to be tested.
 * @returns A function that takes an array of test cases and runs them.
 */
export function createTestRunner<T extends TestCase>(calcFunction: (testCase: T) => any) {
    return (testCases: T[]) => {
        testCases.forEach(testCase => {
            it(`[${testCase.id}] ${testCase.description}`, () => {
                const result = calcFunction(testCase);

                if (typeof testCase.expected === 'object' && testCase.expected !== null) {
                    // Handle object results (like for EMI calculator)
                    for (const key in testCase.expected) {
                        const expectedValue = testCase.expected[key];
                        const resultValue = result[key];
                        if (typeof expectedValue === 'number') {
                             expect(resultValue).toBeCloseTo(expectedValue, testCase.precision ?? 2);
                        } else {
                            expect(resultValue).toEqual(expectedValue);
                        }
                    }
                } else if (typeof testCase.expected === 'number') {
                    // Handle primitive number results
                    expect(result).toBeCloseTo(testCase.expected, testCase.precision ?? 2);
                } else {
                    // Handle other primitives
                    expect(result).toEqual(testCase.expected);
                }
            });
        });
    };
}
