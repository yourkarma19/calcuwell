import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUnitConverter() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>About the Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our Universal Unit Converter is a powerful tool for a wide range of measurement conversions. From length and weight to energy and pressure, this calculator is an essential utility for students, professionals, and anyone who needs to work with different measurement systems.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>First, select the Conversion Type (e.g., Length, Weight, Temperature).</li>
                <li>Enter the value you wish to convert in the "From" field.</li>
                <li>Select the starting unit and the target unit from the dropdown menus.</li>
            </ol>
            <p>The result of the conversion will be displayed instantly. Use the swap button to quickly reverse the units.</p>
            <h3>Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the SI system?</AccordionTrigger>
                    <AccordionContent>
                        The International System of Units (SI) is the modern form of the metric system. It is the most widely used system of measurement. This calculator uses SI base units (like the meter for length) to perform conversions accurately.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How does temperature conversion work?</AccordionTrigger>
                    <AccordionContent>
                        Temperature conversion does not use a simple multiplication factor. It uses specific formulas to convert between Celsius, Fahrenheit, and Kelvin. This is because their scales have different starting points and interval sizes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Imperial vs. Metric systems?</AccordionTrigger>
                    <AccordionContent>
                       The **Metric system** is a decimal-based system used by most of the world, with units like meters, grams, and liters. The **Imperial system** is mainly used in the United States and includes units like feet, pounds, and gallons. This converter allows for easy translation between both systems.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}