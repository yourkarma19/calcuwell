import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTimeZoneConverter() {
    return (
        <Card>
            <CardHeader><CardTitle>About Time Zones</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>The Time Zone Converter is a key tool for anyone who works, travels, or communicates across different parts of the world. It ends the confusion of calculating time differences. The tool lets you instantly find the local time in another city or country based on your own. This is perfect for scheduling international meetings, planning trips, or just staying in touch with friends and family abroad.</p>
              
              <h3>How to Use the Calculator</h3>
              <ol>
                  <li>In the "From" section, select your starting time zone, date, and time.</li>
                  <li>In the "To" section, select the time zone you want to convert to.</li>
                  <li>The converted date and time will be displayed instantly.</li>
              </ol>

              <h3>Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is UTC?</AccordionTrigger>
                  <AccordionContent>
                    Coordinated Universal Time (UTC) is the main time standard that the world uses to regulate clocks and time. It is not a time zone itself. Instead, it is the basis for civil time and time zones worldwide. Time zones are often shown as an offset from UTC (e.g., UTC-5 for New York).
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-2">
                  <AccordionTrigger>Does this handle Daylight Saving Time (DST)?</AccordionTrigger>
                  <AccordionContent>
                    Yes, this converter automatically handles Daylight Saving Time. It uses the international IANA Time Zone Database. This database contains all historical and future DST rules for each timezone. This ensures that the conversion is accurate, even for dates when DST rules are active.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
        </Card>
    )
}