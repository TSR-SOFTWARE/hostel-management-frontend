import { Chip, type ChipProps } from '@mui/material';

interface AppChipProps extends ChipProps {
  label: string;
}

export const AppChip = ({ label, ...props }: AppChipProps) => (
  <Chip label={label} size="small" {...props} />
);
