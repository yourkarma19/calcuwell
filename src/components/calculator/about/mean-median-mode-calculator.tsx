
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutMeanMedianModeCalculator() {
    return (
       <Card>
        <CardHeader><CardTitle>Understanding Mean, Median, and Mode</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Mean, Median, and Mode Calculator** is a fundamental statistical tool that helps you understand the center of a numerical dataset. These three measures—mean, median, and mode—are all different ways of describing what's "typical" or "average" in a set of numbers. This calculator not only gives you the answers instantly but also calculates the sum and count of your data.</p>
            
            <h3>How to Use the Calculator</h3>
            <p>Simply enter your set of numbers into the text box. You can separate the numbers with commas, spaces, or line breaks. The calculator will process the data and display the results for mean, median, mode, sum, and count in real-time.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">Mean vs. Median vs. Mode: What's the Difference?</AccordionTrigger>
                    <AccordionContent>
                        <p>The **mean** is the arithmetic average of all numbers in a data set (the sum of the numbers divided by the count). The **median** is the middle value when the data is sorted in ascending order. The **mode** is the number that appears most frequently in the set.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">When should I use mean vs. median?</AccordionTrigger>
                    <AccordionContent>
                        <p>Use the **mean** for data that is symmetrically distributed (like test scores or heights), where there are no extreme outliers. Use the **median** for skewed data, such as income levels or house prices, because it isn't affected by a few extremely high or low values. The median gives a better sense of the "typical" value in such cases.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold">How do you calculate each measure manually?</AccordionTrigger>
                    <AccordionContent>
                       <ul className="list-disc pl-5">
                            <li>**Mean:** Add up all the numbers and divide by how many numbers there are.</li>
                            <li>**Median:** Sort the numbers from smallest to largest. If there's an odd number of values, the median is the one in the middle. If there's an even number, the median is the average of the two middle numbers.</li>
                            <li>**Mode:** Count how many times each number appears. The number that appears most often is the mode.</li>
                       </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold">What if there is no mode?</AccordionTrigger>
                    <AccordionContent>
                       <p>If no number in the dataset repeats, then there is no mode. A dataset can also have more than one mode (bimodal or multimodal) if multiple numbers appear with the same highest frequency. This calculator will display all modes if they exist, or "N/A" if no mode is found.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}
