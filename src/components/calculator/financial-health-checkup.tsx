
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";
import { useToast } from "@/hooks/use-toast";
import { analyzeFinancialHealth, type FinancialHealthInput, type FinancialHealthOutput } from "@/ai/flows/financial-health-checkup";
import { Loader2 } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const questions = [
  { id: 'monthlyIncome', label: "💰 What is your monthly take-home salary (after tax)?", type: "number", placeholder: "e.g., 50000" },
  { id: 'monthlySavings', label: "📈 How much do you typically save or invest each month?", type: "number", placeholder: "e.g., 10000" },
  { id: 'monthlyDebt', label: "🏦 What is your total monthly EMI payment?", type: "number", placeholder: "e.g., 15000" },
  { id: 'financialGoal', label: "🎯 What is your primary financial goal?", type: "select", options: ["Pay off debt", "Retirement", "Build emergency fund", "Buy a home", "Grow wealth"] },
  { id: 'hasCreditCardDebt', label: "💳 Do you have unpaid credit card debt?", type: "toggle", options: ["Yes", "No"] },
];

const LoadingScreen = () => {
    const messages = [
        "Analyzing your saving habits…",
        "Checking debt-to-income ratio…",
        "Building your financial health report…",
        "Consulting with our AI financial advisor...",
        "Finalizing your action plan...",
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [messages.length]);
    
    return (
        <div className="text-center p-8 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto"/>
            <h2 className="text-2xl font-bold font-headline text-primary">Generating Your Report</h2>
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-muted-foreground"
                >
                    {messages[currentMessageIndex]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};


const ResultsScreen = ({ report, formData, downloadPDF }: { report: FinancialHealthOutput, formData: FinancialHealthInput, downloadPDF: () => void }) => {
    const reportRef = useRef<HTMLDivElement>(null);

    const incomeAfterDebtAndSavings = formData.monthlyIncome - formData.monthlySavings - formData.monthlyDebt;

    const chartData = [
        { name: "Savings", value: formData.monthlySavings, fill: "hsl(var(--chart-1))" },
        { name: "Debt (EMI)", value: formData.monthlyDebt, fill: "hsl(var(--chart-2))" },
        { name: "Expenses", value: incomeAfterDebtAndSavings, fill: "hsl(var(--chart-3))" },
    ].filter(item => item.value > 0);

    const chartConfig = {
        Savings: { label: "Savings", color: "hsl(var(--chart-1))" },
        "Debt (EMI)": { label: "Debt (EMI)", color: "hsl(var(--chart-2))" },
        Expenses: { label: "Expenses", color: "hsl(var(--chart-3))" },
    };

    return (
        <div className="space-y-6">
            <div ref={reportRef}>
                <Card className="p-6 text-center" id="fhc-report-card">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline">Your Financial Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="w-40 h-40 mx-auto">
                            <CircularProgressbar
                                value={report.score}
                                text={`${report.score}`}
                                styles={buildStyles({
                                    pathColor: report.score >= 80 ? "hsl(var(--primary))" : report.score >= 60 ? "#facc15" : "#ef4444",
                                    textColor: "hsl(var(--primary))",
                                    trailColor: "hsl(var(--muted))",
                                })}
                            />
                        </div>
                        <p className="text-lg font-medium">{report.summary}</p>
                    </CardContent>
                </Card>

                 <Card className="mt-6" id="fhc-details-card">
                    <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-lg mb-2">✅ Strengths</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                {report.strengths.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">🚀 Action Plan</h3>
                             <ul className="list-disc pl-5 space-y-1">
                                {report.actionPlan.map((a, i) => <li key={i}><span className="font-semibold">{a.title}:</span> {a.description}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="mt-6" id="fhc-chart-card">
                    <CardHeader><CardTitle>Monthly Cash Flow</CardTitle></CardHeader>
                    <CardContent className="h-[20rem]">
                         <ChartContainer config={chartConfig} className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Tooltip
                                        cursor={false}
                                        content={<ChartTooltipContent 
                                            formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                                            />}
                                    />
                                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={2}>
                                        {chartData.map((entry) => (
                                            <Cell key={entry.name} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <Button onClick={downloadPDF} className="w-full mt-6" size="lg">Download Report (PDF)</Button>
        </div>
    );
};

export default function FinancialHealthCheckup() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = usePersistentState<FinancialHealthInput>('fhc-form', {
    monthlyIncome: 50000,
    monthlySavings: 10000,
    monthlyDebt: 15000,
    financialGoal: "Grow wealth",
    hasCreditCardDebt: false,
  });

  const [report, setReport] = usePersistentState<FinancialHealthOutput | null>('fhc-report', null);
  
  const currentQuestion = questions[step];

  const handleNext = () => {
      const value = formData[currentQuestion.id as keyof FinancialHealthInput];
      if(currentQuestion.type === 'number' && (value === undefined || value <= 0)){
        toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid positive number." });
        return;
      }
      setStep(step + 1);
  };
  
  const handleInputChange = (id: string, value: any) => {
      setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setReport(null);
    try {
        const result = await analyzeFinancialHealth(formData);
        setReport(result);
    } catch (error) {
        toast({ variant: "destructive", title: "AI Analysis Failed", description: "Could not generate your report. Please try again later." });
        console.error("Error generating report:", error);
    } finally {
        setLoading(false);
    }
  };

  const downloadPDF = async () => {
    toast({ title: "Generating PDF...", description: "Please wait a moment." });
    
    try {
        const reportCard = document.getElementById('fhc-report-card');
        const detailsCard = document.getElementById('fhc-details-card');
        const chartCard = document.getElementById('fhc-chart-card');
        
        if (!reportCard || !detailsCard || !chartCard) {
            throw new Error("Report elements not found");
        }

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 15;
        const contentWidth = pdfWidth - (2 * margin);
        let yOffset = 20;

        pdf.setFontSize(22);
        pdf.setFont("helvetica", "bold");
        pdf.text("CalcPro", pdfWidth / 2, yOffset, { align: 'center' });
        yOffset += 8;

        pdf.setFontSize(16);
        pdf.setFont("helvetica", "normal");
        pdf.text("Your Financial Health Report", pdfWidth / 2, yOffset, { align: 'center' });
        yOffset += 15;

        const captureElement = async (element: HTMLElement) => {
            const canvas = await html2canvas(element, { scale: 2, backgroundColor: null });
            const imgData = canvas.toDataURL("image/png");
            const imgHeight = (canvas.height * contentWidth) / canvas.width;
            
            if (yOffset + imgHeight > pdf.internal.pageSize.getHeight() - margin) {
                pdf.addPage();
                yOffset = margin;
            }

            pdf.addImage(imgData, "PNG", margin, yOffset, contentWidth, imgHeight);
            yOffset += imgHeight + 10;
        };

        await captureElement(reportCard);
        await captureElement(detailsCard);
        await captureElement(chartCard);

        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text(
                `Report generated by calcpro.online on ${new Date().toLocaleDateString()}`,
                pdfWidth / 2,
                pdf.internal.pageSize.getHeight() - 10,
                { align: 'center' }
            );
        }

        pdf.save("CalcPro_Financial_Report.pdf");

    } catch (e) {
        console.error("PDF Generation Error:", e);
        toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingScreen />;
    }
    if (report) {
      return <ResultsScreen report={report} formData={formData} downloadPDF={downloadPDF}/>;
    }
    
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Step {step + 1} of {questions.length}</p>
                    <h3 className="text-xl font-semibold mt-1">{currentQuestion.label}</h3>
                </div>

                {currentQuestion.type === "number" ? (
                    <Input
                        type="number"
                        value={(formData[currentQuestion.id as keyof FinancialHealthInput] as number) || ''}
                        onChange={(e) => handleInputChange(currentQuestion.id, Number(e.target.value))}
                        className="h-12 text-lg text-center"
                        placeholder={currentQuestion.placeholder}
                    />
                ) : currentQuestion.type === "select" ? (
                    <Select value={formData[currentQuestion.id as keyof FinancialHealthInput] as string} onValueChange={(value) => handleInputChange(currentQuestion.id, value)}>
                        <SelectTrigger className="h-12 text-lg"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {currentQuestion.options?.map((opt) => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                     <div className="flex justify-center gap-4">
                        {currentQuestion.options?.map(opt => (
                            <Button
                                key={opt}
                                variant={formData.hasCreditCardDebt === (opt === 'Yes') ? "default" : "outline"}
                                onClick={() => handleInputChange(currentQuestion.id, opt === 'Yes')}
                                className="w-24 h-12 text-lg"
                            >
                                {opt}
                            </Button>
                        ))}
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</Button>
                    {step < questions.length - 1 ? (
                        <Button onClick={handleNext}>Next</Button>
                    ) : (
                        <Button onClick={handleSubmit}>Get My Report</Button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
            <CardContent className="p-8">
              {renderContent()}
            </CardContent>
        </Card>
    </div>
  );
}
