import { Box, CircularProgress, Backdrop } from '@mui/material';

interface AppLoaderProps {
  fullPage?: boolean;
  size?: number;
}

export const AppLoader = ({ fullPage = false, size = 40 }: AppLoaderProps) => {
  if (fullPage) {
    return (
      <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'background.default' }}>
        <CircularProgress size={size} />
      </Backdrop>
    );
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <CircularProgress size={size} />
    </Box>
  );
};
