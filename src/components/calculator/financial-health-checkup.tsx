
"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { analyzeFinancialHealth, FinancialHealthInput, FinancialHealthOutput } from "@/ai/flows/financial-health-checkup";
import Link from "next/link";
import ExportShareControls from "./export-share-controls";

const formSchema = z.object({
  monthlyIncome: z.coerce.number().positive({ message: "Income must be a positive number." }),
  monthlySavings: z.coerce.number().min(0, { message: "Savings can't be negative." }),
  financialGoal: z.string().min(1, { message: "Please select a goal." }),
  monthlyDebt: z.coerce.number().min(0, { message: "Debt can't be negative." }),
  hasCreditCardDebt: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = 5;

const LoadingMessages = [
    "Analyzing your saving habits...",
    "Checking debt-to-income ratio...",
    "Comparing against financial benchmarks...",
    "Building your financial health report...",
    "Finalizing your action plan...",
];

export default function FinancialHealthCheckup() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FinancialHealthOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        monthlyIncome: 50000,
        monthlySavings: 10000,
        financialGoal: 'Wealth Growth',
        monthlyDebt: 15000,
        hasCreditCardDebt: false,
    },
    mode: "onChange"
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setStep(STEPS);
    try {
        const result = await analyzeFinancialHealth(data);
        setAnalysisResult(result);
    } catch (error) {
        console.error("AI analysis failed:", error);
        // Handle error state, maybe show a toast
    } finally {
        setIsLoading(false);
    }
  };

  const nextStep = async () => {
      const fieldsToValidate: (keyof FormValues)[] = [
          'monthlyIncome', 'monthlySavings', 'financialGoal', 'monthlyDebt', 'hasCreditCardDebt'
      ];
      const isValid = await form.trigger(fieldsToValidate[step-1]);
      if(isValid) {
          setStep(s => s + 1);
      }
  };
  
  const shareParams = {
      ...form.getValues(),
      score: analysisResult?.score.toString() || ''
  };

  const incomeDistribution = useMemo(() => {
    if (!analysisResult) return [];
    const values = form.getValues();
    const freeCashflow = values.monthlyIncome - values.monthlySavings - values.monthlyDebt;
    return [
        { name: 'Savings', value: values.monthlySavings, fill: "hsl(var(--chart-1))" },
        { name: 'EMIs / Debt', value: values.monthlyDebt, fill: "hsl(var(--chart-2))" },
        { name: 'Free Cash Flow', value: freeCashflow, fill: "hsl(var(--chart-3))" },
    ].filter(item => item.value > 0);
  }, [analysisResult, form]);

  const ScoreGauge = ({ score }: { score: number }) => {
    const scoreColor = score < 40 ? "text-red-500" : score < 75 ? "text-yellow-500" : "text-green-500";
    const scoreText = score < 40 ? "Needs Improvement" : score < 75 ? "Fair" : "Good";
    
    return (
        <div className="relative text-center">
            <p className="text-6xl font-bold font-headline my-2">
                <span className={scoreColor}>{score}</span>
                <span className="text-4xl text-muted-foreground">/100</span>
            </p>
            <p className={`text-xl font-semibold ${scoreColor}`}>{scoreText}</p>
        </div>
    );
  };
  
  const StartScreen = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
        <h2 className="text-3xl font-bold font-headline mb-2">Get Your Free Financial Health Score in 2 Minutes</h2>
        <p className="text-muted-foreground mb-6">Simple, private, and 100% free — no personal details required.</p>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-8">
            <span>🔒 Data not stored</span>
            <span>✅ 100% Free</span>
            <span>🇮🇳 Made for India</span>
        </div>
        <Button size="lg" onClick={() => setStep(1)}>Start My Check-Up</Button>
    </motion.div>
  );

  const FormStep = ({ children, title, onNext }: { children: React.ReactNode, title: string, onNext: () => void }) => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
        <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>
        {children}
        <Button onClick={onNext} className="w-full mt-6">Next</Button>
    </motion.div>
  );
  
  const LoadingScreen = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % LoadingMessages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center flex flex-col items-center justify-center h-64">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <AnimatePresence mode="wait">
                <motion.p key={messageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted-foreground">
                    {LoadingMessages[messageIndex]}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
  };

  const ResultsScreen = () => (
    analysisResult && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <Card id="score-card">
              <CardHeader><CardTitle>Your Financial Health Score</CardTitle></CardHeader>
              <CardContent>
                  <ScoreGauge score={analysisResult.score} />
              </CardContent>
          </Card>
          
          <Card id="summary-card">
              <CardHeader><CardTitle>AI Summary</CardTitle></CardHeader>
              <CardContent>
                  <p className="prose dark:prose-invert">{analysisResult.summary}</p>
              </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card id="strengths-card">
                <CardHeader><CardTitle>Strengths</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {analysisResult.strengths.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card id="action-plan-card">
                <CardHeader><CardTitle>Action Plan</CardTitle></CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        {analysisResult.actionPlan.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <ArrowRight className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                    {item.calculatorSlug && (
                                        <Link href={`/calculators/${item.calculatorSlug}`} className="text-sm text-primary hover:underline">
                                            Try our {item.title.replace("Focus on", "").replace("Build", "")} Calculator →
                                        </Link>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
          
          <Card id="chart-card">
            <CardHeader><CardTitle>Monthly Income Distribution</CardTitle></CardHeader>
            <CardContent className="h-72">
                <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />} />
                            <Pie data={incomeDistribution} dataKey="value" nameKey="name" innerRadius="50%">
                                {incomeDistribution.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
          </Card>
          
          <ExportShareControls
            elementIds={['score-card', 'summary-card', 'strengths-card', 'action-plan-card', 'chart-card']}
            shareParams={shareParams}
            calculatorName="Financial Health Check-up"
          />
      </motion.div>
    )
  );


  return (
    <div className="space-y-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                    {step === 0 && <StartScreen key="start" />}

                    {step === 1 && (
                        <FormStep key="step1" title="What’s your monthly take-home salary (₹)?" onNext={nextStep}>
                            <FormField control={form.control} name="monthlyIncome" render={({ field }) => (
                                <FormItem><FormControl><Input {...field} type="number" placeholder="e.g. 50000" /></FormControl><FormMessage /></FormItem>
                            )} />
                        </FormStep>
                    )}

                    {step === 2 && (
                         <FormStep key="step2" title="How much do you save/invest every month?" onNext={nextStep}>
                            <FormField control={form.control} name="monthlySavings" render={({ field }) => (
                                <FormItem><FormControl><Input {...field} type="number" placeholder="e.g. 10000" /></FormControl><FormMessage /></FormItem>
                            )} />
                        </FormStep>
                    )}

                    {step === 3 && (
                        <FormStep key="step3" title="What’s your main financial goal right now?" onNext={nextStep}>
                             <FormField control={form.control} name="financialGoal" render={({ field }) => (
                                <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a goal" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Debt-Free">Becoming Debt-Free</SelectItem>
                                        <SelectItem value="House">Saving for a House</SelectItem>
                                        <SelectItem value="Retirement">Planning for Retirement</SelectItem>
                                        <SelectItem value="Emergency Fund">Building an Emergency Fund</SelectItem>
                                        <SelectItem value="Wealth Growth">General Wealth Growth</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )} />
                        </FormStep>
                    )}
                    
                    {step === 4 && (
                        <FormStep key="step4" title="How much EMI do you pay each month (all loans)?" onNext={() => form.handleSubmit(onSubmit)()}>
                             <FormField control={form.control} name="monthlyDebt" render={({ field }) => (
                                <FormItem><FormControl><Input {...field} type="number" placeholder="e.g. 15000" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="hasCreditCardDebt" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-4">
                                <div className="space-y-0.5">
                                    <Label>Do you have unpaid credit card debt?</Label>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )} />
                        </FormStep>
                    )}

                    {step === STEPS && (
                        isLoading ? <LoadingScreen key="loading" /> : <ResultsScreen key="results" />
                    )}
                </AnimatePresence>
            </form>
        </Form>
    </div>
  );
}
