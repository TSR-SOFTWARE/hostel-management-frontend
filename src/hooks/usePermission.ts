import { useAppSelector } from './useAppSelector';

export const usePermission = (module: string, action: string): boolean => {
  const { permissions } = useAppSelector((state) => state.permissions);
  return permissions.some((p) => p.module === module && p.action === action);
};
