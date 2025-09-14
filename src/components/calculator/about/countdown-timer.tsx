"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the countdown timer work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The timer calculates the total number of seconds between the current time and the future target time you set. It then uses a JavaScript interval that runs every second to recalculate and display the remaining time.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when the countdown timer reaches zero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once the target date and time are reached, the timer will stop at zero and will no longer show negative values. You can then set a new countdown for another event.",
      },
    },
    {
      "@type": "Question",
      name: "Does the timer account for different time zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The timer operates based on your local device's time. When you set a target date and time, it is set in your current time zone. If you share your countdown with someone in a different time zone, they will see the countdown relative to their own local time.",
      },
    },
  ],
};

export default function AboutCountdownTimer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Countdown Timer</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Countdown Timer tracks the time remaining until a specific event.
          It shows the days, hours, minutes, and seconds left in real-time.
          It&rsquo;s perfect for building anticipation for personal milestones,
          holidays, or important deadlines.
        </p>

        <h3>How to Use the Countdown Timer</h3>
        <ol>
          <li>
            Use the calendar to select the <strong>Target Date</strong> of your
            event.
          </li>
          <li>
            Enter the specific <strong>Target Time</strong> for the event.
          </li>
        </ol>
        <p>
          The countdown will begin immediately. The page must remain open for
          the timer to continue running.
        </p>

        <h3>Countdown Timer FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the timer work?</AccordionTrigger>
            <AccordionContent>
              The timer calculates the seconds between now and the target time.
              It then uses a script that runs every second to recalculate and
              display the remaining time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What happens when the countdown reaches zero?
            </AccordionTrigger>
            <AccordionContent>
              Once the target time is reached, the timer will stop at zero. You
              can then set a new countdown for another event.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Does the timer account for time zones?
            </AccordionTrigger>
            <AccordionContent>
              The timer uses your local device&rsquo;s time. When you set a
              target date and time, it is set in your current time zone. If you
              share it, others will see the countdown relative to their own
              local time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
