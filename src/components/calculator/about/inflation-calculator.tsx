import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutInflationCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Inflation Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our Inflation Calculator is a financial tool that helps you understand the impact of inflation on your money over time. It shows you how the purchasing power of a certain amount of currency changes between two different years. This is essential for historical analysis, financial planning, and understanding the real value of money.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Amount** of money you want to analyze.</li>
                    <li>Select a **Start Year** and an **End Year**.</li>
                </ol>
                <p>The calculator will show you what the initial amount would be worth in the end year, accounting for the cumulative inflation between those two periods.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is inflation?</AccordionTrigger>
                        <AccordionContent>
                            Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. For example, if the inflation rate is 2% per year, then a ₹100 item will cost ₹102 next year. Your money buys less than it did before.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is the calculation performed?</AccordionTrigger>
                        <AccordionContent>
                            The calculator uses historical inflation rate data. It compounds the inflation rate for each year between your selected start and end years to find the total percentage change in purchasing power. It then applies this change to your initial amount.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is the Consumer Price Index (CPI)?</AccordionTrigger>
                        <AccordionContent>
                           The inflation data used in this calculator is based on the Consumer Price Index (CPI), which is a measure that examines the weighted average of prices of a basket of consumer goods and services, such as transportation, food, and medical care. It is one of the most common measures of inflation.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>Are the rates in this calculator live?</AccordionTrigger>
                        <AccordionContent>
                           The inflation rates used in this calculator are based on historical data and are for informational purposes. The final, official rates for the current year are typically published after the year ends.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
