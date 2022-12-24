import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { theme } from '~/assets/theme';
import GlobalStyles from '~/components/GlobalStyles';
import '~/interceptors/axios';
import App from './App';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
