import type { Components, Theme } from '@mui/material';

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  defaultProps: { variant: 'outlined', size: 'small', fullWidth: true },
  styleOverrides: {
    root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
  },
};
