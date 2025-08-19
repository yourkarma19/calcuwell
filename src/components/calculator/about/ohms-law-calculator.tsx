import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutOhmsLawCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Ohm's Law Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>The **Ohm's Law Calculator** is a vital tool for anyone working with electronics, from students to engineers. It helps you find the relationship between **Voltage (V)**, **Current (I)**, **Resistance (R)**, and **Power (P)** in a circuit. Just enter any two values, and the calculator will instantly find the other two for you.</p>
              <h3>How to Use the Calculator</h3>
              <ol>
                  <li>First, select the value you want to solve for (e.g., Voltage).</li>
                  <li>Enter any two of the other known values.</li>
              </ol>
              <p>The calculator will automatically show the correct result. This is useful for designing and testing circuits.</p>
              <h3>Frequently Asked Questions (FAQs)</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Ohm's Law?</AccordionTrigger>
                  <AccordionContent>
                    Ohm's Law is a basic rule in electronics that connects voltage, current, and resistance. The formula is `V = I × R`. It says that the voltage across a component is equal to the current flowing through it multiplied by its resistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>The Ohm's Law Triangle</AccordionTrigger>
                  <AccordionContent>
                    An easy way to remember the formulas is to use a triangle. Cover the value you want to find, and the other two will show you the calculation:
                    <ul className="list-disc pl-5 mt-2">
                      <li>**Find Voltage (V):** Cover V, leaving I × R.</li>
                      <li>**Find Current (I):** Cover I, leaving V / R.</li>
                      <li>**Find Resistance (R):** Cover R, leaving V / I.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What about Power (P)?</AccordionTrigger>
                  <AccordionContent>
                    Power (in Watts) is the rate of energy use in a circuit. It is related to Ohm's Law by formulas like `P = V × I`. Our calculator can also solve for power using any two of the other values.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Why is Ohm's Law important?</AccordionTrigger>
                  <AccordionContent>
                    This law is essential for designing and troubleshooting circuits. It helps engineers choose the right parts, manage current safely, and find problems in electronic devices.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
        </Card>
    );
}
