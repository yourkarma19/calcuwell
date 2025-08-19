
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutProportionCalculator() {
    return (
      <Card>
          <CardHeader><CardTitle>About Proportions</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Proportion Calculator** is a powerful tool for solving equations involving two equivalent ratios. A proportion is a statement that two fractions are equal, written as A/B = C/D. This calculator allows you to find the missing value in the equation, making it invaluable for students, cooks, engineers, and anyone who needs to scale quantities.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter any three known values into the boxes for A, B, C, and D.</li>
                <li>The calculator will automatically solve for the fourth, missing value.</li>
                <li>To solve for a different value, simply click on its input box, and it will become the new result field.</li>
            </ol>
            <p>The tool uses cross-multiplication to deliver an instant and accurate answer.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">How do you solve proportions using cross-multiplication?</AccordionTrigger>
                    <AccordionContent>
                        <p>Cross-multiplication is the standard method to solve a proportion. For the equation A/B = C/D, you multiply the numerator of the first fraction by the denominator of the second (A × D) and set it equal to the product of the other two (B × C). This gives you the equation A × D = B × C. From there, you can use simple algebra to solve for the unknown variable.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">What are some real-world examples of proportions?</AccordionTrigger>
                    <AccordionContent>
                       <p>Proportions are used everywhere in daily life, often without us even realizing it. Common examples include:</p>
                        <ul class='list-disc pl-5 mt-2'>
                          <li>**Cooking:** Scaling a recipe up or down. If a recipe for 4 people needs 2 cups of flour, you can use a proportion to find how much flour is needed for 6 people.</li>
                          <li>**Maps:** Reading a map's scale. If 1 inch on the map equals 10 miles in reality, you can calculate the actual distance between two points.</li>
                          <li>**Finance:** Calculating fuel consumption for a trip or determining the price of items sold by weight.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold">What is the difference between a ratio and a proportion?</AccordionTrigger>
                    <AccordionContent>
                       <p>A **ratio** is a comparison of two numbers (e.g., A:B or A/B), showing their relative size. A **proportion** is an equation that states that two ratios are equal (e.g., A/B = C/D). In essence, a proportion is an equation built from two equal ratios. You can't have a proportion without ratios.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </CardContent>
      </Card>
    );
}
