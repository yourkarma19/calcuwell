import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const bmiCategories = [
    { range: "< 18.5", category: "Underweight" },
    { range: "18.5 - 24.9", category: "Normal weight" },
    { range: "25.0 - 29.9", category: "Overweight" },
    { range: "30.0+", category: "Obesity" },
];


export default function AboutBMICalculator() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>About the BMI Calculator</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>The <strong>Body Mass Index (BMI)</strong> is a simple way to check if your weight is healthy for your height. It's a screening tool that can help find potential weight problems for adults. Our calculator makes it easy to find your BMI using either metric or imperial units.</p>

                    <h3>How to Use the BMI Calculator</h3>
                    <ol>
                        <li>Select your unit system (<strong>Metric</strong> or <strong>Imperial</strong>).</li>
                        <li>Enter your <strong>Weight</strong>.</li>
                        <li>Enter your <strong>Height</strong>. If using imperial units, give both feet and inches.</li>
                        <li>Your BMI result and weight category will be shown automatically.</li>
                    </ol>
                    
                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold">What is a healthy BMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>According to the World Health Organization (WHO), a healthy BMI for most adults is between <strong>18.5 and 24.9</strong>. A BMI below 18.5 is underweight, 25.0 to 29.9 is overweight, and 30.0 or higher is obesity. You can see the full range in the BMI Categories table.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="font-semibold">How is BMI calculated?</AccordionTrigger>
                            <AccordionContent>
                                <p>The formula for BMI is your weight in kilograms divided by your height in meters squared (`kg/m²`). For imperial units, the formula is `(weight in lbs / (height in inches)²) * 703`. Our calculator does these conversions for you.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="font-semibold">What are the limits of BMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>While useful, BMI is not a perfect measure. It does not separate fat from muscle. For example, very muscular people (like athletes) may have a high BMI but low body fat. It also may not be accurate for some ethnic groups, pregnant women, or the elderly. It should be used as a general guide. You should see a doctor for a complete health check.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>BMI Categories (WHO)</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>BMI Range</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bmiCategories.map((item) => (
                    <TableRow key={item.category}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.range}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                <p className="text-xs text-muted-foreground mt-2">Note: BMI is a screening tool and does not diagnose body fatness or health. Consult a healthcare provider for a complete assessment.</p>
            </CardContent>
            </Card>
        </div>
    )
}
