import { SignInForm } from "@/components/molecules/SignInForm";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex items-center h-screen">
      <div className="border rounded-lg mx-auto w-full max-w-md py-8 px-4 flex flex-col gap-8">
        <h2 className="text-center text-3xl font-bold">Sign In</h2>

        <p className="text-center">
          Welcome back! Please enter your username and password to access your
          account.
        </p>

        <SignInForm />

        <Link href="/auth/signup">
          Don&apos;t have an account? Sign up now!
        </Link>
      </div>
    </main>
  );
}
