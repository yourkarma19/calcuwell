
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
                <div className="flex items-center gap-4">
                  <Slider value={[currentAge]} onValueChange={v => setCurrentAge(v[0])} min={18} max={100} step={1} />
                  <Input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} className="w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Retirement Age</Label>
                <div className="flex items-center gap-4">
                  <Slider value={[retirementAge]} onValueChange={v => setRetirementAge(v[0])} min={currentAge + 1} max={100} step={1} />
                  <Input type="number" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} className="w-24" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Current Savings</Label>
              <div className="flex items-center gap-4">
                <Slider value={[currentSavings]} onValueChange={v => setCurrentSavings(v[0])} min={0} max={1000000} step={1000} />
                <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} className="w-32" step="1000" />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Monthly Contribution</Label>
              <div className="flex items-center gap-4">
                <Slider value={[monthlyContribution]} onValueChange={v => setMonthlyContribution(v[0])} min={0} max={10000} step={100} />
                 <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} className="w-32" step="100" />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Annual Interest Rate (%)</Label>
               <div className="flex items-center gap-4">
                <Slider value={[interestRate]} onValueChange={v => setInterestRate(v[0])} min={0} max={15} step={0.1} />
                 <Input type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-24" step="0.1" />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Desired Annual Retirement Income</Label>
               <div className="flex items-center gap-4">
                <Slider value={[retirementIncome]} onValueChange={v => setRetirementIncome(v[0])} min={10000} max={200000} step={1000} />
                 <Input type="number" value={retirementIncome} onChange={e => setRetirementIncome(Number(e.target.value))} className="w-32" step="1000" />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Life Expectancy</Label>
               <div className="flex items-center gap-4">
                <Slider value={[lifeExpectancy]} onValueChange={v => setLifeExpectancy(v[0])} min={retirementAge + 1} max={120} step={1} />
                 <Input type="number" value={lifeExpectancy} onChange={e => setLifeExpectancy(Number(e.target.value))} className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About Retirement Planning</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Retirement Calculator** is a crucial financial planning tool that helps you estimate whether you are on track to meet your long-term savings goals. By inputting your current age, savings, contributions, and expected returns, you can get a clear projection of your financial future. This allows you to make informed decisions today to ensure a comfortable and secure retirement tomorrow.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Current Age** and your desired **Retirement Age**.</li>
                    <li>Input your **Current Savings** and the **Monthly Contribution** you plan to make.</li>
                    <li>Adjust the estimated **Annual Interest Rate** your investments might earn.</li>
                    <li>Set your **Desired Annual Retirement Income** and your **Life Expectancy**.</li>
                </ol>
                <p>The calculator will instantly show your projected savings, your savings goal, and whether you are on track to meet it.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why is it important to start saving early?</AccordionTrigger>
                        <AccordionContent>
                            Starting early is the most powerful factor in retirement saving because of compound interest. The longer your money is invested, the more time it has to grow, with your earnings generating their own earnings. Even small, regular contributions can grow into a large sum over several decades.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the 4% Rule?</AccordionTrigger>
                        <AccordionContent>
                            The 4% rule is a guideline for retirees that suggests you can safely withdraw 4% of your savings in your first year of retirement and then adjust that amount for inflation for every subsequent year without running out of money for 30 years. This calculator uses it to estimate your savings goal by multiplying your desired annual income by 25.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is a "shortfall?"</AccordionTrigger>
                        <AccordionContent>
                           A shortfall is the gap between your estimated savings at retirement and your required savings goal. If this calculator shows a shortfall, it means your current plan is not projected to be enough to fund your desired retirement income. You may need to increase your monthly contributions, work longer, or adjust your retirement income goal.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>What is a realistic interest rate to assume?</AccordionTrigger>
                        <AccordionContent>
                           A realistic long-term interest rate depends on your investment strategy. A conservative portfolio might earn 4-5%, while a more aggressive, stock-heavy portfolio has historically returned 7-10% annually on average, though with higher risk. It's often wise to use a more conservative estimate for planning.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Retirement Projection</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-center" aria-live="polite">
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
