"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPetCareCostCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Pet Care Cost Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          Bringing a pet into your life is a joyful experience, but it&rsquo;s
          also a big financial commitment. Our **Pet Care Cost Calculator**
          helps you estimate the monthly and yearly expenses of owning a pet. By
          planning ahead, you can be sure you&rsquo;re ready to give your furry
          friend the best care.
        </p>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Start by selecting your **Pet Type**.</li>
          <li>Enter your estimated **Monthly Food Cost**.</li>
          <li>
            Provide your yearly estimates for **Veterinary Care** and
            **Grooming**.
          </li>
          <li>
            Add a monthly amount for **Miscellaneous** costs like toys and
            treats.
          </li>
        </ol>
        <p>
          The calculator will instantly show your total estimated yearly and
          average monthly costs.
        </p>
      </CardContent>
    </Card>
  );
}
