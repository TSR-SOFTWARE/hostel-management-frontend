import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from '@contexts/ThemeContext';
import { SidebarContextProvider } from '@contexts/SidebarContext';
import { SnackbarContextProvider } from '@contexts/SnackbarContext';
import { ConfirmDialogContextProvider } from '@contexts/ConfirmDialogContext';
import { AppRouter } from '@routes/index';
import { AppInitializer } from './AppInitializer';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <SidebarContextProvider>
          <SnackbarContextProvider>
            <ConfirmDialogContextProvider>
              <AppInitializer>
                <AppRouter />
              </AppInitializer>
            </ConfirmDialogContextProvider>
          </SnackbarContextProvider>
        </SidebarContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}
