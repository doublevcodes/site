import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Hotkeys } from "@/components/Hotkeys";
import { SiteHeader } from "@/components/SiteHeader";

const bebas = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "VIVAAN",
  description: "17. London. Already building.",
};

const noFlashThemeScript = `
(() => {
  const storageKey = "theme-preference";
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem(storageKey);
    const pref =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";
    const theme =
      pref === "light"
        ? "light"
        : pref === "dark"
          ? "dark"
          : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    root.dataset.theme = theme;
  } catch {
    root.dataset.theme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bebas.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="font-brutal-mono min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
        <Hotkeys />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
