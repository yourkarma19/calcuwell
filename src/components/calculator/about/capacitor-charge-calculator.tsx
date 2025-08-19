import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCapacitorChargeCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About RC Circuits</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator helps you understand what happens in a simple RC circuit, which is a circuit with a resistor and a capacitor. When you apply voltage, the capacitor starts to store energy, or "charge." This tool shows you how much charge it has and the current flowing at any given time.</p>
                <h3>How to Use It</h3>
                <p>Enter the voltage of your power source, the resistance, the capacitance, and the amount of time that has passed since the circuit was turned on. The calculator will do the rest.</p>
                
                <h3>Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is an RC circuit?</AccordionTrigger>
                        <AccordionContent>
                            An RC circuit is a basic electronic circuit made of a Resistor (R) and a Capacitor (C). These circuits are often used as timers or filters because the capacitor takes a predictable amount of time to charge and discharge through the resistor.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the time constant (τ)?</AccordionTrigger>
                        <AccordionContent>
                            The time constant (tau, or τ) tells you how quickly the capacitor charges. It's calculated by multiplying the resistance by the capacitance (τ = R × C). After one time constant, the capacitor is about 63.2% charged. It is considered fully charged after about five time constants.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How does current change over time?</AccordionTrigger>
                        <AccordionContent>
                           When the circuit is first turned on, the current is at its highest because the capacitor is empty. As the capacitor charges up, the current decreases, eventually reaching zero when the capacitor is full.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
