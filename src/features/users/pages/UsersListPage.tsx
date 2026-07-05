import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Tooltip, IconButton } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useListUsersQuery, useDeleteUserMutation } from '@api/usersApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { useConfirm } from '@hooks/useConfirm';
import { AppTable } from '@components/AppTable';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppButton } from '@components/AppButton';
import { AppSearch } from '@components/AppSearch';
import { AppStatusBadge } from '@components/AppStatusBadge';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { USER_STATUS } from '@constants/app.constants';
import type { UserProfileType, UserStatusType } from '@appTypes/common.types';
import { getErrorMessage } from '@utils/error.utils';

const PAGE_SIZE = 10;

export default function UsersListPage() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { showSuccess, showError } = useSnackbarContext();

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const { data, isFetching } = useListUsersQuery({ page: page + 1, limit: PAGE_SIZE });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = useCallback(async (user: UserProfileType) => {
    const ok = await confirm({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.first_name} ${user.last_name}? This cannot be undone.`,
      confirmLabel: 'Delete',
      confirmColor: 'error',
    });
    if (!ok) return;
    try {
      await deleteUser(user.id).unwrap();
      showSuccess('User deleted successfully');
    } catch (err) {
      showError(getErrorMessage(err));
    }
  }, [confirm, deleteUser, showSuccess, showError]);

  const filteredRows = (data?.users ?? []).filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.first_name.toLowerCase().includes(q) ||
      u.last_name.toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q) ||
      (u.mobile ?? '').toLowerCase().includes(q)
    );
  });

  const columns: GridColDef<UserProfileType>[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 160,
      valueGetter: (_value, row) => `${row.first_name} ${row.last_name}`,
    },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 140 },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: ({ value }) =>
        Object.values(USER_STATUS).includes(value as UserStatusType)
          ? <AppStatusBadge status={value as UserStatusType} />
          : null,
    },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(ROUTE_PATHS.USER_DETAIL(row.id))}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => handleDelete(row)} disabled={isDeleting}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <AppPageHeader
        title="Users"
        subtitle="Manage system users and their roles."
        actions={
          <AppButton variant="contained" icon={<AddIcon />} onClick={() => navigate(ROUTE_PATHS.USERS_NEW)}>
            Add User
          </AppButton>
        }
      />

      <Stack direction="row" justifyContent="flex-end">
        <AppSearch placeholder="Search users..." onSearch={setSearch} />
      </Stack>

      <AppTable
        rows={filteredRows}
        columns={columns}
        loading={isFetching}
        rowCount={data?.total ?? 0}
        paginationMode="server"
        paginationModel={{ page, pageSize: PAGE_SIZE }}
        onPaginationModelChange={(m) => setPage(m.page)}
      />
    </Stack>
  );
}
