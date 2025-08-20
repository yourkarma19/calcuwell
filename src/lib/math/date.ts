import { differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths } from "date-fns";

export interface Age {
    years: number;
    months: number;
    days: number;
}

/**
 * Calculates the exact age between two dates, accounting for month and day differences.
 * @param endDate The end date (usually the current date).
 * @param startDate The start date (usually the date of birth).
 * @returns An object containing the difference in years, months, and days.
 */
export function calculateAge(endDate: Date, startDate: Date): Age {
    if (startDate > endDate) {
        return { years: 0, months: 0, days: 0 };
    }

    const years = differenceInYears(endDate, startDate);
    let dateAfterYears = subYears(endDate, years);
    
    // Handle case where birthday hasn't occurred yet in the month
    if (dateAfterYears < startDate) {
        dateAfterYears = subYears(endDate, years - 1);
    }
    
    const months = differenceInMonths(dateAfterYears, startDate);
    const dateAfterMonths = subMonths(dateAfterYears, months);
    const days = differenceInDays(dateAfterMonths, startDate);

    return { years, months, days };
}
