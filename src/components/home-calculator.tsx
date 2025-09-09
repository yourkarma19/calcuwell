"use client";

import { useState } from "react";
import BasicCalculator from "@/components/calculator/basic-calculator";
import ScientificCalculator from "@/components/calculator/scientific-calculator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function HomeCalculator() {
  const [activeTab, setActiveTab] = useState<"basic" | "scientific">("basic");

  return (
    <Card className="w-full max-w-lg mx-auto p-4 shadow-lg rounded-2xl bg-card">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "basic" | "scientific")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="scientific">Scientific</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="mt-4">
          <BasicCalculator />
        </TabsContent>
        <TabsContent value="scientific" className="mt-4">
          <ScientificCalculator />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
