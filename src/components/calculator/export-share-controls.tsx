
"use client";

import { useState } from "react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Share2, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

interface ExportShareControlsProps {
  elementIds: string[];
  shareParams: Record<string, string>;
}

export default function ExportShareControls({ elementIds, shareParams }: ExportShareControlsProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      let yOffset = 15;
      const pageHeight = pdf.internal.pageSize.getHeight() - 20; // 10mm margin top/bottom
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Add title
      pdf.setFontSize(20);
      pdf.text("Calculation Report", pageWidth / 2, yOffset, { align: 'center' });
      yOffset += 10;
      
      pdf.setFontSize(10);
      pdf.text(`Generated from calcpro.online${pathname}`, pageWidth / 2, yOffset, { align: 'center' });
      yOffset += 15;


      for (const id of elementIds) {
        const element = document.getElementById(id);
        if (element) {
          const canvas = await html2canvas(element, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - 30; // 15mm margin left/right
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (yOffset + imgHeight > pageHeight) {
              pdf.addPage();
              yOffset = 15;
          }

          pdf.addImage(imgData, 'PNG', 15, yOffset, imgWidth, imgHeight);
          yOffset += imgHeight + 10;
        }
      }
      
      // Add footer
      pdf.setFontSize(8);
      pdf.text(`Report generated on ${new Date().toLocaleDateString()}`, 15, pdf.internal.pageSize.getHeight() - 10);
      pdf.text(`Powered by CalcPro`, pageWidth - 15, pdf.internal.pageSize.getHeight() - 10, { align: 'right' });


      pdf.save('CalcPro_Report.pdf');
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast({
        title: "Error",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
        setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.origin + pathname);
    Object.entries(shareParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    navigator.clipboard.writeText(url.toString()).then(() => {
      toast({
        title: "Copied!",
        description: "Sharable link copied to clipboard.",
      });
    }, (err) => {
      toast({
        title: "Error",
        description: "Could not copy link.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button onClick={handleDownloadPdf} disabled={isDownloading} className="w-full">
        {isDownloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <Download className="mr-2 h-4 w-4" />
        )}
        {isDownloading ? "Generating..." : "Download PDF Report"}
      </Button>
      <Button onClick={handleCopyLink} variant="outline" className="w-full">
        <Copy className="mr-2 h-4 w-4" />
        Copy Shareable Link
      </Button>
    </div>
  );
}
