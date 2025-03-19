import { SignUpForm } from "@/components/molecules/SignUpForm";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex items-center h-screen">
      <div className="border rounded-lg mx-auto w-full max-w-md py-8 px-4 flex flex-col gap-8">
        <h2 className="text-center text-3xl font-bold">Sign Up</h2>

        <p className="text-center">
          Sign up to get started! Create an account with your email and
          password. Join us in just a few clicks!
        </p>

        <SignUpForm />
        <Link href="/auth/signin">Already have an account? Sign In</Link>
      </div>
    </main>
  );
}
