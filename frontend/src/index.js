import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from '~/assets/theme';
import GlobalStyles from '~/components/GlobalStyles';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </ThemeProvider>
    </React.StrictMode>,
);
