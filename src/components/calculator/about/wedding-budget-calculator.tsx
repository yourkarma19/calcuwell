import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface AboutWeddingBudgetCalculatorProps {
    totalCost: number;
    chartData: any[];
}


export default function AboutWeddingBudgetCalculator({ totalCost, chartData }: AboutWeddingBudgetCalculatorProps) {
    const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>How to Plan Your Wedding Budget</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Our **Wedding Budget Calculator** is designed to help you plan and manage the financial aspect of your special day. By breaking down the costs into key categories, you can get a realistic estimate of your total expenses and see where your money is going. This is the first step to a stress-free wedding planning experience.</p>
                    <h3>How to Use the Calculator</h3>
                    <ol>
                        <li>Start by setting the **Number of Guests** you plan to invite. This is the biggest factor affecting your costs.</li>
                        <li>Enter your estimated costs for each category, such as the **Venue**, **Catering**, **Photography**, and **Decor**.</li>
                        <li>Use the "Miscellaneous" field to account for other expenses like invitations, entertainment, or wedding rings.</li>
                    </ol>
                    <p>The calculator will instantly update the total estimated cost and show a visual breakdown in the pie chart.</p>
                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What are the biggest wedding expenses?</AccordionTrigger>
                            <AccordionContent>
                                Typically, the venue and catering are the largest parts of a wedding budget, often accounting for 50% or more of the total cost. The number of guests you invite has a direct impact on this, as catering is usually priced per person.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How can we save money on our wedding?</AccordionTrigger>
                            <AccordionContent>
                                There are many ways to save! Consider having your wedding on a weekday or during the off-season. Trimming the guest list is the most effective way to cut costs. You can also explore DIY options for decorations or choose a less formal catering style, like a buffet instead of a plated dinner.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How much should we budget for unexpected costs?</AccordionTrigger>
                            <AccordionContent>
                               It's wise to set aside about 5-10% of your total budget as a contingency fund. This will help you cover any unexpected expenses that arise without adding stress. The "Miscellaneous" category in our calculator can be used for this.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Cost Breakdown</CardTitle></CardHeader>
                <CardContent className="h-[25rem]">
                    <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                            cursor={false}
                            content={<ChartTooltipContent 
                                formatter={(value) => formatCurrency(Number(value))}
                                />}
                            />
                            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="80%" strokeWidth={2}>
                                {chartData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

    