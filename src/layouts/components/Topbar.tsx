import { AppBar, Toolbar, IconButton,Typography,Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useSidebar } from '@contexts/SidebarContext';
import { useThemeContext } from '@contexts/ThemeContext';
import { UserMenu } from './UserMenu';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@constants/app.constants';

export const Topbar = () => {
  const { isCollapsed, toggleCollapse, toggleSidebar } = useSidebar();
  const { mode, toggleTheme } = useThemeContext();
  const drawerWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ pl: { md: `${drawerWidth + 8}px` }, transition: 'padding 200ms' }}>
        <IconButton onClick={toggleCollapse} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
          {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
        <IconButton onClick={toggleSidebar} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }} />
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleTheme} size="small">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
