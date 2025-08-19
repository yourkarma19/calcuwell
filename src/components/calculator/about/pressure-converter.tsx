import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPressureConverter() {
    return (
        <Card>
            <CardHeader><CardTitle>About Pressure Units</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Pressure Converter is a versatile tool for scientists, engineers, and students who need to work with different units of pressure. Pressure is defined as the force applied perpendicular to the surface of an object per unit area. This calculator allows you to quickly convert between various metric and imperial units of pressure.</p>
                <h3>How to Use the Converter</h3>
                <ol>
                    <li>Enter the value you wish to convert in the "From" field.</li>
                    <li>Select the unit you are converting from (e.g., psi).</li>
                    <li>Select the unit you want to convert to (e.g., bar).</li>
                </ol>
                <p>The result will be calculated and displayed instantly. Use the swap button to reverse the direction of the conversion.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the standard unit of pressure?</AccordionTrigger>
                        <AccordionContent>
                            The standard SI (International System of Units) unit for pressure is the **Pascal (Pa)**. One pascal is a very small amount of pressure, defined as one newton of force per square meter. Because it's so small, it's often more convenient to use **kilopascals (kPa)**, where 1 kPa = 1,000 Pa.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Common Pressure Units Explained</AccordionTrigger>
                        <AccordionContent>
                            <p><strong>Bar:</strong> One bar is exactly 100,000 Pa and is very close to the average atmospheric pressure on Earth, making it a common unit in meteorology.</p>
                            <p><strong>Atmosphere (atm):</strong> A standard atmosphere is a unit of pressure defined as exactly 101,325 Pa. It represents the average atmospheric pressure at sea level.</p>
                            <p><strong>PSI (Pounds per square inch):</strong> This is the standard unit of pressure in the imperial system, widely used in the United States for applications like measuring tire pressure.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}