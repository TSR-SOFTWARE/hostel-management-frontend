import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Grid, Paper, Typography, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation, useListRolesQuery } from '@api/usersApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { useConfirm } from '@hooks/useConfirm';
import { AppTextField } from '@components/AppTextField';
import { AppSelect } from '@components/AppSelect';
import { AppButton } from '@components/AppButton';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppStatusBadge } from '@components/AppStatusBadge';
import { AppLoader } from '@components/AppLoader';
import { AppErrorState } from '@components/AppErrorState';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { USER_STATUS } from '@constants/app.constants';
import { updateUserSchema, type UpdateUserFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

const STATUS_OPTIONS = Object.values(USER_STATUS).map((s) => ({ value: s, label: s.replace('_', ' ') }));

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { showSuccess, showError } = useSnackbarContext();

  const { data: user, isLoading, isError } = useGetUserQuery(id!);
  const { data: roles = [] } = useListRolesQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        mobile: user.mobile ?? '',
        role_id: user.role_id,
        status: user.status,
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: UpdateUserFormValues) => {
    try {
      await updateUser({ id: id!, body: values }).unwrap();
      showSuccess('User updated successfully');
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    const ok = await confirm({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user?.first_name} ${user?.last_name}?`,
      confirmLabel: 'Delete',
      confirmColor: 'error',
    });
    if (!ok) return;
    try {
      await deleteUser(id!).unwrap();
      showSuccess('User deleted');
      navigate(ROUTE_PATHS.USERS);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  if (isLoading) return <AppLoader fullPage />;
  if (isError || !user) return <AppErrorState error="User not found" onRetry={() => navigate(ROUTE_PATHS.USERS)} />;

  const roleOptions = roles.map((r) => ({ value: r.id, label: r.role_name }));

  return (
    <Stack spacing={3}>
      <AppPageHeader
        title={`${user.first_name} ${user.last_name}`}
        subtitle={user.email ?? user.mobile ?? ''}
        actions={
          <AppButton variant="outlined" color="error" loading={isDeleting} onClick={handleDelete}>
            Delete User
          </AppButton>
        }
      />

      <Paper variant="outlined" sx={{ p: 3, maxWidth: 640 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">Status:</Typography>
            <AppStatusBadge status={user.status} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Last login: {user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField
                label="First Name"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                {...register('first_name')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField
                label="Last Name"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                {...register('last_name')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField
                label="Mobile"
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
                {...register('mobile')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppSelect
                label="Status"
                options={STATUS_OPTIONS}
                error={!!errors.status}
                helperText={errors.status?.message}
                {...register('status')}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <AppSelect
                label="Role"
                options={roleOptions}
                error={!!errors.role_id}
                helperText={errors.role_id?.message}
                {...register('role_id')}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <AppButton variant="outlined" onClick={() => reset()}>Discard</AppButton>
            <AppButton type="submit" variant="contained" loading={isUpdating} disabled={!isDirty}>
              Save Changes
            </AppButton>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
