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
      name: "What is Wind Chill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wind chill is not the actual temperature of the air, but rather a measure of the rate of heat loss from the body due to the combined effect of cold and wind. The faster the wind blows, the faster it carries heat away from your body, making it feel colder than it actually is.",
      },
    },
    {
      "@type": "Question",
      name: "Which formula is used for this calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator uses the North American and UK standard formula, developed by the US National Weather Service and Environment Canada. This formula is considered the most accurate standard for human exposure.",
      },
    },
    {
      "@type": "Question",
      name: "Why doesn't the wind chill calculator work for low wind speeds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The wind chill formula is only defined for wind speeds above 3 mph (or 5 km/h). At lower speeds, the effect of wind on heat loss is negligible and the 'feels like' temperature is essentially the same as the actual air temperature.",
      },
    },
  ],
};

export default function AboutWindChillCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Wind Chill Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Wind Chill Calculator determines how cold the air actually feels
          on your skin when wind is factored in. It&apos;s a crucial tool for
          understanding the potential danger of frostbite in cold, windy
          conditions.
        </p>
        <h2>How to Use the Wind Chill Calculator</h2>
        <ol>
          <li>Select your preferred temperature and speed units.</li>
          <li>Enter the current **Air Temperature**.</li>
          <li>Enter the current **Wind Speed**.</li>
        </ol>
        <p>
          The calculator will instantly show the &quot;feels like&quot;
          temperature, or wind chill, along with a general risk level for
          frostbite.
        </p>
        <h2>Wind Chill FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Wind Chill?</AccordionTrigger>
            <AccordionContent>
              Wind chill is not the actual temperature, but a measure of heat
              loss from the body due to the combined effect of cold and wind.
              The faster the wind blows, the faster it carries heat away from
              your body, making it feel colder.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Which Formula Is Used?</AccordionTrigger>
            <AccordionContent>
              This calculator uses the North American and UK standard formula.
              This formula is considered the most accurate standard for human
              exposure.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Why Doesn&apos;t It Work for Low Wind Speeds?
            </AccordionTrigger>
            <AccordionContent>
              The wind chill formula is only defined for wind speeds above 3 mph
              (or 5 km/h). At lower speeds, the effect of wind on heat loss is
              negligible, and the &quot;feels like&quot; temperature is the same
              as the actual air temperature.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
