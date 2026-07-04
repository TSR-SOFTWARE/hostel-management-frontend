īimport { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { env } from '@config/env';
import type { RootState } from '@app/store';
import { setCredentials, clearCredentials } from '@store/authSlice';
import { clearUser } from '@store/userSlice';
import { clearRoles } from '@store/rolesSlice';
import { clearPermissions } from '@store/permissionsSlice';
import { API_PATHS } from '@constants/api.constants';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        { url: API_PATHS.REFRESH_TOKEN, method: 'POST', body: { refresh_token: refreshToken } },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setCredentials(refreshResult.data as { access_token: string; refresh_token: string; token_type: string }));
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearCredentials());
        api.dispatch(clearUser());
        api.dispatch(clearRoles());
        api.dispatch(clearPermissions());
      }
    } else {
      api.dispatch(clearCredentials());
      api.dispatch(clearUser());
      api.dispatch(clearRoles());
      api.dispatch(clearPermissions());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Roles', 'Permissions', 'Me'],
  endpoints: () => ({}),
});
