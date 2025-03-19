"use client";

import { signIn } from "@/services/actions/auth";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AuthSchema } from "@/schemas/Auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

export function SignInForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { executeAsync, isExecuting } = useAction(signIn, {
    onSuccess: ({ data }) => {
      router.replace("/ai-detection");
      localStorage.setItem("user", JSON.stringify(data));
    },
    onError: () => {
      toast.error("Invalid credentials");
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await executeAsync(form.getValues());
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button variant={"outline"} type="submit" disabled={isExecuting}>
            Enter
          </Button>
        </div>
      </form>
    </Form>
  );
}
