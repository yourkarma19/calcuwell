import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutInvestmentReturnCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Return on Investment (ROI)</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Return on Investment (ROI) Calculator is a fundamental financial tool that measures the profitability of an investment. It helps you understand how much money you have made or lost in relation to your initial cost. This simple calculation is one of the most popular ways to evaluate the performance of an investment, whether it's stocks, real estate, or a business venture.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Initial Investment** amount. This is the total cost you paid.</li>
                    <li>Enter the **Final Value** of the investment. This is what it's worth now, or what you sold it for.</li>
                </ol>
                <p>The calculator will instantly display the net profit or loss and the ROI as a percentage.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the formula for ROI?</AccordionTrigger>
                        <AccordionContent>
                            The formula for Return on Investment is: `ROI = ( (Final Value - Initial Investment) / Initial Investment ) * 100`. The result is expressed as a percentage.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is a good ROI?</AccordionTrigger>
                        <AccordionContent>
                            A "good" ROI depends heavily on the type of investment and its associated risk. For example, a 7-10% annual ROI is often considered a good average for the stock market. A high-risk startup investment would need a much higher potential ROI to be considered worthwhile.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What are the limitations of ROI?</AccordionTrigger>
                        <AccordionContent>
                           ROI is a simple and effective metric, but it has one major limitation: it doesn't account for the holding period of an investment. An ROI of 20% over one year is much better than an ROI of 20% over ten years. For comparing investments over different timeframes, it's often better to look at the annualized ROI.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
