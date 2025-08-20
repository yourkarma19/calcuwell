
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutWorldClock() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About the World Clock</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The World Clock is a tool that displays the current local time and date for a selection of major cities across the globe. It is essential for anyone who works with international teams, travels frequently, or needs to stay connected with friends and family in different countries. The clock automatically accounts for different time zones and Daylight Saving Time rules, removing the guesswork and potential confusion of manual time conversions.</p>
                
                <h2>How to Use the World Clock</h2>
                <p>The clock is fully automatic. Upon loading, it fetches the current time from your device and displays the equivalent local time for a predefined list of major international cities. The time for each city updates every second, providing a real-time, at-a-glance view of global times. This tool is perfect for quickly checking if it's a good time to make an international call or schedule a meeting across different regions.</p>
                
                <h2>World Clock FAQs</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does it handle Daylight Saving Time (DST)?</AccordionTrigger>
                        <AccordionContent>
                            This tool uses the international IANA Time Zone Database, which is maintained and updated with the correct Daylight Saving Time rules for each location. By leveraging this database, the displayed times are accurate year-round, automatically adjusting for regions that observe DST. This ensures reliability, even when DST starts or ends.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is a time zone?</AccordionTrigger>
                        <AccordionContent>
                           A time zone is a region of the globe that observes a uniform standard time for legal, commercial, and social purposes. For convenience, time zones tend to follow the boundaries of countries and their subdivisions. Most time zones are offset from Coordinated Universal Time (UTC) by a whole number of hours, though some have 30 or 45-minute offsets.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is UTC?</AccordionTrigger>
                        <AccordionContent>
                            Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks and time. It is not a time zone itself but rather the reference point from which all other time zones are calculated. It is the successor to Greenwich Mean Time (GMT) and is essential for global systems like aviation, weather forecasting, and the internet to operate in a synchronized manner.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
