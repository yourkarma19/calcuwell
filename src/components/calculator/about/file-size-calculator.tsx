
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutFileSizeCalculator() {
    return (
        <Card>
          <CardHeader><CardTitle>About File Size & Bitrate</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>This tool helps you estimate the size of a digital file, particularly useful for video or audio, based on its length (duration) and quality (bitrate). This allows you to plan for storage space or data usage when downloading or creating media.</p>
            <h3>How to Use It</h3>
            <ol>
              <li>Enter the **Duration** of the file (e.g., 3 minutes).</li>
              <li>Enter the **Bitrate** of the file (e.g., 128 kbit/s).</li>
            </ol>
            <p>The estimated file size will be shown automatically.</p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is bitrate?</AccordionTrigger>
                <AccordionContent>
                  Bitrate is the amount of data used to represent one second of audio or video. A higher bitrate generally results in better quality and a larger file size. It's often measured in kilobits per second (kbit/s) or megabits per second (mbit/s).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                  <AccordionTrigger>How is file size calculated?</AccordionTrigger>
                  <AccordionContent>
                    The formula is straightforward: `File Size = Bitrate × Duration`. The key is to ensure the units are consistent. For example, if you have a bitrate in kilobits per second, you must convert it to bytes and multiply by the total duration in seconds to get the file size in bytes.
                  </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    );
}

