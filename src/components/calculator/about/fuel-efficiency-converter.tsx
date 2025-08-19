import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutFuelEfficiencyConverter() {
    return (
        <Card>
            <CardHeader><CardTitle>About Fuel Efficiency</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Fuel Efficiency Converter is a practical tool for car owners, travelers, and anyone interested in automotive metrics. It helps you translate between the two most common ways of measuring a vehicle's fuel economy: **Miles per Gallon (MPG)** and **Liters per 100 kilometers (L/100km)**. Since different countries and manufacturers use different standards, this tool makes it easy to compare vehicles on a level playing field.</p>
                <h3>How to Use the Converter</h3>
                <ol>
                    <li>Enter a value in the first input box.</li>
                    <li>The converted value will appear automatically in the second box.</li>
                    <li>Use the **Swap button** to instantly reverse the conversion direction (e.g., switch from MPG to L/100km to the other way around).</li>
                </ol>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>MPG vs. L/100km: What's the Difference?</AccordionTrigger>
                        <AccordionContent>
                           <p>The main difference is that one measures distance per unit of fuel, while the other measures fuel per unit of distance. This means they have an inverse relationship.</p>
                           <p><strong>MPG (Miles Per Gallon):</strong> This unit is common in the United States. It tells you how far a vehicle can travel on a single gallon of fuel. For MPG, a **higher number is better**, as it means the car is more efficient.</p>
                           <p><strong>L/100km (Liters per 100 kilometers):</strong> This unit is standard in Europe, Canada, and many other parts of the world. It tells you how many liters of fuel a car consumes to travel 100 kilometers. For L/100km, a **lower number is better**.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is my car's real-world MPG different from the advertised rating?</AccordionTrigger>
                        <AccordionContent>
                            Official fuel economy ratings are achieved in specific, controlled laboratory conditions. Real-world fuel efficiency can be affected by many factors, including your driving style (e.g., aggressive acceleration), road conditions (city vs. highway), tire pressure, vehicle load, and weather.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}