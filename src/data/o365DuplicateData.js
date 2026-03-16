export const dupSummary = {
  normalisedWastage: 1787491,
  normalisedCount:   5341,
};

// ── Duplication by Bill To ────────────────────────────────────────────────────
export const dupNormByBillTo = [
  { id: 1,  name: 'YouTube',       count: 1587, cost: 386104 },
  { id: 2,  name: 'Google LLC',    count: 1545, cost: 310215 },
  { id: 3,  name: 'DeepMind',      count: 645,  cost: 187940 },
  { id: 4,  name: 'Waymo',         count: 508,  cost: 121199 },
  { id: 5,  name: 'Verily',        count: 367,  cost: 77836  },
  { id: 6,  name: 'X Development', count: 102,  cost: 37736  },
  { id: 7,  name: 'GV',            count: 59,   cost: 17022  },
  { id: 8,  name: 'Calico',        count: 47,   cost: 16877  },
  { id: 9,  name: 'Wing',          count: 34,   cost: 12631  },
  { id: 10, name: 'Fitbit',        count: 33,   cost: 12209  },
  { id: 11, name: 'Mandiant',      count: 30,   cost: 11099  },
  { id: 12, name: 'Chronicle',     count: 23,   cost: 2628   },
  { id: 13, name: 'Looker',        count: 22,   cost: 5582   },
  { id: 14, name: 'AppSheet',      count: 6,    cost: 685    },
  { id: 15, name: 'Intrinsic',     count: 5,    cost: 1964   },
  { id: 16, name: 'Jigsaw',        count: 5,    cost: 1850   },
  { id: 17, name: 'Area 120',      count: 4,    cost: 1094   },
  { id: 18, name: 'Google Brain',  count: 4,    cost: 1480   },
  { id: 19, name: 'CapitalG',      count: 2,    cost: 745    },
  { id: 20, name: 'Waze',          count: 2,    cost: 740    },
  { id: 21, name: 'Stadia',        count: 1,    cost: 370    },
];

export const dupDenormByBillTo = [
  { id: 1,  name: 'YouTube',       count: 4541, cost: 1678198 },
  { id: 2,  name: 'Google LLC',    count: 3507, cost: 1000303 },
  { id: 3,  name: 'DeepMind',      count: 3193, cost: 1057514 },
  { id: 4,  name: 'Waymo',         count: 2556, cost: 943061  },
  { id: 5,  name: 'Verily',        count: 1453, cost: 537552  },
  { id: 6,  name: 'X Development', count: 363,  cost: 133273  },
  { id: 7,  name: 'GV',            count: 325,  cost: 43010   },
  { id: 8,  name: 'Calico',        count: 177,  cost: 26102   },
  { id: 9,  name: 'Wing',          count: 175,  cost: 63720   },
  { id: 10, name: 'Fitbit',        count: 128,  cost: 16157   },
  { id: 11, name: 'Mandiant',      count: 77,   cost: 28487   },
  { id: 12, name: 'Chronicle',     count: 64,   cost: 23677   },
  { id: 13, name: 'Looker',        count: 20,   cost: 7399    },
  { id: 14, name: 'AppSheet',      count: 20,   cost: 5179    },
  { id: 15, name: 'Intrinsic',     count: 12,   cost: 1371    },
  { id: 16, name: 'Jigsaw',        count: 11,   cost: 3558    },
  { id: 17, name: 'Area 120',      count: 8,    cost: 2960    },
  { id: 18, name: 'Google Brain',  count: 7,    cost: 2590    },
  { id: 19, name: 'CapitalG',      count: 4,    cost: 1480    },
  { id: 20, name: 'Waze',          count: 4,    cost: 1480    },
  { id: 21, name: 'Stadia',        count: 3,    cost: 1110    },
  { id: 22, name: 'Nest',          count: 4,    cost: 1480    },
  { id: 23, name: 'Google Brain',  count: 3,    cost: 1110    },
];

// ── By Tenant ─────────────────────────────────────────────────────────────────
export const dupNormByTenant = [
  { id: 1,  name: 'Alphabet Inc. (Corporate)',  count: 2003, cost: 740774 },
  { id: 2,  name: 'Google LLC',                count: 1540, cost: 486118 },
  { id: 3,  name: 'YouTube LLC',               count: 630,  cost: 230518 },
  { id: 4,  name: 'Waymo LLC',                 count: 201,  cost: 25008  },
  { id: 5,  name: 'DeepMind Technologies',     count: 152,  cost: 17364  },
  { id: 6,  name: 'Verily Life Sciences',      count: 130,  cost: 47583  },
  { id: 7,  name: 'GV Management LLC',         count: 130,  cost: 47583  },
  { id: 8,  name: 'X Development LLC',         count: 51,   cost: 6338   },
  { id: 9,  name: 'Calico LLC',               count: 12,   cost: 12949  },
  { id: 10, name: 'Wing LLC',                 count: 9,    cost: 2960   },
  { id: 11, name: 'Fitbit LLC',               count: 2,    cost: 740    },
  { id: 12, name: 'Mandiant Inc.',            count: 1,    cost: 370    },
  { id: 13, name: 'Chronicle Security',       count: 1,    cost: 370    },
];

export const dupDenormByTenant = [
  { id: 1,  name: 'Alphabet Inc. (Corporate)', duplicates: 6389, cost: 2363163 },
  { id: 2,  name: 'Google LLC',               duplicates: 3308, cost: 1059655 },
  { id: 3,  name: 'YouTube LLC',              duplicates: 3079, cost: 1138084 },
  { id: 4,  name: 'Waymo LLC',               duplicates: 1367, cost: 356166  },
  { id: 5,  name: 'Verily Life Sciences',    duplicates: 1330, cost: 483352  },
  { id: 6,  name: 'DeepMind Technologies',   duplicates: 1021, cost: 376706  },
  { id: 7,  name: 'GV Management LLC',       duplicates: 679,  cost: 140168  },
  { id: 8,  name: 'X Development LLC',       duplicates: 287,  cost: 37134   },
  { id: 9,  name: 'Calico LLC',             duplicates: 41,   cost: 15168   },
  { id: 10, name: 'Wing LLC',               duplicates: 18,   cost: 6659    },
  { id: 11, name: 'Fitbit LLC',             duplicates: 8,    cost: 2960    },
  { id: 12, name: 'Mandiant Inc.',          duplicates: 2,    cost: 740     },
  { id: 13, name: 'Chronicle Security',     duplicates: 2,    cost: 258     },
];

// ── By Country ────────────────────────────────────────────────────────────────
export const dupByCountry = [
  { id: 1,  country: 'United States',        iso3: 'USA', cost: 426964, count: 1302 },
  { id: 2,  country: 'Brazil',               iso3: 'BRA', cost: 300837, count: 818  },
  { id: 3,  country: 'India',                iso3: 'IND', cost: 228410, count: 719  },
  { id: 4,  country: 'United Kingdom',       iso3: 'GBR', cost: 151606, count: 472  },
  { id: 5,  country: 'Japan',                iso3: 'JPN', cost: 97337,  count: 231  },
  { id: 6,  country: 'China',                iso3: 'CHN', cost: 71908,  count: 231  },
  { id: 7,  country: 'Germany',              iso3: 'DEU', cost: 54422,  count: 163  },
  { id: 8,  country: 'Mexico',               iso3: 'MEX', cost: 34215,  count: 150  },
  { id: 9,  country: 'Singapore',            iso3: 'SGP', cost: 34640,  count: 104  },
  { id: 10, country: 'Portugal',             iso3: 'PRT', cost: 29341,  count: 80   },
  { id: 11, country: '—',                    iso3: '',    cost: 27094,  count: 76   },
  { id: 12, country: 'Vietnam',              iso3: 'VNM', cost: 25152,  count: 68   },
  { id: 13, country: 'Thailand',             iso3: 'THA', cost: 23422,  count: 64   },
  { id: 14, country: 'Czechia',              iso3: 'CZE', cost: 19352,  count: 53   },
  { id: 15, country: 'Australia',            iso3: 'AUS', cost: 17818,  count: 48   },
  { id: 16, country: 'Canada',               iso3: 'CAN', cost: 15941,  count: 50   },
  { id: 17, country: 'France',               iso3: 'FRA', cost: 15571,  count: 49   },
  { id: 18, country: 'Hong Kong',            iso3: 'HKG', cost: 14798,  count: 40   },
  { id: 19, country: 'Spain',                iso3: 'ESP', cost: 14489,  count: 48   },
  { id: 20, country: 'South Africa',         iso3: 'ZAF', cost: 14630,  count: 43   },
  { id: 21, country: 'South Korea',          iso3: 'KOR', cost: 14325,  count: 56   },
  { id: 22, country: 'Argentina',            iso3: 'ARG', cost: 11809,  count: 32   },
  { id: 23, country: 'Philippines',          iso3: 'PHL', cost: 11469,  count: 31   },
  { id: 24, country: 'Italy',                iso3: 'ITA', cost: 10163,  count: 33   },
  { id: 25, country: 'Netherlands',          iso3: 'NLD', cost: 10034,  count: 31   },
  { id: 26, country: 'Türkiye',              iso3: 'TUR', cost: 9763,   count: 32   },
  { id: 27, country: 'Kenya',                iso3: 'KEN', cost: 9249,   count: 25   },
  { id: 28, country: 'Colombia',             iso3: 'COL', cost: 8797,   count: 30   },
  { id: 29, country: 'Finland',              iso3: 'FIN', cost: 5495,   count: 19   },
  { id: 30, country: 'United Arab Emirates', iso3: 'ARE', cost: 5038,   count: 15   },
  { id: 31, country: 'Romania',              iso3: 'ROU', cost: 4728,   count: 15   },
  { id: 32, country: 'Sweden',               iso3: 'SWE', cost: 3700,   count: 10   },
  { id: 33, country: 'Denmark',              iso3: 'DNK', cost: 3389,   count: 14   },
  { id: 34, country: 'Bangladesh',           iso3: 'BGD', cost: 3146,   count: 10   },
  { id: 35, country: 'Indonesia',            iso3: 'IDN', cost: 2988,   count: 9    },
];

export const dupCountryMapData = {
  USA: 1302, BRA: 818,  IND: 719,  GBR: 472,  JPN: 231,  CHN: 231,
  DEU: 163,  MEX: 150,  SGP: 104,  PRT: 80,   VNM: 68,   THA: 64,
  CZE: 53,   AUS: 48,   CAN: 50,   FRA: 49,   HKG: 40,   ESP: 48,
  ZAF: 43,   KOR: 56,   ARG: 32,   PHL: 31,   ITA: 33,   NLD: 31,
  TUR: 32,   KEN: 25,   COL: 30,   FIN: 19,   ARE: 15,   ROU: 15,
  SWE: 10,   DNK: 14,   BGD: 10,   IDN: 9,
};

// ── By Product ────────────────────────────────────────────────────────────────
export const dupByProduct = [
  { id: 1, name: 'Microsoft 365 E5', count: 4603, cost: 1702926 },
  { id: 2, name: 'Microsoft 365 E3', count: 733,  cost: 83738  },
  { id: 3, name: 'Office 365 E3',    count: 4,    cost: 457    },
  { id: 4, name: 'Office 365 E5',    count: 1,    cost: 370    },
];

export const dupProductPie = [
  { name: 'Microsoft 365 E5', value: 95.27, color: '#0D9488' },
  { name: 'Microsoft 365 E3', value: 4.68,  color: '#3B82F6' },
  { name: 'Office 365 E3',    value: 0.03,  color: '#94A3B8' },
  { name: 'Office 365 E5',    value: 0.02,  color: '#CBD5E1' },
];
