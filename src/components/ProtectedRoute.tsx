import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@/lib/auth/auth-client';
import { Spinner } from '@/components/Spinner';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();

  // Show loading spinner while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
