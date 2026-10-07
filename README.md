<p align="center">
  <img src="public/jhu-logo.png" alt="Johns Hopkins University" width="180" />
</p>

<h1 align="center">JHU Homewood Campus Visual Archive</h1>

<p align="center">
  An illustrated browser for architectural references, campus routes, and visual studies of Johns Hopkins University's Homewood campus.
</p>

<p align="center">
  <a href="https://github.com/reynold-hu/JHU-Campus-Visual-Art">Repository</a> ·
  <a href="https://www.jhu.edu/">Johns Hopkins University</a>
</p>

This project turns a curated set of Homewood campus scenes into a browser-native visual archive. Start with the campus overview, open a hotspot, move into Gilman Hall, Brody Learning Commons, The Beach, or a smaller architectural and campus-life study, then return through the visual breadcrumb.

The project is an independent personal visual study. It is not an official Johns Hopkins University website, archive, or affiliated product.

The interface treats the campus as a set of connected visual scenes. Start with the overview, open a hotspot, move into a building or campus-life detail, and use the breadcrumb to return through the visual hierarchy.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project shape

- `app/page.tsx` — standalone route shell
- `components/HomewoodAtlas.tsx` — scene graph, hotspots, transitions, and visual browser
- `public/homewood/` — campus imagery used by the scene graph

The current scenes are a curated public visual study. The interface is designed so future work can add archival images, walking routes, memory cards, or map coordinates without changing the core navigation model.

## Image and asset provenance

The campus scene images in `public/homewood/` and the preview image in `public/covers/` were generated with GPT for this personal visual study. They are illustrative mock references and do not represent official photography, exact architectural documentation, or an official JHU asset library.

The Johns Hopkins University name and logo belong to Johns Hopkins University. The logo is shown for identification and context only; this project does not claim university endorsement or affiliation.

## Copyright and usage

Copyright © 2026 Reynold Hu. All rights reserved.

This repository is published for review and controlled collaboration. No open-source license is granted. The source code, generated images, visual compositions, copy, and interaction design may not be independently copied, republished, relicensed, packaged, or used commercially without written permission.

GitHub forks are the approved collaboration path for this repository. A fork must preserve this README, copyright notice, asset provenance, and attribution. A fork does not grant permission to distribute an unrelated standalone copy or remove the attribution and rights notices.

See [LICENSE](./LICENSE) and [ASSETS.md](./ASSETS.md).
