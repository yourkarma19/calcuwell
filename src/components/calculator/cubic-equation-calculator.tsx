"use client";

import { type Complex } from "mathjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { solveCubic } from "@/lib/math/equations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";
import { cn } from "@/lib/utils";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the 'roots' of a cubic equation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The roots of an equation are the values of 'x' that make the equation true. A cubic equation always has three roots. These can be all real numbers, or one real number and two complex conjugate numbers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the discriminant of a cubic equation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The discriminant's sign determines the nature of the roots. If positive, there is one real root and two complex roots. If zero, there are three real roots with at least two being equal. If negative, there are three distinct real roots.",
      },
    },
    {
      "@type": "Question",
      name: "Why are cubic equations important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cubic equations are used in science and engineering to model various physical phenomena, such as the volume of materials, thermodynamic properties, and fluid dynamics.",
      },
    },
  ],
};

export default function CubicEquationCalculator() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-6);
  const [c, setC] = useState(11);
  const [d, setD] = useState(-6);
  const [solution, setSolution] = useState<Complex[] | null>(null);

  const handleSolve = () => {
    setSolution(solveCubic(a, b, c, d));
  };

  const formatRoot = (root: Complex) => {
    if (Math.abs(root.im) < 1e-10) {
      return root.re.toFixed(4).replace(/\.?0+$/, "");
    }
    const realPart = root.re.toFixed(4).replace(/\.?0+$/, "");
    const imagPart = Math.abs(root.im)
      .toFixed(4)
      .replace(/\.?0+$/, "");
    const sign = root.im > 0 ? "+" : "-";
    return `${realPart} ${sign} ${imagPart}i`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cubic Equation Calculator</CardTitle>
          <CardDescription>
            Solve cubic equations of the form ax³ + bx² + cx + d = 0.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            <Input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              aria-label="Coefficient a"
              addon="x³ +"
            />
            <Input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              aria-label="Coefficient b"
              addon="x² +"
            />
            <Input
              type="number"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              aria-label="Coefficient c"
              addon="x +"
            />
            <Input
              type="number"
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
              aria-label="Coefficient d"
              addon="= 0"
            />
          </div>
          <Button className={cn("w-full", "btn-glossy")} onClick={handleSolve}>
            Solve
          </Button>
        </CardContent>
      </Card>

      {solution && (
        <Card>
          <CardHeader>
            <CardTitle>Roots</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">x₁</p>
              <p className="text-2xl font-bold font-headline text-primary break-words">
                {formatRoot(solution[0])}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">x₂</p>
              <p className="text-2xl font-bold font-headline text-primary break-words">
                {formatRoot(solution[1])}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">x₃</p>
              <p className="text-2xl font-bold font-headline text-primary break-words">
                {formatRoot(solution[2])}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Cubic Equation Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            This tool solves any cubic equation of the form `ax³ + bx² + cx + d =
            0`. It finds all three roots, which can be real or complex numbers. It
            is a useful resource for students in algebra and calculus, as well as
            for engineers and scientists.
          </p>
          <h3>How to Use the Cubic Equation Calculator</h3>
          <ol>
            <li>Enter the coefficients `a`, `b`, `c`, and `d`.</li>
            <li>Click the &quot;Solve&quot; button.</li>
            <li>
              The calculator will display the three roots of the equation (`x₁`,
              `x₂`, `x₃`).
            </li>
          </ol>
          <h3>Cubic Equation FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What are the &quot;roots&quot; of an equation?
              </AccordionTrigger>
              <AccordionContent>
                The roots are the values of `x` that make the equation true. A
                cubic equation always has three roots. These can be all real
                numbers, or one real number and two complex numbers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is the discriminant?</AccordionTrigger>
              <AccordionContent>
                The discriminant is a value calculated from the coefficients. Its
                sign determines the nature of the roots. If positive, there is one
                real and two complex roots. If zero, there are three real roots
                with at least two being equal. If negative, there are three
                distinct real roots.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Why are cubic equations important?
              </AccordionTrigger>
              <AccordionContent>
                Cubic equations are used in many areas of science and engineering.
                They model physical phenomena, such as the volume of materials,
                thermodynamic properties, and fluid dynamics.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
