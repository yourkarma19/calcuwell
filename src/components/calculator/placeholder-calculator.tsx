
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function PlaceholderCalculator({ setFormula }: { setFormula?: (formula: string) => void; }) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(Math.floor(Math.random() * 1000));
    }, 100); // Change number every 100ms for a "calculating" effect

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-3">
        <CardContent className="flex flex-col items-center justify-center h-64 text-center overflow-hidden">
            <div className="h-16 w-48 font-mono text-5xl font-bold text-primary flex items-center justify-center">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={number}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        {number}
                    </motion.div>
                </AnimatePresence>
            </div>
            <h2 className="text-2xl font-bold font-headline mt-4">Preparing your calculator...</h2>
        </CardContent>
    </Card>
  );
}
