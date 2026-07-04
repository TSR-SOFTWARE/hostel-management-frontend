import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RoleType } from '@types/common.types';

interface RolesState {
  roles: RoleType[];
}

const initialState: RolesState = { roles: [] };

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles(state, action: PayloadAction<RoleType[]>) {
      state.roles = action.payload;
    },
    clearRoles(state) {
      state.roles = [];
    },
  },
});

export const { setRoles, clearRoles } = rolesSlice.actions;
export default rolesSlice.reducer;
