import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JHU Homewood Campus Visual Art",
  description: "Illustrated campus references and visual studies of Johns Hopkins University's Homewood campus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
