

/**
 * Calculates the Equated Monthly Installment (EMI) for a loan.
 *
 * @param principal The total loan amount.
 * @param annualRate The annual interest rate (in percent, e.g., 8.5 for 8.5%).
 * @param tenureInYears The loan tenure in years.
 * @returns An object containing the EMI, total interest payable, and total amount payable.
 */
export function calculateEMI(principal: number, annualRate: number, tenureInYears: number) {
    if (principal <= 0 || tenureInYears <= 0) {
        return { emi: 0, totalInterest: 0, totalPayable: 0 };
    }
    
    if (annualRate < 0) {
         throw new Error("Interest rate cannot be negative.");
    }

    // Handle zero interest rate as a special case
    if (annualRate === 0) {
        const emi = principal / (tenureInYears * 12);
        return { emi, totalInterest: 0, totalPayable: principal };
    }

    const monthlyRate = annualRate / 12 / 100;
    const numberOfMonths = tenureInYears * 12;

    const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    if (!isFinite(emi)) {
        return { emi: 0, totalInterest: 0, totalPayable: principal };
    }
    
    const totalPayable = emi * numberOfMonths;
    const totalInterest = totalPayable - principal;

    return {
        emi,
        totalInterest,
        totalPayable,
    };
}


/**
 * Calculates the impact of extra payments on a loan.
 *
 * @param principal The total loan amount.
 * @param annualRate The annual interest rate.
 * @param tenureInYears The original loan tenure in years.
 * @param extraMonthlyPayment The extra amount paid monthly.
 * @param extraYearlyPayment The extra amount paid yearly.
 * @returns An object with the new total interest, new tenure in months, interest saved, and time saved.
 */
export function calculateEMIWithExtraPayments(
  principal: number,
  annualRate: number,
  tenureInYears: number,
  extraMonthlyPayment: number,
  extraYearlyPayment: number
) {
  const monthlyRate = annualRate / 12 / 100;
  const originalMonths = tenureInYears * 12;

  const { emi, totalInterest: originalTotalInterest } = calculateEMI(
    principal,
    annualRate,
    tenureInYears
  );
  if (emi === 0) return { newTotalInterest: 0, newTotalMonths: 0, interestSaved: 0, timeSaved: { years: 0, months: 0 } };

  let remainingPrincipal = principal;
  let newMonths = 0;
  let totalInterestPaid = 0;

  while (remainingPrincipal > 0) {
    newMonths++;
    let interestForMonth = remainingPrincipal * monthlyRate;
    let principalForMonth = emi - interestForMonth;
    
    remainingPrincipal -= principalForMonth;
    totalInterestPaid += interestForMonth;
    
    // Apply extra monthly payment
    if (extraMonthlyPayment > 0) {
      if (remainingPrincipal > extraMonthlyPayment) {
        remainingPrincipal -= extraMonthlyPayment;
      } else {
        remainingPrincipal = 0;
      }
    }
    
    // Apply extra yearly payment
    if (newMonths % 12 === 0 && extraYearlyPayment > 0) {
       if (remainingPrincipal > extraYearlyPayment) {
        remainingPrincipal -= extraYearlyPayment;
      } else {
        remainingPrincipal = 0;
      }
    }

    if (newMonths > originalMonths * 2) { // Safety break
        break;
    }
  }

  const interestSaved = originalTotalInterest - totalInterestPaid;
  const monthsSaved = originalMonths - newMonths;
  const timeSaved = {
    years: Math.floor(monthsSaved / 12),
    months: monthsSaved % 12,
  };

  return {
    newTotalInterest: totalInterestPaid,
    newTotalMonths: newMonths,
    interestSaved,
    timeSaved,
  };
}
