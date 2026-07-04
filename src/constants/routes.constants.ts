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
} as const;
