
"use client";

import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Info } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import usePersistentState from "@/hooks/use-persistent-state";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const gradePoints: { [key: string]: number } = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, F: 0.0,
};

const courseSchema = z.object({
  name: z.string().optional(),
  grade: z.string().refine(val => Object.keys(gradePoints).includes(val), { message: "Required" }),
  credits: z.coerce.number().min(0.1, { message: "Must be > 0" }).max(10, {message: "< 10"}),
});

const formSchema = z.object({
  courses: z.array(courseSchema).min(1, { message: "At least one course is required." }),
});

type FormValues = z.infer<typeof formSchema>;


export default function GpaCalculator({ setFormula }: { setFormula: (formula: string) => void }) {
  const [gpa, setGpa] = useState<number | null>(null);
  
  const [defaultCourses, setDefaultCourses] = usePersistentState<FormValues['courses']>('gpa-courses', [{ name: "Example Course", grade: "A", credits: 3 }]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courses: defaultCourses,
    },
     mode: "onChange",
  });
  
  useEffect(() => {
    form.reset({ courses: defaultCourses });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCourses]);
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses",
  });
  
  const watchedCourses = form.watch('courses');
  
  useEffect(() => {
    if(watchedCourses.length > 0) {
        setDefaultCourses(watchedCourses);
    }
  }, [watchedCourses, setDefaultCourses]);


  const onSubmit = (data: FormValues) => {
    let totalPoints = 0;
    let totalCredits = 0;

    data.courses.forEach((course) => {
      const credits = Number(course.credits);
      if (credits > 0 && gradePoints[course.grade] !== undefined) {
        totalPoints += gradePoints[course.grade] * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      setGpa(totalPoints / totalCredits);
    } else {
      setGpa(null);
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>GPA Calculator</CardTitle>
            <CardDescription>
              Enter your courses, grades, and credit hours to calculate your
              Grade Point Average.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <div className="hidden md:grid md:grid-cols-[1fr_140px_110px_auto] gap-2 items-center mb-2">
                    <Label>Course Name (Optional)</Label>
                    <Label>Grade</Label>
                    <Label>Credits</Label>
                    <span className="w-8"></span>
                  </div>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_140px_110px_auto] items-start gap-2 p-2 border rounded-lg"
                    >
                      <FormField
                        control={form.control}
                        name={`courses.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="md:space-y-0">
                             <Label className="md:hidden mb-1">Course Name (Optional)</Label>
                              <FormControl>
                                  <Input {...field} placeholder="e.g. Intro to Physics" />
                              </FormControl>
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name={`courses.${index}.grade`}
                        render={({ field }) => (
                            <FormItem className="md:space-y-0">
                                <Label className="md:hidden mb-1">Grade</Label>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger aria-label="Course grade">
                                            <SelectValue placeholder="Grade" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {Object.keys(gradePoints).map((grade) => (
                                        <SelectItem key={grade} value={grade}>
                                        {grade}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name={`courses.${index}.credits`}
                        render={({ field }) => (
                            <FormItem className="md:space-y-0">
                                <Label className="md:hidden mb-1">Credits</Label>
                                <FormControl>
                                    <Input {...field} type="number" placeholder="Credits" step="0.1"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 self-center justify-self-end md:justify-self-center"
                        aria-label={`Remove course ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <Button type="button" variant="outline" onClick={() => append({ name: "", grade: "A", credits: 3 })}>
                    <Plus className="mr-2" /> Add Course
                  </Button>
                  <Button type="submit">Calculate GPA</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About GPA Calculation</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is GPA?</AccordionTrigger>
                        <AccordionContent>
                            GPA, or Grade Point Average, is a standard way of measuring academic achievement. It's a numerical representation of your average grade, weighted by the number of credits for each course.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is GPA Calculated?</AccordionTrigger>
                        <AccordionContent>
                            Each letter grade is assigned a point value (e.g., A=4.0, B=3.0). This value is multiplied by the number of credits for that course to get the total "quality points." The sum of all quality points is then divided by the total number of credits to find the GPA.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is a "Weighted" vs. "Unweighted" GPA?</AccordionTrigger>
                        <AccordionContent>
                           An **unweighted GPA** is typically on a 4.0 scale, where an 'A' is always a 4.0. A **weighted GPA** gives extra points for more challenging classes, like Honors or AP courses. For example, an 'A' in an AP class might be worth 5.0 points. This calculator computes an unweighted GPA.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your GPA</CardTitle>
          </CardHeader>
          <CardContent className="text-center" aria-live="polite">
            <p className="text-6xl font-bold font-headline text-primary my-2">
              {gpa !== null ? gpa.toFixed(2) : "-"}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
