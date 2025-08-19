
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBacCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Blood Alcohol Content (BAC)</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Blood Alcohol Content (BAC) calculator provides an **estimate** of your blood alcohol level based on the Widmark formula. It is an educational tool to help you understand how different factors contribute to intoxication. **It should never be used to determine if it is safe to drive or operate machinery.**</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Body Weight** in kilograms.</li>
                    <li>Select your biological **Gender**, as this affects alcohol distribution.</li>
                    <li>Input the number of **Standard Drinks** you have consumed.</li>
                    <li>Enter the number of **Hours** that have passed since your first drink.</li>
                </ol>
                <p>The calculator will instantly show your estimated BAC percentage and a general description of the potential effects.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a "standard drink"?</AccordionTrigger>
                        <AccordionContent>
                           A standard drink in most countries contains approximately 14 grams of pure alcohol. This is equivalent to a 12-ounce (355 ml) beer with 5% alcohol, a 5-ounce (150 ml) glass of wine with 12% alcohol, or a 1.5-ounce (44 ml) shot of 80-proof (40%) distilled spirits.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is this calculator only an estimate?</AccordionTrigger>
                        <AccordionContent>
                           Many individual factors can affect your BAC that this calculator does not account for. These include your metabolism, whether you've eaten recently, your body fat percentage, and any medications you may be taking. The only way to know your true BAC is with a calibrated breathalyzer or blood test.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How does gender affect BAC?</AccordionTrigger>
                        <AccordionContent>
                          On average, women have a higher percentage of body fat and less body water than men of the same weight. Since alcohol is water-soluble, it becomes more concentrated in a woman's body, leading to a higher BAC from the same amount of alcohol. This is why the formula uses a different gender constant.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
