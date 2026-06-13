import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';

// Code-split every route except the homepage so the initial bundle stays lean.
const AboutPage = lazy(() => import('./pages/about'));
const ServicesPage = lazy(() => import('./pages/services'));
const AIPage = lazy(() => import('./pages/ai'));
const DemosPage = lazy(() => import('./pages/ai/demos'));
const CookiePolicyPage = lazy(() => import('./pages/cookie-policy'));
const TermsOfServicePage = lazy(() => import('./pages/terms-of-service'));
const PrivacyPolicyPage = lazy(() => import('./pages/privacy-policy'));
const ResourcesPage = lazy(() => import('./pages/resources'));
const CaseStudiesPage = lazy(() => import('./pages/case-studies'));
const BlogPage = lazy(() => import('./pages/blog'));
const ContactPage = lazy(() => import('./pages/contact'));
const HRAssessmentPage = lazy(() => import('./pages/hr-assessment'));
const ROICalculatorPage = lazy(() => import('./pages/roi-calculator'));
const SalaryBenchmarkingPage = lazy(() => import('./pages/salary-benchmarking'));
const TurnoverCalculatorPage = lazy(() => import('./pages/turnover-calculator'));
const HiringCalculatorPage = lazy(() => import('./pages/hiring-calculator'));
const JDGeneratorPage = lazy(() => import('./pages/jd-generator'));
const ComplianceCheckerPage = lazy(() => import('./pages/compliance-checker'));
const ComplianceUpdatesPage = lazy(() => import('./pages/compliance-updates'));
const MinimumWagePage = lazy(() => import('./pages/minimum-wage'));
const StatutoryHolidaysPage = lazy(() => import('./pages/statutory-holidays'));
const NetPayCalculatorPage = lazy(() => import('./pages/net-pay-calculator'));
const JeffreyFurtadoPage = lazy(() => import('./pages/about/jeffrey-furtado'));
const DavidSucklingPage = lazy(() => import('./pages/about/david-suckling'));
const BlogPostPage = lazy(() => import('./pages/blog/[slug]'));

// Lazy load components for code splitting (except HomePage for instant loading)
const isDevelopment = import.meta.env.MODE === 'development';
const NotFoundPage = isDevelopment ? lazy(() => import('../dev-tools/src/PageNotFound')) : lazy(() => import('./pages/_404'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/ai',
    element: <AIPage />,
  },
  {
    path: '/cookie-policy',
    element: <CookiePolicyPage />,
  },
  {
    path: '/terms-of-service',
    element: <TermsOfServicePage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage />,
  },
  {
    path: '/resources',
    element: <ResourcesPage />,
  },
  {
    path: '/case-studies',
    element: <CaseStudiesPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPostPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/hr-assessment',
    element: <HRAssessmentPage />,
  },
  {
    path: '/roi-calculator',
    element: <ROICalculatorPage />,
  },
  {
    path: '/salary-benchmarking',
    element: <SalaryBenchmarkingPage />,
  },
  {
    path: '/turnover-calculator',
    element: <TurnoverCalculatorPage />,
  },
  {
    path: '/hiring-calculator',
    element: <HiringCalculatorPage />,
  },
  {
    path: '/jd-generator',
    element: <JDGeneratorPage />,
  },
  {
    path: '/compliance-checker',
    element: <ComplianceCheckerPage />,
  },
  {
    path: '/compliance-updates',
    element: <ComplianceUpdatesPage />,
  },
  {
    path: '/minimum-wage',
    element: <MinimumWagePage />,
  },
  {
    path: '/statutory-holidays',
    element: <StatutoryHolidaysPage />,
  },
  {
    path: '/net-pay-calculator',
    element: <NetPayCalculatorPage />,
  },
  {
    path: '/about/jeffrey-furtado',
    element: <JeffreyFurtadoPage />,
  },
  {
    path: '/about/david-suckling',
    element: <DavidSucklingPage />,
  },
  {
    path: '/ai/demos',
    element: <DemosPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/services' | '/ai' | '/ai/demos' | '/contact' | '/blog' | '/blog/:slug' | '/case-studies' | '/resources' | '/hr-assessment' | '/roi-calculator' | '/salary-benchmarking' | '/turnover-calculator' | '/hiring-calculator' | '/jd-generator' | '/compliance-checker' | '/compliance-updates' | '/minimum-wage' | '/statutory-holidays' | '/net-pay-calculator' | '/about/jeffrey-furtado' | '/about/david-suckling' | '/privacy-policy' | '/terms-of-service' | '/cookie-policy';

export type Params = Record<string, string | undefined>;
