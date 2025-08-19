
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutHeartRateZoneCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Heart Rate Zones</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **Heart Rate Zone Calculator** is a vital tool for anyone looking to optimize their cardiovascular workouts. By calculating your personalized training zones, you can ensure you are exercising at the right intensity to meet your specific fitness goals, whether that's burning fat, improving endurance, or boosting your peak performance. This tool uses the Karvonen formula for a more accurate, personalized result.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Age** in years.</li>
                    <li>Enter your **Resting Heart Rate** in beats per minute (BPM). You can find this by checking your pulse after resting for several minutes.</li>
                </ol>
                <p>The calculator will instantly display your five training zones and your estimated maximum heart rate.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What are heart rate zones?</AccordionTrigger>
                    <AccordionContent>
                    Heart rate zones are ranges based on a percentage of your maximum heart rate. Training in different zones stimulates different physiological responses. For example, Zone 2 is ideal for building aerobic base and burning fat, while Zone 4 helps improve your anaerobic threshold and speed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is the Karvonen formula?</AccordionTrigger>
                    <AccordionContent>
                    The Karvonen formula is a popular method for calculating target heart rate zones because it takes your **resting heart rate** into account. This makes it more personalized than simpler formulas that only use age to estimate maximum heart rate. It calculates your Heart Rate Reserve (Max HR - Resting HR) to define more accurate training intensities.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How do I find my resting heart rate?</AccordionTrigger>
                    <AccordionContent>
                    The best time to measure your resting heart rate is in the morning, shortly after you wake up and before you get out of bed. Place your index and middle fingers on your wrist or neck to find your pulse. Count the number of beats in 60 seconds. Do this for a few consecutive days and take the average for the most accurate result.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Is this calculator 100% accurate?</AccordionTrigger>
                    <AccordionContent>
                    This calculator provides a very good estimate for most people. However, the `220 - age` formula for maximum heart rate is a general guideline. Your true maximum heart rate can be influenced by genetics and fitness level. For a precise measurement, a clinical stress test is required.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
