import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

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
                    <p>The <strong>Body Mass Index (BMI)</strong> is a widely used measure to gauge whether your weight is healthy in proportion to your height. It's a simple screening tool that can help identify potential weight-related health issues for adults. Our calculator makes it easy to find your BMI using either metric or imperial units.</p>

                    <h3>How to Use the BMI Calculator</h3>
                    <ol>
                        <li>Select your preferred unit system (<strong>Metric</strong> for kilograms & centimeters or <strong>Imperial</strong> for pounds & feet/inches).</li>
                        <li>Enter your current <strong>Weight</strong>.</li>
                        <li>Enter your <strong>Height</strong>.</li>
                        <li>Your BMI result and corresponding weight category will be shown automatically.</li>
                    </ol>
                    
                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold">What is a healthy BMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>According to the World Health Organization (WHO), a healthy BMI for most adults is between <strong>18.5 and 24.9</strong>. A BMI below 18.5 is considered underweight, 25.0 to 29.9 is overweight, and 30.0 or higher is categorized as obesity. You can see the full range in the BMI Categories table.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="font-semibold">How is BMI calculated?</AccordionTrigger>
                            <AccordionContent>
                                <p>The formula for BMI is your weight in kilograms divided by the square of your height in meters (`kg/m²`). For imperial units, the formula is `(weight in lbs / (height in inches)²) * 703`. Our calculator handles these conversions for you automatically.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="font-semibold">What are the limitations of BMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>While BMI is a useful population-level indicator, it has limitations for individuals. It does not differentiate between fat and muscle mass. For example, very muscular people (like athletes) may have a high BMI due to muscle weight and still have very low body fat. It may also be less accurate for certain ethnic groups, pregnant women, or the elderly. It should be used as a general screening tool, and a healthcare provider should be consulted for a complete health assessment.</p>
                                <p>For a more detailed look at your body composition, consider using our <Link href="/calculators/body-fat-percentage-calculator" className="text-primary hover:underline">Body Fat Percentage Calculator</Link> or <Link href="/calculators/lean-body-mass-calculator" className="text-primary hover:underline">Lean Body Mass Calculator</Link>.</p>
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
