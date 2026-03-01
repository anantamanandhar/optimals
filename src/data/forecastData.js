export const forecastSummary = {
  totalForecast: '$165.53m',
  totalSuppliers: 19,
  totalBillTo: 51,
  generatedMonth: '2024-10 (Oct)',
  yoy2024: 129265972.94,
  yoy2025: 165528102.67,
  yoyPct: 28.1,
};

export const forecastBySupplier = [
  {
    id: 1,
    name: 'MS O365',
    status: 'EXISTING',
    type: 'SAAS',
    forecast2024: 39350000,
    forecast2025: 58500000,
    changePct: 48.67,
    comments: '48.67% increase in overall Microsoft O365 recharges from 2024 to 2025. 21% increase in E5 unit price as per contract in 2024 (from $25.53 to $30.83 per license per month). 23% increase in cost due to increase in E5 license quantity (from 134k users as of Nov 2023 to 151k users as of Sep 2024) and cease of credit for duplicate licenses in 2025.',
  },
  {
    id: 2,
    name: 'Azure',
    status: 'EXISTING',
    type: 'CLOUD',
    forecast2024: 37310000,
    forecast2025: 37310000,
    changePct: 0.00,
    comments: 'Projected to be flat from 2024 to 2025. Calculation based on average of spend between Jul\'24 to Sep\'24.',
  },
  {
    id: 3,
    name: 'Adobe',
    status: 'EXISTING',
    type: 'SAAS',
    forecast2024: 23930000,
    forecast2025: 25170000,
    changePct: 5.19,
    comments: '5.2% increase in the total contract value in 2025 as per contract resulting in 12.66% increase in CCE and DC unit rates from 2024 to 2025. Increase in forecast vs prior month due to addition of $181k of adhoc Learning Subscription purchase for all OpGroups.',
  },
  {
    id: 4,
    name: 'GCP',
    status: 'EXISTING',
    type: 'CLOUD',
    forecast2024: 10730000,
    forecast2025: 15020000,
    changePct: 39.99,
    comments: '33.06% increase due to consolidation of agency managed billing account to centralized billing account ($4.7m).',
  },
  {
    id: 5,
    name: 'UHuB',
    status: 'EXISTING',
    type: 'SAAS',
    forecast2024: 6260000,
    forecast2025: 6260000,
    changePct: 0.00,
    comments: 'Flat - Projected to be flat from 2024 to 2025.',
  },
  {
    id: 6,
    name: 'WithSecure',
    status: 'EXISTING',
    type: 'SAAS',
    forecast2024: 4020000,
    forecast2025: 4020000,
    changePct: 0.00,
    comments: 'Projected to be flat from 2024 to 2025.',
  },
  {
    id: 7,
    name: 'Oracle',
    status: 'EXISTING',
    type: 'SAAS',
    forecast2024: 2410000,
    forecast2025: 2410000,
    changePct: -0.00,
    comments: 'Flat at Group Level - No expected change in contract value in 2025. At an Agency level, there may be variances as the actual usage has now been assigned to each Agency based on ITAM % splits.',
  },
];

export const forecastPieData = [
  { name: 'MS O365', value: 35.34, color: '#1E3A5F' },
  { name: 'Azure', value: 22.54, color: '#0D9488' },
  { name: 'Adobe', value: 15.20, color: '#3B82F6' },
  { name: 'GCP', value: 9.08, color: '#10B981' },
  { name: 'Sharepoint', value: 6.25, color: '#8B5CF6' },
  { name: 'UHuB', value: 3.78, color: '#F59E0B' },
  { name: 'WithSecure', value: 2.43, color: '#EF4444' },
  { name: 'Oracle', value: 1.46, color: '#EC4899' },
  { name: 'MS SQL', value: 0.78, color: '#6366F1' },
  { name: 'Google Workspace', value: 0.73, color: '#94A3B8' },
];

// Recharge Forecast table — Bill To rows are Alphabet subsidiaries
export const rechargeProducts = [
  'Adobe', 'AWS China', 'Azure', 'Azure China', 'BOX',
  'Docker', 'GCP', 'Google W.', 'Invision', 'Lucid Link',
  'Miro', 'Monday', 'MS O365', 'MS SQL', 'Oracle',
  'Sharepoint', 'UHuB', 'Visual Stu.', 'WithSecure',
];

export const rechargeForecast = [
  {
    id: 1, name: 'Google LLC',
    total: 45130000,
    products: { Adobe: 1970000, 'AWS China': 0, Azure: 73940000, 'Azure China': 7610000, BOX: 112870000, Docker: 5724600, GCP: 9549000, 'Google W.': 12110000, Invision: 322270000, 'Lucid Link': 0, Miro: 26200000, Monday: 61750000, 'MS O365': 17730000, 'MS SQL': 1290000, Oracle: 859000000, Sharepoint: 682160000, UHuB: 1140000, 'Visual Stu.': 41930000, WithSecure: 1080000 },
  },
  {
    id: 2, name: 'YouTube',
    total: 38050000,
    products: { Adobe: 0, 'AWS China': 0, Azure: 260070000, 'Azure China': 0, BOX: 787540000, Docker: 0, GCP: 19100000, 'Google W.': 252340000, Invision: 148480000, 'Lucid Link': 0, Miro: 73980000, Monday: 467190000, 'MS O365': 15920000, 'MS SQL': 0, Oracle: 565760000, Sharepoint: 6830000, UHuB: 3210000, 'Visual Stu.': 37210000, WithSecure: 0 },
  },
  {
    id: 3, name: 'Waymo',
    total: 29160000,
    products: { Adobe: 223160000, 'AWS China': 0, Azure: 19100000, 'Azure China': 0, BOX: 39970000, Docker: 15050000, GCP: 7639200, 'Google W.': 2640000, Invision: 10420000, 'Lucid Link': 1726040000, Miro: 55750000, Monday: 62280000, 'MS O365': 2910000, 'MS SQL': 0, Oracle: 109770000, Sharepoint: 903690000, UHuB: 27520000, 'Visual Stu.': 2940000, WithSecure: 0 },
  },
  {
    id: 4, name: 'DeepMind',
    total: 15250000,
    products: { Adobe: 4550000, 'AWS China': 0, Azure: 0, 'Azure China': 0, BOX: 5347440000, Docker: 13510000, GCP: 1052630000, 'Google W.': 8884680000, 'Lucid Link': 0, Invision: 0, Miro: 133880000, Monday: 11160000, 'MS O365': 6210000, 'MS SQL': 817070000, Oracle: 0, Sharepoint: 210560000, UHuB: 0, 'Visual Stu.': 182020000, WithSecure: 0 },
  },
  {
    id: 5, name: 'Verily',
    total: 9300000,
    products: { Adobe: 3700000, 'AWS China': 0, Azure: 1730000, 'Azure China': 0, BOX: 3932720000, Docker: 38200000, GCP: 0, 'Google W.': 0, Invision: 187120000, 'Lucid Link': 0, Miro: 34880000, Monday: 0, 'MS O365': 3030000, 'MS SQL': 0, Oracle: 0, Sharepoint: 0, UHuB: 0, 'Visual Stu.': 313180000, WithSecure: 182020000 },
  },
  {
    id: 6, name: 'Calico',
    total: 5570000,
    products: { Adobe: 489050000, 'AWS China': 0, Azure: 60640000, 'Azure China': 22030000, BOX: 5561040000, Docker: 0, GCP: 0, 'Google W.': 5777520000, Invision: 0, 'Lucid Link': 0, Miro: 0, Monday: 4680000, 'MS O365': 0, 'MS SQL': 0, Oracle: 296710000, Sharepoint: 12760000, UHuB: 0, 'Visual Stu.': 364040000, WithSecure: 0 },
  },
  {
    id: 7, name: 'X Development',
    total: 3470000,
    products: { Adobe: 1340000, 'AWS China': 0, Azure: 547820000, 'Azure China': 21910000, BOX: 0, Docker: 0, GCP: 1526150000, 'Google W.': 0, Invision: 0, 'Lucid Link': 27260000, Miro: 12500000, Monday: 0, 'MS O365': 1180000, 'MS SQL': 41930000, Oracle: 252700000, Sharepoint: 41290000, UHuB: 0, 'Visual Stu.': 6814060000, WithSecure: 0 },
  },
  {
    id: 8, name: 'GV',
    total: 2650000,
    products: { Adobe: 307280000, 'AWS China': 0, Azure: 57520000, 'Azure China': 0, BOX: 1799160000, Docker: 0, GCP: 0, 'Google W.': 92850000, Invision: 0, 'Lucid Link': 127840000, Miro: 0, Monday: 1953650000, 'MS O365': 0, 'MS SQL': 0, Oracle: 322610000, Sharepoint: 7980000, UHuB: 0, 'Visual Stu.': 6264660000, WithSecure: 0 },
  },
  {
    id: 9, name: 'Wing',
    total: 2380000,
    products: { Adobe: 763190000, 'AWS China': 0, Azure: 278190000, 'Azure China': 0, BOX: 327120000, Docker: 0, GCP: 0, 'Google W.': 0, Invision: 0, 'Lucid Link': 0, Miro: 0, Monday: 0, 'MS O365': 0, 'MS SQL': 7459010000, Oracle: 0, Sharepoint: 242390000, UHuB: 0, 'Visual Stu.': 6264660000, WithSecure: 0 },
  },
  {
    id: 10, name: 'Fitbit',
    total: 1920000,
    products: { Adobe: 0, 'AWS China': 0, Azure: 1920000, 'Azure China': 0, BOX: 0, Docker: 0, GCP: 0, 'Google W.': 0, Invision: 0, 'Lucid Link': 0, Miro: 0, Monday: 0, 'MS O365': 0, 'MS SQL': 0, Oracle: 0, Sharepoint: 0, UHuB: 0, 'Visual Stu.': 0, WithSecure: 0 },
  },
  {
    id: 11, name: 'Mandiant',
    total: 1900000,
    products: { Adobe: 667570000, 'AWS China': 0, Azure: 431490000, 'Azure China': 0, BOX: 327120000, Docker: 718450000, GCP: 0, 'Google W.': 0, Invision: 26740000, 'Lucid Link': 128000000, Miro: 21600000, Monday: 439660000, 'MS O365': 0, 'MS SQL': 0, Oracle: 175170000, Sharepoint: 7700300000, UHuB: 0, 'Visual Stu.': 364040000, WithSecure: 0 },
  },
  {
    id: 12, name: 'Chronicle',
    total: 1450000,
    products: { Adobe: 347870000, 'AWS China': 0, Azure: 101910000, 'Azure China': 0, BOX: 0, Docker: 0, GCP: 0, 'Google W.': 152700000, Invision: 0, 'Lucid Link': 15000000, Miro: 0, Monday: 886200000, 'MS O365': 0, 'MS SQL': 0, Oracle: 99230000, Sharepoint: 5325410000, UHuB: 0, 'Visual Stu.': 0, WithSecure: 0 },
  },
  {
    id: 13, name: 'Looker',
    total: 1320000,
    products: { Adobe: 449810000, 'AWS China': 0, Azure: 189140000, 'Azure China': 0, BOX: 0, Docker: 0, GCP: 0, 'Google W.': 0, Invision: 0, 'Lucid Link': 131750000, Miro: 0, Monday: 447730000, 'MS O365': 0, 'MS SQL': 0, Oracle: 99160000, Sharepoint: 2210060000, UHuB: 0, 'Visual Stu.': 0, WithSecure: 0 },
  },
  {
    id: 14, name: 'AppSheet',
    total: 1080000,
    products: { Adobe: 121930000, 'AWS China': 0, Azure: 0, 'Azure China': 0, BOX: 0, Docker: 0, GCP: 0, 'Google W.': 0, Invision: 0, 'Lucid Link': 0, Miro: 0, Monday: 949590000, 'MS O365': 0, 'MS SQL': 0, Oracle: 0, Sharepoint: 5325410000, UHuB: 0, 'Visual Stu.': 0, WithSecure: 0 },
  },
  {
    id: 15, name: 'Intrinsic',
    total: 766000,
    products: { Adobe: 127930000, 'AWS China': 0, Azure: 462090000, 'Azure China': 0, BOX: 654240000, Docker: 0, GCP: 0, 'Google W.': 0, Invision: 32870000, 'Lucid Link': 0, Miro: 0, Monday: 133490000, 'MS O365': 0, 'MS SQL': 0, Oracle: 0, Sharepoint: 10590000, UHuB: 0, 'Visual Stu.': 0, WithSecure: 0 },
  },
  {
    id: 16, name: 'Jigsaw',
    total: 498000,
    products: { Adobe: 0, 'AWS China': 0, Azure: 0, 'Azure China': 0, BOX: 0, Docker: 498480000, GCP: 0, 'Google W.': 0, Invision: 0, 'Lucid Link': 0, Miro: 0, Monday: 0, 'MS O365': 0, 'MS SQL': 0, Oracle: 0, Sharepoint: 0, UHuB: 0, 'Visual Stu.': 0, WithSecure: 0 },
  },
  {
    id: 17, name: 'Area 120',
    total: 482000,
    products: { Adobe: 104300000, 'AWS China': 0, Azure: 204240000, 'Azure China': 0, BOX: 0, Docker: 0, GCP: 0, 'Google W.': 0, Invision: 0, 'Lucid Link': 0, Miro: 139980000, Monday: 0, 'MS O365': 0, 'MS SQL': 0, Oracle: 23880000, Sharepoint: 9566830000, UHuB: 0, 'Visual Stu.': 0, WithSecure: 0 },
  },
  {
    id: 18, name: 'Google Brain',
    total: 472000,
    products: { Adobe: 137070000, 'AWS China': 0, Azure: 0, 'Azure China': 0, BOX: 0, Docker: 0, GCP: 0, 'Google W.': 0, Invision: 0, 'Lucid Link': 276770000, Miro: 0, Monday: 0, 'MS O365': 0, 'MS SQL': 0, Oracle: 16180000, Sharepoint: 2184240000, UHuB: 4020000, 'Visual Stu.': 0, WithSecure: 0 },
  },
];
