// ── Month labels (24 months: Nov 2023 – Oct 2025) ───────────────────────────
export const CHART_MONTHS = [
  'Nov', 'Dec', "Jan '24", 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
  "Nov '24", 'Dec', "Jan '25", 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
];

export const TABLE_MONTHS = [
  '2023-11','2023-12','2024-01','2024-02','2024-03','2024-04',
  '2024-05','2024-06','2024-07','2024-08','2024-09','2024-10',
  '2024-11','2024-12','2025-01','2025-02','2025-03','2025-04',
  '2025-05','2025-06','2025-07','2025-08','2025-09','2025-10',
];

// ── Chart series data (6 × 24 months) ────────────────────────────────────────
const d365E5  = [2723342,2741522,3450379,3421871,3647471,3647471,4110498,4168864,3920331,4037306,4031329,4039589,4363117,4173774,4880142,4921609,5009073,5234953,5149259,5901731,5900474,5633934,5538792,5135189];
const dTeams  = [156133,162042,174215,164108,158322,166147,168350,172113,162448,178234,172116,167340,174211,178105,174448,178213,183102,165341,173208,179114,174332,179248,163118,158234];
const dE3     = [46421,45318,43127,44016,45233,44127,45011,44219,45034,45118,44213,44108,44021,43118,43214,43021,44108,43021,43118,45021,45118,44021,44118,43021];
const dOther  = [27118,24021,26314,25118,24021,26118,25021,26118,25021,26118,25021,24118,25021,24118,25021,24118,26021,24118,25021,26118,25021,26118,24021,23118];
const dPApps  = [16021,15118,15234,15118,15234,15118,16234,15118,15234,16118,15234,15118,15234,15118,15234,16118,15234,15118,15234,16118,15234,15118,15234,15118];
const dPAuto  = [11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000,11000];

export const CHART_SERIES = [
  { name: 'Microsoft 365 E5',                             color: '#1E3A5F', data: d365E5 },
  { name: 'Microsoft Teams Premium Introductory Pricing', color: '#2563EB', data: dTeams },
  { name: 'Office 365 E3',                               color: '#0D9488', data: dE3    },
  { name: 'Other',                                       color: '#94A3B8', data: dOther },
  { name: 'Power Apps per user plan',                    color: '#F59E0B', data: dPApps },
  { name: 'Power Automate per user plan',                color: '#10B981', data: dPAuto },
];

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

// ── KPI summary ───────────────────────────────────────────────────────────────
export const usageKpi = {
  changeFromPrev:     -393603,
  baselineMetric:      2965764,
  changeFromBaseline:  2169425,
};

// ── Monthly Breakdown Table (14 products × 24 months) ────────────────────────
// Deterministic formula: base + linear_slope×i + cyclic_noise×((i%3)-1)
const det = (base, slope, amp, i) =>
  Math.max(0, Math.round(base + slope * i + amp * ((i % 3) - 1)));

const idx24 = Array.from({ length: 24 }, (_, i) => i);

const pData = {
  'Microsoft 365 E5':
    d365E5,
  'Office 365 E5':
    [36070,33500,7768,6842,6693,5507,6581,6357,9089,8119,7380,7736,8527,1711,1850,2005,2497,2559,1767,1634,1634,1696,1728,1696],
  'Office 365 E3':
    idx24.map(i => det(7400,  12,  180, i)),
  'Power BI Premium P1 Instance':
    Array(24).fill(29073),
  'Exchange Online (Plan 2)':
    idx24.map(i => det(29500, 120, 2800, i)),
  'Skype for Business PSTN Domestic and International':
    idx24.map(i => det(24000, -95, 3800, i)),
  'Project Online With Project for Office 365':
    idx24.map(i => det(19000,-300, 1900, i)),
  'Office 365 E1':
    idx24.map(i => det(14000,  60, 2700, i)),
  'Skype for Business PSTN Domestic Calling':
    idx24.map(i => det(9800,   25, 1400, i)),
  'Visio Online Plan 2':
    idx24.map(i => det(8100,    0,  480, i)),
  'Teams Rooms Standard':
    idx24.map(i => det(5900,   50,  720, i)),
  'Project for Office 365':
    idx24.map(i => det(4900,  -30,  550, i)),
  'Project Plan 3':
    idx24.map(i => det(4800,   20,  730, i)),
  'Dynamics 365 for Sales Enterprise Edition':
    idx24.map(i => det(3100,    0,  480, i)),
};

export const TABLE_PRODUCT_NAMES = Object.keys(pData);

export const tableProducts = TABLE_PRODUCT_NAMES.map(name => ({
  name,
  months: pData[name],
  total:  pData[name].reduce((s, v) => s + v, 0),
}));

export const monthlyTotals = idx24.map(i =>
  TABLE_PRODUCT_NAMES.reduce((s, n) => s + pData[n][i], 0)
);

// ── Monthly usage tracking rows (bottom table) ───────────────────────────────
export const USAGE_MONTHS = TABLE_MONTHS.slice(0, 12);

export const usageRows = [
  { billTo: 'YouTube',       product: 'Microsoft Power Apps Plan 2 (Qualified)',  tenant: 'insidemedia.net', suite: 'No',  price: '$0.00',  advance: true  },
  { billTo: 'Google LLC',    product: 'Dynamics 365 Business Central Team M.',    tenant: 'insidemedia.net', suite: 'No',  price: '$7.04',  advance: true  },
  { billTo: 'DeepMind',      product: 'Dynamics 365 Finance',                     tenant: 'insidemedia.net', suite: 'No',  price: '$88.04', advance: false },
  { billTo: 'Waymo',         product: 'Windows 365 Enterprise 2 vCPU 4 GB',       tenant: 'insidemedia.net', suite: 'No',  price: '$31.00', advance: false },
  { billTo: 'Verily',        product: 'Windows 365 Enterprise 4 vCPU 16 GB',      tenant: 'insidemedia.net', suite: 'No',  price: '$66.00', advance: false },
  { billTo: 'X Development', product: 'Microsoft 365 Copilot',                    tenant: 'alphabet.com',   suite: 'Yes', price: '$30.00', advance: true  },
];
