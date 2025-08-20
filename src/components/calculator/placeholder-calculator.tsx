
"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function PlaceholderCalculator({ setFormula }: { setFormula?: (formula: string) => void; }) {
  return (
    <Card className="col-span-1 lg:col-span-3">
        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-primary mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold font-headline">Preparing your calculator...</h2>
        </CardContent>
    </Card>
  );
}
