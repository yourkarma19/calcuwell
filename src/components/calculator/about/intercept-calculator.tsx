import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutInterceptCalculator() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle as="h2">What Are Intercepts?</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>In algebra, an intercept is a point where the graph of an equation crosses one of the axes on a coordinate plane.</p>
                    <ul>
                        <li><strong>Y-Intercept:</strong> This is the point where the line crosses the vertical y-axis. At this point, the value of `x` is always 0.</li>
                        <li><strong>X-Intercept:</strong> This is the point where the line crosses the horizontal x-axis. At this point, the value of `y` is always 0.</li>
                    </ul>
                    <p>Understanding intercepts is a fundamental concept in algebra and is crucial for graphing linear equations.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle as="h2">How to Find Intercepts from a Graph</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                     <p>Visually finding intercepts is straightforward. Simply look for the two points where the line of your equation makes contact with the x-axis and the y-axis. The image below illustrates this concept clearly.</p>
                    <div className="my-4 flex justify-center">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="A graph showing the x and y intercepts of a line on a coordinate plane."
                            width={500}
                            height={350}
                            className="rounded-lg shadow-md"
                            data-ai-hint="graph intercepts"
                        />
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle as="h2">Why Are Intercepts Useful?</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Intercepts are not just abstract points on a graph; they often have significant real-world meaning in various contexts:</p>
                    <ul>
                        <li><strong>Finance:</strong> The y-intercept can represent a starting value, such as an initial investment, a base fee for a service, or the amount of money you have at time zero.</li>
                        <li><strong>Physics:</strong> In motion graphs, the y-intercept can denote the starting position or initial velocity of an object. The x-intercept might represent the time when an object returns to its starting point.</li>
                        <li><strong>Business:</strong> Intercepts are key in break-even analysis. The y-intercept might be the fixed costs (the costs at zero production), while the x-intercept could be the point where revenue equals cost, resulting in zero profit.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
