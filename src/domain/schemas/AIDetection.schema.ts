import * as zod from "zod";

export const AIDetectionSchema = zod.object({
  content: zod
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
});

export const AIDetectionDeleteSchema = zod.object({
  id: zod.string(),
});
