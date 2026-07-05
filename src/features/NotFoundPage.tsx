import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppButton } from '@components/AppButton';
import { ROUTE_PATHS } from '@constants/routes.constants';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Stack minHeight="100vh" alignItems="center" justifyContent="center" spacing={2}>
      <Typography variant="h1" fontWeight={700} color="text.disabled">404</Typography>
      <Typography variant="h6" color="text.secondary">Page not found</Typography>
      <AppButton variant="contained" onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}>
        Go to Dashboard
      </AppButton>
    </Stack>
  );
}
