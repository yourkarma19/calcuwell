"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import ExportShareControls from "./export-share-controls";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import { formatCurrency } from "@/lib/utils";
import type { FAQPage, WithContext } from "schema-dts";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";


const MortgageBreakdownChart = dynamic(
  () =>
    import("@/components/charts/mortgage-breakdown-chart").then(
      (mod) => mod.MortgageBreakdownChart,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[250px]" />,
  },
);

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is PITI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of a monthly mortgage payment. Principal is the amount that goes towards paying down your loan balance, while Interest is the cost of borrowing. Taxes and Insurance are often collected by the lender and paid on your behalf from an escrow account.",
      },
    },
    {
      "@type": "Question",
      name: "What is loan amortization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Amortization is the process of paying off a loan over time with regular payments. In the early years of a mortgage, a larger portion of your payment goes towards interest. As you continue to make payments, more of your money goes towards paying down the principal balance. The amortization chart visualizes how much of your total payment goes to principal versus interest and other costs over the life of the loan.",
      },
    },
    {
      "@type": "Question",
      name: "How can I lower my mortgage payment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are several ways to lower your payment: 1) Make a larger down payment to reduce the principal. 2) Choose a longer loan term (e.g., 30 years instead of 15), but be aware this means paying more interest over time. 3) Shop around for the best possible interest rate, as even a small difference can have a big impact. 4) Improve your credit score before applying.",
      },
    },
  ],
};


export default function MortgageCalculator({
  calculatorName,
}: {
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
    const p = searchParams?.get("principal");
    const r = searchParams?.get("rate");
    const t = searchParams?.get("tenure");
    const tax = searchParams?.get("propertyTax");
    const ins = searchParams?.get("homeInsurance");

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

       <div className="space-y-6 mt-8">
        {principal > 0 && totalInterest > 0 && (
          <Card>
            <CardHeader>
              <CardTitle as="h3">Loan Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px]">
                <MortgageBreakdownChart
                  principal={principal}
                  totalInterest={totalInterest}
                  propertyTax={propertyTax}
                  homeInsurance={homeInsurance}
                  tenure={tenure}
                />
              </div>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle as="h2">About the Mortgage Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <p>
              Our **Mortgage Calculator** helps you understand the full cost of a
              home loan. It includes key expenses like property taxes and home
              insurance. This provides a realistic estimate of your total monthly
              housing payment and empowers you to budget accurately.
            </p>

            <h3>How to Use the Mortgage Calculator</h3>
            <ol>
              <li>Enter the **Home Price** you are considering.</li>
              <li>Input the estimated annual **Interest Rate**.</li>
              <li>Select the **Loan Term** in years (e.g., 15 or 30 years).</li>
              <li>
                Provide your estimated **Annual Property Tax** and **Home
                Insurance** costs.
              </li>
            </ol>
            <p>
              The calculator will instantly break down your monthly payment into
              principal, interest, tax, and insurance (PITI).
            </p>

            <h3>Mortgage FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is PITI?</AccordionTrigger>
                <AccordionContent>
                  PITI stands for Principal, Interest, Taxes, and Insurance. These
                  are the four main parts of a monthly mortgage payment. Principal
                  pays down your loan balance, while Interest is the cost of
                  borrowing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Why include taxes and insurance?
                </AccordionTrigger>
                <AccordionContent>
                  Property taxes and homeowners insurance are significant ongoing
                  costs. Forgetting to include them can lead to a much higher
                  payment than you expected.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is loan amortization?</AccordionTrigger>
                <AccordionContent>
                  Amortization is paying off a loan over time with regular
                  payments. In the early years of a mortgage, a larger portion of
                  your payment goes towards interest. Later, more goes toward the
                  principal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How can I lower my mortgage payment?
                </AccordionTrigger>
                <AccordionContent>
                  You can make a larger down payment, choose a longer loan term
                  (but you&apos;ll pay more interest), or shop around for the best
                  interest rate. Improving your credit score also helps.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
