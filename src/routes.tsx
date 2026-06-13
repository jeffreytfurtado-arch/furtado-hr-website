import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import AboutPage from './pages/about';
import ServicesPage from './pages/services';
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
import BlogPostPage from './pages/blog/[slug]';

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
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/services' | '/contact' | '/blog' | '/blog/:slug' | '/case-studies' | '/resources' | '/hr-assessment' | '/roi-calculator' | '/salary-benchmarking' | '/turnover-calculator' | '/hiring-calculator' | '/jd-generator' | '/compliance-checker' | '/compliance-updates' | '/minimum-wage' | '/statutory-holidays' | '/net-pay-calculator' | '/privacy-policy' | '/terms-of-service' | '/cookie-policy';

export type Params = Record<string, string | undefined>;
