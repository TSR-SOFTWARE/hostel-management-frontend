import { useRole } from '@hooks/useRole';
import type { ReactNode } from 'react';

interface Props {
  role: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export const RoleGuard = ({ role, children, fallback = null }: Props) => {
  const hasRole = useRole(role);
  return hasRole ? <>{children}</> : <>{fallback}</>;
};
