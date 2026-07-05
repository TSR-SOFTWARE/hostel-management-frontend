import { useState, forwardRef } from 'react';
import { TextField, InputAdornment, IconButton, type TextFieldProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const AppPasswordField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const [show, setShow] = useState(false);
  return (
    <TextField
      inputRef={ref}
      fullWidth
      size="small"
      type={show ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShow((p) => !p)} edge="end" size="small">
              {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
});

AppPasswordField.displayName = 'AppPasswordField';
