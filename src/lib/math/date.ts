import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  add,
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
  
  // To get the accurate day difference, we need to find the "anniversary" date in the end month
  let anniversary = add(startDate, { years: years, months: months });

  let days = differenceInDays(endDate, anniversary);

  // If the days are negative, it means we haven't reached the anniversary day in the month yet.
  // So, we need to go back one month and recalculate the days.
  if (days < 0) {
    months = months - 1;
    if (months < 0) {
      // This case should be handled by the year difference, but as a fallback
      months = 11;
      years = years -1;
    }
    anniversary = add(startDate, { years: years, months: months });
    days = differenceInDays(endDate, anniversary);
  }

  return { years, months, days };
}
