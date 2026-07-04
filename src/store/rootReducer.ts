import authReducer from './authSlice';
import userReducer from './userSlice';
import rolesReducer from './rolesSlice';
import permissionsReducer from './permissionsSlice';

export const rootReducer = {
  auth: authReducer,
  user: userReducer,
  roles: rolesReducer,
  permissions: permissionsReducer,
};
