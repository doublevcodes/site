import { Hero } from "@/components/Hero";
import { NowBlock } from "@/components/NowBlock";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Hero />
      <NowBlock />
    </main>
  );
}
