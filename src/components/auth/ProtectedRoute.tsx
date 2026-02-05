import type { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading, isGuest } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-display text-cc-light-teal animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return <>{fallback}</> || null;
  }

  return <>{children}</>;
}
