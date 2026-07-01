+++
title = "Mapping Tournai"
description = "A public journal following the progressive mapillaryzation of Tournai and its 29 villages."
+++

# Mapping Tournai

Mapping Tournai is a field mapping project to improve street-level imagery coverage across the municipality of Tournai, Belgium. The territory includes the city centre and 29 surrounding villages, with very different road networks, landscapes, and existing levels of imagery.

The first practical step is structured Mapillary image capture: the progressive **mapillaryzation** of Tournai. This imagery is not the final goal. It is a working layer that can help identify what exists on the ground, support targeted OpenStreetMap improvements, and make future mapping work easier to plan.

The project asks three simple questions:

- Where does useful street-level imagery already exist?
- Which roads and areas are still missing?
- Which existing imagery may now be too old for current mapping work?

The work combines open data, field surveying, Mapillary, OpenStreetMap, QGIS, interactive web maps, and a small reproducible analysis workflow. A technical support tool, the Mapillary Coverage Analyzer, processes metadata in the background to help prioritise capture sessions and prepare summary data. The public project remains focused on places, roads, observations, and mapping progress.

QGIS remains the manual cartographic workspace, while regularly updated web maps are generated from PostGIS for publication. [Capture notes](/field-notes/) will document routes, practical observations, upload batches, and questions to revisit in OpenStreetMap or QGIS.

This site will evolve as new imagery is captured and uploaded. Over time, the method should also become reusable for other cities, villages, roads, and territories.

## Starting baseline

- **1,345 km** of roads in the current analysis
- **11.21%** classified as covered
- **1,123 km** classified as missing
- **11,727** Mapillary image points
- **30** analysis areas: 29 villages and one Tournai city-centre entity

## Current state

- **62,702** Mapillary image points in the refreshed dataset
- **28.98%** classified as covered across the wider analysed municipality
- **776 km** still classified as missing across the wider analysed municipality
- **36.00 km** currently accepted as `full_360` in the `Tournai` working unit

The current operational focus is the `Tournai` analysis unit. It is a little wider than the strict inside-the-boulevards area, but it remains the working perimeter for now while the first 360-degree coverage campaign concentrates on the city centre.

Start with the [coverage status](/progress/coverage/), explore the [areas](/villages/), read the first [capture note](/field-notes/2026-06-25-first-camera-tests/), or follow the latest [Tournai centre field note](/field-notes/2026-07-01-mapping-tournai-inside-the-boulevards/).
