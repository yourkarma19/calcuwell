import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

interface AboutMortgageCalculatorProps {
    principal: number;
    totalInterest: number;
    propertyTax: number;
    homeInsurance: number;
    tenure: number;
}

const MortgageBreakdownChart = dynamic(
    () => import('@/components/charts/mortgage-breakdown-chart').then(mod => mod.MortgageBreakdownChart),
    { 
        ssr: false,
        loading: () => <Skeleton className="w-full h-[25rem]" />
    }
);


export default function AboutMortgageCalculator({ principal, totalInterest, propertyTax, homeInsurance, tenure }: AboutMortgageCalculatorProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>About the Mortgage Calculator</CardTitle></CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>Our **Mortgage Calculator** is a comprehensive tool designed to help prospective homebuyers understand the full cost of their home loan. It goes beyond a simple EMI calculation by incorporating key expenses like property taxes and home insurance, providing a realistic estimate of your total monthly housing payment. This empowers you to budget accurately and make informed decisions during the home-buying process.</p>
                  
                  <h3>How to Use the Calculator</h3>
                  <ol>
                      <li>Enter the **Home Price** you are considering.</li>
                      <li>Input the estimated annual **Interest Rate** from a lender.</li>
                      <li>Select the **Loan Term** in years (e.g., 15, 20, or 30 years).</li>
                      <li>Provide your estimated **Annual Property Tax** and **Home Insurance** costs for the area.</li>
                  </ol>
                  <p>The calculator will instantly break down your monthly payment into principal, interest, tax, and insurance (PITI) and show you the total cost of the loan over its lifetime.</p>
                  
                  <h3>Frequently Asked Questions (FAQs)</h3>
                  <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                          <AccordionTrigger>What is PITI?</AccordionTrigger>
                          <AccordionContent>
                              PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of a monthly mortgage payment. Principal is the amount that goes towards paying down your loan balance, while Interest is the cost of borrowing. Taxes and Insurance are often collected by the lender and paid on your behalf from an escrow account.
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                          <AccordionTrigger>Why is it important to include taxes and insurance?</AccordionTrigger>
                          <AccordionContent>
                             Property taxes and homeowners insurance are significant ongoing costs of homeownership. Forgetting to include them in your budget can lead to a payment that is much higher than you expected. This calculator includes them to give you a more complete picture of your financial commitment.
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                          <AccordionTrigger>What is loan amortization?</AccordionTrigger>
                          <AccordionContent>
                             Amortization is the process of paying off a loan over time with regular payments. In the early years of a mortgage, a larger portion of your payment goes towards interest. As you continue to make payments, more of your money goes towards paying down the principal balance. The amortization chart visualizes how much of your total payment goes to principal versus interest and other costs over the life of the loan.
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                          <AccordionTrigger>How can I lower my mortgage payment?</AccordionTrigger>
                          <AccordionContent>
                              There are several ways to lower your payment: 1) Make a larger down payment to reduce the principal. 2) Choose a longer loan term (e.g., 30 years instead of 15), but be aware this means paying more interest over time. 3) Shop around for the best possible interest rate, as even a small difference can have a big impact. 4) Improve your credit score before applying.
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
                </CardContent>
            </Card>
             
            {principal > 0 && totalInterest > 0 && (
                <Card>
                    <CardHeader><CardTitle>Loan Cost Breakdown</CardTitle></CardHeader>
                    <CardContent>
                        <MortgageBreakdownChart 
                            principal={principal} 
                            totalInterest={totalInterest} 
                            propertyTax={propertyTax} 
                            homeInsurance={homeInsurance} 
                            tenure={tenure} 
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
