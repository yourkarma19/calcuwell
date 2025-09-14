"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AboutCgpaCalculator from "./about/cgpa-calculator";

const semesterSchema = z.object({
  credits: z.coerce
    .number()
    .min(0.1, { message: "Must be > 0" })
    .max(50, { message: "Must be < 50" }),
  sgpa: z.coerce
    .number()
    .min(0, { message: "Must be ≥ 0" })
    .max(10, { message: "Must be ≤ 10" }),
});

const formSchema = z.object({
  semesters: z
    .array(semesterSchema)
    .min(1, { message: "At least one semester is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CgpaCalculator() {
  const [cgpa, setCgpa] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semesters: [{ credits: 20, sgpa: 8.5 }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "semesters",
  });

  const watchedSemesters = form.watch("semesters");

  useEffect(() => {
    const { semesters } = form.getValues();
    if (!form.formState.isValid) {
      setCgpa(null);
      return;
    }

    let totalCredits = 0;
    let totalWeightedSgpa = 0;

    semesters.forEach((sem) => {
      const credits = Number(sem.credits);
      const sgpa = Number(sem.sgpa);
      if (credits > 0 && sgpa >= 0) {
        totalCredits += credits;
        totalWeightedSgpa += credits * sgpa;
      }
    });

    if (totalCredits > 0) {
      setCgpa(totalWeightedSgpa / totalCredits);
    } else {
      setCgpa(null);
    }
  }, [watchedSemesters, form]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CGPA Calculator</CardTitle>
          <CardDescription>
            Enter your semester-wise SGPA and credits to get your result
            instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] items-start gap-2 p-3 border rounded-lg"
                  >
                    <FormField
                      control={form.control}
                      name={`semesters.${index}.credits`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Credits (Semester {index + 1})</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`semesters.${index}.sgpa`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SGPA (Semester {index + 1})</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="8.5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 self-center mt-7"
                      aria-label={`Remove semester ${index + 1}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-start mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ credits: 20, sgpa: 8.0 })}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Semester
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your CGPA</CardTitle>
        </CardHeader>
        <CardContent className="text-center" aria-live="polite">
          <p className="text-6xl font-bold font-headline text-primary my-2">
            {cgpa !== null ? cgpa.toFixed(2) : "-"}
          </p>
        </CardContent>
      </Card>
      <div className="mt-8">
        <AboutCgpaCalculator />
      </div>
    </div>
  );
}
