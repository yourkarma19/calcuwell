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
      name: "How is WPM (Words Per Minute) Calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gross WPM is calculated by taking the number of words typed and dividing it by the time taken in minutes. For standardization, a 'word' is often considered to be five characters long, including spaces.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good typing speed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An average typing speed is around 40 WPM. A speed of 60 WPM or higher is considered good for most professional roles. Professional typists often achieve speeds well over 100 WPM.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my typing speed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The key is consistent practice. Focus on accuracy first, then work on speed. Proper hand positioning (touch typing) is crucial. Avoid looking at the keyboard and practice using all ten fingers.",
      },
    },
  ],
};

export default function AboutTypingSpeedCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Typing Speed Test</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Typing Speed Calculator</strong> is a tool to measure your
          typing proficiency in Words Per Minute (WPM). It&apos;s perfect for
          anyone looking to improve their typing skills. By practicing
          regularly, you can increase your speed and accuracy.
        </p>

        <h3>How to Use the Typing Speed Calculator</h3>
        <ol>
          <li>Click on the text area to begin the test.</li>
          <li>As soon as you start typing, the timer will begin.</li>
          <li>Type the text as quickly and accurately as you can.</li>
          <li>When you finish, the test will stop automatically.</li>
          <li>
            Click <strong>Restart Test</strong> to try again.
          </li>
        </ol>

        <h3>Typing Speed FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is WPM (Words Per Minute) Calculated?
            </AccordionTrigger>
            <AccordionContent>
              Gross WPM is calculated by taking the number of words typed and
              dividing it by the time taken in minutes. For standardization, a
              &quot;word&quot; is often considered to be five characters long.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is a good typing speed?</AccordionTrigger>
            <AccordionContent>
              An average typing speed is around 40 WPM. A speed of 60 WPM or
              higher is considered good for most professional roles.
              Professional typists often achieve speeds well over 100 WPM.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How can I improve my typing speed?
            </AccordionTrigger>
            <AccordionContent>
              The key is consistent practice. Focus on accuracy first, then work
              on speed. Proper hand positioning (touch typing) is crucial. Avoid
              looking at the keyboard and practice using all ten fingers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Does accuracy matter more than speed?
            </AccordionTrigger>
            <AccordionContent>
              Yes, for most practical purposes, accuracy is more important. A
              high WPM is useless if it&apos;s full of errors that you have to
              go back and correct.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
