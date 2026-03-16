// ── KPI ───────────────────────────────────────────────────────────────────────
export const adobeDupKpi = {
  normalisedCount: 4381,
  normalisedCost:  3476289,
};

// ── Duplication – Normalised (by Bill To) ─────────────────────────────────────
export const adobeDupNorm = [
  { id: 1,  name: 'YouTube',       count: 2617, cost: 1932789 },
  { id: 2,  name: 'DeepMind',      count: 931,  cost: 847161  },
  { id: 3,  name: 'Verily',        count: 286,  cost: 257438  },
  { id: 4,  name: 'Waymo',         count: 157,  cost: 140168  },
  { id: 5,  name: 'GV',            count: 84,   cost: 68697   },
  { id: 6,  name: 'X Development', count: 80,   cost: 43558   },
  { id: 7,  name: 'Calico',        count: 50,   cost: 33558   },
  { id: 8,  name: 'Chronicle',     count: 38,   cost: 34743   },
  { id: 9,  name: 'Google LLC',    count: 29,   cost: 13007   },
  { id: 10, name: 'Intrinsic',     count: 28,   cost: 25600   },
  { id: 11, name: 'Wing',          count: 19,   cost: 16696   },
  { id: 12, name: 'Fitbit',        count: 13,   cost: 9860    },
  { id: 13, name: 'Mandiant',      count: 11,   cost: 9382    },
  { id: 14, name: 'Looker',        count: 10,   cost: 5091    },
  { id: 15, name: 'AppSheet',      count: 9,    cost: 8229    },
];

// ── Duplication – De-normalised (by Bill To) ──────────────────────────────────
export const adobeDupDenorm = [
  { id: 1,  name: 'YouTube',       count: 162, cost: 125504 },
  { id: 2,  name: 'X Development', count: 120, cost: 89455  },
  { id: 3,  name: 'GV',            count: 90,  cost: 78235  },
  { id: 4,  name: 'Calico',        count: 72,  cost: 26658  },
  { id: 5,  name: 'Google LLC',    count: 56,  cost: 22045  },
  { id: 6,  name: 'Stadia',        count: 44,  cost: 49850  },
  { id: 7,  name: 'Chronicle',     count: 22,  cost: 38878  },
  { id: 8,  name: 'Wing',          count: 20,  cost: 18764  },
  { id: 9,  name: 'Google Brain',  count: 20,  cost: 16935  },
  { id: 10, name: 'Intrinsic',     count: 12,  cost: 6919   },
  { id: 11, name: 'Waymo',         count: 12,  cost: 5569   },
  { id: 12, name: 'Looker',        count: 12,  cost: 3389   },
  { id: 13, name: 'AppSheet',      count: 10,  cost: 7792   },
  { id: 14, name: 'Area 120',      count: 9,   cost: 8229   },
  { id: 15, name: 'CapitalG',      count: 4,   cost: 3657   },
  { id: 16, name: 'Waze',          count: 2,   cost: 1829   },
];

// ── Bill To % Pie (donut) ─────────────────────────────────────────────────────
export const adobeDupBillToPie = [
  { name: 'YouTube',            value: 55.56, color: '#1E3A5F' },
  { name: 'DeepMind',           value: 24.33, color: '#7C3AED' },
  { name: 'Verily',             value:  7.41, color: '#0D9488' },
  { name: 'Waymo',              value:  4.02, color: '#2563EB' },
  { name: 'GV',                 value:  1.98, color: '#D97706' },
  { name: 'Wing',               value:  1.62, color: '#059669' },
  { name: 'Chronicle',          value:  1.00, color: '#DC2626' },
  { name: 'Calico',             value:  0.96, color: '#7DD3FC' },
  { name: 'Intrinsic',          value:  0.76, color: '#A78BFA' },
  { name: 'Fitbit',             value:  0.48, color: '#34D399' },
  { name: 'Google LLC',         value:  0.43, color: '#FCD34D' },
  { name: 'X Development',      value:  0.31, color: '#F87171' },
  { name: 'Mandiant',           value:  0.27, color: '#6EE7B7' },
  { name: 'AppSheet',           value:  0.24, color: '#93C5FD' },
  { name: 'Looker',             value:  0.15, color: '#C4B5FD' },
  { name: 'Google Brain',       value:  0.11, color: '#FCA5A5' },
  { name: 'CapitalG',           value:  0.09, color: '#86EFAC' },
  { name: 'Area 120',           value:  0.09, color: '#FDE68A' },
  { name: 'Waze',               value:  0.08, color: '#BAE6FD' },
  { name: 'Stadia',             value:  0.05, color: '#DDD6FE' },
  { name: 'Nest',               value:  0.05, color: '#FECACA' },
  { name: 'Jigsaw',             value:  0.03, color: '#BBF7D0' },
  { name: 'Other',              value:  0.05, color: '#E2E8F0' },
];

// ── By Country ────────────────────────────────────────────────────────────────
export const adobeDupByCountry = [
  { id: 1,  country: 'United States',  iso3: 'USA', count: 3843, cost: 3032370 },
  { id: 2,  country: 'United Kingdom', iso3: 'GBR', count: 140,  cost: 118547  },
  { id: 3,  country: 'Brazil',         iso3: 'BRA', count: 68,   cost: 50691   },
  { id: 4,  country: 'Australia',      iso3: 'AUS', count: 55,   cost: 49611   },
  { id: 5,  country: 'Germany',        iso3: 'DEU', count: 34,   cost: 20556   },
  { id: 6,  country: 'Mexico',         iso3: 'MEX', count: 28,   cost: 22899   },
  { id: 7,  country: 'Canada',         iso3: 'CAN', count: 24,   cost: 13839   },
  { id: 8,  country: 'Switzerland',    iso3: 'CHE', count: 22,   cost: 17413   },
  { id: 9,  country: 'India',          iso3: 'IND', count: 17,   cost: 12166   },
  { id: 10, country: 'Netherlands',    iso3: 'NLD', count: 17,   cost: 14192   },
  { id: 11, country: 'Türkiye',        iso3: 'TUR', count: 16,   cost: 14629   },
  { id: 12, country: 'Spain',          iso3: 'ESP', count: 12,   cost: 9621    },
  { id: 13, country: 'Ukraine',        iso3: 'UKR', count: 12,   cost: 10972   },
  { id: 14, country: 'Japan',          iso3: 'JPN', count: 10,   cost: 6641    },
  { id: 15, country: 'Colombia',       iso3: 'COL', count: 10,   cost: 8468    },
];

export const adobeDupCountryMap = {
  USA: 3843, GBR: 140, BRA: 68, AUS: 55, DEU: 34, MEX: 28,
  CAN: 24, CHE: 22, IND: 17, NLD: 17, TUR: 16, ESP: 12,
  UKR: 12, JPN: 10, COL: 10,
};

// ── Normalised Duplicate Licenses (individual rows) ───────────────────────────
export const adobeNormLicenses = [
  { email: 'b.saleh@youtube.com',          country: 'KW', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '103F1F0867FF616B0A495F8Qc35121726373251495c3c:e', billTo: 'YouTube',       licenses: 2, cost: 1829 },
  { email: 'h.bauer@deepmind.com',         country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '177E01A944390D60A495C6@c35121726373251495c3c:8', billTo: 'DeepMind',      licenses: 2, cost: 1829 },
  { email: 'j.davidson@youtube.com',       country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: 'D2A33A295C63B8B30A495C4@grp.com',                billTo: 'YouTube',       licenses: 2, cost: 1829 },
  { email: 'a.chedi@deepmind.com',         country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '09A73357664394104953C6@c35121726373251495c3c:8', billTo: 'DeepMind',      licenses: 2, cost: 1829 },
  { email: 't.white@verily.com',           country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '3735376443940A4953C6Ec35121726373251495c3c:e',  billTo: 'Verily',        licenses: 2, cost: 1829 },
  { email: 'm.milena@youtube.com',         country: 'BR', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: 'F65013B86F3E779604950C0@c35121726373251495c3c:3', billTo: 'YouTube',       licenses: 2, cost: 1829 },
  { email: 'mattias.kallman@waymo.com',    country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '19C015661938B06A495F8@cyrp.com',                 billTo: 'Waymo',         licenses: 2, cost: 1829 },
  { email: 'doug.ruggiero@gv.com',         country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: 'C05C741A4563BC60A49S3F80pc35121726373251495c3c:3', billTo: 'GV',          licenses: 2, cost: 1829 },
  { email: 'eric.baumgartner@deepmind.com',country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '80350AF15C470960A4957C@yrprg.com',               billTo: 'DeepMind',      licenses: 2, cost: 1829 },
  { email: 'mike.fischer@youtube.com',     country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '68F6091628277C40A495E50@yrprg.com',              billTo: 'YouTube',       licenses: 2, cost: 1829 },
  { email: 'ryan.simonet@deepmind.com',    country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '07E6A09664930640A4950288@c35121726373251495c3c:e', billTo: 'DeepMind',    licenses: 2, cost: 1829 },
  { email: 'deanna.butler@youtube.com',    country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '78BB1E7761D4B100A495B3E@yrprg.com',              billTo: 'YouTube',       licenses: 2, cost: 1829 },
  { email: 'ryan.simons@verily.com',       country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: 'D3EA3A295C63B8B0A495E900A495@yrprg.com',        billTo: 'Verily',        licenses: 2, cost: 1829 },
  { email: 'dorian.anzoo@xdev.com',        country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: 'CE6010D7B6E869F0A495FB5@AdobeD',                 billTo: 'X Development', licenses: 2, cost: 1829 },
  { email: 'trent.white@youtube.com',      country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '039901785CE40BF0A495E55@yrprg.com',              billTo: 'YouTube',       licenses: 2, cost: 1829 },
];

// ── All User Licenses Affected by Duplication ─────────────────────────────────
export const adobeAllAffected = [
  { email: 'a.k.jansen@deepmind.com',       country: 'DE', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '908310404668747304953C5@d05064c7b62d920e0a495c0', billTo: 'DeepMind',      licenses: 1, cost: 914  },
  { email: 'a.k.jansen@youtube.com',        country: 'DE', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '51B01D04628128E5A4953E00e495560e9B4956F5be49589',  billTo: 'YouTube',       licenses: 1, cost: 914  },
  { email: 'aakanksha.shah@deepmind.com',    country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '1287F14A4623CB80A495FC@I35121223F0A495C33@c3512',  billTo: 'DeepMind',      licenses: 2, cost: 1829 },
  { email: 'aakanksha.shah@waymo.com',       country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '21727369E6EA03704A495370A495C33@c35121726373',     billTo: 'Waymo',         licenses: 2, cost: 1829 },
  { email: 'aakriti.kataria@gv.com',         country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '80813B37664343A50A495E51B@c351217263732514953e3e', billTo: 'GV',            licenses: 2, cost: 1829 },
  { email: 'aakriti.kataria@bcw-global.com', country: 'GB', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: 'C05C741AA56B6C60A4953F80@c35121726373251495c3e',  billTo: 'Intrinsic',     licenses: 2, cost: 1829 },
  { email: 'aanya.gupta@vml.com',            country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '83E215042B4340D5F0A495EC731C35121726372514953ec',  billTo: 'YouTube',       licenses: 1, cost: 914  },
  { email: 'aanya.shah@youtube.com',         country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '9F465D19F2D79720DA4953C78@c35121726373251495c3e', billTo: 'YouTube',       licenses: 1, cost: 914  },
  { email: 'aaron.doyle@bcw-global.com',     country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '1148010A862688450A4955D0@yrprg.com',              billTo: 'Waymo',         licenses: 3, cost: 2744 },
  { email: 'aaron.doyle@deepmind.com',       country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '14A07087264385F0A495F5@c35121726371514953c3e',    billTo: 'DeepMind',      licenses: 2, cost: 1829 },
  { email: 'adam.chen@youtube.com',          country: 'JP', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '22B01E04628240F6A4953E01e495671e9B4957F6be49600', billTo: 'YouTube',       licenses: 2, cost: 1829 },
  { email: 'adam.fischer@verily.com',        country: 'CH', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '6CF9201E8820B3A0A495130@yrprg.com',              billTo: 'Verily',        licenses: 1, cost: 914  },
  { email: 'alex.martin@deepmind.com',       country: 'GB', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: 'A304B295D74C9CC1B496F011B496@yrprg.com',         billTo: 'DeepMind',      licenses: 2, cost: 1829 },
  { email: 'alex.nguyen@youtube.com',        country: 'AU', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '2AB12F15739239G7B4964F02c4623@yrprg.com',        billTo: 'YouTube',       licenses: 2, cost: 1829 },
  { email: 'alice.wang@gv.com',              country: 'US', product: 'Creative Cloud for Enterprise', sku: 'CCE', guid: '9FD40297E85D0ED2C497G122D734@yrprg.com',         billTo: 'GV',            licenses: 1, cost: 914  },
];
