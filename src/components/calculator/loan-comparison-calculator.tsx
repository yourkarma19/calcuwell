"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import ExportShareControls from "./export-share-controls";
import { Skeleton } from "../ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";

const calculateLoanDetails = (
  principal: number,
  annualRate: number,
  tenureYears: number,
) => {
  if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return { emi: 0, totalInterest: 0, totalAmount: 0 };
  }
  const monthlyRate = annualRate / 100 / 12;
  const numberOfMonths = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  const totalAmount = emi * numberOfMonths;
  const totalInterest = totalAmount - principal;

  return { emi, totalInterest, totalAmount };
};

const LoanComparisonResults = dynamic(
  () => import("./loan-comparison-results"),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6 mt-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    ),
  },
);

export default function LoanComparisonCalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const [principalA, setPrincipalA] = usePersistentState(
    "lcomp-principalA",
    500000,
  );
  const [rateA, setRateA] = usePersistentState("lcomp-rateA", 8.5);
  const [tenureA, setTenureA] = usePersistentState("lcomp-tenureA", 5);

  const [principalB, setPrincipalB] = usePersistentState(
    "lcomp-principalB",
    500000,
  );
  const [rateB, setRateB] = usePersistentState("lcomp-rateB", 9.0);
  const [tenureB, setTenureB] = usePersistentState("lcomp-tenureB", 4);

  const [showResults, setShowResults] = useState<boolean>(false);

  const resultsA = useMemo(
    () => calculateLoanDetails(principalA, rateA, tenureA),
    [principalA, rateA, tenureA],
  );
  const resultsB = useMemo(
    () => calculateLoanDetails(principalB, rateB, tenureB),
    [principalB, rateB, tenureB],
  );

  const handleCompare = () => {
    if (resultsA.totalAmount > 0 && resultsB.totalAmount > 0) {
      setShowResults(true);
    } else {
      alert("Please fill in all fields with valid positive numbers.");
    }
  };

  const shareParams = {
    pA: principalA.toString(),
    rA: rateA.toString(),
    tA: tenureA.toString(),
    pB: principalB.toString(),
    rB: rateB.toString(),
    tB: tenureB.toString(),
  };

  return (
    <div className="space-y-6">
      <div id="loan-inputs" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card id="loanA">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full">
                A
              </span>{" "}
              Loan Option A
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="principalA">Loan Amount (₹)</Label>
              <Input
                type="number"
                id="principalA"
                value={principalA}
                onChange={(e) => setPrincipalA(Number(e.target.value))}
                placeholder="e.g., 500000"
              />
            </div>
            <div>
              <Label htmlFor="rateA">Annual Interest Rate (%)</Label>
              <Input
                type="number"
                id="rateA"
                value={rateA}
                onChange={(e) => setRateA(Number(e.target.value))}
                placeholder="e.g., 8.5"
              />
            </div>
            <div>
              <Label htmlFor="tenureA">Loan Tenure (Years)</Label>
              <Input
                type="number"
                id="tenureA"
                value={tenureA}
                onChange={(e) => setTenureA(Number(e.target.value))}
                placeholder="e.g., 5"
              />
            </div>
          </CardContent>
        </Card>
        <Card id="loanB">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-full">
                B
              </span>{" "}
              Loan Option B
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="principalB">Loan Amount (₹)</Label>
              <Input
                type="number"
                id="principalB"
                value={principalB}
                onChange={(e) => setPrincipalB(Number(e.target.value))}
                placeholder="e.g., 500000"
              />
            </div>
            <div>
              <Label htmlFor="rateB">Annual Interest Rate (%)</Label>
              <Input
                type="number"
                id="rateB"
                value={rateB}
                onChange={(e) => setRateB(Number(e.target.value))}
                placeholder="e.g., 9.0"
              />
            </div>
            <div>
              <Label htmlFor="tenureB">Loan Tenure (Years)</Label>
              <Input
                type="number"
                id="tenureB"
                value={tenureB}
                onChange={(e) => setTenureB(Number(e.target.value))}
                placeholder="e.g., 4"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button onClick={handleCompare}>Compare Loans</Button>
      </div>

      {showResults && (
        <>
          <LoanComparisonResults resultsA={resultsA} resultsB={resultsB} />
          <ExportShareControls
            elementIds={["loan-inputs", "results-container"]}
            shareParams={shareParams}
            calculatorName={calculatorName}
          />
        </>
      )}
    </div>
  );
}
