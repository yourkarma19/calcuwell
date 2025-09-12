"use client";

import { useMemo } from "react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = usePersistentState("ret-current-age", 30);
  const [retirementAge, setRetirementAge] = usePersistentState(
    "ret-retire-age",
    65,
  );
  const [currentSavings, setCurrentSavings] = usePersistentState(
    "ret-savings",
    50000,
  );
  const [monthlyContribution, setMonthlyContribution] = usePersistentState(
    "ret-contrib",
    500,
  );
  const [interestRate, setInterestRate] = usePersistentState("ret-rate", 7);
  const [retirementIncome, setRetirementIncome] = usePersistentState(
    "ret-income",
    40000,
  );
  const [lifeExpectancy, setLifeExpectancy] = usePersistentState(
    "ret-lifespan",
    90,
  );

  const { futureValue, requiredSavings, shortfall, isAchievable } =
    useMemo(() => {
      const yearsToRetirement = retirementAge - currentAge;

      if (yearsToRetirement <= 0)
        return {
          futureValue: currentSavings,
          requiredSavings: 0,
          shortfall: 0,
          isAchievable: false,
        };

      // Calculate future value of current savings
      const fvCurrentSavings =
        currentSavings * Math.pow(1 + interestRate / 100, yearsToRetirement);

      // Calculate future value of monthly contributions
      const monthlyRate = interestRate / 100 / 12;
      const totalMonths = yearsToRetirement * 12;
      const fvContributions =
        monthlyContribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

      const totalFutureValue = fvCurrentSavings + fvContributions;

      // Calculate required savings at retirement (using 4% rule as a simple model)
      const required = retirementIncome * 25;

      const shortfallAmount = required - totalFutureValue;

      return {
        futureValue: totalFutureValue,
        requiredSavings: required,
        shortfall: shortfallAmount,
        isAchievable: totalFutureValue >= required,
      };
    }, [
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      interestRate,
      retirementIncome,
    ]);

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Retirement Planning Details</CardTitle>
          <CardDescription>
            Adjust the inputs to see how different factors can impact your
            retirement savings projection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Age</Label>
              <Input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Retirement Age</Label>
              <Input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Current Savings</Label>
            <Input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              step="1000"
            />
          </div>
          <div className="space-y-2">
            <Label>Monthly Contribution</Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              step="100"
            />
          </div>
          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Desired Annual Retirement Income</Label>
              <Input
                type="number"
                value={retirementIncome}
                onChange={(e) => setRetirementIncome(Number(e.target.value))}
                step="1000"
              />
            </div>
            <div className="space-y-2">
              <Label>Life Expectancy</Label>
              <Input
                type="number"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Retirement Projection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center" aria-live="polite">
          <div>
            <p className="text-sm text-muted-foreground">
              Estimated Savings at Retirement
            </p>
            <p className="text-2xl font-bold font-headline text-primary">
              {formatCurrency(futureValue)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Savings Goal for Retirement
            </p>
            <p className="text-2xl font-bold font-headline">
              {formatCurrency(requiredSavings)}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${isAchievable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}
          >
            <p
              className={`text-lg font-bold ${isAchievable ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
            >
              {isAchievable ? "On Track!" : "Shortfall"}
            </p>
            <p
              className={`text-2xl font-bold ${isAchievable ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
            >
              {isAchievable ? "Goal Achievable" : formatCurrency(shortfall)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
