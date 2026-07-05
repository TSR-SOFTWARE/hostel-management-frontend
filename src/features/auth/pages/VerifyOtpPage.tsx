import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useVerifyOtpMutation, useForgotPasswordMutation } from '@api/authApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppTextField } from '@components/AppTextField';
import { AppButton } from '@components/AppButton';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { OTP_PURPOSE } from '@constants/app.constants';
import { verifyOtpSchema, type VerifyOtpFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { identifier?: string } | null };
  const identifier = state?.identifier ?? '';

  const { showError, showSuccess } = useSnackbarContext();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [forgotPassword, { isLoading: isResending }] = useForgotPasswordMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const onSubmit = async ({ otp }: VerifyOtpFormValues) => {
    try {
      await verifyOtp({ identifier, otp, purpose: OTP_PURPOSE.FORGOT_PASSWORD }).unwrap();
      navigate(ROUTE_PATHS.RESET_PASSWORD, { state: { identifier, otp } });
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  const handleResend = async () => {
    try {
      const res = await forgotPassword({ identifier }).unwrap();
      showSuccess(res.message);
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  if (!identifier) {
    navigate(ROUTE_PATHS.FORGOT_PASSWORD, { replace: true });
    return null;
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h6" fontWeight={700}>Enter OTP</Typography>
        <Typography variant="body2" color="text.secondary">
          A 6-digit OTP was sent to <strong>{identifier}</strong>
        </Typography>
      </Stack>

      <Divider />

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <AppTextField
          label="OTP"
          autoFocus
          inputProps={{ maxLength: 6, inputMode: 'numeric' }}
          error={!!errors.otp}
          helperText={errors.otp?.message}
          {...register('otp')}
        />

        <AppButton type="submit" variant="contained" fullWidth loading={isLoading}>
          Verify OTP
        </AppButton>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <MuiLink component={Link} to={ROUTE_PATHS.FORGOT_PASSWORD} variant="body2">
          Change identifier
        </MuiLink>
        <AppButton
          variant="text"
          size="small"
          loading={isResending}
          onClick={handleResend}
        >
          Resend OTP
        </AppButton>
      </Stack>
    </Stack>
  );
}
