
"use client";

import { useState } from "react";
import BasicCalculator from "@/components/calculator/basic-calculator";
import ScientificCalculator from "@/components/calculator/scientific-calculator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function HomeCalculator() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="w-full max-w-lg mx-auto p-2 sm:p-4 rounded-2xl">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
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
    </div>
  );
}
