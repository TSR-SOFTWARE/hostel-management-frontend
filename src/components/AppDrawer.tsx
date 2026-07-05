import { Drawer, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ReactNode } from 'react';

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  width?: number;
}

export const AppDrawer = ({ open, onClose, title, children, anchor = 'right', width = 400 }: AppDrawerProps) => (
  <Drawer anchor={anchor} open={open} onClose={onClose}>
    <Box sx={{ width, p: 3 }}>
      {title && (
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </Box>
      )}
      {children}
    </Box>
  </Drawer>
);
