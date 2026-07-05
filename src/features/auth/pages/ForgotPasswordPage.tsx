import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '@api/authApi';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppTextField } from '@components/AppTextField';
import { AppButton } from '@components/AppButton';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useSnackbarContext();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async ({ identifier }: ForgotPasswordFormValues) => {
    try {
      const res = await forgotPassword({ identifier }).unwrap();
      showSuccess(res.message);
      navigate(ROUTE_PATHS.VERIFY_OTP, { state: { identifier } });
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h6" fontWeight={700}>Forgot password</Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email or mobile — we'll send you an OTP.
        </Typography>
      </Stack>

      <Divider />

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <AppTextField
          label="Email or Mobile"
          autoFocus
          autoComplete="username"
          error={!!errors.identifier}
          helperText={errors.identifier?.message}
          {...register('identifier')}
        />

        <AppButton type="submit" variant="contained" fullWidth loading={isLoading}>
          Send OTP
        </AppButton>
      </Stack>

      <MuiLink component={Link} to={ROUTE_PATHS.LOGIN} variant="body2" textAlign="center">
        Back to sign in
      </MuiLink>
    </Stack>
  );
}
