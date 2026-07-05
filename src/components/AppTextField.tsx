import { TextField, type TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

export const AppTextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField inputRef={ref} fullWidth size="small" {...props} />
));

AppTextField.displayName = 'AppTextField';
