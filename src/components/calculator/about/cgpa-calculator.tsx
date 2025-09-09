"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCgpaCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the CGPA Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <h2>What is CGPA?</h2>
        <p>
          CGPA stands for <strong>Cumulative Grade Point Average</strong>. It is a
          weighted average of the grades you have received in all semesters up to
          the current point. It provides a comprehensive measure of your academic
          performance throughout your entire course.
        </p>

        <h2>How to Use the CGPA Calculator</h2>
        <p>
          To calculate your CGPA with our tool, follow these simple steps:
        </p>
        <ol>
          <li>
            Enter the credits for your first semester and the GPA/SGPA you
            achieved in that semester.
          </li>
          <li>
            Click the "Add Semester" button for each additional semester you have
            completed.
          </li>
          <li>Fill in the credits and GPA/SGPA for each of those semesters.</li>
          <li>
            The calculator will instantly display your cumulative GPA at the top.
          </li>
        </ol>

        <h2>The Formula for Calculating CGPA</h2>
        <p>The CGPA is calculated using the following formula:</p>
        <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
          CGPA = Σ (Semester Credits × Semester SGPA) / Σ (Total Credits)
        </p>
        <p>
          In simpler terms, you multiply the credits of each semester by the SGPA
          of that semester, sum up all these values, and then divide by the
          total number of credits you have taken.
        </p>

        <h3>Example Calculation</h3>
        <p>Let's say a student has the following grades:</p>
        <ul>
          <li>Semester 1: 20 Credits, 8.5 SGPA</li>
          <li>Semester 2: 22 Credits, 9.0 SGPA</li>
        </ul>
        <p>
          The calculation would be: `((20 * 8.5) + (22 * 9.0)) / (20 + 22)`
          <br />
          Which is: `(170 + 198) / 42 = 368 / 42 = 8.76`
          <br />
          The student's CGPA after two semesters is <strong>8.76</strong>.
        </p>

        <h2>Why is Your CGPA Important?</h2>
        <p>
          Your CGPA is a key indicator of your academic performance and is often
          used by:
        </p>
        <ul>
          <li>
            <strong>Universities:</strong> For admissions into postgraduate
            programs.
          </li>
          <li>
            <strong>Employers:</strong> As a screening criterion for job
            applications, especially for fresh graduates.
          </li>
          <li>
            <strong>Scholarship Committees:</strong> To determine eligibility for
            financial aid and awards.
          </li>
        </ul>
        <p>
          Maintaining a good CGPA is crucial for opening up future academic and
          career opportunities.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq1">
            <AccordionTrigger>
              What is the difference between CGPA and SGPA?
            </AccordionTrigger>
            <AccordionContent>
              <strong>SGPA (Semester Grade Point Average)</strong> measures your
              academic performance for a single semester.{" "}
              <strong>CGPA (Cumulative Grade Point Average)</strong> is the
              average of all your SGPAs over all semesters, weighted by the
              number of credits in each semester.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq2">
            <AccordionTrigger>How do I convert CGPA to a percentage?</AccordionTrigger>
            <AccordionContent>
              The conversion formula can vary by university. A common method is
              to multiply the CGPA by a specific factor. For a 10-point scale,
              a common formula is: `Percentage = CGPA * 9.5`. However, you should
              always check with your specific university for their official
              conversion formula.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq3">
            <AccordionTrigger>What is considered a "good" CGPA?</AccordionTrigger>
            <AccordionContent>
              What constitutes a "good" CGPA can be subjective and depends on the
              field of study and your future goals. Generally, on a 10-point
              scale, a CGPA of 8.0 or above is considered very good and is often
              a minimum requirement for many top companies and universities. A
              CGPA of 9.0 or above is typically considered excellent.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
