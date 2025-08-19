import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutStandardDeviationCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Standard Deviation</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **Standard Deviation Calculator** is a tool that measures how spread out a set of numbers is. It tells you if the numbers in your data are close to the average or far apart. This calculator gives you both the population and sample standard deviation, so you have the right tool for any dataset.</p>
                
                <h3>How to Use the Calculator</h3>
                <p>Enter your list of numbers into the text box, separated by commas or spaces. The calculator will automatically find the standard deviation, variance, and mean for your data.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is Standard Deviation?</AccordionTrigger>
                        <AccordionContent>
                            <p>Standard deviation shows how much the values in a data set vary from the average (mean). A low standard deviation means the numbers are clustered close to the average. A high standard deviation means the numbers are spread out over a wider range.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Sample vs. Population: What's the Difference?</AccordionTrigger>
                        <AccordionContent>
                            <p>Use **Population** standard deviation (σ) if your data includes every member of a group (e.g., all students in one class). Use **Sample** standard deviation (s) if your data is a smaller part of a larger group (e.g., 50 students from a school of 500). The sample formula is slightly different to give a better estimate.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What does a high or low value mean?</AccordionTrigger>
                        <AccordionContent>
                           <p>A **low** standard deviation means the data is consistent and reliable. A **high** standard deviation means the data is more variable and less consistent.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger className="font-semibold">Why is this important?</AccordionTrigger>
                        <AccordionContent>
                           <p>It's used in many fields. In finance, it measures an investment's risk. In manufacturing, it helps with quality control. In science, it shows if experimental results are meaningful.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
