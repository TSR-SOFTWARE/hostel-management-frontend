import { useEffect, type ReactNode } from 'react';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setInitialized } from '@store/authSlice';
import { setUser } from '@store/userSlice';
import { setRoles } from '@store/rolesSlice';
import { setPermissions } from '@store/permissionsSlice';
import { useGetMeQuery, useListRolesQuery, useListPermissionsQuery } from '@api/usersApi';
import { AppLoader } from '@components/AppLoader';

export const AppInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized, accessToken } = useAppSelector((s) => s.auth);

  // Use accessToken as the cache key — changes on every new login
  const { data: me } = useGetMeQuery(undefined, { skip: !isAuthenticated });
  const { data: roles } = useListRolesQuery(undefined, { skip: !isAuthenticated });
  const { data: permissions } = useListPermissionsQuery(undefined, { skip: !isAuthenticated });

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setInitialized());
      return;
    }
    if (me) dispatch(setUser(me));
    if (roles) dispatch(setRoles(roles));
    if (permissions) dispatch(setPermissions(permissions));
    if (me && roles && permissions) dispatch(setInitialized());
  }, [isAuthenticated, accessToken, me, roles, permissions, dispatch]);

  if (!isInitialized) return <AppLoader fullPage />;
  return <>{children}</>;
};
