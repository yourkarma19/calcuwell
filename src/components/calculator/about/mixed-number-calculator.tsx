
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutMixedNumberCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Mixed Numbers</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                 <p>Our Mixed Number Calculator is a specialized tool designed to simplify arithmetic involving mixed numbers. A mixed number is a combination of a whole number and a proper fraction, which is a common way to express quantities in everyday life, like in recipes or measurements. This calculator helps you convert them and will soon handle operations like addition and subtraction.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **whole number** part of your mixed number.</li>
                    <li>Enter the **numerator** (the top part of the fraction).</li>
                    <li>Enter the **denominator** (the bottom part of the fraction).</li>
                </ol>
                <p>The calculator will instantly convert your mixed number into an improper fraction, which is often easier to work with for more complex calculations.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What Are Mixed Numbers?</AccordionTrigger>
                        <AccordionContent>
                            A mixed number is a whole number combined with a proper fraction. It's a way of representing a value greater than one. For example, if you have 2 full pizzas and a half pizza, you would write it as 2 ½. This is often more intuitive to understand in daily life than its improper fraction equivalent, which would be 5/2.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do you convert a mixed number to an improper fraction?</AccordionTrigger>
                        <AccordionContent>
                           To convert a mixed number to an improper fraction, you multiply the whole number by the denominator and then add the numerator. This result becomes the new numerator, and the denominator stays the same. For example, for 2 ½, you calculate (2 * 2) + 1 = 5, so the improper fraction is 5/2.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How to Add and Subtract Mixed Numbers (The Easy Way)</AccordionTrigger>
                        <AccordionContent>
                            The easiest and most reliable way to add or subtract mixed numbers is to first convert them all into improper fractions. Once you have two improper fractions, you find a common denominator for both. After they share a common denominator, you can perform the addition or subtraction on the numerators. Finally, you can convert the resulting improper fraction back to a mixed number if needed.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
