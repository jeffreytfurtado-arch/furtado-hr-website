import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import AiroErrorBoundary from '../dev-tools/src/AiroErrorBoundary';
import RootLayout from './layouts/RootLayout';
import { routes } from './routes';
import Spinner from './components/Spinner';

const SpinnerFallback = () => (
  <div className="flex justify-center py-8 h-screen items-center">
    <Spinner />
  </div>
);

// Create router with layout wrapper
const router = createBrowserRouter([
  {
    path: '/',
    element: import.meta.env.MODE === 'development' ? (
      <AiroErrorBoundary>
        <Suspense fallback={<SpinnerFallback />}>
          <RootLayout>
            <Outlet />
          </RootLayout>
        </Suspense>
      </AiroErrorBoundary>
    ) : (
      <Suspense fallback={<SpinnerFallback />}>
        <RootLayout>
          <Outlet />
        </RootLayout>
      </Suspense>
    ),
    children: routes,
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </HelmetProvider>
  );
}
