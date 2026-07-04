import { baseApi } from './baseApi';
import { API_PATHS } from '@constants/api.constants';
import type { UserProfileType, RoleType, PermissionType } from '@types/common.types';
import type { ApiMessageResponse } from '@types/api.types';

interface ListUsersParams {
  page?: number;
  limit?: number;
  owner_id?: string;
}

interface ListUsersResponse {
  total: number;
  page: number;
  limit: number;
  users: UserProfileType[];
}

interface CreateUserBody {
  first_name: string;
  last_name: string;
  email?: string;
  mobile?: string;
  password: string;
  role_id: string;
  owner_id?: string;
  employee_id?: string;
}

interface UpdateUserBody {
  first_name?: string;
  last_name?: string;
  role_id?: string;
  status?: string;
  mobile?: string;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserProfileType, void>({
      query: () => API_PATHS.ME,
      providesTags: ['Me'],
    }),

    listUsers: builder.query<ListUsersResponse, ListUsersParams>({
      query: (params) => ({ url: API_PATHS.USERS, params }),
      providesTags: ['User'],
    }),

    getUser: builder.query<UserProfileType, string>({
      query: (id) => API_PATHS.USER_BY_ID(id),
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    createUser: builder.mutation<UserProfileType, CreateUserBody>({
      query: (body) => ({ url: API_PATHS.USERS, method: 'POST', body }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<UserProfileType, { id: string; body: UpdateUserBody }>({
      query: ({ id, body }) => ({ url: API_PATHS.USER_BY_ID(id), method: 'PATCH', body }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }, 'User'],
    }),

    deleteUser: builder.mutation<ApiMessageResponse, string>({
      query: (id) => ({ url: API_PATHS.USER_BY_ID(id), method: 'DELETE' }),
      invalidatesTags: ['User'],
    }),

    listRoles: builder.query<RoleType[], void>({
      query: () => API_PATHS.ROLES,
      providesTags: ['Roles'],
    }),

    listPermissions: builder.query<PermissionType[], void>({
      query: () => API_PATHS.PERMISSIONS,
      providesTags: ['Permissions'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useListUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useListRolesQuery,
  useListPermissionsQuery,
} = usersApi;
