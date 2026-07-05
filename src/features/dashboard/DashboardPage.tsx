import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Typography, Box, Skeleton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useListUsersQuery, useListRolesQuery, useListPermissionsQuery } from '@api/usersApi';
import { useAppSelector } from '@hooks/useAppSelector';
import { AppCard } from '@components/AppCard';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppStatusBadge } from '@components/AppStatusBadge';
import { AppButton } from '@components/AppButton';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { USER_STATUS } from '@constants/app.constants';
import { formatFullName } from '@utils/string.utils';
import { formatDateTime } from '@utils/date.utils';
import type { UserStatusType } from '@appTypes/common.types';

const STATUS_COLORS: Record<UserStatusType, string> = {
  active: '#4caf50',
  inactive: '#9e9e9e',
  locked: '#f44336',
  deleted: '#e91e63',
  pending_verification: '#ff9800',
};

interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}

const StatCard = ({ label, value, icon, color, loading }: StatCardProps) => (
  <AppCard>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48, height: 48, borderRadius: 2,
          bgcolor: `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        {loading
          ? <Skeleton width={48} height={32} />
          : <Typography variant="h5" fontWeight={700}>{value ?? 0}</Typography>
        }
      </Box>
    </Stack>
  </AppCard>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAppSelector((s) => s.user);

  const { data: usersData, isLoading: usersLoading } = useListUsersQuery({ page: 1, limit: 100 });
  const { data: roles, isLoading: rolesLoading } = useListRolesQuery();
  const { data: permissions, isLoading: permsLoading } = useListPermissionsQuery();

  const statusChartData = useMemo(() => {
    if (!usersData?.users) return [];
    const counts: Partial<Record<UserStatusType, number>> = {};
    for (const u of usersData.users) {
      counts[u.status] = (counts[u.status] ?? 0) + 1;
    }
    return Object.entries(counts).map(([status, count]) => ({
      name: status.replace('_', ' '),
      value: count,
      status: status as UserStatusType,
    }));
  }, [usersData]);

  const recentUsers = useMemo(
    () => [...(usersData?.users ?? [])].sort((a, b) =>
      new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
    ).slice(0, 5),
    [usersData]
  );

  const lockedCount = usersData?.users.filter((u) => u.status === USER_STATUS.LOCKED).length;

  return (
    <Stack spacing={3}>
      <AppPageHeader
        title={`Welcome, ${user?.first_name ?? ''}!`}
        subtitle="Here's what's happening in your system."
        showBreadcrumb={false}
      />

      {/* Stat Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total Users" value={usersData?.total} icon={<PeopleIcon />} color="#1976d2" loading={usersLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Roles" value={roles?.length} icon={<AdminPanelSettingsIcon />} color="#7b1fa2" loading={rolesLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Permissions" value={permissions?.length} icon={<VerifiedUserIcon />} color="#388e3c" loading={permsLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Locked Accounts" value={lockedCount} icon={<LockIcon />} color="#d32f2f" loading={usersLoading} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 5 }}>
          <AppCard title="Users by Status" sx={{ height: '100%' }}>
            {usersLoading ? (
              <Skeleton variant="circular" width={200} height={200} sx={{ mx: 'auto', mt: 2 }} />
            ) : statusChartData.length === 0 ? (
              <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>No data</Typography>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusChartData.map((entry) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </AppCard>
        </Grid>

        {/* Recent Users */}
        <Grid size={{ xs: 12, md: 7 }}>
          <AppCard
            title="Recent Users"
            action={
              <AppButton variant="text" size="small" onClick={() => navigate(ROUTE_PATHS.USERS)}>
                View All
              </AppButton>
            }
          >
            {usersLoading ? (
              <Stack spacing={1.5}>
                {[...Array(5)].map((_, i) => <Skeleton key={i} height={40} />)}
              </Stack>
            ) : recentUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No users yet.</Typography>
            ) : (
              <Stack spacing={0}>
                {recentUsers.map((u) => (
                  <Stack
                    key={u.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    py={1.25}
                    sx={{ borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 0 } }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {formatFullName(u.first_name, u.last_name)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {u.email ?? u.mobile ?? '—'} · {formatDateTime(u.created_at)}
                      </Typography>
                    </Box>
                    <AppStatusBadge status={u.status} />
                  </Stack>
                ))}
              </Stack>
            )}
          </AppCard>
        </Grid>
      </Grid>
    </Stack>
  );
}
