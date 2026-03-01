export const o365Alerts = {
  wastage: 11732107,
  idleCount: 40513,
};

export const idleByBillTo = [
  { id: 1,  name: 'YouTube',       count: 7877,  cost: 2888347, pct: 24.62 },
  { id: 2,  name: 'Google LLC',    count: 6657,  cost: 2458988, pct: 20.96 },
  { id: 3,  name: 'Waymo',         count: 10243, cost: 1866486, pct: 15.91 },
  { id: 4,  name: 'DeepMind',      count: 4002,  cost: 1355533, pct: 11.55 },
  { id: 5,  name: 'Verily',        count: 3421,  cost: 1262309, pct: 10.76 },
  { id: 6,  name: 'GV',            count: 1578,  cost: 583797,  pct: 4.98  },
  { id: 7,  name: 'X Development', count: 2712,  cost: 393429,  pct: 3.35  },
  { id: 8,  name: 'Calico',        count: 419,   cost: 155013,  pct: 1.32  },
  { id: 9,  name: 'Wing',          count: 377,   cost: 138708,  pct: 1.18  },
  { id: 10, name: 'Fitbit',        count: 449,   cost: 133124,  pct: 1.13  },
  { id: 11, name: 'Mandiant',      count: 1004,  cost: 117766,  pct: 1.05  },
  { id: 12, name: 'Chronicle',     count: 318,   cost: 117392,  pct: 1.00  },
  { id: 13, name: 'Looker',        count: 541,   cost: 69475,   pct: 0.59  },
  { id: 14, name: 'AppSheet',      count: 534,   cost: 64329,   pct: 0.55  },
  { id: 15, name: 'Intrinsic',     count: 72,    cost: 26637,   pct: 0.23  },
  { id: 16, name: 'Jigsaw',        count: 56,    cost: 20718,   pct: 0.18  },
  { id: 17, name: 'Area 120',      count: 29,    cost: 10729,   pct: 0.09  },
  { id: 18, name: 'Google Brain',  count: 27,    cost: 9988,    pct: 0.09  },
  { id: 19, name: 'CapitalG',      count: 27,    cost: 9589,    pct: 0.07  },
  { id: 20, name: 'Waze',          count: 23,    cost: 8139,    pct: 0.07  },
  { id: 21, name: 'Stadia',        count: 16,    cost: 5919,    pct: 0.05  },
  { id: 22, name: 'Nest',          count: 17,    cost: 5778,    pct: 0.03  },
];

export const billToPieColors = [
  '#1E3A5F','#0D9488','#3B82F6','#8B5CF6','#10B981','#F59E0B',
  '#EF4444','#EC4899','#6366F1','#14B8A6','#F97316','#84CC16',
  '#A78BFA','#34D399','#FB923C','#60A5FA','#FCD34D','#F87171',
  '#C084FC','#4ADE80','#94A3B8','#CBD5E1',
];

export const idleByCountry = [
  { id: 1,  country: '—',                      iso: '',    count: 31552, cost: 8717878 },
  { id: 2,  country: 'United States',           iso: 'US',  count: 1664,  cost: 572908  },
  { id: 3,  country: 'United Kingdom',          iso: 'GB',  count: 1487,  cost: 495662  },
  { id: 4,  country: 'Germany',                 iso: 'DE',  count: 778,   cost: 254330  },
  { id: 5,  country: 'China',                   iso: 'CN',  count: 586,   cost: 205545  },
  { id: 6,  country: 'United Arab Emirates',    iso: 'AE',  count: 380,   cost: 139818  },
  { id: 7,  country: 'India',                   iso: 'IN',  count: 316,   cost: 111026  },
  { id: 8,  country: 'Netherlands',             iso: 'NL',  count: 283,   cost: 98561   },
  { id: 9,  country: 'Brazil',                  iso: 'BR',  count: 267,   cost: 88806   },
  { id: 10, country: 'France',                  iso: 'FR',  count: 225,   cost: 78628   },
  { id: 11, country: 'Mexico',                  iso: 'MX',  count: 225,   cost: 77615   },
  { id: 12, country: 'India',                   iso: 'IN',  count: 259,   cost: 71015   },
  { id: 13, country: 'Malaysia',                iso: 'MY',  count: 190,   cost: 65434   },
  { id: 14, country: 'Hong Kong',               iso: 'HK',  count: 162,   cost: 55842   },
  { id: 15, country: 'Singapore',               iso: 'SG',  count: 149,   cost: 47197   },
  { id: 16, country: 'Spain',                   iso: 'ES',  count: 136,   cost: 45090   },
  { id: 17, country: 'Canada',                  iso: 'CA',  count: 132,   cost: 42953   },
  { id: 18, country: 'Italy',                   iso: 'IT',  count: 122,   cost: 42322   },
  { id: 19, country: 'Australia',               iso: 'AU',  count: 122,   cost: 41955   },
  { id: 20, country: 'Poland',                  iso: 'PL',  count: 130,   cost: 41446   },
  { id: 21, country: 'Portugal',                iso: 'PT',  count: 101,   cost: 35064   },
  { id: 22, country: 'Colombia',                iso: 'CO',  count: 95,    cost: 33956   },
  { id: 23, country: 'South Korea',             iso: 'KR',  count: 93,    cost: 31593   },
  { id: 24, country: 'Belgium',                 iso: 'BE',  count: 85,    cost: 31191   },
  { id: 25, country: 'Indonesia',               iso: 'ID',  count: 86,    cost: 30027   },
];

// ISO alpha-3 codes and their idle license counts for the world map colouring
export const countryMapData = {
  USA: 1664, GBR: 1487, DEU: 778, CHN: 586,
  ARE: 380, IND: 575, NLD: 283, BRA: 267,
  FRA: 225, MEX: 225, MYS: 190, HKG: 162,
  SGP: 149, ESP: 136, CAN: 132, ITA: 122,
  AUS: 122, POL: 130, PRT: 101, COL: 95,
  KOR: 93,  BEL: 85,  IDN: 86,
};

export const idleByProduct = [
  {
    id: 1, name: 'Microsoft 365 E5', tier: 15, count: 12244, cost: 1398755,
    children: [
      { name: 'YouTube',    count: 3211, cost: 365882 },
      { name: 'Google LLC', count: 2893, cost: 329804 },
      { name: 'DeepMind',   count: 2104, cost: 239794 },
      { name: 'Waymo',      count: 1988, cost: 226618 },
      { name: 'Other',      count: 2048, cost: 236657 },
    ],
  },
  {
    id: 2, name: 'Microsoft 365 E5', tier: 33, count: 27731, cost: 10259361,
    children: [
      { name: 'Waymo',      count: 8833, cost: 3266283 },
      { name: 'YouTube',    count: 6654, cost: 2459958 },
      { name: 'Google LLC', count: 5129, cost: 1896573 },
      { name: 'Verily',     count: 3481, cost: 1286538 },
      { name: 'Other',      count: 3634, cost: 1350009 },
    ],
  },
  {
    id: 3, name: 'Office 365 E3', tier: 7, count: 489, cost: 55863,
    children: [
      { name: 'GV',         count: 211, cost: 24087 },
      { name: 'Calico',     count: 278, cost: 31776 },
    ],
  },
  {
    id: 4, name: 'Office 365 E3', tier: 7, count: 49, cost: 18128,
    children: [
      { name: 'Mandiant',   count: 49, cost: 18128 },
    ],
  },
];

export const productPieData = [
  { name: 'Microsoft 365 E5',  value: 87.45, color: '#0D9488' },
  { name: 'Microsoft 365 E3',  value: 11.92, color: '#3B82F6' },
  { name: 'Office 365 E3.0',   value: 0.48,  color: '#94A3B8' },
  { name: 'Office 365 E3',     value: 0.15,  color: '#CBD5E1' },
];
