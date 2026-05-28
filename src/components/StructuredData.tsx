import { Helmet } from '@dr.pogodin/react-helmet';

/*
 * Machine-readable structured data for search engines and AI systems.
 * This uses Schema.org JSON-LD format, which is the format Google, Bing,
 * ChatGPT, Perplexity, and Google AI Overviews use to build entity profiles.
 *
 * Update social links as they become available.
 */

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.precisehr.ca/about/jeffrey-furtado#person',
  name: 'Jeffrey T. Furtado',
  alternateName: ['Jeffrey Furtado', 'Jeff Furtado', 'Jeffrey T Furtado'],
  givenName: 'Jeffrey',
  familyName: 'Furtado',
  jobTitle: 'Managing Partner & Principal Consultant',
  description: 'Canadian HR executive and founder of PreciseHR. Over 15 years of experience in HR strategy, employment law compliance, organizational design, and intelligent HR technology. Specializes in helping Canadian businesses build compliant, scalable people operations.',
  url: 'https://www.precisehr.ca/about/jeffrey-furtado',
  image: 'https://www.precisehr.ca/images/jeffrey-furtado.jpg', // Update when headshot available
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://www.precisehr.ca/#organization',
    name: 'PreciseHR',
  },
  founder: {
    '@type': 'Organization',
    '@id': 'https://www.precisehr.ca/#organization',
  },
  knowsAbout: [
    'Human Resources Management',
    'Canadian Employment Law',
    'HR Compliance',
    'HR Technology',
    'Organizational Design',
    'Talent Acquisition',
    'Workplace Investigations',
    'Compensation and Benefits',
    'Performance Management',
    'HR Consulting',
  ],
  nationality: {
    '@type': 'Country',
    name: 'Canada',
  },
  // Update these as profiles are created/confirmed
  sameAs: [
    'https://www.linkedin.com/in/jeffreytfurtado/',
    'https://www.linkedin.com/company/precisehrcanada/',
    // 'https://www.youtube.com/@precisehr',        // Add when created
    // 'https://www.instagram.com/precisehr/',       // Add when created
    // 'https://www.facebook.com/precisehr/',        // Add when created
    // 'https://twitter.com/precisehr',              // Add when created
    // 'https://www.wikidata.org/wiki/Q_________',   // Add after Wikidata entry
  ],
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.precisehr.ca/#organization',
  name: 'PreciseHR',
  legalName: 'PreciseHR',
  url: 'https://www.precisehr.ca',
  logo: 'https://www.precisehr.ca/images/logo.png', // Update with actual logo URL
  description: 'Intelligent HR consulting, automation-ready software, and deep Canadian expertise. PreciseHR helps Canadian businesses build exceptional teams and stay compliant.',
  foundingDate: '2011',
  founder: {
    '@type': 'Person',
    '@id': 'https://www.precisehr.ca/about/jeffrey-furtado#person',
    name: 'Jeffrey T. Furtado',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
    addressRegion: 'ON',
  },
  telephone: '+1-437-887-2263',
  email: 'info@precisehr.ca',
  areaServed: {
    '@type': 'Country',
    name: 'Canada',
  },
  serviceType: [
    'HR Consulting',
    'HR Software',
    'Recruitment',
    'Compliance Management',
    'Compensation and Benefits',
    'Workplace Investigations',
    'Termination Services',
    'Performance Management',
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 2,
    maxValue: 10,
  },
  sameAs: [
    'https://www.linkedin.com/company/precisehrcanada/',
    // Add more social profiles as they're created
  ],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.precisehr.ca/#website',
  name: 'PreciseHR',
  url: 'https://www.precisehr.ca',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.precisehr.ca/#organization',
  },
};

/**
 * GlobalStructuredData — drop this in the root layout.
 * Renders invisible JSON-LD that search engines and AI systems read.
 */
export function GlobalStructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(PERSON_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(ORGANIZATION_SCHEMA)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(WEBSITE_SCHEMA)}
      </script>
    </Helmet>
  );
}

/**
 * Page-level structured data for specific page types
 */
export function ToolPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `https://www.precisehr.ca${url}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.precisehr.ca/#organization',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

export default GlobalStructuredData;
