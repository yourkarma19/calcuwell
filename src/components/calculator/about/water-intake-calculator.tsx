import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutWaterIntakeCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Daily Water Intake</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Daily Water Intake Calculator provides a personalized recommendation for your daily fluid needs. Proper hydration is essential for nearly every bodily function, including regulating temperature, lubricating joints, and removing waste. This tool uses common formulas based on age, weight, and activity level to give you a solid baseline for your hydration goals.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Age** in years.</li>
                    <li>Enter your **Weight** in kilograms.</li>
                    <li>Select the **Activity Level** that best describes your typical day.</li>
                </ol>
                <p>The calculator will display your estimated daily water requirement in liters.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is this the exact amount I must drink?</AccordionTrigger>
                        <AccordionContent>
                           No, this is a general guideline. Your individual needs can vary based on factors like the climate you live in, your overall health, and specific medical conditions. It's a great starting point, but the best indicator is to drink when you feel thirsty and monitor the color of your urine (it should be light yellow).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does this include water from food and other drinks?</AccordionTrigger>
                        <AccordionContent>
                           This estimate is for total fluid intake. You get about 20% of your daily water from solid foods, especially fruits and vegetables. Other beverages like milk, juice, and herbal tea also count towards your total. However, water is the best source of hydration as it is calorie-free.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why is hydration so important?</AccordionTrigger>
                        <AccordionContent>
                           Adequate hydration is critical for physical and mental performance. Even mild dehydration can lead to fatigue, headaches, reduced concentration, and impaired physical coordination. Proper fluid intake supports nutrient transport, waste removal, and overall cellular health.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
