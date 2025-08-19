
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCountdownTimer() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Countdown Timer</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Countdown Timer is a tool to track the time remaining until a specific future event. It continuously updates to show the number of days, hours, minutes, and seconds left, providing a dynamic and real-time countdown. It's perfect for building anticipation for personal milestones, holidays, or important deadlines.</p>
                
                <h3>How to Use the Timer</h3>
                <ol>
                    <li>Use the calendar to select the **Target Date** of your event.</li>
                    <li>Enter the specific **Target Time** for the event.</li>
                </ol>
                <p>The countdown will begin immediately and update every second. The page must remain open for the timer to continue running.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does the timer work?</AccordionTrigger>
                        <AccordionContent>
                            The timer works by calculating the total number of seconds between the current time and the future target time you set. It then uses a JavaScript interval that runs every second to recalculate the remaining time and update the display.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What happens when the countdown reaches zero?</AccordionTrigger>
                        <AccordionContent>
                            Once the target date and time are reached, the timer will stop at zero. It will no longer show negative values. You can then set a new countdown for another event.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Does the timer account for time zones?</AccordionTrigger>
                        <AccordionContent>
                           The timer operates based on your local device's time. When you set a target date and time, it is set in your current time zone. If you share your countdown with someone in a different time zone, they will see the countdown relative to their own local time.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
