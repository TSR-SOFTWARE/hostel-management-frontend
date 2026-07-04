import { createTheme } from '@mui/material/styles';
import type { ThemeModeType } from '@types/common.types';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { shape } from './shape';
import { MuiButton } from './overrides/MuiButton';
import { MuiCard } from './overrides/MuiCard';
import { MuiTextField } from './overrides/MuiTextField';
import { MuiDataGrid } from './overrides/MuiDataGrid';

export const getTheme = (mode: ThemeModeType) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    shape,
    components: {
      MuiButton,
      MuiCard,
      MuiTextField,
      MuiDataGrid,
      MuiCssBaseline: {
        styleOverrides: { body: { scrollbarWidth: 'thin' } },
      },
    },
  });
