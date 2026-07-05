import { baseApi } from './baseApi';
import { API_PATHS } from '@constants/api.constants';
import type { RoleType, HostelType } from '@appTypes/common.types';
import type { ApiMessageResponse } from '@appTypes/api.types';

interface CreateRoleBody { role_name: string; description?: string }
interface UpdateRoleBody { role_name?: string; description?: string }
interface ListHostelsResponse { total: number; page: number; limit: number; hostels: HostelType[] }
interface CreateHostelBody {
  name: string; address: string; city: string; state: string;
  pincode: string; phone?: string; email?: string; total_rooms: number; owner_id?: string;
}
interface UpdateHostelBody {
  name?: string; address?: string; city?: string; state?: string;
  pincode?: string; phone?: string; email?: string; total_rooms?: number; is_active?: boolean;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Roles
    createRole: builder.mutation<RoleType, CreateRoleBody>({
      query: (body) => ({ url: API_PATHS.ADMIN_ROLES, method: 'POST', body }),
      invalidatesTags: ['Roles'],
    }),
    updateRole: builder.mutation<RoleType, { id: string; body: UpdateRoleBody }>({
      query: ({ id, body }) => ({ url: API_PATHS.ADMIN_ROLE_BY_ID(id), method: 'PATCH', body }),
      invalidatesTags: ['Roles'],
    }),
    deleteRole: builder.mutation<ApiMessageResponse, string>({
      query: (id) => ({ url: API_PATHS.ADMIN_ROLE_BY_ID(id), method: 'DELETE' }),
      invalidatesTags: ['Roles'],
    }),

    // Role Permissions
    getRolePermissions: builder.query<{ role_id: string; permission_ids: string[] }, string>({
      query: (id) => API_PATHS.ADMIN_ROLE_PERMISSIONS(id),
      providesTags: (_r, _e, id) => [{ type: 'Roles', id }],
    }),
    setRolePermissions: builder.mutation<ApiMessageResponse, { id: string; permission_ids: string[] }>({
      query: ({ id, permission_ids }) => ({
        url: API_PATHS.ADMIN_ROLE_PERMISSIONS(id),
        method: 'PUT',
        body: { permission_ids },
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Roles', id }],
    }),

    // Hostels
    listHostels: builder.query<ListHostelsResponse, { page?: number; limit?: number; owner_id?: string }>({
      query: (params) => ({ url: API_PATHS.ADMIN_HOSTELS, params }),
      providesTags: ['Hostel'],
    }),
    getHostel: builder.query<HostelType, string>({
      query: (id) => API_PATHS.ADMIN_HOSTEL_BY_ID(id),
      providesTags: (_r, _e, id) => [{ type: 'Hostel', id }],
    }),
    createHostel: builder.mutation<HostelType, CreateHostelBody>({
      query: (body) => ({ url: API_PATHS.ADMIN_HOSTELS, method: 'POST', body }),
      invalidatesTags: ['Hostel'],
    }),
    updateHostel: builder.mutation<HostelType, { id: string; body: UpdateHostelBody }>({
      query: ({ id, body }) => ({ url: API_PATHS.ADMIN_HOSTEL_BY_ID(id), method: 'PATCH', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Hostel', id }, 'Hostel'],
    }),
    deleteHostel: builder.mutation<ApiMessageResponse, string>({
      query: (id) => ({ url: API_PATHS.ADMIN_HOSTEL_BY_ID(id), method: 'DELETE' }),
      invalidatesTags: ['Hostel'],
    }),
  }),
});

export const {
  useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation,
  useGetRolePermissionsQuery, useSetRolePermissionsMutation,
  useListHostelsQuery, useGetHostelQuery,
  useCreateHostelMutation, useUpdateHostelMutation, useDeleteHostelMutation,
} = adminApi;
