import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutAgeCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle as="h2">About the Age Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Age Calculator determines your exact age from your date of birth. It breaks down your age into years, months, and days. This tool is useful for filling out applications, planning events, or for anyone curious about their precise age.</p>

                <h3>How to Use the Age Calculator</h3>
                <ol>
                    <li>Select your date of birth using the calendar.</li>
                    <li>Click the "Calculate Age" button to see the result.</li>
                    <li>Your age will be displayed, showing the total years, months, and days.</li>
                </ol>
                
                <h3>Age Calculator FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">How is my age calculated?</AccordionTrigger>
                        <AccordionContent>
                            <p>This tool calculates the total number of full years that have passed since you were born. It then calculates the remaining months and days to give you a precise age. The calculation correctly handles the different number of days in each month.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Does this tool account for leap years?</AccordionTrigger>
                        <AccordionContent>
                           <p>Yes. The age calculation is based on the actual number of days in each month and year, which automatically includes leap years. This provides an accurate age, even for those born in a leap year.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What is chronological age?</AccordionTrigger>
                        <AccordionContent>
                           <p>Chronological age is the exact amount of time that has passed from your birth to the present day. This is different from biological age, which refers to how healthy your body is relative to its actual age.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
      </Card>
    )
}
