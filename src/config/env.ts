export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  IS_DEV: import.meta.env.DEV as boolean,
  IS_PROD: import.meta.env.PROD as boolean,
};
