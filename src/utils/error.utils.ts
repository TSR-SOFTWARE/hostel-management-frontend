import type { RtkError } from '@appTypes/api.types';

export const parseApiError = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred';
  const rtkError = error as RtkError;
  if (!rtkError.data) return 'Network error. Please check your connection.';
  const { detail } = rtkError.data;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail.length > 0) return detail.map((d) => d.msg).join(', ');
  return 'An unexpected error occurred';
};

export const getErrorMessage = parseApiError;

export const isAuthError = (error: unknown): boolean => (error as RtkError)?.status === 401;
export const isForbiddenError = (error: unknown): boolean => (error as RtkError)?.status === 403;
