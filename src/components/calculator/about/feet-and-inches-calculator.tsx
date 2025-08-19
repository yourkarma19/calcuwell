import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutFeetAndInchesCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">Working with Feet and Inches</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <h2>How to Use the Feet and Inches Calculator</h2>
                <ol>
                    <li>Enter your first measurement in the 'Feet' and 'Inches' boxes.</li>
                    <li>Select the operation you want to perform (Add, Subtract, Multiply, or Divide).</li>
                    <li>Enter your second measurement.</li>
                    <li>Click the 'Calculate' button to see the result.</li>
                </ol>

                <h2>Example: How to Add Feet and Inches Manually</h2>
                <p>Let's add 5' 7" + 2' 10":</p>
                <ol>
                    <li><strong>Add the inches:</strong> 7" + 10" = 17".</li>
                    <li><strong>Convert excess inches to feet:</strong> Since there are 12 inches in a foot, 17" becomes 1 foot and 5 inches.</li>
                    <li><strong>Add the feet:</strong> 5' + 2' + 1' (from the inches conversion) = 8'.</li>
                    <li><strong>Combine the results:</strong> The final answer is 8' 5".</li>
                </ol>

                <h2>Common Uses for this Calculator</h2>
                <ul>
                    <li><strong>Construction & Carpentry:</strong> Calculating material lengths and room dimensions.</li>
                    <li><strong>Interior Design:</strong> Planning furniture placement and room layouts.</li>
                    <li><strong>DIY Home Projects:</strong> Measuring for flooring, wallpaper, or framing.</li>
                    <li><strong>Gardening & Landscaping:</strong> Laying out garden beds, pathways, or fencing.</li>
                </ul>

                <h2>Feet and Inches FAQs</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do you multiply feet and inches?</AccordionTrigger>
                        <AccordionContent>
                            The easiest way is to convert both measurements entirely into inches, multiply them, and then convert the result back to feet and inches. This calculator handles that conversion for you. Note that multiplying two length measurements results in an area (square inches).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do you convert decimal inches to fractions?</AccordionTrigger>
                        <AccordionContent>
                           To convert a decimal to a fraction, you can use a conversion chart or a calculator. For example, 0.5 inches is 1/2", 0.25 inches is 1/4", and 0.75 inches is 3/4". This is common for woodworking and other precise crafts.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How many inches are in a foot?</AccordionTrigger>
                        <AccordionContent>
                            There are exactly 12 inches in one foot.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
