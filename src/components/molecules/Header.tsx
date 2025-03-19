"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { signOut } from "@/services/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function Header() {
  const [user, setUser] = useState<User | null>(null);

  const route = useRouter();

  const { executeAsync, isExecuting } = useAction(signOut, {
    onSuccess: () => {
      localStorage.removeItem("user");
      route.replace("/auth/signin");
    },
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);

  return (
    <header className="border-b py-2 px-4">
      <div className="flex items-center gap-2 w-full">
        <span className="text-lg">AI Detection</span>
        <div className="flex-1 flex justify-end items-center gap-2">
          {user && (
            <span className="text-sm hidden sm:block">{user.email}</span>
          )}

          {user ? (
            <Button
              variant={"outline"}
              onClick={() => executeAsync()}
              disabled={isExecuting}
            >
              Sign Out
            </Button>
          ) : (
            <Button asChild variant={"outline"}>
              <Link href="/auth/signin">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
