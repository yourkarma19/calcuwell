"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "../ui/button";

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

    if (fromCurrency in mockRates) {
        setRates(mockRates[fromCurrency]);
        setError(null);
    } else {
        setError(`Could not fetch rates for ${fromCurrency}. Using mock data for USD.`);
        setRates(mockRates.USD);
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
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
    </div>
  );
}
