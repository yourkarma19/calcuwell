import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutColorConverter() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>About the Color Code Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Color Code Converter** is an essential utility for web designers, developers, and digital artists. It provides a seamless way to translate colors between three of the most common web color formats: **HEX**, **RGB**, and **HSL**. By allowing real-time, two-way conversion, this tool helps you find the perfect shade and ensures consistency across your projects.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter a color value in any of the three formats (HEX, RGB, or HSL).</li>
                <li>As you type, the other two formats will update instantly to reflect the same color.</li>
                <li>Use the color preview to see your selected color in real-time.</li>
            </ol>
            <p>This dynamic conversion makes it easy to experiment with color values and find the exact code you need for your CSS, design software, or other digital media.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the difference between HEX, RGB, and HSL?</AccordionTrigger>
                    <AccordionContent>
                        <p className="mb-2">**HEX (Hexadecimal)** is a six-digit code (e.g., `#FF5733`) that represents the intensity of Red, Green, and Blue in a color. It's the most common format used in web design.</p>
                        <p className="mb-2">**RGB (Red, Green, Blue)** is an additive color model where red, green, and blue light are combined to create a broad array of colors. Each value ranges from 0 to 255 (e.g., `rgb(255, 87, 51)`).</p>
                        <p>**HSL (Hue, Saturation, Lightness)** represents color in a more human-intuitive way. **Hue** is the color itself (0-360 degrees), **Saturation** is the color's intensity (0-100%), and **Lightness** is its brightness (0-100%). This makes it easier to create variations of a single color (e.g., `hsl(11, 100%, 60%)`).</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why are there different color models?</AccordionTrigger>
                    <AccordionContent>
                        Different color models are suited for different tasks. RGB is fundamental to how digital screens create color by mixing light. HEX is a more compact, web-friendly way to write RGB values. HSL is often preferred by designers because it's more intuitive to adjust properties like lightness and saturation to create color schemes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What does the "alpha" value in RGBA or HSLA mean?</AccordionTrigger>
                    <AccordionContent>
                       The 'A' stands for Alpha, which represents the opacity of the color. An alpha value of 1 is fully opaque, while 0 is fully transparent. This converter focuses on the opaque color values, but RGBA and HSLA formats are commonly used in CSS to create semi-transparent effects.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}