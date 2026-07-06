(function () {
  const palettes = {
    coverage: {
      covered: { label: "Covered", color: "#2E7D32", weight: 4, dashArray: null },
      partial: { label: "Partial", color: "#EF6C00", weight: 4, dashArray: "8 6" },
      missing: { label: "Missing", color: "#C62828", weight: 4, dashArray: "2 7" },
    },
    freshness: {
      fresh: { label: "Fresh", color: "#2E7D32", weight: 4, dashArray: null },
      stale: { label: "Stale", color: "#F8D64E", weight: 4, dashArray: null },
      outdated: { label: "Outdated", color: "#8B929C", weight: 4, dashArray: null },
      no_images: { label: "No images", color: "#6D6D6D", weight: 4, dashArray: "1 8" },
    },
    street: {
      full_360: { label: "Full 360", color: "#2E7D32", weight: 4, dashArray: null },
      front_satisfactory: { label: "Front-facing OK", color: "#1565C0", weight: 4, dashArray: null },
      old_coverage: { label: "Old coverage", color: "#FBC02D", weight: 4, dashArray: "10 6" },
      partial_coverage: { label: "Partial", color: "#EF6C00", weight: 4, dashArray: "8 6" },
      no_coverage: { label: "No coverage", color: "#C62828", weight: 4, dashArray: "2 7" },
      needs_review: { label: "Needs review", color: "#6A1B9A", weight: 4, dashArray: "12 5 2 5" },
      to_redo: { label: "To redo", color: "#8B0000", weight: 4, dashArray: "14 5" },
    },
    quality: {
      full360_fresh: { label: "Fresh 360", color: "#2CC28A", weight: 4, dashArray: null },
      front_fresh: { label: "Fresh front-facing", color: "#F59B42", weight: 4, dashArray: null },
      partial_360: { label: "Partial 360", color: "#2CC28A", weight: 4, dashArray: "2 7" },
      stale: { label: "Stale", color: "#F8D64E", weight: 4, dashArray: null },
      outdated: { label: "Outdated", color: "#8B929C", weight: 4, dashArray: null },
      needs_review: { label: "Needs review", color: "#6A1B9A", weight: 4, dashArray: "12 5 2 5" },
    },
  };

  function qualityVisualStatus(mapStatus) {
    if (mapStatus === "full360_stale" || mapStatus === "front_stale") return "stale";
    if (mapStatus === "full360_outdated" || mapStatus === "front_outdated") return "outdated";
    return mapStatus || "needs_review";
  }

  function statusForFeature(feature, kind) {
    if (kind === "freshness") {
      return feature.properties.freshness_status || "no_images";
    }
    if (kind === "quality") {
      return qualityVisualStatus(feature.properties.map_status);
    }
    return feature.properties.coverage_status || "missing";
  }

  function styleForFeature(feature, kind) {
    const status = statusForFeature(feature, kind);
    const palette = palettes[kind] || palettes.coverage;
    const style = palette[status] || { color: "#555555", weight: 4, dashArray: "4 6" };
    return {
      color: style.color,
      weight: style.weight,
      opacity: 0.9,
      dashArray: style.dashArray,
      lineCap: "round",
      lineJoin: "round",
    };
  }

  function rounded(value, digits) {
    const number = Number(value);
    return Number.isFinite(number) ? number.toFixed(digits) : "n/a";
  }

  function popupForFeature(feature, kind) {
    const props = feature.properties || {};
    const name = props.name || "Unnamed road";
    const status = statusForFeature(feature, kind);
    const rows = [
      ["Status", status],
      ["Computed status", props.coverage_status],
      ["Mode", props.coverage_mode],
      ["Freshness", props.freshness_status],
      ["Length", props.length_m ? `${rounded(props.length_m / 1000, 2)} km` : null],
      ["Covered ratio", props.covered_ratio != null ? `${rounded(props.covered_ratio * 100, 0)}%` : null],
      ["360 ratio", props.covered_360_ratio != null ? `${rounded(props.covered_360_ratio * 100, 0)}%` : null],
      ["Images", props.mapillary_image_count || props.mapillary_points_count],
      ["360 images", props.mapillary_360_image_count],
      ["Last capture", props.last_capture_at || props.latest_captured_at],
    ].filter((row) => row[1] !== null && row[1] !== undefined && row[1] !== "");

    const body = rows.map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join("");
    return `<strong>${name}</strong><dl class="coverage-map-popup">${body}</dl>`;
  }

  function addLegend(map, kind) {
    const palette = palettes[kind] || palettes.coverage;
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "coverage-map-legend");
      div.innerHTML = Object.entries(palette)
        .map(([, style]) => {
          const dash = style.dashArray ? " dashed" : "";
          return `
            <div class="coverage-map-legend-row">
              <span class="coverage-map-legend-line${dash}" style="--line-color: ${style.color};"></span>
              <span>${style.label}</span>
            </div>
          `;
        })
        .join("");
      return div;
    };
    legend.addTo(map);
  }

  function initialiseMap(container) {
    if (container.dataset.initialized === "true") {
      return;
    }
    container.dataset.initialized = "true";

    const kind = container.dataset.mapKind || "coverage";
    const dataUrl = container.dataset.geojson;
    const title = container.dataset.mapTitle || "Coverage map";
    const map = L.map(container.id, { scrollWheelZoom: false, preferCanvas: true });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const loading = L.control({ position: "topright" });
    loading.onAdd = function () {
      const div = L.DomUtil.create("div", "coverage-map-loading");
      div.textContent = `Loading ${title}`;
      return div;
    };
    loading.addTo(map);

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${dataUrl}`);
        }
        return response.json();
      })
      .then((geojson) => {
        map.removeControl(loading);
        const layer = L.geoJSON(geojson, {
          style: (feature) => styleForFeature(feature, kind),
          onEachFeature: (feature, line) => {
            line.bindPopup(popupForFeature(feature, kind));
            line.on("mouseover", function () {
              this.setStyle({ weight: 6, opacity: 1 });
              this.bringToFront();
            });
            line.on("mouseout", function () {
              this.setStyle(styleForFeature(feature, kind));
            });
          },
        }).addTo(map);

        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds.pad(0.08));
        } else {
          map.setView([50.606, 3.389], 13);
        }
        addLegend(map, kind);
      })
      .catch((error) => {
        map.removeControl(loading);
        const errorControl = L.control({ position: "topright" });
        errorControl.onAdd = function () {
          const div = L.DomUtil.create("div", "coverage-map-error");
          div.textContent = error.message;
          return div;
        };
        errorControl.addTo(map);
        map.setView([50.606, 3.389], 13);
      });
  }

  function initialiseAll() {
    if (!window.L) {
      window.setTimeout(initialiseAll, 50);
      return;
    }
    document.querySelectorAll(".coverage-map").forEach(initialiseMap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseAll);
  } else {
    initialiseAll();
  }
})();
