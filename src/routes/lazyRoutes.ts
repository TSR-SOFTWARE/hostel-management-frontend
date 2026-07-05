import { lazy } from 'react';

// Auth pages
export const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
export const ForgotPasswordPage = lazy(() => import('@features/auth/pages/ForgotPasswordPage'));
export const VerifyOtpPage = lazy(() => import('@features/auth/pages/VerifyOtpPage'));
export const ResetPasswordPage = lazy(() => import('@features/auth/pages/ResetPasswordPage'));
export const ChangePasswordPage = lazy(() => import('@features/auth/pages/ChangePasswordPage'));

// Dashboard
export const DashboardPage = lazy(() => import('@features/dashboard/DashboardPage'));

// Users
export const UsersListPage = lazy(() => import('@features/users/pages/UsersListPage'));
export const CreateUserPage = lazy(() => import('@features/users/pages/CreateUserPage'));
export const UserDetailPage = lazy(() => import('@features/users/pages/UserDetailPage'));

// Admin — Roles
export const RolesPage = lazy(() => import('@features/admin/pages/RolesPage'));
export const RoleDetailPage = lazy(() => import('@features/admin/pages/RoleDetailPage'));

// Admin — Hostels
export const HostelsPage = lazy(() => import('@features/admin/pages/HostelsPage'));
export const HostelDetailPage = lazy(() => import('@features/admin/pages/HostelDetailPage'));

// Profile
export const ProfilePage = lazy(() => import('@features/profile/ProfilePage'));

// 404
export const NotFoundPage = lazy(() => import('@features/NotFoundPage'));
