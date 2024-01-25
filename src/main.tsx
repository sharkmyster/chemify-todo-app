import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme.tsx';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './features/api/apiSlice';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </ApiProvider>
  </React.StrictMode>
);
