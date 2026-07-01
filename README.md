# Mapping Tournai

Public Hugo website for Mapping Tournai: field notes, coverage status pages, charts, images, and Leaflet maps generated from the local Mapillary/PostGIS analysis workflow.

This repository intentionally contains only the public website assets. Local analysis scripts, virtual environments, raw exports, credentials, and capture-planning tools stay outside the published repo.

## Local Preview

```bash
hugo server
```

Open <http://localhost:1313/>.

The Compose theme is loaded as a Hugo Module through `go.mod`, so Go must be available when Hugo resolves modules.

## Published Data

The site publishes:

- Markdown content under `content/`
- Hugo layouts and Sass customizations
- static images, charts, JavaScript, Leaflet assets, JSON summaries, and GeoJSON map data under `static/`
- the current public domain configuration in `static/CNAME`

The heavy local workflow that refreshes Mapillary/PostGIS data and regenerates pages is kept private for now.

## Deployment

Every push to `main` builds the Hugo site with GitHub Actions and deploys it to GitHub Pages.

The custom domain is:

```text
mapping-tournai.be
```
