
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
      name: "Why is it important to start saving early for retirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starting early is the most powerful factor in retirement saving because of compound interest. The longer your money is invested, the more time it has to grow, with your earnings generating their own earnings. Even small, regular contributions can grow into a large sum over several decades.",
      },
    },
    {
      "@type": "Question",
      name: "What is the 4% Rule?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 4% rule is a guideline suggesting you can safely withdraw 4% of your savings in your first year of retirement and then adjust that amount for inflation annually without running out of money for 30 years. This calculator uses it to estimate your savings goal.",
      },
    },
    {
      "@type": "Question",
      name: "What is a 'shortfall' in retirement planning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A shortfall is the gap between your estimated savings at retirement and your required savings goal. If this calculator shows a shortfall, it means you may need to increase your contributions, work longer, or adjust your retirement income goal.",
      },
    },
    {
      "@type": "Question",
      name: "What is a realistic interest rate to assume for retirement savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A realistic long-term interest rate depends on your investment strategy. A conservative portfolio might earn 4-5%, while a more aggressive, stock-heavy portfolio has historically returned 7-10% annually on average, though with higher risk. It's often wise to use a more conservative estimate for planning.",
      },
    },
  ],
};

export default function AboutRetirementCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About Retirement Planning</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Retirement Calculator</strong> is a crucial financial
          planning tool that helps you estimate whether you are on track to meet
          your long-term savings goals. By inputting your current age, savings,
          contributions, and expected returns, you can get a clear projection of
          your financial future. This allows you to make informed decisions
          today to ensure a comfortable and secure retirement tomorrow.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            Enter your <strong>Current Age</strong> and your desired{" "}
            <strong>Retirement Age</strong>.
          </li>
          <li>
            Input your <strong>Current Savings</strong> and the{" "}
            <strong>Monthly Contribution</strong> you plan to make.
          </li>
          <li>
            Adjust the estimated <strong>Annual Interest Rate</strong> your
            investments might earn.
          </li>
          <li>
            Set your <strong>Desired Annual Retirement Income</strong> and your{" "}
            <strong>Life Expectancy</strong>.
          </li>
        </ol>
        <p>
          The calculator will instantly show your projected savings, your
          savings goal, and whether you are on track to meet it.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Why is it important to start saving early?
            </AccordionTrigger>
            <AccordionContent>
              Starting early is the most powerful factor in retirement saving
              because of compound interest. The longer your money is invested,
              the more time it has to grow, with your earnings generating their
              own earnings. Even small, regular contributions can grow into a
              large sum over several decades.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is the 4% Rule?</AccordionTrigger>
            <AccordionContent>
              The 4% rule is a guideline for retirees that suggests you can
              safely withdraw 4% of your savings in your first year of
              retirement and then adjust that amount for inflation for every
              subsequent year without running out of money for 30 years. This
              calculator uses it to estimate your savings goal by multiplying
              your desired annual income by 25.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is a &quot;shortfall?&quot;
            </AccordionTrigger>
            <AccordionContent>
              A shortfall is the gap between your estimated savings at
              retirement and your required savings goal. If this calculator
              shows a shortfall, it means your current plan is not projected to
              be enough to fund your desired retirement income. You may need to
              increase your monthly contributions, work longer, or adjust your
              retirement income goal.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What is a realistic interest rate to assume?
            </AccordionTrigger>
            <AccordionContent>
              A realistic long-term interest rate depends on your investment
              strategy. A conservative portfolio might earn 4-5%, while a more
              aggressive, stock-heavy portfolio has historically returned 7-10%
              annually on average, though with higher risk. It's often wise
              to use a more conservative estimate for planning.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
