import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPetAgeCalculator() {
    return (
       <Card>
        <CardHeader><CardTitle>About the Pet Age Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Pet Age Calculator** is a fun and easy way to translate your dog's or cat's age into equivalent human years. While the old "7 dog years to 1 human year" rule is a popular myth, the aging process for our pets is more complex. This tool uses a more modern and widely accepted method to give you a better understanding of your pet's life stage.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Select the **Pet Type** (Dog or Cat).</li>
                <li>Enter your pet's current **Age** in years.</li>
            </ol>
            <p>The calculator will instantly show you their estimated age in human years, helping you better appreciate their current needs and life stage.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is the "7 dog years to 1 human year" rule true?</AccordionTrigger>
                    <AccordionContent>
                        The 7:1 ratio is a common myth. In reality, dogs and cats mature much faster in their first two years than humans do. This calculator uses a more widely accepted method where the first year equals about 15 human years, the second year adds another 9, and every subsequent year adds 4-5 years.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Does breed or size matter?</AccordionTrigger>
                    <AccordionContent>
                       Yes, significantly. Smaller dog breeds tend to live longer and mature slower than large breeds. For example, a 7-year-old Great Dane is much "older" in human years than a 7-year-old Chihuahua. This calculator provides a general estimate for an average-sized pet, but breed-specific charts can offer more accuracy.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I tell my pet's age if they were a rescue?</AccordionTrigger>
                    <AccordionContent>
                       A veterinarian is the best person to help estimate a pet's age. They look at factors like the condition of the teeth, coat, eyes, and overall physical health to make an educated guess.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}
