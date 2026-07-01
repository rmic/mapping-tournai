+++
title = "Maps and data"
linkTitle = "Maps and data"
description = "Published QGIS maps and lightweight summary data from the Mapping Tournai project."
+++

# Maps and data

This section collects the public outputs used to follow Mapping Tournai: interactive maps, generated charts, and small JSON summaries derived from the local analysis pipeline.

The interactive maps are generated from the same PostGIS analysis used in QGIS. Each generation is preserved under `/maps/data/snapshots/`, while `/maps/data/current/` points to the latest version used by the website.

## Current interactive maps

{{< leaflet-map data="/maps/data/current/tournai-coverage-quality.geojson" kind="quality" title="Tournai coverage quality" >}}

Generated files include:

- `/data/global-summary.json`
- `/data/analysis-units-summary.json`
- `/data/freshness-summary.json`
- `/maps/data/manifest.json`
- `/maps/data/current/global-coverage.geojson`
- `/maps/data/current/global-freshness.geojson`
- `/maps/data/current/tournai-street-coverage.geojson`
- `/maps/data/current/tournai-coverage-quality.geojson`
- `/charts/covered-percentage-by-unit.png`
- `/charts/missing-length-by-unit.png`

The underlying figures are approximate planning indicators. See the [method](/methodology/) for category definitions and limitations.

For consistent international presentation, published kilometre values are rounded to the nearest whole kilometre and use the US/UK decimal convention. Percentages use no more than two decimal places. The unpublished local source exports retain the original measured precision.
