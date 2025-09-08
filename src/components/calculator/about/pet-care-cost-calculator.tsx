import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPetCareCostCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>The True Cost of Owning a Pet</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          Bringing a pet into your life is a joyful experience, but it&apos;s
          also a significant financial commitment. Our **Pet Care Cost
          Calculator** helps you estimate the monthly and yearly expenses
          associated with owning a pet. By planning ahead, you can ensure
          you&apos;re financially prepared to give your furry friend the best
          care possible.
        </p>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Start by selecting your **Pet Type**.</li>
          <li>Enter your estimated **Monthly Food Cost**.</li>
          <li>
            Provide your yearly estimates for **Veterinary Care** (number of
            visits and average cost) and **Grooming**.
          </li>
          <li>
            Add a monthly amount for **Miscellaneous** costs like toys, treats,
            and bedding.
          </li>
        </ol>
        <p>
          The calculator will instantly display your total estimated yearly and
          average monthly costs, helping you budget effectively.
        </p>
      </CardContent>
    </Card>
  );
}
