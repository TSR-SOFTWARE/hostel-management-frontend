import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import type { ReactNode } from 'react';

interface AppEmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const AppEmptyState = ({
  title = 'No data found',
  description,
  action,
}: AppEmptyStateProps) => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6} gap={1}>
    <InboxIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
    <Typography variant="h6" color="text.secondary">{title}</Typography>
    {description && <Typography variant="body2" color="text.disabled">{description}</Typography>}
    {action}
  </Box>
);
