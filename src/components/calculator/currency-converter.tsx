"use client";

import { ArrowRightLeft } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an exchange rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An exchange rate is the value of one currency when converting to another. For example, if the USD to INR exchange rate is 83, it means 1 US Dollar is worth 83 Indian Rupees.",
      },
    },
    {
      "@type": "Question",
      name: "Why do currency exchange rates change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exchange rates change all the time because of many economic and political factors. These include inflation, interest rates, trade balances, and economic performance.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'mock data' mean for this currency converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The exchange rates in this calculator are for demonstration purposes only. They are not real-time market values and should not be used for actual financial trades. For real trades, always check with a bank or a verified currency exchange service.",
      },
    },
  ],
};

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

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = usePersistentState<Currency>(
    "currency-from",
    "USD",
  );
  const [toCurrency, setToCurrency] = usePersistentState<Currency>(
    "currency-to",
    "INR",
  );
  const [amount, setAmount] = useState("100");
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    // This is a mock implementation. In a real app, you would fetch from an API.
    // e.g., `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    const mockRates: Record<string, Record<string, number>> = {
      USD: {
        INR: 83.3,
        EUR: 0.92,
        JPY: 157,
        GBP: 0.78,
        AUD: 1.5,
        CAD: 1.37,
        CHF: 0.9,
        CNY: 7.25,
        USD: 1,
      },
      INR: {
        USD: 0.012,
        EUR: 0.011,
        JPY: 1.88,
        GBP: 0.0094,
        AUD: 0.018,
        CAD: 0.016,
        CHF: 0.0108,
        CNY: 0.087,
        INR: 1,
      },
      EUR: {
        USD: 1.08,
        INR: 90.3,
        JPY: 170,
        GBP: 0.85,
        AUD: 1.63,
        CAD: 1.48,
        CHF: 0.98,
        CNY: 7.86,
        EUR: 1,
      },
      // Add other mocks as needed
    };

    if (mockRates[fromCurrency]) {
      setRates(mockRates[fromCurrency]);
    } else {
      const fallbackRates = { ...mockRates.USD, [fromCurrency]: 1 };
      Object.keys(fallbackRates).forEach((key) => {
        if (key !== fromCurrency) {
          fallbackRates[key] = Math.random() * 100; // Randomizing for demo
        }
      });
      setRates(fallbackRates);
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
          <CardDescription>
            Convert amounts between different currencies. Enter an amount, select
            your currencies, and see the result.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-amount">Amount</Label>
              <Input
                id="from-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Select
                value={fromCurrency}
                onValueChange={(v) => setFromCurrency(v as Currency)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencies).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {code} - {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 mt-4 md:mt-7"
              onClick={handleSwap}
            >
              <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>
            <div className="w-full space-y-2">
              <Label htmlFor="to-amount">Converted Amount</Label>
              <Input
                id="to-amount"
                value={convertedAmount}
                readOnly
                className="font-bold text-primary bg-primary/10 border-primary/20"
              />
              <Select
                value={toCurrency}
                onValueChange={(v) => setToCurrency(v as Currency)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencies).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {code} - {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Currency Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our Currency Converter is a key tool for anyone dealing with
            international money. It makes it easy to convert one currency to
            another using mock exchange rates. This tool helps you understand the
            cost of items in your local currency.
          </p>
          <h3>How to Use the Currency Converter</h3>
          <ol>
            <li>
              Enter the <strong>Amount</strong> you wish to convert.
            </li>
            <li>
              Select the currency you are converting <strong>from</strong>.
            </li>
            <li>
              Select the currency you want to convert <strong>to</strong>.
            </li>
          </ol>
          <p>
            The converted amount will be displayed instantly. Use the swap button
            to quickly reverse the currencies.
          </p>
          <h3>Currency Converter FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is an exchange rate?</AccordionTrigger>
              <AccordionContent>
                An exchange rate is the value of one currency when converting to
                another. For example, if the USD to INR exchange rate is 83, it
                means 1 US Dollar is worth 83 Indian Rupees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why do exchange rates change?</AccordionTrigger>
              <AccordionContent>
                Exchange rates change all the time due to economic and political
                factors. These include inflation, interest rates, and trade
                balances.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What does &quot;mock data&quot; mean?
              </AccordionTrigger>
              <AccordionContent>
                The exchange rates in this calculator are for demonstration
                purposes only. They are not real-time market values. You should
                not use them for actual financial trades. For real trades, always
                check with a bank or verified exchange service.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is a currency pair?</AccordionTrigger>
              <AccordionContent>
                A currency pair shows the value of one currency against another.
                The first currency is the &quot;base&quot; and the second is the
                &quot;quote.&quot; For example, in EUR/USD = 1.08, one Euro is
                worth 1.08 US Dollars.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
