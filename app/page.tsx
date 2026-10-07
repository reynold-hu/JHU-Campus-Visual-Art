"use client";

import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import HomewoodAtlas from "@/components/HomewoodAtlas";

export default function HomewoodAtlasPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden">
      <Link
        href="/"
        className="fixed left-6 top-20 z-40 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-amber-200 md:left-10"
      >
        <ArrowLeftOutlined className="text-xs" />
        JHU Homewood Campus Visual Archive
      </Link>
      <HomewoodAtlas />
    </main>
  );
}
