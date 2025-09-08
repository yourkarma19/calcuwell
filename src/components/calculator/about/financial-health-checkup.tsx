"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutFinancialHealthCheckup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Understanding Your Financial Health</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          A financial health check-up is like a report card for your money. It
          provides a score and a summary of your current financial situation,
          helping you understand your strengths and identify areas for
          improvement. This tool uses key metrics like your savings rate and
          debt-to-income ratio to give you a clear picture of where you stand.
          Taking a moment to assess your financial health is the first step
          toward building a more secure and prosperous future. It empowers you
          to make informed decisions, set realistic goals, and take control of
          your financial journey.
        </p>

        <h3>How to Use This Tool</h3>
        <p>
          Our AI-powered tool simplifies the process of analyzing your financial
          situation. Just provide a few key pieces of information:
        </p>
        <ol>
          <li>
            <strong>Monthly Income:</strong> Enter your total take-home pay per
            month. This is your net income after taxes.
          </li>
          <li>
            <strong>Monthly Savings:</strong> Input the amount you regularly
            save or invest each month.
          </li>
          <li>
            <strong>Monthly Debt:</strong> Provide your total monthly loan
            payments (e.g., credit card bills, personal loans, car loans).
          </li>
          <li>
            <strong>Financial Goal:</strong> Select your primary financial
            objective, such as saving for a down payment or paying off debt.
          </li>
          <li>
            <strong>Credit Card Debt:</strong> Indicate if you carry unpaid
            credit card balances from month to month.
          </li>
        </ol>
        <p>
          After you submit your information, our AI will analyze your data and
          provide a personalized report. This report includes a financial health
          score, a summary of your situation, and a concrete action plan to help
          you improve.
        </p>
      </CardContent>
    </Card>
  );
}
