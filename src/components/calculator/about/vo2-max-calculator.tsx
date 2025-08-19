import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutVo2MaxCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle as="h2">About VO₂ Max</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This tool gives you an estimate of your VO₂ max. This is a key measure of your aerobic fitness. It shows how well your body can use oxygen during exercise. A higher VO₂ max usually means better cardiovascular health.</p>

                <h3>How to Use the VO₂ Max Estimator</h3>
                <p>This calculator uses a non-exercise method to estimate your VO₂ max. Simply enter your age and your resting heart rate. Your resting heart rate is your pulse when you are calm and relaxed.</p>
                
                <h3>VO₂ Max FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is VO₂ max?</AccordionTrigger>
                        <AccordionContent>
                            VO₂ max is the maximum amount of oxygen your body can use during intense exercise. It's measured in milliliters of oxygen per kilogram of body weight per minute (mL/kg/min). It's a common way to measure a person's cardiovascular fitness.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How accurate is this estimate?</AccordionTrigger>
                        <AccordionContent>
                           This formula provides a general estimate without needing exercise. However, it's not as accurate as a clinical stress test done in a lab. Factors like genetics and specific training can affect your true VO₂ max. Think of this as a starting point.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How can I improve my VO₂ max?</AccordionTrigger>
                        <AccordionContent>
                          You can improve your VO₂ max with consistent aerobic exercise. High-Intensity Interval Training (HIIT) is known to be very effective. This involves short bursts of intense effort followed by brief recovery periods.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
