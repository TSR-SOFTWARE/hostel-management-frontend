import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Chip, Tooltip, IconButton } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useListRolesQuery } from '@api/usersApi';
import { useCreateRoleMutation, useDeleteRoleMutation } from '@api/adminApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { useConfirm } from '@hooks/useConfirm';
import { AppTable } from '@components/AppTable';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppButton } from '@components/AppButton';
import { AppDialog } from '@components/AppDialog';
import { AppTextField } from '@components/AppTextField';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { createRoleSchema, type CreateRoleFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';
import type { RoleType } from '@appTypes/common.types';

export default function RolesPage() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { showSuccess, showError } = useSnackbarContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: roles = [], isFetching } = useListRolesQuery();
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
  });

  const onSubmit = async (values: CreateRoleFormValues) => {
    try {
      await createRole(values).unwrap();
      showSuccess('Role created');
      reset();
      setDialogOpen(false);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const handleDelete = async (role: RoleType) => {
    if (role.is_system_role) { showError('System roles cannot be deleted'); return; }
    const ok = await confirm({ title: 'Delete Role', message: `Delete role "${role.role_name}"?`, confirmLabel: 'Delete', confirmColor: 'error' });
    if (!ok) return;
    try {
      await deleteRole(role.id).unwrap();
      showSuccess('Role deleted');
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const columns: GridColDef<RoleType>[] = [
    { field: 'role_name', headerName: 'Role Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'is_system_role', headerName: 'Type', width: 120,
      renderCell: ({ value }) => <Chip label={value ? 'System' : 'Custom'} size="small" color={value ? 'primary' : 'default'} variant="outlined" />,
    },
    {
      field: 'actions', headerName: '', width: 100, sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Manage Permissions">
            <IconButton size="small" onClick={() => navigate(ROUTE_PATHS.ROLE_DETAIL(row.id))}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" disabled={row.is_system_role || isDeleting} onClick={() => handleDelete(row)}>
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
        title="Roles"
        subtitle="Manage roles and their permissions."
        actions={
          <AppButton variant="contained" icon={<AddIcon />} onClick={() => setDialogOpen(true)}>
            Add Role
          </AppButton>
        }
      />

      <AppTable rows={roles} columns={columns} loading={isFetching} />

      <AppDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); reset(); }}
        title="Create Role"
        actions={
          <>
            <AppButton variant="outlined" onClick={() => { setDialogOpen(false); reset(); }}>Cancel</AppButton>
            <AppButton variant="contained" loading={isCreating} onClick={handleSubmit(onSubmit)}>Create</AppButton>
          </>
        }
      >
        <Stack spacing={2} pt={1}>
          <AppTextField label="Role Name" autoFocus error={!!errors.role_name} helperText={errors.role_name?.message} {...register('role_name')} />
          <AppTextField label="Description" multiline rows={2} error={!!errors.description} helperText={errors.description?.message} {...register('description')} />
        </Stack>
      </AppDialog>
    </Stack>
  );
}
