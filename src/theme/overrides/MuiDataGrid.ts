import type { Components, Theme } from '@mui/material';

export const MuiDataGrid: Components<Theme>['MuiDataGrid'] = {
  styleOverrides: {
    root: { border: 'none', '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } },
    columnHeader: { fontWeight: 600, fontSize: '0.8125rem' },
    cell: { fontSize: '0.875rem' },
  },
};
