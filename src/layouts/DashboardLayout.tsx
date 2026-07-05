import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSidebar } from '@contexts/SidebarContext';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@constants/app.constants';

export default function DashboardLayout() {
  const { isOpen, isCollapsed, toggleSidebar } = useSidebar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Box display="flex" minHeight="100vh" bgcolor="background.default">
      {isMobile ? (
        <Drawer open={isOpen} onClose={toggleSidebar} variant="temporary" sx={{ '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH } }}>
          <Sidebar />
        </Drawer>
      ) : (
        <Box
          component="nav"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: 200 }),
          }}
        >
          <Box
            sx={{
              width: drawerWidth,
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              transition: 'width 200ms',
            }}
          >
            <Sidebar />
          </Box>
        </Box>
      )}

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
