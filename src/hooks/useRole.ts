import { useAppSelector } from './useAppSelector';

export const useRole = (roleName: string): boolean => {
  const { roles } = useAppSelector((state) => state.roles);
  const { user } = useAppSelector((state) => state.user);
  if (!user) return false;
  return roles.some((r) => r.id === user.role_id && r.role_name === roleName);
};
