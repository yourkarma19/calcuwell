import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBasicCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This versatile calculator includes both basic arithmetic and advanced
          scientific functions to suit all your needs.
        </p>
      </CardContent>
    </Card>
  );
}
