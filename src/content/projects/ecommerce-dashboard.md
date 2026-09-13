---
title: "E-commerce KPI Dashboard"
summary: "Interactive Power BI dashboard tracking revenue, conversion rate, and customer LTV for an online retailer."
description: "Built a multi-page Power BI report connecting to a PostgreSQL database via DirectQuery. Designed a star-schema data model in Power Query, wrote DAX measures for rolling 30-day revenue, cohort retention, and margin by product category. The report refreshes daily and is embedded in the client's internal portal."
tags: ["Power BI", "DAX", "SQL", "PostgreSQL", "Data Modeling"]
category: "bi"
date: "2025-03-15"
featured: true
status: "Terminé"
link: "https://example.com/demo"
metrics:
  - value: "+28%"
    label: "Faster reporting cycle"
  - value: "4 tables"
    label: "Star schema model"
  - value: "6 KPIs"
    label: "Tracked in real time"
---

## Context

A regional e-commerce company was spending hours each week manually assembling Excel reports from three different data sources. Leadership had no live visibility into conversion rates or customer lifetime value.

## What I built

I designed a three-page Power BI report:

- **Overview page** — headline KPIs (revenue, orders, AOV, conversion rate) with sparkline trends and period-over-period variance badges.
- **Customer page** — cohort retention heatmap, LTV by acquisition channel, and a scatter plot of RFM segments.
- **Product page** — margin waterfall by category, stock-turn velocity, and a ranked table of top SKUs.

## Data model

Raw data lived in three tables (orders, customers, products). I built a star schema in Power Query — a central fact table with clean foreign keys to three dimension tables — which made DAX measures simple and performant.

## Key DAX measures

```dax
Rolling 30D Revenue =
CALCULATE(
  [Total Revenue],
  DATESINPERIOD(Dates[Date], LASTDATE(Dates[Date]), -30, DAY)
)
```

## Outcome

Reporting time dropped from ~4 hours/week to near zero. The sales team now checks the dashboard daily before stand-ups.
