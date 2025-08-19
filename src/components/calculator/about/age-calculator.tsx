import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutAgeCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle as="h2">About the Age Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Age Calculator shows your exact age based on your birth date. It breaks down your age into years, months, and days. This tool is great for anyone curious about their age, for filling out applications, or for planning events.</p>

                <h2>How to Use This Tool</h2>
                <ol>
                    <li>Select your date of birth using the date picker.</li>
                    <li>Click the "Calculate Age" button.</li>
                    <li>Your age will be shown in the results card. It will include total years, months, and days.</li>
                </ol>
                
                <h2>Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">How is age calculated?</AccordionTrigger>
                        <AccordionContent>
                            <p>This tool finds the number of full years that have passed since you were born. Then, it calculates the remaining months and days for a precise age. It correctly handles the different number of days in each month.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Does this tool handle leap years?</AccordionTrigger>
                        <AccordionContent>
                           <p>Yes. The calculation is based on the actual number of days in each month and year. This means it correctly includes leap years. This gives you an accurate age, even if you were born in a leap year.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What is chronological age?</AccordionTrigger>
                        <AccordionContent>
                           <p>Chronological age is the exact time that has passed from your birth date to today. This is different from biological age, which relates to your personal health and fitness level.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
      </Card>
    )
}
