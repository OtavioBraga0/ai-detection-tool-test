import { Purpose, Readability, Strength } from "@prisma/client";
import * as zod from "zod";

export const AIDetectionSchema = zod.object({
  content: zod
    .string()
    .min(3, { message: "Content must be at least 3 characters" }),
  readability: zod.nativeEnum(Readability),
  purpose: zod.nativeEnum(Purpose),
  strength: zod.nativeEnum(Strength),
});
