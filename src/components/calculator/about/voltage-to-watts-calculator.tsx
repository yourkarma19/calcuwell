
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutVoltageToWattsCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>Converting Volts to Watts</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator helps you understand the relationship between voltage, current, and power. By converting volts and amps to watts, you can determine how much power an electrical device is consuming. This is a fundamental calculation in electronics.</p>
                
                <h2>How to Convert Volts to Watts</h2>
                <p>The conversion is based on Watt's Law, which states that power is the product of voltage and current.</p>
                <p className="font-mono bg-muted p-2 rounded-md text-center my-2">Power (Watts) = Voltage (Volts) × Current (Amps)</p>
                <p className="text-center font-bold">P = V × I</p>

                <h3>Definitions</h3>
                <ul>
                    <li><strong>What is a Volt?</strong> A Volt (V) is the unit of electric potential difference or "electrical pressure" in a circuit.</li>
                    <li><strong>What is an Amp?</strong> An Ampere or Amp (A) is the unit of electrical current, representing the rate of flow of electric charge.</li>
                    <li><strong>What is a Watt?</strong> A Watt (W) is the unit of electrical power, representing the rate at which electrical energy is transferred.</li>
                </ul>

                <h3>Worked Example</h3>
                <p>If you have a device running on a 12V power supply and it draws 2A of current, the power consumption is:</p>
                <p className="font-mono bg-muted p-2 rounded-md">12V × 2A = 24W</p>

                <h2>When to Use This Calculation</h2>
                <ul>
                    <li><strong>Home Appliances:</strong> Understanding the power consumption of devices like microwaves or hair dryers.</li>
                    <li><strong>Automotive Electronics:</strong> Calculating power for car audio systems or lighting.</li>
                    <li><strong>Solar Panel Systems:</strong> Determining the power output of solar panels based on their voltage and current ratings.</li>
                    <li><strong>Electronics Projects:</strong> Ensuring your power supply can handle the load of your components.</li>
                </ul>

                <h2>Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Can you convert volts to watts without amps?</AccordionTrigger>
                        <AccordionContent>
                            No, you cannot directly convert volts to watts without knowing the current (amps). Watts are a measure of power, which depends on both the electrical pressure (volts) and the flow rate (amps). If you know the resistance (Ohms) instead of the current, you can use the formula P = V² / R.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the difference between a watt and a kilowatt?</AccordionTrigger>
                        <AccordionContent>
                            A kilowatt (kW) is simply a larger unit of power. One kilowatt is equal to 1,000 watts. This unit is often used for high-power devices or to measure household energy consumption.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

  