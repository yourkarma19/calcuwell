
"use client";

import { useState } from "react";
import { Code, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EmbedCalculatorProps {
  slug: string;
}

export default function EmbedCalculator({ slug }: EmbedCalculatorProps) {
  const { toast } = useToast();
  const embedCode = `<iframe 
  src="https://calcpro.online/calculators/${slug}?embed=true"
  width="100%"
  height="500"
  style="border:1px solid #ccc; border-radius:12px;"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
></iframe>
<p style="font-size:12px; text-align:center; margin-top:5px;">
  Powered by <a href="https://calcpro.online?utm_source=embed&utm_medium=widget" target="_blank" rel="noopener noreferrer">CalcPro</a>
</p>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      toast({
        title: "Copied!",
        description: "Embed code copied to clipboard.",
      });
    }, (err) => {
      toast({
        title: "Error",
        description: "Could not copy code. Please try again.",
        variant: "destructive",
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
            <Code className="mr-2" />
            Embed Calculator
        </CardTitle>
        <CardDescription>
            Copy the code below to embed this calculator on your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
            value={embedCode}
            readOnly
            rows={8}
            className="font-mono text-xs mb-4"
        />
        <Button onClick={handleCopy} className="w-full">
          <Copy className="mr-2 h-4 w-4" />
          Copy Embed Code
        </Button>
      </CardContent>
    </Card>
  );
}
