export const API_PATHS = {
  // Auth
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  VERIFY_OTP: '/api/auth/verify-otp',
  RESET_PASSWORD: '/api/auth/reset-password',
  CHANGE_PASSWORD: '/api/auth/change-password',

  // Users
  ME: '/api/users/me',
  USERS: '/api/users',
  USER_BY_ID: (id: string) => `/api/users/${id}`,

  // Roles & Permissions
  ROLES: '/api/roles',
  PERMISSIONS: '/api/permissions',

  // Admin — Roles
  ADMIN_ROLES: '/api/admin/roles',
  ADMIN_ROLE_BY_ID: (id: string) => `/api/admin/roles/${id}`,
  ADMIN_ROLE_PERMISSIONS: (id: string) => `/api/admin/roles/${id}/permissions`,

  // Admin — Hostels
  ADMIN_HOSTELS: '/api/admin/hostels',
  ADMIN_HOSTEL_BY_ID: (id: string) => `/api/admin/hostels/${id}`,
} as const;
