
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
  
  // Calculate the anniversary date for the current year
  let anniversary = add(startDate, { years });
  if (anniversary > endDate) {
    years--;
    anniversary = add(startDate, { years });
  }

  // Calculate months from the last anniversary
  let months = differenceInMonths(endDate, anniversary);
  
  // Add the months to the anniversary to get the anniversary for the current month
  let monthAnniversary = add(anniversary, { months });
  if (monthAnniversary > endDate) {
    months--;
    monthAnniversary = add(anniversary, { months });
  }

  const days = differenceInDays(endDate, monthAnniversary);
  
  return { years, months, days };
}
