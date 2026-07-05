import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/useAppSelector';
import { ROUTE_PATHS } from '@constants/routes.constants';
import type { ReactNode } from 'react';

export const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAppSelector((s) => s.auth);
  // If not authenticated (regardless of initialized state), show guest pages
  if (isAuthenticated && isInitialized) return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  if (isAuthenticated && !isInitialized) return null; // briefly loading after login
  return <>{children}</>;
};
