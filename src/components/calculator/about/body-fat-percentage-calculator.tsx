
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBodyFatPercentageCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Body Fat Percentage</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Body Fat Percentage Calculator gives a better look at your body composition than weight or BMI alone. By estimating the amount of your body that is fat, it helps you track fitness and health progress more accurately. This tool uses the U.S. Navy method, a common formula based on body measurements.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select your <strong>Gender</strong>.</li>
                    <li>Enter your <strong>Height</strong> and <strong>Weight</strong>.</li>
                    <li>Measure and enter your <strong>Neck</strong> and <strong>Waist</strong> size in centimeters.</li>
                    <li>If you are female, also enter your <strong>Hip</strong> measurement.</li>
                </ol>
                <p>The calculator will instantly estimate your body fat percentage and classify it.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why is body fat percentage better than BMI?</AccordionTrigger>
                        <AccordionContent>
                            Body fat percentage directly measures fat mass, while BMI is a general measure. BMI can be misleading for muscular people (who may be called &quot;overweight&quot;) or older adults. Body fat percentage gives a clearer picture of your body composition.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How does the U.S. Navy method work?</AccordionTrigger>
                        <AccordionContent>
                            This method uses body measurements to estimate body density. It&apos;s a convenient and cheap way to estimate body fat without special equipment. However, it&apos;s not as accurate as clinical methods like DEXA scans.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How do I measure myself correctly?</AccordionTrigger>
                        <AccordionContent>
                           Use a flexible tape measure. For the <strong>neck</strong>, measure just below the Adam&apos;s apple. For the <strong>waist</strong>, measure at the narrowest point, usually just above the navel. For the <strong>hips</strong>, measure at the widest point. Keep the tape snug but not tight.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
