+++
title = "Area comparison"
description = "Coverage strengths and missing-road volumes across Tournai's analysis areas."
+++

The current sample shows that coverage is uneven. Quartes has the highest supplied covered percentage at **70.45%**, followed by Rumillies at **56.34%**, Melles at **48.96%**, Gaurain-Ramecroix at **45.39%**, and Barry at **43.65%**.

The largest supplied missing-road volumes include:

- Tournai: **122 km**
- Kain: **80 km**
- Blandain: **52 km**
- Templeuve: **44 km**
- Gaurain-Ramecroix: **33 km**

These comparisons help identify where a capture session could close a large gap and where existing partial coverage could be made more consistent.

## Generated charts

Run `python scripts/generate_site.py` to create:

![Covered percentage by area](/charts/covered-percentage-by-unit.png)

![Missing road length by area](/charts/missing-length-by-unit.png)

The charts use only values present in the local CSV file. Missing values are not estimated.
