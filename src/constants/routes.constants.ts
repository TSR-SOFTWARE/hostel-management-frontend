export const ROUTE_PATHS = {
  // Public
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password',

  // Protected
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/change-password',

  // Users
  USERS: '/users',
  USERS_NEW: '/users/new',
  USER_DETAIL: (id: string) => `/users/${id}`,

  // Admin — Roles
  ROLES: '/admin/roles',
  ROLES_NEW: '/admin/roles/new',
  ROLE_DETAIL: (id: string) => `/admin/roles/${id}`,

  // Admin — Hostels
  HOSTELS: '/admin/hostels',
  HOSTELS_NEW: '/admin/hostels/new',
  HOSTEL_DETAIL: (id: string) => `/admin/hostels/${id}`,
} as const;
