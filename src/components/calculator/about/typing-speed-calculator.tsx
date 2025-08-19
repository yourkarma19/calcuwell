
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTypingSpeedCalculator() {
    return (
        <Card>
        <CardHeader><CardTitle>About the Typing Speed Test</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Typing Speed Calculator** is an interactive tool designed to measure your typing proficiency in Words Per Minute (WPM). It's perfect for anyone looking to improve their typing skills, from students and administrative professionals to writers and developers. By practicing regularly, you can increase your speed and accuracy, boosting your productivity in any task that involves typing.</p>

            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Click on the text area to begin the test.</li>
                <li>As soon as you start typing the sample text, the timer will begin.</li>
                <li>Type the text as quickly and accurately as you can. Any errors will be highlighted in red.</li>
                <li>Once you finish typing the full text, the test will stop automatically and display your results for WPM, accuracy, and errors.</li>
                <li>Click **Restart Test** to try again with a new sample text.</li>
            </ol>
            
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is WPM (Words Per Minute) Calculated?</AccordionTrigger>
                    <AccordionContent>
                        Gross WPM is calculated by taking the number of words typed and dividing it by the time taken in minutes. For standardization, a "word" is often considered to be five characters long, including spaces. This calculator uses the actual word count of the sample text for its calculation.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is a good typing speed?</AccordionTrigger>
                    <AccordionContent>
                        An average typing speed is around 40 WPM. A speed of 60 WPM or higher is considered good for most professional roles that require significant typing. Professional typists and transcriptionists often achieve speeds well over 100 WPM, demonstrating exceptional skill.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I improve my typing speed?</AccordionTrigger>
                    <AccordionContent>
                       The key to improving typing speed is consistent practice. Focus on accuracy first, then work on speed. Proper hand positioning on the keyboard (touch typing) is crucial. Avoid looking at the keyboard and practice using all ten fingers. Regular practice sessions, even short ones, will build muscle memory and increase your speed and accuracy over time.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Does accuracy matter more than speed?</AccordionTrigger>
                    <AccordionContent>
                       Yes, for most practical purposes, accuracy is more important. A high WPM is useless if it's full of errors that you have to go back and correct. Correcting mistakes takes more time than typing carefully in the first place. Focus on achieving over 95% accuracy before pushing for higher speeds.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}
