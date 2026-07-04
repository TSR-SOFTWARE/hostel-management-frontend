import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthStateType, TokenResponseType } from '@types/auth.types';

const initialState: AuthStateType = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<TokenResponseType>) {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    clearCredentials(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setInitialized(state) {
      state.isInitialized = true;
    },
  },
});

export const { setCredentials, clearCredentials, setInitialized } = authSlice.actions;
export default authSlice.reducer;
