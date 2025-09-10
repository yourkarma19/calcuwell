import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
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
  let months = differenceInMonths(endDate, startDate);
  let days = differenceInDays(endDate, startDate);

  const originalStartDay = startDate.getDate();
  const endDay = endDate.getDate();

  // Adjust for the day of the month
  if (endDay < originalStartDay) {
    days -= 1; // Correct for the partial month
  }
  
  // Create a date representing the same day in the end month
  const tempDate = new Date(endDate);
  tempDate.setDate(originalStartDay);

  // If the end date is before this temp date in the same month, we haven't completed a full month
  if(endDate < tempDate) {
    months -= 1;
  }
  
  years = Math.floor(months / 12);
  months = months % 12;

  // Recalculate days based on the final years and months
  const adjustedStartDate = new Date(startDate);
  adjustedStartDate.setFullYear(startDate.getFullYear() + years);
  adjustedStartDate.setMonth(startDate.getMonth() + months);

  days = differenceInDays(endDate, adjustedStartDate);

  return { years, months, days };
}
