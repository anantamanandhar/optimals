// ── KPI Summary ───────────────────────────────────────────────────────────────
export const ghostKpi = {
  idleLicenseCount:   10301,
  idleLicenseWastage: 6622806,
};

// ── Idle Licenses By Bill To ──────────────────────────────────────────────────
export const ghostByBillTo = [
  { id: 1,  name: 'YouTube',       licenses: 3745, cost: 2612247 },
  { id: 2,  name: 'DeepMind',      licenses: 2642, cost: 1499090 },
  { id: 3,  name: 'Waymo',         licenses: 1081, cost: 589884  },
  { id: 4,  name: 'Verily',        licenses: 968,  cost: 677701  },
  { id: 5,  name: 'GV',            licenses: 510,  cost: 396053  },
  { id: 6,  name: 'X Development', licenses: 232,  cost: 176998  },
  { id: 7,  name: 'Calico',        licenses: 149,  cost: 95708   },
  { id: 8,  name: 'Chronicle',     licenses: 126,  cost: 80757   },
  { id: 9,  name: 'Intrinsic',     licenses: 91,   cost: 66992   },
  { id: 10, name: 'Google LLC',    licenses: 169,  cost: 57937   },
  { id: 11, name: 'Mandiant',      licenses: 82,   cost: 48684   },
  { id: 12, name: 'Wing',          licenses: 64,   cost: 37048   },
  { id: 13, name: 'Fitbit',        licenses: 58,   cost: 31856   },
  { id: 14, name: 'Looker',        licenses: 45,   cost: 26901   },
  { id: 15, name: 'AppSheet',      licenses: 34,   cost: 20403   },
  { id: 16, name: 'Jigsaw',        licenses: 28,   cost: 17122   },
  { id: 17, name: 'Google Brain',  licenses: 23,   cost: 14095   },
  { id: 18, name: 'Area 120',      licenses: 17,   cost: 9518    },
  { id: 19, name: 'CapitalG',      licenses: 13,   cost: 7514    },
  { id: 20, name: 'Waze',          licenses: 11,   cost: 5994    },
  { id: 21, name: 'Stadia',        licenses: 6,    cost: 3472    },
  { id: 22, name: 'Nest',          licenses: 4,    cost: 2258    },
  { id: 23, name: 'Other',         licenses: 3,    cost: 2132    },
];

// ── Bill To % Pie ─────────────────────────────────────────────────────────────
export const ghostBillToPie = [
  { name: 'YouTube',       value: 36.36, color: '#0D9488' },
  { name: 'DeepMind',      value: 25.65, color: '#3B82F6' },
  { name: 'Waymo',         value: 10.49, color: '#6366F1' },
  { name: 'Verily',        value: 9.40,  color: '#F59E0B' },
  { name: 'GV',            value: 4.95,  color: '#EC4899' },
  { name: 'X Development', value: 2.25,  color: '#8B5CF6' },
  { name: 'Other',         value: 10.90, color: '#94A3B8' },
];

// ── By Product SKU ────────────────────────────────────────────────────────────
export const ghostByProductSku = [
  { sku: 'CCE',       cost: 5573573 },
  { sku: 'DC',        cost: 975033  },
  { sku: 'CCE-China', cost: 60344   },
  { sku: 'DC-China',  cost: 13857   },
];

// ── By Okta Status ────────────────────────────────────────────────────────────
export const ghostByOktaStatus = [
  { status: 'UNAVAILABLE',   cost: 3626951 },
  { status: 'DEPROVISIONED', cost: 2995855 },
];

// ── By Console ────────────────────────────────────────────────────────────────
export const ghostByConsole = [
  { id: 1,  console: 'youtube.adobe.com',       users: 3412, licenses: 3745, cost: 2612247 },
  { id: 2,  console: 'deepmind.adobe.com',      users: 2198, licenses: 2642, cost: 1499090 },
  { id: 3,  console: 'waymo.adobe.com',         users: 891,  licenses: 1081, cost: 589884  },
  { id: 4,  console: 'verily.adobe.com',        users: 820,  licenses: 968,  cost: 677701  },
  { id: 5,  console: 'gv.adobe.com',            users: 449,  licenses: 510,  cost: 396053  },
  { id: 6,  console: 'xdevelopment.adobe.com',  users: 195,  licenses: 232,  cost: 176998  },
  { id: 7,  console: 'calico.adobe.com',        users: 124,  licenses: 149,  cost: 95708   },
  { id: 8,  console: 'chronicle.adobe.com',     users: 103,  licenses: 126,  cost: 80757   },
  { id: 9,  console: 'intrinsic.adobe.com',     users: 76,   licenses: 91,   cost: 66992   },
  { id: 10, console: 'googlellc.adobe.com',     users: 142,  licenses: 169,  cost: 57937   },
  { id: 11, console: 'mandiant.adobe.com',      users: 67,   licenses: 82,   cost: 48684   },
  { id: 12, console: 'wing.adobe.com',          users: 51,   licenses: 64,   cost: 37048   },
  { id: 13, console: 'fitbit.adobe.com',        users: 48,   licenses: 58,   cost: 31856   },
];

// ── Console Wastage % Pie ─────────────────────────────────────────────────────
export const ghostConsolePie = [
  { name: 'youtube.adobe.com',      value: 39.44, color: '#0D9488' },
  { name: 'deepmind.adobe.com',     value: 22.64, color: '#3B82F6' },
  { name: 'verily.adobe.com',       value: 10.23, color: '#6366F1' },
  { name: 'waymo.adobe.com',        value: 8.91,  color: '#F59E0B' },
  { name: 'gv.adobe.com',           value: 5.98,  color: '#EC4899' },
  { name: 'xdevelopment.adobe.com', value: 2.67,  color: '#8B5CF6' },
  { name: 'Other',                  value: 10.13, color: '#94A3B8' },
];

// ── All Idle Licenses (detail rows) ──────────────────────────────────────────
export const ghostAllLicenses = [
  { email: 'j.smith@youtube.com',         country: 'US', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0001', billTo: 'YouTube',       licenses: 1, cost: 659.88 },
  { email: 'a.jones@deepmind.com',        country: 'GB', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0002', billTo: 'DeepMind',      licenses: 1, cost: 659.88 },
  { email: 'm.patel@waymo.com',           country: 'US', productName: 'Document Cloud',          sku: 'DC',        guid: 'a1b2c3d4-0003', billTo: 'Waymo',         licenses: 1, cost: 359.88 },
  { email: 'l.chen@verily.com',           country: 'US', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0004', billTo: 'Verily',        licenses: 2, cost: 1319.76 },
  { email: 'r.kumar@gv.com',             country: 'IN', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0005', billTo: 'GV',            licenses: 1, cost: 659.88 },
  { email: 'e.garcia@xdevelopment.com',   country: 'US', productName: 'Document Cloud',          sku: 'DC',        guid: 'a1b2c3d4-0006', billTo: 'X Development', licenses: 1, cost: 359.88 },
  { email: 't.wang@youtube.com',          country: 'CN', productName: 'CC China Edition',        sku: 'CCE-China', guid: 'a1b2c3d4-0007', billTo: 'YouTube',       licenses: 1, cost: 299.88 },
  { email: 'p.nguyen@deepmind.com',       country: 'VN', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0008', billTo: 'DeepMind',      licenses: 1, cost: 659.88 },
  { email: 's.miller@calico.com',         country: 'US', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0009', billTo: 'Calico',        licenses: 1, cost: 659.88 },
  { email: 'n.tanaka@youtube.com',        country: 'JP', productName: 'Document Cloud',          sku: 'DC',        guid: 'a1b2c3d4-0010', billTo: 'YouTube',       licenses: 1, cost: 359.88 },
  { email: 'b.osei@chronicle.com',        country: 'GH', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0011', billTo: 'Chronicle',     licenses: 1, cost: 659.88 },
  { email: 'c.santos@verily.com',         country: 'BR', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0012', billTo: 'Verily',        licenses: 1, cost: 659.88 },
  { email: 'h.lee@intrinsic.com',         country: 'KR', productName: 'Document Cloud',          sku: 'DC',        guid: 'a1b2c3d4-0013', billTo: 'Intrinsic',     licenses: 2, cost: 719.76 },
  { email: 'f.mueller@googlellc.com',     country: 'DE', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0014', billTo: 'Google LLC',    licenses: 1, cost: 659.88 },
  { email: 'o.brown@mandiant.com',        country: 'US', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0015', billTo: 'Mandiant',      licenses: 1, cost: 659.88 },
  { email: 'k.yamamoto@youtube.com',      country: 'JP', productName: 'CC China Edition',        sku: 'CCE-China', guid: 'a1b2c3d4-0016', billTo: 'YouTube',       licenses: 1, cost: 299.88 },
  { email: 'x.li@deepmind.com',          country: 'CN', productName: 'DC China Edition',        sku: 'DC-China',  guid: 'a1b2c3d4-0017', billTo: 'DeepMind',      licenses: 1, cost: 179.88 },
  { email: 'v.ross@wing.com',            country: 'AU', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0018', billTo: 'Wing',          licenses: 1, cost: 659.88 },
  { email: 'd.ali@fitbit.com',           country: 'US', productName: 'Document Cloud',          sku: 'DC',        guid: 'a1b2c3d4-0019', billTo: 'Fitbit',        licenses: 1, cost: 359.88 },
  { email: 'i.petrov@looker.com',        country: 'RU', productName: 'Creative Cloud All Apps', sku: 'CCE',       guid: 'a1b2c3d4-0020', billTo: 'Looker',        licenses: 1, cost: 659.88 },
];
