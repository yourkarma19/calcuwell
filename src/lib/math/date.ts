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

  const years = differenceInYears(endDate, startDate);

  const anniversaryThisYear = add(startDate, { years: years });
  let months = differenceInMonths(endDate, anniversaryThisYear);

  const monthAnniversary = add(anniversaryThisYear, { months: months });
  let days = differenceInDays(endDate, monthAnniversary);
  
  if (days < 0) {
    months -=1;
    const previousMonthAnniversary = add(anniversaryThisYear, { months: months });
    days = differenceInDays(endDate, previousMonthAnniversary);
  }

  return { years, months, days };
}
