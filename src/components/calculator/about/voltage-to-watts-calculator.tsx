
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutVoltageToWattsCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">Converting Volts to Watts</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator helps you understand the relationship between voltage, current, and power. By converting volts and amps to watts, you can determine how much power an electrical device is consuming. This is a fundamental calculation in electronics, essential for ensuring safety and proper functionality of circuits. Understanding this relationship is key for anyone from DIY hobbyists to professional electrical engineers.</p>
                
                <h3>How to Convert Volts to Watts</h3>
                <p>The conversion is based on Watt's Law, which states that power is the product of voltage and current. To use this calculator, simply input the voltage (in Volts) and the current (in Amps) of your circuit, and it will instantly compute the power in Watts.</p>
                <p className="font-mono bg-muted p-2 rounded-md text-center my-2">Power (Watts) = Voltage (Volts) × Current (Amps)</p>
                <p className="text-center font-bold">P = V × I</p>

                <h3>Electrical Definitions</h3>
                <ul>
                    <li><strong>What is a Volt?</strong> A Volt (V) is the unit of electric potential difference or "electrical pressure" in a circuit. It represents the potential energy difference between two points.</li>
                    <li><strong>What is an Amp?</strong> An Ampere or Amp (A) is the unit of electrical current, representing the rate of flow of electric charge. It is the amount of charge flowing past a point per unit time.</li>
                    <li><strong>What is a Watt?</strong> A Watt (W) is the unit of electrical power, representing the rate at which electrical energy is transferred or consumed. One Watt is equivalent to one Joule per second.</li>
                </ul>

                <h3>Worked Example</h3>
                <p>If you have a device running on a 12V power supply and it draws 2A of current, the power consumption is calculated as follows:</p>
                <p className="font-mono bg-muted p-2 rounded-md">12V × 2A = 24W</p>
                <p>This means the device consumes 24 Watts of power.</p>

                <h3>When to Use This Calculation</h3>
                <ul>
                    <li><strong>Home Appliances:</strong> Understanding the power consumption of devices like microwaves or hair dryers to avoid overloading circuits.</li>
                    <li><strong>Automotive Electronics:</strong> Calculating power for car audio systems or custom lighting installations.</li>
                    <li><strong>Solar Panel Systems:</strong> Determining the power output of solar panels based on their voltage and current ratings under specific conditions.</li>
                    <li><strong>Electronics Projects:</strong> Ensuring your power supply can handle the load of your components and selecting appropriate wire gauges.</li>
                </ul>

                <h3>Voltage to Watts FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Can you convert volts to watts without amps?</AccordionTrigger>
                        <AccordionContent>
                            No, you cannot directly convert volts to watts without knowing either the current (amps) or the resistance (ohms). Power (Watts) is a measure of work being done, which depends on both the electrical pressure (Volts) and the flow rate (Amps). If you know the resistance instead of the current, you can use an alternative form of the power formula: P = V² / R.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the difference between a watt and a kilowatt?</AccordionTrigger>
                        <AccordionContent>
                            A kilowatt (kW) is simply a larger unit of power, where one kilowatt is equal to 1,000 watts. This unit is often used for high-power devices, such as electric vehicle chargers, or to measure household energy consumption on utility bills (as kilowatt-hours).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
