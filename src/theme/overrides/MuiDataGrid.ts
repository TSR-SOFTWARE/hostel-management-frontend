// MuiDataGrid overrides are applied directly in AppTable via sx prop
// to avoid type conflicts with @mui/x-data-grid version
export const MuiDataGridStyles = {
  border: 'none',
  '& .MuiDataGrid-columnHeader': { fontWeight: 600, fontSize: '0.8125rem' },
  '& .MuiDataGrid-cell': { fontSize: '0.875rem' },
};
