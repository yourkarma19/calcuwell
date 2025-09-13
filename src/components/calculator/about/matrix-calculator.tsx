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
      name: "What is a matrix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A matrix is a rectangular grid of numbers arranged in rows and columns. A 2x2 matrix has two rows and two columns.",
      },
    },
    {
      "@type": "Question",
      name: "How do you add or subtract matrices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To add or subtract two matrices, they must have the same dimensions. The operation is performed element-wise, meaning you add or subtract the elements in the same position in each matrix.",
      },
    },
    {
      "@type": "Question",
      name: "What about matrix multiplication?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Matrix multiplication is more complex and involves a 'dot product' of rows and columns. It is a key operation in linear algebra for transformations and solving systems of equations.",
      },
    },
  ],
};

export default function AboutMatrixCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Matrix Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The **Matrix Calculator** helps you perform basic arithmetic
          operations on matrices. Matrices are rectangular arrays of numbers
          used in many fields like linear algebra and computer graphics. This
          calculator simplifies adding and subtracting 2x2 matrices.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            Enter the numbers for each element in **Matrix A** and **Matrix B**.
          </li>
          <li>Select the operation (Addition or Subtraction).</li>
        </ol>
        <p>The calculator will instantly display the resulting matrix.</p>

        <h3>Matrix FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a matrix?</AccordionTrigger>
            <AccordionContent>
              A matrix is a rectangular grid of numbers in rows and columns. A
              2x2 matrix has two rows and two columns.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do you add or subtract matrices?
            </AccordionTrigger>
            <AccordionContent>
              To add or subtract two matrices, they must have the same size. You
              perform the operation on the elements in the same position in each
              matrix.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What about matrix multiplication?
            </AccordionTrigger>
            <AccordionContent>
              Matrix multiplication is more complex. It involves a &quot;dot
              product&quot; of rows and columns. It is a key operation in linear
              algebra. This calculator does not currently support
              multiplication.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
