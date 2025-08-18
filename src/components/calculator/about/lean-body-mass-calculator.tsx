
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutLeanBodyMassCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Lean Body Mass</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is Lean Body Mass (LBM)?</AccordionTrigger>
                    <AccordionContent>
                    Lean Body Mass is the total weight of your body minus all the weight due to fat mass. LBM includes the weight of your bones, muscles, organs, and water.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is LBM important?</AccordionTrigger>
                    <AccordionContent>
                    Tracking LBM is often more useful than tracking body weight alone, as it can help you understand if you are losing fat, gaining muscle, or both. It's a key metric for athletes and those on a fitness journey.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
