import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/useAppSelector';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { AppLoader } from '@components/AppLoader';
import type { ReactNode } from 'react';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (!isInitialized) return <AppLoader fullPage />;
  if (!isAuthenticated) return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
  return <>{children}</>;
};
