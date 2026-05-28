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
  jobTitle: 'Chief Operating Officer',
  description: 'Canadian executive, entrepreneur, and operator with a career spanning Gaming, Fintech, SaaS, HR Technology, Real Estate, and BPO. COO & Executive Producer at Big Viking Games. COO & CRO at Mortgage Automator (BVP Forge). Managing Partner at PreciseHR. Track record of scaling growth-stage companies to profitability, driving GTM initiatives, and architecting enterprise-level strategies including a $110M strategic exit.',
  url: 'https://www.precisehr.ca/about/jeffrey-furtado',
  image: 'https://www.precisehr.ca/images/jeffrey-furtado.jpg',
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Big Viking Games',
      url: 'https://www.bigvikinggames.com',
      description: 'Canada\'s largest independent mobile and social game studio. Series B funded ($21.8M). Titles played by millions worldwide including YoWorld (acquired from Zynga).',
    },
    {
      '@type': 'Organization',
      name: 'Mortgage Automator',
      url: 'https://www.mortgageautomator.com',
      description: 'Leading SaaS platform for private and asset-based lenders. BVP Forge portfolio company. 400+ lenders worldwide, $66B+ in funded loans.',
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
  hasOccupation: [
    { '@type': 'Occupation', name: 'Chief Operating Officer' },
    { '@type': 'Occupation', name: 'Executive Producer' },
    { '@type': 'Occupation', name: 'Chief Revenue Officer' },
    { '@type': 'Occupation', name: 'Chief Risk & Compliance Officer' },
    { '@type': 'Occupation', name: 'Chief Marketing Officer' },
    { '@type': 'Occupation', name: 'Vice President of Sales' },
    { '@type': 'Occupation', name: 'Vice President of Operations' },
    { '@type': 'Occupation', name: 'Vice President of Shared Services' },
    { '@type': 'Occupation', name: 'Vice President of Customer Success' },
    { '@type': 'Occupation', name: 'Vice President of Lending' },
    { '@type': 'Occupation', name: 'Entrepreneur' },
    { '@type': 'Occupation', name: 'Business Executive' },
  ],
  knowsAbout: [
    'SaaS Operations',
    'Fintech',
    'Gaming Industry',
    'Live Operations',
    'Revenue Operations',
    'Go-to-Market Strategy',
    'Private Equity Exits',
    'Human Resources Management',
    'Canadian Employment Law',
    'Real Estate Investment',
    'Business Process Outsourcing',
    'AI-Driven Business Operations',
    'Sales Leadership',
    'Enterprise Strategy',
    'Risk & Compliance',
    'Customer Success',
  ],
  nationality: {
    '@type': 'Country',
    name: 'Canada',
  },
  homeLocation: [
    { '@type': 'Place', name: 'Toronto', address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' } },
    { '@type': 'Place', name: 'Oakville', address: { '@type': 'PostalAddress', addressLocality: 'Oakville', addressRegion: 'ON', addressCountry: 'CA' } },
    { '@type': 'Place', name: 'Simcoe', address: { '@type': 'PostalAddress', addressLocality: 'Simcoe', addressRegion: 'ON', addressCountry: 'CA' } },
  ],
  sameAs: [
    'https://www.linkedin.com/in/jeffreytfurtado/',
    'https://www.linkedin.com/company/precisehrcanada/',
    'https://furtadofirm.com/about-us',
    'https://www.mortgageautomator.com',
    'https://www.bigvikinggames.com',
    'https://www.businesswire.com/news/home/20250219687145/en/Mortgage-Automator-Announces-Record-Growth-AI-Driven-Innovation-in-2024',
    // Add as profiles are created:
    // 'https://www.youtube.com/@jeffreyfurtado',
    // 'https://www.instagram.com/jeffreytfurtado/',
    // 'https://www.facebook.com/jeffreytfurtado',
    // 'https://twitter.com/jeffreytfurtado',
    // 'https://www.wikidata.org/wiki/Q_________',
  ],
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.precisehr.ca/#organization',
  name: 'PreciseHR',
  legalName: 'PreciseHR',
  url: 'https://www.precisehr.ca',
  logo: 'https://www.precisehr.ca/images/logo.png',
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
      <script type="application/ld+json">{JSON.stringify(PERSON_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
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
