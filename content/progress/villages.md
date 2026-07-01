+++
title = "Area comparison"
description = "Coverage strengths and missing-road volumes across Tournai's analysis areas."
+++

The current sample shows that coverage is uneven. Barry has the highest supplied covered percentage at **60.34%**, followed by Maulde at **56.58%**, Quartes at **45.61%**, Melles at **43.37%**, and Hertain at **43.35%**.

The largest supplied missing-road volumes include:

- Tournai: **147 km**
- Kain: **76 km**
- Blandain: **47 km**
- Templeuve: **43 km**
- Béclers: **34 km**

These comparisons help identify where a capture session could close a large gap and where existing partial coverage could be made more consistent.

## Generated charts

Run `python scripts/generate_site.py` to create:

![Covered percentage by area](/charts/covered-percentage-by-unit.png)

![Missing road length by area](/charts/missing-length-by-unit.png)

The charts use only values present in the local CSV file. Missing values are not estimated.
