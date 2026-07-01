---
title: Mapping Tournai inside the boulevards
date: 2026-07-01
areas:
- Tournai
capture_modes:
- car
- bicycle
camera: GoPro Max 360
weather: ''
upload_status: integrated in Mapillary API
summary: First progress article on the 360-degree coverage campaign for Tournai centre.
image: field-notes/2026-07-01-mapping-tournai-inside-boulevards-v2.png
source: Mapillary API, PostGIS, QGIS
sequences: []
---

The first objective of this project is deliberately local: I want to build complete 360-degree street-level imagery coverage of Tournai city centre, starting with the area inside the boulevards.

The wider project covers Tournai and its villages, but that is not the priority for this first phase. The centre is dense, full of short streets, one-way sections, paved alleys, crossings, small passages, and places where a normal road network map does not tell the whole story. If I can make the method work there, the rest of the territory will be easier to approach in a structured way.

## From baseline to working coverage

The first analysis baseline contained 11,727 Mapillary image points. Across the whole analysed municipality, it classified 151 km as covered, 71 km as partial, and 1,123 km as missing. That was useful as a starting point, but it was also very rough: it showed where imagery existed, not whether every street had the kind of imagery I actually need.

After several refreshes, the current dataset contains 62,702 Mapillary image points. The global coverage figure has moved from 11.21% to 28.98% covered. That global jump includes more than just the centre, including longer test drives and roads outside the boulevards, so I do not treat it as the measure of success for this phase.

For the current work, the more useful view is the `Tournai` analysis unit in QGIS. It is a little wider than the strict inside-the-boulevards area, but it is close enough as the working unit for now. In that unit, the street-level layer currently has 36.00 km classified as `full_360`, 25.30 km as `partial_coverage`, 2.35 km as `to_redo`, and 147.10 km still as `no_coverage`.

The latest update used the GPS metadata from the GoPro `.360` files captured on June 30 to guide a targeted Mapillary refresh. Instead of querying one large rectangle around the whole route, I extracted a GPX trace and split it into small search windows around the actual path. That brought the public API data up to the June 30 evening captures and added 2,951 image points to the local dataset.

These numbers are not the final story. They are a planning layer.

They also reflect the order in which I started capturing the centre. So far, most of the new 360 work has concentrated on the north and east side of the Scheldt. The historic centre on the south and west side of the river is still expected to move soon, once the next campaign is captured and integrated.

## Why 360 matters in the centre

For villages, a good front-facing pass can already be useful. In the centre of Tournai, I want something stricter: at least one usable 360-degree pass in every street or passage.

That matters because the useful detail is often not only straight ahead. Street signs, access restrictions, shop fronts, small side passages, cycle infrastructure, paving, bollards, delivery access, and one-way constraints can all sit outside the forward view. A 360 image makes it much easier to revisit the scene later in QGIS or OpenStreetMap without guessing what was outside the frame.

The current processing pipeline now checks Mapillary metadata such as `is_pano` and `camera_type`. A segment is only accepted as `full_360` when the 360 coverage is dense enough: at least 80% of the segment and roughly one 360 image every 15 metres. That is intentionally strict.

## Car first, bicycle next

I have already started two or three small mapping campaigns. The car is practical for the larger axes: the boulevards, wider streets, and connections where traffic flow makes cycling less comfortable or where covering distance matters.

The roof-mounted camera setup is useful there. It gives a stable capture path and makes it possible to cover larger sections in a reasonable amount of time. I have also tested different camera positions and orientations on the car, because small changes in mounting height and lens direction can make a large difference in how useful the resulting imagery is.

But the car is not the right tool for everything.

The centre has narrow paved streets, one-way sections, small passages, and places where driving is awkward, slow, or simply not possible in a clean capture route. For these streets, I expect the bicycle to be the better tool. I have started testing the camera mounted on a helmet, and that setup should make it much easier to pass through small streets, handle one-way constraints, and capture the kind of urban detail that is hard to collect from a car.

## The next campaign

The next field session is planned for this weekend and should focus on the inside of the boulevards. The plan is not to chase a large kilometre count. The plan is to close gaps street by street.

Before going out, I will use the QGIS street-coverage layer to identify:

- streets already accepted as `full_360`;
- streets with front-facing or partial coverage that need another pass;
- streets still missing from the Mapillary data;
- small alleys and one-way streets better suited to bicycle capture.

The June 30 captures are now visible through the public Mapillary API and have been integrated into the local PostGIS analysis. The latest recorded analysis run adds 8.47 km of newly covered road length and refreshes 10.88 km of roads that already had older imagery nearby. The point of these notes is to keep the evolution visible: where the project started, what each campaign changed, and what still needs to be mapped.

The first target remains simple: 100% useful 360-degree coverage of Tournai centre inside the boulevards. The roads outside the boulevards and the villages will come next.
