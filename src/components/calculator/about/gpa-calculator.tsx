import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutGpaCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About GPA Calculation</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>A GPA (Grade Point Average) is a standard way to measure academic success. It&apos;s a number that shows your average grade, weighted by the number of credits for each course.</p>
                <h3>How to Use This GPA Tool</h3>
                <p>Simply enter your courses, the grade you received, and the number of credits for each course. The calculator will then compute your GPA for you.</p>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is GPA?</AccordionTrigger>
                        <AccordionContent>
                            Grade Point Average (GPA) is a number that represents the average of your course grades. It&apos;s a common way to measure academic achievement in schools and universities.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is GPA Calculated?</AccordionTrigger>
                        <AccordionContent>
                            Each letter grade is given a point value (e.g., A=4.0, B=3.0). This value is multiplied by the number of credits for that course to get &quot;quality points.&quot; All quality points are added up and then divided by the total number of credits to find the GPA.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is a &quot;Weighted&quot; vs. &quot;Unweighted&quot; GPA?</AccordionTrigger>
                        <AccordionContent>
                           An **unweighted GPA** is on a 4.0 scale, where an &apos;A&apos; is always 4.0. A **weighted GPA** gives extra points for harder classes, like Honors or AP courses. An &apos;A&apos; in an AP class might be worth 5.0 points. This calculator computes an unweighted GPA.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
