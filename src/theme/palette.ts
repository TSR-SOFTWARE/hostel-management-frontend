import type { PaletteOptions } from '@mui/material';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: { main: '#1976D2', light: '#42A5F5', dark: '#1565C0' },
  secondary: { main: '#9C27B0', light: '#BA68C8', dark: '#7B1FA2' },
  success: { main: '#2E7D32', light: '#4CAF50', dark: '#1B5E20' },
  warning: { main: '#ED6C02', light: '#FF9800', dark: '#E65100' },
  error: { main: '#D32F2F', light: '#EF5350', dark: '#C62828' },
  background: { default: '#F5F7FA', paper: '#FFFFFF' },
  text: { primary: '#1A2027', secondary: '#637381' },
  divider: '#E5E8EC',
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: { main: '#42A5F5', light: '#90CAF9', dark: '#1976D2' },
  secondary: { main: '#CE93D8', light: '#F3E5F5', dark: '#9C27B0' },
  success: { main: '#66BB6A', light: '#A5D6A7', dark: '#2E7D32' },
  warning: { main: '#FFA726', light: '#FFB74D', dark: '#F57C00' },
  error: { main: '#EF5350', light: '#E57373', dark: '#C62828' },
  background: { default: '#0A0E1A', paper: '#111827' },
  text: { primary: '#F9FAFB', secondary: '#9CA3AF' },
  divider: '#1F2937',
};
