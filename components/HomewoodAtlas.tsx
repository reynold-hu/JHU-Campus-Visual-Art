"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftOutlined,
  BranchesOutlined,
  CompassOutlined,
  EyeOutlined,
  HomeOutlined,
} from "@ant-design/icons";

type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: "amber" | "cyan" | "green";
};

type AtlasScene = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  note: string;
  parent?: string;
  hotspots: Hotspot[];
};

const sceneImageById: Record<string, string> = {
  overview: "/homewood/homewood-overview-v2.jpg",
  gilman: "/homewood/gilman-hall.jpg",
  brody: "/homewood/brody-learning-commons.jpg",
  beach: "/homewood/the-beach.jpg",
  quad: "/homewood/homewood-overview-v2.jpg",
  museum: "/homewood/homewood-overview-v2.jpg",
  clock: "/homewood/gilman-clock-tower.jpg",
  "reading-room": "/homewood/gilman-front-entrance.jpg",
  facade: "/homewood/gilman-brick-facade.jpg",
  "quiet-room": "/homewood/brody-quiet-reading.jpg",
  "study-rooms": "/homewood/brody-group-rooms.jpg",
  "mse-depth": "/homewood/brody-entry-level.jpg",
  blankets: "/homewood/beach-blankets-reading.jpg",
  paths: "/homewood/beach-diagonal-paths.jpg",
  "campus-life": "/homewood/beach-campus-rhythm.jpg",
};

const scenes: Record<string, AtlasScene> = {
  overview: {
    id: "overview",
    title: "Homewood Campus Overview",
    eyebrow: "JHU visual browser",
    description:
      "A campus visual browser: click a building, lawn, or path to move from the wide Homewood scene into a closer visual page.",
    note: "Homewood is Johns Hopkins University's 140-acre North Baltimore campus, known for red-brick buildings, tree-lined pathways, green quads, an iconic clock tower, and The Beach.",
    hotspots: [
      { id: "gilman", label: "Gilman Hall", x: 8, y: 20, w: 34, h: 38, tone: "amber" },
      { id: "brody", label: "Brody + MSE", x: 70, y: 36, w: 28, h: 36, tone: "cyan" },
      { id: "beach", label: "The Beach", x: 36, y: 50, w: 34, h: 36, tone: "green" },
    ],
  },
  gilman: {
    id: "gilman",
    title: "Gilman Hall / Clock Tower",
    eyebrow: "academic core",
    description:
      "A symbolic center of Homewood: brick academic architecture, clock tower silhouette, humanities corridors, and the campus myth of height and memory.",
    note: "Click deeper into the clock tower, the reading room, or the red-brick facade to treat the building as an explorable object.",
    parent: "overview",
    hotspots: [
      { id: "clock", label: "Clock tower", x: 42, y: 2, w: 19, h: 45, tone: "amber" },
      { id: "reading-room", label: "Front entrance", x: 35, y: 55, w: 27, h: 27, tone: "cyan" },
      { id: "facade", label: "Brick facade", x: 18, y: 37, w: 58, h: 34, tone: "green" },
    ],
  },
  clock: {
    id: "clock",
    title: "Clock Tower",
    eyebrow: "architectural detail",
    description:
      "A closer look at the tower as a campus landmark: clock face, brick shaft, stone crown, and the skyline around Homewood.",
    note: "This detail card keeps the focus on one architectural object. Use the breadcrumb or back control to return to Gilman.",
    parent: "gilman",
    hotspots: [],
  },
  "reading-room": {
    id: "reading-room",
    title: "Front Entrance",
    eyebrow: "threshold",
    description:
      "The entrance layer: columns, steps, students, and the moment where the building turns from object into daily campus route.",
    note: "This card is a small architectural pause before returning to the wider Gilman scene.",
    parent: "gilman",
    hotspots: [],
  },
  facade: {
    id: "facade",
    title: "Brick Facade",
    eyebrow: "material study",
    description:
      "A quiet surface study of red brick, sash windows, stone trim, and tree shadows across the academic facade.",
    note: "This card treats the building as texture and material rather than only as a landmark.",
    parent: "gilman",
    hotspots: [],
  },
  brody: {
    id: "brody",
    title: "Brody Learning Commons / MSE",
    eyebrow: "study engine",
    description:
      "Brody connects to the Milton S. Eisenhower Library and turns the library edge into a social, bright, always-on study machine.",
    note: "Brody includes group study rooms, a quiet reading room, a cafe, special collections, and conservation/preservation spaces.",
    parent: "overview",
    hotspots: [
      { id: "quiet-room", label: "Quiet reading", x: 28, y: 25, w: 24, h: 30, tone: "cyan" },
      { id: "study-rooms", label: "Group rooms", x: 52, y: 28, w: 36, h: 34, tone: "green" },
      { id: "mse-depth", label: "Entry level", x: 43, y: 58, w: 28, h: 28, tone: "amber" },
    ],
  },
  "quiet-room": {
    id: "quiet-room",
    title: "Quiet Reading",
    eyebrow: "study layer",
    description:
      "A calm Brody interior focused on daylight, long tables, glass, and the quiet rhythm of deep study.",
    note: "This detail card turns the building from exterior object into a working learning space.",
    parent: "brody",
    hotspots: [],
  },
  "study-rooms": {
    id: "study-rooms",
    title: "Group Rooms",
    eyebrow: "collaboration layer",
    description:
      "A closer view of the glass-walled rooms where Brody becomes collaborative infrastructure.",
    note: "This card keeps the atmosphere lively without turning the lab into a heavy information page.",
    parent: "brody",
    hotspots: [],
  },
  "mse-depth": {
    id: "mse-depth",
    title: "Entry Level",
    eyebrow: "circulation layer",
    description:
      "The threshold of Brody: glass, stairs, movement, and the everyday transition from campus path to study space.",
    note: "This card represents the building as a route, not only as a facade.",
    parent: "brody",
    hotspots: [],
  },
  beach: {
    id: "beach",
    title: "The Beach",
    eyebrow: "student rhythm",
    description:
      "The open lawn acts like a social field: reading, people-watching, crossing campus, and spreading out between classes.",
    note: "JHU calls it The Beach even though there is no sand or surf. The value is the park-like pause in the middle of the campus.",
    parent: "overview",
    hotspots: [
      { id: "blankets", label: "Blankets + reading", x: 27, y: 50, w: 48, h: 36, tone: "green" },
      { id: "paths", label: "Diagonal paths", x: 3, y: 44, w: 92, h: 22, tone: "cyan" },
      { id: "campus-life", label: "Campus rhythm", x: 40, y: 31, w: 28, h: 30, tone: "amber" },
    ],
  },
  blankets: {
    id: "blankets",
    title: "Blankets + Reading",
    eyebrow: "lawn detail",
    description:
      "A close campus-life card for the quieter side of The Beach: blankets, books, laptops, and long grass-light afternoons.",
    note: "This card turns the lawn into a personal pause rather than only a landscape.",
    parent: "beach",
    hotspots: [],
  },
  paths: {
    id: "paths",
    title: "Diagonal Paths",
    eyebrow: "movement layer",
    description:
      "The path geometry of The Beach: students crossing, routes folding through the lawn, and movement becoming part of the map.",
    note: "This card is useful for the broader life-atlas metaphor: places as routes, not only points.",
    parent: "beach",
    hotspots: [],
  },
  "campus-life": {
    id: "campus-life",
    title: "Campus Rhythm",
    eyebrow: "social layer",
    description:
      "The everyday tempo of The Beach: small groups, passing conversations, reading, walking, and the soft noise of campus life.",
    note: "This card is a lightweight memory object, closer to a field note than a guidebook entry.",
    parent: "beach",
    hotspots: [],
  },
  quad: {
    id: "quad",
    title: "Wyman Quad",
    eyebrow: "green geometry",
    description:
      "A formal campus room made from lawn, paths, and brick edges. It works as a navigation surface and a visual reset.",
    note: "This node treats the quad as an interface: paths are choices, buildings are anchors, trees are soft borders.",
    parent: "overview",
    hotspots: [
      { id: "north-path", label: "North path", x: 18, y: 31, w: 30, h: 16, tone: "cyan" },
      { id: "brick-edge", label: "Brick edge", x: 59, y: 25, w: 20, h: 30, tone: "amber" },
      { id: "tree-line", label: "Tree line", x: 30, y: 60, w: 42, h: 16, tone: "green" },
    ],
  },
  museum: {
    id: "museum",
    title: "Homewood Museum",
    eyebrow: "historic layer",
    description:
      "A quieter historical node near the campus edge, useful for turning the map from a facilities view into a time-depth view.",
    note: "The lab can later connect this kind of node to archival photos, short captions, and walking-route memories.",
    parent: "overview",
    hotspots: [
      { id: "estate", label: "Estate geometry", x: 26, y: 32, w: 25, h: 28, tone: "amber" },
      { id: "garden", label: "Garden edge", x: 54, y: 45, w: 26, h: 20, tone: "green" },
      { id: "archive", label: "Archive layer", x: 34, y: 65, w: 28, h: 14, tone: "cyan" },
    ],
  },
};

const fallbackScene = (id: string): AtlasScene => ({
  id,
  title: id
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" "),
  eyebrow: "detail page",
  description:
    "A closer visual card opened from the previous hotspot. The prototype keeps the experience local, fast, and curated.",
  note: "This node is intentionally compact. Use the breadcrumb to move back, or return to the campus overview.",
  parent: inferParent(id),
  hotspots: [
    { id: "overview", label: "Return to campus", x: 34, y: 46, w: 32, h: 16, tone: "amber" },
  ],
});

function inferParent(id: string) {
  if (["clock", "reading-room", "facade"].includes(id)) return "gilman";
  if (["quiet-room", "study-rooms", "mse-depth"].includes(id)) return "brody";
  if (["blankets", "paths", "campus-life"].includes(id)) return "beach";
  if (["north-path", "brick-edge", "tree-line"].includes(id)) return "quad";
  if (["estate", "garden", "archive"].includes(id)) return "museum";
  return "overview";
}

const toneStyles = {
  amber: "border-amber-200/60 bg-amber-200/10 text-amber-100 shadow-[0_0_32px_rgba(252,211,77,0.12)]",
  cyan: "border-cyan-200/60 bg-cyan-200/10 text-cyan-100 shadow-[0_0_32px_rgba(103,232,249,0.12)]",
  green: "border-emerald-200/60 bg-emerald-200/10 text-emerald-100 shadow-[0_0_32px_rgba(110,231,183,0.12)]",
};

export default function HomewoodAtlas() {
  const [sceneId, setSceneId] = useState("overview");
  const [hovered, setHovered] = useState<string | null>(null);
  const scene = scenes[sceneId] ?? fallbackScene(sceneId);
  const path = useMemo(() => buildPath(scene.id), [scene.id]);
  const activeHotspot = scene.hotspots.find((hotspot) => hotspot.id === hovered);
  const parentScene = scene.parent ? scenes[scene.parent] ?? fallbackScene(scene.parent) : null;

  const openScene = (nextSceneId: string) => {
    if (nextSceneId === sceneId) return;
    setHovered(null);
    setSceneId(nextSceneId);
  };

  return (
    <div className="homewood-notes min-h-screen bg-[#f5f4ef] text-[#181817]">
      <div className="grid min-h-screen lg:grid-cols-[1fr_360px]">
        <section className="relative min-h-[720px] overflow-hidden border-r border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(245,213,138,0.13),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="relative z-10 flex h-full min-h-[720px] flex-col p-6 pt-28 md:p-10 md:pt-28">
            <header className="flex flex-col gap-6 border-b border-white/10 pb-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openScene("overview")}
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-amber-200"
                  >
                    <HomeOutlined className="text-xs" />
                    Campus root
                  </button>
                  {parentScene ? (
                    <button
                      type="button"
                      onClick={() => openScene(parentScene.id)}
                      className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-amber-200/40 hover:text-amber-100"
                    >
                      <ArrowLeftOutlined className="text-[10px]" />
                      Back to {parentScene.title}
                    </button>
                  ) : null}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`heading-${scene.id}`}
                    initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/55">{scene.eyebrow}</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white md:text-6xl">{scene.title}</h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">{scene.description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
                {path.map((item, index) => (
                  <button
                    type="button"
                    key={`${item.id}-${index}`}
                    onClick={() => openScene(item.id)}
                    className="border border-white/10 bg-white/[0.025] px-3 py-2 transition-colors hover:border-amber-200/40 hover:text-amber-100"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </header>

            <div className="relative mt-8 flex flex-1 items-center justify-center">
              <div className="relative aspect-[16/10] w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#15120e] bg-[#f1eadc] text-zinc-950 shadow-[0_40px_120px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${scene.id}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.025, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.985, filter: "blur(10px)" }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CampusImage scene={scene} />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-zinc-950/15 bg-[#f8f1e5]/88 px-4 py-3 text-xs text-zinc-700 backdrop-blur">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-zinc-950/25" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-zinc-950/25" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-zinc-950/25" />
                    <span className="ml-3 truncate rounded-full border border-zinc-950/15 bg-white/55 px-4 py-1.5">
                      Homewood Campus / {path.map((item) => item.title).join(" / ")}
                    </span>
                  </div>
                  {parentScene ? (
                    <button
                      type="button"
                      onClick={() => openScene(parentScene.id)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-950/20 bg-zinc-950 px-3 py-1.5 font-medium text-[#fff6dc] shadow-sm transition-colors hover:bg-zinc-800"
                    >
                      <ArrowLeftOutlined className="text-[10px]" />
                      Back
                    </button>
                  ) : null}
                </div>

                <div className="absolute inset-x-0 bottom-0 top-14">
                  {scene.hotspots.map((hotspot, index) => {
                    const isActive = hovered === hotspot.id;
                    const markerLeft = hotspot.x + hotspot.w / 2;
                    const markerTop = hotspot.y + hotspot.h / 2;

                    return (
                      <motion.button
                        type="button"
                        key={hotspot.id}
                        onClick={() => openScene(hotspot.id)}
                        onMouseEnter={() => setHovered(hotspot.id)}
                        onMouseLeave={() => setHovered(null)}
                        initial={{ opacity: 0, scale: 0.86 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ delay: 0.12 + index * 0.04, duration: 0.22 }}
                        className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          left: `${markerLeft}%`,
                          top: `${markerTop}%`,
                        }}
                        aria-label={`Explore ${hotspot.label}`}
                      >
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-full border text-[12px] font-semibold text-zinc-950 shadow-[0_10px_28px_rgba(0,0,0,0.32)] transition-all duration-200 ${
                            isActive
                              ? "border-amber-100 bg-[#fff6dc] ring-4 ring-amber-100/35"
                              : "border-black/25 bg-[#fff6dc]/86 ring-2 ring-white/30 hover:bg-[#fff6dc] hover:ring-amber-100/45"
                          }`}
                        >
                          +
                        </span>
                        <span
                          className={`pointer-events-none absolute left-1/2 top-12 max-w-[9rem] -translate-x-1/2 whitespace-nowrap rounded-full border border-black/20 bg-[#fff6dc]/95 px-2.5 py-1 text-[10px] font-medium text-zinc-950 shadow-sm transition-opacity ${
                            isActive ? "opacity-100" : "opacity-80"
                          }`}
                        >
                          {hotspot.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="relative z-10 flex min-h-screen flex-col border-t border-white/10 bg-black/35 pt-24 lg:border-t-0">
          <div className="border-b border-white/10 p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">Visual browser</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Click the scene</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              A fixed-theme visual browser inspired by Flipbook: the whole canvas behaves like one scene, and each region can become the next page.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`metrics-${scene.id}`}
              className="grid gap-3 border-b border-white/10 p-7"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
            >
              <InfoMetric icon={<EyeOutlined />} label="scene" value={scene.title} />
              <InfoMetric icon={<BranchesOutlined />} label="hotspots" value={`${scene.hotspots.length} active regions`} />
              <InfoMetric icon={<CompassOutlined />} label="mode" value="scene browser" />
            </motion.div>
          </AnimatePresence>

          <div className="flex-1 p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-600">Current focus</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`focus-${scene.id}-${activeHotspot?.id ?? "scene"}`}
                className="mt-5 border border-white/10 bg-white/[0.02] p-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-medium text-white">{activeHotspot?.label ?? scene.title}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  {activeHotspot
                    ? `Click to open a closer visual page for ${activeHotspot.label}.`
                    : scene.note}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 space-y-2">
              {scene.hotspots.map((hotspot) => (
                <button
                  type="button"
                  key={hotspot.id}
                  onClick={() => openScene(hotspot.id)}
                  onMouseEnter={() => setHovered(hotspot.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex w-full items-center justify-between border px-4 py-3 text-left text-sm transition-colors ${
                    hovered === hotspot.id
                      ? toneStyles[hotspot.tone]
                      : "border-white/10 bg-white/[0.018] text-zinc-500 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <span>{hotspot.label}</span>
                  <span className="text-xs">open</span>
                </button>
              ))}
            </div>
          </div>

          {scene.parent ? (
            <button
              type="button"
              onClick={() => openScene(scene.parent ?? "overview")}
              className="m-7 mt-0 inline-flex items-center justify-center gap-2 border border-white/10 px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-amber-200/40 hover:text-amber-100"
            >
              <ArrowLeftOutlined className="text-xs" />
              Back one layer
            </button>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function buildPath(id: string) {
  const chain: { id: string; title: string }[] = [];
  let cursor: string | undefined = id;
  let guard = 0;

  while (cursor && guard < 4) {
    const pathScene: AtlasScene = scenes[cursor] ?? fallbackScene(cursor);
    chain.unshift({ id: pathScene.id, title: pathScene.title });
    cursor = pathScene.parent;
    guard += 1;
  }

  return chain;
}

function InfoMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[2rem_1fr] gap-3 border border-white/10 bg-white/[0.018] p-4">
      <span className="text-amber-200/70">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">{label}</p>
        <p className="mt-1 text-sm text-zinc-300">{value}</p>
      </div>
    </div>
  );
}

function CampusImage({ scene }: { scene: AtlasScene }) {
  const imageSrc = sceneImageById[scene.id] ?? sceneImageById[inferParent(scene.id)] ?? sceneImageById.overview;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#efe5d4]">
      <Image
        key={imageSrc}
        src={imageSrc}
        alt={`${scene.title} illustrated campus scene`}
        fill
        priority={scene.id === "overview"}
        sizes="(min-width: 1024px) calc(100vw - 360px), 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,transparent_42%,rgba(0,0,0,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,226,0.18),transparent_30%,rgba(26,18,10,0.1))]" />
    </div>
  );
}
