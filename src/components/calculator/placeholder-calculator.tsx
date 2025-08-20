
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const UmbrellaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12a10.06 10.06 1 0 0-20 0Z"/>
        <path d="M12 12v8a2 2 0 0 0 4 0"/>
        <path d="M12 2v1"/>
    </svg>
)

export default function PlaceholderCalculator({ setFormula }: { setFormula?: (formula: string) => void; }) {

  return (
    <Card className="col-span-1 lg:col-span-3">
        <CardContent className="flex flex-col items-center justify-center h-64 text-center overflow-hidden relative bg-background">
            <div className="rain-container">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="raindrop" 
                        style={{ 
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>
            <div className="relative z-10 p-4 rounded-lg bg-background/80 backdrop-blur-sm flex flex-col items-center gap-4">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <UmbrellaIcon className="w-16 h-16 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-bold font-headline mt-4">Preparing your calculator...</h2>
            </div>
        </CardContent>
    </Card>
  );
}
