import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import type { SeverityType } from '@appTypes/common.types';

interface SnackbarContextType {
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  showWarning: (msg: string) => void;
  showInfo: (msg: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSuccess: () => {},
  showError: () => {},
  showWarning: () => {},
  showInfo: () => {},
});

export const useSnackbarContext = () => useContext(SnackbarContext);

const SnackbarInner = ({ children }: { children: ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const show = useCallback(
    (msg: string, variant: SeverityType) => enqueueSnackbar(msg, { variant }),
    [enqueueSnackbar]
  );
  return (
    <SnackbarContext.Provider value={{
      showSuccess: (msg) => show(msg, 'success'),
      showError: (msg) => show(msg, 'error'),
      showWarning: (msg) => show(msg, 'warning'),
      showInfo: (msg) => show(msg, 'info'),
    }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const SnackbarContextProvider = ({ children }: { children: ReactNode }) => (
  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <SnackbarInner>{children}</SnackbarInner>
  </SnackbarProvider>
);
