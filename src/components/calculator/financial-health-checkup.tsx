"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  diagnoseFinancialHealth,
  type DiagnoseFinancialHealthInput,
  type DiagnoseFinancialHealthOutput,
} from "@/ai/flows/diagnose-financial-health";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  monthlyIncome: z.coerce
    .number()
    .min(1, { message: "Income must be greater than 0." }),
  monthlySavings: z.coerce
    .number()
    .min(0, { message: "Savings must be a positive number." }),
  monthlyDebt: z.coerce
    .number()
    .min(0, { message: "Debt must be a positive number." }),
  financialGoal: z
    .string()
    .min(1, { message: "Please select a financial goal." }),
  hasCreditCardDebt: z.boolean(),
});

export default function FinancialHealthCheckup() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnoseFinancialHealthOutput | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: 5000,
      monthlySavings: 1000,
      monthlyDebt: 500,
      financialGoal: "save_for_down_payment",
      hasCreditCardDebt: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const diagnosis = await diagnoseFinancialHealth(
        values as DiagnoseFinancialHealthInput,
      );
      setResult(diagnosis);
    } catch (error) {
      console.error("Error diagnosing financial health:", error);
      toast({
        title: "Error",
        description:
          "Could not get financial health analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Health Checkup</CardTitle>
          <CardDescription>
            Answer a few questions to get an AI-powered analysis of your
            financial situation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="monthlyIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Income (after tax)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 5000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="monthlySavings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Savings & Investments</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 1000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="monthlyDebt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Debt Payments</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="financialGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Financial Goal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pay_off_debt">
                            Pay off debt
                          </SelectItem>
                          <SelectItem value="save_for_down_payment">
                            Save for a down payment
                          </SelectItem>
                          <SelectItem value="build_emergency_fund">
                            Build an emergency fund
                          </SelectItem>
                          <SelectItem value="invest_for_retirement">
                            Invest for retirement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="hasCreditCardDebt"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>
                        Do you carry credit card debt month-to-month?
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Analysis
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Your Financial Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" aria-live="polite">
            <Alert
              className={
                result.score >= 80
                  ? "border-green-500"
                  : result.score >= 50
                    ? "border-yellow-500"
                    : "border-red-500"
              }
            >
              <AlertTitle className="flex items-center gap-2">
                Financial Health Score:
                <span
                  className={
                    result.score >= 80
                      ? "text-green-500"
                      : result.score >= 50
                        ? "text-yellow-500"
                        : "text-red-500"
                  }
                >
                  {result.score}/100
                </span>
              </AlertTitle>
              <AlertDescription>{result.summary}</AlertDescription>
            </Alert>
            <div>
              <h3 className="font-semibold mb-2">Recommended Action Plan:</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ul>
                  {result.actionPlan.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
