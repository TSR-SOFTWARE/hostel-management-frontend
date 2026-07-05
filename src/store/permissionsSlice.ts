import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PermissionType } from '@appTypes/common.types';

interface PermissionsState {
  permissions: PermissionType[];
}

const initialState: PermissionsState = { permissions: [] };

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<PermissionType[]>) {
      state.permissions = action.payload;
    },
    clearPermissions(state) {
      state.permissions = [];
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
