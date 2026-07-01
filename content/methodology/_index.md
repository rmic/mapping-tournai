+++
title = "Method"
linkTitle = "Method"
description = "How Mapping Tournai measures approximate imagery coverage and prepares capture work."
+++

# Method

## The method in plain language

The project starts with the road network from OpenStreetMap and compares it with the known locations of Mapillary images. Roads with enough nearby image points are treated as covered. Roads with only a small number of nearby points are marked as partial, while roads without nearby points are marked as missing.

The date of the most recent nearby image is also checked. This separates recent imagery from imagery that may no longer describe current conditions.

The result is an approximate planning view. It helps decide where a future capture session could add the most useful new imagery. It does not claim that every visible object has been mapped or that every road classified as covered has been photographed perfectly.

## Technical detail

- The road network is extracted from OpenStreetMap.
- Mapillary image point metadata is fetched from the Mapillary API.
- Only metadata and point locations are used. The analysis does not download or process the photographs.
- Each road segment is checked against nearby Mapillary points using a 20 m buffer.
- Approximate point density is calculated as:

```text
points_per_100m = mapillary_points_count / segment_length_m * 100
```

### Coverage categories

- **covered:** `points_per_100m >= 2`
- **partial:** `points_per_100m > 0`
- **missing:** `points_per_100m == 0`

### Freshness categories

- **fresh:** the latest image is no more than 365 days old
- **stale:** the latest image is more than 365 and no more than 1,095 days old
- **outdated:** the latest image is more than 1,095 days old
- **no_images:** there are no nearby image points
- **unknown:** nearby points exist, but no valid capture timestamp is available

The analysis is split across 30 areas: 29 villages and one entity for Tournai city centre. Results are stored locally, exported for QGIS work, and published as versioned Leaflet maps on this website. QGIS remains the manual review and cartographic workspace.

## Limitations

- This is an approximate coverage model.
- A nearby Mapillary point does not guarantee full visibility of the road.
- Direction of travel is not handled yet.
- Divided roads and physical separation are not handled yet.
- Road geometry and administrative boundaries depend on OpenStreetMap data quality.
- The method supports prioritisation; it is not yet a formal route-optimisation system.

These limits are important when interpreting percentages and maps. Field observation remains necessary.
