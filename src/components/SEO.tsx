import { Helmet } from '@dr.pogodin/react-helmet';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}

export default function SEO({ title, description, path = '', noIndex = false }: SEOProps) {
  const siteUrl = 'https://www.precisehr.ca';
  const fullTitle = title === 'PreciseHR' ? title + ' — Intelligent HR Solutions for Canadian Businesses' : `${title} | PreciseHR`;
  const url = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PreciseHR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
