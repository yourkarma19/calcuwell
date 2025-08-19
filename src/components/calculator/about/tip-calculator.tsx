import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTipCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Tip Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our Tip Calculator is a simple and convenient tool for calculating the gratuity on a service bill and splitting the total cost among a group of people. It takes the guesswork out of dining out, ensuring you can quickly and accurately figure out what everyone owes without any hassle.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the total **Bill Amount**.</li>
                    <li>Use the slider to select the **Tip Percentage** you'd like to leave.</li>
                    <li>Adjust the slider for the **Number of People** to split the bill with.</li>
                </ol>
                <p>The calculator will instantly display the tip amount, the total bill including the tip, and the amount each person should pay.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a standard tip percentage?</AccordionTrigger>
                        <AccordionContent>
                            Tipping customs vary by country and service type. In the United States, for example, a standard tip for restaurant service is typically between 15% and 20% of the pre-tax bill. 15% is often considered average, while 20% or more is for excellent service.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Should I tip on the pre-tax or post-tax amount?</AccordionTrigger>
                        <AccordionContent>
                            It is customary to calculate the tip based on the subtotal of the bill, before sales tax is added. However, some people prefer to tip on the total amount for simplicity. This calculator calculates the tip based on the bill amount you enter.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How does the "split the bill" feature work?</AccordionTrigger>
                        <AccordionContent>
                           The calculator first adds the tip amount to the total bill. It then divides that new total evenly by the number of people you specify. This gives you the exact amount each person needs to contribute to cover their share of the bill and the tip.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
