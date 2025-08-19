
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutRomanNumeralConverter() {
    return (
       <Card>
        <CardHeader><CardTitle>About the Roman Numeral Converter</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Roman Numeral Converter** is a handy tool for anyone who needs to translate between the Arabic numerals we use today (1, 2, 3) and the ancient Roman system (I, II, III). Whether for historical context, academic purposes, or simple curiosity, this calculator provides a quick and accurate conversion for any number between 1 and 3,999.</p>

            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter either a **Number** (e.g., 2024) or a **Roman Numeral** (e.g., MMXXIV) into the appropriate input box.</li>
                <li>The tool will instantly provide the conversion in the other box.</li>
                <li>Use the **Swap button** to easily switch the direction of the conversion.</li>
            </ol>
            <p>The calculator validates input in real-time to ensure accuracy.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How do Roman numerals work?</AccordionTrigger>
                    <AccordionContent>
                        Roman numerals use letters from the Latin alphabet to represent numbers. The main symbols are I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). The values are combined, typically from largest to smallest, to form larger numbers (e.g., VI = 6, CL = 150).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is the subtractive principle?</AccordionTrigger>
                    <AccordionContent>
                        Usually, symbols are placed from left to right in order of value. However, to avoid repeating a symbol four times (like IIII), a smaller value is placed before a larger one to indicate subtraction. This makes the notation more compact. The standard subtractive pairs are:
                        <ul className="list-disc pl-5 mt-2">
                          <li>IV = 4 (5 - 1)</li>
                          <li>IX = 9 (10 - 1)</li>
                          <li>XL = 40 (50 - 10)</li>
                          <li>XC = 90 (100 - 10)</li>
                          <li>CD = 400 (500 - 100)</li>
                          <li>CM = 900 (1000 - 100)</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Why is there a limit of 3,999?</AccordionTrigger>
                    <AccordionContent>
                        The standard Roman numeral system does not have a native way to represent numbers of 4,000 or greater. The largest standard numeral is M (1,000), and the rules don't allow for four consecutive identical numerals (MMMM). While other notations existed for larger numbers historically (like a bar over a numeral to multiply it by 1,000), 3,999 (MMMCMXCIX) is the practical limit for this calculator.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Where are Roman numerals still used today?</AccordionTrigger>
                    <AccordionContent>
                        Roman numerals are often used for stylistic purposes to add a sense of history, tradition, and formality. Common uses include on clock faces, for chapter numbers in books, in the names of monarchs (like Queen Elizabeth II), for movie sequels (Star Wars: Episode VI), and for major events like the Super Bowl.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}
