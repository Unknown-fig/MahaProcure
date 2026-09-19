export const DEPARTMENTS = [
  "Pune Municipal Corporation (Water Supply)",
  "Brihanmumbai Municipal Corporation (Solid Waste)",
  "Nagpur Municipal Corporation (Transport)",
  "MSEDCL (Power Distribution)",
];

export const DEFAULT_CHALLENGE = {
  department: "Pune Municipal Corporation (Water Supply)",
  ward: "Kothrud (Ward No. 12)",
  title: "IoT Acoustic Pipeline Leak Detection - Kothrud Ward",
  budget: 300000,
  kpi: "20% reduction in water loss",
};

export const MATCHED_STARTUPS = [
  {
    name: "JalDrishti Telematics Pvt Ltd",
    match: 91.7,
    location: "Pune, MH",
    blurb: "Acoustic + pressure-transient sensing with edge ML for sub-meter leak localisation.",
    verified: true,
    waiver: "Prior Turnover/Experience Waived (GFR 173i)",
  },
  {
    name: "AquaSense Robotics",
    match: 79.4,
    location: "Nashik, MH",
    blurb: "In-pipe inspection crawlers with LiDAR mapping for distribution networks.",
    verified: true,
    waiver: null,
  },
  {
    name: "FlowGrid Analytics",
    match: 73.8,
    location: "Mumbai, MH",
    blurb: "Hydraulic digital-twin modelling and non-revenue-water dashboards.",
    verified: false,
    waiver: null,
  },
];

export const AUDIT_STEPS = [
  {
    title: "Challenge Published",
    detail: "Civic problem posted with sanctioned pilot budget and target KPI.",
  },
  {
    title: "Startup Matched & Awarded",
    detail: "Recognised startup selected via AI semantic match; 60-day sandbox awarded.",
  },
  {
    title: "Sandbox Milestones Verified",
    detail: "All deliverables verified, funds disbursed via PFMS, KPI benchmark exceeded.",
  },
  {
    title: "Procurement Dossier Issued",
    detail: "Signed work order generated under GFR 166 & Maharashtra Startup Policy.",
  },
];
