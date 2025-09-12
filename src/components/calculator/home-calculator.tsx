
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import BasicCalculator from "@/components/calculator/basic-calculator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ScientificCalculator = dynamic(
  () => import("@/components/calculator/scientific-calculator"),
  {
    loading: () => <Skeleton className="w-full h-[548px] rounded-xl" />,
    ssr: false,
  },
);

export default function HomeCalculator() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="w-full max-w-lg mx-auto p-2 sm:p-4 rounded-2xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="scientific">Scientific</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="mt-4">
          <BasicCalculator />
        </TabsContent>
        <TabsContent value="scientific" className="mt-4">
          {activeTab === "scientific" && <ScientificCalculator />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
