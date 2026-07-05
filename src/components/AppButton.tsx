import { Button, CircularProgress, type ButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
  icon?: ReactNode;
}

export const AppButton = ({ loading = false, icon, children, disabled, ...props }: AppButtonProps) => (
  <Button
    disabled={disabled || loading}
    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : icon}
    {...props}
  >
    {children}
  </Button>
);
