/**
 * Calculates `p%` of a number `n`.
 * @param p The percentage to find.
 * @param n The number to find the percentage of.
 * @returns The result of the percentage calculation.
 */
export function percentageOf(p: number, n: number): number {
    return (p / 100) * n;
}

/**
 * Calculates what percentage `a` is of `b`.
 * @param a The part.
 * @param b The whole.
 * @returns The percentage, or throws an error if `b` is zero.
 */
export function isWhatPercentageOf(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return (a / b) * 100;
}

/**
 * Calculates the percentage change from an initial value to a final value.
 * @param initial The starting value.
 * @param final The ending value.
 * @returns The percentage change, or throws an error if `initial` is zero.
 */
export function percentageChange(initial: number, final: number): number {
    if (initial === 0) {
        throw new Error("Cannot calculate percentage change from zero.");
    }
    return ((final - initial) / initial) * 100;
}
