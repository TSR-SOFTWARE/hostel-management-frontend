import { usePermission } from '@hooks/usePermission';
import type { ReactNode } from 'react';

interface Props {
  module: string;
  action: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export const PermissionGuard = ({ module, action, children, fallback = null }: Props) => {
  const hasPermission = usePermission(module, action);
  return hasPermission ? <>{children}</> : <>{fallback}</>;
};
