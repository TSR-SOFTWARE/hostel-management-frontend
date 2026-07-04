export interface ApiErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}

export interface ApiValidationError {
  detail: ApiErrorDetail[];
}

export interface ApiMessageResponse {
  message: string;
}

export interface ApiListResponse<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}

export interface RtkError {
  status: number;
  data: {
    detail: string | ApiErrorDetail[];
  };
}
