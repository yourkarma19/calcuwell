import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AboutBasicCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          This versatile calculator includes both basic arithmetic and advanced
          scientific functions to suit all your needs.
        </CardDescription>
      </CardContent>
    </Card>
  );
}
