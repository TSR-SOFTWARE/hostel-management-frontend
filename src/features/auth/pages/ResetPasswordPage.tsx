import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from '@api/authApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppPasswordField } from '@components/AppPasswordField';
import { AppButton } from '@components/AppButton';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { identifier?: string; otp?: string } | null };
  const identifier = state?.identifier ?? '';
  const otp = state?.otp ?? '';

  const { showError, showSuccess } = useSnackbarContext();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const res = await resetPassword({ identifier, otp, ...values }).unwrap();
      showSuccess(res.message);
      navigate(ROUTE_PATHS.LOGIN, { replace: true });
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  if (!identifier || !otp) {
    navigate(ROUTE_PATHS.FORGOT_PASSWORD, { replace: true });
    return null;
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h6" fontWeight={700}>Set new password</Typography>
        <Typography variant="body2" color="text.secondary">
          Choose a strong password for your account.
        </Typography>
      </Stack>

      <Divider />

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <AppPasswordField
          label="New Password"
          autoFocus
          autoComplete="new-password"
          error={!!errors.new_password}
          helperText={errors.new_password?.message}
          {...register('new_password')}
        />
        <AppPasswordField
          label="Confirm Password"
          autoComplete="new-password"
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
          {...register('confirm_password')}
        />

        <AppButton type="submit" variant="contained" fullWidth loading={isLoading}>
          Reset Password
        </AppButton>
      </Stack>
    </Stack>
  );
}
