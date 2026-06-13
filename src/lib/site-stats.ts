// Single source of truth for PreciseHR's headline stats.
// Update here and every page that imports these stays in sync.
export const SITE_STATS = {
  clients: '90+',
  employees: '1,500+',
  satisfaction: '98%',
  yearsExperience: '15+',
  provinces: '13',
};

export const HERO_STATS = [
  { value: SITE_STATS.provinces, label: 'Provinces Covered' },
  { value: SITE_STATS.yearsExperience, label: 'Years Experience' },
  { value: SITE_STATS.satisfaction, label: 'Client Satisfaction' },
  { value: SITE_STATS.employees, label: 'Employees Supported' },
];
