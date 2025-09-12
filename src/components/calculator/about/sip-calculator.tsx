"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSipCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Understanding SIPs</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          A <strong>Systematic Investment Plan (SIP)</strong> is a popular
          investment method offered by mutual funds that allows you to invest a
          fixed amount of money at regular intervals (typically monthly).
          It's a disciplined approach to investing that helps you build
          wealth over the long term by leveraging the power of compounding and
          rupee cost averaging.
        </p>

        <h3>How to Use the SIP Calculator</h3>
        <ol>
          <li>
            Use the sliders to set your **Monthly Investment** amount, the
            **Expected Annual Return Rate**, and the **Time Period** in years.
          </li>
          <li>
            The calculator will instantly project the future value of your
            investment and show you a breakdown of your total investment versus
            your estimated returns.
          </li>
        </ol>

        <h3>SIP FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              What are the benefits of a SIP?
            </AccordionTrigger>
            <AccordionContent>
              <p>SIPs offer several key advantages:</p>
              <ul className="list-disc pl-5">
                <li>
                  **Discipline:** It automates your savings, making you a
                  regular investor.
                </li>
                <li>
                  **Rupee Cost Averaging:** Since you invest a fixed amount
                  regularly, you buy more units when the market is down and
                  fewer when it's up. This averages out your purchase cost
                  over time.
                </li>
                <li>
                  **Power of Compounding:** The returns you earn also start
                  earning returns, leading to exponential growth over the long
                  term.
                </li>
                <li>
                  **Flexibility:** You can start with a small amount and
                  increase your SIP amount as your income grows.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              How do I interpret the results?
            </AccordionTrigger>
            <AccordionContent>
              The calculator shows you three key figures:
              <ul className="list-disc pl-5">
                <li>
                  <strong>Total Investment:</strong> The actual amount of money
                  you have put in over the entire period.
                </li>
                <li>
                  <strong>Estimated Returns:</strong> The profit you have earned
                  on your investment through compounding.
                </li>
                <li>
                  <strong>Future Value:</strong> The final amount your
                  investment is projected to be worth.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              Is the return rate guaranteed?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                No. The return rate is an assumption. Mutual fund investments
                are subject to market risks, and the actual returns can be
                higher or lower than what you expect. It's important to
                choose a return rate that aligns with the historical performance
                of the type of fund you are investing in (e.g., equity funds
                have a different risk-return profile than debt funds). This
                calculator is for illustrative purposes only.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
