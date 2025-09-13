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
      name: "What is the difference between CGPA and SGPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SGPA (Semester Grade Point Average) measures your academic performance for a single semester. CGPA (Cumulative Grade Point Average) is the average of all your SGPAs over all semesters, weighted by the number of credits in each semester.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert CGPA to a percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The conversion formula can vary by university. A common method for a 10-point scale is: Percentage = CGPA * 9.5. However, you should always check with your specific university for their official conversion formula.",
      },
    },
    {
      "@type": "Question",
      name: "What is considered a 'good' CGPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On a 10-point scale, a CGPA of 8.0 or above is generally considered very good and is often a minimum requirement for many top companies and universities. A CGPA of 9.0 or above is typically considered excellent.",
      },
    },
  ],
};

export default function AboutCgpaCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the CGPA Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h3>What is CGPA?</h3>
        <p>
          CGPA stands for <strong>Cumulative Grade Point Average</strong>.
          It&apos;s the weighted average of your grades from all semesters. It
          gives a full picture of your academic performance.
        </p>

        <h3>How to Use the CGPA Calculator</h3>
        <p>Follow these simple steps to calculate your CGPA:</p>
        <ol>
          <li>Enter the credits and SGPA for your first semester.</li>
          <li>Click &quot;Add Semester&quot; for each additional semester.</li>
          <li>Fill in the credits and SGPA for each of those semesters.</li>
          <li>Your cumulative GPA will appear instantly.</li>
        </ol>

        <h3>The CGPA Formula</h3>
        <p>The CGPA is calculated using the following formula:</p>
        <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
          CGPA = Σ (Semester Credits × Semester SGPA) / Σ (Total Credits)
        </p>
        <p>
          In simple terms: for each semester, multiply the credits by the SGPA.
          Add all these results together. Then, divide by the total number of
          credits you&apos;ve taken.
        </p>

        <h3>Why Your CGPA is Important</h3>
        <p>
          Your CGPA is a key measure of your academic performance. It&apos;s
          often used by universities for admissions and by employers for job
          screening. A good CGPA is important for future academic and career
          opportunities.
        </p>
        <h3>CGPA FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq1">
            <AccordionTrigger>
              What&apos;s the difference between CGPA and SGPA?
            </AccordionTrigger>
            <AccordionContent>
              <strong>SGPA</strong> is your average grade for one semester.{" "}
              <strong>CGPA</strong> is the average of all your SGPAs over all
              semesters, weighted by credits.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq2">
            <AccordionTrigger>
              How do I convert CGPA to a percentage?
            </AccordionTrigger>
            <AccordionContent>
              The formula can vary by university. A common method is:
              `Percentage = CGPA * 9.5`. However, always check with your
              university for their official formula.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq3">
            <AccordionTrigger>What is a good CGPA?</AccordionTrigger>
            <AccordionContent>
              This can be subjective. Generally, on a 10-point scale, a CGPA of
              8.0 or above is very good. A CGPA of 9.0 or above is usually
              excellent.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
