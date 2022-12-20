/* eslint-disable @typescript-eslint/no-empty-function */
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes/AppRoutes';
import { persistor, store } from './store';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
});

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        },
        components: {
          MuiInput: {
            styleOverrides: {
              input: {
                '&::placeholder': {
                  fontWeight: '500',
                  fontFamily: 'Poppins',
                  color: 'black'
                }
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                '&:hover': {
                  backgroundColor: '#8f8f8f'
                }
              }
            }
          }
        }
      }),

    [mode]
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <AppRoutes />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;
