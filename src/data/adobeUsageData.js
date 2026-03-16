// ── Month labels (12 months: Mar 2024 – Feb 2025) ─────────────────────────────
export const CHART_MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', "Jan '25", 'Feb'];
export const TABLE_MONTHS = ['2024-03','2024-04','2024-05','2024-06','2024-07','2024-08','2024-09','2024-10','2024-11','2024-12','2025-01','2025-02'];

// ── Monthly totals ─────────────────────────────────────────────────────────────
const MONTHLY_TOTALS = [23925107,23100551,23064328,23030632,22968032,22747543,22493900,22339250,22486725,22479636,30862557,31052399];

// ── 5 chart series ─────────────────────────────────────────────────────────────
const sYoutube  = [8559572,8530769,8355467,8311364,8229640,8058015,8004581,7871970,7889599,7897391,14887630,14030093];
const sDeepMind = [3978671,3828889,3845117,3847341,3795866,3793502,3195316,3185246,3217899,3275477,3820730,3820730];
const sVerily   = [3171313,3171313,3171313,3171313,3171313,3171313,3171313,3171313,3171313,3171313,3171313,3171313];
const sWaymo    = [1684436,1660333,1676800,1685350,1699679,1702387,1717025,1744785,1762883,1767183,1796632,1767151];
const sOther    = MONTHLY_TOTALS.map((t, i) => t - sYoutube[i] - sDeepMind[i] - sVerily[i] - sWaymo[i]);

export const CHART_SERIES = [
  { name: 'YouTube',  color: '#1E3A5F', data: sYoutube  },
  { name: 'DeepMind', color: '#0D9488', data: sDeepMind },
  { name: 'Verily',   color: '#3B82F6', data: sVerily   },
  { name: 'Waymo',    color: '#6366F1', data: sWaymo    },
  { name: 'Other',    color: '#94A3B8', data: sOther    },
];

// ── Recharts-ready arrays ──────────────────────────────────────────────────────
export const monthlyChartData = CHART_MONTHS.map((month, i) => {
  const entry = { month };
  CHART_SERIES.forEach(s => { entry[s.name] = s.data[i]; });
  return entry;
});

export const changeChartData = CHART_MONTHS.map((month, i) => {
  const entry = { month };
  CHART_SERIES.forEach(s => { entry[s.name] = Math.max(0, s.data[i] - s.data[0]); });
  return entry;
});

// ── KPI ────────────────────────────────────────────────────────────────────────
export const adobeKpi = {
  changeFromPrev:     199842,
  baselineMetric:     23925106,
  changeFromBaseline: 7127292,
};

// ── Monthly Breakdown Table ───────────────────────────────────────────────────
// Raw fractions for 20 "Other" sub-entities, normalized to sum to 1
const rawFracs = [0.219,0.114,0.094,0.088,0.069,0.066,0.063,0.048,0.043,0.025,0.020,0.019,0.018,0.017,0.012,0.011,0.010,0.005,0.006,0.004];
const fracSum  = rawFracs.reduce((a, b) => a + b, 0);
const normFracs = rawFracs.map(f => f / fracSum);

const otherEntityNames = [
  'X Development','GV','Calico','Wing','Fitbit','Mandiant','Chronicle','Looker',
  'Google LLC','AppSheet','Intrinsic','Jigsaw','Area 120','Google Brain',
  'CapitalG','Waze','Stadia','Nest','Google Fiber','Google Pay',
];

const topFourRows = [
  { name: 'YouTube',  months: sYoutube  },
  { name: 'DeepMind', months: sDeepMind },
  { name: 'Verily',   months: sVerily   },
  { name: 'Waymo',    months: sWaymo    },
];

const otherRows = otherEntityNames.map((name, ni) => ({
  name,
  months: sOther.map(ov => Math.round(ov * normFracs[ni])),
}));

const allRows = [...topFourRows, ...otherRows].map(r => ({
  ...r,
  total: r.months.reduce((s, v) => s + v, 0),
}));

export const tableRows = allRows;

export const monthlyTotals = CHART_MONTHS.map((_, i) =>
  allRows.reduce((s, r) => s + r.months[i], 0)
);

// ── Country section data ───────────────────────────────────────────────────────
export const countryData = [
  { id: 1,  country: '—',                        pct: 23.56, cost: null     },
  { id: 2,  country: 'United States of America', pct: 15.83, cost: 45987593 },
  { id: 3,  country: 'United Kingdom',           pct:  8.63, cost: 25081820 },
  { id: 4,  country: 'India',                    pct:  5.17, cost: 15015637 },
  { id: 5,  country: 'Germany',                  pct:  5.02, cost: 14599070 },
  { id: 6,  country: 'China',                    pct:  2.53, cost:  7358290 },
  { id: 7,  country: 'Spain',                    pct:  2.50, cost:  7266812 },
  { id: 8,  country: 'Brazil',                   pct:  2.11, cost:  6120438 },
  { id: 9,  country: 'Mexico',                   pct:  2.11, cost:  6119797 },
  { id: 10, country: 'South Africa',             pct:  1.85, cost:  5368631 },
  { id: 11, country: 'Argentina',                pct:  1.80, cost:  5228518 },
  { id: 12, country: 'Australia',                pct:  1.71, cost:  4967684 },
  { id: 13, country: 'Singapore',                pct:  1.63, cost:  4742915 },
  { id: 14, country: 'Canada',                   pct:  1.55, cost:  4498604 },
  { id: 15, country: 'France',                   pct:  1.60, cost:  4648365 },
];

export const adobeCountryMapData = {
  USA: 45987593, GBR: 25081820, IND: 15015637, DEU: 14599070,
  CHN:  7358290, ESP:  7266812, BRA:  6120438, MEX:  6119797,
  ZAF:  5368631, ARG:  5228518, AUS:  4967684, SGP:  4742915,
  CAN:  4498604, FRA:  4648365,
};
