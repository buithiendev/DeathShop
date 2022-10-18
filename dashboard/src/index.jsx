import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { theme } from '~/assets/theme';
import GlobalStyles from '~/components/GlobalStyles';
import App from './App';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
);
