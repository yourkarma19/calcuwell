import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutSavingsCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About the Savings Growth Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Savings Growth Calculator is a powerful financial tool that helps you visualize how your savings can grow over time. By factoring in your initial deposit, regular contributions, and the power of compound interest, this calculator provides a clear projection of your financial future. It's an essential tool for anyone planning for long-term goals like retirement, a home down payment, or a child's education.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Initial Amount** (what you're starting with).</li>
                    <li>Set your planned **Monthly Contribution**.</li>
                    <li>Input the estimated **Annual Interest Rate** you expect your savings to earn.</li>
                    <li>Choose your **Investment Duration** in years.</li>
                </ol>
                <p>The calculator will instantly show the future value of your savings and a breakdown of your contributions versus the interest earned.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does compound interest work?</AccordionTrigger>
                        <AccordionContent>
                            Compound interest is "interest on interest." It means that the interest you earn is added back to your principal, and then you earn interest on the new, larger amount. This causes your savings to grow at an accelerating rate over time. The more frequently interest is compounded (e.g., monthly vs. annually), the faster your money grows. Our <Link href="/calculators/compound-interest-calculator" className="text-primary hover:underline">Compound Interest Calculator</Link> can help illustrate this.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why are regular contributions so important?</AccordionTrigger>
                        <AccordionContent>
                            Consistent, regular contributions are the engine of your savings plan. Even small monthly deposits add up to a significant amount over many years. This strategy, known as dollar-cost averaging, helps you build wealth steadily and reduces the risk of market timing.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is a realistic interest rate to assume?</AccordionTrigger>
                        <AccordionContent>
                           A realistic rate depends on where you are saving or investing your money. A high-yield savings account might offer 1-3%, while a diversified stock market portfolio has historically returned an average of 7-10% annually over the long term, though with higher risk. It's often wise to use a conservative estimate for planning.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

    