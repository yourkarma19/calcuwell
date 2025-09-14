"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An Equated Monthly Installment (EMI) is the fixed payment amount a borrower makes to a lender each month. It includes both the principal amount and the interest on the loan, ensuring the loan is fully paid off over the specified tenure.",
      },
    },
    {
      "@type": "Question",
      name: "How can I lower my car loan EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can lower your EMI by making a larger down payment, which reduces the principal loan amount. Choosing a longer loan tenure will also lower the monthly payment, but be aware that this usually means you will pay more in total interest.",
      },
    },
    {
      "@type": "Question",
      name: "What other costs should I consider when buying a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beyond the loan, remember to budget for ongoing car ownership costs such as insurance, fuel, regular maintenance, and potential repairs. These are not included in the loan calculation but are a significant part of the total cost of owning a car.",
      },
    },
  ],
};

export default function CarLoanCalculator() {
  const [carPrice, setCarPrice] = usePersistentState("car-loan-price", 25000);
  const [downPayment, setDownPayment] = usePersistentState(
    "car-loan-downpayment",
    5000,
  );
  const [tradeInValue, setTradeInValue] = usePersistentState(
    "car-loan-tradein",
    2000,
  );
  const [rate, setRate] = usePersistentState("car-loan-rate", 7.5);
  const [tenure, setTenure] = usePersistentState("car-loan-tenure", 5);

  const { emi, totalPayable, totalInterest, loanAmount } = useMemo(() => {
    const principal = carPrice - downPayment - tradeInValue;
    if (principal > 0 && rate > 0 && tenure > 0) {
      const monthlyRate = rate / 12 / 100;
      const numberOfMonths = tenure * 12;
      const emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

      if (isFinite(emiValue)) {
        const totalPayableValue = emiValue * numberOfMonths;
        const totalInterestValue = totalPayableValue - principal;
        return {
          emi: emiValue,
          totalPayable: totalPayableValue,
          totalInterest: totalInterestValue,
          loanAmount: principal,
        };
      }
    }
    return {
      emi: 0,
      totalPayable: 0,
      totalInterest: 0,
      loanAmount: Math.max(0, principal),
    };
  }, [carPrice, downPayment, tradeInValue, rate, tenure]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Car Loan Details</CardTitle>
          <CardDescription>
            Calculate your monthly car loan payment (EMI) and understand the
            total cost of your auto loan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="car-price">Car Price</Label>
            <Input
              id="car-price"
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="down-payment">Down Payment</Label>
              <Input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-in">Trade-in Value</Label>
              <Input
                id="trade-in"
                type="number"
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="rate"
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={1}
                max={25}
                step={0.05}
              />
              <Input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-24"
                step="0.05"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenure">Loan Tenure (Years)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="tenure"
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                min={1}
                max={10}
                step={1}
              />
              <Input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Loan Details</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Monthly Payment (EMI)
            </p>
            <p className="text-4xl font-bold font-headline text-primary">
              ₹ {emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Loan Amount:</span>
              <span className="font-semibold">
                ₹{" "}
                {loanAmount.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest:</span>
              <span className="font-semibold">
                ₹{" "}
                {totalInterest.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between font-medium border-t pt-2 mt-2">
              <span>Total Cost of Car:</span>
              <span>
                ₹{" "}
                {(totalPayable + downPayment + tradeInValue).toLocaleString(
                  "en-IN",
                  { maximumFractionDigits: 0 },
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Car Loan Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our <strong>Car Loan Calculator</strong> helps you understand the true
            cost of a car loan by calculating your monthly payment (EMI). This
            helps you budget effectively, compare different loan offers, and make
            a smart decision before you buy.
          </p>

          <h3>How to Use the Car Loan Calculator</h3>
          <ol>
            <li>
              Enter the total <strong>Car Price</strong>.
            </li>
            <li>
              Input your <strong>Down Payment</strong> and the{" "}
              <strong>Trade-in Value</strong> of your old vehicle.
            </li>
            <li>
              Adjust the <strong>Interest Rate</strong> and{" "}
              <strong>Loan Tenure</strong> (in years).
            </li>
          </ol>
          <p>
            The calculator will instantly show your monthly payment and how the
            total cost is divided between the loan amount and interest paid.
          </p>

          <h3>Car Loan FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is an EMI?</AccordionTrigger>
              <AccordionContent>
                An Equated Monthly Installment (EMI) is the fixed payment you make
                to a lender each month. It includes both the principal loan amount
                and the interest.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What is the total cost of the car?
              </AccordionTrigger>
              <AccordionContent>
                The total cost includes the loan amount, all the interest paid
                over the loan&apos;s life, and any down payment. It&apos;s the
                complete out-of-pocket expense for the vehicle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I lower my EMI?</AccordionTrigger>
              <AccordionContent>
                You can lower your EMI by making a larger down payment. A longer
                loan term also lowers the monthly payment, but you will usually
                pay more in total interest.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What other costs should I consider?
              </AccordionTrigger>
              <AccordionContent>
                Besides the loan, remember to budget for ongoing costs like
                insurance, fuel, and maintenance. These are not included in the
                loan calculation but are a big part of owning a car.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
