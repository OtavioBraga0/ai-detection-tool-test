import { Paragraph } from "@/components/atoms/Paragraph";
import { Title } from "@/components/atoms/Title";
import { Header } from "@/components/molecules/Header";
import { Button } from "@/components/ui/button";
import { IHomeContent } from "@/entities/Home.type";
import { getStrapiData } from "@/services/strapi/get-strapi-data";
import Link from "next/link";

let loadedContent: IHomeContent | undefined;

async function loader() {
  loadedContent = await getStrapiData("home");
}

export default function Home() {
  loader();

  return (
    <div>
      <Header />

      <div className="flex flex-col items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-10 row-start-2 w-full items-center">
          {loadedContent && (
            <>
              {loadedContent.Title && (
                <Title className="text-center">
                  {loadedContent.Title.text}
                </Title>
              )}
              {loadedContent.Paragraph && (
                <Paragraph className="text-center">
                  {loadedContent.Paragraph.content}
                </Paragraph>
              )}

              {loadedContent.Button && (
                <Link href="/ai-detection">
                  <Button type="button">{loadedContent.Button.text}</Button>
                </Link>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
