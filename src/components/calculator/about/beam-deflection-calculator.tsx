
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBeamDeflectionCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Beam Deflection</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Beam Deflection Calculator is an engineering tool used to determine the maximum displacement of a simple cantilever beam under a point load. A cantilever beam is one that is supported only at one end. This calculation is crucial for structural engineers to ensure that a beam can safely support its intended load without bending excessively.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Load (P)** in Newtons that is being applied to the very end of the beam.</li>
                    <li>Enter the total **Length (L)** of the beam in meters.</li>
                    <li>Enter the **Modulus of Elasticity (E)** for the beam's material in Gigapascals (GPa). This value represents the material's stiffness. For example, steel is around 200 GPa.</li>
                    <li>Enter the **Area Moment of Inertia (I)** of the beam's cross-section in meters to the fourth power (m⁴). This value represents the beam's resistance to bending due to its shape.</li>
                </ol>
                <p>The calculator will instantly compute the maximum deflection at the end of the beam.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the formula used?</AccordionTrigger>
                        <AccordionContent>
                           For a simple cantilever beam with a point load at the free end, the formula for maximum deflection is:
                           <p className="font-mono bg-muted p-2 rounded-md text-center my-2">Deflection = (P * L³) / (3 * E * I)</p>
                           Where P is the load, L is the length, E is the Modulus of Elasticity, and I is the Area Moment of Inertia.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is this calculation important?</AccordionTrigger>
                        <AccordionContent>
                            Understanding beam deflection is critical in structural engineering for safety and functionality. Excessive deflection can lead to structural failure, damage to attached finishes (like drywall or windows), or create an unstable feeling in a building. Engineers use this calculation to select the appropriate beam size and material for a given span and load.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
