import { renderToString } from 'react-dom/server';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GlobalStructuredData } from './components/StructuredData';
import Header from './layouts/parts/Header';
import Footer from './layouts/parts/Footer';
import Website from './layouts/Website';

import HomePage from './pages/index';
import AboutPage from './pages/about';
import ServicesPage from './pages/services';
import AIPage from './pages/ai';
import DemosPage from './pages/ai/demos';
import PolicyGeneratorPage from './pages/policy-generator';
import OfferLetterPage from './pages/offer-letter';
import PolicyScannerPage from './pages/policy-scanner';
import CookiePolicyPage from './pages/cookie-policy';
import TermsOfServicePage from './pages/terms-of-service';
import PrivacyPolicyPage from './pages/privacy-policy';
import ResourcesPage from './pages/resources';
import CaseStudiesPage from './pages/case-studies';
import BlogPage from './pages/blog';
import ContactPage from './pages/contact';
import HRAssessmentPage from './pages/hr-assessment';
import ROICalculatorPage from './pages/roi-calculator';
import SalaryBenchmarkingPage from './pages/salary-benchmarking';
import TurnoverCalculatorPage from './pages/turnover-calculator';
import HiringCalculatorPage from './pages/hiring-calculator';
import JDGeneratorPage from './pages/jd-generator';
import ComplianceCheckerPage from './pages/compliance-checker';
import ComplianceUpdatesPage from './pages/compliance-updates';
import MinimumWagePage from './pages/minimum-wage';
import StatutoryHolidaysPage from './pages/statutory-holidays';
import NetPayCalculatorPage from './pages/net-pay-calculator';
import JeffreyFurtadoPage from './pages/about/jeffrey-furtado';
import DavidSucklingPage from './pages/about/david-suckling';
import BlogPostPage from './pages/blog/[slug]';
import ArticlesPage from './pages/articles';
import ArticlePostPage from './pages/articles/[slug]';
import HRServicesHub from './pages/locations';
import ProvincePage from './pages/locations/[province]';
import AppPage from './pages/app';
import WelcomePage from './pages/welcome';

import { blogPosts } from './data/blog-data';
import { articles } from './data/articles-data';
import { PROVINCES_DATA } from './data/provinces';

function ServerLayout({ children }: { children: React.ReactElement }) {
  return (
    <Website>
      <GlobalStructuredData />
      <Header />
      {children}
      <Footer />
    </Website>
  );
}

const serverRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/ai', element: <AIPage /> },
  { path: '/ai/demos', element: <DemosPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/articles', element: <ArticlesPage /> },
  { path: '/articles/:slug', element: <ArticlePostPage /> },
  { path: '/resources', element: <ResourcesPage /> },
  { path: '/case-studies', element: <CaseStudiesPage /> },
  { path: '/compliance-checker', element: <ComplianceCheckerPage /> },
  { path: '/compliance-updates', element: <ComplianceUpdatesPage /> },
  { path: '/minimum-wage', element: <MinimumWagePage /> },
  { path: '/statutory-holidays', element: <StatutoryHolidaysPage /> },
  { path: '/net-pay-calculator', element: <NetPayCalculatorPage /> },
  { path: '/hr-assessment', element: <HRAssessmentPage /> },
  { path: '/roi-calculator', element: <ROICalculatorPage /> },
  { path: '/salary-benchmarking', element: <SalaryBenchmarkingPage /> },
  { path: '/turnover-calculator', element: <TurnoverCalculatorPage /> },
  { path: '/hiring-calculator', element: <HiringCalculatorPage /> },
  { path: '/jd-generator', element: <JDGeneratorPage /> },
  { path: '/policy-generator', element: <PolicyGeneratorPage /> },
  { path: '/offer-letter', element: <OfferLetterPage /> },
  { path: '/policy-scanner', element: <PolicyScannerPage /> },
  { path: '/about/jeffrey-furtado', element: <JeffreyFurtadoPage /> },
  { path: '/about/david-suckling', element: <DavidSucklingPage /> },
  { path: '/hr-services', element: <HRServicesHub /> },
  { path: '/hr-services/:province', element: <ProvincePage /> },
  { path: '/app', element: <AppPage /> },
  { path: '/welcome', element: <WelcomePage /> },
  { path: '/cookie-policy', element: <CookiePolicyPage /> },
  { path: '/terms-of-service', element: <TermsOfServicePage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
];

export function render(url: string) {
  const helmetContext: { helmet?: Record<string, { toString(): string }> } = {};
  const queryClient = new QueryClient();

  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <Suspense fallback={null}>
            <ServerLayout>
              <Outlet />
            </ServerLayout>
          </Suspense>
        ),
        children: serverRoutes,
      },
    ],
    { initialEntries: [url] },
  );

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </QueryClientProvider>
    </HelmetProvider>,
  );

  return { html, helmet: helmetContext.helmet };
}

export function getAllUrls(): string[] {
  const urls = [
    '/',
    '/about',
    '/services',
    '/ai',
    '/ai/demos',
    '/contact',
    '/blog',
    '/articles',
    '/resources',
    '/case-studies',
    '/compliance-checker',
    '/compliance-updates',
    '/minimum-wage',
    '/statutory-holidays',
    '/net-pay-calculator',
    '/hr-assessment',
    '/roi-calculator',
    '/salary-benchmarking',
    '/turnover-calculator',
    '/hiring-calculator',
    '/jd-generator',
    '/policy-generator',
    '/offer-letter',
    '/policy-scanner',
    '/about/jeffrey-furtado',
    '/about/david-suckling',
    '/hr-services',
    '/app',
    '/welcome',
    '/cookie-policy',
    '/terms-of-service',
    '/privacy-policy',
  ];

  for (const post of blogPosts) urls.push(`/blog/${post.id}`);
  for (const article of articles) urls.push(`/articles/${article.id}`);
  for (const province of PROVINCES_DATA) urls.push(`/hr-services/${province.slug}`);

  return urls;
}
