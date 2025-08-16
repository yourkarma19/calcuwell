
"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const currencies = {
    USD: "United States Dollar",
    EUR: "Euro",
    JPY: "Japanese Yen",
    GBP: "British Pound Sterling",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
};
type Currency = keyof typeof currencies;

const API_KEY = 'YOUR_API_KEY'; // Replace with a real API key from a service like Open Exchange Rates

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = usePersistentState<Currency>("currency-from", "USD");
  const [toCurrency, setToCurrency] = usePersistentState<Currency>("currency-to", "INR");
  const [amount, setAmount] = useState("100");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // This is a mock implementation. In a real app, you would fetch from an API.
    // e.g., `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    const mockRates: Record<string, Record<string, number>> = {
      USD: { INR: 83.3, EUR: 0.92, JPY: 157, GBP: 0.78, AUD: 1.5, CAD: 1.37, CHF: 0.9, CNY: 7.25, USD: 1 },
      INR: { USD: 0.012, EUR: 0.011, JPY: 1.88, GBP: 0.0094, AUD: 0.018, CAD: 0.016, CHF: 0.0108, CNY: 0.087, INR: 1 },
      EUR: { USD: 1.08, INR: 90.3, JPY: 170, GBP: 0.85, AUD: 1.63, CAD: 1.48, CHF: 0.98, CNY: 7.86, EUR: 1 },
      // Add other mocks as needed
    };

    if (mockRates[fromCurrency]) {
        setRates(mockRates[fromCurrency]);
        setError(null);
    } else {
        const fallbackRates = { ...mockRates.USD, [fromCurrency]: 1 };
        Object.keys(fallbackRates).forEach(key => {
            if (key !== fromCurrency) {
                fallbackRates[key] = Math.random() * 100; // Randomizing for demo
            }
        });
        setRates(fallbackRates);
        setError(`Could not fetch rates for ${fromCurrency}. Using mock data.`);
    }
  }, [fromCurrency]);
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = useMemo(() => {
    if (!rates || !toCurrency) return "";
    const rate = rates[toCurrency];
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || !rate) return "";
    return (numAmount * rate).toFixed(2);
  }, [amount, toCurrency, rates]);

  return (
    <div className="lg:col-span-3 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
          <CardDescription>Convert amounts between different currencies. Enter an amount, select your currencies, and see the result.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-amount">Amount</Label>
              <Input id="from-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
              <Select value={fromCurrency} onValueChange={(v) => setFromCurrency(v as Currency)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(currencies).map(([code, name]) => (
                    <SelectItem key={code} value={code}>{code} - {name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0 mt-4 md:mt-7" onClick={handleSwap}>
                <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>
            <div className="w-full space-y-2">
              <Label htmlFor="to-amount">Converted Amount</Label>
              <Input id="to-amount" value={convertedAmount} readOnly className="font-bold text-primary bg-primary/10 border-primary/20" />
              <Select value={toCurrency} onValueChange={(v) => setToCurrency(v as Currency)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(currencies).map(([code, name]) => (
                    <SelectItem key={code} value={code}>{code} - {name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
          <CardHeader><CardTitle>About Currency Conversion</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is an exchange rate?</AccordionTrigger>
                <AccordionContent>
                  An exchange rate is the value of one currency for the purpose of conversion to another. For example, if the USD to INR exchange rate is 83, it means 1 US Dollar is worth 83 Indian Rupees.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Why do exchange rates change?</AccordionTrigger>
                <AccordionContent>
                  Exchange rates fluctuate constantly due to a variety of economic and political factors, including interest rates, inflation, trade balances, and geopolitical events.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Disclaimer</AccordionTrigger>
                <AccordionContent>
                  The exchange rates used in this calculator are for informational purposes only and are based on mock data. They do not reflect real-time market values. For actual transactions, please consult a financial institution.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    </div>
  );
}
