import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSalaryCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Salary Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our Salary Calculator is a simple tool designed to help you understand your take-home pay. By entering your gross salary and any applicable deductions, you can quickly estimate your net income. This is essential for budgeting, financial planning, and evaluating job offers.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Gross Salary** and select whether it's an annual or monthly amount.</li>
                    <li>Use the slider to set your estimated average **Income Tax Rate**.</li>
                    <li>Enter any other regular **Deductions** per pay period (e.g., for health insurance or retirement).</li>
                </ol>
                <p>The calculator will instantly show you your net take-home pay for the selected period, as well as an annual summary.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the difference between Gross and Net Salary?</AccordionTrigger>
                        <AccordionContent>
                            **Gross Salary** is the total amount of money an employee earns before any taxes and other deductions are subtracted. **Net Salary** (or take-home pay) is the amount of money an employee receives after all deductions have been taken out.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is the tax rate an estimate?</AccordionTrigger>
                        <AccordionContent>
                            Income tax systems are often complex, with different tax brackets and rules. This calculator uses a single average tax rate for simplicity. Your actual tax rate may be different. This tool is intended for estimation purposes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What are some common deductions?</AccordionTrigger>
                        <AccordionContent>
                           Common deductions from a salary include income tax, retirement plan contributions (like a 401(k) or pension), health insurance premiums, and other social security contributions depending on your country's regulations.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
