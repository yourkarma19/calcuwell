
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBusinessProfitMarginCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Profit Margins</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Profit Margin Calculator is a vital financial tool for business owners, managers, and investors. It breaks down a company's profitability into three key metrics: Gross, Operating, and Net Profit Margins. Understanding these margins helps you assess the financial health, operational efficiency, and overall performance of a business.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Total Revenue** for the period.</li>
                    <li>Input your **Cost of Goods Sold (COGS)**, which are the direct costs of producing your products or services.</li>
                    <li>Enter your total **Operating Expenses**, which include costs not directly related to production, like rent, salaries, and marketing.</li>
                    <li>Provide the applicable **Tax Rate** as a percentage.</li>
                </ol>
                <p>The calculator will instantly display the three profit margins and their corresponding profit amounts.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the difference between Gross, Operating, and Net Margin?</AccordionTrigger>
                        <AccordionContent>
                            <p><strong>Gross Margin</strong> shows how much profit is made on each sale after accounting for the direct costs of the product (COGS). It measures production efficiency.</p>
                            <p><strong>Operating Margin</strong> shows the profit a company makes from its core business operations, after both COGS and operating expenses are deducted. It measures overall operational efficiency.</p>
                            <p><strong>Net Margin</strong> is the "bottom line." It's the final profit after all expenses, including interest and taxes, have been paid. It represents the company's overall profitability.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is looking at all three margins important?</AccordionTrigger>
                        <AccordionContent>
                           Analyzing all three margins tells a complete story. A company might have a high gross margin (meaning it's efficient at making its product) but a low net margin (meaning its operating costs or taxes are too high). Comparing these margins over time or against industry competitors provides valuable insights into a company's financial health.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>What is a good profit margin?</AccordionTrigger>
                        <AccordionContent>
                           A "good" profit margin varies widely by industry. For example, a software company might have a very high gross margin (over 80%) because its COGS is low, while a retail store will have a much lower margin. A net profit margin of 10% is often considered average, 20% is considered high, and 5% is low. It's most useful to compare your margins to industry benchmarks.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
