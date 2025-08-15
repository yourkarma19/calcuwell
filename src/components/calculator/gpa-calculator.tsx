"use client";

import { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
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

const gradePoints: { [key: string]: number } = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, F: 0.0,
};

type FormValues = {
  courses: {
    name: string;
    grade: string;
    credits: number;
  }[];
};

export default function GpaCalculator() {
  const [gpa, setGpa] = useState<number | null>(null);
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      courses: [{ name: "Example Course", grade: "A", credits: 3 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-y-2">
                <div className="hidden md:grid md:grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
                  <Label htmlFor="course-name-header">Course Name</Label>
                  <Label htmlFor="course-grade-header">Grade</Label>
                  <Label htmlFor="course-credits-header">Credits</Label>
                  <span className="w-8"></span>
                </div>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto_auto] items-center gap-2 p-2 border rounded-lg"
                  >
                    <Input
                      {...register(`courses.${index}.name`)}
                      placeholder="Course Name (Optional)"
                      className="flex-grow"
                      id={`course-name-header-${index}`}
                      aria-label="Course name"
                    />
                    <Controller
                      control={control}
                      name={`courses.${index}.grade`}
                      render={({ field }) => (
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full md:w-32" aria-label="Course grade">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(gradePoints).map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      {...register(`courses.${index}.credits`)}
                      type="number"
                      placeholder="Credits"
                      className="w-full md:w-24"
                      step="0.1"
                      aria-label="Course credits"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
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
          </CardContent>
        </Card>
        <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground flex items-start gap-4">
                <Info className="w-5 h-5 mt-1 shrink-0" />
                <div>
                    <p><span className="font-semibold text-foreground">How it's calculated:</span> GPA is the sum of (Grade Points × Credit Hours) for all courses, divided by the total number of Credit Hours.</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your GPA</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-6xl font-bold font-headline text-primary my-2">
              {gpa !== null ? gpa.toFixed(2) : "-"}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
