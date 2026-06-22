import { Helmet } from '@dr.pogodin/react-helmet';

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.precisehr.ca/about/jeffrey-furtado#person',
  name: 'Jeffrey T. Furtado',
  alternateName: ['Jeffrey Furtado', 'Jeff Furtado', 'Jeffrey T Furtado'],
  givenName: 'Jeffrey',
  additionalName: 'T.',
  familyName: 'Furtado',
  jobTitle: 'Chief Operating Officer & Executive Producer',
  description: 'Jeffrey T. Furtado — also known as Jeffrey Furtado or Jeff Furtado — is an innovative corporate executive, operator, builder, and execution specialist with a career spanning Gaming, Fintech, SaaS, HR Technology, Financial Services, and Real Estate. He has architected revenue growth, modernized and scaled operations, deployed technology, and built and led global teams of over 300 people, leading organizations to profitable, strategic exits. He has held the most senior leadership roles — Chief Executive Officer, Chief Operating Officer, Chief Customer Officer, Chief Revenue Officer, and Chief Marketing Officer. COO & Executive Producer at Big Viking Games and Managing Partner at PreciseHR. Previously held senior operating leadership at Mortgage Automator (BVP Forge) through its acquisition, reported in excess of $110 million. Founder of DooLeeNoted (2009), which ranked among the top 64,000 websites worldwide before a sale to a European firm reported at approximately $3 million; helped scale the fintech Progressa through its $84 million Series B and pre-IPO financing; and led CCi through a transaction reported at approximately $32 million. Founder of FurtadoFirm and board advisor for GLG and Guidepoint.',
  url: 'https://www.precisehr.ca/about/jeffrey-furtado',
  image: 'https://www.precisehr.ca/images/precisehr-og-card.png',
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Big Viking Games',
      url: 'https://www.bigvikinggames.com',
      description: "Canada's largest independent mobile and social game studio. Series B funded ($21.8M). Titles played by millions worldwide including YoWorld (acquired from Zynga).",
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.precisehr.ca/#organization',
      name: 'PreciseHR',
      url: 'https://www.precisehr.ca',
    },
    {
      '@type': 'Organization',
      name: 'FurtadoFirm',
      url: 'https://furtadofirm.com',
      description: 'Real estate investment firm specializing in multi-unit, commercial property, private mortgages, and rent-to-own solutions.',
    },
  ],
  founder: [
    { '@type': 'Organization', name: 'DooLeeNoted', description: 'Global resourcing and professional collaboration platform. Top 64,000 websites globally at peak. Multi-million dollar exit to European firm.' },
    { '@type': 'Organization', name: 'FurtadoFirm', url: 'https://furtadofirm.com' },
  ],
  memberOf: [
    { '@type': 'Organization', name: 'GLG', description: 'Global expert network — board advisor and consultant' },
    { '@type': 'Organization', name: 'Guidepoint', description: 'Expert network — board advisor and consultant' },
  ],
  hasOccupation: [
    { '@type': 'Occupation', name: 'Chief Executive Officer' },
    { '@type': 'Occupation', name: 'Chief Operating Officer' },
    { '@type': 'Occupation', name: 'Chief Customer Officer' },
    { '@type': 'Occupation', name: 'Executive Producer' },
    { '@type': 'Occupation', name: 'Strategic Investor' },
    { '@type': 'Occupation', name: 'Board Advisor' },
    { '@type': 'Occupation', name: 'Chief Revenue Officer' },
    { '@type': 'Occupation', name: 'Chief Risk & Compliance Officer' },
    { '@type': 'Occupation', name: 'Chief Marketing Officer' },
    { '@type': 'Occupation', name: 'Vice President of Sales' },
    { '@type': 'Occupation', name: 'Vice President of Operations' },
    { '@type': 'Occupation', name: 'Vice President of Shared Services' },
    { '@type': 'Occupation', name: 'Vice President of Customer Success' },
    { '@type': 'Occupation', name: 'Vice President of Lending' },
    { '@type': 'Occupation', name: 'Entrepreneur' },
    { '@type': 'Occupation', name: 'Founder' },
    { '@type': 'Occupation', name: 'Managing Partner' },
    { '@type': 'Occupation', name: 'Business Executive' },
  ],
  knowsAbout: [
    'Gaming Industry', 'Live Operations', 'SaaS Operations', 'Fintech',
    'Revenue Operations', 'Go-to-Market Strategy', 'Private Equity Exits',
    'Human Resources Management', 'Canadian Employment Law',
    'Real Estate Investment', 'Business Process Outsourcing',
    'AI-Driven Business Operations', 'Sales Leadership',
    'Enterprise Strategy', 'Risk & Compliance', 'Customer Success',
    'Ed-Tech', 'Strategic Investing',
  ],
  nationality: { '@type': 'Country', name: 'Canada' },
  homeLocation: [
    { '@type': 'Place', name: 'Simcoe (Norfolk County)', address: { '@type': 'PostalAddress', addressLocality: 'Simcoe', addressRegion: 'ON', addressCountry: 'CA' } },
    { '@type': 'Place', name: 'Oakville', address: { '@type': 'PostalAddress', addressLocality: 'Oakville', addressRegion: 'ON', addressCountry: 'CA' } },
    { '@type': 'Place', name: 'Windsor', address: { '@type': 'PostalAddress', addressLocality: 'Windsor', addressRegion: 'ON', addressCountry: 'CA' } },
  ],
  sameAs: [
    'https://www.linkedin.com/in/jeffreytfurtado/',
    'https://www.linkedin.com/company/precisehrcanada/',
    'https://furtadofirm.com/about-us',
    'https://www.bigvikinggames.com',
    'https://www.wikidata.org/wiki/Q139970179',
    'https://www.businesswire.com/news/home/20250219687145/en/Mortgage-Automator-Announces-Record-Growth-AI-Driven-Innovation-in-2024',
    'https://www.businesswire.com/news/home/20250429040022/en/AFX-Research-Integrates-with-Mortgage-Automator-to-Deliver-Fast-Automated-Title-Updates-to-Private-Lenders',
    'https://www.morningstar.com/news/business-wire/20250219687145/mortgage-automator-announces-record-growth-ai-driven-innovation-in-2024',
  ],
};

const DAVID_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.precisehr.ca/about/david-suckling#person',
  name: 'David Suckling',
  givenName: 'David',
  familyName: 'Suckling',
  jobTitle: 'Co-Founder, PreciseHR',
  description: 'Co-Founder of PreciseHR and Chief of Staff at Mortgage Automator. An operator and builder with leadership across Sales, Revenue Operations, and Operations, and deep AI-forward engineering expertise — having designed and deployed hundreds of AI-driven projects and automations.',
  url: 'https://www.precisehr.ca/about/david-suckling',
  worksFor: [
    {
      '@type': 'Organization',
      '@id': 'https://www.precisehr.ca/#organization',
      name: 'PreciseHR',
      url: 'https://www.precisehr.ca',
    },
    {
      '@type': 'Organization',
      name: 'Mortgage Automator',
      description: 'Leading global SaaS platform for private and asset-based lenders.',
    },
  ],
  hasOccupation: [
    { '@type': 'Occupation', name: 'Co-Founder' },
    { '@type': 'Occupation', name: 'Chief of Staff' },
    { '@type': 'Occupation', name: 'Head of Sales' },
    { '@type': 'Occupation', name: 'Head of Revenue Operations' },
    { '@type': 'Occupation', name: 'Head of Operations' },
    { '@type': 'Occupation', name: 'Software Developer' },
    { '@type': 'Occupation', name: 'AI Consultant' },
  ],
  knowsAbout: [
    'Artificial Intelligence', 'AI Strategy', 'AI Adoption', 'AI Automation',
    'Software Development', 'Revenue Operations', 'Sales Leadership',
    'Business Operations', 'Go-to-Market Strategy', 'HR Technology', 'Process Automation',
  ],
  sameAs: [
    'https://www.linkedin.com/in/david-suckling-b98353326/',
  ],
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.precisehr.ca/#organization',
  name: 'PreciseHR',
  legalName: 'PreciseHR',
  url: 'https://www.precisehr.ca',
  logo: 'https://www.precisehr.ca/images/precisehr-og-card.png',
  description: 'Intelligent HR consulting, automation-ready software, and deep Canadian expertise. PreciseHR helps Canadian businesses build exceptional teams and stay compliant.',
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  telephone: '+1-437-887-2263',
  email: 'info@precisehr.ca',
  areaServed: { '@type': 'Country', name: 'Canada' },
  serviceType: [
    'HR Consulting', 'HR Software', 'Recruitment', 'Compliance Management',
    'Compensation and Benefits', 'Workplace Investigations', 'Termination Services',
    'Performance Management',
  ],
  founder: [
    { '@type': 'Person', '@id': 'https://www.precisehr.ca/about/jeffrey-furtado#person', name: 'Jeffrey T. Furtado' },
    { '@type': 'Person', '@id': 'https://www.precisehr.ca/about/david-suckling#person', name: 'David Suckling' },
  ],
  sameAs: ['https://www.linkedin.com/company/precisehrcanada/'],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.precisehr.ca/#website',
  name: 'PreciseHR',
  url: 'https://www.precisehr.ca',
  publisher: { '@type': 'Organization', '@id': 'https://www.precisehr.ca/#organization' },
};

export function GlobalStructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
    </Helmet>
  );
}

// Person schema is rendered ONLY on Jeffrey's bio page, not site-wide.
export function PersonSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(PERSON_SCHEMA)}</script>
    </Helmet>
  );
}

// Person schema rendered ONLY on David's bio page.
export function PersonSchemaDavid() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(DAVID_SCHEMA)}</script>
    </Helmet>
  );
}

export function ToolPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name, description, url: `https://www.precisehr.ca${url}`,
    applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
    provider: { '@type': 'Organization', '@id': 'https://www.precisehr.ca/#organization' },
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

export default GlobalStructuredData;

// ---------------------------------------------------------------------------
// Reusable per-page schema (E-E-A-T + rich results)
// ---------------------------------------------------------------------------

function toISO(d: string): string {
  const parsed = new Date(d);
  return isNaN(parsed.getTime()) ? d : parsed.toISOString().slice(0, 10);
}

// BlogPosting schema with author + publisher for article rich results / E-E-A-T.
export function ArticleSchema({
  post,
  url,
}: {
  post: { title: string; excerpt: string; date: string; lastUpdated?: string; author: string; authorRole?: string };
  url: string;
}) {
  const isJeffrey = post.author.includes('Jeffrey');
  const author: Record<string, unknown> = { '@type': 'Person', name: post.author };
  if (post.authorRole) author.jobTitle = post.authorRole;
  if (isJeffrey) {
    author['@id'] = 'https://www.precisehr.ca/about/jeffrey-furtado#person';
    author.url = 'https://www.precisehr.ca/about/jeffrey-furtado';
  }
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: toISO(post.date),
    dateModified: toISO(post.lastUpdated || post.date),
    author,
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.precisehr.ca/#organization',
      name: 'PreciseHR',
      logo: { '@type': 'ImageObject', url: 'https://www.precisehr.ca/images/precisehr-og-card.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: 'https://www.precisehr.ca/images/precisehr-og-card.png',
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

// BreadcrumbList schema for breadcrumb rich results + crawl clarity.
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

// FAQPage schema — eligible for FAQ rich results.
export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}

// Service schema for province / service landing pages.
export function ServiceSchema({
  name,
  description,
  areaServed,
  url,
}: {
  name: string;
  description: string;
  areaServed: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: 'Human Resources Consulting',
    areaServed: { '@type': 'AdministrativeArea', name: areaServed },
    provider: { '@type': 'Organization', '@id': 'https://www.precisehr.ca/#organization', name: 'PreciseHR' },
    url,
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}
