import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homewood Atlas",
  description: "A visual browser for wandering through Johns Hopkins University's Homewood campus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
