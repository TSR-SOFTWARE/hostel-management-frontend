# Hostel Management System — Frontend Architecture

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Folder Structure](#3-folder-structure)
4. [Frontend Architecture Diagram](#4-frontend-architecture-diagram)
5. [Routing Architecture](#5-routing-architecture)
6. [Redux & RTK Query Architecture](#6-redux--rtk-query-architecture)
7. [Context API Architecture](#7-context-api-architecture)
8. [Theme Architecture](#8-theme-architecture)
9. [Authentication Flow](#9-authentication-flow)
10. [API Integration Strategy](#10-api-integration-strategy)
11. [Reusable Component Catalog](#11-reusable-component-catalog)
12. [Feature Module Template](#12-feature-module-template)
13. [Coding Standards](#13-coding-standards)
14. [Naming Conventions](#14-naming-conventions)
15. [Scalability Considerations](#15-scalability-considerations)
16. [Third-Party Libraries](#16-third-party-libraries)
17. [Development Roadmap](#17-development-roadmap)

---

## 1. Project Overview

Enterprise-grade React frontend for a multi-tenant Hostel Management SaaS platform.

Designed to support 150+ screens across 25+ modules, maintained by multiple developers over many years.

Backend: FastAPI + MongoDB (already built)
Frontend: React 19 + TypeScript + Material UI v7

---

## 2. Technology Stack

| Category         | Library                        | Version  | Purpose                              |
|------------------|--------------------------------|----------|--------------------------------------|
| Core             | React                          | 19       | UI framework                         |
| Language         | TypeScript                     | 5.x      | Type safety (strict mode)            |
| Build            | Vite                           | 5.x      | Fast dev server and bundler          |
| UI               | Material UI                    | v7       | Component library                    |
| Icons            | Material Icons                 | latest   | Icon set                             |
| Routing          | React Router                   | v7       | Client-side routing                  |
| Global State     | Redux Toolkit                  | latest   | Auth, user, roles, permissions       |
| Server State     | RTK Query                      | latest   | API calls, caching, invalidation     |
| UI State         | Context API                    | built-in | Theme, sidebar, snackbar, dialogs    |
| Forms            | React Hook Form + Zod          | latest   | Form state and validation            |
| Dates            | dayjs                          | latest   | Date formatting and manipulation     |
| Notifications    | Notistack                      | latest   | Toast notifications                  |
| Tables           | MUI DataGrid                   | v7       | Data tables with sorting/filtering   |
| Charts (future)  | Recharts                       | latest   | Analytics and reporting              |
| Linting          | ESLint + Prettier              | latest   | Code quality                         |

---

## 3. Folder Structure

```
hostel-management-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/                          # App entry, store, router setup
│   │   ├── App.tsx
│   │   ├── store.ts                  # Redux store configuration
│   │   └── rootReducer.ts
│   │
│   ├── api/                          # RTK Query — centralized API layer
│   │   ├── baseApi.ts                # createApi with baseQuery + token refresh
│   │   ├── authApi.ts                # Auth endpoints
│   │   ├── usersApi.ts               # Users endpoints
│   │   └── index.ts                  # Barrel export
│   │
│   ├── features/                     # Feature-first modules
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── ForgotPasswordPage.tsx
│   │   │   │   ├── VerifyOtpPage.tsx
│   │   │   │   └── ResetPasswordPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   ├── OtpForm.tsx
│   │   │   │   └── ResetPasswordForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── schemas/
│   │   │   │   └── authSchemas.ts    # Zod schemas
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── users/
│   │   │   ├── pages/
│   │   │   │   ├── UsersListPage.tsx
│   │   │   │   ├── UserDetailPage.tsx
│   │   │   │   └── CreateUserPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── UserTable.tsx
│   │   │   │   ├── UserForm.tsx
│   │   │   │   └── UserStatusBadge.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useUsers.ts
│   │   │   ├── schemas/
│   │   │   │   └── userSchemas.ts
│   │   │   ├── types/
│   │   │   │   └── user.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/                # Future
│   │   ├── hostels/                  # Future
│   │   ├── students/                 # Future
│   │   ├── employees/                # Future
│   │   ├── expenses/                 # Future
│   │   └── reports/                  # Future
│   │
│   ├── layouts/                      # Page layout wrappers
│   │   ├── AuthLayout.tsx            # Centered card for login/forgot etc.
│   │   ├── DashboardLayout.tsx       # Sidebar + topbar + content
│   │   └── components/
│   │       ├── Sidebar.tsx
│   │       ├── Topbar.tsx
│   │       ├── SidebarNav.tsx
│   │       └── UserMenu.tsx
│   │
│   ├── routes/                       # Route definitions
│   │   ├── index.tsx                 # Root router
│   │   ├── publicRoutes.tsx          # Login, forgot password etc.
│   │   ├── protectedRoutes.tsx       # All authenticated routes
│   │   └── lazyRoutes.ts             # Lazy-loaded page imports
│   │
│   ├── store/                        # Redux slices
│   │   ├── authSlice.ts              # tokens, isAuthenticated
│   │   ├── userSlice.ts              # logged-in user profile
│   │   ├── rolesSlice.ts             # roles list
│   │   └── permissionsSlice.ts       # permissions list
│   │
│   ├── hooks/                        # Shared custom hooks
│   │   ├── useAppDispatch.ts
│   │   ├── useAppSelector.ts
│   │   ├── usePermission.ts          # hasPermission(module, action)
│   │   ├── useRole.ts                # hasRole(roleName)
│   │   └── useConfirm.ts
│   │
│   ├── contexts/                     # Context API — UI state only
│   │   ├── ThemeContext.tsx           # light/dark toggle
│   │   ├── SidebarContext.tsx         # open/collapsed
│   │   ├── SnackbarContext.tsx        # global toast
│   │   └── ConfirmDialogContext.tsx   # global confirm dialog
│   │
│   ├── components/                   # Shared reusable components
│   │   ├── AppButton.tsx
│   │   ├── AppTextField.tsx
│   │   ├── AppPasswordField.tsx
│   │   ├── AppSelect.tsx
│   │   ├── AppAutocomplete.tsx
│   │   ├── AppCard.tsx
│   │   ├── AppTable.tsx
│   │   ├── AppLoader.tsx
│   │   ├── AppDialog.tsx
│   │   ├── AppDrawer.tsx
│   │   ├── AppBreadcrumb.tsx
│   │   ├── AppPageHeader.tsx
│   │   ├── AppAvatar.tsx
│   │   ├── AppChip.tsx
│   │   ├── AppStatusBadge.tsx
│   │   ├── AppSearch.tsx
│   │   ├── AppPagination.tsx
│   │   ├── AppSnackbar.tsx
│   │   ├── AppConfirmDialog.tsx
│   │   ├── AppEmptyState.tsx
│   │   ├── AppErrorState.tsx
│   │   └── index.ts                  # Barrel export
│   │
│   ├── guards/                       # Route guards
│   │   ├── AuthGuard.tsx             # Redirect to login if not authenticated
│   │   ├── GuestGuard.tsx            # Redirect to dashboard if authenticated
│   │   ├── PermissionGuard.tsx       # Render only if has permission
│   │   └── RoleGuard.tsx             # Render only if has role
│   │
│   ├── theme/                        # MUI theme
│   │   ├── index.ts                  # getTheme(mode) factory
│   │   ├── palette.ts                # Light and dark palettes
│   │   ├── typography.ts             # Font settings
│   │   ├── shadows.ts                # Custom shadows
│   │   ├── shape.ts                  # Border radius
│   │   └── overrides/                # MUI component overrides
│   │       ├── MuiButton.ts
│   │       ├── MuiCard.ts
│   │       ├── MuiTextField.ts
│   │       └── MuiDataGrid.ts
│   │
│   ├── types/                        # Global TypeScript types
│   │   ├── api.types.ts              # Generic API response shapes
│   │   ├── auth.types.ts             # Token, session types
│   │   └── common.types.ts           # Shared enums, pagination etc.
│   │
│   ├── constants/                    # App-wide constants
│   │   ├── routes.constants.ts       # Route path strings
│   │   ├── api.constants.ts          # API base URL
│   │   └── app.constants.ts          # App name, version etc.
│   │
│   ├── utils/                        # Pure utility functions
│   │   ├── token.utils.ts            # decode JWT, check expiry
│   │   ├── date.utils.ts             # dayjs helpers
│   │   ├── string.utils.ts           # capitalize, truncate etc.
│   │   └── error.utils.ts            # parse API error messages
│   │
│   ├── config/                       # Runtime config
│   │   └── env.ts                    # import.meta.env wrappers
│   │
│   └── main.tsx                      # Vite entry point
│
├── .env.local                        # VITE_API_BASE_URL etc.
├── .env.production
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── package.json
```

---

## 4. Frontend Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Application                        │
│                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │   Contexts  │  │  Redux Store │  │     RTK Query Cache   │  │
│  │  (UI State) │  │ (App State)  │  │    (Server State)     │  │
│  │             │  │              │  │                       │  │
│  │ Theme       │  │ authSlice    │  │ authApi               │  │
│  │ Sidebar     │  │ userSlice    │  │ usersApi              │  │
│  │ Snackbar    │  │ rolesSlice   │  │ [future feature APIs] │  │
│  │ Confirm     │  │ permsSlice   │  │                       │  │
│  └─────────────┘  └──────────────┘  └───────────┬───────────┘  │
│                                                  │              │
│  ┌───────────────────────────────────────────────▼───────────┐  │
│  │                      baseApi (RTK Query)                  │  │
│  │         baseQuery + prepareHeaders + token refresh        │  │
│  └───────────────────────────────────────────────┬───────────┘  │
│                                                  │              │
└──────────────────────────────────────────────────┼─────────────┘
                                                   │ HTTP
                                    ┌──────────────▼──────────────┐
                                    │     FastAPI Backend         │
                                    │   /api/auth/*               │
                                    │   /api/users/*              │
                                    │   /api/roles                │
                                    │   /api/permissions          │
                                    └─────────────────────────────┘
```

---

## 5. Routing Architecture

```
/                           → redirect to /dashboard (if auth) or /login
│
├── /login                  → LoginPage          [GuestGuard]
├── /forgot-password        → ForgotPasswordPage [GuestGuard]
├── /verify-otp             → VerifyOtpPage      [GuestGuard]
├── /reset-password         → ResetPasswordPage  [GuestGuard]
│
└── /                       → DashboardLayout    [AuthGuard]
    ├── /dashboard          → DashboardPage
    ├── /users              → UsersListPage      [PermissionGuard: User.Read]
    │   ├── /users/new      → CreateUserPage     [PermissionGuard: User.Create]
    │   └── /users/:id      → UserDetailPage     [PermissionGuard: User.Read]
    ├── /profile            → ProfilePage
    ├── /change-password    → ChangePasswordPage
    │
    │   ── Future Modules ──
    ├── /hostels            → HostelsListPage
    ├── /students           → StudentsListPage
    ├── /employees          → EmployeesListPage
    ├── /expenses           → ExpensesListPage
    └── /reports            → ReportsPage
```

All routes under DashboardLayout are lazy-loaded via `React.lazy()`.

Breadcrumbs are generated automatically from the route path.

---

## 6. Redux & RTK Query Architecture

### Redux Slices

```
authSlice
  state: { accessToken, refreshToken, isAuthenticated, isInitialized }
  actions: setCredentials, clearCredentials

userSlice
  state: { user: UserProfile | null, isLoading }
  actions: setUser, clearUser

rolesSlice
  state: { roles: Role[] }
  actions: setRoles

permissionsSlice
  state: { permissions: Permission[] }
  actions: setPermissions
```

### RTK Query APIs

```
baseApi
  └── baseQuery with:
        - Authorization: Bearer <accessToken> header
        - 401 handler → attempt token refresh → retry original request
        - 403 handler → dispatch clearCredentials → redirect to /login

authApi (injected into baseApi)
  └── login, logout, refreshToken, forgotPassword, verifyOtp,
      resetPassword, changePassword

usersApi (injected into baseApi)
  └── getMe, listUsers, getUser, createUser, updateUser, deleteUser,
      listRoles, listPermissions
```

### Token Refresh Flow

```
Request → 401 response
  → call POST /api/auth/refresh-token with stored refresh_token
  → success → update authSlice with new tokens → retry original request
  → failure → clearCredentials → navigate to /login
```

---

## 7. Context API Architecture

```
ThemeContext
  state: mode ('light' | 'dark')
  actions: toggleTheme()
  persisted in: localStorage

SidebarContext
  state: isOpen (bool), isCollapsed (bool)
  actions: toggleSidebar(), collapseSidebar()

SnackbarContext
  state: queue of { message, severity, id }
  actions: showSuccess(), showError(), showWarning(), showInfo()
  rendered by: AppSnackbar (Notistack provider)

ConfirmDialogContext
  state: { open, title, message, onConfirm }
  actions: confirm({ title, message }) → returns Promise<boolean>
  rendered by: AppConfirmDialog
```

None of these duplicate Redux state. They are purely UI concerns.

---

## 8. Theme Architecture

```
theme/
  palette.ts      → primary, secondary, error, warning, success, grey
  typography.ts   → Inter font, scale: h1-h6, body1, body2, caption
  shape.ts        → borderRadius: 8
  shadows.ts      → custom elevation shadows
  overrides/      → per-component MUI overrides

getTheme(mode: 'light' | 'dark') → MUI Theme object
```

### Color Palette

```
Primary:    #1976D2  (Professional blue)
Secondary:  #9C27B0
Success:    #2E7D32
Warning:    #ED6C02
Error:      #D32F2F
Background (light): #F5F7FA
Background (dark):  #0A0E1A
Surface (light):    #FFFFFF
Surface (dark):     #111827
```

---

## 9. Authentication Flow

```
App loads
  → read accessToken from Redux (persisted via redux-persist)
  → if token exists and not expired → initialize user session
      → GET /api/users/me → populate userSlice
      → GET /api/roles    → populate rolesSlice
      → GET /api/permissions → populate permissionsSlice
      → set isInitialized = true → render app
  → if token missing or expired
      → attempt refresh with stored refreshToken
      → success → repeat above
      → failure → redirect to /login

Login
  → POST /api/auth/login
  → store accessToken + refreshToken in authSlice (redux-persist)
  → GET /api/users/me → populate userSlice
  → navigate to /dashboard

Logout
  → POST /api/auth/logout (send refreshToken)
  → dispatch clearCredentials
  → dispatch clearUser
  → navigate to /login

Session Timeout
  → access token expires (30 min)
  → next API call returns 401
  → baseQuery intercepts → calls refresh-token
  → if refresh succeeds → retry
  → if refresh fails → auto logout
```

---

## 10. API Integration Strategy

### Rules

- Components NEVER call fetch() or axios directly
- All API calls go through RTK Query hooks
- One `baseApi.ts` — all feature APIs inject into it
- Error messages extracted centrally in `error.utils.ts`
- Loading and error states come from RTK Query hooks

### Request Shape (matches backend exactly)

```typescript
// Login
POST /api/auth/login
{ identifier: string, password: string }

// Refresh
POST /api/auth/refresh-token
{ refresh_token: string }

// Forgot Password
POST /api/auth/forgot-password
{ identifier: string }

// Verify OTP
POST /api/auth/verify-otp
{ identifier: string, otp: string, purpose: string }

// Reset Password
POST /api/auth/reset-password
{ identifier: string, otp: string, new_password: string, confirm_password: string }

// Change Password
POST /api/auth/change-password
{ old_password: string, new_password: string, confirm_password: string }

// Create User
POST /api/users
{ first_name, last_name, email?, mobile?, password, role_id, owner_id?, employee_id? }

// List Users
GET /api/users?page=1&limit=50&owner_id=

// Update User
PATCH /api/users/:id
{ first_name?, last_name?, role_id?, status?, mobile? }

// Delete User
DELETE /api/users/:id
```

### Response Shape

```typescript
// Token response
{ access_token: string, refresh_token: string, token_type: string }

// User detail
{
  id, first_name, last_name, email, mobile,
  role_id, owner_id, employee_id, status,
  is_email_verified, is_mobile_verified,
  last_login, created_at
}

// List users
{ total: number, page: number, limit: number, users: UserDetail[] }

// Message
{ message: string }

// Validation error (422)
{ detail: [{ loc: string[], msg: string, type: string }] }
```

---

## 11. Reusable Component Catalog

| Component          | Props                                      | Purpose                          |
|--------------------|--------------------------------------------|----------------------------------|
| AppButton          | variant, loading, icon, onClick            | All buttons                      |
| AppTextField       | RHF-compatible, label, error               | All text inputs                  |
| AppPasswordField   | show/hide toggle                           | Password inputs                  |
| AppSelect          | options, label, RHF-compatible             | Dropdowns                        |
| AppAutocomplete    | options, async search                      | Searchable selects               |
| AppCard            | title, actions, padding                    | Content cards                    |
| AppTable           | MUI DataGrid wrapper, columns, rows        | All data tables                  |
| AppLoader          | fullPage, inline, size                     | Loading states                   |
| AppDialog          | title, content, actions, open              | Modal dialogs                    |
| AppDrawer          | anchor, open, onClose                      | Side drawers                     |
| AppBreadcrumb      | auto-generated from route                  | Page breadcrumbs                 |
| AppPageHeader      | title, subtitle, actions, breadcrumb       | Page top section                 |
| AppAvatar          | name, src, size                            | User avatars                     |
| AppChip            | label, color, variant                      | Tags and labels                  |
| AppStatusBadge     | status (active/inactive/locked/deleted)    | User/record status               |
| AppSearch          | onSearch, placeholder, debounce            | Search inputs                    |
| AppPagination      | total, page, limit, onChange               | Table pagination                 |
| AppSnackbar        | via SnackbarContext                        | Toast notifications              |
| AppConfirmDialog   | via ConfirmDialogContext                   | Confirm before delete            |
| AppEmptyState      | title, description, action                 | Empty list states                |
| AppErrorState      | error, onRetry                             | Error states                     |

---

## 12. Feature Module Template

Every future module follows this exact structure:

```
features/[module-name]/
  pages/
    [Module]ListPage.tsx      → table with search, pagination, actions
    [Module]DetailPage.tsx    → view/edit single record
    Create[Module]Page.tsx    → create form
  components/
    [Module]Table.tsx         → DataGrid columns definition
    [Module]Form.tsx          → RHF + Zod form
    [Module]StatusBadge.tsx   → status display
  hooks/
    use[Module].ts            → business logic, derived state
  schemas/
    [module]Schemas.ts        → Zod validation schemas
  types/
    [module].types.ts         → TypeScript interfaces
  constants/
    [module].constants.ts     → status options, column defs
  index.ts                    → barrel export
```

The API for the module is defined in `src/api/[module]Api.ts` and injected into `baseApi`.

---

## 13. Coding Standards

- TypeScript strict mode — no `any`, no `as unknown`
- All components are functional with explicit return types
- No inline styles — use MUI `sx` prop or `styled()`
- No magic strings — use constants files
- All API types match backend response shapes exactly
- Zod schemas are the single source of truth for form validation
- RTK Query hooks are the only way to fetch data
- Redux is the only global state — no prop drilling beyond 2 levels
- Every component file has a single responsibility
- Max file length: 200 lines — split if longer
- All exports are named exports — no default exports except pages

---

## 14. Naming Conventions

| Item                  | Convention          | Example                        |
|-----------------------|---------------------|--------------------------------|
| Components            | PascalCase          | `UserTable.tsx`                |
| Hooks                 | camelCase + use     | `useUsers.ts`                  |
| Slices                | camelCase + Slice   | `authSlice.ts`                 |
| API files             | camelCase + Api     | `usersApi.ts`                  |
| Types/Interfaces      | PascalCase + Type   | `UserDetailType`               |
| Zod schemas           | camelCase + Schema  | `loginSchema`                  |
| Constants             | SCREAMING_SNAKE     | `ROUTE_PATHS.USERS`            |
| Context               | PascalCase + Context| `ThemeContext`                 |
| CSS classes (if any)  | kebab-case          | `page-header`                  |
| Env variables         | VITE_ prefix        | `VITE_API_BASE_URL`            |

---

## 15. Scalability Considerations

- Feature-first folder structure — adding a new module never touches existing code
- RTK Query cache invalidation tags — `Users`, `Roles`, `Permissions` etc.
- Redux slices are independent — no cross-slice dependencies
- Theme is centralized — all 150+ screens inherit it automatically
- Lazy loading on every route — bundle stays small as modules grow
- Permission guard is a reusable component — wrap any element or route
- Barrel exports on every feature — import paths stay clean
- Absolute imports via `tsconfig paths` — no `../../../` chains
- `redux-persist` for auth tokens — survives page refresh

---

## 16. Third-Party Libraries

| Library              | Purpose                                    |
|----------------------|--------------------------------------------|
| redux-persist        | Persist auth tokens across page refreshes  |
| jwt-decode           | Decode JWT to read expiry without backend  |
| react-hook-form      | Performant form state management           |
| zod                  | Schema-based validation                    |
| notistack            | Stacked toast notifications                |
| dayjs                | Lightweight date formatting                |
| @mui/x-data-grid     | Enterprise data tables                     |
| recharts             | Charts (future modules)                    |

---

## 17. Development Roadmap

### Phase 1 — Foundation (Current)
- [ ] Project scaffold (Vite + React 19 + TS strict)
- [ ] MUI v7 theme (light + dark)
- [ ] Redux store + redux-persist
- [ ] RTK Query baseApi with token refresh
- [ ] Context providers (Theme, Sidebar, Snackbar, Confirm)
- [ ] Reusable component library (all 20 components)
- [ ] Route structure with guards
- [ ] AuthLayout + DashboardLayout

### Phase 2 — Authentication Module
- [ ] Login page
- [ ] Forgot password page
- [ ] Verify OTP page
- [ ] Reset password page
- [ ] Change password page
- [ ] Session timeout handling
- [ ] Auto logout

### Phase 3 — User Management Module
- [ ] Users list page (DataGrid, search, pagination)
- [ ] Create user page
- [ ] User detail / edit page
- [ ] Role assignment
- [ ] Status management (activate/deactivate/lock)
- [ ] Delete with confirm dialog

### Phase 4 — Dashboard
- [ ] Summary cards
- [ ] Recent activity
- [ ] Quick actions

### Phase 5+ — Business Modules (one at a time)
- Hostels → Buildings → Floors → Rooms → Beds
- Students → Admissions
- Employees → Attendance
- Kitchen → Meals → Inventory
- Expenses → Income → P&L
- Reports → Audit Logs
- Settings → Notifications

---

## Implementation Start

Architecture is now defined. Implementation begins one feature at a time in this order:

1. Project scaffold + Vite config + tsconfig paths
2. Theme
3. Redux store + slices
4. RTK Query baseApi + authApi + usersApi
5. Context providers
6. Reusable components
7. Layouts
8. Route structure + guards
9. Auth pages (Login → Forgot → OTP → Reset)
10. User management pages
