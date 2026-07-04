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
} as const;
