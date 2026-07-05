import { Box, Typography, Stack } from '@mui/material';
import { AppBreadcrumb } from './AppBreadcrumb';
import type { ReactNode } from 'react';

interface AppPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showBreadcrumb?: boolean;
}

export const AppPageHeader = ({ title, subtitle, actions, showBreadcrumb = true }: AppPageHeaderProps) => (
  <Box mb={3}>
    {showBreadcrumb && <Box mb={1}><AppBreadcrumb /></Box>}
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="h5">{title}</Typography>
        {subtitle && <Typography variant="body2" color="text.secondary" mt={0.5}>{subtitle}</Typography>}
      </Box>
      {actions && <Stack direction="row" spacing={1}>{actions}</Stack>}
    </Stack>
  </Box>
);
