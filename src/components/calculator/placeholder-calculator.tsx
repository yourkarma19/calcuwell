
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '×', '÷', 'π', '√'];

export default function PlaceholderCalculator({ setFormula }: { setFormula?: (formula: string) => void; }) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(Math.floor(Math.random() * 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-3">
        <CardContent className="flex flex-col items-center justify-center h-64 text-center overflow-hidden relative bg-background">
             <div className="absolute inset-0 digital-rain">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="rain-drop" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 2 + 3}s`, animationDelay: `${Math.random() * 5}s` }}>
                        {Array.from({ length: 20 }).map((_, j) => (
                             <span key={j} style={{ color: `hsla(var(--primary-foreground), ${Math.random() * 0.7 + 0.3})` }}>
                                {symbols[Math.floor(Math.random() * symbols.length)]}
                             </span>
                        ))}
                    </div>
                ))}
            </div>
            <div className="relative z-10 p-4 rounded-lg bg-background/80 backdrop-blur-sm">
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
            </div>
        </CardContent>
    </Card>
  );
}
