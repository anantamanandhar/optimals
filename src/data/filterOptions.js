export const filterConfig = [
  {
    key: 'fiscalYear',
    label: 'Fiscal Year',
    options: ['is 2026', 'is 2025', 'is 2024', 'is 2023', 'is 2022', 'is any value'],
  },
  {
    key: 'supplier',
    label: 'Supplier',
    options: ['is any value', 'O365', 'Azure', 'Adobe', 'GCP', 'Oracle'],
  },
  {
    key: 'billTo',
    label: 'Bill To',
    options: ['is any value', 'Google LLC', 'YouTube', 'Waymo', 'DeepMind', 'Verily', 'Wing', 'X Development', 'Calico', 'GV'],
  },
];

export const defaultFilters = {
  fiscalYear: 'is 2024',
  supplier: 'is any value',
  billTo: 'is any value',
};
