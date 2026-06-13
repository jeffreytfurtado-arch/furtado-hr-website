// Province-level data for the "HR Services in {Province}" landing pages.
// Statute and agency names are real, stable facts. Specific figures
// (wages, notice periods) are intentionally NOT hardcoded here — those live
// in the interactive tools (minimum-wage, statutory-holidays, net-pay) which
// are kept current, and the province pages link out to them.

export interface Province {
  slug: string;
  name: string;
  abbr: string;
  statute: string;      // governing employment-standards legislation
  agency: string;       // administering body
  agencyShort?: string; // acronym, if commonly used
  blurb: string;        // unique 1–2 sentence intro for the hero
  note?: string;        // optional province-distinctive compliance note (only where confident)
}

export const PROVINCES_DATA: Province[] = [
  {
    slug: 'ontario',
    name: 'Ontario',
    abbr: 'ON',
    statute: 'Employment Standards Act, 2000 (ESA)',
    agency: 'Ministry of Labour, Immigration, Training and Skills Development',
    agencyShort: 'MLITSD',
    blurb: 'From Toronto to Ottawa, we help Ontario employers stay onside of the ESA, build compliant contracts and policies, and run HR that scales.',
    note: 'Ontario employers also face evolving rules — from written employment statements to pay-transparency changes under Bill 149 — and we keep your documentation current as they take effect.',
  },
  {
    slug: 'british-columbia',
    name: 'British Columbia',
    abbr: 'BC',
    statute: 'Employment Standards Act',
    agency: 'Employment Standards Branch',
    blurb: 'We support BC employers across Vancouver, Victoria and beyond with compliant HR, contracts, and policies tuned to provincial standards.',
    note: 'BC has its own distinct requirements — including paid sick leave entitlements and specific rules on averaging agreements — that we build into your policies and contracts.',
  },
  {
    slug: 'alberta',
    name: 'Alberta',
    abbr: 'AB',
    statute: 'Employment Standards Code',
    agency: 'Alberta Employment Standards',
    blurb: 'Calgary and Edmonton employers trust us for HR that keeps pace with the Employment Standards Code — contracts, policies, payroll, and compliance.',
  },
  {
    slug: 'quebec',
    name: 'Quebec',
    abbr: 'QC',
    statute: 'Act respecting labour standards',
    agency: 'Commission des normes, de l\u2019\u00e9quit\u00e9, de la sant\u00e9 et de la s\u00e9curit\u00e9 du travail',
    agencyShort: 'CNESST',
    blurb: 'We help employers operating in Quebec navigate the province\u2019s distinct labour-standards regime and documentation expectations.',
    note: 'Quebec is unique in Canada — French-language obligations for workplace documentation and a civil-law framework mean policies and contracts need province-specific care.',
  },
  {
    slug: 'manitoba',
    name: 'Manitoba',
    abbr: 'MB',
    statute: 'The Employment Standards Code',
    agency: 'Manitoba Employment Standards',
    blurb: 'Winnipeg and provincial employers rely on us for compliant contracts, policies, and day-to-day HR support across Manitoba.',
  },
  {
    slug: 'saskatchewan',
    name: 'Saskatchewan',
    abbr: 'SK',
    statute: 'The Saskatchewan Employment Act',
    agency: 'Saskatchewan Employment Standards',
    blurb: 'From Regina to Saskatoon, we help Saskatchewan employers meet the Saskatchewan Employment Act with clean documentation and expert advice.',
  },
  {
    slug: 'nova-scotia',
    name: 'Nova Scotia',
    abbr: 'NS',
    statute: 'Labour Standards Code',
    agency: 'Nova Scotia Labour Standards',
    blurb: 'Halifax and Atlantic employers count on us for compliant HR aligned to the Labour Standards Code.',
  },
  {
    slug: 'new-brunswick',
    name: 'New Brunswick',
    abbr: 'NB',
    statute: 'Employment Standards Act',
    agency: 'New Brunswick Employment Standards Branch',
    blurb: 'We support New Brunswick employers with contracts, policies, and HR advice tuned to provincial employment standards.',
  },
  {
    slug: 'newfoundland-and-labrador',
    name: 'Newfoundland and Labrador',
    abbr: 'NL',
    statute: 'Labour Standards Act',
    agency: 'Labour Standards Division',
    blurb: 'St. John\u2019s and provincial employers trust us for compliant HR documentation and support across Newfoundland and Labrador.',
  },
  {
    slug: 'prince-edward-island',
    name: 'Prince Edward Island',
    abbr: 'PE',
    statute: 'Employment Standards Act',
    agency: 'PEI Employment Standards',
    blurb: 'We help PEI employers keep their HR compliant, documented, and running smoothly under provincial employment standards.',
  },
  {
    slug: 'yukon',
    name: 'Yukon',
    abbr: 'YT',
    statute: 'Employment Standards Act',
    agency: 'Yukon Employment Standards',
    blurb: 'Whitehorse and territorial employers rely on us for compliant contracts, policies, and HR support across Yukon.',
  },
  {
    slug: 'northwest-territories',
    name: 'Northwest Territories',
    abbr: 'NT',
    statute: 'Employment Standards Act',
    agency: 'Employment Standards Office (NWT)',
    blurb: 'We support Northwest Territories employers with HR documentation and advice aligned to territorial employment standards.',
  },
  {
    slug: 'nunavut',
    name: 'Nunavut',
    abbr: 'NU',
    statute: 'Labour Standards Act',
    agency: 'Employment Standards Office (Nunavut)',
    blurb: 'We help Nunavut employers build compliant HR foundations under territorial labour standards.',
  },
];

export function getProvince(slug: string): Province | undefined {
  return PROVINCES_DATA.find((p) => p.slug === slug);
}

// Generate accurate, high-level FAQs per province (woven from the real
// statute/agency facts) for the on-page FAQ + FAQPage schema.
export function provinceFaqs(p: Province): { q: string; a: string }[] {
  return [
    {
      q: `Which employment-standards law applies to employers in ${p.name}?`,
      a: `In ${p.name}, employment standards are set by the ${p.statute} and administered by ${p.agency}${p.agencyShort ? ` (${p.agencyShort})` : ''}. PreciseHR helps you build contracts, policies, and processes that align with it.`,
    },
    {
      q: `Does PreciseHR help with terminations and Records of Employment (ROE) in ${p.name}?`,
      a: `Yes. We support ${p.name} employers through the full termination process — documentation, notice and severance considerations, ROE filing with Service Canada, and communication — to reduce legal risk.`,
    },
    {
      q: `Can you handle payroll deductions and statutory pay for ${p.name}?`,
      a: `We help ${p.name} employers get pay right — CPP, EI, and federal/provincial tax, plus statutory holiday pay and minimum-wage compliance. Our free Net Pay, Minimum Wage, and Statutory Holiday tools cover ${p.name} specifically.`,
    },
    {
      q: `Do you work with small and mid-sized businesses in ${p.name}?`,
      a: `Absolutely. PreciseHR is built for Canadian SMBs. Whether you have 5 employees or 500, we provide fractional HR, compliance, recruitment, and HR software tailored to ${p.name}.`,
    },
  ];
}
