import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '@api/usersApi';
import { useListRolesQuery } from '@api/usersApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppTextField } from '@components/AppTextField';
import { AppPasswordField } from '@components/AppPasswordField';
import { AppSelect } from '@components/AppSelect';
import { AppButton } from '@components/AppButton';
import { AppPageHeader } from '@components/AppPageHeader';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { createUserSchema, type CreateUserFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

export default function CreateUserPage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbarContext();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: roles = [] } = useListRolesQuery();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async ({ confirm_password: _, ...values }: CreateUserFormValues) => {
    try {
      await createUser(values).unwrap();
      showSuccess('User created successfully');
      navigate(ROUTE_PATHS.USERS);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const roleOptions = roles.map((r) => ({ value: r.id, label: r.role_name }));

  return (
    <Stack spacing={3}>
      <AppPageHeader title="Add User" subtitle="Create a new system user." />

      <Paper variant="outlined" sx={{ p: 3, maxWidth: 640 }}>
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppTextField
                label="First Name"
                autoFocus
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
                label="Email"
                type="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
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
            <Grid size={{ xs: 12 }}>
              <AppSelect
                label="Role"
                options={roleOptions}
                error={!!errors.role_id}
                helperText={errors.role_id?.message}
                defaultValue=""
                {...register('role_id')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppPasswordField
                label="Password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <AppPasswordField
                label="Confirm Password"
                autoComplete="new-password"
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
                {...register('confirm_password')}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <AppButton variant="outlined" onClick={() => navigate(ROUTE_PATHS.USERS)}>Cancel</AppButton>
            <AppButton type="submit" variant="contained" loading={isLoading}>Create User</AppButton>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
