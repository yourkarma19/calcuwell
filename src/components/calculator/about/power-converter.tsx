import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPowerConverter() {
    return (
        <Card>
            <CardHeader><CardTitle>About Power Conversion</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Power Converter is an essential tool for engineers, physicists, and students who need to work with different units of power. Power is the rate at which work is done or energy is transferred. This calculator allows for quick and accurate conversion between various common units, such as watts, kilowatts, and horsepower.</p>
                <h3>How to Use the Converter</h3>
                <ol>
                    <li>Enter the value you want to convert in the "From" field.</li>
                    <li>Select the unit you are converting from.</li>
                    <li>Select the unit you want to convert to.</li>
                </ol>
                <p>The converted value will be displayed instantly. Use the swap button to easily reverse the units.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a Watt?</AccordionTrigger>
                        <AccordionContent>
                            The **Watt (W)** is the standard unit of power in the International System of Units (SI). One watt is defined as one joule of energy per second. It is commonly used to measure the output of electrical devices, like light bulbs and appliances. A **kilowatt (kW)** is simply 1,000 watts.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is Horsepower?</AccordionTrigger>
                        <AccordionContent>
                            **Horsepower (hp)** is an older unit of power that is still widely used, especially in the automotive industry to describe the power output of engines. There are different types of horsepower, but the most common, mechanical horsepower, is equivalent to approximately 745.7 watts.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Power vs. Energy: What's the difference?</AccordionTrigger>
                        <AccordionContent>
                           Power and energy are related but distinct concepts. **Energy** is the capacity to do work (measured in joules or kWh), while **Power** is the rate at which energy is used (measured in watts or joules per second). For example, a 100-watt light bulb uses 100 joules of energy every second it is on.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}