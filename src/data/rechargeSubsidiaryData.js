// ── KPI ───────────────────────────────────────────────────────────────────────
export const subsidiaryKpi = {
  totalCost: 125171980,
  top1: { name: 'O365',  cost: 39350128 },
  top2: { name: 'Azure', cost: 38245560 },
  top3: { name: 'Adobe', cost: 23925106 },
};

// ── Pie / legend data ─────────────────────────────────────────────────────────
export const supplierPie = [
  { name: 'O365',             pct: 31.44, color: '#1E3A5F' },
  { name: 'Azure',            pct: 30.55, color: '#2563EB' },
  { name: 'Adobe',            pct: 19.11, color: '#0D9488' },
  { name: 'GCP',              pct: 14.30, color: '#059669' },
  { name: 'Oracle',           pct:  1.92, color: '#DC2626' },
  { name: 'Box',              pct:  0.80, color: '#7DD3FC' },
  { name: 'Google Workspace', pct:  0.70, color: '#A78BFA' },
  { name: 'Monday.com',       pct:  0.48, color: '#34D399' },
  { name: 'Azure China',      pct:  0.25, color: '#93C5FD' },
  { name: 'Lucidlink',        pct:  0.22, color: '#FBBF24' },
  { name: 'Visual Studio',    pct:  0.10, color: '#F87171' },
  { name: 'Docker',           pct:  0.07, color: '#6EE7B7' },
  { name: 'AWS China',        pct:  0.05, color: '#FCA5A5' },
  { name: 'Invision',         pct:  0.00, color: '#CBD5E1' },
];

// ── Cost by Supplier table ────────────────────────────────────────────────────
export const supplierCosts = [
  { id: 1,  name: 'O365',             type: 'Annual in Advance', cost: 39350128, pct: 31.44 },
  { id: 2,  name: 'Azure',            type: 'Monthly Recharged', cost: 38245560, pct: 30.55 },
  { id: 3,  name: 'Adobe',            type: 'Annual in Advance', cost: 23925106, pct: 19.11 },
  { id: 4,  name: 'GCP',              type: 'Monthly Recharged', cost: 17902891, pct: 14.30 },
  { id: 5,  name: 'Oracle',           type: 'Annual in Advance', cost:  2409531, pct:  1.92 },
  { id: 6,  name: 'Box',              type: 'Annual in Advance', cost:  1006058, pct:  0.80 },
  { id: 7,  name: 'Google Workspace', type: 'Monthly Recharged', cost:   882309, pct:  0.70 },
  { id: 8,  name: 'Monday.com',       type: 'Annual in Advance', cost:   597600, pct:  0.48 },
  { id: 9,  name: 'Azure China',      type: 'Monthly Recharged', cost:   315866, pct:  0.25 },
  { id: 10, name: 'Lucidlink',        type: 'Monthly Recharged', cost:   269634, pct:  0.22 },
  { id: 11, name: 'Visual Studio',    type: 'Annual in Advance', cost:   123833, pct:  0.10 },
  { id: 12, name: 'Docker',           type: 'Monthly Recharged', cost:    87652, pct:  0.07 },
  { id: 13, name: 'AWS China',        type: 'Monthly Recharged', cost:    62586, pct:  0.05 },
  { id: 14, name: 'Invision',         type: 'Annual in Advance', cost:     3126, pct:  0.00 },
];

// ── Monthly Breakdown (null = ∅ / no charge) ──────────────────────────────────
export const MONTHS = [
  '2024-01','2024-02','2024-03','2024-04','2024-05','2024-06',
  '2024-07','2024-08','2024-09','2024-10','2024-11','2024-12',
];

export const monthlyRows = [
  {
    id: 1, name: 'O365',
    months: [39350128, null, null, null, null, null, null, null, null, null, null, null],
  },
  {
    id: 2, name: 'Azure',
    months: [2984934, 2831707, 3084796, 3619283, 2898189, 2940323, 3155012, 3201313, 3188132, 3380723, 3489244, 3471903],
  },
  {
    id: 3, name: 'Adobe',
    months: [null, null, 23925106, null, null, null, null, null, null, null, null, null],
  },
  {
    id: 4, name: 'GCP',
    months: [37647, 278901, 1533966, 491944, 598948, 693215, 721803, 728200, 2831016, 1271406, 1062015, 7653828],
  },
  {
    id: 5, name: 'Oracle',
    months: [null, null, null, null, 2409531, null, null, null, null, null, null, null],
  },
  {
    id: 6, name: 'Box',
    months: [null, null, 1006058, null, null, null, null, null, null, null, null, null],
  },
  {
    id: 7, name: 'Google Workspace',
    months: [96940, 96505, 96167, 96894, 98072, 98503, 99381, 99764, 100084, 0, 0, 0],
  },
  {
    id: 8, name: 'Monday.com',
    months: [null, null, null, null, 597600, null, null, null, null, null, null, null],
  },
  {
    id: 9, name: 'Azure China',
    months: [39403, 40636, 41610, 42115, 43292, 43883, 28976, 18370, 17581, null, null, null],
  },
  {
    id: 10, name: 'Lucidlink',
    months: [null, null, null, null, null, 24394, 22175, 39895, 40404, 44583, 48096, 50086],
  },
  {
    id: 11, name: 'Visual Studio',
    months: [123833, null, null, null, null, null, null, null, null, null, null, null],
  },
  {
    id: 12, name: 'Docker',
    months: [4318, 4318, 4318, 4318, 4318, 4318, 4318, 4318, 4318, 4318, 4318, 47962],
  },
  {
    id: 13, name: 'AWS China',
    months: [null, null, null, null, null, null, null, null, null, null, null, 62586],
  },
  {
    id: 14, name: 'Invision',
    months: [3126, null, null, null, null, null, null, null, null, null, null, null],
  },
];
