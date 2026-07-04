export const APP_NAME = 'Hostel Management System';
export const APP_VERSION = '1.0.0';

export const TOKEN_STORAGE_KEY = 'hms_auth';

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  LOCKED: 'locked',
  DELETED: 'deleted',
  PENDING_VERIFICATION: 'pending_verification',
} as const;

export const OTP_PURPOSE = {
  FORGOT_PASSWORD: 'forgot_password',
  EMAIL_VERIFICATION: 'email_verification',
  MOBILE_VERIFICATION: 'mobile_verification',
} as const;

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_COLLAPSED_WIDTH = 72;
