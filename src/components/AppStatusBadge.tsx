import { Chip } from '@mui/material';
import type { UserStatusType } from '@appTypes/common.types';

const STATUS_CONFIG: Record<UserStatusType, { label: string; color: 'success' | 'error' | 'warning' | 'default' | 'info' }> = {
  active: { label: 'Active', color: 'success' },
  inactive: { label: 'Inactive', color: 'default' },
  locked: { label: 'Locked', color: 'error' },
  deleted: { label: 'Deleted', color: 'error' },
  pending_verification: { label: 'Pending', color: 'warning' },
};

export const AppStatusBadge = ({ status }: { status: UserStatusType }) => {
  const config = STATUS_CONFIG[status] ?? { label: status, color: 'default' as const };
  return <Chip label={config.label} color={config.color} size="small" variant="outlined" />;
};
