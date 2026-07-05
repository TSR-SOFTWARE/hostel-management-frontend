import { Box, Paper, Typography, Stack } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Outlet } from 'react-router-dom';
import { APP_NAME } from '@constants/app.constants';

export default function AuthLayout() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
      px={2}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Box
          sx={{
            width: 44, height: 44, borderRadius: 2,
            bgcolor: 'primary.main',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ApartmentIcon sx={{ color: '#fff', fontSize: 26 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} color="text.primary" lineHeight={1.1}>
            {APP_NAME}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Management Portal
          </Typography>
        </Box>
      </Stack>
      <Paper elevation={0} sx={{ width: '100%', maxWidth: 440, p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Outlet />
      </Paper>
    </Box>
  );
}
