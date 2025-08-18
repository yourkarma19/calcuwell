import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";


interface AboutMortgageCalculatorProps {
    principal: number;
    totalInterest: number;
    propertyTax: number;
    homeInsurance: number;
    tenure: number;
}

const chartConfig = {
      principal: { label: "Principal", color: "hsl(var(--chart-1))" },
      "Total Interest": { label: "Total Interest", color: "hsl(var(--chart-2))" },
      "Property Tax": { label: "Property Tax", color: "hsl(var(--chart-3))" },
      "Home Insurance": { label: "Home Insurance", color: "hsl(var(--chart-4))" },
};


export default function AboutMortgageCalculator({ principal, totalInterest, propertyTax, homeInsurance, tenure }: AboutMortgageCalculatorProps) {

    const chartData = [
      { name: "Principal", value: principal, fill: "hsl(var(--chart-1))" },
      { name: "Total Interest", value: totalInterest, fill: "hsl(var(--chart-2))" },
      { name: "Property Tax", value: propertyTax * tenure, fill: "hsl(var(--chart-3))" },
      { name: "Home Insurance", value: homeInsurance * tenure, fill: "hsl(var(--chart-4))" },
    ];
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>About the Mortgage Calculator</CardTitle></CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>Our **Mortgage Calculator** is a comprehensive tool designed to help prospective homebuyers understand the full cost of their home loan. It goes beyond a simple EMI calculation by incorporating key expenses like property taxes and home insurance, providing a realistic estimate of your total monthly housing payment. This empowers you to budget accurately and make informed decisions during the home-buying process.</p>
                  <h3>How to Use the Calculator</h3>
                  <ol>
                      <li>Enter the **Home Price** and your estimated **Interest Rate**.</li>
                      <li>Select the **Loan Term** in years (e.g., 30 years).</li>
                      <li>Provide estimates for your **Annual Property Tax** and **Home Insurance** costs.</li>
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
                  </Accordion>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Loan Amortization</CardTitle></CardHeader>
                <CardContent className="h-[25rem]">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip
                                cursor={false}
                                content={<ChartTooltipContent 
                                    formatter={(value, name) => `${name}: ₹${Number(value).toLocaleString('en-IN', {maximumFractionDigits: 0})}`}
                                    />}
                                />
                                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="30%" outerRadius="80%" strokeWidth={5}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} name={entry.name} />
                                    ))}
                                </Pie>
                                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
