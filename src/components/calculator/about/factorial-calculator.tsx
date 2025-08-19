import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutFactorialCalculator() {
    return (
      <Card>
        <CardHeader><CardTitle>About the Factorial Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The Factorial Calculator is a tool for finding the factorial of any non-negative integer. A factorial, shown by an exclamation mark (!), is a key idea in probability. This calculator simplifies a long manual calculation. It gives instant and accurate results for students and mathematicians.</p>
            
            <h3>How to Use the Calculator</h3>
            <p>Using the tool is simple:</p>
            <ol>
                <li>Enter a non-negative integer (0 or greater) into the input box.</li>
            </ol>
            <p>The calculator will instantly show the factorial of that number. Factorials grow very quickly, so the calculator has a limit to prevent errors (around 170!).</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What Does an Exclamation Mark (!) Mean in Math?</AccordionTrigger>
                    <AccordionContent>
                        The exclamation mark shows a factorial. The factorial of a non-negative integer 'n', written as n!, is the product of all positive integers less than or equal to n. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How to Calculate a Factorial Manually</AccordionTrigger>
                    <AccordionContent>
                        To calculate a factorial, multiply the number by every positive whole number smaller than it. For example, to find the factorial of 4 (4!), you would compute 4 × 3 × 2 × 1, which equals 24.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is Zero Factorial (0!)?</AccordionTrigger>
                    <AccordionContent>
                       By definition, 0! is equal to 1. This is a rule that makes many math formulas work correctly. It represents the single way to arrange zero objects, which is to do nothing.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Where are factorials used in real life?</AccordionTrigger>
                    <AccordionContent>
                       Factorials are key in probability. They are used to calculate the number of possible ways to arrange a set of items. For example, finding the number of ways a group of people can stand in a line.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}
