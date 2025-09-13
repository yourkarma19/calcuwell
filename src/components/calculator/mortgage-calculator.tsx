"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import ExportShareControls from "./export-share-controls";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import { formatCurrency } from "@/lib/utils";

export default function MortgageCalculator({
  setAboutProps,
  calculatorName,
}: {
  setAboutProps: (props: Record<string, unknown>) => void;
  calculatorName: string;
}) {
  const searchParams = useSearchParams();
  const [principal, setPrincipal] = usePersistentState(
    "mortgage-principal",
    250000,
  );
  const [rate, setRate] = usePersistentState("mortgage-rate", 6.5);
  const [tenure, setTenure] = usePersistentState("mortgage-tenure", 30);
  const [propertyTax, setPropertyTax] = usePersistentState(
    "mortgage-tax",
    2000,
  );
  const [homeInsurance, setHomeInsurance] = usePersistentState(
    "mortgage-insurance",
    1000,
  );

  useEffect(() => {
    const p = searchParams.get("principal");
    const r = searchParams.get("rate");
    const t = searchParams.get("tenure");
    const tax = searchParams.get("propertyTax");
    const ins = searchParams.get("homeInsurance");

    if (p) setPrincipal(parseFloat(p));
    if (r) setRate(parseFloat(r));
    if (t) setTenure(parseFloat(t));
    if (tax) setPropertyTax(parseFloat(tax));
    if (ins) setHomeInsurance(parseFloat(ins));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const {
    monthlyPayment,
    totalPayable,
    totalInterest,
    principalAndInterest,
    monthlyTaxes,
    monthlyInsurance,
  } = useMemo(() => {
    if (principal > 0 && rate > 0 && tenure > 0) {
      const monthlyRate = rate / 12 / 100;
      const numberOfMonths = tenure * 12;
      const P = principal;

      const pAndI =
        (P * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

      const mTaxes = propertyTax / 12;
      const mInsurance = homeInsurance / 12;

      const totalMonthlyPayment = pAndI + mTaxes + mInsurance;

      if (isFinite(totalMonthlyPayment)) {
        const totalPayableValue = totalMonthlyPayment * numberOfMonths;
        const totalInterestValue = pAndI * numberOfMonths - principal;
        return {
          monthlyPayment: totalMonthlyPayment,
          totalPayable: totalPayableValue,
          totalInterest: totalInterestValue,
          principalAndInterest: pAndI,
          monthlyTaxes: mTaxes,
          monthlyInsurance: mInsurance,
        };
      }
    }
    return {
      monthlyPayment: 0,
      totalPayable: 0,
      totalInterest: 0,
      principalAndInterest: 0,
      monthlyTaxes: 0,
      monthlyInsurance: 0,
    };
  }, [principal, rate, tenure, propertyTax, homeInsurance]);

  useEffect(() => {
    setAboutProps({
      principal,
      totalInterest,
      propertyTax,
      homeInsurance,
      tenure,
    });
  }, [
    principal,
    totalInterest,
    propertyTax,
    homeInsurance,
    tenure,
    setAboutProps,
  ]);

  const shareParams = {
    principal: principal.toString(),
    rate: rate.toString(),
    tenure: tenure.toString(),
    propertyTax: propertyTax.toString(),
    homeInsurance: homeInsurance.toString(),
  };

  return (
    <div className="space-y-6">
      <Card id="mortgage-inputs">
        <CardHeader>
          <CardTitle>Enter Mortgage Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="home-price">Home Price</Label>
            <Input
              id="home-price"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              step="10000"
              aria-label="Home Price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
            <Input
              id="interest-rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              step="0.05"
              aria-label="Interest Rate"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan-term">Loan Term (Years)</Label>
            <Input
              id="loan-term"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              aria-label="Loan Term"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property-tax">Annual Property Tax</Label>
              <Input
                id="property-tax"
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
                step="100"
                aria-label="Annual Property Tax"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-insurance">Annual Home Insurance</Label>
              <Input
                id="home-insurance"
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                step="50"
                aria-label="Annual Home Insurance"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div role="status" aria-live="polite">
        <Card id="mortgage-results">
          <CardHeader>
            <CardTitle>Your Mortgage EMI</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Monthly Payment
              </p>
              <p className="text-4xl font-bold font-headline text-primary">
                {formatCurrency(monthlyPayment)}
              </p>
            </div>
            <div className="space-y-2 text-sm text-left border-t pt-2">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Principal & Interest</p>
                <p className="font-semibold">
                  {formatCurrency(principalAndInterest)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Property Tax</p>
                <p className="font-semibold">{formatCurrency(monthlyTaxes)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Home Insurance</p>
                <p className="font-semibold">
                  {formatCurrency(monthlyInsurance)}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-left border-t pt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total Interest Paid:
                </span>
                <span className="font-semibold">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-muted-foreground">Total Payment:</span>
                <span className="font-semibold">
                  {formatCurrency(totalPayable)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ExportShareControls
        elementIds={["mortgage-inputs", "mortgage-results"]}
        shareParams={shareParams}
        calculatorName={calculatorName}
      />
    </div>
  );
}
