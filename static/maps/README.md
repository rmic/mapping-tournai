# Map assets

Mapping Tournai publishes interactive Leaflet maps generated from the local PostGIS analysis, plus optional static exports made manually in QGIS.

Generated Leaflet data is versioned:

- `data/current/` contains the latest alias used by the website.
- `data/snapshots/<snapshot-id>/` preserves each generated map state.
- `data/manifest.json` lists the available generations.

Stable generated filenames:

- `data/current/global-coverage.geojson`
- `data/current/global-freshness.geojson`
- `data/current/tournai-street-coverage.geojson`
- `data/current/tournai-coverage-quality.geojson`
- `data/current/areas/*-coverage.geojson`

Optional QGIS export filenames:

- `tournai-analysis-units.png`
- `global-coverage-map.png`
- `freshness-map.png`
- `tournai-center-coverage.png`
- `priority-missing-roads.png`

Commit updated map exports to this folder when they are ready for publication. Keep filenames stable when replacing an existing map so that website links continue to work.
