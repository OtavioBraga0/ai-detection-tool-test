"use client";

import { Textarea } from "../atoms/Textarea";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AIDetectionSchema } from "@/schemas/AIDetection.schema";
import { submitAiDetection } from "@/services/actions/aiDetection";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";

import { Label } from "../ui/label";

const DEFAULT_VALUE = {
  content: "",
};

export function AiDetection() {
  const { executeAsync, isExecuting } = useAction(submitAiDetection, {
    onSuccess: () => {
      toast.success("Submitted successfully");
    },
    onError: () => {
      toast.error("Something went worng");
    },
  });

  const form = useForm({
    resolver: zodResolver(AIDetectionSchema),
    defaultValues: DEFAULT_VALUE,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await executeAsync(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label>Content</Label>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end" disabled={isExecuting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
