import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutEnergyConverter() {
    return (
        <Card>
            <CardHeader><CardTitle>About Energy Units</CardTitle></CardHeader>
            <CardContent>
                <p>This tool helps you convert between different units of energy like Joules, calories, and kilowatt-hours (kWh). It&apos;s useful for students, engineers, and anyone who needs to work with energy measurements.</p>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                    <AccordionTrigger>Joule vs. Calorie</AccordionTrigger>
                    <AccordionContent>
                        The <strong>Joule (J)</strong> is the standard SI unit of energy. A <strong>calorie (cal)</strong> is an older unit, often used in chemistry. The &quot;calorie&quot; on food labels is actually a <strong>kilocalorie (kcal)</strong>. One kcal is equal to 1,000 calories.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                    <AccordionTrigger>What is a Kilowatt-hour (kWh)?</AccordionTrigger>
                    <AccordionContent>
                        A Kilowatt-hour is a unit of energy. It is commonly used by utility companies to bill for electricity. It is the energy used by a 1,000-watt appliance running for one hour.
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
