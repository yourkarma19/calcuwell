import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBreakEvenPointCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Break-Even Point Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Break-Even Point (BEP) Calculator is an essential tool for business owners, entrepreneurs, and students of finance. It helps you determine the point at which your total revenue equals your total costs, meaning your business is not making a profit but is also not losing money. Understanding your break-even point is critical for setting prices, managing costs, and making informed business decisions.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Total Fixed Costs**. These are expenses that do not change with the number of units sold (e.g., rent, salaries).</li>
                    <li>Enter your **Variable Cost Per Unit**. This is the cost to produce one single item (e.g., materials, direct labor).</li>
                    <li>Enter the **Price Per Unit** at which you sell your product.</li>
                </ol>
                <p>The calculator will instantly show you the number of units you need to sell and the total revenue required to break even.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the formula for the break-even point?</AccordionTrigger>
                        <AccordionContent>
                            The formula for the break-even point in units is: `Break-Even Units = Fixed Costs / (Price Per Unit - Variable Cost Per Unit)`. The denominator of this formula is known as the contribution margin per unit.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the contribution margin?</AccordionTrigger>
                        <AccordionContent>
                            The contribution margin is the amount of revenue from each sale that is left over to cover your fixed costs. It's calculated as `Price Per Unit - Variable Cost Per Unit`. A higher contribution margin means you break even faster.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why is this analysis important?</AccordionTrigger>
                        <AccordionContent>
                           Break-even analysis helps you set realistic sales goals, determine a pricing strategy, and understand how changes in costs will affect your profitability. It is a fundamental part of a solid business plan.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
