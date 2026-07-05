export type UserStatusType =
  | 'active'
  | 'inactive'
  | 'locked'
  | 'deleted'
  | 'pending_verification';

export type ThemeModeType = 'light' | 'dark';

export type SeverityType = 'success' | 'error' | 'warning' | 'info';

export interface PaginationType {
  page: number;
  limit: number;
  total: number;
}

export interface RoleType {
  id: string;
  role_name: string;
  description: string;
  is_system_role: boolean;
  created_at: string;
}

export interface PermissionType {
  id: string;
  module: string;
  action: string;
  description: string;
}

export interface UserProfileType {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  mobile: string | null;
  role_id: string;
  owner_id: string | null;
  employee_id: string | null;
  status: UserStatusType;
  is_email_verified: boolean;
  is_mobile_verified: boolean;
  last_login: string | null;
  created_at: string | null;
}

export interface HostelType {
  id: string;
  owner_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string | null;
  email: string | null;
  total_rooms: number;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}
