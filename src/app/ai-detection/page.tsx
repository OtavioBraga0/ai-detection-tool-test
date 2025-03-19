import { Header } from "@/components/molecules/Header";
import { AIDetectionModal } from "@/components/organisms/AIDetectionModal";
import { AITable } from "@/components/organisms/AITable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Page() {
  const cookie = await cookies();

  const token = cookie.get("token")?.value;

  if (!token) {
    redirect("/auth/signin");
  }

  return (
    <>
      <Header />
      <main className="flex flex-col gap-5 h-screen px-4 py-5 ">
        <AIDetectionModal />
        <AITable />
      </main>
    </>
  );
}
