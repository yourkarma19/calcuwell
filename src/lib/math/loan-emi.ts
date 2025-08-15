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
        return { emi: 0, totalInterest: 0, totalPayable: 0 };
    }
    
    const totalPayable = emi * numberOfMonths;
    const totalInterest = totalPayable - principal;

    return {
        emi,
        totalInterest,
        totalPayable,
    };
}
