
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutReadingTimeCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About the Reading Time Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **Reading Time Estimator** is a useful tool for writers, bloggers, students, and avid readers. It provides a quick estimate of how long it will take to read a piece of text based on the total word count and a specified reading speed (in words per minute). This is the same type of tool used by popular blogging platforms to show readers an estimated reading time at the top of articles.</p>
                <h2>How to Use the Reading Time Calculator</h2>
                <ol>
                    <li>Paste your text into the text area.</li>
                    <li>Adjust the **Reading Speed (WPM)** slider to match your personal speed.</li>
                </ol>
                <p>The calculator will instantly display the estimated time required to read the text, along with the total word count.</p>
                <h2>Reading Time FAQs</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the average reading speed?</AccordionTrigger>
                        <AccordionContent>
                            The average adult reads at about 200-250 words per minute (WPM). For technical or dense material, this speed may be slower, around 50-75 WPM. For light fiction or skimming, it can be much faster. This calculator defaults to 200 WPM, a common average.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is reading time calculated?</AccordionTrigger>
                        <AccordionContent>
                            The calculation is straightforward: `Reading Time = Total Word Count / Words Per Minute`. This provides an estimate of how many minutes it will take to read the text. The calculator then formats this into a more readable "minutes and seconds" format.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How can I test my own reading speed?</AccordionTrigger>
                        <AccordionContent>
                           You can test your speed by setting a timer for one minute, reading a passage of text comfortably, and then counting the number of words you read in that minute. Do this a few times with different texts to find your average WPM.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
      </Card>
    );
}

