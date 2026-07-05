import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AppButton } from './AppButton';

interface AppErrorStateProps {
  error?: string;
  onRetry?: () => void;
}

export const AppErrorState = ({ error = 'Something went wrong', onRetry }: AppErrorStateProps) => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6} gap={2}>
    <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main' }} />
    <Typography variant="h6" color="text.secondary">{error}</Typography>
    {onRetry && (
      <AppButton variant="outlined" onClick={onRetry}>
        Retry
      </AppButton>
    )}
  </Box>
);
