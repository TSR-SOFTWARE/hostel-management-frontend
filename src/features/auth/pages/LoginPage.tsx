import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@api/authApi';
import { setCredentials, clearCredentials } from '@store/authSlice';
import { clearUser } from '@store/userSlice';
import { clearRoles } from '@store/rolesSlice';
import { clearPermissions } from '@store/permissionsSlice';
import { baseApi } from '@api/baseApi';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useSnackbarContext } from '@contexts/SnackbarContext';
import { AppTextField } from '@components/AppTextField';
import { AppPasswordField } from '@components/AppPasswordField';
import { AppButton } from '@components/AppButton';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { loginSchema, type LoginFormValues } from '../schemas';
import { getErrorMessage } from '@utils/error.utils';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showError } = useSnackbarContext();
  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const tokens = await login(values).unwrap();
      // Clear previous session state before setting new credentials
      dispatch(clearCredentials());
      dispatch(clearUser());
      dispatch(clearRoles());
      dispatch(clearPermissions());
      dispatch(baseApi.util.resetApiState());
      dispatch(setCredentials(tokens));
      navigate(ROUTE_PATHS.DASHBOARD, { replace: true });
    } catch (err) {
      showError(getErrorMessage(err));
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h6" fontWeight={700}>Welcome back</Typography>
        <Typography variant="body2" color="text.secondary">Sign in to your account</Typography>
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
        <AppPasswordField
          label="Password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <MuiLink
          component={Link}
          to={ROUTE_PATHS.FORGOT_PASSWORD}
          variant="body2"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </MuiLink>

        <AppButton type="submit" variant="contained" fullWidth loading={isLoading}>
          Sign In
        </AppButton>
      </Stack>
    </Stack>
  );
}
