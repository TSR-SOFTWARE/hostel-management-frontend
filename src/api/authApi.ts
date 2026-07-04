import { baseApi } from './baseApi';
import { API_PATHS } from '@constants/api.constants';
import type { TokenResponseType } from '@types/auth.types';
import type { ApiMessageResponse } from '@types/api.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponseType, { identifier: string; password: string }>({
      query: (body) => ({ url: API_PATHS.LOGIN, method: 'POST', body }),
    }),

    logout: builder.mutation<ApiMessageResponse, { refresh_token: string }>({
      query: (body) => ({ url: API_PATHS.LOGOUT, method: 'POST', body }),
    }),

    refreshToken: builder.mutation<TokenResponseType, { refresh_token: string }>({
      query: (body) => ({ url: API_PATHS.REFRESH_TOKEN, method: 'POST', body }),
    }),

    forgotPassword: builder.mutation<ApiMessageResponse, { identifier: string }>({
      query: (body) => ({ url: API_PATHS.FORGOT_PASSWORD, method: 'POST', body }),
    }),

    verifyOtp: builder.mutation<ApiMessageResponse, { identifier: string; otp: string; purpose: string }>({
      query: (body) => ({ url: API_PATHS.VERIFY_OTP, method: 'POST', body }),
    }),

    resetPassword: builder.mutation<ApiMessageResponse, { identifier: string; otp: string; new_password: string; confirm_password: string }>({
      query: (body) => ({ url: API_PATHS.RESET_PASSWORD, method: 'POST', body }),
    }),

    changePassword: builder.mutation<ApiMessageResponse, { old_password: string; new_password: string; confirm_password: string }>({
      query: (body) => ({ url: API_PATHS.CHANGE_PASSWORD, method: 'POST', body }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
