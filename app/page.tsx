import { Hero } from "@/components/Hero";
import { NowBlock } from "@/components/NowBlock";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col overflow-x-hidden">
      <Hero />
      <NowBlock />
    </main>
  );
}
