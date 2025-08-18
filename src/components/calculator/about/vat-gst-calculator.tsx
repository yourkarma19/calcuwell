
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutVatGstCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About VAT & GST</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our VAT / GST Calculator is a key tool for consumers and business owners. It lets you quickly add or remove a sales tax from a price. This makes it easy to see the pre-tax cost or the final gross amount. This is perfect for checking receipts, creating invoices, or understanding the true cost of a product.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the Initial Amount of the product or service.</li>
                    <li>Specify if this amount already includes tax. Select "No" to add tax, or "Yes" to remove it.</li>
                    <li>Adjust the Tax Rate (%) slider to match your local VAT or GST rate.</li>
                </ol>
                <p>The results will instantly show you the Net Price (pre-tax), the Tax Amount, and the Gross Price (inclusive of tax).</p>

                <h3>Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What's the difference between VAT and GST?</AccordionTrigger>
                        <AccordionContent>
                            <p>VAT (Value-Added Tax) and GST (Goods and Services Tax) are very similar. Both are taxes on goods and services. The main difference is the name used by different countries. For the end consumer, the calculation is the same.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do you find the tax from a gross price?</AccordionTrigger>
                        <AccordionContent>
                            <p>To find the original net price from a price that already includes tax, use this formula: `Net Price = Gross Price / (1 + (Tax Rate / 100))`. The tax amount is then the `Gross Price - Net Price`.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
