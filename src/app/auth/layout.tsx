import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await cookies();

  const token = cookie.get("token")?.value;

  if (token) {
    redirect("/ai-detection");
  }

  return <>{children}</>;
}
