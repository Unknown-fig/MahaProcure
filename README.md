# Maharashtra Public Procurement Sandbox for Startups (SIH26136)

Government of Maharashtra · Skill, Employment, Entrepreneurship & Innovation Department  
Maharashtra State Innovation Society (MSInS) & Pune Municipal Corporation (PMC)  
Smart India Hackathon 2024 / Problem Statement SIH26136

Production deployment: https://maha-procure-taupe.vercel.app/

---

## Project Overview & Statutory Background

Indian public procurement rules make it very difficult for early-stage startups to sell to urban local bodies like municipal corporations. Standard municipal tenders require 3+ years of past audited turnover (often ₹5+ crore) and extensive past project credentials. Because startups cannot satisfy these criteria, municipal departments end up buying legacy equipment at higher costs.

This project implements a digital sandbox workflow built around three specific regulatory provisions:

1. **Rule 166 of General Financial Rules (GFR), 2017**: Allows single-source procurement when an innovation or proprietary article has undergone proven field testing and no market equivalent exists.
2. **Rule 173(i) of GFR 2017 & DoE OM F.20/2/2014-PPD**: Mandates waiver of prior turnover and prior experience criteria for DPIIT-recognized tech startups.
3. **Clause 4.2 of Maharashtra State Innovative Startup Policy 2018**: Empowers state departments and municipal corporations to issue sandbox pilot orders up to a statutory ceiling of ₹15 Lakhs without standard tendering.

The sandbox acts as the bridge: a department issues a civic problem statement with a target KPI, a startup runs a monitored 60-day field trial under live telemetry, and once the milestone is verified by the municipal engineer, the system compiles the formal audit dossier and PAC-1 justification required by State Vigilance and the CAG.

---

## Direct Stage Links for Evaluation

The application syncs state to URL parameters and browser history, allowing direct deep-linking to any stage or persona without requiring a full login flow during testing:

| Stage / Persona | Direct URL | Description |
| :--- | :--- | :--- |
| Stage 1: Requisition | `/?stage=1&role=buyer` | Municipal buyer Form-01 challenge formulation and ₹15L cap check |
| Stage 2: Technical Scrutiny | `/?stage=2&role=buyer` | Evaluation committee comparative statement and weighted merit scoring |
| Stage 3: Field Sandbox | `/?stage=3&role=startup` | 60-day SCADA telemetry, telemetry packet log, and milestone uploads |
| Stage 4: Sanction Order | `/?stage=4&role=buyer` | GFR 166 sanction order, A4 print dossier, CAG memo, and GeM export |
| Marathi Localization | `/?stage=1&lang=mr` | Full interface rendered in Marathi (मराठी) |

---

## Workflow Architecture

The platform runs as a 4-stage pipeline:

1. **Stage 1 (FORM-01 Requisition)**: Municipal nodal officer drafts civic problem scope, ward allocation (e.g., Kothrud Ward 12), budget ceiling (capped at ₹15,00,000), and target KPI benchmark. Role gating prevents startups from authoring department requisitions.
2. **Stage 2 (TEC-02 Technical Scrutiny)**: Scrutinizes shortlisted DPIIT startups using an objective scoring matrix (technical architecture, municipal readiness, sensor accuracy, track record). Ranks candidates and generates the Technical Evaluation Committee scrutiny sheet.
3. **Stage 3 (TRACK-03 60-Day Pilot Sandbox)**: Monitored field deployment. Segregation of duties is strictly enforced: the startup uploads geo-tagged field telemetry and sensor logs; the municipal executive engineer inspects and certifies milestone completion.
4. **Stage 4 (ORDER-04 Sanction Order & Audit Dossier)**: Automatically generates the GFR 166 Proprietary Article Certificate (PAC), 3-tier municipal digital signature chain, CAG audit defense summary, and printable A4 Government Resolution.

---

## Technical Architecture & Key Decisions

- **State synchronization without router bloat**: Instead of pulling in `react-router-dom` (~40KB+ and route configuration overhead) for what is fundamentally a linear 4-stage statutory progression, we synchronized `stage`, `role`, and `lang` directly via `URLSearchParams` + `window.history.pushState` with a `popstate` listener. This supports browser back/forward, deep-linking, and survives page refreshes in under 30 lines of code.
- **State persistence**: `localStorage` hydrators protect in-progress challenge edits, uploaded telemetry states, and inspection approvals from accidental page refreshes.
- **A4 Print Isolation**: The sanction dossier uses `@page { size: A4 portrait; margin: 12mm 15mm; }` with CSS print media queries hiding navbars, persona pills, and background containers. Browser `Ctrl+P` produces a clean printable document without background bleed.
- **GIGW 3.0 Compliance**: Colors follow the standard Government of Maharashtra palette (`#0b2545` navy, `#ff9933` saffron, `#138808` green). Includes GIGW accessibility font scaling (`A-`, `A`, `A+`), yellow-on-black high-contrast mode, and IST clock.
- **Centralized Translations**: All user-facing strings are maintained in a centralized dictionary (`src/data/translations.js`) with a dot-notation fallback helper `t(lang, key)`.

---

## Local Setup

Requirements: Node.js 18+

```bash
# install dependencies
npm install

# start local development server
npm run dev
```

Build production bundle:
```bash
npm run build
```

<!-- Verified Author: Unknown-fig -->
