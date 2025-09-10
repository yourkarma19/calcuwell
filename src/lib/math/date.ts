import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subYears,
  subMonths,
} from "date-fns";

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

  let years = differenceInYears(endDate, startDate);
  let months = differenceInMonths(endDate, startDate) % 12;
  
  // Adjust months and years
  let tempDate = new Date(startDate);
  tempDate.setFullYear(startDate.getFullYear() + years);
  tempDate.setMonth(startDate.getMonth() + months);
  
  if(tempDate > endDate) {
    months--;
    if (months < 0) {
      months = 11;
      years--;
    }
  }

  // Recalculate tempDate for days calculation
  tempDate = new Date(startDate);
  tempDate.setFullYear(startDate.getFullYear() + years);
  tempDate.setMonth(startDate.getMonth() + months);

  const days = differenceInDays(endDate, tempDate);

  return { years, months, days };
}
