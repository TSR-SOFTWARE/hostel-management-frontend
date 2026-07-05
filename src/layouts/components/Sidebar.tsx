import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Tooltip, Divider, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '@contexts/SidebarContext';
import { usePermission } from '@hooks/usePermission';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { APP_NAME } from '@constants/app.constants';

interface NavItem { label: string; icon: React.ReactNode; path: string }

const MAIN_NAV: NavItem[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: ROUTE_PATHS.DASHBOARD },
];

const NavButton = ({ label, icon, path, isCollapsed }: NavItem & { isCollapsed: boolean }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname.startsWith(path);
  const btn = (
    <ListItemButton
      onClick={() => navigate(path)}
      selected={active}
      sx={{ borderRadius: 2, mb: 0.5, justifyContent: isCollapsed ? 'center' : 'flex-start', minHeight: 44 }}
    >
      <ListItemIcon sx={{ minWidth: isCollapsed ? 0 : 36, color: active ? 'primary.main' : 'inherit' }}>
        {icon}
      </ListItemIcon>
      {!isCollapsed && <ListItemText primary={label} primaryTypographyProps={{ variant: 'body2', fontWeight: active ? 600 : 400 }} />}
    </ListItemButton>
  );
  return isCollapsed ? <Tooltip title={label} placement="right">{btn}</Tooltip> : btn;
};

export const Sidebar = () => {
  const { isCollapsed } = useSidebar();
  const canReadUsers = usePermission('User', 'Read');
  const canReadRoles = usePermission('Role', 'Read');
  const canReadHostels = usePermission('Hostel', 'Read');
  const showAdminSection = canReadRoles || canReadHostels;

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box px={isCollapsed ? 1 : 2} py={2} borderBottom="1px solid" borderColor="divider">
        {!isCollapsed ? (
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 36, height: 36, borderRadius: 1.5, flexShrink: 0,
                bgcolor: 'primary.main',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ApartmentIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Box overflow="hidden">
              <Typography variant="subtitle2" fontWeight={800} color="text.primary" noWrap lineHeight={1.2}>
                {APP_NAME}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Management Portal
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Tooltip title={APP_NAME} placement="right">
            <Box
              sx={{
                width: 36, height: 36, borderRadius: 1.5, mx: 'auto',
                bgcolor: 'primary.main',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'default',
              }}
            >
              <ApartmentIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
          </Tooltip>
        )}
      </Box>

      <List sx={{ px: 1, pt: 1, flexGrow: 1 }}>
        {MAIN_NAV.map((item) => <NavButton key={item.path} {...item} isCollapsed={isCollapsed} />)}
        {canReadUsers && <NavButton label="Users" icon={<PeopleIcon />} path={ROUTE_PATHS.USERS} isCollapsed={isCollapsed} />}

        {showAdminSection && (
          <>
            <Divider sx={{ my: 1 }} />
            {!isCollapsed && (
              <Typography variant="caption" color="text.disabled" px={1.5} pb={0.5} display="block">
                ADMIN
              </Typography>
            )}
            {canReadRoles && <NavButton key={ROUTE_PATHS.ROLES} label="Roles" icon={<BadgeIcon />} path={ROUTE_PATHS.ROLES} isCollapsed={isCollapsed} />}
            {canReadHostels && <NavButton key={ROUTE_PATHS.HOSTELS} label="Hostels" icon={<ApartmentIcon />} path={ROUTE_PATHS.HOSTELS} isCollapsed={isCollapsed} />}
          </>
        )}
      </List>
    </Box>
  );
};
