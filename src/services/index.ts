import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

export const prismaClient = new PrismaClient();

export const supabaseClient = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_API_KEY as string
);
