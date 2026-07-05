import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { AuthGuard } from '@guards/AuthGuard';
import { GuestGuard } from '@guards/GuestGuard';
import { PermissionGuard } from '@guards/PermissionGuard';
import { AppLoader } from '@components/AppLoader';
import AuthLayout from '@layouts/AuthLayout';
import DashboardLayout from '@layouts/DashboardLayout';
import {
  LoginPage, ForgotPasswordPage, VerifyOtpPage, ResetPasswordPage, ChangePasswordPage,
  DashboardPage,
  UsersListPage, CreateUserPage, UserDetailPage,
  RolesPage, RoleDetailPage,
  HostelsPage, HostelDetailPage,
  ProfilePage,
  NotFoundPage,
} from './lazyRoutes';

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<AppLoader fullPage />}>{children}</Suspense>
);

const AccessDenied = () => <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;

export const AppRouter = () => (
  <Routes>
    {/* Public routes */}
    <Route element={<GuestGuard><AuthLayout /></GuestGuard>}>
      <Route path={ROUTE_PATHS.LOGIN} element={<Lazy><LoginPage /></Lazy>} />
      <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<Lazy><ForgotPasswordPage /></Lazy>} />
      <Route path={ROUTE_PATHS.VERIFY_OTP} element={<Lazy><VerifyOtpPage /></Lazy>} />
      <Route path={ROUTE_PATHS.RESET_PASSWORD} element={<Lazy><ResetPasswordPage /></Lazy>} />
    </Route>

    {/* Protected routes */}
    <Route element={<AuthGuard><DashboardLayout /></AuthGuard>}>
      <Route index element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
      <Route path={ROUTE_PATHS.DASHBOARD} element={<Lazy><DashboardPage /></Lazy>} />

      {/* Users */}
      <Route path={ROUTE_PATHS.USERS} element={<PermissionGuard module="User" action="Read" fallback={<AccessDenied />}><Lazy><UsersListPage /></Lazy></PermissionGuard>} />
      <Route path={ROUTE_PATHS.USERS_NEW} element={<PermissionGuard module="User" action="Create" fallback={<AccessDenied />}><Lazy><CreateUserPage /></Lazy></PermissionGuard>} />
      <Route path="/users/:id" element={<PermissionGuard module="User" action="Read" fallback={<AccessDenied />}><Lazy><UserDetailPage /></Lazy></PermissionGuard>} />

      {/* Admin — Roles */}
      <Route path={ROUTE_PATHS.ROLES} element={<PermissionGuard module="Role" action="Read" fallback={<AccessDenied />}><Lazy><RolesPage /></Lazy></PermissionGuard>} />
      <Route path={ROUTE_PATHS.ROLES_NEW} element={<PermissionGuard module="Role" action="Read" fallback={<AccessDenied />}><Lazy><RolesPage /></Lazy></PermissionGuard>} />
      <Route path="/admin/roles/:id" element={<PermissionGuard module="Role" action="Read" fallback={<AccessDenied />}><Lazy><RoleDetailPage /></Lazy></PermissionGuard>} />

      {/* Admin — Hostels */}
      <Route path={ROUTE_PATHS.HOSTELS} element={<PermissionGuard module="Hostel" action="Read" fallback={<AccessDenied />}><Lazy><HostelsPage /></Lazy></PermissionGuard>} />
      <Route path={ROUTE_PATHS.HOSTELS_NEW} element={<PermissionGuard module="Hostel" action="Read" fallback={<AccessDenied />}><Lazy><HostelsPage /></Lazy></PermissionGuard>} />
      <Route path="/admin/hostels/:id" element={<PermissionGuard module="Hostel" action="Read" fallback={<AccessDenied />}><Lazy><HostelDetailPage /></Lazy></PermissionGuard>} />

      {/* Profile */}
      <Route path={ROUTE_PATHS.PROFILE} element={<Lazy><ProfilePage /></Lazy>} />
      <Route path={ROUTE_PATHS.CHANGE_PASSWORD} element={<Lazy><ChangePasswordPage /></Lazy>} />
    </Route>

    {/* 404 */}
    <Route path="*" element={<Lazy><NotFoundPage /></Lazy>} />
  </Routes>
);
