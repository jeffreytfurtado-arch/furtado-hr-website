import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import AboutPage from './pages/about';
import ServicesPage from './pages/services';
import ClientPortalPage from './pages/client-portal';
import AuthPage from './pages/auth/AuthPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
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
import BlogPostPage from './pages/blog/[slug]';
import ProtectedRoute from './components/ProtectedRoute';
import PortalDashboard from './pages/portal/index';
import PortalEmployees from './pages/portal/employees';
import PortalDocuments from './pages/portal/documents';
import PortalTimeOff from './pages/portal/time-off';
import PortalTraining from './pages/portal/training';
import PortalReports from './pages/portal/reports';
import PortalSettings from './pages/portal/settings';
import EmployeeProfilePage from './pages/portal/employee-profile';
import PerformanceReviewsPage from './pages/portal/performance-reviews';
import ReviewDetailPage from './pages/portal/review-detail';

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
    path: '/client-portal',
    element: <ClientPortalPage />,
  },
  {
    path: '/login',
    element: <AuthPage mode="login" />,
  },
  {
    path: '/signup',
    element: <AuthPage mode="signup" />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
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
    path: '/portal',
    element: <ProtectedRoute><PortalDashboard /></ProtectedRoute>,
  },
  {
    path: '/portal/employees',
    element: <ProtectedRoute><PortalEmployees /></ProtectedRoute>,
  },
  {
    path: '/portal/documents',
    element: <ProtectedRoute><PortalDocuments /></ProtectedRoute>,
  },
  {
    path: '/portal/time-off',
    element: <ProtectedRoute><PortalTimeOff /></ProtectedRoute>,
  },
  {
    path: '/portal/training',
    element: <ProtectedRoute><PortalTraining /></ProtectedRoute>,
  },
  {
    path: '/portal/reports',
    element: <ProtectedRoute><PortalReports /></ProtectedRoute>,
  },
  {
    path: '/portal/settings',
    element: <ProtectedRoute><PortalSettings /></ProtectedRoute>,
  },
  {
    path: '/portal/employees/:employeeId',
    element: <ProtectedRoute><EmployeeProfilePage /></ProtectedRoute>,
  },
  {
    path: '/portal/performance-reviews',
    element: <ProtectedRoute><PerformanceReviewsPage /></ProtectedRoute>,
  },
  {
    path: '/portal/performance-reviews/:reviewId',
    element: <ProtectedRoute><ReviewDetailPage /></ProtectedRoute>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/services' | '/client-portal' | '/login' | '/signup' | '/portal' | '/portal/employees' | '/portal/employees/:employeeId' | '/portal/documents' | '/portal/time-off' | '/portal/training' | '/portal/reports' | '/portal/settings' | '/portal/performance-reviews' | '/portal/performance-reviews/:reviewId';

export type Params = Record<string, string | undefined>;
