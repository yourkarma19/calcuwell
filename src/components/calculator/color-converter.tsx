
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Conversion functions
function hexToRgb(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { [r,g,b] = [c,x,0] } 
    else if (60 <= h && h < 120) { [r,g,b] = [x,c,0] }
    else if (120 <= h && h < 180) { [r,g,b] = [0,c,x] } 
    else if (180 <= h && h < 240) { [r,g,b] = [0,x,c] } 
    else if (240 <= h && h < 300) { [r,g,b] = [x,0,c] } 
    else if (300 <= h && h < 360) { [r,g,b] = [c,0,x] }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return {r, g, b};
}

export default function ColorConverter() {
  const [hex, setHex] = usePersistentState("color-hex", "#8B5CF6");
  
  const { rgb, hsl } = useMemo(() => {
    const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex);
    if (!validHex) return { rgb: { r: 0, g: 0, b: 0 }, hsl: { h: 0, s: 0, l: 0 } };
    const rgbVal = hexToRgb(hex);
    const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
    return { rgb: rgbVal, hsl: hslVal };
  }, [hex]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value);
  };
  
  const handleRgbChange = (part: 'r'|'g'|'b', value: string) => {
    const numValue = parseInt(value, 10);
    if(numValue >= 0 && numValue <= 255){
        const newRgb = {...rgb, [part]: numValue };
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
  }

  const handleHslChange = (part: 'h'|'s'|'l', value: string) => {
    const numValue = parseInt(value, 10);
    const max = part === 'h' ? 360 : 100;
    if(numValue >= 0 && numValue <= max) {
        const newHsl = {...hsl, [part]: numValue };
        const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
  }

  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>Color Code Converter</CardTitle>
          <CardDescription>Convert between HEX, RGB, and HSL color formats. Edit any value to see the others update in real-time.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-4">
                <Label>Color Preview</Label>
                 <div className="w-32 h-32 rounded-full border-4 border-card" style={{ backgroundColor: hex }}></div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="hex-input">HEX</Label>
                    <Input id="hex-input" value={hex} onChange={handleHexChange} className="font-mono"/>
                </div>
                <div className="space-y-2">
                    <Label>RGB (Red, Green, Blue)</Label>
                    <div className="grid grid-cols-3 gap-2">
                        <Input type="number" value={rgb.r} onChange={e => handleRgbChange('r', e.target.value)} className="font-mono"/>
                        <Input type="number" value={rgb.g} onChange={e => handleRgbChange('g', e.target.value)} className="font-mono"/>
                        <Input type="number" value={rgb.b} onChange={e => handleRgbChange('b', e.target.value)} className="font-mono"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>HSL (Hue, Saturation, Lightness)</Label>
                    <div className="grid grid-cols-3 gap-2">
                        <Input type="number" value={hsl.h} onChange={e => handleHslChange('h', e.target.value)} className="font-mono"/>
                        <Input type="number" value={hsl.s} onChange={e => handleHslChange('s', e.target.value)} className="font-mono"/>
                        <Input type="number" value={hsl.l} onChange={e => handleHslChange('l', e.target.value)} className="font-mono"/>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
