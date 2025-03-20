"use server";

import { cookies } from "next/headers";
import { supabaseClient } from "..";
import { actionClient } from ".";
import { AuthSchema } from "@/domain/schemas/Auth.schema";

export const signIn = actionClient
  .schema(AuthSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const user = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      const cookie = await cookies();

      if (!user.data.session || !user.data.user) {
        throw new Error("Invalid credentials");
      }

      cookie.set("token", user.data.session.access_token);
      cookie.set("userId", user.data.user.id);

      return user.data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });

export const signUp = actionClient
  .schema(AuthSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            confirmation_sent_at: Date.now(),
          },
        },
      });

      const user = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (!user.data.session || !user.data.user) {
        throw new Error("Invalid credentials");
      }

      const cookie = await cookies();

      cookie.set("token", user.data.session.access_token);
      cookie.set("userId", user.data.user.id);

      return user.data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });

export const signOut = actionClient.action(async () => {
  try {
    await supabaseClient.auth.signOut();
    const cookie = await cookies();
    cookie.delete("token");
    cookie.delete("userId");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
