import { Autocomplete, TextField } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface AppAutocompleteProps {
  options: Option[];
  value?: Option | null;
  onChange?: (value: Option | null) => void;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export const AppAutocomplete = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  loading = false,
  error,
  helperText,
  disabled,
}: AppAutocompleteProps) => (
  <Autocomplete
    options={options}
    value={value ?? null}
    loading={loading}
    disabled={disabled}
    getOptionLabel={(o) => o.label}
    isOptionEqualToValue={(o, v) => o.value === v.value}
    onChange={(_e, val) => onChange?.(val)}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        placeholder={placeholder}
        size="small"
        error={error}
        helperText={helperText}
      />
    )}
  />
);
