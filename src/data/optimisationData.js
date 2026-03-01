export const SUBSIDIARIES = [
  'Google LLC', 'YouTube', 'Waymo', 'DeepMind',
  'Verily', 'Calico', 'X Development', 'GV', 'Wing', 'Fitbit',
];

export const DEPARTMENTS = [
  'Engineering', 'Marketing', 'Finance', 'Operations',
  'HR', 'Legal', 'IT', 'Product', 'Data Science', 'Sales',
];

export const PRODUCTS = [
  'O365', 'Adobe CC', 'Azure', 'GCP', 'Google Workspace',
  'Sharepoint', 'Box', 'Monday', 'UHuB', 'WithSecure',
];

// issue types: 'ghost' | 'duplicate' | 'underutilized' | 'rightsizing'
export const issues = [
  // ── GHOST ACCOUNTS ──────────────────────────────────────────────────────
  { id: 'g01', type: 'ghost', product: 'O365',            subsidiary: 'Google LLC',    department: 'Engineering',   users: 18, monthlyCost: 10800,  annualSaving: 129600, lastActive: '142 days ago',  action: 'Revoke licences',   severity: 'high' },
  { id: 'g02', type: 'ghost', product: 'O365',            subsidiary: 'Fitbit',        department: 'Sales',         users: 14, monthlyCost: 8400,   annualSaving: 100800, lastActive: '98 days ago',   action: 'Revoke licences',   severity: 'high' },
  { id: 'g03', type: 'ghost', product: 'O365',            subsidiary: 'X Development', department: 'Engineering',   users: 9,  monthlyCost: 5400,   annualSaving: 64800,  lastActive: '210 days ago',  action: 'Revoke licences',   severity: 'high' },
  { id: 'g04', type: 'ghost', product: 'Adobe CC',        subsidiary: 'YouTube',       department: 'Marketing',     users: 12, monthlyCost: 6000,   annualSaving: 72000,  lastActive: '67 days ago',   action: 'Revoke licences',   severity: 'high' },
  { id: 'g05', type: 'ghost', product: 'Sharepoint',      subsidiary: 'Google LLC',    department: 'Legal',         users: 22, monthlyCost: 4400,   annualSaving: 52800,  lastActive: '183 days ago',  action: 'Revoke licences',   severity: 'medium' },
  { id: 'g06', type: 'ghost', product: 'O365',            subsidiary: 'Waymo',         department: 'Product',       users: 8,  monthlyCost: 4800,   annualSaving: 57600,  lastActive: '56 days ago',   action: 'Revoke licences',   severity: 'medium' },
  { id: 'g07', type: 'ghost', product: 'Google Workspace',subsidiary: 'DeepMind',      department: 'Data Science',  users: 15, monthlyCost: 3000,   annualSaving: 36000,  lastActive: '301 days ago',  action: 'Revoke licences',   severity: 'high' },
  { id: 'g08', type: 'ghost', product: 'Azure',           subsidiary: 'DeepMind',      department: 'Engineering',   users: 4,  monthlyCost: 2400,   annualSaving: 28800,  lastActive: '74 days ago',   action: 'Remove user access', severity: 'medium' },
  { id: 'g09', type: 'ghost', product: 'Adobe CC',        subsidiary: 'GV',            department: 'Marketing',     users: 5,  monthlyCost: 2500,   annualSaving: 30000,  lastActive: '121 days ago',  action: 'Revoke licences',   severity: 'medium' },
  { id: 'g10', type: 'ghost', product: 'Google Workspace',subsidiary: 'YouTube',       department: 'Operations',    users: 10, monthlyCost: 2000,   annualSaving: 24000,  lastActive: '89 days ago',   action: 'Revoke licences',   severity: 'medium' },
  { id: 'g11', type: 'ghost', product: 'UHuB',            subsidiary: 'Wing',          department: 'IT',            users: 6,  monthlyCost: 900,    annualSaving: 10800,  lastActive: '55 days ago',   action: 'Revoke licences',   severity: 'low' },
  { id: 'g12', type: 'ghost', product: 'Box',             subsidiary: 'Verily',        department: 'Operations',    users: 11, monthlyCost: 550,    annualSaving: 6600,   lastActive: '178 days ago',  action: 'Revoke licences',   severity: 'low' },
  { id: 'g13', type: 'ghost', product: 'Monday',          subsidiary: 'Calico',        department: 'HR',            users: 7,  monthlyCost: 840,    annualSaving: 10080,  lastActive: '93 days ago',   action: 'Revoke licences',   severity: 'low' },
  { id: 'g14', type: 'ghost', product: 'WithSecure',      subsidiary: 'Waymo',         department: 'IT',            users: 8,  monthlyCost: 640,    annualSaving: 7680,   lastActive: '44 days ago',   action: 'Revoke licences',   severity: 'low' },

  // ── DUPLICATE LICENCES ──────────────────────────────────────────────────
  { id: 'd01', type: 'duplicate', product: 'O365 + Google Workspace', subsidiary: 'Google LLC',    department: 'Engineering', users: 45, monthlyCost: 13500, annualSaving: 162000, overlap: 'Full suite overlap — recommend consolidating to Google Workspace', severity: 'high' },
  { id: 'd02', type: 'duplicate', product: 'O365 + Google Workspace', subsidiary: 'YouTube',       department: 'Marketing',   users: 32, monthlyCost: 9600,  annualSaving: 115200, overlap: 'Full suite overlap — recommend consolidating to Google Workspace', severity: 'high' },
  { id: 'd03', type: 'duplicate', product: 'O365 + Google Workspace', subsidiary: 'Waymo',         department: 'Product',     users: 28, monthlyCost: 8400,  annualSaving: 100800, overlap: 'Full suite overlap',                                               severity: 'high' },
  { id: 'd04', type: 'duplicate', product: 'O365 + Google Workspace', subsidiary: 'DeepMind',      department: 'Data Science',users: 19, monthlyCost: 5700,  annualSaving: 68400,  overlap: 'Full suite overlap',                                               severity: 'high' },
  { id: 'd05', type: 'duplicate', product: 'Adobe CC + Figma',        subsidiary: 'Google LLC',    department: 'Product',     users: 34, monthlyCost: 6800,  annualSaving: 81600,  overlap: 'Both provide UI/UX design tooling — standardise on Figma',         severity: 'high' },
  { id: 'd06', type: 'duplicate', product: 'Adobe CC + Figma',        subsidiary: 'YouTube',       department: 'Marketing',   users: 21, monthlyCost: 4200,  annualSaving: 50400,  overlap: 'Both provide UI/UX design tooling',                                severity: 'medium' },
  { id: 'd07', type: 'duplicate', product: 'Sharepoint + Box',        subsidiary: 'Verily',        department: 'Operations',  users: 23, monthlyCost: 1150,  annualSaving: 13800,  overlap: 'Document storage overlap — consolidate to Sharepoint',             severity: 'medium' },
  { id: 'd08', type: 'duplicate', product: 'Monday + Asana',          subsidiary: 'Calico',        department: 'Operations',  users: 18, monthlyCost: 1440,  annualSaving: 17280,  overlap: 'Duplicate project management tools — standardise on Monday',       severity: 'medium' },
  { id: 'd09', type: 'duplicate', product: 'O365 + Google Workspace', subsidiary: 'Fitbit',        department: 'Engineering', users: 16, monthlyCost: 4800,  annualSaving: 57600,  overlap: 'Full suite overlap',                                               severity: 'high' },
  { id: 'd10', type: 'duplicate', product: 'Box + Sharepoint',        subsidiary: 'GV',            department: 'Finance',     users: 14, monthlyCost: 700,   annualSaving: 8400,   overlap: 'File storage overlap — consolidate to Sharepoint',                 severity: 'low' },

  // ── UNDERUTILISED ───────────────────────────────────────────────────────
  { id: 'u01', type: 'underutilized', product: 'Adobe CC',        subsidiary: 'Google LLC',    department: 'Finance',      users: 28, totalLicences: 28, activeLicences: 2,  usagePct: 8,  monthlyCost: 14000, annualSaving: 168000, threshold: '20% in 90 days', severity: 'high' },
  { id: 'u02', type: 'underutilized', product: 'UHuB',            subsidiary: 'Verily',        department: 'IT',           users: 34, totalLicences: 34, activeLicences: 2,  usagePct: 5,  monthlyCost: 5100,  annualSaving: 61200,  threshold: '20% in 90 days', severity: 'high' },
  { id: 'u03', type: 'underutilized', product: 'GCP',             subsidiary: 'YouTube',       department: 'Engineering',  users: 15, totalLicences: 15, activeLicences: 2,  usagePct: 15, monthlyCost: 7500,  annualSaving: 90000,  threshold: '20% in 90 days', severity: 'high' },
  { id: 'u04', type: 'underutilized', product: 'O365',            subsidiary: 'Waymo',         department: 'HR',           users: 47, totalLicences: 47, activeLicences: 6,  usagePct: 12, monthlyCost: 5640,  annualSaving: 67680,  threshold: '20% in 90 days', severity: 'high' },
  { id: 'u05', type: 'underutilized', product: 'Adobe CC',        subsidiary: 'DeepMind',      department: 'Legal',        users: 12, totalLicences: 12, activeLicences: 0,  usagePct: 4,  monthlyCost: 3600,  annualSaving: 43200,  threshold: '20% in 90 days', severity: 'high' },
  { id: 'u06', type: 'underutilized', product: 'Monday',          subsidiary: 'GV',            department: 'Operations',   users: 19, totalLicences: 19, activeLicences: 2,  usagePct: 9,  monthlyCost: 2280,  annualSaving: 27360,  threshold: '20% in 90 days', severity: 'medium' },
  { id: 'u07', type: 'underutilized', product: 'WithSecure',      subsidiary: 'Wing',          department: 'IT',           users: 31, totalLicences: 31, activeLicences: 2,  usagePct: 7,  monthlyCost: 2480,  annualSaving: 29760,  threshold: '20% in 90 days', severity: 'medium' },
  { id: 'u08', type: 'underutilized', product: 'Box',             subsidiary: 'X Development', department: 'Operations',   users: 22, totalLicences: 22, activeLicences: 4,  usagePct: 18, monthlyCost: 1100,  annualSaving: 13200,  threshold: '20% in 90 days', severity: 'medium' },

  // ── LICENCE RIGHTSIZING ─────────────────────────────────────────────────
  { id: 'r01', type: 'rightsizing', product: 'O365',      subsidiary: 'Google LLC',    department: 'Engineering', users: 89, currentTier: 'E5',         recommendedTier: 'E3',        monthlyPerUser: 8,  monthlyCost: 712,   annualSaving: 8544,  reason: 'Users not leveraging E5-specific features (Advanced eDiscovery, Phone System)',    severity: 'medium' },
  { id: 'r02', type: 'rightsizing', product: 'O365',      subsidiary: 'YouTube',       department: 'Marketing',   users: 67, currentTier: 'E5',         recommendedTier: 'E3',        monthlyPerUser: 8,  monthlyCost: 536,   annualSaving: 6432,  reason: 'Marketing users show no usage of E5-exclusive compliance or telephony features',  severity: 'medium' },
  { id: 'r03', type: 'rightsizing', product: 'Adobe CC',  subsidiary: 'Waymo',         department: 'Product',     users: 45, currentTier: 'All Apps',   recommendedTier: 'Single App',monthlyPerUser: 45, monthlyCost: 2025,  annualSaving: 24300, reason: '94% of usage is confined to a single application (Acrobat/Illustrator)',          severity: 'high' },
  { id: 'r04', type: 'rightsizing', product: 'Sharepoint',subsidiary: 'Google LLC',    department: 'Operations',  users: 112,currentTier: 'Plan 2',     recommendedTier: 'Plan 1',    monthlyPerUser: 5,  monthlyCost: 560,   annualSaving: 6720,  reason: 'No usage of Plan 2 features: eDiscovery, Records Management, or Compliance',     severity: 'medium' },
  { id: 'r05', type: 'rightsizing', product: 'Box',       subsidiary: 'Verily',        department: 'R&D',         users: 56, currentTier: 'Enterprise', recommendedTier: 'Business',  monthlyPerUser: 8,  monthlyCost: 448,   annualSaving: 5376,  reason: 'Enterprise governance features unused; storage usage well within Business limits', severity: 'low' },
  { id: 'r06', type: 'rightsizing', product: 'GCP',       subsidiary: 'DeepMind',      department: 'Data Science',users: 23, currentTier: 'Premium',    recommendedTier: 'Standard',  monthlyPerUser: 12, monthlyCost: 276,   annualSaving: 3312,  reason: 'Premium support tier not utilised; no tickets raised against Premium SLA',       severity: 'low' },
  { id: 'r07', type: 'rightsizing', product: 'Monday',    subsidiary: 'Calico',        department: 'Operations',  users: 28, currentTier: 'Enterprise', recommendedTier: 'Pro',       monthlyPerUser: 12, monthlyCost: 336,   annualSaving: 4032,  reason: 'Enterprise SSO/SAML and advanced security features not in use',                  severity: 'low' },
  { id: 'r08', type: 'rightsizing', product: 'UHuB',      subsidiary: 'Wing',          department: 'IT',          users: 44, currentTier: 'Premium',    recommendedTier: 'Basic',     monthlyPerUser: 5,  monthlyCost: 220,   annualSaving: 2640,  reason: 'Only basic collaboration features used across all Wing IT users',                 severity: 'low' },
];

// Pre-compute aggregate numbers used in KPI cards
export function getSummary(filtered) {
  const total = filtered.reduce((s, i) => s + i.annualSaving, 0);
  const ghost = filtered.filter((i) => i.type === 'ghost');
  const dup = filtered.filter((i) => i.type === 'duplicate');
  const under = filtered.filter((i) => i.type === 'underutilized');
  const right = filtered.filter((i) => i.type === 'rightsizing');
  return {
    totalSaving: total,
    ghost: { count: ghost.reduce((s, i) => s + i.users, 0), saving: ghost.reduce((s, i) => s + i.annualSaving, 0) },
    duplicate: { count: dup.reduce((s, i) => s + i.users, 0), saving: dup.reduce((s, i) => s + i.annualSaving, 0) },
    underutilized: { count: under.reduce((s, i) => s + i.users, 0), saving: under.reduce((s, i) => s + i.annualSaving, 0) },
    rightsizing: { count: right.reduce((s, i) => s + i.users, 0), saving: right.reduce((s, i) => s + i.annualSaving, 0) },
  };
}

// Savings grouped by product (for bar chart)
export function getSavingsByProduct(filtered) {
  const map = {};
  filtered.forEach((i) => {
    const key = i.product.split(' +')[0].trim(); // use first product for duplicates
    map[key] = (map[key] || 0) + i.annualSaving;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

// Savings grouped by subsidiary (for breakdown chart)
export function getSavingsBySubsidiary(filtered) {
  const map = {};
  filtered.forEach((i) => { map[i.subsidiary] = (map[i.subsidiary] || 0) + i.annualSaving; });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// Savings grouped by department
export function getSavingsByDepartment(filtered) {
  const map = {};
  filtered.forEach((i) => { map[i.department] = (map[i.department] || 0) + i.annualSaving; });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
