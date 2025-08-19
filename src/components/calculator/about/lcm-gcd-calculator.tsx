import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutLcmGcdCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About LCM & GCD</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **LCM & GCD Calculator** is a fundamental tool for number theory and mathematics. It allows you to quickly find the Least Common Multiple (LCM) and the Greatest Common Divisor (GCD) for a set of two or more positive integers. This is useful for students learning about number properties and for solving a variety of mathematical problems.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter at least two positive integers into the input boxes.</li>
                    <li>If you need to analyze more numbers, click the **"Add Number"** button.</li>
                </ol>
                <p>The calculator will instantly display the GCD and LCM for the entire set of numbers you have entered.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the Greatest Common Divisor (GCD)?</AccordionTrigger>
                        <AccordionContent>
                            The Greatest Common Divisor (also known as the Greatest Common Factor) is the largest positive integer that divides each of the integers in a set without leaving a remainder. For example, the GCD of 12 and 18 is 6, because 6 is the largest number that divides both 12 and 18 evenly.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the Least Common Multiple (LCM)?</AccordionTrigger>
                        <AccordionContent>
                            The Least Common Multiple is the smallest positive integer that is a multiple of every integer in a set. For example, the LCM of 12 and 18 is 36, because 36 is the smallest number that both 12 and 18 can divide into.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How are LCM and GCD related?</AccordionTrigger>
                        <AccordionContent>
                           For any two positive integers 'a' and 'b', there is a beautiful relationship: `a * b = GCD(a, b) * LCM(a, b)`. This means the product of two numbers is equal to the product of their GCD and LCM. This relationship is often used to calculate the LCM once the GCD is known.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>Practical Uses</AccordionTrigger>
                        <AccordionContent>
                           GCD is most commonly used to simplify fractions to their lowest terms. LCM is essential when adding or subtracting fractions with different denominators, as it helps find the least common denominator. Both are fundamental concepts in number theory and cryptography.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

    