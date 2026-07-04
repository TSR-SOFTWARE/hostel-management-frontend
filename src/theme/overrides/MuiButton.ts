import type { Components, Theme } from '@mui/material';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: { borderRadius: 8, padding: '8px 20px', boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
    sizeLarge: { padding: '10px 24px', fontSize: '0.9375rem' },
    sizeSmall: { padding: '4px 12px' },
  },
};
