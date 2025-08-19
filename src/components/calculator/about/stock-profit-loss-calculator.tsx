import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutStockProfitLossCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Stock Profit/Loss Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Stock Profit/Loss Calculator is an essential tool for investors to determine the exact outcome of their stock trades. It goes beyond a simple price difference by allowing you to factor in the quantity of shares and any commissions or fees associated with buying and selling. This gives you a true picture of your net profit or loss and your return on investment (ROI).</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Buy Price per Share** and the **Sell Price per Share**.</li>
                    <li>Input the **Quantity** of shares you traded.</li>
                    <li>Add any **Buy Commission** and **Sell Commission** you paid to your broker.</li>
                </ol>
                <p>The calculator will instantly display the total profit or loss, the total cost and proceeds, and the final ROI for the trade.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why is it important to include commissions?</AccordionTrigger>
                        <AccordionContent>
                            Commissions and other fees can significantly impact your profitability, especially on smaller trades. Forgetting to include them can make a trade look more profitable than it actually was. The total cost of an investment is the share price plus the buy commission.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is Return on Investment (ROI)?</AccordionTrigger>
                        <AccordionContent>
                            Return on Investment (ROI) shows your net profit as a percentage of your total cost. It's a standard way to measure the performance of an investment, allowing you to compare the profitability of different trades on a like-for-like basis.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Does this calculator account for taxes?</AccordionTrigger>
                        <AccordionContent>
                           No, this calculator does not account for capital gains taxes, which you may have to pay on your profits. Tax laws vary by country and depend on how long you held the stock. The profit shown here is the pre-tax profit.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
