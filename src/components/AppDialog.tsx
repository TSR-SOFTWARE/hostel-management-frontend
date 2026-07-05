import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ReactNode } from 'react';

interface AppDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

export const AppDialog = ({ open, onClose, title, children, actions, maxWidth = 'sm' }: AppDialogProps) => (
  <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={onClose} size="small"><CloseIcon fontSize="small" /></IconButton>
    </DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
    {actions && <DialogActions sx={{ px: 3, py: 2 }}>{actions}</DialogActions>}
  </Dialog>
);
