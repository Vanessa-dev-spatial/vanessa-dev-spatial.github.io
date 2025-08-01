# Find website here: https://vanessa-dev-spatial.github.io/
# 🌊 Blue Pacific 2050: Marine Protected Areas Visualization (Indicator 14.5.1)

**Author:** Bolognani Vanessa 
**Date of Data Download:** 30 July 2025  
**Theme:** Ocean and Environment – *Blue Pacific 2050: Thematic Area 6*  
**Data Source:** [.Stat Data Explorer • Blue Pacific 2050](https://www.spc.int)

---

## 📌 Project Overview

This project visualizes the percentage of **marine Key Biodiversity Areas (KBAs) covered by protected areas and/or Other Effective area-based Conservation Measures (OECMs)** in the Pacific, corresponding to **Sustainable Development Goal (SDG) indicator 14.5.1**.

> **Indicator 14.5.1**: *Protected area coverage for marine Key Biodiversity Area (%)*  
> A Tier 1 SDG indicator with well-established methodology and regular data reporting for all Pacific countries.

This visualization focuses on the most recent year available (**2019**), highlighting country-level variation in marine protection coverage across 14 Pacific nations.

---

## 🧭 Background & Rationale

The dataset is part of the **official Blue Pacific 2050 indicators** and reflects a shared regional vision to sustainably manage ocean resources. Data were collected and published under the *Ocean and Environment* thematic area of the strategy.

Although **16 countries** are recognized in the dataset, only **14 had available data** for Indicator 14.5.1. No data was found for **Niue** and **Tuvalu** for this indicator. This visualization focuses on the 14 reporting countries.

---

## 🗂️ Data Processing Workflow

### 1. Data Import & Filtering

- Source: *Blue Pacific 2050: Ocean and Environment (Thematic Area 6)*
- Table imported into PostgreSQL: `pacific_sdg14_5_1`
- Selected indicator: `ER_MRN_MARINKBA` (SDG 14.5.1)
- Filtered rows for this indicator and stored in a new table: `ocean_and_environment_thematic_area_6`

### 2. Data Summary

- **14 countries**
- **280 total observations** (20 years × 14 countries)
- **Annual data from 2000 to 2019**
- Each value reflects the **cumulative** percentage of marine KBAs under protection
- All countries had full time series data from 2000 onward

### 3. Geospatial Data Preparation

#### Country Boundaries:

- Source: [GADM](https://gadm.org), Level 0 (national boundaries)
- CRS: EPSG:4326
- Shapefiles for all 16 countries downloaded
- Merged using QGIS → pushed to PostgreSQL
- Final table: `gadm_pacific`

#### Attribute Join:

- The indicator dataset used ISO2 codes, while GADM uses ISO3 (`GID_0`)
- Added ISO3 column manually to `pacific_sdg14_5_1` → new table: `geo_pacific_sdg14_5_1`
- Attribute join performed on `geo_pacific_sdg14_5_1.ISO3 = gadm_pacific.GID_0`
- Expected and observed 1-to-many relationship (20 records per country)
- **Total joined records: 282**
  - 14 countries joined successfully
  - Niue and Tuvalu had no matching data and were not included in final join

---

## 🌐 Visualization Focus

### Why 2019?

Although SDG indicators were officially adopted in **2015**, the dataset provides full historical coverage from **2000** to **2019**. For this project, the **2019 snapshot** was chosen to highlight the most up-to-date state of marine protection across the Pacific.

### Key Insight (2019):

As of 2019, the country with the **highest percentage of marine KBAs covered by protected areas and/or OECMs** is:

> **🇵🇼 Palau**

This reflects Palau’s global leadership in marine conservation and sustainable ocean governance.

---

## 🗺️ Map Layers

| Layer Name                  | Description                                                         |
|----------------------------|---------------------------------------------------------------------|
| `gadm_pacific`             | Merged GADM Level 0 polygons (country boundaries)                   |
| `geo_pacific_sdg14_5_1`    | Indicator 14.5.1 values joined with country geometries              |
| *(Optional future layers)* | WDPA protected areas, OECMs, Key Biodiversity Areas (KBA polygons)  |

---

## 🛠️ Technologies Used

- PostgreSQL/PostGIS (spatial database)
- QGIS (spatial processing and ETL)
- OpenLayers (web mapping)
- GitHub Pages (web hosting)
---

## 🧩 Next Steps

- Create timeline animation (2000–2019) showing changes in % marine protection
- Integrate additional layers (e.g. WDPA, KBAs, OECMs)

---

## 🔖 Credits & Acknowledgements

- **Pacific Community (SPC)** for data provision via .Stat Explorer
- **GADM Project** for administrative boundary data
- **UN SDG Global Indicator Framework** for methodological standards
