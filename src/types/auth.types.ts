export interface TokenResponseType {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthStateType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}
