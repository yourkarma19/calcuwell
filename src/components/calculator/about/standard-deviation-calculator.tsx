
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutStandardDeviationCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Standard Deviation</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **Standard Deviation Calculator** is a powerful statistical tool that measures the amount of variation or dispersion of a set of values. It helps you understand how spread out your data is from the average (mean). This calculator provides both the population and sample standard deviation, giving you the right tool for any type of dataset.</p>
                
                <h3>How to Use the Calculator</h3>
                <p>Enter your dataset into the text box. The numbers can be separated by commas, spaces, or line breaks. The calculator will automatically compute the standard deviation, variance, and mean of your data.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is Standard Deviation, in Simple Terms?</AccordionTrigger>
                        <AccordionContent>
                            <p>Standard deviation is a measure of how spread out numbers in a data set are from their average (mean). A low standard deviation means the numbers are very close to the average, indicating consistency. A high standard deviation means the numbers are spread out over a wider range, indicating variability. For example, the test scores {85, 88, 90} have a low standard deviation, while {60, 85, 100} have a high one.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">What's the Difference Between Sample and Population Standard Deviation?</AccordionTrigger>
                        <AccordionContent>
                            <p>You should use **Population standard deviation (σ)** when your data represents the entire group you are interested in (e.g., the test scores of every student in a single class). You should use **Sample standard deviation (s)** when your data is a smaller sample of a larger population (e.g., the test scores of 50 students from a school of 500). The sample formula uses `n-1` in the denominator, which provides a better, unbiased estimate of the true population deviation.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What does a high or low standard deviation tell me?</AccordionTrigger>
                        <AccordionContent>
                           <p>A **low standard deviation** indicates that the data points tend to be very close to the mean, meaning the data is consistent and reliable. A **high standard deviation** indicates that the data points are spread out over a large range of values, suggesting more variability and less consistency.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger className="font-semibold">Why is standard deviation important?</AccordionTrigger>
                        <AccordionContent>
                           <p>It's crucial in many fields. In finance, it measures the volatility of an investment. In manufacturing, it's used for quality control to ensure products are consistent. In science, it helps determine if the results of an experiment are statistically significant.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
