import { useState } from 'react';
import { Menu, MenuItem, Divider, Typography, Box, IconButton, ListItemIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { clearCredentials } from '@store/authSlice';
import { clearUser } from '@store/userSlice';
import { clearRoles } from '@store/rolesSlice';
import { clearPermissions } from '@store/permissionsSlice';
import { useLogoutMutation } from '@api/authApi';
import { AppAvatar } from '@components/AppAvatar';
import { ROUTE_PATHS } from '@constants/routes.constants';
import { formatFullName } from '@utils/string.utils';

export const UserMenu = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { user } = useAppSelector((s) => s.user);
  const { refreshToken } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  if (!user) return null;

  const handleLogout = async () => {
    if (refreshToken) await logout({ refresh_token: refreshToken }).unwrap().catch(() => {});
    dispatch(clearCredentials());
    dispatch(clearUser());
    dispatch(clearRoles());
    dispatch(clearPermissions());
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small">
        <AppAvatar firstName={user.first_name} lastName={user.last_name} size={32} />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Box px={2} py={1}>
          <Typography variant="subtitle2">{formatFullName(user.first_name, user.last_name)}</Typography>
          <Typography variant="caption" color="text.secondary">{user.email ?? user.mobile}</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => { setAnchor(null); navigate(ROUTE_PATHS.PROFILE); }}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem onClick={() => { setAnchor(null); navigate(ROUTE_PATHS.CHANGE_PASSWORD); }}>
          <ListItemIcon><LockIcon fontSize="small" /></ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
