"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = usePersistentState("ret-current-age", 30);
  const [retirementAge, setRetirementAge] = usePersistentState("ret-retire-age", 65);
  const [currentSavings, setCurrentSavings] = usePersistentState("ret-savings", 50000);
  const [monthlyContribution, setMonthlyContribution] = usePersistentState("ret-contrib", 500);
  const [interestRate, setInterestRate] = usePersistentState("ret-rate", 7);
  const [retirementIncome, setRetirementIncome] = usePersistentState("ret-income", 40000);
  const [lifeExpectancy, setLifeExpectancy] = usePersistentState("ret-lifespan", 90);

  const { futureValue, requiredSavings, shortfall, isAchievable } = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;

    if (yearsToRetirement <= 0) return { futureValue: currentSavings, requiredSavings: 0, shortfall: 0, isAchievable: false };

    // Calculate future value of current savings
    const fvCurrentSavings = currentSavings * Math.pow(1 + interestRate / 100, yearsToRetirement);

    // Calculate future value of monthly contributions
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = yearsToRetirement * 12;
    const fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
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
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, interestRate, retirementIncome, lifeExpectancy]);

  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
              <CardTitle>Retirement Planning Details</CardTitle>
              <CardDescription>Adjust the sliders to see how different factors can impact your retirement savings projection.</CardDescription>
            </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Age</Label>
                <Slider value={[currentAge]} onValueChange={v => setCurrentAge(v[0])} min={18} max={100} step={1} />
                <span className="text-sm font-medium">{currentAge} years</span>
              </div>
              <div className="space-y-2">
                <Label>Retirement Age</Label>
                <Slider value={[retirementAge]} onValueChange={v => setRetirementAge(v[0])} min={currentAge + 1} max={100} step={1} />
                <span className="text-sm font-medium">{retirementAge} years</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Current Savings</Label>
              <Slider value={[currentSavings]} onValueChange={v => setCurrentSavings(v[0])} min={0} max={1000000} step={1000} />
              <span className="text-sm font-medium">{formatCurrency(currentSavings)}</span>
            </div>
             <div className="space-y-2">
              <Label>Monthly Contribution</Label>
              <Slider value={[monthlyContribution]} onValueChange={v => setMonthlyContribution(v[0])} min={0} max={10000} step={100} />
              <span className="text-sm font-medium">{formatCurrency(monthlyContribution)}</span>
            </div>
             <div className="space-y-2">
              <Label>Annual Interest Rate (%)</Label>
              <Slider value={[interestRate]} onValueChange={v => setInterestRate(v[0])} min={0} max={15} step={0.1} />
              <span className="text-sm font-medium">{interestRate}%</span>
            </div>
             <div className="space-y-2">
              <Label>Desired Annual Retirement Income</Label>
              <Slider value={[retirementIncome]} onValueChange={v => setRetirementIncome(v[0])} min={10000} max={200000} step={1000} />
              <span className="text-sm font-medium">{formatCurrency(retirementIncome)}</span>
            </div>
             <div className="space-y-2">
              <Label>Life Expectancy</Label>
              <Slider value={[lifeExpectancy]} onValueChange={v => setLifeExpectancy(v[0])} min={retirementAge + 1} max={120} step={1} />
              <span className="text-sm font-medium">{lifeExpectancy} years</span>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground flex items-start gap-4">
                <Info className="w-5 h-5 mt-1 shrink-0" />
                <div>
                    <p>This calculator uses the <span className="font-semibold text-foreground">4% Rule</span> as a simple model to estimate your required savings goal (25x your desired annual income). This is a common guideline, but your actual needs may vary.</p>
                </div>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Retirement Projection</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Savings at Retirement</p>
              <p className="text-2xl font-bold font-headline text-primary">{formatCurrency(futureValue)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Savings Goal for Retirement</p>
              <p className="text-2xl font-bold font-headline">{formatCurrency(requiredSavings)}</p>
            </div>
            <div className={`p-4 rounded-lg ${isAchievable ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <p className={`text-lg font-bold ${isAchievable ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {isAchievable ? 'On Track!' : 'Shortfall'}
              </p>
              <p className={`text-2xl font-bold ${isAchievable ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                 {isAchievable ? 'Goal Achievable' : formatCurrency(shortfall)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
