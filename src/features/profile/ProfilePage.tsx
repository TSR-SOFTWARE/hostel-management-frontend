import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Stack, Grid, Paper, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetMeQuery, useUpdateUserMutation } from '@api/usersApi';
import { useAppSelector } from '@hooks/useAppSelector';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppTextField } from '@components/AppTextField';
import { AppButton } from '@components/AppButton';
import { AppPageHeader } from '@components/AppPageHeader';
import { AppAvatar } from '@components/AppAvatar';
import { AppStatusBadge } from '@components/AppStatusBadge';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { formatDateTime } from '@utils/date.utils';
import { getErrorMessage } from '@utils/error.utils';

const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  mobile: z.string().min(10, 'Min 10 digits').or(z.literal('')).optional(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbarContext();
  const { user: storeUser } = useAppSelector((s) => s.user);
  const { data: me } = useGetMeQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const user = me ?? storeUser;

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({ first_name: user.first_name, last_name: user.last_name, mobile: user.mobile ?? '' });
    }
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    try {
      await updateUser({ id: user.id, body: values }).unwrap();
      showSuccess('Profile updated');
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  if (!user) return null;

  return (
    <Stack spacing={3}>
      <AppPageHeader title="My Profile" subtitle="View and update your account details." />

      <Paper variant="outlined" sx={{ p: 3, maxWidth: 560 }}>
        <Stack spacing={3}>
          {/* Avatar + info */}
          <Stack direction="row" spacing={2} alignItems="center">
            <AppAvatar firstName={user.first_name} lastName={user.last_name} size={56} />
            <Stack>
              <Typography variant="subtitle1" fontWeight={600}>{user.first_name} {user.last_name}</Typography>
              <Typography variant="body2" color="text.secondary">{user.email ?? user.mobile}</Typography>
              <Stack direction="row" spacing={1} mt={0.5} alignItems="center">
                <AppStatusBadge status={user.status} />
                <Typography variant="caption" color="text.secondary">
                  Last login: {formatDateTime(user.last_login)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppTextField label="First Name" error={!!errors.first_name} helperText={errors.first_name?.message} {...register('first_name')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <AppTextField label="Last Name" error={!!errors.last_name} helperText={errors.last_name?.message} {...register('last_name')} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <AppTextField label="Mobile" error={!!errors.mobile} helperText={errors.mobile?.message} {...register('mobile')} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <AppTextField label="Email" value={user.email ?? ''} disabled />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
              <AppButton variant="text" size="small" onClick={() => navigate(ROUTE_PATHS.CHANGE_PASSWORD)}>
                Change Password
              </AppButton>
              <Stack direction="row" spacing={1}>
                <AppButton variant="outlined" onClick={() => reset()}>Discard</AppButton>
                <AppButton type="submit" variant="contained" loading={isLoading} disabled={!isDirty}>
                  Save Changes
                </AppButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
