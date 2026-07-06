---
title: Coverage status
description: Current approximate Mapillary coverage across the Tournai road network.
---

This page keeps the original baseline visible while tracking the current state of the analysis.

## Starting baseline

The first public baseline used **11,727 Mapillary image points**. It classified **151 km** as covered, **71 km** as partial, and **1,123 km** as missing, for **11.21% covered** across the analysed road network.

## Current global state

The current analysis includes **6,313 road segments** and **1,345 km** of roads. It now finds:

- **402 km covered**
- **161 km partial**
- **782 km missing**
- **29.87% covered**

The current dataset contains metadata for **68,681 Mapillary image points**, with captures ranging from **2015-02-19** to **2026-07-03**. When roads are split by analysis-area boundaries, the 6,313 source segments become 6,775 area-level pieces.

## Tournai centre focus

The current `Tournai` analysis unit is a little wider than the strict inside-the-boulevards target, but it is the working unit used for now. It contains **231 km** of analysed road pieces.

For the street-level 360 workflow, the current QGIS layer classifies:

- **38.37 km** as `full_360`
- **46.98 km** as `old_coverage`
- **26.99 km** as `partial_coverage`
- **3.62 km** as `to_redo`
- **114.84 km** as `no_coverage`

The immediate field goal remains narrower than the whole unit: reach complete 360-degree coverage inside the boulevards, then expand the same method outward.

{{< leaflet-map data="/maps/data/current/tournai-coverage-quality.geojson" kind="quality" title="Tournai coverage quality" >}}

The map intentionally leaves roads with no detected images unstyled. It focuses on the parts of the centre where Mapillary evidence exists and distinguishes 360 coverage, front-facing coverage, freshness, and review cases.

## Global coverage map

The previous global coverage map is still exported as historical data, but it is no longer shown here because it mixed a simpler point-density model with the newer street-level 360 model.
