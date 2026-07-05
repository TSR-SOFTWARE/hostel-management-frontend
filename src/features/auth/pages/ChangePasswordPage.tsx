import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChangePasswordMutation } from '@api/authApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppPasswordField } from '@components/AppPasswordField';
import { AppButton } from '@components/AppButton';
import { AppPageHeader } from '@components/AppPageHeader';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { changePasswordSchema, type ChangePasswordFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useSnackbarContext();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      const res = await changePassword(values).unwrap();
      showSuccess(res.message);
      reset();
      navigate(ROUTE_PATHS.LOGIN, { replace: true });
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  return (
    <Stack spacing={3}>
      <AppPageHeader title="Change Password" subtitle="You will be signed out on all devices after changing your password." />

      <Paper variant="outlined" sx={{ p: 3, maxWidth: 480 }}>
        <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <AppPasswordField
            label="Current Password"
            autoComplete="current-password"
            error={!!errors.old_password}
            helperText={errors.old_password?.message}
            {...register('old_password')}
          />
          <AppPasswordField
            label="New Password"
            autoComplete="new-password"
            error={!!errors.new_password}
            helperText={errors.new_password?.message}
            {...register('new_password')}
          />
          <AppPasswordField
            label="Confirm New Password"
            autoComplete="new-password"
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
            {...register('confirm_password')}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <AppButton variant="outlined" onClick={() => navigate(-1)}>Cancel</AppButton>
            <AppButton type="submit" variant="contained" loading={isLoading}>
              Update Password
            </AppButton>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
