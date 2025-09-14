"use client";

import { ArrowRightLeft } from "lucide-react";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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

const units = {
  "Watt (W)": 1,
  "Kilowatt (kW)": 1000,
  "Megawatt (MW)": 1e6,
  "Gigawatt (GW)": 1e9,
  "Horsepower (hp)": 745.7,
  "Foot-pound/minute": 0.022597,
};

type Unit = keyof typeof units;

export default function PowerConverter() {
  const [fromUnit, setFromUnit] = usePersistentState<Unit>(
    "power-from",
    "Kilowatt (kW)",
  );
  const [toUnit, setToUnit] = usePersistentState<Unit>(
    "power-to",
    "Horsepower (hp)",
  );
  const [value, setValue] = usePersistentState("power-value", "1");

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const convertedValue = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";

    const fromFactor = units[fromUnit];
    const toFactor = units[toUnit];

    const result = (numValue * fromFactor) / toFactor;
    return result.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }, [value, fromUnit, toUnit]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Power Converter</CardTitle>
          <CardDescription>
            Convert between different units of power, such as watts, kilowatts,
            and horsepower.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input
                id="from-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Select
                value={fromUnit}
                onValueChange={(v) => setFromUnit(v as Unit)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
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
              <Label htmlFor="to-value">To</Label>
              <Input
                id="to-value"
                value={convertedValue}
                readOnly
                className="font-bold text-primary bg-primary/10 border-primary/20"
              />
              <Select
                value={toUnit}
                onValueChange={(v) => setToUnit(v as Unit)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
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
          <CardTitle>About the Power Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a Watt?</AccordionTrigger>
              <AccordionContent>
                The <strong>Watt (W)</strong> is the standard unit of power in
                the International System of Units (SI). One watt is defined as
                one joule of energy per second. It is commonly used to measure
                the output of electrical devices, like light bulbs and
                appliances. A <strong>kilowatt (kW)</strong> is simply 1,000
                watts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is Horsepower?</AccordionTrigger>
              <AccordionContent>
                <strong>Horsepower (hp)</strong> is an older unit of power that
                is still widely used, especially in the automotive industry to
                describe the power output of engines. Mechanical horsepower is
                equivalent to approximately 745.7 watts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Power vs. Energy: What&apos;s the difference?
              </AccordionTrigger>
              <AccordionContent>
                <strong>Energy</strong> is the capacity to do work (measured in
                joules or kWh), while <strong>Power</strong> is the rate at which
                energy is used (measured in watts or joules per second). For
                example, a 100-watt light bulb uses 100 joules of energy every
                second it is on.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
