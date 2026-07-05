import { TextField, MenuItem, type TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface AppSelectProps extends Omit<TextFieldProps, 'select'> {
  options: Option[];
}

export const AppSelect = forwardRef<HTMLInputElement, AppSelectProps>(
  ({ options, ...props }, ref) => (
    <TextField inputRef={ref} select fullWidth size="small" {...props}>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  )
);

AppSelect.displayName = 'AppSelect';
