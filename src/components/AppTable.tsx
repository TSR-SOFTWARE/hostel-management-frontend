import { DataGrid, type DataGridProps } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AppLoader } from './AppLoader';
import { AppEmptyState } from './AppEmptyState';
import { MuiDataGridStyles } from '@theme/overrides/MuiDataGrid';

interface AppTableProps extends Omit<DataGridProps, 'slots'> {
  loading?: boolean;
}

export const AppTable = ({ loading = false, rows, ...props }: AppTableProps) => (
  <Box sx={{ width: '100%' }}>
    <DataGrid
      rows={rows}
      loading={loading}
      autoHeight
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50]}
      slots={{
        loadingOverlay: () => <AppLoader />,
        noRowsOverlay: () => <AppEmptyState title="No records found" />,
      }}
      sx={MuiDataGridStyles}
      {...props}
    />
  </Box>
);
