import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const conversionChart = [
  { decimal: 0.0625, fraction: "1/16" },
  { decimal: 0.125, fraction: "1/8" },
  { decimal: 0.1875, fraction: "3/16" },
  { decimal: 0.25, fraction: "1/4" },
  { decimal: 0.3125, fraction: "5/16" },
  { decimal: 0.375, fraction: "3/8" },
  { decimal: 0.4375, fraction: "7/16" },
  { decimal: 0.5, fraction: "1/2" },
  { decimal: 0.5625, fraction: "9/16" },
  { decimal: 0.625, fraction: "5/8" },
  { decimal: 0.6875, fraction: "11/16" },
  { decimal: 0.75, fraction: "3/4" },
  { decimal: 0.8125, fraction: "13/16" },
  { decimal: 0.875, fraction: "7/8" },
  { decimal: 0.9375, fraction: "15/16" },
];


export default function AboutDecimalToInchesCalculator() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle as="h2">How to Manually Convert Decimal to Inches</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>To convert a decimal to an inch fraction, you can follow these simple steps:</p>
                    <ol>
                        <li>Separate the whole number from the decimal part. The whole number will be your whole inches.</li>
                        <li>Multiply the decimal part by your desired denominator (e.g., 16 for a precision of 1/16"). This result will be your numerator.</li>
                        <li>Place the numerator over the denominator.</li>
                        <li>Simplify the fraction by finding the greatest common divisor (GCD) and dividing both the numerator and denominator by it.</li>
                    </ol>
                    <p><strong>Example: Convert 2.75 to the nearest 1/16"</strong></p>
                    <ol>
                        <li>The whole number is <strong>2</strong>.</li>
                        <li>The decimal part is <strong>0.75</strong>. Multiply by 16: `0.75 * 16 = 12`.</li>
                        <li>The initial fraction is `12/16`.</li>
                        <li>The GCD of 12 and 16 is 4. Simplify: `12 ÷ 4 / 16 ÷ 4 = 3/4`.</li>
                        <li>Combine the parts: <strong>2 3/4"</strong>.</li>
                    </ol>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle as="h3">Common Decimal to Inch Fraction Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Decimal</TableHead>
                                <TableHead>Inch Fraction</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {conversionChart.map((item) => (
                                <TableRow key={item.decimal}>
                                    <TableCell>{item.decimal}"</TableCell>
                                    <TableCell>{item.fraction}"</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle as="h3">Decimal to Inches FAQs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Why is precision important in these conversions?</AccordionTrigger>
                            <AccordionContent>
                                Precision determines the smallest fraction you are measuring to. For woodworking or machining, higher precision like 1/32" is often necessary for accurate fits. For general measurements, a lower precision like 1/8" or 1/4" may be sufficient.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What fields use decimal to inch conversions?</AccordionTrigger>
                            <AccordionContent>
                               This conversion is crucial in many fields that use the Imperial system, including woodworking, construction, machining, and engineering. It allows for easy translation between digital plans (often in decimals) and physical measurements made with a tape measure.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-3">
                            <AccordionTrigger>How do you convert a number with feet and inches into a decimal?</AccordionTrigger>
                            <AccordionContent>
                                To convert from feet and inches to a decimal, first convert the feet to inches (1 foot = 12 inches). Add this to the inch measurement. Then, if there is a fraction, convert it to a decimal by dividing the numerator by the denominator. Add this decimal to your total inches. For example, 2' 6 1/2" becomes (2 * 12) + 6 + (1/2) = 24 + 6 + 0.5 = 30.5".
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
