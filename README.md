# Homewood Atlas

Homewood Atlas is a browser-native visual explorer for Johns Hopkins University's Homewood campus.

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
