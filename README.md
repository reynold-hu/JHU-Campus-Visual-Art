<p align="center">
  <img src="public/jhu-logo.png" alt="Johns Hopkins University" width="180"/>
</p>

<p align="center">
  <strong>JHU Homewood Campus Visual Archive</strong>
</p>

**JHU Homewood Campus Visual Archive is a browser-native visual study of
Johns Hopkins University's Homewood campus.** Start from a wide illustrated
campus scene; open a hotspot; move into Gilman Hall, Brody Learning Commons,
The Beach, or a smaller architectural detail; return through the visual
breadcrumb.

> **What this is:** a personal visual reference system for campus architecture,
> routes, materials, and everyday campus rhythm.
>
> **What this is not:** an official Johns Hopkins University website, campus
> map, archival collection, or university-endorsed product.

```
campus overview
        │
        ▼
  ┌───────────────┐       ┌──────────────────┐
  │ visual scene   │ ────▶ │ hotspot / region │
  │ Homewood       │       │ Gilman / Brody   │
  └───────┬───────┘       └────────┬─────────┘
          │                        │
          ▼                        ▼
   campus-life detail       architectural study
   The Beach / paths        clock / facade / rooms
          │                        │
          └───────────┬────────────┘
                      ▼
             breadcrumb back to context
```

## Why this exists

Campus information is usually split between a facilities list, a map, and a
photo gallery. Those formats are useful, but they flatten the feeling of a
place.

This project keeps the visual relationships visible: buildings sit inside a
campus, paths connect spaces, and small details lead back to a larger scene.
The result is closer to an illustrated field reference than a conventional
campus website.

## What is included

- **Campus overview** — a broad illustrated Homewood scene with clickable regions.
- **Gilman Hall** — clock tower, entrance, and brick facade studies.
- **Brody Learning Commons** — quiet reading, group rooms, and entry-level views.
- **The Beach** — blankets, diagonal paths, and everyday campus rhythm.
- **Scene hierarchy** — every detail keeps a parent scene and a way back.
- **Warm paper interface** — the visual language follows the companion Reynold Hu bio site.

## Quick start

```sh
git clone git@github.com:reynold-hu/JHU-Campus-Visual-Art.git
cd JHU-Campus-Visual-Art
npm install
npm run dev
```

Open <http://localhost:3000>.

For a production check:

```sh
npm run build
npm run start
```

## How the project is shaped

The scene graph lives in [`components/HomewoodAtlas.tsx`](components/HomewoodAtlas.tsx).
Each scene owns its image, description, note, parent scene, and hotspots. A
new building or campus detail is added as a connected scene node rather than
as an unrelated page.

```text
app/page.tsx              standalone route and metadata
components/HomewoodAtlas.tsx
                          scenes, hotspots, transitions, breadcrumbs
public/homewood/          generated campus scene images
public/covers/            repository preview artwork
public/jhu-logo.png       README context mark
```

## Honest limits

- The images are illustrative visual references, not measured architectural
  documentation.
- The scene coordinates are curated interface hotspots, not GIS data.
- The project currently favors visual exploration over exhaustive campus
  coverage.
- The JHU logo and institutional names remain the property of Johns Hopkins
  University; their presence here does not imply endorsement.

## Image provenance

The campus scene images in `public/homewood/` and the preview artwork in
`public/covers/` were generated with GPT for this personal visual study. They
are mock references and do not represent official Johns Hopkins University
photography, architectural records, or an official university asset library.

More detail is recorded in [`ASSETS.md`](ASSETS.md).

## Copyright and usage

Copyright © 2026 Reynold Hu. All rights reserved.

This is a controlled collaboration repository. No open-source license is
granted. The source code, generated images, visual compositions, copy, and
interaction design may not be independently copied, republished, relicensed,
packaged, or used commercially without written permission.

GitHub forks are the approved collaboration path. A fork must preserve this
README, the copyright notice, asset provenance, and attribution. A fork does
not grant permission to distribute an unrelated standalone copy or remove
the rights notices.

See [`LICENSE`](LICENSE) and [`ASSETS.md`](ASSETS.md).
