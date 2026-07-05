import { createTheme } from '@mui/material/styles';
import type { ThemeModeType } from '@appTypes/common.types';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { shape } from './shape';
import { MuiButton } from './overrides/MuiButton';
import { MuiCard } from './overrides/MuiCard';
import { MuiTextField } from './overrides/MuiTextField';

export const getTheme = (mode: ThemeModeType) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography,
    shape,
    components: {
      MuiButton,
      MuiCard,
      MuiTextField,
      MuiCssBaseline: {
        styleOverrides: { body: { scrollbarWidth: 'thin' } },
      },
    },
  });
